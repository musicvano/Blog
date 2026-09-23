---
title: "Examples and common mistakes"
description: "Topic 6. Data parallelism and PLINQ: Examples and common mistakes"
outline: [2, 3]
sourceHash: "b558ef7ee7899b10872e412abb5407b863197eacb5572a6c6ec77080f43d0a3e"
---

# Examples and common mistakes

## Program examples

The examples were run in *Release* configuration on .NET 10 on an Intel Core i9-11900KF (8 cores, 16 logical processors); times differ on other computers and between runs.

### The Mandelbrot set

The program computes a 2400×1600-pixel image of the Mandelbrot set: each pixel requires up to 1000 iterations of $z \leftarrow z^{2} + c$. Image rows are independent, so the outer row loop is replaced with `Parallel.For`. For each $p$, print time, speedup, efficiency, and verification: the total iteration count must match the sequential version. Write the image to a grayscale PGM file, which can be opened in GIMP, for example.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Width = 2400, Height = 1600, MaxIter = 1000;
byte[] image = new byte[Width * Height];

// Sequential version — the reference for verification and T1.
long checkSeq = 0;
double tSeq = Median(() => checkSeq = RenderSequential(image));
Console.WriteLine($"Sequential: {tSeq,8:F1} ms, " +
    $"iterations {checkSeq:N0}");

Console.WriteLine(" p   Time, ms   S      E      Verified");
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    long check = 0;
    double t = Median(() => check = RenderParallel(image, p));
    double s = tSeq / t;
    string ok = check == checkSeq ? "yes" : "NO";
    Console.WriteLine(
        $"{p,2} {t,9:F1} {s,5:F2} {s / p,6:F2}    {ok}");
}

WritePgm("mandelbrot.pgm", image);
Console.WriteLine("Image: mandelbrot.pgm");

static long RenderSequential(byte[] pixels)
{
    long total = 0;
    for (int y = 0; y < Height; y++)
    {
        total += RenderRow(pixels, y);
    }
    return total;
}

static long RenderParallel(byte[] pixels, int threads)
{
    ParallelOptions options = new()
    {
        MaxDegreeOfParallelism = threads
    };
    long total = 0;
    Parallel.For(0, Height, options, y =>
    {
        long rowIterations = RenderRow(pixels, y);
        Interlocked.Add(ref total, rowIterations);
    });
    return total;
}

// Row y is independent of the others: it writes only to its own pixels.
static long RenderRow(byte[] pixels, int y)
{
    long iterations = 0;
    double ci = -1.0 + 2.0 * y / Height;
    for (int x = 0; x < Width; x++)
    {
        double cr = -2.2 + 3.0 * x / Width;
        double zr = 0, zi = 0;
        int n = 0;
        while (n < MaxIter && zr * zr + zi * zi <= 4.0)
        {
            double t = zr * zr - zi * zi + cr;
            zi = 2 * zr * zi + ci;
            zr = t;
            n++;
        }
        iterations += n;
        pixels[y * Width + x] =
            (byte)(n == MaxIter ? 0 : 255 - n % 256);
    }
    return iterations;
}

// JIT warmup, then the median of five runs.
static double Median(Action action, int runs = 5)
{
    action();
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}

static void WritePgm(string path, byte[] pixels)
{
    using FileStream file = File.Create(path);
    string header = $"P5\n{Width} {Height}\n255\n";
    file.Write(System.Text.Encoding.ASCII.GetBytes(header));
    file.Write(pixels);
}
```

Each `Parallel.For` iteration writes only to pixels in its own row, so the array needs no synchronization. Add the row iteration count to the shared counter through `Interlocked.Add`: one atomic operation per row, not per pixel. Rows at the center of the image (inside the set) take longer to compute, so efficiency depends on row distribution among threads; for this symmetric image, the workload was almost even. Speedup is almost linear up to 8 threads (8 physical cores), while efficiency drops to 0.72 on 16 logical processors. Output:

```
Sequential:   2830,7 ms, iterations 989 814 242
 p   Time, ms   S      E      Verified
 1    2807,8  1,01   1,01    yes
 2    1486,3  1,90   0,95    yes
 4     766,3  3,69   0,92    yes
 8     405,6  6,98   0,87    yes
