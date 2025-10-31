# Common Words

Create a C# console application that finds and displays all common words between two input sentences.

## Description

The program demonstrates string manipulation, array processing, and set intersection concepts. It accepts two sentences from the user, splits them into individual words, and identifies words that appear in both sentences using case-insensitive comparison.

```cs
namespace CommonWords
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("The first sentence: ");
            var str1 = Console.ReadLine();
            Console.Write("The second sentence: ");
            var str2 = Console.ReadLine();

            string[] words1 = str1!.Split(' ');
            string[] words2 = str2!.Split(' ');
            foreach (var wordFirst in words1)
            {
                foreach (var wordSecond in words2)
                {
                    if (string.Compare(wordFirst, wordSecond, true) == 0)
                    {
                        Console.WriteLine(wordFirst);
                    }
                }
            }
        }
    }
}

```

## Features

- Accepts two sentences as input
- Splits sentences into individual words
- Performs case-insensitive word comparison
- Displays all matching words found in both sentences
- Handles duplicate matches (shows repeated occurrences)
- Simple nested loop algorithm

## Usage

1. Run the application
2. Enter the first sentence when prompted
3. Enter the second sentence when prompted
4. The program will display all common words, one per line

### Example Usage

```
The first sentence: I love programming in C#
The second sentence: Programming is fun and I enjoy it
I
programming
```

```
The first sentence: The quick brown fox jumps
The second sentence: The lazy dog jumps high
The
jumps
```

```
The first sentence: hello world
The second sentence: HELLO UNIVERSE
hello
```

```
The first sentence: Apple Orange Banana
The second sentence: Grape Mango Pineapple
(no output - no common words)
```

## How It Works

### Step 1: Input Collection

```csharp
var str1 = Console.ReadLine();
var str2 = Console.ReadLine();
```

Reads two sentences from user input.

### Step 2: Word Splitting

```csharp
string[] words1 = str1!.Split(' ');
string[] words2 = str2!.Split(' ');
```

Splits each sentence into arrays of words using space as delimiter.

### Step 3: Find Common Words (Nested Loop)

```csharp
foreach (var wordFirst in words1)
{
    foreach (var wordSecond in words2)
    {
        if (string.Compare(wordFirst, wordSecond, true) == 0)
        {
            Console.WriteLine(wordFirst);
        }
    }
}
```

Compares every word from the first sentence with every word from the second sentence using case-insensitive comparison.

### Case-Insensitive Comparison

```csharp
string.Compare(wordFirst, wordSecond, true)
```

The `true` parameter enables case-insensitive comparison, so "Hello" matches "hello".

## Algorithm Analysis

### Time Complexity

- **O(n × m)** where n = number of words in first sentence, m = number of words in second sentence
- Nested loop compares all pairs of words

### Space Complexity

- **O(n + m)** for storing word arrays

### Behavior Notes

- **Duplicates**: If a word appears multiple times, it will be displayed multiple times
- **Order**: Results appear in the order words appear in the first sentence
- **Whitespace**: Uses single space as word separator

## Building and Running

### Using Visual Studio

1. Open the project in Visual Studio
2. Press F5 or click "Start" to build and run

### Using .NET CLI

```bash
dotnet run
```

## Technical Details

### String.Split()

- Splits string by delimiter (space character)
- Returns array of substrings
- Empty entries may occur with multiple consecutive spaces

### String.Compare()

- Returns 0 if strings are equal
- Third parameter (true) enables case-insensitive comparison
- Culture-invariant comparison

### Null-Forgiving Operator

- `str1!` and `str2!` tell compiler that `ReadLine()` won't return null
- Safe in this interactive context

## Limitations & Considerations

### Current Behavior

- **Multiple occurrences**: Word displayed once for each match pair
  - Example: "cat dog cat" vs "cat" displays "cat" twice
- **Punctuation**: Not handled - "hello," ≠ "hello"
- **Multiple spaces**: May create empty array elements
- **No deduplication**: Repeated matches are shown

### Edge Cases

- Empty sentences: No output
- Single-word sentences: Works correctly
- Identical sentences: Displays all words (with duplicates)
- No common words: No output

## Possible Enhancements

Consider these improvements:

### Basic Enhancements

- Remove duplicate results using `HashSet<string>`
- Strip punctuation before comparison
- Handle multiple spaces with `Split(new[] {' '}, StringSplitOptions.RemoveEmptyEntries)`
- Count frequency of common words

### Advanced Enhancements

- Sort results alphabetically
- Display words only once with occurrence count
- Support case-sensitive mode option
- Compare paragraphs or files
- Use LINQ for more concise code:
  ```csharp
  var common = words1.Intersect(words2, StringComparer.OrdinalIgnoreCase);
  ```

## Alternative Implementation (LINQ)

A more efficient approach using LINQ:

```csharp
var common = words1
    .Intersect(words2, StringComparer.OrdinalIgnoreCase)
    .Distinct();

foreach (var word in common)
{
    Console.WriteLine(word);
}
```

This eliminates duplicates and is more efficient for large inputs.

## Use Cases

Practical applications:

- **Text analysis**: Finding common themes between documents
- **Keyword matching**: Comparing search terms
- **Plagiarism detection**: Basic similarity checking
- **Tag comparison**: Finding shared categories
- **Natural language processing**: Token intersection

## Example with Duplicates

Understanding duplicate behavior:

```
First: "cat dog cat bird"
Second: "cat fish cat"
Output:
cat      (from first cat matching first cat)
cat      (from first cat matching second cat)
cat      (from third cat matching first cat)
cat      (from third cat matching second cat)
```

## Source Code

Please refer to the [GitHub repository](https://github.com/musicvano/Tutorials/tree/main/CommonWords).
