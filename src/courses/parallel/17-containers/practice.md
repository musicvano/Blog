---
title: "Practice"
description: "Topic 17. Docker, Kubernetes, Aspire: worked examples"
outline: [2, 3]
sourceHash: "53d63e447fc93ecc402b3f8bdc20cfdaea2374d55af364f1e4dd161952f1f677"
---

# Practice

Examples 1 and 2 run in the kind cluster from the lecture (the `kind-setup.ps1` script, the `localhost:5001` registry, the `pro16` namespace). Example 3 requires only Docker Desktop and the `aspire` CLI.

## Example 1. Distributed computation of π with a Kubernetes Job

Create a console program that computes one chunk of the number $\pi$ with the Monte Carlo method: the chunk number is taken from the `JOB_COMPLETION_INDEX` variable (or from an argument), the number of points from the `POINTS` variable, and the result is printed on a single line. Build an image, run 8 chunks as a Kubernetes *Indexed Job* with different degrees of parallelism, collect the results from the pod logs, and measure the time.

The project is a console one (`dotnet new console -n Pi`), `Program.cs`:

```cs
using System.Diagnostics;

// One chunk of the Monte Carlo computation of π.
// The chunk number comes from JOB_COMPLETION_INDEX (Indexed Job) or
// from an argument; the number of points from the POINTS variable.
string? env = Environment.GetEnvironmentVariable(
    "JOB_COMPLETION_INDEX");
int index = int.Parse(env ?? (args.Length > 0 ? args[0] : "0"));
long points = long.Parse(
    Environment.GetEnvironmentVariable("POINTS") ?? "100000000");

Stopwatch clock = Stopwatch.StartNew();
ulong state = 0x9E3779B97F4A7C15UL * (ulong)(index + 1); // seed
long inside = 0;
for (long i = 0; i < points; i++)
{
    double x = Next(ref state), y = Next(ref state);
    if (x * x + y * y <= 1.0) inside++;
}
// A single result line: kubectl logs collects it.
Console.WriteLine($"part={index} inside={inside} total={points} " +
    $"seconds={clock.Elapsed.TotalSeconds:F2} " +
    $"host={Environment.MachineName}");

// The xorshift64* generator: fast and separate for each chunk.
static double Next(ref ulong s)
{
    s ^= s >> 12; s ^= s << 25; s ^= s >> 27;
    return ((s * 2685821657736338717UL) >> 11) * (1.0 / (1UL << 53));
}
```

Each chunk has its own generator seed, so the chunks are independent and the result is reproducible. The `Dockerfile` (and a `.dockerignore` with the lines `bin/` and `obj/`) in the project folder:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/runtime:10.0-noble-chiseled
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Pi.dll"]
```

```powershell
docker build -t localhost:5001/pi:1.0 .
docker push localhost:5001/pi:1.0
docker run --rm -e POINTS=100000000 localhost:5001/pi:1.0 5
```

The local check printed `part=5 inside=78532068 total=100000000 seconds=0.53 host=aa437cfaca3a` (the container uses the invariant culture, hence the decimal point). The `pi-job.yaml` manifest:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
  namespace: pro16
spec:
  completions: 8             # eight computation chunks
  parallelism: 4             # at most 4 pods at the same time
  completionMode: Indexed    # a pod gets JOB_COMPLETION_INDEX
  backoffLimit: 2
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: pi
          image: localhost:5001/pi:1.0
          env:
            - { name: POINTS, value: "1000000000" }
          resources:
            requests: { cpu: "1" }
            limits: { cpu: "1", memory: 128Mi }
```

Running, waiting, and collecting the result in PowerShell:

```powershell
kubectl apply -f pi-job.yaml
kubectl -n pro16 wait --for=condition=complete job/pi --timeout=300s
kubectl -n pro16 get job pi
$parts = kubectl -n pro16 logs -l job-name=pi --tail=-1 |
    Select-String 'inside=(\d+) total=(\d+)' |
    ForEach-Object { [pscustomobject]@{
        Inside = [long]$_.Matches[0].Groups[1].Value
        Total = [long]$_.Matches[0].Groups[2].Value } }
$inside = ($parts | Measure-Object Inside -Sum).Sum
$total = ($parts | Measure-Object Total -Sum).Sum
"parts: {0}, points: {1:N0}, π ≈ {2:F6}" -f $parts.Count,
    $total, (4.0 * $inside / $total)
```

