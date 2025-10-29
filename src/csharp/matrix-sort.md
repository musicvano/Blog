# Matrix Sort

A C# console application that generates a square matrix with random integers and sorts its main diagonal elements in ascending order.

## Description

MatrixSort is an educational program that demonstrates 2D array manipulation and selective sorting. It creates an N×N matrix filled with random integers, displays the original matrix, sorts only the main diagonal elements using Selection Sort, and then displays the modified matrix with the sorted diagonal.

## Features

- User-defined matrix size (N×N)
- Generates random integers in the range [-10, 9]
- Displays the matrix in a formatted table layout
- Sorts only the main diagonal elements (M[0,0], M[1,1], M[2,2], ...)
- Non-diagonal elements remain unchanged
- Uses Selection Sort algorithm for diagonal sorting
- Clean, tab-separated matrix output

## Requirements

- .NET Framework or .NET Core/5+
- C# compiler

## Usage

1. Run the application
2. Enter the desired matrix size (N) when prompted
3. The program will display:
   - The original matrix with random values
   - The matrix after sorting the diagonal elements

### Example Output

```
N = 4
-5      3       7       -2
8       9       1       4
-3      6       -8      0
2       -1      5       3

-8      3       7       -2
8       -5      1       4
-3      6       3       0
2       -1      5       9
```

**Note**: In this example, the diagonal values were [-5, 9, -8, 3] and became [-8, -5, 3, 9] after sorting.

## How It Works

### Matrix Generation

```csharp
for (int i = 0; i < N; i++)
{
    for (int j = 0; j < N; j++)
    {
        M[i, j] = rnd.Next(-10, 10);
    }
}
```

Creates an N×N matrix with random integers from -10 to 9.

### Diagonal Sorting (Selection Sort)

```csharp
for (int i = 0; i < N; i++)
{
    for (int j = i + 1; j < N; j++)
    {
        if (M[i, i] > M[j, j])
        {
            var tmp = M[i, i];
            M[i, i] = M[j, j];
            M[j, j] = tmp;
        }
    }
}
```

This algorithm:

1. Only accesses diagonal elements where row index equals column index (i == j)
2. Compares M[i,i] with all subsequent diagonal elements M[j,j]
3. Swaps elements if they're out of order
4. Leaves all non-diagonal elements unchanged

### Matrix Display

The `Print()` method formats the matrix with tab-separated values for better readability.

## Algorithm Details

### Selection Sort on Diagonal

- **Time Complexity**: O(N²) where N is the matrix dimension
- **Space Complexity**: O(1) - sorts in-place
- **Elements sorted**: N diagonal elements
- **Elements unchanged**: N² - N non-diagonal elements

### Main Diagonal

In an N×N matrix, the main diagonal consists of elements where the row index equals the column index:

- M[0,0], M[1,1], M[2,2], ..., M[N-1,N-1]

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Educational Value

This project is excellent for learning:

- **2D arrays (matrices)**: Creating and manipulating multidimensional arrays
- **Matrix concepts**: Understanding rows, columns, and diagonals
- **Selective sorting**: Sorting specific elements without affecting others
- **Nested loops**: Working with double-nested iterations
- **Method extraction**: Using helper methods like `Print()`
- **Array indexing**: Using `GetLength(0)` and `GetLength(1)` for dimensions
- **Sorting algorithms**: Applying Selection Sort to a subset of data

## Technical Notes

- Uses `int.Parse()` for string-to-integer conversion
- Null-forgiving operator (`!`) used for `ReadLine()` result
- Random number range: `[-10, 10)` (includes -10, excludes 10)
- Matrix elements are tab-separated (`\t`) for aligned output
- Works with any positive integer matrix size

## Possible Extensions

Consider these enhancements:

- Sort secondary diagonal (anti-diagonal)
- Sort specific rows or columns
- Sort in descending order
- Support rectangular matrices (N×M)
- Add matrix operations (transpose, sum, product)

## License

This project is licensed under the MIT license.
