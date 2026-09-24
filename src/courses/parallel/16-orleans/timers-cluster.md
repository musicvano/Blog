---
title: "Timers, streams, and the Orleans cluster"
description: "Topic 16. Actors and Microsoft Orleans: timers, streams, and the Orleans cluster"
outline: [2, 3]
sourceHash: "d56d2028bbac2d413a08f1ec1a33308605478a0dd2f4b02c53b9c0c1edb1c001"
---

# Timers, streams, and the Orleans cluster

## Timers, reminders, streams, and monitoring

### Timers

A **grain timer** is registered with the `this.RegisterGrainTimer(callback, options)` method (<https://learn.microsoft.com/dotnet/orleans/grains/timers-and-reminders>); the old `RegisterTimer` is deprecated. The `GrainTimerCreationOptions` parameters: `DueTime` (the first firing), `Period`, `Interleave` (`false` by default: the callback is a separate turn, like a method call), and `KeepAlive` (`false` by default: the timer does not prevent deactivation). The period is counted from the **completion** of the previous callback. A timer lives only within an activation: it stops after deactivation and after a silo failure. It is stopped with `Dispose()` on the `IGrainTimer` object.

### Reminders

A **reminder** is a durable timer: its description is kept in storage, so a reminder fires even after the grain is deactivated or the cluster restarts, activating the grain. The grain implements `IRemindable.ReceiveReminder(name, status)` and registers a reminder with `this.RegisterOrUpdateReminder(name, dueTime, period)`, and cancels it with `this.UnregisterReminder`. Providers: `UseInMemoryReminderService()` (development only, lost with the silo), `UseRedisReminderService` (the `Microsoft.Orleans.Reminders.Redis` package), ADO.NET, Azure Table, Cosmos DB. The minimum period is 1 min by default (`ReminderOptions.MinimumReminderPeriod`): reminders are intended for infrequent events (minutes, hours, days), not for frequent ticks.

The two mechanisms are compared in Table 16.2; a test of both reminder providers with a process restart is given in Lab 16, Example 1.

Table 16.2. Orleans timers and reminders {.caption}

| **Property** | **Timer** | **Reminder** |
| --- | --- | --- |
| bound to | the activation | the grain (its identity) |
| after deactivation or failure | disappears | fires and activates the grain |
| storage | not needed | needed (memory, Redis, SQL…) |
| period | milliseconds and seconds | minutes and longer |
| examples | a countdown to a game start, batched writes | an abandoned cart, a daily report |

### Orleans streams

**Orleans Streams** deliver a sequence of events from producers to subscribers by the identifier `StreamId.Create("namespace", "key")` (<https://learn.microsoft.com/dotnet/orleans/streaming/>). A stream does not need to be created: it is enough to know its identifier. The `AddMemoryStreams("events")` provider works in memory (for development); for production systems, there are queue providers for Azure Event Hubs, Azure Queue, and Amazon SQS. Subscriptions are kept in storage named `PubSubStore`. A producer gets a stream with `this.GetStreamProvider("events").GetStream<T>(id)` and calls `OnNextAsync`, and a consumer calls `SubscribeAsync`. Streams, a timer, and `[StatelessWorker]` are used together in the “Game lobby” example.

### Monitoring: OpenTelemetry and the Aspire dashboard

Orleans publishes metrics in the `Microsoft.Orleans` *meter* and traces in the activity sources `Microsoft.Orleans.Application` (grain calls), `Microsoft.Orleans.Lifecycle`, `Microsoft.Orleans.Storage`, and `Microsoft.Orleans.Runtime` (<https://learn.microsoft.com/dotnet/orleans/host/monitoring/>). They are sent over the OTLP protocol to any observability system. For development, the standalone **Aspire dashboard** (<https://aspire.dev/dashboard/standalone/>) in a container is convenient (Aspire is covered in detail in Topic 17):

```powershell
docker run -d --name pro15-dashboard -p 18888:18888 `
    -p 4317:18889 -e ASPIRE_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS=true `
    mcr.microsoft.com/dotnet/aspire-dashboard:13.5
```

For the `Bank.Silo` silo to send telemetry (verified):

- add the OpenTelemetry 1.19.0 packages: `OpenTelemetry.Extensions.Hosting` and `OpenTelemetry.Exporter.OpenTelemetryProtocol`;
- call `silo.AddActivityPropagation()` in `UseOrleans`;
- add the following code before `builder.Build()`:

```cs
builder.Services.AddOpenTelemetry()
    .ConfigureResource(r => r.AddService("bank-silo"))
    .WithMetrics(m => m.AddMeter("Microsoft.Orleans"))
    .WithTracing(t => t
        .AddSource("Microsoft.Orleans.Application")
        .AddSource("Microsoft.Orleans.Lifecycle"))
    .UseOtlpExporter();            // http://localhost:4317 (gRPC)
builder.Logging.AddOpenTelemetry(o => o.IncludeScopes = true);
```

The dashboard is opened at `http://localhost:18888` (Fig. 16.7). On the *Metrics* page for the `bank-silo` resource, you see, among others, `orleans-catalog-activations` (the number of activations), `orleans-app-requests-latency` (call latency), `orleans-storage-write-latency`, and `orleans-gateway-connected-clients`; on the *Traces* page, the spans of grain calls. Metrics are sent once a minute (the default export interval), so the charts do not appear immediately. The `ASPIRE_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS` variable disables token login, for local development only.

::: info Screenshot
Browser `http://localhost:18888` → Metrics, resource bank-silo, instrument orleans-catalog-activations (or orleans-app-requests-latency) as a chart while Bank.Client runs in a loop; left tree with Microsoft.Orleans instruments visible
:::

Figure 16.7. Orleans metrics in the Aspire dashboard {.caption}

Orleans 10 also introduced its own **Orleans Dashboard** (the `Microsoft.Orleans.Dashboard` package, still in preview): `siloBuilder.AddDashboard()` and `app.MapOrleansDashboard()` in a web application show silos, grain types, calls, and reminders (<https://learn.microsoft.com/dotnet/orleans/dashboard/>).

## The Orleans cluster and silo failures

In a production cluster, silos find each other through a **membership table** (`IMembershipTable`) in reliable storage: Redis (`UseRedisClustering`), ADO.NET, Azure Table, Cosmos DB, Consul, ZooKeeper, Cassandra, DynamoDB. Each silo writes its `ip:port:epoch` row there, and clients take the list of gateways from it. The `ClusterOptions` parameters: `ClusterId` (the cluster) and `ServiceId` (the application; the key of the state in storage, shared by all deployments). Silos on one PC are given different ports with `ConfigureEndpoints(siloPort, gatewayPort)`.

**Failure detection**: silos send each other **probes** (heartbeats) over the same TCP connections as messages. The defaults in Orleans 10.3.1: each silo checks up to 10 others (`NumProbedSilos`), the probe timeout is 5 s, after 3 missed probes a silo **suspects** its neighbor and writes the suspicion to the table; 2 suspicions within 2 min declare the silo **dead**. The table with optimistic concurrency (ETag) guarantees that all silos agree on the decision. A silo that has been declared dead shuts down even if it is actually alive (isolation after a network partition). A description of the protocol: <https://learn.microsoft.com/dotnet/orleans/implementation/cluster-management>.

After a silo is declared dead, the grain directory recovers, and the next call to a grain that lived on the dead silo activates it on another silo. **In-memory state is lost**: only what was written with `WriteStateAsync` survives. Measurements on two silos with clustering and state in Redis (Lab 16, Example 2): after a silo was killed, calls to its grains failed (`ConnectionFailedException`, `OrleansMessageRejectionException`) for about 11 s, after which the grains continued working on the second silo without losing the saved counters. A graceful silo shutdown (`StopAsync`) took 0.1 s and caused no errors.

::: info Screenshot
Windows Terminal with three panes (Sensors from Lab 16, example 2): silo 1 and silo 2 (`dotnet run -c Release -- silo 1|2`), client (`-- client`); silo 1 window closed; silo 2 shows “activating s1…s6, readings in storage: 10”; client lines “s1:1/10 …”, one line “s1:failure …”, then “s1:2/11 …” with continued counters
:::

Figure 16.8. Recovery after a silo failure {.caption}
