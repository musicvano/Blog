---
title: "Containerization and Docker"
description: "Topic 17. Docker, Kubernetes, Aspire: containerization and Docker"
outline: [2, 3]
sourceHash: "a7062dcc3539811b9a642f3b58e7b66398d2822f82194ddede40efc6c30eabd1"
---

# Containerization and Docker

## Virtualization and containerization

In Topics 14–16, each service of a distributed system was started with the `dotnet run` command in a separate window, while RabbitMQ and Redis ran from ready-made Docker images. To move such a system to another computer or server, you need to reproduce the entire environment: the .NET version, libraries, environment variables, ports, and startup order. This problem is solved by **virtual machines** and **containers** (Fig. 17.1).

- A **virtual machine** (VM) emulates an entire computer: a hypervisor (Hyper-V, VMware, KVM) allocates processors, memory, and disk to it, and inside it runs a complete **guest OS** with its own kernel. VMs are well isolated, but an image takes up gigabytes, and startup takes seconds to minutes.
- A **container** is an ordinary process of the host OS to which the kernel presents an isolated environment: its own file system, network, process list, and resource limits. The kernel is **shared** by all containers, so a container starts in milliseconds to seconds, and an image takes up megabytes.

```mermaid
block-beta
  columns 1
  block:VM
    columns 3
    vt["<b>Virtual machines</b>"]:3
    va1["application 1"] va2["application 2"] va3["application 3"]
    vb1["libraries"] vb2["libraries"] vb3["libraries"]
    vg1["guest OS"] vg2["guest OS"] vg3["guest OS"]
    vn["each VM has its own OS kernel"]:3
    vh["hypervisor (Hyper-V)"]:3
    vo["host OS"]:3
    vw["hardware"]:3
    vs["startup: seconds – minutes; image: gigabytes"]:3
  end
  block:CT
    columns 3
    ct["<b>Containers</b>"]:3
    block:k1
      columns 1
      ca1["application 1"] cb1["libraries"]
    end
    block:k2
      columns 1
      ca2["application 2"] cb2["libraries"]
    end
    block:k3
      columns 1
      ca3["application 3"] cb3["libraries"]
    end
    cn["a container is an isolated host process"]:3
    ce["container engine: Docker Engine, containerd"]:3
    ck["<b>shared Linux kernel</b>: namespaces, cgroups"]:3
    co["host OS or WSL 2 VM"]:3
    cw["hardware"]:3
    cs["startup: milliseconds – seconds; image: megabytes"]:3
  end
```

Figure 17.1. Virtual machines and containers {.caption}

Container isolation is provided by two Linux kernel mechanisms:

