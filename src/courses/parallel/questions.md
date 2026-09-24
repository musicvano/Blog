---
title: "Review questions"
description: "Parallel and Distributed Computing: review questions on the course topics"
sourceHash: "93c69c10363bc2ffb0b95df8aeb23e91a2086f5d7ae3400d94b9580737febe5a"
---

# Review questions

Questions for self-check and exam preparation, grouped by course topic.

## Topic 1. Fundamentals of parallel computing

1. What are parallel and distributed computing? Compare parallelism and concurrency.
2. Describe the architectures of shared-memory and distributed-memory computing systems. What are SMP and NUMA?
3. Explain Flynn’s taxonomy: SISD, SIMD, MISD, MIMD. Give examples of modern systems.
4. What are the speedup and efficiency of a parallel algorithm? How are they measured?
5. Explain Amdahl’s law. How does the fraction of sequential code limit speedup?
6. Explain Gustafson’s law and compare it with Amdahl’s law. What are strong and weak scaling?

## Topic 2. Processes and threads

7. Compare operating system processes and threads. What is a context switch?
8. How does the operating system schedule threads? Explain priorities and time slices.
9. What is processor affinity, and how is it configured?
10. How do you create and start threads with the Thread class in C#? Compare background and foreground threads.
11. What is a thread pool (ThreadPool)? What advantages does it offer over creating threads?
12. What is thread-local storage (ThreadLocal, the ThreadStatic attribute)?

## Topic 3. Thread synchronization

13. What is a race condition? Give an example and ways to eliminate it.
14. What is a critical section? Explain the lock statement and the Monitor class.
15. Explain the atomic operations of the Interlocked class.
16. Compare the Mutex, Semaphore, SemaphoreSlim, and ReaderWriterLockSlim synchronization primitives.
17. What are deadlock, starvation, and livelock? What are the conditions for a deadlock, and how can it be prevented?
18. Explain the ManualResetEventSlim, AutoResetEvent, and Barrier signaling primitives.

## Topic 4. Thread-safe collections

19. What thread-safe collections does the System.Collections.Concurrent namespace provide? Explain how ConcurrentDictionary and ConcurrentQueue work.
20. What is the producer–consumer pattern? How do you implement it with BlockingCollection?
21. What are channels (System.Threading.Channels)? Compare bounded and unbounded channels.
22. What is false sharing? How does it affect performance?
23. How do you detect and eliminate false sharing in a parallel program?

## Topic 5. TPL tasks and async/await

24. What is the TPL? Compare tasks (Task) and threads.
25. How do you create and start tasks (Task.Run), wait for them to finish (Wait, WhenAll, WhenAny), and set up continuations (ContinueWith)?
26. How do you cancel a task with a CancellationToken?
27. How are exceptions handled in tasks? What is AggregateException?
28. Compare asynchronous programming with async/await and parallel computing.

## Topic 6. Data parallelism and PLINQ

29. What is data parallelism? Explain the Parallel.For and Parallel.ForEach methods.
30. How do you set the degree of parallelism (ParallelOptions) and terminate a parallel loop early?
31. What is PLINQ? Explain the AsParallel, AsOrdered, and WithDegreeOfParallelism methods.
32. What is data partitioning? Compare range and chunk partitioning.
33. Explain parallel sorting algorithms (parallel merge sort, quicksort).
34. What is a reduction? How do you perform a parallel sum with thread-local results?

## Topic 7. SIMD vectorization

35. What is SIMD vectorization? Which instruction sets (SSE, AVX, AVX-512, NEON) do you know?
36. How do you use the Vector&lt;T&gt; type in .NET for vector computations? What are hardware intrinsics (System.Runtime.Intrinsics, Vector256)?
37. How do you combine SIMD vectorization and multithreading to speed up computations?
38. Explain parallel matrix multiplication algorithms. How do the traversal order and cache blocking affect performance?
39. Which parallel algorithms for solving systems of linear equations do you know?

## Topic 8. Parallel algorithms

40. Which levels of parallelism do you know (bit, instruction, data, thread and task, process, job)? What is the granularity of parallelism?
41. Explain the PRAM and BSP models of parallel computation and the work–span model. What does Brent’s theorem state?
42. What are a grid system and a virtual organization? Compare a cluster, a grid, and a cloud; give examples of grid infrastructures (EGI, WLCG, BOINC).
43. Explain Foster’s PCAM methodology. Which vector and matrix decomposition schemes (block, cyclic, stripes, checkerboard) do you know?
44. How do you parallelize numerical integration and root finding for a nonlinear equation? Compare static and dynamic load balancing.

## Topic 9. Multithreading in C++

45. How do you create threads in C++ with std::thread and std::jthread?
46. Explain the C++ synchronization facilities: std::mutex, std::lock\_guard, std::scoped\_lock, std::atomic.
47. What are condition variables (std::condition\_variable)? How do you implement a task queue?
48. Explain std::async, std::future, and std::promise.
49. What are the parallel algorithms of the C++ standard library and execution policies (std::execution::par, par\_unseq)?
50. How do you build a C++ project with CMake and Ninja in JetBrains CLion with the GCC compiler?

