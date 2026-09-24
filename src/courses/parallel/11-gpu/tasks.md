---
title: "Tasks"
description: "Topic 11. GPU computing: task variants"
outline: [2, 3]
sourceHash: "974f89eb4111cdaa62ff219e27d090f568613d007dcbac7bbbdb9157d0746531"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Complete CUDA C++ tasks in Ubuntu 26.04 (WSL2, CMake and Ninja, or CLion), and ILGPU tasks in Rider; if an NVIDIA GPU is not available, run ILGPU programs on the CPU accelerator.

## Variants

### Variant 1. Sobel filter {#v1}

**1. Initial level.** Create a CUDA C++ console program that generates a 1920×1080 grayscale image (a circle on a gradient background), computes the gradient magnitude with a Sobel filter using a kernel on a 2D grid of 16×16 blocks, and writes the result to `sobel.pgm`.

**2. Basic level.** Create a CUDA C++ console program that reads a PGM (P5) image whose name the user enters, validates the format, applies the Sobel filter on the GPU and on the CPU (OpenMP), verifies that the results match, and prints the copy, kernel, and CPU times measured with CUDA events and `std::chrono`, as well as the speedup with and without copies.

**3. Advanced level.** Create a CMake project with a `sobel` program that applies a Sobel filter (gradient magnitude) to a PGM image on the GPU in CUDA C++ and accepts options `--input <file.pgm>`, `--output <file.pgm>`, `--block 8|16|32`, `--repeat <k>`, `--csv <file>`, and `--help`. The program processes the image with a shared-memory kernel (a tile with a halo) and without one, prints a table of median times for each block size, and writes a CSV. File format and option errors go to `stderr` with exit code 1.

### Variant 2. The Mandelbrot set with ILGPU and CUDA {#v2}

**1. Initial level.** Create a C# console program with the ILGPU library that computes a 1600×1200 Mandelbrot set (at most 500 iterations) with an `Index2D` kernel on the GPU and writes the image to `mandel.pgm`.

**2. Basic level.** Create a C# console program with ILGPU that prompts for the resolution (from 320×240 to 7680×4320) and the maximum number of iterations, validates the input, computes the Mandelbrot set on the GPU (or on the CPU accelerator if there is no GPU) and with `Parallel.For`, verifies that the total iteration counts match within 0.01 %, and prints a timing table.

**3. Advanced level.** Create two programs that compute the Mandelbrot set on the GPU: CUDA C++ `mandel` and C# ILGPU `MandelNet`. Both accept the same options `--size <w>x<h>`, `--iter <n>`, `--float|--double`, `--csv <file>`, and `--help`, and write the resolution, method, kernel time, and copy time to CSV. A script runs both programs for four resolutions and builds a summary table; invalid options produce code 1.

### Variant 3. SAXPY and pinned memory {#v3}

**1. Initial level.** Create a CUDA C++ console program that computes $y = a x + y$ for $10^{7}$ `float` numbers with a bounds-checking kernel, verifies the result on the CPU, and prints the maximum error.

**2. Basic level.** Create a CUDA C++ console program that prompts for the vector length (from $10^{3}$ to $2 \cdot 10^{8}$) and, for ordinary and pinned (`cudaMallocHost`) memory, measures with CUDA events the time to copy to the GPU, run the SAXPY kernel, and copy back, then prints a table of times and copy bandwidth in GB/s.

**3. Advanced level.** Create a CMake project with a CUDA C++ `saxpybench` program that computes SAXPY ($y = a x + y$ for `float`) and accepts options `--sizes 1e3,1e5,1e7`, `--memory pageable,pinned,managed`, `--csv <file>`, and `--help`. For each combination, the program measures the median of five runs of the full cycle (copy, kernel, copy back) and of the kernel alone, compares with OpenMP, and prints the size at which the GPU becomes faster than the CPU. Memory allocation errors produce code 2.

### Variant 4. Tiled matrix multiplication {#v4}

**1. Initial level.** Create a CUDA C++ console program that multiplies two random 1024×1024 matrices (fixed seed) with a naive kernel and verifies the result for 100 random elements by computing them on the CPU.

**2. Basic level.** Create a CUDA C++ console program that prompts for the size $n$ (a multiple of 32), multiplies matrices with a naive kernel and with a kernel using 16×16 tiles in shared memory, checks the error relative to the CPU, and prints a table of time, GFLOPS, and speedup.

