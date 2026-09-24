---
title: "Summary"
description: "Topic 18. Microservice architecture: conclusions and review questions"
sourceHash: "93e8db5248751be6e9a28cd4d9d98ed967cc91e795dd238b9cd5ba3d36df94f5"
---

# Summary

## Conclusions

Microservices are an architectural style in which an application consists of autonomous services with their own data that are deployed independently and interact only over the network. They provide independent scaling, independent deployment, and technological freedom for teams at the cost of distribution: network latency and failures, eventual consistency, and more complex infrastructure and debugging, so it is worth starting with a modular monolith. Service boundaries are drawn along business capabilities and DDD bounded contexts. An API gateway (YARP) hides the internal structure from clients and performs routing, authentication, rate limiting, and aggregation, while service discovery (Aspire, Kubernetes DNS) frees the code from addresses. Instead of distributed transactions, sagas with compensating actions are used; the saga state is persisted, and the steps are made idempotent so that the system can recover after failures. Transactional Outbox guarantees that an event is published if and only if the data change has been committed, and Inbox filters out redeliveries: in testing, not a single event was lost while the broker was stopped, and no order received two deliveries. Timeouts, retries, and a circuit breaker turned a payment service outage from 6-second hangs into failures within 23 ms followed by automatic compensation. OpenTelemetry distributed tracing showed the entire path of an order (31 spans across six services), and `Aspire.Hosting.Testing` integration tests check the system together with a real database and broker.

## Self-check questions

1. How do a monolith, a modular monolith, and microservices differ? When are microservices not needed?
2. What is a bounded context? Why is a single “product” model for all services harmful?
3. How does Conway's law affect service boundaries?
4. Why does the availability of a chain of synchronous calls decrease? Calculate it for 4 services with an availability of 99.5%.
5. How does an event differ from a command? How does choreography differ from orchestration?
6. What functions does an API gateway perform? What is a BFF?
7. How are routes and clusters described in YARP? How does the gateway find service addresses in Aspire?
8. Why must each service have its own database? What is eventual consistency?
9. What are CQRS and projections? When are they needed?
10. Why is two-phase commit unsuitable for microservices? How does a saga work?
11. What is a compensating action? How does it differ from rolling back a transaction?
12. How is the state of an orchestrated saga stored? What does the recovery service do?
13. What is a dual write? How does Transactional Outbox solve it?
14. Why does an Outbox relay provide “at least once” delivery? How does Inbox eliminate duplicates?
15. Why is an idempotency key needed in an order creation request?
16. Which resilience strategies are used between services? How does a circuit breaker work?
17. What parameters does the standard .NET resilience handler have, and why are they changed?
18. How is the trace context passed through HTTP, gRPC, and RabbitMQ? What should be done with the Outbox?
19. How are APIs and events versioned? What are contract tests?
20. How do you write an integration test with `Aspire.Hosting.Testing`?
21. How do the rolling update, blue–green, and canary deployment strategies differ?

## Useful links

- .NET microservices architecture: <https://learn.microsoft.com/dotnet/architecture/microservices/>
- The microservices architecture style: <https://learn.microsoft.com/azure/architecture/guide/architecture-styles/microservices>
- Microservice boundaries: <https://learn.microsoft.com/azure/architecture/microservices/model/microservice-boundaries>
- API gateways: <https://learn.microsoft.com/azure/architecture/microservices/design/gateway>
- YARP: <https://learn.microsoft.com/aspnet/core/fundamentals/servers/yarp/yarp-overview>
- The Saga pattern: <https://learn.microsoft.com/azure/architecture/patterns/saga>
- Transactional Outbox: <https://learn.microsoft.com/azure/architecture/best-practices/transactional-outbox-cosmos>
- Resilient HTTP apps: <https://learn.microsoft.com/dotnet/core/resilience/http-resilience>
- Service discovery in Aspire: <https://aspire.dev/fundamentals/service-discovery/>
- OpenTelemetry for .NET: <https://opentelemetry.io/docs/languages/dotnet/>
- Testing with Aspire: <https://aspire.dev/testing/overview/>
- Pact: <https://docs.pact.io/>
