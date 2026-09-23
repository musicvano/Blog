---
title: "Практика"
description: "Тема 8. Паралельні алгоритми: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Множення матриць: смуги, шахова схема й алгоритм Кеннона

Створити програму, яка множить дві матриці `double` розміром $1152 \times 1152$ трьома паралельними схемами: горизонтальними смугами, шаховою схемою ($q \times q$ блоків, кожен обчислює свій потік зі спільних матриць) і алгоритмом Кеннона (власні копії блоків, зсуви й бар’єри) для $p = q^{2} = 1 , 4 , 9 , 16$ потоків. Для кожної схеми вивести час, виміряне прискорення, прогноз прискорення за моделлю, ефективність і найбільшу різницю з еталоном.

Модель прогнозу: робота ділиться на $p$ частин, але одночасно обчислюють лише 8 фізичних ядер, тому $T_{p} = T_{1} / \min (p , 8)$; для алгоритму Кеннона додаються копіювання двох блоків на кожному зсуві та два бар’єри, час яких програма вимірює окремо. Внутрішній цикл множення блоків – операція `axpy` методом `TensorPrimitives.MultiplyAdd` (пакет `System.Numerics.Tensors`, тема 7).

```cs
using System.Diagnostics;
using System.Numerics.Tensors;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// n ділиться на 1, 2, 3 і 4, тому решітки 1×1 … 4×4 рівні.
int n = args.Length > 0 ? int.Parse(args[0]) : 1152;
const int Cores = 8;                     // фізичні ядра i9-11900KF
double[] a = Random(n, seed: 1), b = Random(n, seed: 2);
double[] expected = new double[n * n], c = new double[n * n];

Mul.Stripes(a, b, expected, n, 1);      // еталон
Console.WriteLine($"n = {n}, фізичних ядер {Cores}");
double t1 = 0;                           // перший рядок таблиці
Console.WriteLine("Схема       p  Час, мс     S  Прогноз S     E" +
    "  max|ΔC|");
foreach (string scheme in new[] { "смуги", "шахова", "Кеннон" })
{
    foreach (int q in new[] { 1, 2, 3, 4 })
    {
        int p = q * q;
        Action run = scheme switch
        {
            "смуги" => () => Mul.Stripes(a, b, c, n, p),
            "шахова" => () => Mul.Blocks2D(a, b, c, n, q),
            _ => () => Mul.Cannon(a, b, c, n, q),
        };
        double t = Median(run);
        if (t1 == 0) t1 = t;
        // Робота ділиться на p, але одночасно працюють лише 8 ядер.
        double predicted = t1 / Math.Min(p, Cores);
        if (scheme == "Кеннон")          // + обміни й бар’єри
            predicted += Model.CannonOverhead(n, q);
        double s = t1 / t;
        Console.WriteLine($"{scheme,-10}{p,3}{t,9:F1}{s,6:F1}" +
            $"{t1 / predicted,11:F1}{s / p,6:F2}" +
            $"  {MaxDiff(c, expected):G2}");
    }
}

static double[] Random(int n, int seed)
{
    Random random = new(seed);
    double[] m = new double[n * n];
    for (int i = 0; i < m.Length; i++) m[i] = random.NextDouble();
    return m;
}

static double MaxDiff(double[] x, double[] y)
{
    double max = 0;
    for (int i = 0; i < x.Length; i++)
        max = Math.Max(max, Math.Abs(x[i] - y[i]));
    return max;
}

static double Median(Action action, int runs = 7)
{
    action();
    Thread.Sleep(200);
    action();                            // прогрівання
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

static class Mul
{
    // C[rows × cols] += A[rows × inner] · B[inner × cols]; кожна
    // матриця задана масивом, зміщенням і довжиною рядка (ld).
    public static void Kernel(double[] a, int aOff, int lda,
        double[] b, int bOff, int ldb, double[] c, int cOff, int ldc,
        int rows, int inner, int cols)
    {
        for (int i = 0; i < rows; i++)
        {
            Span<double> ci = c.AsSpan(cOff + i * ldc, cols);
            for (int k = 0; k < inner; k++)
            {
                double aik = a[aOff + i * lda + k];
                var bk = b.AsSpan(bOff + k * ldb, cols);
                TensorPrimitives.MultiplyAdd(bk, aik, ci, ci);
            }
        }
    }

    // Горизонтальні смуги: потік t обчислює свої рядки C.
    public static void Stripes(double[] a, double[] b, double[] c,
        int n, int p)
    {
        Array.Clear(c);
        Parallel.For(0, p, new ParallelOptions
            { MaxDegreeOfParallelism = p }, t =>
        {
            int lo = t * n / p, hi = (t + 1) * n / p;
            Kernel(a, lo * n, n, b, 0, n, c, lo * n, n,
                hi - lo, n, n);
        });
    }

    // Шахова схема: потік (i, j) обчислює блок C_ij = Σ A_ik·B_kj,
    // читаючи рядок блоків A і стовпець блоків B зі спільної пам’яті.
    public static void Blocks2D(double[] a, double[] b, double[] c,
        int n, int q)
    {
        Array.Clear(c);
        int bs = n / q;
        Parallel.For(0, q * q, new ParallelOptions
            { MaxDegreeOfParallelism = q * q }, t =>
        {
            int i = t / q, j = t % q;
            for (int k = 0; k < q; k++)
                Kernel(a, i * bs * n + k * bs, n,
                    b, k * bs * n + j * bs, n,
                    c, i * bs * n + j * bs, n, bs, bs, bs);
        });
    }

    // Алгоритм Кеннона: у потоку (i, j) власні копії блоків A і B.
    // Після зсуву-вирівнювання q кроків: множення, бар’єр, зсув A
    // ліворуч і B угору (копіювання блоку сусіда), бар’єр.
    public static void Cannon(double[] a, double[] b, double[] c,
        int n, int q)
    {
        int bs = n / q, p = q * q;
        double[][] blockA = new double[p][], blockB = new double[p][];
        double[][] nextA = new double[p][], nextB = new double[p][];
        double[][] blockC = new double[p][];
        using Barrier barrier = new(p);
        Thread[] threads = new Thread[p];
        for (int t = 0; t < p; t++)
        {
            int i = t / q, j = t % q;
            threads[t] = new Thread(() =>
            {
                int me = i * q + j;
                // Вирівнювання: A_ij ← A_i,(i+j), B_ij ← B_(i+j),j.
                int s = (i + j) % q;
                blockA[me] = Copy(a, n, i, s, bs);
                blockB[me] = Copy(b, n, s, j, bs);
                nextA[me] = new double[bs * bs];
                nextB[me] = new double[bs * bs];
                blockC[me] = new double[bs * bs];
                barrier.SignalAndWait();
                for (int step = 0; step < q; step++)
                {
                    Kernel(blockA[me], 0, bs, blockB[me], 0, bs,
                        blockC[me], 0, bs, bs, bs, bs);
                    if (step == q - 1) break;
                    int right = i * q + (j + 1) % q;
                    int below = (i + 1) % q * q + j;
                    blockA[right].CopyTo(nextA[me], 0);   // «прийом»
                    blockB[below].CopyTo(nextB[me], 0);
                    barrier.SignalAndWait();   // усі скопіювали
                    (blockA[me], nextA[me]) = (nextA[me], blockA[me]);
                    (blockB[me], nextB[me]) = (nextB[me], blockB[me]);
                    barrier.SignalAndWait();   // усі обміняли буфери
                }
                Paste(blockC[me], c, n, i, j, bs);
            });
            threads[t].Start();
        }
        foreach (Thread thread in threads) thread.Join();
    }

    // Блок (bi, bj) розміром bs × bs – в окремий масив і назад.
    static double[] Copy(double[] m, int n, int bi, int bj, int bs)
    {
        double[] block = new double[bs * bs];
        for (int r = 0; r < bs; r++)
            m.AsSpan((bi * bs + r) * n + bj * bs, bs)
                .CopyTo(block.AsSpan(r * bs, bs));
        return block;
    }

    static void Paste(double[] block, double[] m, int n, int bi,
        int bj, int bs)
    {
        for (int r = 0; r < bs; r++)
            block.AsSpan(r * bs, bs)
                .CopyTo(m.AsSpan((bi * bs + r) * n + bj * bs, bs));
    }
}

// Прогноз накладних витрат Кеннона з двох вимірювань:
// копіювання блоку й фаза бар’єра для p потоків.
static class Model
{
    public static double CannonOverhead(int n, int q)
    {
        if (q == 1) return 0;
        int bs = n / q, p = q * q;
        double[] from = new double[bs * bs], to = new double[bs * bs];
        double copy = Time(() => from.CopyTo(to, 0), 50);
        double phase = BarrierPhase(p);
        // вирівнювання (2 блоки) + (q − 1) зсувів по 2 блоки
        // + 2 бар’єри на зсув; створення p потоків не враховано.
        return 2 * copy + (q - 1) * (2 * copy + 2 * phase);
    }

    static double BarrierPhase(int p)
    {
        const int Phases = 2000;
        using Barrier barrier = new(p);
        Thread[] threads = new Thread[p];
        long start = Stopwatch.GetTimestamp();
        for (int t = 0; t < p; t++)
        {
            threads[t] = new Thread(() =>
            {
                for (int k = 0; k < Phases; k++)
                    barrier.SignalAndWait();
            });
            threads[t].Start();
        }
        foreach (Thread thread in threads) thread.Join();
        return Stopwatch.GetElapsedTime(start).TotalMilliseconds
            / Phases;
    }

    static double Time(Action action, int repeats)
    {
        action();
        long start = Stopwatch.GetTimestamp();
        for (int k = 0; k < repeats; k++) action();
        return Stopwatch.GetElapsedTime(start).TotalMilliseconds
            / repeats;
    }
}
```