```
NAME   STATUS     COMPLETIONS   DURATION   AGE
pi     Complete   8/8           10s        20s
parts: 8, points: 8,000,000,000, π ≈ 3.141592
```

The log of each pod (`kubectl -n pro16 logs -l job-name=pi --prefix`) contains a line such as `part=6 inside=785395223 total=1000000000 seconds=5.95 host=pi-6`: a pod of an indexed job gets the host name `pi-<number>`, and one chunk with a billion points takes ≈ 6 s. To repeat the run, the job is deleted first (`kubectl -n pro16 delete job pi`), because a Job is not restarted after it completes. The time from `kubectl apply` to completion for different values of `parallelism` (median of five runs) is shown in Table 17.6.

Table 17.6. Time of an indexed job with 8 chunks {.caption}

| **parallelism** | **Time, s** | **Speedup** | **Waves of pods** |
| --- | --- | --- | --- |
| 1 | 64.97 | 1.00 | 8 |
| 2 | 34.93 | 1.86 | 4 |
| 4 | 17.88 | 3.63 | 2 |
| 8 | 9.88 | 6.57 | 1 |

The speedup is less than the number of pods because each pod has an overhead of ≈ 2 s (scheduling, container startup, loading .NET): with sequential execution, this gives $8 \times (6 + 2) \approx 65$ s. The longer a single chunk, the smaller the share of overhead. The resources `requests: { cpu: "1" }` guarantee each pod a core, so 8 pods on two kind nodes do not interfere with each other.

## Example 2. Autoscaling a compute service

Deploy a compute service (the API of the `Primes` application from the lecture, the `GET /primes?to=N` endpoint) with a HorizontalPodAutoscaler: from 1 to 8 replicas, with a target of 60% CPU relative to `requests`. Create a console load-generating client that calls a URL continuously with a given number of tasks and every 10 s prints the throughput, the average latency, the number of pods that responded, and the number of errors. Observe scaling under load and after it.

First, metrics-server is installed in the cluster from the official manifest, and a parameter is added without which it does not accept kind's self-signed kubelet certificates:

```powershell
$ms = "https://github.com/kubernetes-sigs/metrics-server/" +
    "releases/latest/download/components.yaml"
kubectl apply -f $ms
$patch = '[{"op":"add","path":"/spec/template/spec/containers/0/' +
    'args/-","value":"--kubelet-insecure-tls"}]'
kubectl -n kube-system patch deployment metrics-server `
    --type=json -p $patch
kubectl top nodes
```

After ≈ 30 s, `kubectl top nodes` shows the CPU and memory of the nodes. The `calc-hpa.yaml` manifest (port 30081 is published in `kind.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: calc
  namespace: pro16
spec:
  replicas: 1
  selector:
    matchLabels: { app: calc }
  template:
    metadata:
      labels: { app: calc }
    spec:
      containers:
        - name: calc
          image: localhost:5001/primes-api:1.1
          ports: [{ containerPort: 8080 }]
          resources:
            requests: { cpu: 250m }   # base for HPA percentages
            limits: { cpu: 500m, memory: 256Mi }
          readinessProbe:
            httpGet: { path: /health/live, port: 8080 }
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: calc
  namespace: pro16
spec:
  type: NodePort
  selector: { app: calc }
  ports: [{ port: 80, targetPort: 8080, nodePort: 30081 }]
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: calc
  namespace: pro16
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: calc
  minReplicas: 1
  maxReplicas: 8
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 60 }
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 60   # 300 s by default
```

The `/primes` endpoint does not use RabbitMQ or Redis, so readiness is checked with `/health/live`. The load-generating client (`dotnet new console -n Load`):

```cs
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Net.Http.Json;

