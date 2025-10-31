# Print Sin Wave

Crate a C# console application that renders a sine wave graph using ASCII characters directly in the terminal window.

## Solution

This is a creative visualization program that demonstrates mathematical function plotting in a text-based environment. It draws a smooth sine wave across the entire console window using asterisk (`*`) characters, with user-configurable amplitude. The wave automatically adapts to the console window dimensions.

```cs
namespace PrintSin
{
    internal class Program
    {
        // Display the graph of the function f(x) = A * sin(ω * x)
        // with stars in text mode on the console
        static void Main(string[] args)
        {
            Console.Write("Amplitude = ");
            var str = Console.ReadLine();
            var A = Convert.ToInt32(str);

            var width = Console.WindowWidth;
            var height = Console.WindowHeight;
            for (var i = 0; i < width; i++)
            {
                var j = (int)(height / 2.0 - A * Math.Sin(2 * Math.PI * i / width));
                Console.SetCursorPosition(i, j);
                Console.Write('*');
            }
            Console.ReadKey();
        }
    }
}
```

## Features

- User-defined amplitude parameter
- Automatic adaptation to console window size
- Real-time ASCII art rendering of sine function
- Plots one complete sine wave cycle across the window width
- Centered vertically in the console window
- Interactive visualization with cursor positioning

## Usage

1. Run the application
2. Enter the desired amplitude (integer value)
3. The sine wave will be drawn across the console window
4. Press any key to exit

### Recommended Settings

- **Amplitude**: 5-15 (depending on console height)
- **Console size**: Larger windows produce smoother curves
- **Font**: Monospace font for best visual results

## Mathematical Formula

The program plots the function:

**f(x) = A × sin(ω × x)**

Where:

- **A** = Amplitude (user input)
- **ω** = Angular frequency = 2π / width
- **x** = Horizontal position (0 to window width)

### Vertical Position Calculation

```csharp
j = (int)(height / 2.0 - A * Math.Sin(2 * Math.PI * i / width))
```

This formula:

1. Centers the wave vertically at `height / 2`
2. Calculates sine value for current position `i`
3. Scales by amplitude `A`
4. Inverts the y-axis (console coordinates are top-down)

## How It Works

### Step-by-Step Process

1. **Input**: User enters amplitude value
2. **Window detection**: Program reads console dimensions
3. **Plotting loop**: For each horizontal position (0 to width):
   - Calculate corresponding y-position using sine function
   - Move cursor to calculated position
   - Draw asterisk character
4. **Hold**: Wait for keypress before exiting

### Key Technical Details

- `Console.WindowWidth` and `Console.WindowHeight` get terminal dimensions
- `Console.SetCursorPosition(x, y)` positions cursor precisely
- One complete sine cycle plotted across window width
- Y-axis inverted because console coordinates start at top-left

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

### Important Notes

- Maximize console window for best results
- Some terminals may not support cursor positioning
- Windows Command Prompt and PowerShell work well
- Terminal emulators on Linux/Mac generally supported

## Parameters Explained

### Amplitude (A)

Controls wave height:

- **Small values (1-5)**: Gentle wave
- **Medium values (6-15)**: Moderate wave
- **Large values (>15)**: May exceed window height

### Angular Frequency (ω)

Fixed at 2π / width to show exactly one complete cycle:

- Creates smooth, continuous wave
- Adapts to any window width
- Period equals window width

## Possible Enhancements

Consider these extensions:

- Multiple wave cycles (configurable frequency)
- Different wave functions (cosine, tangent, damped oscillations)
- Color support for different amplitudes
- Animated waves (moving sine wave)
- Multiple simultaneous waves with interference patterns
- User-configurable phase shift
- Vertical amplitude adjustment based on window height

## Troubleshooting

**Wave appears cut off**: Reduce amplitude or increase console height

**No output visible**: Ensure console supports cursor positioning

**Wave looks jagged**: Increase console width for smoother curve

**Program crashes**: Check that console window is not minimized

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/PrintSin).