Метод `Kernel` множить будь-які прямокутні частини матриць, задані зміщенням і довжиною рядка, тому його використовують усі три схеми. Алгоритм Кеннона запускає $p$ окремих потоків `Thread`: з `Parallel.For` бар’єр на $p$ учасників міг би зависнути (лекція, розділ «Модель BSP»). «Повідомлення» моделюється копіюванням блоку сусіда у власний буфер `nextA`/`nextB`, після чого бар’єр гарантує, що всі скопіювали, а другий бар’єр – що всі обміняли буфери, перш ніж хтось почне наступне множення. Результат:

```
n = 1152, фізичних ядер 8
Схема       p  Час, мс     S  Прогноз S     E  max|ΔC|
смуги       1    206,3   1,0        1,0  1,00  0
смуги       4     65,0   3,2        4,0  0,79  0
смуги       9     41,6   5,0        8,0  0,55  0
смуги      16     37,6   5,5        8,0  0,34  0
шахова      1    208,6   1,0        1,0  0,99  0
шахова      4     73,0   2,8        4,0  0,71  0
шахова      9     54,4   3,8        8,0  0,42  0
шахова     16     52,0   4,0        8,0  0,25  0
Кеннон      1    226,2   0,9        1,0  0,91  0
Кеннон      4     73,1   2,8        4,0  0,71  1,9E-12
Кеннон      9     50,3   4,1        7,9  0,46  1,9E-12
Кеннон     16     42,9   4,8        7,8  0,30  2,1E-12
```