**3. Advanced level.** Create a CMake project with a CUDA C++ `matmulbench` program that multiplies random $n \times n$ matrices with its own tiled kernels (arbitrary $n$, bounds checks) and accepts options `--sizes 512,1024,2048`, `--tiles 8,16,32`, `--cublas`, `--csv <file>`, and `--help`. The program compares its own kernels with cuBLAS (`cublasSgemm`) and OpenMP and prints a GFLOPS table marking the best kernel. A size less than 1 produces code 1.

### Variant 5. The n-body problem {#v5}

**1. Initial level.** Create a CUDA C++ console program that, for 4096 bodies with random masses and coordinates, computes on the GPU the acceleration of each body due to all others (the law of gravitation with softening $\epsilon = 0 {,} 01$) and prints the accelerations of the first five bodies.

**2. Basic level.** Create a CUDA C++ console program that prompts for the number of bodies and steps, simulates the motion of bodies under mutual gravitation (random masses and coordinates) with the Euler method on the GPU (data stays on the device between steps), checks conservation of the system’s momentum, and prints the number of steps per second for the GPU and OpenMP.

**3. Advanced level.** Create a CMake project with a CUDA C++ `nbody` program that simulates the motion of bodies under mutual gravitation, loading tiles of bodies into shared memory, with options `--bodies <n>`, `--steps <k>`, `--tile <t>`, `--csv <file>`, and `--help`. The program writes the trajectories of three bodies to CSV and prints a “number of bodies – GPU steps/s – CPU steps/s – speedup” table for 1024–32,768 bodies.

### Variant 6. A histogram of satellite images {#v6}

**1. Initial level.** Create a CUDA C++ console program that, for a generated 4096×4096 image (channel values 0–255), builds a 256-bin histogram with atomic operations on the GPU and prints the 10 most frequent values.

**2. Basic level.** Create a CUDA C++ console program that reads a PGM file whose name the user enters, builds a histogram with global atomic operations, with local histograms in shared memory, and with OpenMP, verifies that they match, and prints a timing table.

**3. Advanced level.** Create a CMake project with a `histo` program that accepts several PGM files and options `--bins 16|64|256`, `--csv <file>`, and `--help`, processes the images as a batch in two CUDA streams with pinned memory, and prints for each image the mean brightness and the fraction of “clouds” (brightness above 200), plus the total time; an unreadable file goes to `stderr` with code 1.

### Variant 7. Gaussian blur {#v7}

**1. Initial level.** Create a CUDA C++ console program that blurs a 1920×1080 grayscale image with a 5×5 Gaussian filter (coefficients in constant memory) and writes the result to `blur.pgm`.

**2. Basic level.** Create a CUDA C++ console program that generates a grayscale image, prompts for $\sigma$ (from 0.5 to 5), builds a Gaussian filter kernel of size $6 \sigma + 1$, loads it into constant memory with `cudaMemcpyToSymbol`, blurs the image on the GPU and the CPU, checks the error, and prints the time and speedup.

**3. Advanced level.** Create a CMake project with a `gauss` program that accepts options `--input`, `--output`, `--sigma <s>`, `--separable`, `--csv <file>`, and `--help`, implements two-dimensional and separable (rows, then columns) blurring, compares their time and error, and prints a table for $\sigma = 1 , 2 , 4$. An invalid $\sigma$ produces code 1.

### Variant 8. Monte Carlo estimation of π {#v8}

**1. Initial level.** Create a CUDA C++ console program in which each thread generates 1000 random points with its own generator (a linear congruential generator with a seed that depends on the thread index) and counts the points inside a quarter circle, and the host computes $\pi$ and the error.

**2. Basic level.** Create a CUDA C++ console program that estimates $\pi$ with the Monte Carlo method: it prompts for the number of random points (up to $10^{10}$), counts the points inside a quarter circle with a shared-memory reduction and `atomicAdd`, and prints the estimate of $\pi$, the absolute error, and the number of samples per second for the GPU and OpenMP.

