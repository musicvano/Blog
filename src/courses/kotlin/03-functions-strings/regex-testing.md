---
title: "Regular expressions and testing"
description: "Topic 3. Functions and strings: regular expressions and testing"
outline: [2, 3]
sourceHash: "ce444d8bd5cecbbba2990804b4efa89acadd765b00f9edb8b9bbd038265d4974"
---

# Regular expressions and testing

## Regex: full matching and searching

`Regex(pattern)` describes a text rule. `matches` checks the entire string; `find` searches for the first fragment; `findAll` provides all non-overlapping matches. Confusing validation of the entire input with searching within it is a common validation error.

The character class `[0-9]` specifies a digit, `{3}` means exactly three repetitions, `+` means one or more, and `?` makes the preceding element optional. Parentheses create groups accessible through `groupValues`. Group zero contains the full match, and subsequent groups contain captured parts.

In an ordinary Kotlin string, backslashes must be escaped, so a regular expression for digits may look like `"\\d+"`. In a raw string with triple quotes, backslashes are not doubled. The `Regex.escape` function is needed when user text should become a literal fragment of a pattern, rather than new regex code.

### Example 4. User card

Only a sample international phone number format is checked: a plus sign and 12 ASCII digits starting with 380. This does not prove that the number exists or belongs to a particular carrier. The program creates a multiline card with defined fields.

```kotlin
val phonePattern = Regex("\\+380[0-9]{9}")

fun userCard(name: String, phone: String, width: Int = 12): String {
    require(name.isNotBlank())
    require(phonePattern.matches(phone)) { "invalid phone format" }
    require(width in 6..30)
    return """
        |${"Name".padEnd(width)}: ${name.trim()}
        |${"Phone".padEnd(width)}: $phone
    """.trimMargin()
}

fun main() {
    println(userCard("Ada", "+380501112233", width = 6))
    val versionPattern = Regex("([0-9]+)\\.([0-9]+)")
    val match = versionPattern.find("version 2.4 ready")
    if (match != null) {
        println("major=${match.groupValues[1]}")
        println("minor=${match.groupValues[2]}")
    }
    println(phonePattern.matches("x+380501112233"))
}
```

```text
Name  : Ada
Phone : +380501112233
major=2
minor=4
false
```

::: info Screenshot
IntelliJ IDEA Alt+Enter &gt; Check RegExp for phonePattern; show valid and prefixed-invalid samples.
:::

Figure 3.7. Testing full regular expression matches with samples. {.caption}

A large regex is not always better than several simple checks. A date format may match a pattern, but February 31 is still not a calendar date. Similarly, a number with valid characters may have an invalid checksum. Separate syntax validation from semantic validation.

## Testing functions and text contracts

Every function should have at least a normal and a boundary example. For text, add an empty string, whitespace, an invalid delimiter, and an extra prefix. For numbers, test zero, a boundary, an invalid format, and a value that does not fit in the type.

For formatting, compare the entire expected string, including spaces and line breaks. Visually similar strings may have different numbers of spaces or different newline characters. Showing the length and printing in square brackets helps with debugging.

Test a recursive algorithm from the base case through a small data set that can be calculated manually. For tail recursion, explain why no additional work remains after the call. Do not deliberately run infinite recursion as a normal correctness test: analyzing argument reduction and the boundary is sufficient.

For an extension, test both an ordinary dot call and cases that appear “method-like” but actually use static resolution. An extension should make behavior clear, rather than imply that the implementation of a standard class has changed.
