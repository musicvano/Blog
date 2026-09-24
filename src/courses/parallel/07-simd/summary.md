---
title: "Summary"
description: "Topic 7. SIMD vectorization: conclusions and review questions"
sourceHash: "edd2ce8fd7f57c9cc4e1947c30bb33d15dc8ee6ad3c2183bfbed7729bc399a0d"
---

# Summary

## Conclusions

SIMD is parallelism inside a core: one instruction processes 4, 8, or 16 numbers in XMM, YMM, or ZMM registers. The .NET JIT does not vectorize loops automatically, so vectorization is written explicitly: with the portable variable-width `Vector<T>`, with fixed-width `Vector128/256/512` vectors checked with `IsHardwareAccelerated`, or with platform intrinsics checked with `IsSupported` and a fallback path. Comparisons return masks that replace conditional branches (`ConditionalSelect`) or are converted into bit masks (`ExtractMostSignificantBits`). A vector loop is always complemented by tail handling, and unsafe load methods are used only with verified bounds. For typical array operations, `TensorPrimitives` is the best choice. Combining SIMD and threads is effective when computation outweighs data movement; otherwise, memory bandwidth becomes the limit. Matrix multiplication demonstrates every level of optimization: the ikj loop order, cache blocking, SIMD in the inner loop, and threads over tile rows together gave a 105× speedup. Gaussian elimination is parallelized within an elimination step, the Jacobi method fully, and Gauss–Seidel through red–black ordering. Vectorized code is checked with a disassembler and compared against a reference with a tolerance.

## Self-check questions

1. What is SIMD? How does vectorization differ from multithreading?
2. What vector registers do x86-64 processors have? How many `float` and `double` numbers fit in each?
3. Which SIMD instruction sets do you know? What is AVX10, and why is it needed?
4. Why do the .NET JIT and C++ compilers without special flags not vectorize a `float` sum?
5. What does `Vector<T>.Count` depend on? How can you change the width of `Vector<T>`?
6. How does `Vector256<T>` differ from `Vector<T>`? Why check `IsHardwareAccelerated`?
7. What does a vector comparison return? How do `ConditionalSelect` and `ExtractMostSignificantBits` work?
8. What are hardware intrinsics? How do you make code work on a processor without the required instruction set?
9. How can you test every path of vectorized code on one PC?
10. What is the tail of an array? How is it handled for a sum and for a search?
11. What are `MemoryMarshal.GetReference`, `LoadUnsafe`, and `MemoryMarshal.Cast` for? What are their risks?
12. What is memory alignment, and when is `NativeMemory.AlignedAlloc` used?
13. What operations does `TensorPrimitives` provide, and when should you choose it?
14. Why do threads not speed up the sum of a large array beyond the memory bandwidth limit?
15. Describe the BLAS levels. Why is the ikj loop order faster than ijk?
16. How does blocked matrix multiplication work, and how do you choose the tile size? What is GFLOPS?
17. Which parts of Gaussian elimination can be parallelized?
18. Why is the Jacobi method easy to parallelize, but Gauss–Seidel is not? What is red–black ordering?

## Useful links

- SIMD and hardware intrinsics in .NET: <https://learn.microsoft.com/dotnet/standard/simd>
- The `Vector<T>` type: <https://learn.microsoft.com/dotnet/api/system.numerics.vector-1>
- The `System.Runtime.Intrinsics` namespace: <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics>
- x86 intrinsics: <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics.x86>
- Arm `AdvSimd` intrinsics: <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics.arm.advsimd>
- `TensorPrimitives`: <https://learn.microsoft.com/dotnet/api/system.numerics.tensors.tensorprimitives>
- `NativeMemory.AlignedAlloc`: <https://learn.microsoft.com/dotnet/api/system.runtime.interopservices.nativememory.alignedalloc>
- BenchmarkDotNet disassembler: <https://benchmarkdotnet.org/articles/features/disassembler.html>
- Intel Intrinsics Guide: <https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html>
- BLAS: <https://www.netlib.org/blas/>
