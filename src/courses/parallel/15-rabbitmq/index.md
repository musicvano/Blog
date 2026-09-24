---
title: "Topic 15. The RabbitMQ broker"
description: "Messaging through the RabbitMQ broker: work queues, publish–subscribe, delivery guarantees"
sourceHash: "67b6ebd51e6d8f4f97b963b3594f579b384dfa0f7abfa8b9bf7f65707bdbb144"
---

# Topic 15. Messaging through the RabbitMQ broker: work queues, publish–subscribe, delivery guarantees

**Goal:** become familiar with asynchronous messaging, the architecture of the RabbitMQ broker, and the AMQP 0-9-1 model; learn to publish and consume messages with the RabbitMQ.Client 7 library, build work queues with competing consumers, prefetch, and manual acknowledgments, and route messages with direct, fanout, and topic exchanges; master the tools of guaranteed delivery: durable queues, publisher confirms, dead letter exchanges, and idempotent processing, as well as the RPC pattern over queues and distributed computing through a broker.

## Lecture contents

1. [Messaging and RabbitMQ](./messaging-rabbitmq) — Asynchronous messaging · RabbitMQ architecture and the AMQP 0-9-1 model · Deploying RabbitMQ and management tools
2. [The .NET client and work queues](./client-work-queues) — The RabbitMQ.Client 7 .NET client · Work queues and consumer acknowledgments
3. [Routing and delivery guarantees](./exchanges-delivery) — Exchanges and routing · Delivery guarantees
4. [Queue types, RPC, and operations](./queues-rpc) — Queue types, dead letter exchanges, and TTL · The RPC pattern over queues · Distributed computing through a broker · Monitoring and operations
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
