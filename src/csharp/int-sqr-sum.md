# Integer Sqaure Sum

Create a simple C# console application that calculates the sum of squares of two integers.

## Solution

This is a basic mathematical calculator that prompts the user to enter two integer numbers, squares each of them, and displays the sum of the squares (x<sup>2</sup> + y<sup>2</sup>).

```cs
namespace IntSqrSum
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Input X: ");
            var str = Console.ReadLine();
            var x = Convert.ToInt32(str);

            Console.Write("Input Y: ");
            str = Console.ReadLine();
            var y = Convert.ToInt32(str);

            Console.WriteLine("x^2 + y^2 = {0}", x * x + y * y);
        }
    }
}

```

## Features

- Accepts two integer number inputs from the user
- Calculates the square of each number
- Computes and displays the sum of squares
- Simple console-based user interface

## Usage

1. Run the application
2. When prompted, enter the first integer (X) and press Enter
3. Enter the second integer (Y) and press Enter
4. The program will display the result in the format: `x^2 + y^2 = [result]`

### Example

```
Input X: 3
Input Y: 4
x^2 + y^2 = 25
```

In this example: 3<sup>2</sup> + 4<sup>2</sup> = 9 + 16 = 25

## Mathematical Background

This program calculates the sum of squares, which is commonly used in:

- **Pythagorean theorem**: Finding the hypotenuse of a right triangle (c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup>)
- **Distance calculations**: Computing Euclidean distance in 2D space
- **Statistics**: Calculating variance and standard deviation

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Code Structure

The application consists of a single `Program` class with a `Main` method that:

1. Reads two string inputs from the console
2. Converts them to 32-bit integers using `Convert.ToInt32()`
3. Calculates the sum of squares: x² + y²
4. Outputs the result to the console

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/IntSqrSum).
