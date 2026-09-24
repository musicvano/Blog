---
title: "Summary"
description: "Topic 15. The RabbitMQ broker: conclusions and review questions"
sourceHash: "0893f235be1f9ab92493bd39e1ce2ca0acbc3e61680ba2189f2e67650882e8b4"
---

# Summary

## Conclusions

A message broker makes the interaction of services asynchronous and loosely coupled: the sender and the receiver do not depend on each other in time, in number, or in speed, and a queue smooths out load peaks. RabbitMQ implements the AMQP 0-9-1 model: a publisher sends a message to an exchange, the exchange places copies into queues according to bindings and the routing key, and the broker delivers them to consumers. The direct, fanout, topic, and headers exchanges implement routing, publish–subscribe, and topic-based distribution. A work queue with competing consumers, manual acknowledgments, and prefetch distributes work among processes and survives worker crashes. The at-least-once guarantee is made up of durable queues and messages and publisher and consumer acknowledgments; an idempotent consumer eliminates duplicates. Quorum queues replicate data and limit the number of failed deliveries, dead letter exchanges and TTL make it possible to build delayed retries and a queue for error analysis, and streams keep a history of messages. The `RabbitMQ.Client` 7 client provides a fully asynchronous API, and the web console and the broker’s utilities provide tools for observation and management.

## Self-check questions

1. What advantages does messaging through a broker offer compared with a direct call? What are the drawbacks?
2. Name the entities of the AMQP 0-9-1 model and the role of each.
3. How does a connection differ from a channel? How many connections and channels does a typical application create?
4. What are virtual hosts for? What permissions does a RabbitMQ user have?
5. How do you run RabbitMQ in Docker? What are ports 5672 and 15672, a volume, and `--hostname` needed for?
6. What do the `durable`, `exclusive`, and `autoDelete` queue parameters mean? Why does RabbitMQ 4.3 reject a non-durable non-exclusive queue?
7. How does the default exchange work? How do you publish a message to a specific queue?
8. What are a work queue and competing consumers? How do you scale processing?
9. How do `autoAck: true` and manual acknowledgments differ? What happens to unacknowledged messages after a consumer crashes?
10. What is prefetch for? How does it affect the distribution of work and the throughput?
11. Compare the direct, fanout, topic, and headers exchanges. What do `*` and `#` mean in patterns?
12. What conditions are required for a message to survive a broker restart?
13. What are publisher confirms? How do you enable them in `RabbitMQ.Client` 7, and how do you speed up publishing with confirms?
14. What does `mandatory: true` mean? How does a publisher find out about an unroutable message?
15. Explain at-most-once and at-least-once semantics. Why does the broker not guarantee “exactly once”?
16. What is an idempotent consumer, and how do you implement one?
17. How do classic queues, quorum queues, and streams differ?
18. What is a dead letter exchange? When does a message “die”? What does the `x-death` header contain?
19. How do you organize delayed retries and a parking-lot queue?
20. How do you implement RPC over queues? What are `ReplyTo` and `CorrelationId` for?

## Useful links

- RabbitMQ tutorials: <https://www.rabbitmq.com/tutorials>
- The AMQP 0-9-1 model: <https://www.rabbitmq.com/tutorials/amqp-concepts>
- The .NET client: <https://www.rabbitmq.com/client-libraries/dotnet-api-guide>
- Consumer and publisher acknowledgments: <https://www.rabbitmq.com/docs/confirms>
- Prefetch: <https://www.rabbitmq.com/docs/consumer-prefetch>
- Quorum queues: <https://www.rabbitmq.com/docs/quorum-queues>
- Dead letter exchanges: <https://www.rabbitmq.com/docs/dlx>
- TTL: <https://www.rabbitmq.com/docs/ttl>
- Streams: <https://www.rabbitmq.com/docs/streams>
- The management web console: <https://www.rabbitmq.com/docs/management>
- The Docker image: <https://hub.docker.com/_/rabbitmq>
- The NuGet package: <https://www.nuget.org/packages/RabbitMQ.Client>