## Topic 10. OpenMP

51. What is OpenMP? Explain the fork-join model and the pragma omp parallel and omp parallel for directives.
52. Explain the OpenMP variable scopes: shared, private, firstprivate.
53. What is a reduction in OpenMP? Give an example of a parallel sum.
54. Explain the loop iteration scheduling strategies: static, dynamic, guided.
55. What are OpenMP tasks (task, taskwait)? How do you parallelize recursive algorithms?
56. How do you bind threads to cores (OMP\_PROC\_BIND, OMP\_PLACES) taking the NUMA architecture into account?

## Topic 11. GPU computing

57. Describe the architecture of a graphics processor. Compare GPUs and CPUs for parallel computing.
58. What is CUDA? Explain the concepts of a kernel, the host and the device, and the hierarchy of threads, blocks, and grids.
59. Explain the GPU memory hierarchy and data transfer between the host and the device.
60. How do you write and run a simple CUDA C++ program with the NVIDIA CUDA Toolkit?
61. What is the ILGPU library? How do you run computations on a GPU from a C# program?
62. Which problems are efficiently solved on a GPU, and which factors limit the speedup?

## Topic 12. MPI message passing

63. What is the MPI standard? Explain a communicator, a process rank, and launching a program (mpirun).
64. Explain the point-to-point operations MPI\_Send and MPI\_Recv. What are blocking and nonblocking operations?
65. What is a deadlock in MPI programs, and how can it be avoided?
66. Explain the collective operations MPI\_Bcast, MPI\_Scatter, and MPI\_Gather and the reduction operations MPI\_Reduce and MPI\_Allreduce.
67. What are hybrid MPI + OpenMP programs? What advantages do they offer on clusters?
68. How do you measure the execution time and evaluate the scalability of an MPI program?

## Topic 13. Clusters and the Slurm scheduler

69. Describe the architecture of a computing cluster: the head and compute nodes, the network, and the shared file system.
70. What is the Slurm job scheduler? Explain the concepts of a partition, a job, and resources, and the sbatch, srun, squeue, and scancel commands.
71. How do you write a Slurm job script for an MPI program?
72. How do you configure the Linux operating system for high-performance computing?
73. How do you work with a cluster remotely over SSH and transfer files?

## Topic 14. Sockets, RPC, and gRPC

74. Describe the models of distributed computing: client–server, peer-to-peer, remote procedure call.
75. How do you implement network communication with TCP sockets in .NET?
76. What is a remote procedure call (RPC)? Compare WCF and CoreWCF.
77. What is gRPC? Explain the Protocol Buffers interface definition language (the .proto file) and the kinds of calls: unary, server streaming, client streaming, and bidirectional streaming.
78. Compare gRPC and REST in terms of performance and areas of application.

## Topic 15. The RabbitMQ broker

79. What is a message broker? Describe the AMQP model: exchanges, queues, bindings.
80. How do you implement a work queue with several workers in RabbitMQ?
81. Explain the RabbitMQ exchange types: direct, fanout, topic, headers.
82. How do you implement the publish–subscribe pattern with RabbitMQ?
83. Explain message delivery guarantees: acknowledgments, durable queues, redelivery.
84. How do you work with RabbitMQ from a .NET program with the RabbitMQ.Client library?

## Topic 16. Actors and Microsoft Orleans

85. What is the actor model? What are its advantages for distributed systems?
86. What is the Microsoft Orleans framework? Explain the concepts of virtual actors (grains) and silos.
87. How is the state of a grain stored and restored in Orleans?
88. Explain the CAP theorem. Give examples of CP and AP systems.
89. What is fault tolerance? Explain replication, retries, and the circuit breaker pattern.
90. What is consensus in distributed systems? Explain the general idea of the Raft algorithm.

## Topic 17. Docker, Kubernetes, Aspire

91. What is containerization? Compare containers and virtual machines.
92. How do you create a container image for a .NET application with a Dockerfile and run several services with Docker Compose?
93. What is Kubernetes? Explain the concepts of a Pod, a Deployment, and a Service.
94. How do you scale an application in Kubernetes and ensure its fault tolerance?
95. What is .NET Aspire? How does it simplify the development and orchestration of distributed applications?

## Topic 18. Microservice architecture

96. Compare monolithic and microservice architectures. How do you decompose a system by bounded contexts?
97. What are an API gateway and a BFF? What functions does YARP perform in a microservice system?
98. Why are distributed transactions (2PC) avoided in microservices? Explain the Saga pattern: choreography, orchestration, compensating actions.
99. Explain the Transactional Outbox and Inbox patterns. How do you ensure the idempotency of message consumers?
100. What is observability? How do OpenTelemetry and the Aspire dashboard help trace requests across services?
