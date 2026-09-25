---
title: "Tasks"
description: "Topic 7. SIMD vectorization: task variants"
outline: [2, 3]
sourceHash: "4027cf654196b06aff647b57662c6c69b54d1c9bedd34d56ed0f838f7d62f8aa"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Mixing audio tracks {#v1}

**1. Initial level.** Create a console program that generates two audio tracks of 10,000,000 `short` samples each (440 Hz and 660 Hz sine waves at a 44,100 Hz sampling rate), mixes them by element-wise saturating addition in scalar code and with `Vector256.AddSaturate`, checks that the results match, and prints the time of both variants and the number of clipped samples.

**2. Basic level.** Create a console program that generates two audio tracks of 10,000,003 `short` samples each (440 Hz and 660 Hz sine waves), prompts for the volume of each track (0 to 2), validates the input, and mixes the tracks with scaling and saturation in three ways: scalar, `Vector<T>`, and `Vector256<T>` with tail handling. The program prints a “method – time, ms – speedup – match” table.

**3. Advanced level.** Create a `mix` console application that accepts the options `--input a.raw,b.raw` (headerless 16-bit samples), `--gains 0.8,1.2`, `--output mix.raw`, `--mode scalar|vector|parallel`, and `--help`. The `parallel` mode splits the tracks into blocks for `Parallel.For` and mixes each block with `Vector256`. The program writes the result and prints a time and speedup table for all modes and the percentage of clipped samples; argument errors and files of different lengths go to the error stream with exit codes 1 and 2.

### Variant 2. Photo brightness and contrast {#v2}

**1. Initial level.** Create a console program that creates a 4000×3000-byte grayscale image (a generator with a fixed seed), increases the brightness by 40 with saturation in scalar code and with `Vector256<byte>` and `Vector256.AddSaturate`, checks that the results match byte for byte, and prints the time of both variants.

**2. Basic level.** Create a console program that prompts for a brightness change (−100 to 100) and a contrast factor (0.5 to 2), validates the input, and processes a 6000×4000-byte image by the formula $p' = (p - 128) \cdot k + 128 + b$, clamped to 0–255, in scalar and vector code (`Vector256<short>`, widening with `Widen` and narrowing with `Narrow`). The program prints the time, the speedup, and the number of pixels that differ from the reference.

**3. Advanced level.** Create a `photo` console application that accepts the arguments `input.pgm output.pgm` and the options `--brightness`, `--contrast`, `--threads 1,2,4,8,16`, and `--help`. The program reads a PGM (P5) image; processes it in scalar code, in vector code (`Vector256`), and in vector code with `Parallel.For` over rows for each thread count; checks that the results match; prints a “method – threads – time – $S$” table; and writes the result. PGM format errors go to the error stream with exit code 2, argument errors with code 1.

### Variant 3. Finding similar texts {#v3}

**1. Initial level.** Create a console program that generates 100,000 text feature vectors of dimension 384 (`float`, fixed seed) and a query vector, computes the cosine similarity of the query to each vector with a scalar loop and with the `TensorPrimitives.CosineSimilarity` method, and prints the index and similarity of the most similar text and the time of both approaches.

**2. Basic level.** Create a console program that prompts for the number of vectors (1000 to 500,000) and the dimension (16 to 1024), validates the input, generates the vectors and a query, finds the 10 most similar vectors by cosine similarity (`TensorPrimitives`), and prints a “rank – index – similarity” table, the search time, and a scalar check of first place.

**3. Advanced level.** Create a `similar` console application that accepts the options `--data <CSV file>` (each line is a text title followed by the vector’s numbers), `--query <line number>`, `--top <k>`, `--threads 1,2,4,8`, and `--help`. The program normalizes all vectors (`TensorPrimitives.Norm`, `Divide`), searches for the top $k$ by dot product sequentially and with `Parallel.For` over blocks, and prints the results and a time table with the speedup. Data and option errors go to the error stream with exit code 1.

### Variant 4. Stock price statistics {#v4}

**1. Initial level.** Create a console program that generates 20,000,000 `double` prices by a random walk starting at 100 (fixed seed) and computes the minimum, maximum, and mean with a scalar loop and with the `TensorPrimitives.Min`, `Max`, and `Sum` methods, printing the results and the time of both approaches.

**2. Basic level.** Create a console program that prompts for the number of prices (1000 to 50,000,000), validates the input, generates `double` prices by a random walk starting at 100 (fixed seed), and computes the minimum, maximum, mean, and standard deviation in three ways: scalar, `Vector256<double>` with tail handling, and `TensorPrimitives`. The program prints a table of values, times, and the relative difference from the reference.

**3. Advanced level.** Create a `pricestats` application with a BenchmarkDotNet project that compares scalar, `Vector<T>`, `Vector256<T>`, and `TensorPrimitives` implementations of stock price statistics (minimum, maximum, mean, standard deviation) for generated arrays of length 1000, 100,000, and 10,000,000 (the `[Params]` attribute, a baseline method with `Baseline = true`). A separate `--file <CSV>` mode reads prices from the `close` column and prints the statistics and a 20-day moving average (vectorized). File errors go to the error stream with exit code 2.

### Variant 5. Matrix multiplication {#v5}

**1. Initial level.** Create a console program that multiplies two 1000×1000 `double` matrices (fixed seed) with the ijk and ikj loop orders and prints the time of both orders, GFLOPS ($2 n^{3} / t / 10^{9}$), and the largest element difference between the results.

**2. Basic level.** Create a console program that prompts for the matrix size $n$ (256 to 2048) and a comma-separated list of tile sizes, validates the input, and for each tile measures blocked multiplication with a vectorized `Vector256<double>` inner loop. The program prints a “tile – time, ms – GFLOPS” table (median of three runs), marks the best tile, and verifies the result by comparing it with the ikj order.

**3. Advanced level.** Create a `gemm` console application that multiplies two random `double` matrices of size `--n` with a blocked algorithm using SIMD and `Parallel.For` over tile rows, with the options `--blocks 16,32,64,128`, `--threads 1,2,4,8,16`, `--csv <file>`, and `--help`. For each “tile – threads” pair, the program checks the result against ikj multiplication (tolerance $10^{- 9}$), prints a table of time, GFLOPS, speedup, and efficiency, and writes it to CSV. Argument errors go to the error stream with exit code 1, and mismatched results with code 2.

### Variant 6. Gaussian elimination {#v6}

**1. Initial level.** Create a console program that solves a 500×500 linear system with a random matrix and a known solution by Gaussian elimination with partial pivoting: sequentially and with `Parallel.For` for row elimination. The program prints the time of both variants and the maximum error of the solution.

**2. Basic level.** Create a console program that prompts for the system size $n$ (100 to 2000), validates the input, and solves the linear system by Gaussian elimination in three ways: scalar, with vectorized row subtraction (`TensorPrimitives.MultiplyAdd`), and vectorized with `Parallel.For`. The program prints a “method – time – speedup – solution error – residual $\max | A x - b |$” table.

**3. Advanced level.** Create a `gauss` console application that solves a linear system by Gaussian elimination with partial pivoting, performing row elimination in vector code and in parallel (`Parallel.For`), with the options `--n` (a random system with a known solution) or `--file <CSV matrix>`, `--threads`, `--min-rows <parallel elimination threshold>`, and `--help`. When few rows remain, elimination is sequential. The program prints the first 10 values of the solution, the residual, a time table for the thread counts, and the best threshold. A singular matrix (a pivot smaller than $10^{- 12}$) produces a message in the error stream and exit code 2.

### Variant 7. Particles in a simulation {#v7}

**1. Initial level.** Create a console program that simulates 1,000,000 particles with `Vector3` positions and velocities: at each step it adds gravity to the velocity and the velocity to the position ($\Delta t = 0 {,} 01$), performs 100 steps, and prints the average particle height and the number of steps per second.

**2. Basic level.** Create a console program that prompts for the number of particles and steps, validates the input, and simulates particle motion under gravity (at each step, gravity is added to the velocity and the velocity to the position) in two ways: a `Vector3` array (AoS) and separate `float[]` coordinate arrays updated with `Vector256` (SoA). Particles that fall below zero bounce back (`ConditionalSelect`). The program prints the steps per second for both approaches and the maximum coordinate difference.

**3. Advanced level.** Create a `particles` console application that simulates particle motion under gravity with bouncing off the ground (velocities and positions are updated at each step), with the options `--count`, `--steps`, `--mode aos|soa|soa-parallel`, `--threads`, `--snapshot <CSV file>`, and `--help`. The `aos` mode uses a `Vector3` array, `soa` uses separate coordinate arrays with `Vector256`, and `soa-parallel` additionally splits them into blocks for `Parallel.For`. The program prints a “mode – threads – steps/s – speedup” table, checks that the number of particles is preserved, and writes the positions of the first 1000 particles to CSV. Errors go to the error stream with exit code 1.

### Variant 8. Evaluating polynomials {#v8}

**1. Initial level.** Create a console program that evaluates a degree-8 polynomial with user-entered coefficients for 10,000,000 values of $x$ from −1 to 1 using Horner’s scheme in scalar and vector code (`Vector256<double>`), and prints the values at three points and the time of both approaches.

**2. Basic level.** Create a console program that prompts for the degree (1 to 20) and the coefficients of a polynomial, validates the input, and evaluates the polynomial over an array of $x$ values using Horner’s scheme in scalar code, with `Vector<double>`, and with `Vector256.FusedMultiplyAdd`. The program prints a time and speedup table and the maximum relative difference between the results.

**3. Advanced level.** Create a `horner` console application that accepts the options `--coeffs 1,-2,0.5`, `--from`, `--to`, `--count`, `--threads 1,2,4,8`, `--output <CSV>`, and `--help`. The program computes the values of the polynomial and its derivative in vector code with `Parallel.For` over blocks, finds approximate roots from sign changes, prints a time table for the thread counts, and writes a table of values to CSV. Invalid coefficients produce a message in the error stream and exit code 1.

### Variant 9. The Mandelbrot fractal {#v9}

**1. Initial level.** Create a console program that computes a 1600×1200 Mandelbrot set (up to 500 iterations) in scalar code and in vector code with `Vector256<double>` and a mask of active points (`LessThanOrEqual`, `ConditionalSelect`), and prints the total number of iterations of both approaches and the time.

**2. Basic level.** Create a console program that prompts for the image size and the maximum number of iterations, validates the input, computes the Mandelbrot set in scalar code, in vector code (`Vector256<double>` with a mask of active points), and in vector code with `Parallel.For` over rows, checks that the iteration count matches for each pixel, and writes a PGM image. The program prints a “method – time – speedup” table.

**3. Advanced level.** Create a `mandel` console application that computes the Mandelbrot set in vector code with a mask of active points and `Parallel.For` over rows and writes it to a PGM file (`--output`). Options: `--size 1920x1080`, `--center -0.5,0`, `--zoom`, `--iterations`, `--vector 128|256|512`, `--threads`, `--help`. The program checks `IsHardwareAccelerated` for the selected width (otherwise it prints a message and uses a scalar fallback path) and prints a time table for the vector widths and thread counts. Argument errors go to the error stream with exit code 1.

### Variant 10. File checksum {#v10}

**1. Initial level.** Create a console program that reads a file whose path the user enters and computes the sum of all bytes (`ulong`) with a scalar loop and in vector code with `Vector256<byte>` blocks widened to `ulong`, printing both sums, the file size, and the time.

**2. Basic level.** Create a console program that, for a file whose path the user enters, computes the Fletcher-32 checksum (two sums modulo 65,535) in scalar and vector code (blocks of 256 bytes accumulated in `Vector256<uint>`), checks that the sums match, and prints them in hexadecimal, the processing speed (MB/s) of both approaches, and a message if the file is not found.

**3. Advanced level.** Create a `checksum` console application that accepts file or directory paths and the options `--algorithm sum|fletcher32`, `--mode scalar|vector`, `--parallel` (files are processed in parallel), and `--help`. The program prints a “file – size – sum – MB/s” table, a total, and a comparison of the modes; inaccessible files are skipped with a message in the error stream, and exit code 2 means that at least one file was not processed.

### Variant 11. 2D heat conduction with the Jacobi method {#v11}

**1. Initial level.** Create a console program that simulates heat conduction in a 512×512 plate (top edge 100 °C, the others 0 °C) by the Jacobi method with a five-point stencil, performs 2000 iterations sequentially and with `Parallel.For` over rows, and prints the temperature at the center and the time.

**2. Basic level.** Create a console program that simulates heat conduction in a plate (top edge 100 °C, the others 0 °C) by the Jacobi method with a five-point stencil. The program prompts for the grid size and the tolerance, validates the input, iterates until convergence in three ways – scalar, vector (`Vector256<double>` for the interior nodes of a row), and vector with `Parallel.For` – and prints the number of iterations, the temperature at the center, and a time and speedup table.

**3. Advanced level.** Create a `heat` console application that simulates steady-state heat conduction in a square plate by the Jacobi method with a five-point stencil (vectorized and with `Parallel.For`) to the tolerance `--eps`. Options: `--size`, `--boundary 100,0,0,0` (edge temperatures), `--threads 1,2,4,8,16`, `--output <PGM>`, `--help`. For each thread count, the program solves the problem, checks that the solutions are identical, prints a “threads – iterations – time – $S$ – $E$” table, and writes the temperature field as an image. Argument errors go to the error stream with exit code 1.

### Variant 12. Normalizing dataset features {#v12}

**1. Initial level.** Create a console program that generates a table of 1,000,000×16 `float` features (fixed seed), computes the mean and standard deviation of each column with `TensorPrimitives` methods, converts the values into z-scores, and prints the statistics of the first three columns before and after the conversion.

**2. Basic level.** Create a console program that reads a CSV file with numeric columns whose path the user enters, validates the data, computes the z-scores of the columns in scalar and vector code (`Vector256<float>`), writes the result to a new CSV, and prints a “column – mean – deviation” table and the time of both approaches.

**3. Advanced level.** Create a `zscore` console application that accepts the options `--input`, `--output`, `--columns 1,3,5`, `--method zscore|minmax`, `--threads`, and `--help`. The columns are processed in parallel (`Parallel.ForEach`) and the values in vector code; missing values are replaced with the mean. The program prints a statistics table and the time of reading, computing, and writing; invalid CSV lines produce a message with the line number in the error stream and exit code 2.

### Variant 13. Counting characters in text {#v13}

**1. Initial level.** Create a console program that reads a text file as bytes and counts the spaces with a scalar loop and in vector code with `Vector128.Equals`, `ExtractMostSignificantBits`, and `BitOperations.PopCount`, printing both counts and the time.

**2. Basic level.** Create a console program that prompts for a file path and an ASCII character, validates the input, and counts that character, the lines, and the spaces in three ways: scalar, `Vector256<byte>` with masks, and the `MemoryExtensions.Count` method. The program prints a “method – count – time – speedup” table.

**3. Advanced level.** Create a `wcs` console application, an analog of the `wc` utility, that accepts file paths and the options `-l`, `-w`, `-c`, `--vector 128|256`, and `--help`. Words are counted in vector code from “whitespace – non-whitespace” transitions in a bit mask (taking block boundaries into account). The program prints a table for each file and a total, and with the `--verify` option checks the result against a scalar version; a missing file produces a message in the error stream and exit code 1.

### Variant 14. Transforming a 3D model {#v14}

**1. Initial level.** Create a console program that generates 2,000,000 `Vector3` vertices, builds a `Matrix4x4` from a rotation around the Y axis by a user-entered angle, a scale, and a translation, and transforms all vertices with the `Vector3.Transform` method, printing the first three vertices before and after the transformation and the time.

**2. Basic level.** Create a console program that prompts for the rotation angles around the X, Y, and Z axes and a translation, validates the input, and transforms an array of vertices in two ways: `Vector3.Transform` for a `Vector3` array and a custom vector implementation for `float[]` coordinate arrays using `Vector256`. The program prints the time, the speedup, and the maximum coordinate difference.

**3. Advanced level.** Create a `transform` console application that reads a model in OBJ format (lines `v x y z`) and accepts the options `--rotate 0,45,0`, `--scale`, `--translate 1,0,0`, `--output <OBJ>`, `--mode vector3|vector256|parallel`, and `--help`. The program keeps the other lines of the file unchanged, prints the model’s bounding box before and after the transformation and a time table for the modes; format errors go to the error stream with the line number and exit code 2.

### Variant 15. ECG signal convolution {#v15}

**1. Initial level.** Create a console program that generates a noisy ECG signal (2,000,000 `float` samples) and applies a 31-tap moving-average FIR filter in scalar and vector code (`TensorPrimitives.Dot` for each window), and prints the maximum difference between the results and the time.

**2. Basic level.** Create a console program that generates a noisy ECG signal, prompts for the filter length (an odd number from 3 to 255) and the cutoff frequency, builds the coefficients of a low-pass FIR filter with a Hamming window, filters the signal in scalar code, in vector code (`Vector256` over the coefficients), and in vector code with `Parallel.For` over blocks, and prints a time table and the maximum difference from the reference.

**3. Advanced level.** Create a `fir` console application that accepts the options `--input <CSV of samples>`, `--taps`, `--cutoff`, `--sample-rate`, `--output <CSV>`, `--threads`, and `--help`. The program filters the signal, finds R peaks (threshold crossings after filtering), computes the heart rate, prints a time table for the modes, and checks that the vector result matches the scalar one. File and argument errors go to the error stream with exit codes 2 and 1.

### Variant 16. Distances to warehouses {#v16}

**1. Initial level.** Create a console program that generates the coordinates of 10 warehouses and 1,000,000 stores on a plane and, for each store, finds the nearest warehouse in scalar and vector code (store coordinates in `float[]` arrays, distances to a warehouse via `Vector256`), printing the number of stores per warehouse and the time.

**2. Basic level.** Create a console program that prompts for the number of warehouses and stores, validates the input, and assigns stores to their nearest warehouses in three ways: scalar, `Vector256` with `LessThan` masks and `ConditionalSelect` to select the minimum, and vectorized with `Parallel.For`. The program checks that the assignments match and prints a time table and the average distance for each warehouse.

**3. Advanced level.** Create a `nearest` console application that reads warehouses and stores from CSV files (name, x, y) and accepts the options `--stores`, `--warehouses`, `--output <CSV>`, `--capacity <k>` (at most $k$ stores per warehouse; the excess goes to the next nearest), and `--help`. The program prints a warehouse load table, the total distance, and the time of the vector search; file errors go to the error stream with exit code 2.

### Variant 17. Dot product of doubles {#v17}

**1. Initial level.** Create a console program that computes the dot product of two arrays of 5,000,001 `double` numbers in scalar code and with `Vector<double>` with tail handling, and prints `Vector<double>.Count`, both results, the relative difference, and the time.

**2. Basic level.** Create a console program that prompts for the array length, validates the input, and computes the dot product in four ways: scalar, `Vector<double>`, `Vector512<double>` (only if `Vector512.IsHardwareAccelerated`; otherwise, print a message and use `Vector256`), and `TensorPrimitives.Dot`. The program prints a “method – width – time – speedup – difference” table.

**3. Advanced level.** Create a `dotbench` application with BenchmarkDotNet that compares scalar, `Vector<T>`, `Vector256<T>`, `Vector512<T>` (with a fallback path), and `TensorPrimitives` implementations of the dot product for lengths 16, 1000, and 1,000,000 with `[DisassemblyDiagnoser]`. The `--test` mode checks the implementations on lengths 0, 1, 7, 8, 9, and 1023; a mismatch goes to the error stream with exit code 1. The report must include runs with the variables `DOTNET_EnableAVX512=0` and `DOTNET_EnableAVX2=0`.

### Variant 18. Sepia for video frames {#v18}

**1. Initial level.** Create a console program that generates a 1920×1080 RGB frame (separate `float` channel arrays), applies a sepia filter in scalar and vector code (`Vector256<float>`, clamped to 255 with `Vector256.Min`), and prints the time, the speedup, and the maximum channel difference.

**2. Basic level.** Create a console program that prompts for the number of frames (1 to 300) and the effect strength (0 to 1), validates the input, and applies sepia to the frames with interpolation between the original and the sepia in scalar and vector code (`ConditionalSelect` for pixels brighter than a threshold), printing the frames per second of both approaches.

**3. Advanced level.** Create a `sepia` console application that reads a sequence of PPM files from a directory and accepts the options `--strength`, `--threads`, `--mode scalar|vector|parallel`, `--output <directory>`, and `--help`. Frames are processed in vector code, and in `parallel` mode also in parallel. The program prints the frames per second and the total time and checks that the vector and scalar results match byte for byte for the first frame; errors go to the error stream with exit code 2.

### Variant 19. Red–black Gauss–Seidel method {#v19}

**1. Initial level.** Create a console program that solves the Laplace equation on a 256×256 grid (top edge 100, the others 0) by the Gauss–Seidel method sequentially and by the red–black method with `Parallel.For` over rows to a tolerance of $10^{- 5}$, and prints the number of iterations, the value at the center, and the time of both methods.

**2. Basic level.** Create a console program that solves the Laplace equation on a square grid (top edge 100, the others 0). The program prompts for the grid size and the tolerance, validates the input, and compares the Jacobi, Gauss–Seidel, and parallel red–black (`Parallel.For` over rows) methods by the number of iterations, the time, and the maximum difference between the solutions, printing an aligned table.

**3. Advanced level.** Create a `redblack` console application that solves the Laplace equation on a square grid (top edge 100, the others 0) by the parallel red–black SOR method with the options `--size`, `--eps`, `--omega <1 to 2>`, `--threads 1,2,4,8,16`, `--csv <file>`, and `--help`. For each thread count, the program prints a “threads – iterations – time – $S$ – $E$” table, finds the best `omega` among 1.0, 1.5, 1.8, and 1.9, and writes a CSV. Mismatched solutions for different thread counts produce a message in the error stream and exit code 2.

### Variant 20. Byte histogram {#v20}

**1. Initial level.** Create a console program that reads a file and builds a histogram of the 256 byte values sequentially and in parallel (`Parallel.For` with a local histogram for each block), and prints the 10 most frequent bytes and the time of both approaches.

**2. Basic level.** Create a console program that prompts for a file path, builds the histogram in three ways – naive, “four counters” (unrolling the loop over four arrays), and in parallel by blocks – checks that the histograms match, and prints a “method – time – MB/s” table and the file’s entropy in bits per byte.

**3. Advanced level.** Create a `bytehist` console application that accepts file paths and the options `--threads`, `--top <k>`, `--csv <file>`, `--compare`, and `--help`. For each file, the program builds the histogram in parallel with vectorized counting of individual values (`Vector256.Equals` masks and `PopCount` for a given set of bytes) and prints the entropy, the top $k$, and a time table for the methods; file access errors go to the error stream with exit code 2.

### Variant 21. The knapsack problem {#v21}

**1. Initial level.** Create a console program that solves the 0/1 knapsack problem for 200 items (fixed seed) and a capacity of 100,000 by dynamic programming with a single table row updated in scalar code, and prints the maximum value and the time.

**2. Basic level.** Create a console program that prompts for the number of items and the capacity, validates the input, and solves the knapsack problem in two ways: a scalar update of the DP row and a vector one (`Vector256<int>`: the shifted row plus the value, `Vector256.Max` with the current row, the new row in a separate array). The program prints the value, whether the results match, and the time.

**3. Advanced level.** Create a `knapsack` console application that reads items from a CSV file (name, weight, value) and accepts the options `--capacity`, `--mode scalar|vector`, `--items` (print the selected items), and `--help`. To reconstruct the set of items, the program stores bit masks of the decisions and prints a table of the selected items, the total weight and value, and the time; invalid CSV lines produce a message with the line number in the error stream and exit code 2.

### Variant 22. LU decomposition {#v22}

**1. Initial level.** Create a console program that performs the LU decomposition (the Doolittle method without pivoting) of a 600×600 diagonally dominant matrix sequentially and with `Parallel.For` for row updates, and prints the time of both variants and the reconstruction error $\max | L U - A |$.

**2. Basic level.** Create a console program that prompts for the matrix size (100 to 2000), validates the input, and performs the LU decomposition in scalar code, in vector code (`TensorPrimitives.MultiplyAdd` for the row update), and in vector code with `Parallel.For`, printing a table of time, speedup, and reconstruction error.

**3. Advanced level.** Create an `lu` console application that accepts the options `--n`, `--block <block size>`, `--threads 1,2,4,8,16`, and `--help`. The program performs a blocked LU decomposition (a panel of columns and a blocked update of the rest of the matrix), compares it with the unblocked one, solves the system with the resulting $L$ and $U$, and prints a “method – threads – time – GFLOPS – error” table. A zero pivot produces a message in the error stream and exit code 2.

### Variant 23. Image comparison {#v23}

**1. Initial level.** Create a console program that generates two 4000×3000-byte grayscale images that differ by noise and computes the sum of absolute differences (SAD) in scalar and vector code (`Vector256.Max` and `Vector256.Min` for the absolute byte difference), printing both sums and the time.

**2. Basic level.** Create a console program that generates a 1920×1080 frame and a 32×32 fragment of it with added noise, searches for the position of the fragment in the frame by the smallest SAD (vectorized for each row of the fragment), and prints the position found, the SAD, and the time of the scalar and vector searches.

**3. Advanced level.** Create a `findframe` console application that accepts the PGM files `--image` and `--template` and the options `--step`, `--threads`, `--top <k>`, and `--help`. The program searches for the $k$ best template positions in vector code with `Parallel.For` over rows and prints a “position – SAD” table and a time comparison with the scalar version; a template larger than the image and format errors produce a message in the error stream and exit code 2.

### Variant 24. Probabilities in medical tests {#v24}

**1. Initial level.** Create a console program that, for 10,000,000 patients with a random prior probability of disease, computes the posterior probability by Bayes’ formula for a positive test (sensitivity 0.95, specificity 0.9) in scalar code and in vector code with `Vector256<double>`, printing the average probability and the time.

**2. Basic level.** Create a console program that prompts for the sensitivity and specificity of a test (0.5 to 1), validates the input, and computes the posterior probabilities for positive and negative results (`ConditionalSelect` over the array of results) in scalar code, with `Vector<double>`, and with `TensorPrimitives`, printing a time table and the number of patients with a probability above 0.5.

**3. Advanced level.** Create a `bayes` console application that reads a CSV file of patients (identifier, prior probability, results of several tests) and accepts the options `--tests <test parameter file>`, `--threshold`, `--output`, and `--help`. The program applies Bayes’ formula for each test in turn in vector code, writes the result, and prints the distribution of probabilities over ten intervals and the time; invalid probabilities produce a message in the error stream and exit code 2.

### Variant 25. GPS coordinates {#v25}

**1. Initial level.** Create a console program that generates 5,000,000 GPS points in Europe and computes the distance from each to Brussels (50.85° N, 4.35° E) by the haversine formula in scalar and vector code (`Vector256<double>`, `Vector256.Sin`, `Vector256.Cos`), printing the average distance and the time.

**2. Basic level.** Create a console program that generates 5,000,000 GPS points in Europe, prompts for the center coordinates and a radius, validates the input, and counts the points within the radius by the haversine formula in vector code in `float` and in `double`, printing the number of points, the maximum difference between the `float` and `double` distances in meters, and the time of both variants.

**3. Advanced level.** Create a `geo` console application that reads a GPS track from a CSV file (time, latitude, longitude) and accepts the options `--precision float|double`, `--output`, `--stop-speed`, and `--help`. The program computes, in vector code, the distances between neighboring points, the total length of the track, the speeds, and the stops, and prints a report and a comparison of `float`/`double` errors; invalid coordinates produce a message with the line number in the error stream and exit code 2.

### Variant 26. Option pricing model {#v26}

**1. Initial level.** Create a console program that generates 1,000,000 options (asset price, strike, maturity, volatility) and computes the price of a European call option by the Black–Scholes formula in scalar code, printing the average price and the number of options per second.

**2. Basic level.** Create a console program that prompts for the number of options and the risk-free rate, validates the input, computes call and put prices by the Black–Scholes formula in scalar and vector code (`Vector256<double>` with a polynomial approximation of the normal distribution), checks put–call parity, and prints millions of options per second for both approaches.

**3. Advanced level.** Create a `blackscholes` console application that accepts the options `--count`, `--rate`, `--precision float|double`, `--threads 1,2,4,8,16`, `--input <CSV of options>`, and `--help`. The program computes prices and the “Greeks” delta and vega in vector code with `Parallel.For`, prints a “threads – options/s – $S$ – $E$” table and the maximum `float`/`double` difference, and writes the results for the input file. Errors go to the error stream with exit code 1.

### Variant 27. CSR sparse matrices {#v27}

**1. Initial level.** Create a console program that builds a 1,000,000×1,000,000 sparse matrix with 5 nonzero elements per row in CSR format and multiplies it by a vector sequentially and with `Parallel.For` over rows, printing the norm of the result and the time.

**2. Basic level.** Create a console program that prompts for the matrix size and the number of nonzero elements per row, validates the input, builds a CSR matrix, transposes it (counting the elements of the columns and a prefix sum), and checks the equality $(A^{T} x) \cdot y = x \cdot (A y)$ for random vectors, printing the time of sequential and parallel multiplication.

**3. Advanced level.** Create an `spmv` console application that reads a matrix in Matrix Market format (`.mtx`) and accepts the options `--iterations`, `--threads 1,2,4,8,16`, `--partition rows|nnz`, and `--help`. The program performs matrix–vector multiplication with the rows split equally or by the number of nonzero elements, and prints a table of time, speedup, and thread load imbalance; format errors go to the error stream with exit code 2.

### Variant 28. The 1D wave equation {#v28}

**1. Initial level.** Create a console program that simulates the vibration of a string with 1,000,000 nodes by an explicit finite-difference scheme (three `double` layers) for 1000 steps in scalar and vector code (`Vector256<double>` for the interior nodes), and prints the energy of the string at the beginning and at the end and the time.

**2. Basic level.** Create a console program that simulates the vibration of a string (the one-dimensional wave equation) by an explicit finite-difference scheme with three `double` layers. The program prompts for the number of nodes, the number of steps, and the Courant number (at most 1), validates the input, performs the simulation in scalar code, in vector code (`Vector256<double>`), and in vector code with `Parallel.For` over blocks, checks that the results match, and prints a time and speedup table.

**3. Advanced level.** Create a `wave` console application that simulates the vibration of a string (the one-dimensional wave equation) by an explicit scheme in vector code with `Parallel.For` and investigates weak scaling: the number of nodes (`--nodes-per-thread` per thread) grows in proportion to the thread count. Options: `--steps`, `--threads 1,2,4,8,16`, `--csv <file>`, `--help`. The program prints a “threads – nodes – time – weak scaling efficiency” table, writes a CSV, and checks the stability of the scheme; errors go to the error stream with exit code 1.

### Variant 29. Sound spectrum {#v29}

**1. Initial level.** Create a console program that generates a 60 s signal at 48,000 Hz, splits it into frames of 4096 samples, and multiplies each frame by a Hann window in scalar code and with the `TensorPrimitives.Multiply` method, printing the energy of the first three frames and the time.

**2. Basic level.** Create a console program that generates an audio signal; prompts for the frame size (a power of two from 256 to 16,384), the overlap (0–75%), and the window type (Hann, Hamming, Blackman); validates the input; splits the signal into frames and multiplies them by the window in vector code; computes the root mean square of each frame (`TensorPrimitives.Norm`); and prints the 5 loudest frames and the time.

**3. Advanced level.** Create a `frames` application with BenchmarkDotNet that compares scalar, `Vector256`, and `TensorPrimitives` frame preparation for sizes 1024 and 16,384, plus an `--input <16-bit PCM WAV file>` mode with the options `--frame`, `--overlap`, `--window`, and `--help` that writes the frame energies to CSV. Any other WAV format is an error with exit code 2.

### Variant 30. JIT auto-vectorization {#v30}

**1. Initial level.** Create a console program that sums an `int` array of 10,000,000 elements with a `for` loop, `foreach`, LINQ `Sum`, and `Vector256`, printing the results and the time of each approach.

**2. Basic level.** Create a console program that compares the time of five loop forms over a `float` array (index and `Length`, index and a stored length, `Span<T>`, `foreach`, unrolling into four accumulators) and a vector version, and prints a “form – time – speedup” table.

**3. Advanced level.** Create a `jitloops` application with BenchmarkDotNet and `[DisassemblyDiagnoser]` that compares loop forms for summing, finding the maximum, and copying arrays with vector versions. The `--report` mode finds the vector (`ymm`) and scalar (`ss`, `sd`) instructions of each method in the `*-asm.md` file and prints a table; a missing file produces a message in the error stream and exit code 2.

## Procedure

1. Study the theory and worked examples.
2. Run the “CPU capabilities” example on your PC; for your variant, determine which operations can be vectorized, where masks are needed, how to handle the tail, and which parts of the data can be processed in parallel.
3. Create a console project in JetBrains Rider; implement a scalar version, a vector version (with the `System.Numerics.Tensors` package if needed), and a check that the results match, with a tolerance for floating-point numbers, on lengths 0, 1, `Count - 1`, `Count + 1`, and a large length.
4. Measure the time in the *Release* configuration (warmup, median of runs, or BenchmarkDotNet), and calculate the speedup from SIMD and from threads; test the fallback path with `DOTNET_EnableAVX2=0`.
5. Demonstrate the program, explain the code and the measurement results, and answer questions.
