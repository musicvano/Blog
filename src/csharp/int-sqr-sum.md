# Integer Sqaure Sum

A simple C# console application that calculates the sum of squares of two integers.

## Description

IntSqrSum is a basic mathematical calculator that prompts the user to enter two integer numbers, squares each of them, and displays the sum of the squares (x² + y²).

## Features

- Accepts two integer number inputs from the user
- Calculates the square of each number
- Computes and displays the sum of squares
- Simple console-based user interface

## Requirements

- .NET Framework or .NET Core/5+
- C# compiler

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

In this example: 3² + 4² = 9 + 16 = 25

## Mathematical Background

This program calculates the sum of squares, which is commonly used in:

- **Pythagorean theorem**: Finding the hypotenuse of a right triangle (c² = a² + b²)
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

## License

This project is licensed under the MIT license.