Найкраще прискорення (5,5 на 16 потоках) дали смуги, хоча прогноз для всіх схем однаковий –

1. Причини розбіжності, яких модель не враховує:

- одне ядро працює з вищою частотою, ніж вісім завантажених одночасно, тому $T_{1}$ відносно малий;
- у смугах усі потоки читають ту саму матрицю $B$ (10 МБ), яка лежить у спільному кеші L3, а в шаховій схемі й у Кеннона кожен потік працює з іншими блоками, і сумарний обсяг даних потоків більший за кеш;
- 9 рівних задач на 8 ядрах: одне ядро виконує дві задачі (дисбаланс відображення), тому ефективність на $p = 9$ падає до 0,42–0,55;
- рядки блоків (288 чисел) коротші за рядки смуг (1152), і виклики `MultiplyAdd` відносно дорожчі.

Накладні витрати Кеннона на копіювання й бар’єри за вимірюваннями становлять лише кілька відсотків (прогноз 7,8 замість 8,0), тож на спільній пам’яті його перевага – лише в локальності даних. Лише алгоритм Кеннона дає різницю з еталоном близько $2 \cdot 10^{- 12}$: він додає добутки блоків у іншому порядку ($k = (i + j + t) \bmod q$), тоді як смуги й шахова схема – за зростанням $k$.

## Приклад 2. Метод спряжених градієнтів для рівняння Пуассона