16     245,3 11,54   0,72    yes
Image: mandelbrot.pgm
```

### Text analysis with PLINQ

The program generates a corpus of 400 000 sentences (a generator with a fixed seed) and counts the frequency of words at least 4 letters long in two ways: a `GroupBy` query in LINQ and PLINQ, and `Aggregate` with a local dictionary in each partition for $p = 1 , 2 , 4 , 8 , 16$.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] lines = GenerateCorpus(lineCount: 400_000, seed: 7);
Console.WriteLine($"Lines: {lines.Length:N0}");

// 1. GroupBy: LINQ and PLINQ with the same query.
double tLinq = Median(() => CountByGroup(lines.AsEnumerable()));
double tPlinq = Median(() => CountByGroup(lines.AsParallel()));
Console.WriteLine($"GroupBy LINQ:  {tLinq,7:F1} ms");
Console.WriteLine($"GroupBy PLINQ: {tPlinq,7:F1} ms " +
    $"(S = {tLinq / tPlinq:F2})");

// 2. Aggregate: a local dictionary in each partition.
Dictionary<string, int> expected = CountSequential(lines);
double t1 = Median(() => CountSequential(lines));
Console.WriteLine($"Dictionary, sequential: {t1,6:F1} ms");
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    Dictionary<string, int> counts = CountParallel(lines, p);
    double t = Median(() => CountParallel(lines, p));
    bool same = counts.Count == expected.Count && counts.All(
        pair => expected[pair.Key] == pair.Value);
    Console.WriteLine($"Aggregate, p = {p,2}: {t,6:F1} ms  " +
        $"S = {t1 / t,5:F2}  match: {(same ? "yes" : "NO")}");
}

Console.WriteLine("Most frequent words:");
foreach (var (word, count) in expected
    .OrderByDescending(pair => pair.Value).Take(3))
{
    Console.WriteLine($"  {word,-10} {count,9:N0}");
}

static List<(string, int)> CountByGroup(IEnumerable<string> src) =>
    src.SelectMany(Split)
        .Where(w => w.Length >= 4)
        .Select(w => w.ToLowerInvariant())
        .GroupBy(w => w)
        .Select(g => (g.Key, g.Count()))
        .ToList();

static Dictionary<string, int> CountSequential(string[] lines)
{
    Dictionary<string, int> counts = [];
    foreach (string line in lines) AddWords(counts, line);
    return counts;
}

static Dictionary<string, int> CountParallel(
    string[] lines, int threads) =>
    lines.AsParallel()
        .WithDegreeOfParallelism(threads)
        .Aggregate(
            // seed: a separate dictionary for each partition
            seedFactory: () => new Dictionary<string, int>(),
            // update: no locks, the dictionary belongs to the partition
            updateAccumulatorFunc: (local, line) =>
            {
                AddWords(local, line);
                return local;
            },
            // combine: merge two partition dictionaries
            combineAccumulatorsFunc: (left, right) =>
            {
                foreach (var (word, n) in right)
                {
                    left[word] = left.GetValueOrDefault(word) + n;
                }
                return left;
            },
            resultSelector: counts => counts);

static void AddWords(Dictionary<string, int> counts, string line)
{
    foreach (string word in Split(line))
    {
        if (word.Length < 4) continue;
        string key = word.ToLowerInvariant();
        counts[key] = counts.GetValueOrDefault(key) + 1;
    }
}

static string[] Split(string line) => line.Split(
    [' ', ',', '.', '!', '?'], StringSplitOptions.RemoveEmptyEntries);

static string[] GenerateCorpus(int lineCount, int seed)
{
    string[] vocabulary =
    [
        "Thread", "task", "core", "data", "partitioning", "loop",
        "query", "merge", "sorting", "reduction", "array",
        "parallel", "processor", "memory", "cache", "result",
        "speed", "speedup", "efficiency", "computation"
    ];
    Random random = new(seed);
    string[] result = new string[lineCount];
    for (int i = 0; i < lineCount; i++)
    {
        string[] words = new string[random.Next(5, 16)];
        for (int j = 0; j < words.Length; j++)
        {
            // Square of a uniform random number: earlier words are more frequent.
            double u = random.NextDouble();
            words[j] = vocabulary[(int)(u * u * vocabulary.Length)];
        }
        result[i] = string.Join(' ', words) + ".";
    }
    return result;
}

static double Median(Action action, int runs = 5)
{
    action();
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}
```

