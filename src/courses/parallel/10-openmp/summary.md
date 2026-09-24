---
title: "Summary"
description: "Topic 10. OpenMP: conclusions and review questions"
sourceHash: "a6a8779a11b7802140e4d4bdc2a4fac015e78675b7daaac083ff22d71cd715aa"
---

# Summary

## Conclusions

OpenMP makes it possible to parallelize a C++ program with compiler directives according to the fork–join model: the main thread creates a team of threads in a parallel region and waits for it at an implicit barrier. Variables declared outside the region are shared, and those declared inside it are private; the `private`, `firstprivate`, `lastprivate`, and `default(none)` clauses make this explicit. The `for` directive distributes iterations among threads, and `schedule` determines the distribution: `static` for uniform iterations, `dynamic` and `guided` for nonuniform ones. Reductions combine private copies without synchronization, while `critical`, `atomic`, and other directives synchronize access to shared data. OpenMP tasks suit recursive algorithms, provided there is a threshold below which the code runs sequentially. The `simd` directive adds vectorization inside a core. On NUMA systems, data is initialized in parallel (the first-touch policy), and threads are bound to processors with the `OMP_PLACES` and `OMP_PROC_BIND` variables. Speedup is measured with a series of runs with different `OMP_NUM_THREADS` and `OMP_SCHEDULE` values without recompiling.

## Self-check questions

1. What parts does OpenMP consist of? What are a directive and a clause?
2. Explain the fork–join model. What happens at an implicit barrier?
3. How do you enable OpenMP in GCC and in a CMake project? What does the `_OPENMP` macro show?
4. How is the number of threads in a parallel region determined?
5. Which variables in a parallel region are shared and which are private by default?
6. How do `private`, `firstprivate`, and `lastprivate` differ? Why use `default(none)`?
7. What are the requirements for a loop parallelized with the `for` directive?
8. Compare the `static`, `dynamic`, and `guided` schedules. What is `schedule(runtime)` for?
9. What do the `collapse` and `nowait` clauses do?
10. How does the `reduction` clause work? What reduction operators exist? How do you declare your own?
11. How do `critical` and `atomic` differ? What are `single`, `masked`, and `barrier` for?
12. How do tasks differ from sections? What do `taskwait`, `taskgroup`, and `taskloop` do?
13. Why do recursive algorithms with tasks need a threshold?
14. What does the `simd` directive give compared with automatic vectorization?
15. What are NUMA and the first-touch policy? How do you initialize data on a NUMA system?
16. What do the `OMP_PLACES` and `OMP_PROC_BIND` variables specify? When do you choose `close`, and when `spread`?
17. How do you check the actual thread binding and the system topology?

## Useful links

- OpenMP specifications: <https://www.openmp.org/specifications/>
- OpenMP reference cards: <https://www.openmp.org/resources/refguides/>
- GNU libgomp documentation: <https://gcc.gnu.org/onlinedocs/libgomp/>
- The CMake FindOpenMP module: <https://cmake.org/cmake/help/latest/module/FindOpenMP.html>
- LLVM OpenMP: <https://openmp.llvm.org/>
- The hwloc library: <https://www.open-mpi.org/projects/hwloc/>
- The numactl man page: <https://man7.org/linux/man-pages/man8/numactl.8.html>
- NUMA memory policies in Linux: <https://www.kernel.org/doc/html/latest/admin-guide/mm/numa_memory_policy.html>
