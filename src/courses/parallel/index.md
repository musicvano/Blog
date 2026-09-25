---
title: "Parallel and distributed computing"
description: "This course covers parallel and distributed computing — from multithreaded programming for shared-memory systems in C# on .NET 10 (synchronization, TPL, PLINQ, SIMD vectorization) and the design of parallel numerical algorithms to high-performance computing in C++ using OpenMP, CUDA, and MPI on a Linux computing cluster managed by Slurm. In the final stage, you build distributed applications using gRPC, RabbitMQ, and Microsoft Orleans and deploy them in Docker containers and Kubernetes clusters, concluding with microservice architecture design. Each course topic combines a lecture with a lab assignment."
sourceHash: "c89048fac1b838e953687c7989fe5361208eb568698337e378993602fe1a45ae"
---

# Parallel and distributed computing

Modern programs run on multicore processors, graphics accelerators, computing clusters, and in the cloud. This course teaches you to use that computing power: you progress from threads on a single computer to distributed applications deployed in a cluster, and learn to choose a parallelism model for a specific problem.

This course covers parallel and distributed computing — from multithreaded programming for shared-memory systems in C# on .NET 10 (synchronization, TPL, PLINQ, SIMD vectorization) and the design of parallel numerical algorithms to high-performance computing in C++ using OpenMP, CUDA, and MPI on a Linux computing cluster managed by Slurm. In the final stage, you build distributed applications using gRPC, RabbitMQ, and Microsoft Orleans and deploy them in Docker containers and Kubernetes clusters, concluding with microservice architecture design. Each course topic combines a lecture with a lab assignment.

## Course program

### Parallel programming in C#

1. [Fundamentals of parallel and distributed computing: system architectures, Flynn’s taxonomy, Amdahl’s and Gustafson’s laws; .NET 10 and JetBrains Rider](./01-intro/)
2. [Operating system processes and threads: scheduling, priorities, processor affinity; threads and the thread pool in C#](./02-processes-threads/)
3. [Race conditions, deadlocks, and starvation; thread synchronization tools in C#](./03-synchronization/)
4. [Thread-safe collections, channels, and the producer–consumer pattern; false sharing](./04-concurrent-collections/)
5. [Task parallelism: the TPL library, cancellation, and exception handling; asynchronous programming with async/await](./05-tpl/)
6. [Data parallelism: parallel loops, PLINQ, data partitioning; parallel sorting and reduction algorithms](./06-data-parallelism/)
7. [SIMD vectorization in .NET and parallel linear algebra algorithms](./07-simd/)
8. [Models and levels of parallelism, grid systems; designing parallel algorithms for vectors, matrices, and numerical methods](./08-parallel-algorithms/)

### High-performance computing and clusters

9. [Multithreaded programming in C++ and parallel algorithms in the standard library](./09-cpp-threads/)
10. [OpenMP: parallel regions and loops, reductions, tasks; thread affinity and NUMA](./10-openmp/)
11. [GPU computing: GPU architecture, CUDA C++, and the ILGPU library for C#](./11-gpu/)
12. [Distributed computing with MPI message passing: point-to-point and collective operations, hybrid MPI + OpenMP programs](./12-mpi/)
13. [Building a Linux computing cluster with the Slurm job scheduler; configuring high-performance computing](./13-slurm-cluster/)

### Distributed systems and cloud technologies

14. [Distributed computing models: network sockets and remote procedure calls (WCF, CoreWCF, gRPC)](./14-sockets-rpc/)
15. [Messaging through the RabbitMQ broker: work queues, publish–subscribe, delivery guarantees](./15-rabbitmq/)
16. [The actor model and the Microsoft Orleans framework; the CAP theorem and fault tolerance in distributed systems](./16-orleans/)
17. [Containerizing and orchestrating distributed applications: Docker, Kubernetes, .NET Aspire](./17-containers/)
18. [Microservice architecture: system decomposition, an API gateway, data consistency (Saga, Outbox), and observability](./18-microservices/)

## Required software {#software}

| Software | Purpose | Topic |
| --- | --- | :-: |
| [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) | C# 14 programs | 1 |
| [JetBrains Rider](https://www.jetbrains.com/rider/) | C# development environment | 1 |
| [WSL 2](https://learn.microsoft.com/windows/wsl/install) with Ubuntu 26.04 LTS | Linux for module 2 | 1 |
| GCC 15, CMake, Ninja, GDB and TBB (`sudo apt install build-essential cmake ninja-build gdb libtbb-dev`) | C++ tools in Ubuntu | 9 |
| [JetBrains CLion](https://www.jetbrains.com/clion/) | C++ development environment (WSL toolchain) | 9 |
| The NVIDIA driver and the [CUDA Toolkit 13](https://developer.nvidia.com/cuda-toolkit) in WSL | GPU programming; needs an NVIDIA graphics card with CC 7.5 or higher | 11 |
| [Open MPI 5](https://www.open-mpi.org/) (`openmpi-bin libopenmpi-dev`) | MPI programs | 12 |
| Hyper-V and [Ubuntu Server 26.04 LTS](https://ubuntu.com/download/server), Slurm, MUNGE | Your own training cluster | 13 |
| [grpcurl](https://github.com/fullstorydev/grpcurl) | Testing gRPC services | 14 |
| [Docker Desktop](https://docs.docker.com/desktop/) | Containers (RabbitMQ, Redis, PostgreSQL) | 15 |
| [kind](https://kind.sigs.k8s.io/), kubectl and [Helm](https://helm.sh/docs/intro/install/) | Kubernetes cluster | 17 |
| [Aspire CLI](https://aspire.dev/get-started/install-cli/) | Orchestration and the monitoring dashboard | 17 |

The `dotnet-counters` and `dotnet-dump` diagnostic tools (topics 2–3) are installed with `dotnet tool install`, and libraries (BenchmarkDotNet, ILGPU, gRPC, Orleans and others) are added to projects as NuGet packages.

<!--@include: ../_shared/introduction.md-->

## Course materials

- [Review questions](./questions) — 100 questions covering the course topics for self-assessment and exam preparation
- [Review tasks](./exam) — practical tasks covering the topics
- [Useful links](./links) — documentation and online resources
- [Recommended reading](./literature) — textbooks and study guides
