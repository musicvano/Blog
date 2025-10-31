# Array Min, Max, Avg

Create a C# console application that generates an array of random floating-point numbers and calculates statistical metrics: minimum, maximum, and average values.

## Solution

This is an educational program that demonstrates array manipulation and statistical calculations. It allows users to specify an array size, populates it with random floating-point numbers, and then calculates and displays the minimum, maximum, and average values using both manual implementations and LINQ methods.

```cs
namespace ArrayMinMaxAvg
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Input array size
            Console.Write("Count = ");
            var count = Convert.ToInt32(Console.ReadLine());
            var rnd = new Random();
            var arr = new float[count];
            for (int i = 0; i < count; i++)
            {
                arr[i] = 10 * rnd.NextSingle();
            }

            // Print the array
            Console.WriteLine($"[{string.Join("; ", arr)}]");

            // Find minimum value in the array
            var min = arr[0];
            foreach (var val in arr)
            {
                if (val < min)
                {
                    min = val;
                }
            }
            Console.WriteLine($"Min = {min}");

            // Alternatively, using LINQ
            Console.WriteLine($"Max = {arr.Max()}");

            // Find average value in the array
            var sum = 0.0f;
            foreach (var val in arr)
            {
                sum += val;
            }
            var avg = sum / arr.Length;
            Console.WriteLine($"Avg = {avg}");

            // Alternatively, using LINQ
            // Console.WriteLine($"Avg = {arr.Average()}");
        }
    }
}

```

## Features

- User-defined array size
- Generates random floating-point numbers in the range [0, 10)
- Displays the complete array with semicolon-separated values
- Calculates minimum value using manual iteration
- Calculates maximum value using LINQ
- Calculates average value using manual summation
- Includes commented LINQ alternative for average calculation
- Demonstrates different approaches to array statistics

## Usage

1. Run the application
2. Enter the desired array size when prompted
3. The program will display:
   - The generated array
   - Minimum value (manual calculation)
   - Maximum value (LINQ method)
   - Average value (manual calculation)

### Example Output

```
Count = 5
[3.456789; 7.891234; 1.234567; 9.876543; 5.432109]
Min = 1.234567
Max = 9.876543
Avg = 5.578248
```

## Implementation Details

### Minimum Value Calculation (Manual)

```csharp
var min = arr[0];
foreach (var val in arr)
{
    if (val < min)
    {
        min = val;
    }
}
```

Iterates through the array, comparing each element to find the smallest value.

### Maximum Value Calculation (LINQ)

```csharp
arr.Max()
```

Uses LINQ's built-in `Max()` method for concise syntax.

### Average Value Calculation (Manual)

```csharp
var sum = 0.0f;
foreach (var val in arr)
{
    sum += val;
}
var avg = sum / arr.Length;
```

Manually sums all elements and divides by the array length.

### Alternative: LINQ Average

```csharp
arr.Average()  // Commented in the code
```

LINQ provides a one-line solution for calculating averages.

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Notes

- Array values are generated in the range [0, 10) using `10 * rnd.NextSingle()`
- The program uses `float` for decimal precision
- Semicolons (`;`) are used as array value separators in output

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/ArrayMinMaxAvg).