The PLINQ `GroupBy` query is no faster than LINQ: millions of word strings are placed into shared groups, and merging groups and garbage collection become bottlenecks. The same count through `Aggregate` with a separate dictionary per partition scales: `update` needs no synchronization, while `combine` merges only 20 dictionary entries. Dictionary merging is associative and commutative, so the result matches sequential processing. Speedup is limited by string allocation (`Split`, `ToLowerInvariant`) and the fact that 16 logical processors have only 8 physical cores. Output:

```
Lines: 400 000
GroupBy LINQ:    964,5 ms
GroupBy PLINQ:   999,9 ms (S = 0,96)
Dictionary, sequential:  336,0 ms
Aggregate, p =  1:  321,6 ms  S =  1,04  match: yes
Aggregate, p =  2:  171,5 ms  S =  1,96  match: yes
Aggregate, p =  4:   94,5 ms  S =  3,56  match: yes
Aggregate, p =  8:   59,0 ms  S =  5,69  match: yes
Aggregate, p = 16:   60,8 ms  S =  5,53  match: yes
Most frequent words:
  thread       896 425
  task         371 241
  core         283 168
```

### Parallel merge sort

The program sorts arrays of 1 and 10 million random numbers using parallel merge sort with a cutoff of 16 384 elements and branching depth $\lceil \log_{2} p \rceil$. Thread counts can be passed as a command-line argument. For each pair $(n , p)$, verify the result against `Array.Sort` and write the table to `speedup.csv`.

```cs
using System.Diagnostics;
using System.Globalization;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

// Argument: comma-separated thread counts, such as 1,2,4,8.
int[] threads = args.Length > 0
    ? args[0].Split(',').Select(int.Parse).ToArray()
    : [1, 2, 4, 8, 16];
int[] sizes = [1_000_000, 10_000_000];

StringBuilder csv = new("n,p,time_ms,speedup,efficiency\n");
Console.WriteLine("         n   p   Time, ms      S      E");
foreach (int n in sizes)
{
    int[] source = new int[n];
    Random random = new(2026);
    for (int i = 0; i < n; i++) source[i] = random.Next();
    int[] expected = (int[])source.Clone();
    Array.Sort(expected);

    int[] data = new int[n];
    double Measure(int p) => Median(() =>
    {
        source.CopyTo(data, 0);
        ParallelMergeSort.Sort(data, p);
    });
    double t1 = Measure(1);                // reference time T1
    foreach (int p in threads)
    {
        double t = p == 1 ? t1 : Measure(p);
        if (!data.AsSpan().SequenceEqual(expected))
        {
            Console.Error.WriteLine($"Incorrect result, p = {p}");
            return 2;
        }
        double s = t1 / t;
        Console.WriteLine($"{n,10:N0} {p,3} {t,9:F1} {s,6:F2} " +
            $"{s / p,6:F2}");
        csv.AppendLine(string.Create(CultureInfo.InvariantCulture,
            $"{n},{p},{t:F1},{s:F3},{s / p:F3}"));
    }
}
File.WriteAllText("speedup.csv", csv.ToString());
Console.WriteLine("Table saved to speedup.csv");
return 0;

static double Median(Action action, int runs = 5)
{
    action();
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}

static class ParallelMergeSort
{
    // Smaller fragments are more efficiently sorted sequentially.
    const int Threshold = 16_384;

    public static void Sort(int[] data, int threads)
    {
        int[] buffer = new int[data.Length];
        // Branching depth: 2^depth branches ≈ threads.
        int depth = (int)Math.Ceiling(Math.Log2(threads));
        Sort(data, buffer, 0, data.Length, depth);
    }

    static void Sort(int[] a, int[] buffer, int lo, int hi, int depth)
    {
        if (hi - lo <= Threshold)
        {
            Array.Sort(a, lo, hi - lo);
            return;
        }
        int mid = lo + (hi - lo) / 2;
        if (depth > 0)
        {
            Parallel.Invoke(
                () => Sort(a, buffer, lo, mid, depth - 1),
                () => Sort(a, buffer, mid, hi, depth - 1));
        }
        else
        {
            Sort(a, buffer, lo, mid, 0);
            Sort(a, buffer, mid, hi, 0);
        }
        Merge(a, buffer, lo, mid, hi);
    }

    // Merge two sorted halves through a buffer.
    static void Merge(int[] a, int[] buffer, int lo, int mid, int hi)
    {
        int i = lo, j = mid, k = lo;
        while (i < mid && j < hi)
            buffer[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i < mid) buffer[k++] = a[i++];
        while (j < hi) buffer[k++] = a[j++];
        Array.Copy(buffer, lo, a, lo, hi - lo);
    }
}
```