**3. Advanced level.** Create a CMake project with a CUDA C++ `montecarlo` program that estimates $\pi$ with the Monte Carlo method (the fraction of random points in a quarter circle) with options `--samples <n>`, `--generator lcg|curand`, `--runs <k>`, `--csv <file>`, and `--help`. The program compares its own generator with cuRAND, prints a “samples – estimate – error – 95 % confidence interval – samples/s” table, and checks that the error decreases in proportion to $1 / \sqrt{n}$.

### Variant 9. 2D heat conduction {#v9}

**1. Initial level.** Create a CUDA C++ console program that simulates heating of a 512×512 plate (top edge at 100 °C) with an explicit scheme with $r = 0 {,} 2$ for 1000 steps, alternating two buffers on the GPU, and prints the temperature at the center.

**2. Basic level.** Create a CUDA C++ console program that prompts for the grid size and the number of steps and simulates heating of a square plate (top edge at 100 °C) with an explicit scheme on the GPU without copies between steps and on the CPU with OpenMP, checks the difference between the solutions (at most $10^{- 4}$), and prints the time per step.

**3. Advanced level.** Create a CMake project with a CUDA C++ `heatgpu` program that simulates heating of a square plate with an explicit scheme on the GPU with options `--size <n>`, `--steps <k>`, `--snapshot <every k steps>`, `--shared`, `--csv <file>`, and `--help`. The program saves snapshots of the temperature field to PGM files using asynchronous copies in a separate CUDA stream and compares a shared-memory kernel with a simple kernel; file write errors produce code 2.

### Variant 10. Julia set animation {#v10}

**1. Initial level.** Create a CUDA C++ console program that computes 60 frames of 800×600 of the Julia set for $c = 0 {,} 7885 e^{i \alpha}$, $\alpha$ from 0 to $2 \pi$, and writes the frames to `frame00.pgm`–`frame59.pgm`.

**2. Basic level.** Create a CUDA C++ console program that prompts for the resolution and number of frames, computes the frames of a Julia set animation ($c = 0 {,} 7885 e^{i \alpha}$, $\alpha$ from 0 to $2 \pi$) on the GPU and on the CPU (OpenMP), and prints the frames per second with and without copying each frame to the host.

**3. Advanced level.** Create a CMake project with a CUDA C++ `julia` program that computes the frames of a Julia set animation ($c = 0 {,} 7885 e^{i \alpha}$) and writes them to PGM, with options `--size`, `--frames`, `--streams 1|2|4`, `--output <folder>`, and `--help`. The program overlaps computing the next frame with copying and writing the previous one (pinned memory, several CUDA streams) and prints a table of frames per second for different numbers of streams.

### Variant 11. The Game of Life with ILGPU {#v11}

**1. Initial level.** Create a C# console program with ILGPU that simulates the Game of Life on a 256×256 toroidal board (random initial board, seed 11) for 100 generations with an `Index2D` kernel and prints the number of live cells.

**2. Basic level.** Create a C# console program with ILGPU that prompts for the board size and number of generations, simulates Conway’s Game of Life with toroidal boundaries (random initial board) on the GPU and with `Parallel.For`, verifies that the boards are identical after every 10 generations, and prints the number of generations per second.

**3. Advanced level.** Create a C# application with ILGPU that simulates Conway’s Game of Life with options `--size`, `--generations`, `--pattern <RLE file>`, `--accelerator cuda|cpu`, `--csv`, and `--help`. The program reads the initial pattern in RLE format, simulates it on the selected accelerator, writes every hundredth generation to PGM, and prints a performance table for boards from 256 to 8192.

### Variant 12. Maximum reduction {#v12}

**1. Initial level.** Create a CUDA C++ console program that finds the maximum of an array of $2^{24}$ random `float` numbers with a shared-memory reduction kernel (the second stage on the CPU) and verifies the result.

**2. Basic level.** Create a CUDA C++ console program that prompts for the array length, finds the maximum and its index with two kernels (interleaved addressing and sequential addressing), compares with `thrust::max_element` and OpenMP, and prints a table of time and GB/s.

**3. Advanced level.** Create a CMake project with a CUDA C++ `reducemax` program that finds the maximum of an array of random `float` values with shared-memory reduction kernels (interleaved addressing, sequential addressing) and, with the `--warp-shuffle` option, with an intra-warp reduction using `__shfl_down_sync`. Options: `--size`, `--threads 128,256,512`, `--csv`, `--help`. The program compares all variants for three block sizes, verifies the result on the CPU, and prints the fraction of the GPU’s peak memory bandwidth achieved.