// Load-generating client: N tasks call a URL continuously;
// every 10 s it prints the throughput, latency, and number of pods.
Console.OutputEncoding = System.Text.Encoding.UTF8;
if (args.Length < 1 || args.Contains("--help"))
{
    Console.WriteLine("Usage: Load <url> [tasks] [seconds]");
    return 1;
}
string url = args[0];
int tasks = args.Length > 1 ? int.Parse(args[1]) : 8;
int seconds = args.Length > 2 ? int.Parse(args[2]) : 120;

// A new connection every 2 s: otherwise keep-alive “pins” the
// client to one pod (a Service balances connections).
using HttpClient http = new(new SocketsHttpHandler
{
    PooledConnectionLifetime = TimeSpan.FromSeconds(2),
})
{ Timeout = TimeSpan.FromSeconds(30) };

ConcurrentDictionary<string, int> hosts = new();
long count = 0, errors = 0, ticks = 0;
Stopwatch total = Stopwatch.StartNew();
using CancellationTokenSource stop =
    new(TimeSpan.FromSeconds(seconds));

Task[] clients = [.. Enumerable.Range(0, tasks).Select(_ =>
    Task.Run(async () =>
    {
        while (!stop.IsCancellationRequested)
        {
            long start = Stopwatch.GetTimestamp();
            try
            {
                Reply? r = await http.GetFromJsonAsync<Reply>(url);
                hosts.AddOrUpdate(r!.Host, 1, (_, n) => n + 1);
                Interlocked.Add(ref ticks,
                    Stopwatch.GetTimestamp() - start);
                Interlocked.Increment(ref count);
            }
            catch (Exception) when (!stop.IsCancellationRequested)
            {
                Interlocked.Increment(ref errors);
            }
            catch (OperationCanceledException) { }
        }
    }))];

Console.WriteLine("  time  requests/s  latency, ms  pods  errors");
while (!stop.IsCancellationRequested)
{
    try { await Task.Delay(10_000, stop.Token); }
    catch (OperationCanceledException) { }
    long n = Interlocked.Exchange(ref count, 0);
    long t = Interlocked.Exchange(ref ticks, 0);
    int pods = hosts.Count;
    hosts.Clear();
    double ms = n == 0 ? 0
        : t * 1000.0 / Stopwatch.Frequency / n;
    Console.WriteLine($"{total.Elapsed.TotalSeconds,5:F0} s" +
        $"{n / 10.0,11:F1}{ms,14:F0}{pods,7}" +
        $"{Interlocked.Exchange(ref errors, 0),9}");
}
await Task.WhenAll(clients);
return 0;

sealed record Reply(long To, long Primes, string Host);
```

Run `kubectl apply -f calc-hpa.yaml`, then `kubectl -n pro16 get hpa calc -w` in a second terminal tab, and in the first, the client with 8 tasks for 180 s (one request counts the primes below 300,000, ≈ 30 ms of CPU time):

```powershell
dotnet run -c Release -- `
    "http://localhost:30081/primes?to=300000" 8 180
```

```
  time  requests/s  latency, ms  pods  errors
 10 s       30.4           258      1        0
 20 s       30.6           264      1        0
 30 s       36.0           223      2        0
 40 s       63.6           126      2        0
 50 s      102.9            78      4        0
 60 s      111.5            72      4        0
 70 s      108.2            74      4        0
 80 s      126.9            63      7        0
 90 s      177.5            45      8        0
100 s      164.1            49      8        0
…
180 s      188.6            42      8        0
```

The `TARGETS` and `REPLICAS` columns of the command `kubectl get hpa calc -w` over the same period:

```
cpu: 4%/60%     1      (before the load)
cpu: 101%/60%   1
cpu: 200%/60%   2
cpu: 199%/60%   4
cpu: 173%/60%   8
cpu: 131%/60%   8      (the load continues)
cpu: 0%/60%     8      (the client has finished)
cpu: 0%/60%     5
cpu: 0%/60%     1      (≈ 75 s after it finished)
```

