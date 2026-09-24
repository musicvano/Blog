---
title: "Topic 17. Docker, Kubernetes, Aspire"
description: "Containerization and orchestration of distributed applications: Docker, Kubernetes, .NET Aspire"
sourceHash: "d583f5dbf01ea9dfaae8961fb14a1c78b44be122721279e4d8c435137c999a1e"
---

# Topic 17. Containerization and orchestration of distributed applications: Docker, Kubernetes, .NET Aspire

**Goal:** become familiar with Docker containers and images, the architecture and main objects of Kubernetes, the Aspire application model, and OpenTelemetry; learn to build .NET images with a multi-stage Dockerfile, describe an environment of several services in Docker Compose, and deploy an application to a kind cluster with Deployment, Service, ConfigMap, and Secret manifests; master scaling, rolling updates, probes, HPA autoscaling, Job batch workloads, and running and observing a distributed application with Aspire.

## Lecture contents

1. [Containerization and Docker](./docker) — Virtualization and containerization · Docker Desktop and basic commands · A sample application: distributed prime counting
2. [.NET images and Docker Compose](./images-compose) — .NET images · Docker Compose
3. [Kubernetes: clusters and objects](./kubernetes) — Kubernetes: architecture and a local cluster · Kubernetes objects and kubectl
4. [Scaling and .NET Aspire](./scaling-aspire) — Scaling, updates, and fault tolerance · .NET Aspire
5. [Observability, deployment, and practices](./observability) — Observability: OpenTelemetry · Deployment with Aspire · Practices for building containerized applications · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