### Variant 13. Batch image resizing {#v13}

**1. Initial level.** Create a CUDA C++ console program that downscales a generated 3840×2160 image to 1280×720 with bilinear interpolation on the GPU and writes the result to PGM.

**2. Basic level.** Create a CUDA C++ console program that prompts for a PGM file and a scale factor (from 0.1 to 4), resizes with bilinear interpolation on the GPU and the CPU, checks the difference (at most 1), and prints the copy and kernel times.

**3. Advanced level.** Create a CMake project with a CUDA C++ `resize` program that resizes all PGM images in a folder with bilinear interpolation on the GPU with options `--width <w>`, `--height <h>`, `--streams <k>`, `--output <folder>`, and `--help`. The files are processed as a batch in $k$ CUDA streams; the program prints a timing table for $k = 1 , 2 , 4$; a missing folder produces code 1.

### Variant 14. Nonce search (educational hashing) {#v14}

**1. Initial level.** Create a CUDA C++ console program that, for the string “block-42”, iterates over nonce values from 0 to $2^{28}$ on the GPU, computes the 32-bit FNV-1a hash of the string with the nonce, and prints the smallest nonce for which the hash has 20 leading zero bits.

**2. Basic level.** Create a CUDA C++ console program that prompts for a string and a difficulty (the number of zero bits, from 8 to 28), searches for a nonce on the GPU (the first found one via `atomicMin`) and on the CPU (OpenMP), and prints the nonce, the hash, and the number of hashes per second.

**3. Advanced level.** Create a CMake project with a CUDA C++ `miner` program that searches for a nonce for which the 32-bit FNV-1a hash of the `--data` string with the nonce has `--difficulty` leading zero bits. Options: `--batch <n>`, `--timeout <s>`, `--help`. The program iterates over nonces in batches on the GPU and the CPU (OpenMP) with early termination, prints a “difficulty – time – hashes/s” table for the GPU and the CPU, and returns code 3 if no nonce is found before the timeout.

### Variant 15. k-means for colors {#v15}

**1. Initial level.** Create a CUDA C++ console program that, for a generated 1024×1024 color image, assigns each pixel to the nearest of 8 given colors with a GPU kernel and prints the number of pixels of each color.

**2. Basic level.** Create a CUDA C++ console program that generates a color image, prompts for the number of colors $k$ (from 2 to 32) and iterations, and quantizes colors with the k-means algorithm: assigning pixels to the nearest centers and computing cluster sums on the GPU (atomic operations), and new centers on the CPU. The program prints the centers and the time per iteration.

**3. Advanced level.** Create a CMake project with a CUDA C++ `quantize` program that reduces the number of colors of a PPM image to $k$ with the k-means algorithm (pixel assignment and cluster sums on the GPU) with options `--input <file.ppm>`, `--output <file.ppm>`, `--k <n>`, `--max-iter`, `--eps`, and `--help`. The program stops when the centers move less than `eps`, writes an image with a palette of $k$ colors, and compares the time with an OpenMP version; PPM format errors produce code 1.

### Variant 16. Sphere ray tracing with ILGPU {#v16}

**1. Initial level.** Create a C# console program with ILGPU that traces one ray per pixel for a scene of three spheres (structs, no classes) and writes an 800×600 image to PGM with Lambertian shading.

**2. Basic level.** Create a C# console program with ILGPU that prompts for the resolution and the number of random spheres (from 1 to 100), renders the scene by tracing one ray per pixel with Lambertian shading on the GPU and with `Parallel.For`, verifies that the images match (a difference of at most 1), and prints the time and speedup.

**3. Advanced level.** Create a C# application with ILGPU that renders a scene of spheres by ray tracing (Lambertian shading, the `--shadows` option adds shadows) with options `--scene <JSON file>`, `--size`, `--accelerator cuda|cpu`, `--output`, and `--help`. The program reads the scene from a file, renders it on the selected accelerator, writes the image, and prints a timing table for several resolutions; scene file errors produce code 1.

### Variant 17. Audio signal convolution {#v17}

**1. Initial level.** Create a CUDA C++ console program that generates a 10 s signal at 48 kHz (a sum of sinusoids) and applies a moving-average filter with 64 coefficients stored in constant memory, printing the first 10 samples of the result.

