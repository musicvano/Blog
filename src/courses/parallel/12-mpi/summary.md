---
title: "Summary"
description: "Topic 12. MPI message passing: conclusions and review questions"
sourceHash: "29072fc5eae8b675ca8d30fde4cbdfb9aff6bc44393e154932982731f4d48258"
---

# Summary

## Conclusions

MPI is a message-passing standard for distributed-memory systems: processes running the same program (the SPMD model) have their own memory and are distinguished by their ranks in a communicator. Open MPI 5.0 from the Ubuntu packages provides the `mpicxx` wrappers, the `mpirun` launcher, and the CMake target `MPI::MPI_CXX`. The point-to-point operations `MPI_Send`/`MPI_Recv` transfer a message with a tag; a standard send may wait for the receiver, so an exchange in which everyone sends first leads to a deadlock, which is eliminated with `MPI_Sendrecv` or nonblocking `MPI_Isend`/`MPI_Irecv` with `MPI_Waitall`. Collective operations (`MPI_Bcast`, `MPI_Scatter(v)`, `MPI_Gather(v)`, `MPI_Reduce`, `MPI_Allreduce`) are called by all processes of the communicator. Derived types describe structures and columns, `MPI_Comm_split` creates groups of processes, and Cartesian topologies simplify domain decomposition with halo exchange. Hybrid programs combine MPI between processes with OpenMP inside a process (`MPI_Init_thread`, `MPI_THREAD_FUNNELED`) and require correct binding (`--map-by slot:PE=…`, `--report-bindings`). Performance is evaluated with the α–β model and by measuring strong and weak scaling; problems limited by memory bandwidth barely speed up on a single computer, while on a cluster every node adds its own memory.

## Self-check questions

1. How does the distributed-memory model differ from the shared-memory model?
2. What are SPMD, a rank, and a communicator? What is `MPI_COMM_WORLD`?
3. What versions of the MPI standard exist? How does a standard differ from an implementation?
4. How do you build an MPI program with the `mpicxx` wrapper and in a CMake project?
5. What is a slot in `mpirun`? How do you run more processes than cores?
6. What does an MPI message consist of? What are tags, `MPI_ANY_SOURCE`, and `MPI_Status` for?
7. How do the `MPI_Send`, `MPI_Ssend`, `MPI_Bsend`, and `MPI_Rsend` modes differ?
8. Why can an “everyone sends, then receives” exchange work on small data and hang on large data?
9. How do `MPI_Isend`, `MPI_Irecv`, `MPI_Wait`, and `MPI_Test` work? What is overlapping computation and communication?
10. What collective operations do you know? How does `MPI_Reduce` differ from `MPI_Allreduce`, and `MPI_Scatter` from `MPI_Scatterv`?
11. What are the rules for calling collective operations?
12. What are derived types for? How do you describe a structure and a matrix column?
13. How do you create a Cartesian topology and find a process’s neighbors? What is a halo?
14. What levels of thread support does MPI define? Why use `MPI_Init_thread`?
15. How do you place the ranks of a hybrid program on cores and check the binding?
16. What is needed to run an MPI program on multiple computers?
17. What does the α–β model describe? How do you measure latency and bandwidth?
18. How does strong scaling differ from weak scaling?

## Useful links

- MPI Forum standards: <https://www.mpi-forum.org/docs/>
- Open MPI documentation: <https://docs.open-mpi.org/>
- Launching applications in Open MPI 5.0: <https://docs.open-mpi.org/en/v5.0.x/launching-apps/index.html>
- The `mpirun` man page: <https://docs.open-mpi.org/en/v5.0.x/man-openmpi/man1/mpirun.1.html>
- Launching over SSH: <https://docs.open-mpi.org/en/v5.0.x/launching-apps/ssh.html>
- The CMake FindMPI module: <https://cmake.org/cmake/help/latest/module/FindMPI.html>
- MPICH: <https://www.mpich.org/documentation/guides/>
- Open MPI projects in CLion: <https://www.jetbrains.com/help/clion/openmpi.html>