One pod is limited by `limits.cpu: 500m`, that is, 200% of `requests` (250m), and serves only ≈ 30 requests per second with a latency of 260 ms. HPA recalculates the number of replicas every 15 s using the formula $\text{replicas} = \lceil \text{replicas} \times \frac{\text{current}}{\text{target}} \rceil$ and at most doubles it in one step (the default `scaleUp` behavior), so the number of pods grew 1 → 2 → 4 → 8. With 8 pods, the throughput increased by a factor of ≈ 6, and the latency dropped to 45 ms; the utilization never dropped to 60% because 8 is the maximum. After the client stopped, HPA waited for the stabilization window (60 s) and reduced the number of pods to 1. Without `PooledConnectionLifetime`, the client would keep 8 persistent connections, and new pods would receive almost no requests.

## Example 3. An Aspire application with a Redis cache and a custom metric

Create an Aspire application with two web services: `calc` (a slow computation of the number of primes below $n$, two replicas) and `front` (accepts `GET /count/{n}`, looks up the answer in the Redis cache, and on a miss calls `calc` through service discovery and stores the result for 10 min). The frontend publishes custom metrics: a request counter `front.requests` with a `result` tag (`hit`/`miss`) and a histogram `front.calc.duration`. Check caching, the distribution of calls among the replicas, and tracing.

The `Cache` solution has four projects: `Cache.AppHost`, `Cache.ServiceDefaults` (from the `aspire-starter` template), and the web projects `Cache.Calc` and `Cache.Front` (`dotnet new web`) with a reference to `Cache.ServiceDefaults`; the `Aspire.StackExchange.Redis.DistributedCaching` package (13.5.4) is added to `Cache.Front`, and `Aspire.Hosting.Redis` to `Cache.AppHost`. The AppHost:

```cs
IDistributedApplicationBuilder builder =
    DistributedApplication.CreateBuilder(args);

var redis = builder.AddRedis("redis")
    .WithContainerName("pro16-cache-redis");

var calc = builder.AddProject<Projects.Cache_Calc>("calc")
    .WithReplicas(2);                       // two instances

builder.AddProject<Projects.Cache_Front>("front")
    .WithReference(calc)                    // services__calc__…
    .WithReference(redis).WaitFor(redis)    // connection string
    .WithExternalHttpEndpoints();

builder.Build().Run();
```

`Cache.Calc/Program.cs` (the `PrimeMath.cs` file is from the lecture):

```cs
using Primes;

// A slow service: the number of primes below n.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

app.MapGet("/primes/{n:long}", (long n) => new CalcReply(
    n, PrimeMath.Count(2, n), Environment.MachineName +
    "/" + Environment.ProcessId));

app.Run();

record CalcReply(long N, long Primes, string Host);
```

`Cache.Front/Program.cs`:

```cs
using System.Diagnostics;
using System.Diagnostics.Metrics;
using Microsoft.Extensions.Caching.Distributed;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.AddRedisDistributedCache("redis");     // IDistributedCache
// Service discovery resolves the address "https+http://calc".
builder.Services.AddHttpClient("calc",
    c => c.BaseAddress = new Uri("https+http://calc"));
// Custom metrics: register the meter with OpenTelemetry.
builder.Services.AddOpenTelemetry()
    .WithMetrics(m => m.AddMeter(FrontMetrics.Name));
builder.Services.AddSingleton<FrontMetrics>();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

app.MapGet("/count/{n:long}", async (long n, IDistributedCache cache,
    IHttpClientFactory factory, FrontMetrics metrics) =>
{
    string key = $"primes:{n}";
    string? cached = await cache.GetStringAsync(key);
    if (cached is not null)
    {
        metrics.Request("hit");
        return Results.Ok(new { n, primes = long.Parse(cached),
            source = "cache" });
    }
    metrics.Request("miss");
    long start = Stopwatch.GetTimestamp();
    CalcReply? reply = await factory.CreateClient("calc")
        .GetFromJsonAsync<CalcReply>($"/primes/{n}");
    metrics.CalcTime.Record(
        Stopwatch.GetElapsedTime(start).TotalMilliseconds);
    DistributedCacheEntryOptions tenMinutes = new()
    {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
    };
    await cache.SetStringAsync(key, reply!.Primes.ToString(),
        tenMinutes);
    return Results.Ok(new { n, primes = reply.Primes,
        source = reply.Host });
});

app.Run();

record CalcReply(long N, long Primes, string Host);

// Metrics: a request counter and a histogram of calc call time.
sealed class FrontMetrics
{
    public const string Name = "Cache.Front";
    readonly Counter<long> requests;
    public Histogram<double> CalcTime { get; }

    public FrontMetrics(IMeterFactory factory)
    {
        Meter meter = factory.Create(Name);
        requests = meter.CreateCounter<long>("front.requests",
            description: "Frontend requests (cache hit/miss)");
        CalcTime = meter.CreateHistogram<double>(
            "front.calc.duration", unit: "ms",
            description: "Time of calls to the calc service");
    }

    // The result tag: hit is an answer from the cache, miss is a calc call.
    public void Request(string result) =>
        requests.Add(1,
            new KeyValuePair<string, object?>("result", result));
}
```