**2. Basic level.** Create a CUDA C++ console program that reads a WAV file (16-bit, mono) whose name the user enters, applies a low-pass filter with a given number of coefficients (up to 1024) on the GPU and the CPU, checks the error, and writes the result to a new WAV file.

**3. Advanced level.** Create a CMake project with a CUDA C++ `fir` program that applies a low-pass FIR filter on the GPU to a WAV file (16-bit, mono) with options `--input`, `--output`, `--cutoff <Hz>`, `--taps <n>`, `--shared`, and `--help`. The program compares a kernel with coefficients in constant memory and a kernel with a signal tile in shared memory, and prints a timing table for 64–4096 coefficients; an unsupported WAV format produces code 1.

### Variant 18. Black–Scholes option prices {#v18}

**1. Initial level.** Create a CUDA C++ console program that computes European call and put option prices with the Black–Scholes formula for $10^{6}$ random parameter sets on the GPU and prints the first five results.

**2. Basic level.** Create a CUDA C++ console program that prompts for the number of options, computes prices on the GPU in `float` and `double` and on the CPU (OpenMP), checks put–call parity, and prints the time, speedup, and maximum discrepancy.

**3. Advanced level.** Create a CMake project with an `options` program with options `--count`, `--precision float|double`, `--csv <input>`, `--output <file>`, and `--help` that reads option parameters from CSV, computes prices and “Greeks” (delta, vega) on the GPU, and compares `float`/`double` time including copies; an invalid CSV line produces a message with the line number and code 1.

### Variant 19. Prefix sum {#v19}

**1. Initial level.** Create a CUDA C++ console program that computes the prefix sum of an array of 1024 integers in a single block with the Blelloch algorithm in shared memory and verifies the result on the CPU.

**2. Basic level.** Create a CUDA C++ console program that prompts for the array length (up to $10^{8}$), computes the prefix sum hierarchically (block sums, a scan of the sums, addition), compares with `thrust::inclusive_scan` and `std::inclusive_scan`, and prints the time.

**3. Advanced level.** Create a CMake project with a `scan` program with options `--size`, `--type int|float`, `--exclusive`, `--csv`, and `--help` that uses a scan for array compaction (keeping positive elements), verifies the result, and prints a table of times for its own implementation and Thrust for five sizes.

### Variant 20. A city distance matrix {#v20}

**1. Initial level.** Create a CUDA C++ console program that, for 2000 cities with random coordinates (latitude, longitude), computes the distance matrix on the GPU with the haversine formula using a 2D kernel and prints the closest pair of cities.

**2. Basic level.** Create a CUDA C++ console program that reads cities from CSV (name, latitude, longitude), computes the distance matrix in `float` and `double` on the GPU, compares the error and time, and prints the nearest city for each city.

**3. Advanced level.** Create a CMake project with a `distances` program with options `--input <file.csv>`, `--precision float|double`, `--output <file>`, and `--help` that processes up to 50,000 cities in chunks that fit in GPU memory, writes the matrix to a binary file, and prints the time and the amount of data transferred; CSV errors produce code 1.

### Variant 21. A fireworks particle system {#v21}

**1. Initial level.** Create a CUDA C++ console program that simulates $10^{6}$ particles (position, velocity, gravity) for 500 steps on the GPU and prints the mean particle height.

**2. Basic level.** Create a CUDA C++ console program that simulates fireworks particles (position, velocity, gravity) on the GPU in two ways: with unified memory (`cudaMallocManaged`) and with explicit copies. The program prompts for the number of particles and steps and prints the time of both variants and a check that the results are identical.

**3. Advanced level.** Create a CMake project with a CUDA C++ `fireworks` program that simulates fireworks particles (position, velocity, gravity) on the GPU with options `--particles`, `--steps`, `--memory managed|explicit`, `--frames <folder>`, and `--help`. Every 50 steps, the program draws a frame (PGM) from the particle positions using atomic operations and prints a timing table for the two memory management approaches.

### Variant 22. CT slice segmentation {#v22}

**1. Initial level.** Create a CUDA C++ console program that generates a 256×256×128 three-dimensional volume (a sphere of density 1000 in a medium of 0), marks voxels with density above a threshold using a kernel on a 3D grid, and prints the number of marked voxels.

