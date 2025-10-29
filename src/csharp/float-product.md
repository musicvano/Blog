# Float Product

A simple C# console application that multiplies two floating-point numbers and displays the result.

## Description

FloatProduct is a basic calculator program that prompts the user to enter two numbers, multiplies them together, and displays the product formatted to three decimal places.

## Features

- Accepts two floating-point number inputs from the user
- Performs multiplication operation
- Displays the result formatted to 3 decimal places
- Simple and straightforward console interface

## Requirements

- .NET Framework or .NET Core/5+
- C# compiler

## Usage

1. Run the application
2. When prompted, enter the first number (x) and press Enter
3. Enter the second number (y) and press Enter
4. The program will display the product in the format: `x * y = [result]`

### Example

```
x = 5.5
y = 2.3
x * y = 12.650
```

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
2. Converts them to single-precision floating-point numbers using `Convert.ToSingle()`
3. Multiplies the numbers
4. Outputs the result with 3 decimal places using string formatting

## License

This project is licensed under the MIT license.
