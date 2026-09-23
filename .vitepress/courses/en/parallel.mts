import type { Course } from "../sidebar.mts";

// English navigation matching the Ukrainian course’s reading order.

export default {
  slug: "parallel",
  title: "Parallel and Distributed Computing",
  modules: [
    {
      title: "Parallel programming in C#",
      topics: [
        {
          slug: "01-intro",
          short: "Fundamentals of parallel computing",
          chapters: [
            ["why-parallel", "Why parallel computing"],
            ["architectures", "Parallel system architectures"],
            ["models-laws", "Models, metrics, and scaling laws"],
            ["measurement-tools", "Measurement, .NET 10, and Rider"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "02-processes-threads",
          short: "Processes and threads",
          chapters: [
            ["processes", "OS processes and threads"],
            ["scheduling-affinity", "Scheduling and affinity"],
            ["dotnet-threads", "Processes and the Thread class in .NET"],
            ["thread-pool", "The thread pool and monitoring"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "03-synchronization",
          short: "Thread synchronization",
          chapters: [
            ["race-conditions", "Race conditions and mutual exclusion"],
            ["locks-monitor", "Locks and condition variables"],
            ["spinlocks-signals", "Spinlocks and signaling primitives"],
            ["deadlock", "Deadlocks and the cost of synchronization"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "04-concurrent-collections",
          short: "Thread-safe collections",
          chapters: [
            ["lock-free", "Collections and nonblocking algorithms"],
            ["concurrent-collections", "Concurrent and immutable collections"],
            ["producer-consumer", "The producer–consumer pattern and channels"],
            ["false-sharing", "Cache, false sharing, and profiling"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "05-tpl",
          short: "TPL tasks and async/await",
          chapters: [
            ["task-basics", "Tasks, states, and continuations"],
            ["exceptions-cancellation", "Exceptions, cancellation, and timeouts"],
            ["async-await", "The async/await model"],
            ["async-practices", "Limits, antipatterns, and debugging"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "06-data-parallelism",
          short: "Data parallelism and PLINQ",
          chapters: [
            ["parallel-loops", "Parallel loops with the Parallel class"],
            ["invoke-partitioning", "Parallel.Invoke and data partitioning"],
            ["plinq-aggregation", "PLINQ and aggregation"],
            ["reduction-sorting", "Reduction, sorting, and performance"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "07-simd",
          short: "SIMD vectorization",
          chapters: [
            ["simd-basics", "SIMD and System.Numerics types"],
            ["fixed-width-intrinsics", "Fixed-width vectors and intrinsics"],
            ["memory-tensor", "Memory, the tail, and TensorPrimitives"],
            ["linear-algebra", "Linear algebra and performance"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "08-parallel-algorithms",
          short: "Parallel algorithms",
          chapters: [
            ["levels-models", "Levels and models of parallelism"],
            ["grid-pcam", "Grid systems and Foster’s methodology"],
            ["decomposition", "Data decomposition and integration"],
            ["numerical-methods", "Numerical methods and performance prediction"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
      ],
    },
    {
      title: "High-performance computing and clusters",
      topics: [
        {
          slug: "09-cpp-threads",
          short: "Multithreading in C++",
          chapters: [
            ["toolchain", "GCC, CMake, Ninja, and CLion"],
            ["threads-sync", "Threads and synchronization in C++"],
            ["atomics-async", "Atomic operations and asynchronous results"],
            ["std-algorithms", "Parallel algorithms and diagnostics"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "10-openmp",
          short: "OpenMP",
          chapters: [
            ["fork-join", "The fork–join model and parallel regions"],
            ["scope-loops", "Variables, loops, and reductions"],
            ["sync-tasks", "Synchronization, tasks, and simd"],
            ["numa-affinity", "Performance, NUMA, and thread affinity"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "11-gpu",
          short: "GPU computing",
          chapters: [
            ["gpu-architecture", "GPU architecture and the CUDA ecosystem"],
            ["cuda-model", "The CUDA C++ programming model"],
            ["basic-patterns", "Building and basic parallel patterns"],
            ["shared-memory-streams", "Shared memory, CUDA streams, and libraries"],
            ["ilgpu", "ILGPU, comparisons, and common mistakes"],
          ],
        },
        {
          slug: "12-mpi",
          short: "MPI message passing",
          chapters: [
            ["mpi-setup", "The MPI standard and running programs"],
            ["point-to-point", "Point-to-point and nonblocking communication"],
            ["collectives", "Collective operations and communicators"],
            ["hybrid-performance", "Hybrid programs and performance"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "13-slurm-cluster",
          short: "Clusters and the Slurm scheduler",
          chapters: [
            ["cluster-nodes", "Cluster architecture and nodes"],
            ["ssh-nfs", "SSH and a shared filesystem"],
            ["slurm", "The Slurm scheduler and commands"],
            ["job-scripts", "Job scripts and accounting"],
            ["hpc-tuning", "Configuration, monitoring, and common mistakes"],
          ],
        },
      ],
    },
    {
      title: "Distributed systems and cloud technologies",
      topics: [
        {
          slug: "14-sockets-rpc",
          short: "Sockets, RPC, and gRPC",
          chapters: [
            ["sockets", "Network communication and sockets"],
            ["protocols", "Protocols and reliability"],
            ["rpc-wcf", "Remote procedure calls and WCF"],
            ["grpc", "gRPC and technology comparisons"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "15-rabbitmq",
          short: "The RabbitMQ broker",
          chapters: [
            ["messaging-rabbitmq", "Messaging and RabbitMQ"],
            ["client-work-queues", "The .NET client and work queues"],
            ["exchanges-delivery", "Routing and delivery guarantees"],
            ["queues-rpc", "Queue types, RPC, and operations"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "16-orleans",
          short: "Actors and Microsoft Orleans",
          chapters: [
            ["actors-orleans", "The actor model and the Orleans project"],
            ["grain-execution", "Grain execution and state"],
            ["timers-cluster", "Timers, streams, and the Orleans cluster"],
            ["cap-consensus", "CAP, consistency, and fault tolerance"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "17-containers",
          short: "Docker, Kubernetes, Aspire",
          chapters: [
            ["docker", "Containerization and Docker"],
            ["images-compose", ".NET images and Docker Compose"],
            ["kubernetes", "Kubernetes: clusters and objects"],
            ["scaling-aspire", "Scaling and .NET Aspire"],
            ["observability", "Observability, deployment, and practices"],
          ],
        },
        {
          slug: "18-microservices",
          short: "Microservice architecture",
          chapters: [
            ["decomposition", "Monoliths and decomposition into services"],
            ["gateway", "Service interaction and the API gateway"],
            ["data-saga", "Data and the Saga pattern"],
            ["outbox-resilience", "Outbox, Inbox, and resilience"],
            ["operations", "Observability, versioning, and deployment"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
