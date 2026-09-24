---
title: "Summary"
description: "Topic 16. Actors and Microsoft Orleans: conclusions and review questions"
sourceHash: "aae95231db08545f828842b8b3b7bd89ec8ead976e8ee9936742ccc8b78ebc6f"
---

# Summary

## Conclusions

The actor model replaces shared memory and locks with private state and asynchronous messages that are processed one at a time. Orleans implements virtual actors, grains, which always exist logically, are activated on the first call on one of the cluster’s silos, and are deactivated after being idle. An activation executes requests turn by turn on a single thread; reentrancy speeds up grains that wait, but brings back the risk of races, and cycles of non-reentrant calls lead to deadlocks. Grain state is stored by providers (memory, Redis, SQL) with optimistic concurrency based on an ETag; timers run within an activation, while reminders survive restarts. An Orleans cluster detects silo failures with heartbeats and a membership table and reactivates grains on live silos, losing only unsaved state. The CAP theorem states that during a network partition you must choose between consistency and availability, and PACELC adds a choice between latency and consistency when there is no partition. Quorums with $R + W \gt N$ guarantee that a read sees the latest write, Raft consensus requires a majority of nodes, and retries with exponential backoff, circuit breakers, and idempotency make a system resilient to transient failures.

## Self-check questions

1. What is an actor? Which properties of the actor model eliminate the need for locks?
2. How do “tell” and “ask” messages differ? How do you implement them with `Channel<T>`?
3. What is a virtual actor? How does a grain differ from an activation?
4. What roles do the Orleans silo, cluster, client, and gateway play?
5. Which packages do the interface, implementation, silo, and client projects need?
6. What are the `[GenerateSerializer]` and `[Id]` attributes for?
7. What is a grain turn? Why does an ordinary grain not need `lock`?
8. When are `[Reentrant]`, `[AlwaysInterleave]`, `[ReadOnly]`, and `[StatelessWorker]` used?
9. Why does a call cycle A → B → A lead to a timeout, and how do you eliminate it?
10. How do you persist grain state? What happens on an ETag conflict?
11. How does a timer differ from a reminder? What reminder providers exist?
12. How does Orleans detect a silo failure, and what happens to its grains?
13. State the CAP theorem. Give examples of CP and AP systems. What does PACELC add?
14. Compare strong, causal, and eventual consistency.
15. Why does a read see the latest write when $R + W \gt N$? What happens when three of five replicas are cut off?
16. How does Raft elect a leader and commit entries? How many failures can a 5-node cluster tolerate?
17. What types of failures occur in distributed systems?
18. How do retries with jitter and a circuit breaker work? Why is idempotency needed?

## Useful links

- Orleans documentation: <https://learn.microsoft.com/dotnet/orleans/>
- Grains: <https://learn.microsoft.com/dotnet/orleans/grains/>
- Request scheduling and reentrancy: <https://learn.microsoft.com/dotnet/orleans/grains/request-scheduling>
- Grain persistence: <https://learn.microsoft.com/dotnet/orleans/grains/grain-persistence/>
- Timers and reminders: <https://learn.microsoft.com/dotnet/orleans/grains/timers-and-reminders>
- Cluster management: <https://learn.microsoft.com/dotnet/orleans/implementation/cluster-management>
- Monitoring Orleans: <https://learn.microsoft.com/dotnet/orleans/host/monitoring/>
- Orleans source code and samples: <https://github.com/dotnet/orleans>
- The standalone Aspire dashboard: <https://aspire.dev/dashboard/standalone/>
- Resilience of .NET applications: <https://learn.microsoft.com/dotnet/core/resilience/>
- The Circuit Breaker pattern: <https://learn.microsoft.com/azure/architecture/patterns/circuit-breaker>
- The Raft algorithm: <https://raft.github.io/>