- **namespaces** limit what a process **sees**: `pid` (its own process numbering; the container's first process has PID 1), `net` (its own network interfaces and ports), `mnt` (its own root file system), `uts` (the host name), `ipc`, and `user`;
- **control groups** (cgroups) limit how much a process **consumes**: CPU time, memory, and I/O.

A check in an Ubuntu container with the limits `--memory 64m --cpus 0.5`: the file `/sys/fs/cgroup/memory.max` contains `67108864` (64 MiB), the file `cpu.max` contains `50000 100000` (50 ms of CPU time for every 100 ms), the `ps` command shows only two processes (`sh` with PID 1 and `ps` itself), and the host name matches the container ID.

An **image** is an immutable container template: a file system and metadata (the startup command, environment variables, ports, user). An image consists of **layers**: each build instruction adds a layer with file changes, and identical layers are shared by all images and cached. A container is an image plus a thin writable layer that disappears along with the container. The format of images and runtimes is standardized by the **Open Container Initiative** (OCI, <https://opencontainers.org/>), so an image built by Docker can be run by containerd, Podman, and Kubernetes. Images are stored in **registries**: Docker Hub (`rabbitmq`, `redis`), Microsoft Artifact Registry (`mcr.microsoft.com/dotnet/…`), GitHub Container Registry, or your own `registry:2` registry. The full image name has the form `registry/repository:tag`, for example, `mcr.microsoft.com/dotnet/aspnet:10.0`.

::: tip Containers on Windows
Linux containers require a Linux kernel. **Docker Desktop** for Windows runs a lightweight VM in the WSL 2 subsystem (<https://docs.docker.com/desktop/features/wsl/>), and all containers run in it; `docker` commands in Windows Terminal talk to the engine in this VM. Windows containers also exist (for .NET Framework applications), but the course uses only Linux containers.
:::

## Docker Desktop and basic commands

**Docker** is a platform for building, distributing, and running containers (<https://docs.docker.com/>). The lab PCs have Docker Desktop 4.91 with Docker Engine 29.8 installed (check with `docker version`). A typical container lifecycle:

```powershell
# Pull the image and start a container in the background (-d) with
# a name, a host:container port mapping, and a named data volume.
docker run -d --name pro16-demo -p 6380:6379 `
    -v pro16-demo-data:/data redis:8.8 redis-server --appendonly yes
docker ps                          # running containers
docker logs pro16-demo             # log (stdout and stderr)
docker exec pro16-demo redis-cli set course PRO   # command inside
docker stop pro16-demo             # SIGTERM, then SIGKILL after 10 s
docker rm pro16-demo      # remove the container (the volume remains)
```

The result of `docker ps` and the volume check:

```
NAMES        IMAGE       STATUS         PORTS
pro16-demo   redis:8.8   Up 2 seconds   0.0.0.0:6380->6379/tcp
```

After `docker rm` and running `docker run` again with the same `pro16-demo-data` volume, the command `docker exec pro16-demo redis-cli get course` returned `PRO`: the data survived the removal of the container because it is stored in a **volume** (<https://docs.docker.com/engine/storage/volumes/>). The main `docker run` options:

- `-p 6380:6379` publishes a port: connections to `localhost:6380` on the host are forwarded to port 6379 of the container;
- `-v volume:/path` or `-v C:\data:/path` mounts a named volume (managed by Docker) or a host folder (a *bind mount*);
- `-e NAME=value` sets an environment variable (this is how configuration, connection strings, and passwords are passed);
- `--network network` attaches a user-defined network (<https://docs.docker.com/engine/network/>): in it, containers reach each other **by name**, and Docker's built-in DNS resolves a name to an IP address;
- `--rm` removes the container after it exits; `--memory` and `--cpus` set cgroups limits.

Other useful commands: `docker images` (local images), `docker pull`/`docker push` (download from or upload to a registry), `docker inspect` (all container parameters in JSON), `docker stats` (CPU and memory usage), and `docker system df` (disk space). Containers, images, volumes, and logs are also visible in the Docker Desktop GUI (Fig. 17.2).

::: info Screenshot
Docker Desktop → Containers: Compose stack pro16 expanded (api-1, rabbitmq-1, redis-1, worker-1…4) with Image, Status, Port(s), CPU (%) columns
:::

Figure 17.2. Containers in Docker Desktop {.caption}

## A sample application: distributed prime counting

All the lecture examples use one small distributed application, `Primes`, built on RabbitMQ (Topic 15) and Redis (Topic 16):

- **API** (`Primes.Api`, ASP.NET Core): the request `POST /jobs?to=N&chunks=K` divides the range $[ 2 , N )$ into $K$ chunks and publishes them to the durable queue `primes`; `GET /jobs/{id}` returns how many chunks are done, the number of primes, and the execution time; `GET /primes?to=N` counts primes synchronously in the API itself (a CPU load); `GET /` returns the version and the host name; `/health/live` and `/health/ready` are health checks;
- **worker** (`Primes.Worker`, a .NET service): a queue consumer with `prefetch = 1` that counts the primes in a range by trial division and writes the chunk's result to Redis;
- **RabbitMQ** distributes the chunks among the workers, and **Redis** stores the state of jobs.

The number of workers changes without changing the code: this is horizontal scaling, which Docker Compose, Kubernetes, and Aspire perform later on. The application reads connection strings from the .NET configuration (`GetConnectionString("rabbitmq")` and `GetConnectionString("redis")`), that is, from the environment variables `ConnectionStrings__rabbitmq` and `ConnectionStrings__redis`: the double underscore replaces the colon in key names.

The shared `Backend` class (the same file in both projects) connects to RabbitMQ and Redis in the background with retries. This way, the process starts even if the broker is not ready yet, and readiness is visible through the `Ready` property:

```cs
using RabbitMQ.Client;
using StackExchange.Redis;

namespace Primes;

// Connections to RabbitMQ and Redis are established in the
// background with retries: the process starts even if the broker
// is not ready yet.
public sealed class Backend(IConfiguration config,
    ILogger<Backend> log) : BackgroundService
{
    public const string Queue = "primes";
    public IConnection? Rabbit { get; private set; }
    public IConnectionMultiplexer? Redis { get; private set; }

    public bool Ready =>
        Rabbit is { IsOpen: true } && Redis is { IsConnected: true };

    protected override async Task ExecuteAsync(CancellationToken stop)
    {
        string rabbit = config.GetConnectionString("rabbitmq")
            ?? "amqp://guest:guest@localhost:5672";
        string redis = config.GetConnectionString("redis")
            ?? "localhost:6379";
        while (!Ready && !stop.IsCancellationRequested)
        {
            try
            {
                Redis ??=
                    await ConnectionMultiplexer.ConnectAsync(redis);
                Rabbit ??= await new ConnectionFactory
                    { Uri = new Uri(rabbit) }
                    .CreateConnectionAsync(stop);
                await using IChannel ch = await Rabbit
                    .CreateChannelAsync(cancellationToken: stop);
                await ch.QueueDeclareAsync(Queue, durable: true,
                    exclusive: false, autoDelete: false,
                    cancellationToken: stop);
                log.LogInformation("RabbitMQ and Redis connected");
            }
            catch (Exception ex) when (!stop.IsCancellationRequested)
            {
                log.LogWarning(
                    "Waiting for dependencies: {Error}", ex.Message);
                await Task.Delay(2000, stop);
            }
        }
    }

    public override void Dispose()
    {
        Rabbit?.Dispose();
        Redis?.Dispose();
        base.Dispose();
    }
}
```

The file `PrimeMath.cs` contains the message record `PrimeTask(string JobId, long From, long To)` and the static method `PrimeMath.Count(from, to)`, which counts the primes from `from` to `to` (exclusive) by trial division by odd divisors up to $\sqrt{n}$. The API (`Program.cs` of the `Primes.Api` project):

```cs
using System.Text.Json;
using Primes;
using RabbitMQ.Client;
using StackExchange.Redis;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<Backend>();
builder.Services.AddHostedService(
    sp => sp.GetRequiredService<Backend>());
WebApplication app = builder.Build();
string version = app.Configuration["APP_VERSION"] ?? "1.0";

// Who responded: the application version and the container (pod) name.
app.MapGet("/", () => new
{
    service = "primes-api", version, host = Environment.MachineName,
});

// Probes: the process is alive; dependencies are ready for requests.
app.MapGet("/health/live", () => Results.Ok("live"));
app.MapGet("/health/ready", (Backend b) => b.Ready
    ? Results.Ok("ready") : Results.StatusCode(503));

// Split the range [2, to) into chunks and put them into the queue.
app.MapPost("/jobs", async (long to, int chunks, Backend b) =>
{
    if (!b.Ready) return Results.StatusCode(503);
    if (to < 3 || chunks < 1 || chunks > 10_000)
        return Results.BadRequest("to >= 3, 1 <= chunks <= 10000");
    string id = Guid.NewGuid().ToString("N")[..8];
    IDatabase db = b.Redis!.GetDatabase();
    await db.HashSetAsync($"job:{id}", [
        new("to", to), new("chunks", chunks), new("started", Now()),
    ]);
    await using IChannel ch = await b.Rabbit!.CreateChannelAsync();
    long step = (to - 2 + chunks - 1) / chunks;
    for (long from = 2; from < to; from += step)
    {
        PrimeTask task = new(id, from, Math.Min(from + step, to));
        await ch.BasicPublishAsync("", Backend.Queue, false,
            new BasicProperties { Persistent = true },
            JsonSerializer.SerializeToUtf8Bytes(task));
    }
    return Results.Accepted($"/jobs/{id}", new { id });
});

// Job state: how many chunks are done and how many primes.
app.MapGet("/jobs/{id}", async (string id, Backend b) =>
{
    if (!b.Ready) return Results.StatusCode(503);
    IDatabase db = b.Redis!.GetDatabase();
    HashEntry[] job = await db.HashGetAllAsync($"job:{id}");
    if (job.Length == 0) return Results.NotFound();
    Dictionary<string, long> v = job.ToDictionary(
        e => e.Name.ToString(), e => (long)e.Value);
    // Chunk results: the field is the start of the range, the value
    // is the number of primes in the chunk.
    HashEntry[] parts = await db.HashGetAllAsync($"job:{id}:parts");
    double? seconds = v.TryGetValue("finished", out long end)
        ? (end - v["started"]) / 1000.0 : null;
    return Results.Ok(new
    {
        id, to = v["to"], chunks = v["chunks"], done = parts.Length,
        primes = parts.Sum(p => (long)p.Value), seconds,
    });
});

// Synchronous computation in the API itself: a CPU load.
app.MapGet("/primes", (long to) => new
{
    to, primes = PrimeMath.Count(2, to),
    host = Environment.MachineName,
});

app.Run();

static long Now() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
```

The worker (`PrimeWorker.cs` of the `Primes.Worker` project, the `dotnet new worker` template):

```cs
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using StackExchange.Redis;

namespace Primes;

// Consumer of the primes queue: counts the primes in a range
// and writes the result of the job chunk to Redis.
public sealed class PrimeWorker(Backend backend,
    ILogger<PrimeWorker> log) : BackgroundService
{
    readonly SemaphoreSlim busy = new(1, 1);  // chunk processing

    protected override async Task ExecuteAsync(CancellationToken stop)
    {
        while (!backend.Ready)                // wait for connections
            await Task.Delay(500, stop);
        IChannel ch = await backend.Rabbit!
            .CreateChannelAsync(cancellationToken: stop);
        await ch.BasicQosAsync(0, 1, false, stop);   // prefetch 1
        IDatabase db = backend.Redis!.GetDatabase();
        string host = Environment.MachineName;

        AsyncEventingBasicConsumer consumer = new(ch);
        consumer.ReceivedAsync += async (_, ea) =>
        {
            await busy.WaitAsync();
            try
            {
                PrimeTask t = JsonSerializer
                    .Deserialize<PrimeTask>(ea.Body.Span)!;
                long primes = PrimeMath.Count(t.From, t.To);
                string key = $"job:{t.JobId}";
                // Idempotent: a redelivery does not change the sum.
                await db.HashSetAsync($"{key}:parts", t.From,
                    primes, When.NotExists);
                long done = await db.HashLengthAsync($"{key}:parts");
                long all = (long)await db.HashGetAsync(key, "chunks");
                long now = DateTimeOffset.UtcNow
                    .ToUnixTimeMilliseconds();
                if (done == all)
                    await db.HashSetAsync(key, "finished", now,
                        When.NotExists);
                await ch.BasicAckAsync(ea.DeliveryTag, false);
                log.LogInformation(
                    "{Host}: [{From}, {To}) -> {Primes}",
                    host, t.From, t.To, primes);
            }
            finally
            {
                busy.Release();
            }
        };
        string tag = await ch.BasicConsumeAsync(Backend.Queue,
            autoAck: false, consumer, stop);
        log.LogInformation("Worker {Host} is listening to the queue", host);

        try
        {
            await Task.Delay(Timeout.Infinite, stop);
        }
        catch (OperationCanceledException)
        {
            // SIGTERM: take no new messages, wait for the current one
            // to be acknowledged, and only then close the channel.
            await ch.BasicCancelAsync(tag);
            await busy.WaitAsync();
            await ch.CloseAsync();
            log.LogInformation("Worker {Host} stopped", host);
        }
    }
}
```

The worker's `Program.cs` registers `Backend` and `PrimeWorker` as background services and increases the host's graceful shutdown timeout:

```cs
using Primes;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddSingleton<Backend>();
builder.Services.AddHostedService(
    sp => sp.GetRequiredService<Backend>());
builder.Services.AddHostedService<PrimeWorker>();
// How long to wait for the current chunk to finish after SIGTERM.
builder.Services.Configure<HostOptions>(o =>
    o.ShutdownTimeout = TimeSpan.FromSeconds(20));
builder.Build().Run();
```

Two decisions in the code matter specifically for containers:

- **idempotent writes** (Topic 14): a chunk's result is written to the Redis hash `job:{id}:parts` with the `When.NotExists` condition, so a redelivery of the same message (the “at least once” guarantee, Topic 15) does not double the sum;
- **graceful shutdown**: when the orchestrator stops a container, the process receives the `SIGTERM` signal, the .NET host cancels `stop`, and the worker first unsubscribes from the queue (`BasicCancelAsync`), then waits until the handler acknowledges the current chunk, and only then closes the channel.

In the first version of the worker, the channel was closed immediately after `BasicCancelAsync`. A test with two workers and the `docker stop` command in the middle of a job produced `"done":11` for 10 chunks and an incorrect sum: the handler had managed to write the result, but the acknowledgment no longer went through, and RabbitMQ delivered the same chunk to the second worker. The `busy` semaphore and the idempotent write eliminated both problems: `docker stop` took 0.5 s, and the log of the stopped worker ended with the lines

```
20:11:51 info: Microsoft.Hosting.Lifetime[0] Application is
  shutting down...
20:11:51 info: Primes.PrimeWorker[0] 7979f7a48cde:
  [15000002, 20000002) -> 299903
20:11:51 info: Primes.PrimeWorker[0] Worker 7979f7a48cde stopped
```

and the job finished with the correct result `"done":10,"primes":3001134`. Even an abnormal termination with `docker kill` (the `SIGKILL` signal, exit code 137) did not corrupt the result: RabbitMQ returned the unfinished chunk to the queue, and another worker processed it.