Створити програму, яка розв’язує систему лінійних рівнянь з п’ятидіагональною матрицею дискретного рівняння Пуассона на сітці $500 \times 500$ (250 тисяч невідомих) методом спряжених градієнтів до відносної нев’язки $10^{- 8}$ на 1, 2, 4, 8 і 16 потоках. Матриця не зберігається: множення на вектор обчислює кожен вузол з чотирьох сусідів. Праву частину отримати з відомого розв’язку, вивести кількість ітерацій, час, прискорення, похибку та контрольну суму розв’язку, щоб перевірити, що результат не залежить від кількості потоків.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Рівняння Пуассона на сітці N × N: п’ятидіагональна матриця
// A (4 на діагоналі, −1 для сусідів) не зберігається.
int size = args.Length > 0 ? int.Parse(args[0]) : 500;
const double Tolerance = 1e-8;
int n = size * size;
double[] exact = new double[n], b = new double[n];
Random random = new(4);                  // точний розв’язок x*
for (int k = 0; k < n; k++) exact[k] = random.NextDouble();
new Solver(size, 16).Apply(exact, b);    // b = A·x*

Console.WriteLine($"Сітка {size}×{size}, невідомих {n:N0}, " +
    $"точність {Tolerance:E0}");
Console.WriteLine(" p  Ітерацій  Час, мс     S  max|x - x*|" +
    "  Контроль (x, x*)");
double t1 = 0;
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    Solver solver = new(size, p);
    double[] x = [];
    int iterations = 0;
    double t = Median(() =>
        (x, iterations) = solver.Solve(b, Tolerance));
    if (t1 == 0) t1 = t;
    double error = 0;
    for (int k = 0; k < n; k++)
        error = Math.Max(error, Math.Abs(x[k] - exact[k]));
    Console.WriteLine($"{p,2}{iterations,10}{t,9:F1}{t1 / t,6:F1}" +
        $"{error,13:E2}  {solver.Dot(x, exact):R}");
}

