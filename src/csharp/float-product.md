# Float Product

Create a simple C# console application that multiplies two floating-point numbers and displays the result.

## Solution

Following snippet of code is a basic calculator program that prompts the user to enter two numbers, multiplies them together, and displays the product formatted to three decimal places.

```cs
namespace FloatProduct
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("x = ");
            var str = Console.ReadLine();
            var x = Convert.ToSingle(str);

            Console.Write("y = ");
            str = Console.ReadLine();
            var y = Convert.ToSingle(str);

            var res = x * y;
            Console.WriteLine("x * y = {0:f3}", res);
        }
    }
}

```

## Features

- Accepts two floating-point number inputs from the user
- Performs multiplication operation
- Displays the result formatted to 3 decimal places
- Simple and straightforward console interface

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

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/FloatProduct).
