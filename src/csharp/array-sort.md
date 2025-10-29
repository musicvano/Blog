# Array Sort

A C# console application that demonstrates array sorting using the Selection Sort algorithm.

## Description

ArraySort is an educational program that generates an array of random integers, sorts them using a manual implementation of the Selection Sort algorithm, and displays both the unsorted and sorted arrays. This project is designed to help understand how sorting algorithms work at a fundamental level.

## Features

- Generates an array of 10 random integers (range: 0-99)
- Implements Selection Sort algorithm from scratch
- Displays the array before and after sorting
- Includes commented alternative using `Array.Sort()` for comparison
- Clean console output with formatted array display

## Requirements

- .NET Framework or .NET Core/5+
- C# compiler

## Usage

Simply run the application. It will automatically:

1. Generate 10 random numbers between 0 and 99
2. Display the unsorted array
3. Sort the array using Selection Sort
4. Display the sorted array

### Example Output

```
m = [47, 12, 89, 3, 56, 23, 91, 8, 34, 67]
m = [3, 8, 12, 23, 34, 47, 56, 67, 89, 91]
```

## Algorithm: Selection Sort

The program uses **Selection Sort**, a simple comparison-based sorting algorithm that works by:

1. Starting from the first position (i = 0)
2. Comparing the current element with all elements after it (j = i+1 to end)
3. Swapping whenever a smaller element is found
4. Moving to the next position and repeating

### Algorithm Characteristics

- **Time Complexity**: O(n²) for all cases
- **Space Complexity**: O(1) - sorts in-place
- **Stability**: Not stable in this implementation
- **Best for**: Small datasets, educational purposes, or when memory writes are expensive

### Code Snippet

```csharp
for (int i = 0; i < count; i++)
{
    for (int j = i + 1; j < count; j++)
    {
        if (m[i] > m[j])
        {
            int temp = m[i];
            m[i] = m[j];
            m[j] = temp;
        }
    }
}
```

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Alternative Sorting Method

The code includes a commented-out alternative using C#'s built-in sorting:

```csharp
Array.Sort(m);
```

This uses an optimized sorting algorithm (typically IntroSort, a hybrid of QuickSort, HeapSort, and InsertionSort) and is recommended for production code. The manual implementation is provided for educational purposes.

## Educational Value

This project is excellent for:

- Learning how sorting algorithms work
- Understanding nested loops and array manipulation
- Comparing custom implementations with built-in methods
- Practicing algorithm analysis and optimization

## License

This project is licensed under the MIT license.
