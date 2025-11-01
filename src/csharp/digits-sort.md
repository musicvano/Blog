# Digits Sort

Create a C# console application that extracts all digits from a text string and displays them in sorted order.

## Solution

This app demonstrates string parsing, character validation, and sorting. It accepts any text input containing a mix of letters, numbers, and special characters, extracts only the numeric digits, sorts them in ascending order, and displays the result as a continuous sequence.

```cs
namespace DigitsSort
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Input text with digits: ");
            var str = Console.ReadLine();

            // Counting digits in the text string
            var count = 0;
            foreach (var c in str!)
            {
                if (char.IsDigit(c))
                {
                    count++;
                }
            }

            // Creating an array to store digits
            var m = new int[count];
            var index = 0;
            foreach (var c in str)
            {
                if (char.IsDigit(c))
                {
                    m[index] = Convert.ToInt32(c.ToString());
                    index++;
                }
            }

            // Sorting the array using selection sort
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

            // Displaying the sorted result
            Console.Write("Sorted result: ");
            foreach (int item in m)
            {
                Console.Write(item);
            }
        }
    }
}
```

## Features

- Accepts mixed alphanumeric input text
- Extracts only digit characters (0-9)
- Ignores letters, spaces, and special characters
- Sorts extracted digits using Selection Sort algorithm
- Displays sorted digits as a continuous string
- Two-pass algorithm: counting then extraction

## Requirements

- .NET Framework or .NET Core/5+
- C# compiler

## Usage

1. Run the application
2. Enter any text containing digits (letters and symbols are allowed)
3. The program will extract all digits and display them sorted in ascending order

### Example Usage

```
Input text with digits: Hello123World456
Sorted result: 123456
```

```
Input text with digits: abc9def3ghi7jkl1
Sorted result: 1379
```

```
Input text with digits: Order #4582 - Price: $19.99
Sorted result: 124589999
```

```
Input text with digits: No numbers here!
Sorted result:
```

## How It Works

### Step 1: Count Digits

```cs
var count = 0;
foreach (var c in str!)
{
    if (char.IsDigit(c))
    {
        count++;
    }
}
```

First pass through the string counts how many digit characters exist.

### Step 2: Extract Digits

```cs
var m = new int[count];
var index = 0;
foreach (var c in str)
{
    if (char.IsDigit(c))
    {
        m[index] = Convert.ToInt32(c.ToString());
        index++;
    }
}
```

Second pass extracts digits and stores them as integers in an array.

### Step 3: Sort Digits (Selection Sort)

```cs
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

Sorts the digit array in ascending order using Selection Sort.

### Step 4: Display Results

```cs
foreach (int item in m)
{
    Console.Write(item);
}
```

Outputs sorted digits as a continuous string without spaces.

## Algorithm Analysis

### Time Complexity

- **Counting pass**: O(n) where n is input string length
- **Extraction pass**: O(n)
- **Sorting**: O(d²) where d is number of digits
- **Overall**: O(n + d²)

### Space Complexity

- **Array storage**: O(d) for digit array
- **Overall**: O(d)

Since d ≤ n and typically d << n, the algorithm is quite efficient.

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Technical Details

### Character Validation

- Uses `char.IsDigit(c)` to identify numeric characters
- Works with Unicode digit characters (0-9)
- Filters out all non-digit characters automatically

### Digit Conversion

- Converts char to string: `c.ToString()`
- Converts string to integer: `Convert.ToInt32()`
- Alternative: `int.Parse()` or `c - '0'` for ASCII arithmetic

### Null-Forgiving Operator

- `str!` tells compiler that `ReadLine()` won't return null
- Safe in this context since we're iterating immediately

## Educational Value

This project is excellent for learning:

- **String manipulation**: Parsing and character-level processing
- **Character classification**: Using `char.IsDigit()` and similar methods
- **Two-pass algorithms**: Counting before allocation
- **Type conversion**: Converting between char, string, and int
- **Array manipulation**: Dynamic sizing based on input
- **Sorting algorithms**: Applying Selection Sort to extracted data
- **Filtering data**: Separating relevant from irrelevant information

## Use Cases

Practical applications of this algorithm:

- **Data cleaning**: Extracting numeric codes from mixed text
- **Phone number extraction**: Getting digits from formatted numbers
- **ID validation**: Sorting identification numbers
- **Log parsing**: Extracting numeric values from log files
- **Form processing**: Validating and organizing numeric input

## Possible Enhancements

Consider these extensions:

- Sort in descending order option
- Remove duplicate digits
- Count frequency of each digit
- Extract and sort multi-digit numbers (not just single digits)
- Support for negative numbers
- Display original vs sorted side-by-side
- Add option to use `Array.Sort()` for comparison
- Extract digits while preserving their groupings

## Edge Cases

The program handles:

- **No digits**: Creates empty array, displays nothing
- **Only digits**: Processes entire input
- **Unicode characters**: Properly identifies digit characters
- **Empty input**: Handles gracefully (creates size-0 array)

## Alternative Sorting

For production code, consider using built-in sorting:

```cs
Array.Sort(m);
```

The manual Selection Sort implementation is provided for educational purposes.

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/DigitsSort).
