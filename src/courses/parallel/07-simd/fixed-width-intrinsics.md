---
title: "Fixed-width vectors and intrinsics"
description: "Topic 7. SIMD vectorization: Fixed-width vectors and intrinsics"
outline: [2, 3]
sourceHash: "748d3035e73d895f1cd050952b4ea7a06ec70215c08d3c14ac7887e0f2a419ae"
---

# Fixed-width vectors and intrinsics

## Fixed-width vectors

The `System.Runtime.Intrinsics` namespace <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics> contains **hardware-independent** (*cross-platform*) fixed-width vectors: `Vector64<T>`, `Vector128<T>`, `Vector256<T>`, and `Vector512<T>`. Each width has a generic structure for the data and a static class (`Vector256`) with the operations. The JIT turns these operations into processor instructions: `Vector128` into SSE or NEON, `Vector256` into AVX/AVX2, and `Vector512` into AVX-512. The width is known in advance, so the element count is constant: `Vector256<float>.Count` is always 8.

Before using a width, check `Vector256.IsHardwareAccelerated`. The JIT turns this property into a constant, so the unneeded `if` branch simply disappears from the machine code. The documentation recommends starting with `Vector128`, because it is accelerated on the most platforms, and adding wider vectors for measured “hot” spots.

The operations fall into groups: creation (`Create(value)`, `Create(span)`, `Zero`, `Indices`), loading and storing (`LoadUnsafe`, `StoreUnsafe`, `LoadAligned`, `CopyTo`), arithmetic (`+`, `*`, `Sqrt`, `Min`, `Max`, `Sum`, `Dot`, `FusedMultiplyAdd`, `AddSaturate`), comparisons (`Equals`, `GreaterThan` return masks; `EqualsAll`, `EqualsAny` return `bool`), masks (`ConditionalSelect`, `ExtractMostSignificantBits`), shifts and conversions (`ShiftRightLogical`, `ConvertToInt32`, `Widen`, `Narrow`, `As<TFrom, TTo>()`), and element access (`GetElement`, `ToScalar`, `GetLower`, `GetUpper`).

### Comparisons and masks

A vector comparison does not return `bool`. It returns a **mask** – a vector of the same type in which an element with all bits set (`0xFF` for `byte`, `NaN` for `float`) means “yes” and a zero element means “no.” A mask is used in two ways:

- **branchless conditional selection**: `ConditionalSelect(mask, x, y)` takes an element from `x` where the mask is set and from `y` where it is zero; it is the vector equivalent of `c ? x : y` for all elements at once;
- **conversion to a number**: `ExtractMostSignificantBits()` gathers the most significant bits of the mask elements into a `uint` or `ulong` (bit $i$ is the result for element $i$). Then `BitOperations.PopCount` counts the matches, and `BitOperations.TrailingZeroCount` gives the index of the first match.

```cs
Vector128<float> a = Vector128.Create(1f, 2f, 3f, 4f);
Vector128<float> limit = Vector128.Create(2.5f);
Vector128<float> mask = Vector128.GreaterThan(a, limit);
// mask = (0, 0, NaN, NaN): all bits are set for 3 and 4
uint bits = mask.ExtractMostSignificantBits();          // 0b1100 = 12
Vector128<float> r = Vector128.ConditionalSelect(mask, a, limit);
// r = (2.5, 2.5, 3, 4) – the same as Vector128.Max(a, limit)
```

Conditional selection replaces an `if` statement in the loop body. A scalar `if` with an unpredictable condition causes **branch mispredictions**, each of which costs a dozen or more processor cycles. Vector code computes both alternatives and selects the result with bitwise operations, so it contains no branches (the “Image thresholding” example).

For `byte`, the `GreaterThan` method compares **unsigned** values, even though SSE/AVX instructions compare bytes as signed: .NET adds the conversion itself.

## Platform intrinsics

**Hardware intrinsics** are methods that the JIT replaces with one specific processor instruction each. They are grouped into classes by instruction set: `System.Runtime.Intrinsics.X86.Sse2`, `Avx`, `Avx2`, `Fma`, `Avx512F`, `Avx512BW`, `Avx10v1` <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics.x86>, and for Arm, `System.Runtime.Intrinsics.Arm.AdvSimd` (NEON), `AdvSimd.Arm64`, and `Sve`. Each class has an `IsSupported` property; the nested classes `X64`, `VL`, and `V512` contain instructions available only in 64-bit mode or with an additional extension.

Intrinsics are needed when you require an instruction that is not among the hardware-independent operations, or when measurements show a gain from a specific instruction. Calling an intrinsic on a processor that does not support its instruction set throws `PlatformNotSupportedException`, so the code always has a **fallback** path: `if (Fma.IsSupported) r = Fma.MultiplyAdd(a, b, c); else r = a * b + c;`.

For Arm, check `AdvSimd.IsSupported`; on the lab PCs (x86-64), this path can only be tested on an Arm PC or in CI. The `Sve` classes are experimental in .NET 10 (compiler error `SYSLIB5003`). FMA does not round the intermediate product, so `Fma.MultiplyAdd` may differ from `a * b + c` in the last digit.

### Testing all code paths

On a single PC, you can test the fallback paths by disabling instruction sets with environment variables before starting the process (Table 7.2). These are diagnostic settings for tests, not for production programs.

Table 7.2. Environment variables for testing code paths {.caption}

| **Variable** | **Result on the i9-11900KF** |
| --- | --- |
| `DOTNET_EnableAVX512=0` | `Vector512.IsHardwareAccelerated` and `Avx512F.IsSupported` are `false` |
| `DOTNET_EnableAVX2=0` | `Vector256` is not accelerated, `Vector<float>.Count` = 4, `Avx2` and `Fma` are disabled |
| `DOTNET_EnableHWIntrinsic=0` | no vector is accelerated, all `IsSupported` = `false` |
| `DOTNET_MaxVectorTBitWidth=512` | `Vector<float>.Count` = 16 |
| `DOTNET_PreferredVectorBitWidth=256` | `Vector512.IsHardwareAccelerated` = `false` |

In PowerShell, set the variable like this: `$env:DOTNET_EnableAVX2 = "0"; dotnet run -c Release`; in bash, `DOTNET_EnableAVX2=0 dotnet run -c Release`. In Rider, environment variables are set in the run configuration (*Run → Edit Configurations… → Environment variables*).
