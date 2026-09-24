---
title: "Summary"
description: "Topic 11. GPU computing: conclusions and review questions"
sourceHash: "5f20dab0150057851b9dd34c468f571ff4dfe7703dbd2261d2920097efa00b41"
---

# Summary

## Conclusions

A GPU has thousands of simple cores grouped into streaming multiprocessors and fast memory, but data reaches it through the slower PCIe bus. A CUDA C++ program launches a kernel (`__global__`) as a grid of thread blocks; each thread computes its global index from `blockIdx`, `blockDim`, and `threadIdx` and checks bounds. The host allocates device memory, copies data, launches the kernel, and copies the result back; pinned memory doubles copy speed, and unified memory simplifies code. Shared memory and `__syncthreads()` let a block reuse data (tiles in matrix multiplication) and build reductions, and local histograms reduce contention among atomic operations. CUDA streams overlap copying with computation, and events measure time on the GPU. The Thrust and cuBLAS libraries are faster than hand-written kernels, and Nsight Systems shows where time is spent. ILGPU lets you write kernels in C# without the CUDA Toolkit. A fair comparison with the CPU includes copies: the GPU wins on problems with many computations per byte of data.

## Self-check questions

1. How does GPU architecture differ from CPU architecture? What are an SM and a warp?
2. What does the SIMT model mean? Why does divergence inside a warp slow down a kernel?
3. What parts make up the CUDA platform? What is compute capability?
4. How do you install CUDA in WSL2, and why must you not install the Linux driver?
5. How do the `__global__`, `__device__`, and `__host__` qualifiers differ?
6. Describe the grid – block – thread hierarchy. How do you compute a thread’s global index?
7. Why check bounds in a kernel, and how do you compute the number of blocks?
8. What steps does a program perform to exchange data between the host and the device?
9. How does pinned memory differ from ordinary memory? What is unified memory?
10. What kinds of device memory exist? What is access coalescing?
11. How do you build a CUDA project with CMake? What does `CMAKE_CUDA_ARCHITECTURES` specify?
12. How do you check for kernel launch and execution errors?
13. What is tiling, and why does it need two `__syncthreads()` calls?
14. How is a parallel reduction performed? Why is sequential addressing faster?
15. Why use local histograms in shared memory?
16. What are CUDA streams, and how do you overlap copying with computation?
17. How do you correctly measure kernel execution time?
18. What does Nsight Systems show?
19. What are the main ILGPU classes, and what restrictions apply to ILGPU kernels?
20. When is GPU computing worthwhile, and when is it not?

## Useful links

- CUDA Programming Guide: <https://docs.nvidia.com/cuda/cuda-programming-guide/>
- CUDA C++ Best Practices Guide: <https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html>
- CUDA on WSL: <https://docs.nvidia.com/cuda/wsl-user-guide/index.html>
- CUDA Toolkit: <https://developer.nvidia.com/cuda-toolkit>
- Compute capability of NVIDIA GPUs: <https://developer.nvidia.com/cuda-gpus>
- Nsight Systems: <https://docs.nvidia.com/nsight-systems/>
- The CMake FindCUDAToolkit module: <https://cmake.org/cmake/help/latest/module/FindCUDAToolkit.html>
- CUDA projects in CLion: <https://www.jetbrains.com/help/clion/cuda-projects.html>
- ILGPU documentation: <https://ilgpu.net/docs/>