static double Median(Action action, int runs = 5)
{
    action();
    Thread.Sleep(200);
    action();                            // прогрівання
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

class Solver(int size, int p)
{
    const int Chunks = 64;               // фіксоване розбиття
    readonly int n = size * size;
    readonly ParallelOptions options =
        new() { MaxDegreeOfParallelism = p };
    readonly double[] partial = new double[Chunks];

    (int, int) Range(int k) =>
        ((int)((long)k * n / Chunks),
         (int)((long)(k + 1) * n / Chunks));

    // q = A·d: вузол (i, j) залежить лише від чотирьох сусідів;
    // частина k – смуга рядків сітки.
    public void Apply(double[] d, double[] q) =>
        Parallel.For(0, Chunks, options, k =>
        {
            int i0 = k * size / Chunks, i1 = (k + 1) * size / Chunks;
            for (int i = i0; i < i1; i++)
            for (int j = 0; j < size; j++)
            {
                int idx = i * size + j;
                double s = 4 * d[idx];
                if (i > 0) s -= d[idx - size];
                if (i < size - 1) s -= d[idx + size];
                if (j > 0) s -= d[idx - 1];
                if (j < size - 1) s -= d[idx + 1];
                q[idx] = s;
            }
        });

    // Часткові суми 64 частин додаються в порядку номерів частин,
    // тому результат не залежить від кількості потоків p.
    public double Dot(double[] u, double[] v)
    {
        Parallel.For(0, Chunks, options, k =>
        {
            var (lo, hi) = Range(k);
            double s = 0;
            for (int i = lo; i < hi; i++) s += u[i] * v[i];
            partial[k] = s;
        });
        double sum = 0;
        for (int k = 0; k < Chunks; k++) sum += partial[k];
        return sum;
    }

    public (double[] X, int Iterations) Solve(double[] b,
        double tolerance)
    {
        double[] x = new double[n], r = (double[])b.Clone();
        double[] d = (double[])b.Clone(), q = new double[n];
        double rr = Dot(r, r), limit = tolerance * Math.Sqrt(rr);
        for (int iter = 1; iter <= 10 * n; iter++)
        {
            Apply(d, q);
            double alpha = rr / Dot(d, q);
            Parallel.For(0, Chunks, options, k =>
            {
                var (lo, hi) = Range(k);
                for (int i = lo; i < hi; i++)
                {
                    x[i] += alpha * d[i];
                    r[i] -= alpha * q[i];
                }
            });
            double rrNew = Dot(r, r);
            if (Math.Sqrt(rrNew) < limit) return (x, iter);
            double beta = rrNew / rr;
            rr = rrNew;
            Parallel.For(0, Chunks, options, k =>
            {
                var (lo, hi) = Range(k);
                for (int i = lo; i < hi; i++)
                    d[i] = r[i] + beta * d[i];
            });
        }
        return (x, -1);
    }
}
```

Клас `Solver` виконує всі операції ітерації за 64 фіксованими частинами: множення матриці на вектор (смуги рядків сітки), дві операції `axpy` в одному циклі, `d = r + βd` і скалярні добутки. Кількість потоків задає лише `MaxDegreeOfParallelism`, тому розподіл даних і порядок додавання часткових сум однакові для всіх $p$. Результат:

```
Сітка 500×500, невідомих 250 000, точність 1E-008
 p  Ітерацій  Час, мс     S  max|x - x*|  Контроль (x, x*)
 1       986   1637,1   1,0    6,78E-006  83396,574488367
 2       986   1244,9   1,3    6,78E-006  83396,574488367
 4       986    732,6   2,2    6,78E-006  83396,574488367
 8       986    405,2   4,0    6,78E-006  83396,574488367
16       986    366,4   4,5    6,78E-006  83396,574488367
```

Кількість ітерацій, похибка й контрольна сума однакові до останньої цифри для всіх $p$ – саме цього й досягає детермінована редукція. Прискорення невелике (4,5): одна ітерація триває приблизно 1,7 мс на одному потоці, а п’ять паралельних циклів за ітерацію дають близько 5 000 синхронізацій за розв’язання; до того ж операції `axpy` і скалярні добутки обмежені пропускною здатністю пам’яті. На кластері кожен скалярний добуток став би `MPI_Allreduce`, і саме їх кількість обмежує масштабованість методу.

## Приклад 3. Параметричний розрахунок маятника з динамічним балансуванням

Створити програму, яка для $64 \times 48$ пар (коефіцієнт опору $\gamma$, початкова кутова швидкість $\omega_{0}$) розв’язує рівняння маятника з опором $\theta'' = - \sin \theta - \gamma \theta'$ методом Рунге–Кутти 4-го порядку, доки енергія не стане меншою за $10^{- 6}$, і рахує повні оберти. Порівняти послідовне виконання, блочний і циклічний статичні розподіли, динамічний розподіл зі спільним лічильником і `Parallel.For`; для розподілів вивести найменший і найбільший час роботи потоку.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Маятник з опором: θ'' = −sin θ − γθ'. Для кожної пари (γ, ω0)
// інтегруємо методом Рунге–Кутти 4-го порядку, доки маятник
// не заспокоїться, і рахуємо повні оберти.
const int Gammas = 64, Speeds = 48;
double[] gamma = new double[Gammas], speed = new double[Speeds];
for (int g = 0; g < Gammas; g++) gamma[g] = 0.02 + g * 0.015;
for (int s = 0; s < Speeds; s++) speed[s] = 0.125 * (s + 1);
int tasks = Gammas * Speeds;             // задача k: g = k / Speeds
int p = Environment.ProcessorCount;
Console.WriteLine($"Задач: {tasks}, γ = {gamma[0]} … " +
    $"{gamma[^1]:F3}, ω0 = {speed[0]} … {speed[^1]}, p = {p}");

var results = new (int Turns, double Time)[tasks];
void Solve(int k) => results[k] =
    Pendulum.Settle(gamma[k / Speeds], speed[k % Speeds]);

Console.WriteLine("Розподіл задач            Час, мс     S" +
    "  Потоки, мс (min … max)");
double t0 = 0;
foreach (string mode in new[]
    { "послідовно", "блочний", "циклічний", "динамічний",
      "Parallel.For" })
{
    double[] busy = new double[p];
    double t = Median(() => Run(mode, busy));
    if (t0 == 0) t0 = t;
    string spread = mode is "послідовно" or "Parallel.For" ? ""
        : $"{busy.Min(),10:F0} … {busy.Max():F0}";
    Console.WriteLine($"{mode,-24}{t,9:F0}{t0 / t,6:F1}{spread}");
}

Console.WriteLine("Оберти до зупинки (рядки – γ, стовпці – ω0):");
Console.Write("  γ \\ ω0");
int[] shown = [15, 23, 31, 39, 47];
foreach (int s in shown) Console.Write($"{speed[s],6}");
Console.WriteLine();
foreach (int g in new[] { 0, 2, 6, 20, 63 })
{
    Console.Write($"{gamma[g],8:F3}");
    foreach (int s in shown)
        Console.Write($"{results[g * Speeds + s].Turns,6}");
    Console.WriteLine();
}

// busy[t] – час роботи потоку t у паралельних режимах.
void Run(string mode, double[] busy)
{
    if (mode == "послідовно")
    {
        for (int k = 0; k < tasks; k++) Solve(k);
        return;
    }
    if (mode == "Parallel.For")
    {
        Parallel.For(0, tasks, Solve);
        return;
    }
    int next = 0;                        // лічильник для динамічного
    Parallel.For(0, p, new ParallelOptions
        { MaxDegreeOfParallelism = p }, t =>
    {
        long start = Stopwatch.GetTimestamp();
        if (mode == "блочний")           // задачі наперед, підряд
        {
            for (int k = t * tasks / p; k < (t + 1) * tasks / p; k++)
                Solve(k);
        }
        else if (mode == "циклічний")    // t, t + p, t + 2p, …
        {
            for (int k = t; k < tasks; k += p) Solve(k);
        }
        else                             // наступна вільна задача
        {
            int k;
            while ((k = Interlocked.Increment(ref next) - 1) < tasks)
                Solve(k);
        }
        busy[t] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    });
}

static double Median(Action action, int runs = 5)
{
    action();
    Thread.Sleep(200);
    action();                            // прогрівання
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

static class Pendulum
{
    const double H = 0.01;               // крок інтегрування

    // Інтегрує, доки енергія ω²/2 + 1 − cos θ не стане < 1e-6.
    public static (int Turns, double Time) Settle(double gamma,
        double omega0)
    {
        double theta = 0, omega = omega0, t = 0;
        while (omega * omega / 2 + 1 - Math.Cos(theta) > 1e-6
            && t < 5000)
        {
            (theta, omega) = Step(theta, omega, gamma);
            t += H;
        }
        return ((int)(Math.Abs(theta) / (2 * Math.PI) + 0.5), t);
    }

    // Один крок Рунге–Кутти 4-го порядку для системи
    // θ' = ω, ω' = −sin θ − γω.
    static (double, double) Step(double theta, double omega,
        double gamma)
    {
        double k1t = omega, k1w = -Math.Sin(theta) - gamma * omega;
        double t2 = theta + H / 2 * k1t, w2 = omega + H / 2 * k1w;
        double k2t = w2, k2w = -Math.Sin(t2) - gamma * w2;
        double t3 = theta + H / 2 * k2t, w3 = omega + H / 2 * k2w;
        double k3t = w3, k3w = -Math.Sin(t3) - gamma * w3;
        double t4 = theta + H * k3t, w4 = omega + H * k3w;
        double k4t = w4, k4w = -Math.Sin(t4) - gamma * w4;
        return (theta + H / 6 * (k1t + 2 * k2t + 2 * k3t + k4t),
                omega + H / 6 * (k1w + 2 * k2w + 2 * k3w + k4w));
    }
}
```

Задача $k$ відповідає парі $\gamma =$ `gamma[k / Speeds]`, $\omega_{0} =$ `speed[k % Speeds]`, тому перші задачі мають найменший опір і тривають найдовше: маятник з $\gamma = 0 {,} 02$ заспокоюється за сотні секунд модельного часу, а з $\gamma \approx 1$ – за кілька секунд. Блочний розподіл віддає всі важкі задачі першим потокам; циклічний перемішує їх; динамічний розподіл бере наступну задачу `Interlocked.Increment`, тому всі потоки завершуються майже одночасно. Результат:

```
Задач: 3072, γ = 0,02 … 0,965, ω0 = 0,125 … 6, p = 16
Розподіл задач            Час, мс     S  Потоки, мс (min … max)
послідовно                    697   1,0
блочний                       307   2,3        12 … 295
циклічний                      63  11,0        48 … 73
динамічний                     58  11,9        59 … 59
Parallel.For                   84   8,3
Оберти до зупинки (рядки – γ, стовпці – ω0):
  γ \ ω0     2     3     4     5     6
   0,020     0    10    19    27    35
   0,050     0     4     8    11    14
   0,110     0     2     3     5     6
   0,320     0     1     1     2     2
   0,965     0     0     0     1     1
```

Блочний розподіл дає лише 2,3: найзавантаженіший потік працює 295 мс, найменш завантажений – 12 мс. Циклічний розподіл вирівнює навантаження (48–73 мс) і прискорює обчислення в 11 разів, а динамічний лічильник – у 11,9, і всі потоки працюють однаково 59 мс. `Parallel.For` за замовчуванням роздає діапазони ітерацій, які поступово зростають, і тут трохи поступається лічильнику. Таблиця обертів підтверджує фізику: що менший опір і більша початкова швидкість, то більше обертів робить маятник, перш ніж почне коливатися.