**2. Basic level.** Create a CUDA C++ console program that prompts for the dimensions of a three-dimensional volume and two thresholds, generates a CT volume (a sphere of density 1000 in a medium of 0), performs threshold segmentation (voxels between the thresholds) on the GPU with $8 \times 8 \times 8$ blocks and on the CPU, verifies that they match, and prints the segment volume in mL (voxel size 0.5 mm).

**3. Advanced level.** Create a CMake project with a `ctseg` program with options `--input <file.raw>`, `--dims <x>x<y>x<z>`, `--low`, `--high`, `--slices <folder>`, and `--help` that reads a 16-bit volume, segments it, writes slices to PGM, and prints a timing table for blocks of $4^{3}$, $8^{3}$, and $16 \times 16 \times 4$; a file size mismatch produces code 1.

### Variant 23. The wave equation {#v23}

**1. Initial level.** Create a CUDA C++ console program that simulates the vibration of a string of 10,000 points (an initial “bump” in the center) with an explicit scheme for 5000 steps on the GPU and prints the displacement at five points.

**2. Basic level.** Create a CUDA C++ console program that simulates the two-dimensional wave equation on an $n \times n$ grid (entered by the user) with a shared-memory kernel for the 5-point stencil and with a simple kernel, verifies that they match, and prints the time per step.

**3. Advanced level.** Create a CMake project with a CUDA C++ `wave` program that simulates the two-dimensional wave equation with an explicit scheme (5-point stencil) on the GPU with options `--size`, `--steps`, `--source <x,y>` (the point of the initial disturbance), `--frames <folder>`, and `--help`. The program measures the time per step for grids of 512–8192, prints a “grid – ms per step – GB/s – speedup over OpenMP” table, and writes frames of the field.

### Variant 24. RGB→HSV conversion {#v24}

**1. Initial level.** Create a CUDA C++ console program that converts a generated 1920×1080 image from RGB to HSV on the GPU and prints the number of pixels with a hue in the red range (0–20° or 340–360°).

**2. Basic level.** Create a CUDA C++ console program that reads a PPM file (a simulated photo of a license plate), builds a mask of pixels of a given color in HSV (the user enters the limits), writes the mask to PGM, and prints the GPU and CPU times.

**3. Advanced level.** Create a CMake project with a `colormask` program with options `--input <folder>`, `--hue <min>-<max>`, `--sat <min>`, `--val <min>`, `--output <folder>`, and `--help` that processes all PPM files in a folder, finds the bounding rectangle of the mask with atomic `atomicMin`/`atomicMax`, and prints a table of files with coordinates and times.

### Variant 25. Counting sort {#v25}

**1. Initial level.** Create a CUDA C++ console program that sorts $10^{7}$ random grades from 0 to 100: it builds a histogram of keys on the GPU, computes offsets on the CPU, and verifies that the result is sorted.

**2. Basic level.** Create a CUDA C++ console program that prompts for the number of keys and the range (up to 65,536 values), performs a counting sort with local histograms on the GPU, compares with `thrust::sort` and `std::sort`, and prints a timing table.

**3. Advanced level.** Create a CMake project with a `countsort` program with options `--count`, `--range`, `--stable`, `--csv`, and `--help` that stably sorts “key – value” pairs (prefix sum on the GPU), verifies stability, and prints the time for five sizes with and without copies.

### Variant 26. Perlin noise with ILGPU {#v26}

**1. Initial level.** Create a C# console program with ILGPU that generates a 1024×1024 height map with Perlin gradient noise (the permutation table is passed to the kernel as an `ArrayView<int>`) and writes it to PGM.

**2. Basic level.** Create a C# console program with ILGPU that prompts for the map size, the number of octaves, and the seed, generates a height map with fractal Perlin noise (a sum of octaves) on the GPU and with `Parallel.For`, verifies that they match (tolerance $10^{- 5}$), and prints the time.

**3. Advanced level.** Create a C# application with ILGPU that generates a terrain height map with fractal Perlin noise with options `--size`, `--octaves`, `--seed`, `--water <level>`, `--output`, and `--help`, colors it by height (PPM), computes the fraction of water (height below the level) with a reduction from ILGPU.Algorithms, and prints a timing table for the CUDA and CPU accelerators.

### Variant 27. Hamming distance for DNA {#v27}