The array halves do not overlap, so the two `Parallel.Invoke` branches write to different parts of the array and buffer without synchronization. For $p = 1$, depth is 0 and sorting is entirely sequential: this is time $T_{1}$. Write the CSV with `CultureInfo.InvariantCulture` so numbers use a decimal point regardless of regional settings. The top merges are sequential, so efficiency drops quickly: speedup is only 4–6 on 16 threads. Output from `dotnet run -c Release -- 1,2,4,8,16`:

```
         n   p   Time, ms      S      E
 1 000 000   1      59,6   1,00   1,00
 1 000 000   2      34,9   1,71   0,85
 1 000 000   4      21,7   2,74   0,69
 1 000 000   8      16,2   3,68   0,46
 1 000 000  16      15,2   3,92   0,25
10 000 000   1     761,4   1,00   1,00
10 000 000   2     473,1   1,61   0,80
10 000 000   4     269,6   2,82   0,71
10 000 000   8     181,8   4,19   0,52
10 000 000  16     133,3   5,71   0,36
Table saved to speedup.csv
```

## Common mistakes

Table 6.4. Common data parallelism mistakes {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| incorrect sum, counter, or list after `Parallel.For` | race on a shared variable or collection; use local state (`localInit`/`localFinally`), `Aggregate`, `Interlocked`, or thread-safe collections |
| parallel loop slower than sequential | little work per iteration or `lock` in the body; use `Partitioner.Create` with ranges, move synchronization out of the body, parallelize the outer loop |
| PLINQ `Aggregate` result varies or differs from LINQ | the operation is not associative or commutative; use an associative operation, or `AsOrdered` for a noncommutative one |
| PLINQ result order differs from the source | PLINQ does not preserve order by default; use `AsOrdered()` or sort the result |
| `Random` in a parallel loop returns zeros or identical numbers | a shared `Random` instance is not thread-safe; use a generator per block or `Random.Shared` |
| `catch` for a specific exception type does not run | loop and PLINQ exceptions are wrapped in `AggregateException`; iterate over `InnerExceptions` |
| image filter produces stripes at partition boundaries | in-place processing reads already modified neighboring pixels; write to a new array |
| speedup stops growing after 8 threads | 8 physical cores with SMT, memory limits, sequential portion; compare with Amdahl’s law and profile |
| `Parallel.ForEach` with an asynchronous lambda finishes before the work | the `async` delegate becomes `async void`; use `Parallel.ForEachAsync` |
