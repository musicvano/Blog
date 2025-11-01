# Command Calculator

Create a C# console-based command-line calculator with an interactive REPL (Read-Eval-Print Loop) interface.

## Solution

The program demonstrates command parsing, interactive loop design, and basic arithmetic operations. It provides a simple command-line interface where users can perform calculations using text commands, making it similar to shell-based calculators or basic interpreters.

```cs
namespace CommandCalc
{
    internal class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.Write("> ");
                string str = Console.ReadLine()!;
                string[] words = str.Split([' ', ','], StringSplitOptions.RemoveEmptyEntries);
                if ((words.Length) < 1)
                    continue;
                string command = words[0].ToLower();
                switch (command)
                {
                    case "exit":
                        return;
                    case "help":
                        Console.WriteLine("All commands: Add, Sub, Mul, Div, Clear, Help, Exit.");
                        continue;
                    case "clear":
                        Console.Clear();
                        continue;
                    case "add":
                    case "sub":
                    case "mul":
                    case "div":
                        if (words.Length != 3)
                        {
                            Console.WriteLine("Incorrect command format");
                            continue;
                        }
                        int arg1 = Convert.ToInt32(words[1]);
                        int arg2 = Convert.ToInt32(words[2]);
                        if (command == "add")
                            Console.WriteLine(arg1 + arg2);
                        if (command == "sub")
                            Console.WriteLine(arg1 - arg2);
                        if (command == "mul")
                            Console.WriteLine(arg1 * arg2);
                        if (command == "div")
                            Console.WriteLine(arg1 / arg2);
                        break;
                    default:
                        Console.WriteLine("Unknown command :(");
                        continue;
                }
            }

        }
    }
}

```

## Features

- **Interactive REPL**: Continuous command prompt for multiple operations
- **Basic arithmetic**: Addition, subtraction, multiplication, and division
- **Case-insensitive commands**: Works with any letter case
- **Flexible input**: Accepts space or comma as delimiter
- **Command validation**: Checks for correct number of arguments
- **Built-in help system**: Lists all available commands
- **Console management**: Clear screen functionality
- **Graceful exit**: Clean termination command

## Usage

### Starting the Calculator

Run the application and you'll see a command prompt (`>`):

```
>
```

### Command Format

Most commands follow this pattern:

```
> command argument1 argument2
```

### Available Commands

| Command | Arguments | Description          | Example        |
| ------- | --------- | -------------------- | -------------- |
| `add`   | num1 num2 | Addition             | `add 5 3` → 8  |
| `sub`   | num1 num2 | Subtraction          | `sub 10 4` → 6 |
| `mul`   | num1 num2 | Multiplication       | `mul 7 6` → 42 |
| `div`   | num1 num2 | Division (integer)   | `div 20 4` → 5 |
| `help`  | none      | Show all commands    | `help`         |
| `clear` | none      | Clear console screen | `clear`        |
| `exit`  | none      | Exit the program     | `exit`         |

### Example Session

```
> add 15 27
42
> sub 100 58
42
> mul 6 7
42
> div 84 2
42
> help
All commands: Add, Sub, Mul, Div, Clear, Help, Exit.
> exit
```

### Input Flexibility

The calculator accepts both spaces and commas as separators:

```
> add 5 3        ✓ Works
> add 5, 3       ✓ Works
> add 5,3        ✓ Works
> add  5   3     ✓ Works (multiple spaces)
```

## How It Works

### Main Loop Structure

```cs
while (true)
{
    // Read command
    // Parse command
    // Execute command
    // Loop continues until "exit"
}
```

### Command Parsing

```cs
string[] words = str.Split([' ', ','], StringSplitOptions.RemoveEmptyEntries);
string command = words[0].ToLower();
```

Splits input by spaces or commas, removes empty entries, and converts command to lowercase.

### Command Execution (Switch Statement)

```cs
switch (command)
{
    case "exit":
        return;
    case "help":
        // Display help
    case "add":
        // Perform addition
    // ... other cases
    default:
        // Unknown command
}
```

Uses a switch statement to route commands to appropriate handlers.

### Arithmetic Operations

```cs
int arg1 = Convert.ToInt32(words[1]);
int arg2 = Convert.ToInt32(words[2]);
```

Converts string arguments to integers and performs the requested operation.

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Technical Details

### Command Parsing Features

- **Collection expression**: `[' ', ',']` defines delimiter array
- **StringSplitOptions.RemoveEmptyEntries**: Eliminates blank elements
- **Case normalization**: `ToLower()` for case-insensitive matching

### Error Handling

- **Empty input**: Silently ignored with `continue`
- **Wrong argument count**: Displays "Incorrect command format"
- **Unknown commands**: Displays "Unknown command :("
- **Invalid numbers**: Will throw exception (not currently handled)

### Integer Division

- Uses integer division (`/` operator)
- `div 7 2` returns `3`, not `3.5`
- Division by zero will throw exception (not currently handled)

## Limitations & Considerations

### Current Limitations

- **Integer-only arithmetic**: No floating-point support
- **No error handling**: Invalid numbers or division by zero crash the program
- **No expression evaluation**: Can't process `2 + 3 * 4`
- **Two arguments only**: No support for multiple operands
- **No history**: Previous commands not saved
- **No variables**: Can't store results for reuse

### Edge Cases

- **Division by zero**: Throws unhandled exception
- **Invalid numbers**: `add hello world` crashes
- **Too many/few arguments**: Detected and handled
- **Empty lines**: Ignored gracefully

## Possible Enhancements

### Basic Improvements

```cs
// Add error handling
try
{
    int arg1 = Convert.ToInt32(words[1]);
    int arg2 = Convert.ToInt32(words[2]);
}
catch (FormatException)
{
    Console.WriteLine("Invalid number format");
    continue;
}
catch (DivideByZeroException)
{
    Console.WriteLine("Cannot divide by zero");
    continue;
}
```

### Feature Enhancements

- **Floating-point support**: Use `double` instead of `int`
- **More operations**: Power, modulo, square root
- **Expression parser**: Evaluate `2 + 3 * 4` with operator precedence
- **Variables**: Store and recall values (`set x 5`, `add x 3`)
- **Command history**: Arrow keys to recall previous commands
- **Result persistence**: Use last result in next calculation
- **Function support**: `sin`, `cos`, `log`, etc.
- **Scripting**: Read commands from file

### Advanced Features

- **Custom functions**: Define user functions
- **Unit conversion**: Temperature, distance, etc.
- **Complex numbers**: Support for imaginary numbers
- **Matrix operations**: Vector and matrix arithmetic
- **Programming constructs**: Loops, conditionals, functions

## Alternative Operations Implementation

More concise arithmetic using dictionary:

```cs
var operations = new Dictionary<string, Func<int, int, int>>
{
    ["add"] = (a, b) => a + b,
    ["sub"] = (a, b) => a - b,
    ["mul"] = (a, b) => a * b,
    ["div"] = (a, b) => a / b
};

if (operations.ContainsKey(command))
{
    Console.WriteLine(operations[command](arg1, arg2));
}
```

## Use Cases

Educational applications:

- **Teaching command-line interfaces**: Understanding REPL design
- **Parser development**: Learning to process structured input
- **Basic interpreter design**: Foundation for language development
- **User interaction patterns**: Building responsive applications

Practical applications:

- **Quick calculations**: Faster than opening calculator app
- **Scriptable operations**: Can be extended to read from files
- **Educational tool**: Teaching arithmetic and programming concepts
- **Prototyping**: Base for more complex command processors

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/CommandCalc).