The meter is created through `IMeterFactory`, and `AddMeter(FrontMetrics.Name)` adds the `Cache.Front` meter to the OpenTelemetry export. The compiler rejected the call `requests.Add(1, new("result", result))` as ambiguous (`CS0121`: the overloads with one tag and with an array of tags), so the key–value pair is written out in full.

Run `aspire start` in the solution folder (or run `Cache.AppHost` from the IDE) and check with `aspire describe`:

```
Name           Type       State    Health   URLs
calc-czvetjgg  Project    Running  Healthy  http://localhost:5090
calc-hhkjhddh  Project    Running  Healthy  http://localhost:5090
front          Project    Running  Healthy  http://localhost:5186
redis          Container  Running  Healthy  redis://localhost:58711
```

Both `calc` replicas share the address `localhost:5090`: Aspire runs a proxy in front of them that distributes connections (four requests `curl.exe http://localhost:5090/primes/1000` were answered by the processes `INTEL/14648` and `INTEL/23092`). Requests to the frontend:

```powershell
foreach ($n in 5000000, 5000000, 3000000, 5000000, 3000000,
    7000000, 7000000) {
    $t = Measure-Command {
        $r = Invoke-RestMethod "http://localhost:5186/count/$n" }
    "{0} {1} {2} {3:F3} s" -f $r.n, $r.primes, $r.source,
        $t.TotalSeconds
}
```

```
5000000 348513 INTEL/23092 1.509 s
5000000 348513 cache 0.005 s
3000000 216816 INTEL/23092 0.367 s
5000000 348513 cache 0.003 s
3000000 216816 cache 0.003 s
7000000 476648 INTEL/23092 1.191 s
7000000 476648 cache 0.003 s
```

The first request for each $n$ is computed by `calc` (0.4–1.5 s), and repeated ones are returned from Redis in 3–5 ms. On the *Metrics* page of the `front` resource in the dashboard, `front.requests` (with a filter by the `result` tag) and `front.calc.duration` appear; the same metric can be read without the dashboard with the utility `dotnet-counters collect -n Cache.Front --counters Cache.Front` (verified: 20 requests from the cache produced the line `front.requests … [result=hit] … 20`). The trace of a cache miss (`aspire otel spans --trace-id …`):

```
00:18:03.055 OK   1.49s front: GET /count/{n:long}
00:18:03.278 OK  4.84ms front: HMGET
00:18:03.576 OK   0.92s front: GET
00:18:03.604 OK   0.89s calc-hhkjhddh: GET /primes/{n:long}
00:18:04.532 OK  2.55ms front: HMSET
00:18:04.534 OK  1.63ms front: EXPIRE
```

All the steps are visible: reading the cache (`HMGET`), the HTTP call to `calc` (a client span in `front` and a server span in the `calc-hhkjhddh` replica), and writing to the cache with an expiration time (`HMSET`, `EXPIRE`). The Redis spans are created by the `Aspire.StackExchange.Redis` client integration, and the HTTP spans by the instrumentation from ServiceDefaults. To stop: `aspire stop`.
