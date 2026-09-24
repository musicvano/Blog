---
title: "Summary"
description: "Topic 8. Parallel algorithms: conclusions and review questions"
sourceHash: "8bfb2b594d26cce9e2549061c33f2de434fe77b8f829ecc3d02131f2e64b1030"
---

# Summary

## Conclusions

Parallelism exists at the levels of bits, instructions, data, threads, processes, and jobs; the more expensive the interaction at a level, the coarser the parallel parts must be. Models make it possible to evaluate an algorithm before programming it: the dependency graph and the work–span model give the speedup limit $T_{1} / T_{\infty}$ and Brent’s theorem, PRAM gives the algorithm’s inherent parallelism, and BSP and LogP give the cost of communication and synchronization. A grid combines the resources of many organizations into virtual organizations with the help of middleware (ARC, HTCondor) and suits large numbers of independent jobs (EGI, WLCG, BOINC, UNG). The PCAM methodology leads from the finest partitioning through communication analysis to agglomeration and mapping onto processors; uneven work requires dynamic load balancing. Vectors are distributed in block, cyclic, or block-cyclic fashion, and matrices in stripes or blocks; for clusters, the checkerboard scheme and the Fox and Cannon algorithms reduce communication. Numerical methods provide every type of parallelism: reductions (integration, CG dot products), recursive tasks (adaptive integration), and independent tasks (roots, ODE trajectories). A prediction based on a time model with measured parameters explains the measurement results, and the isoefficiency function shows how the problem must grow as the number of processors increases.

## Self-check questions

1. Name the levels of parallelism. Which of them are implicit for the programmer?
2. What is granularity? How is it related to the cost of interaction at each level?
3. What are a dependency graph and a critical path? Why does a sequential summation loop have no parallelism?
4. How do the EREW, CREW, and CRCW PRAM models differ? Why is PRAM optimistic?
5. What are the work, span, and parallelism of an algorithm? State Brent’s theorem.
6. What phases does a BSP superstep consist of? How is its cost computed?
7. What parameters does the LogP model have, and how does it differ from BSP?
8. How does “communication” in shared memory differ from communication in distributed memory?
9. What are a grid and a virtual organization? Name Foster’s three criteria of a grid.
10. What middleware is used in a grid? What is HTCondor for?
11. What are EGI, WLCG, BOINC, and the Ukrainian National Grid?
12. How do a cluster, a grid, and a cloud differ? Which problems are suitable for a grid?
13. Describe the stages of the PCAM methodology.
14. How does static load balancing differ from dynamic balancing? What is work stealing?
15. Describe the block, cyclic, and block-cyclic distributions of a vector. When is each one advantageous?
16. Why can a parallel sum of floating-point numbers be nondeterministic? How do you make it reproducible?
17. Compare the matrix–vector multiplication schemes in terms of computation and communication.
18. How do the Fox and Cannon algorithms work? Why are they better than the striped algorithm?
19. How do you parallelize the computation of an integral? What is Runge’s rule?
20. Why does adaptive integration require dynamic load balancing? Why is a recursion threshold needed?
21. How do you find all roots of an equation on an interval in parallel? When can roots be missed?
22. Which operations of a conjugate gradient iteration are parallel, and what limits scalability?
23. What ways of parallelizing ODE systems are there?
24. How do you build a time model of a parallel program? What is the isoefficiency function?

## Useful links

- Parallel programming in .NET: <https://learn.microsoft.com/dotnet/standard/parallel-programming/>
- The `Barrier` class: <https://learn.microsoft.com/dotnet/standard/threading/barrier>
- I. Foster. Designing and Building Parallel Programs: <https://www.mcs.anl.gov/~itf/dbpp/>
- EGI: <https://www.egi.eu/>
- WLCG: <https://wlcg.web.cern.ch/>
- The grid at CERN: <https://home.cern/science/computing/grid>
- BOINC: <https://boinc.berkeley.edu/>
- HTCondor: <https://htcondor.org/>
- NorduGrid ARC: <https://www.nordugrid.org/arc/>
- Ukrainian National Grid: <http://ung.bitp.kiev.ua/ua/>
- Debugging multithreaded applications in Rider: <https://www.jetbrains.com/help/rider/Debugging_Multithreaded_Applications.html>