**1. Initial level.** Create a CUDA C++ console program that compares 100,000 random DNA sequences of length 128 with a reference sequence on the GPU and prints the number of sequences with a Hamming distance of at most 10.

**2. Basic level.** Create a CUDA C++ console program that prompts for the number and length of DNA sequences, generates random sequences and a reference, encodes nucleotides in two bits, computes Hamming distances to the reference on the GPU (`__popc`) and on the CPU, and prints the throughput in millions of comparisons per second.

**3. Advanced level.** Create a CMake project with a `hamming` program with options `--reads <FASTA file>`, `--reference <file>`, `--max-dist <d>`, `--batch <n>`, and `--help` that processes the file in batches with overlapping copies and computation, and prints the matches found and a timing table for different batch sizes; FASTA format errors produce code 1.

### Variant 28. Sparse CSR multiplication {#v28}

**1. Initial level.** Create a CUDA C++ console program that multiplies a sparse $10^{6} \times 10^{6}$ tridiagonal matrix in CSR format by a vector of ones (one thread per row) and verifies the result.

**2. Basic level.** Create a CUDA C++ console program that generates a random sparse matrix with a given number of nonzero elements per row, multiplies it by a vector on the GPU (one thread per row and one warp per row) and with OpenMP, and prints a table of time and GFLOPS.

**3. Advanced level.** Create a CMake project with an `spmv` program with options `--matrix <.mtx file>`, `--kernel scalar|vector`, `--iterations <k>`, and `--help` that reads a matrix in Matrix Market format, performs 100 iterations of the power method on the GPU without copies between them, and prints the time per iteration and an estimate of the largest eigenvalue.

### Variant 29. Population survival (Monte Carlo) {#v29}

**1. Initial level.** Create a CUDA C++ console program in which each thread simulates a population of 50 individuals over 100 years (random births and deaths) and computes the fraction of $10^{6}$ simulations in which the population survived.

**2. Basic level.** Create a CUDA C++ console program that prompts for the initial population size, the birth and death probabilities, and the number of simulations, computes the survival probability on the GPU (cuRAND) and on the CPU, and prints the 95 % confidence interval and the time.

**3. Advanced level.** Create a CMake project with a `survival` program with options `--sizes 10,20,50,100`, `--birth`, `--death`, `--years`, `--sims`, `--csv`, and `--help` that computes the survival probability as a function of the initial size, writes a CSV, and prints a table with confidence intervals; invalid probabilities produce code 1.

### Variant 30. Analyzing a program in Nsight Systems {#v30}

**1. Initial level.** Create a CUDA C++ console program that copies a 64 MB array to the GPU 20 times, runs a simple kernel, and copies the result back, then obtain an `nsys profile --stats=true` report for it and state the fraction of time spent on copies.

**2. Basic level.** Create a CUDA C++ console program that processes 100 images of 1920×1080 (grayscale conversion and blurring) in two versions: a naive one (copying at every step) and an optimized one (pinned memory, data on the GPU between kernels), and print the time of both.

**3. Advanced level.** Create a CMake project with a CUDA C++ `pipeline` program that processes a batch of images on the GPU (grayscale conversion and blurring) in versions `--version naive|pinned|streams` (copying at every step; pinned memory with data kept on the GPU between kernels; several CUDA streams) with NVTX ranges for the stages. Profile all versions with `nsys`, build a table of copy, kernel, and total time from the `cuda_gpu_mem_time_sum` and `cuda_gpu_kern_sum` reports, and explain the bottlenecks.

## Procedure

1. Study the theory and worked examples.
2. Check the environment: `nvidia-smi` and `nvcc --version` in Ubuntu under WSL2; build the “Vector addition” example with a CMake project (`LANGUAGES CXX CUDA`, `CMAKE_CUDA_ARCHITECTURES`).
3. Implement a sequential CPU version of the task, then the GPU kernel(s) with bounds checks and checks of all CUDA calls; make sure the GPU and CPU results match (within a tolerance for floating-point numbers).
4. Measure time with CUDA events (or `Stopwatch` for ILGPU) with warmup and the median of several runs, separately for the kernel and the copies; compare with the best CPU version (OpenMP or `Parallel.For`) and explain whether the GPU pays off once transfers are included.
5. Demonstrate the program, explain the code and measurement results, and answer the review questions.
