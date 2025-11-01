# Random Password

Write a simple C# console application that generates random passwords.

## Solution

PasswordGenerator.cs

```cs
namespace RandomPassword
{
    internal class PasswordGenerator
    {
        private const string Letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string Digits = "0123456789";
        private const string Symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        private readonly Random random = new();

        /// <summary>
        /// Generates a random password of the specified length, optionally including digits and symbols
        /// </summary>
        /// <param name="length">The number of characters in the generated string</param>
        /// <param name="includeDigits">Specifies whether digits are included in the generated string</param>
        /// <param name="includeSymbols">Specifies whether symbols are included in the generated string</param>
        public string GetPassword(int length, bool includeDigits = true, bool includeSymbols = true)
        {
            if (length <= 0)
                throw new ArgumentException("Password length must be positive.");

            string chars = Letters;
            if (includeDigits) chars += Digits;
            if (includeSymbols) chars += Symbols;

            return new string(Enumerable.Range(0, length)
                .Select(_ => chars[random.Next(chars.Length)])
                .ToArray());
        }
    }
}

```

Program.cs

```cs
namespace RandomPassword
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var generator = new PasswordGenerator();
            Console.WriteLine("Generated passwords:");

            // Generate a password with default settings (includes digits and symbols)
            var password = generator.GetPassword(12);
            Console.WriteLine($"{password}");

            // Generate a password without symbols
            password = generator.GetPassword(12, true, false);
            Console.WriteLine($"{password}");

            // Generate a password with only letters
            password = generator.GetPassword(12, false, false);
            Console.WriteLine($"{password}");
        }
    }
}

```

## Features

- Choose password length
- Optionally include digits and symbols
- Clean, object-oriented structure
- Easy to extend or integrate

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Output

```
Generated passwords:
bZ2mRZJC5u6h
bV7tvdiqZj8s
DMoXUBnNvMfZ

```

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/RandomPassword).
