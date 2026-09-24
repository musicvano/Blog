---
title: "Topic 18. Microservice architecture"
description: "Microservice architecture: system decomposition, the API gateway, data consistency (Saga, Outbox), and observability"
sourceHash: "048d2dd3d1bc10c50ca94e7d8e70505be7cd0dd65343ba7e471463576655032e"
---

# Topic 18. Microservice architecture: system decomposition, the API gateway, data consistency (Saga, Outbox), and observability

**Goal:** become familiar with the principles of microservice architecture, decomposing a system by bounded contexts, and the API gateway, Saga, Transactional Outbox, and Inbox patterns; learn to build an application of several services with their own databases in Aspire, configure a YARP API gateway with routing, JWT authentication, rate limiting, and aggregation, and implement sagas with compensating actions and idempotent RabbitMQ event consumers; master resilience strategies (timeouts, retries, circuit breakers, degradation), OpenTelemetry distributed tracing, and integration testing of microservices.

## Lecture contents

1. [Monoliths and decomposition into services](./decomposition) — Monoliths, modular monoliths, and microservices · Decomposing a system into services · A sample application: the Shop online store
2. [Service interaction and the API gateway](./gateway) — Service interaction · API gateways and BFF · Service discovery and configuration
3. [Data and the Saga pattern](./data-saga) — Data in microservices · Distributed transactions: the Saga pattern
4. [Outbox, Inbox, and resilience](./outbox-resilience) — Transactional Outbox and Inbox · Resilience of service interaction
5. [Observability, versioning, and deployment](./operations) — Observability · API versioning and testing · Deploying microservices · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
