---
title: "Practice"
description: "Topic 3. Methods, arrays, and strings: worked examples"
outline: [2, 3]
sourceHash: "3a419c30fae2e926172b11aa8d5fcc093ef11ad011ab2c247fb4354e23a62bdb"
---

# Practice

## Example 1. Finding a score

The sortedCopy method accepts varargs, validates scores, and returns a sorted copy. The find method returns an index in that copy or −1, hiding the details of binarySearch's insertion-point encoding from the caller.

```java
import java.util.Arrays;

public class Main {
    static int[] sortedCopy(int... marks) {
        if (marks == null) {
            throw new IllegalArgumentException("Missing marks");
        }
        int[] result = marks.clone();
        for (int mark : result) {
            if (mark < 0 || mark > 100) {
                throw new IllegalArgumentException("Invalid mark");
            }
        }
        Arrays.sort(result);
        return result;
    }

    static int find(int[] sorted, int target) {
        int index = Arrays.binarySearch(sorted, target);
        return index >= 0 ? index : -1;
    }

    public static void main(String[] args) {
        int[] source = {90, 60, 80, 70};
        int[] sorted = sortedCopy(source);
        System.out.println(Arrays.toString(source));
        System.out.println(Arrays.toString(sorted));
        System.out.println(find(sorted, 80));
        System.out.println(find(sorted, 75));
        System.out.println(find(sortedCopy(), 50));
        System.out.println(Arrays.toString(sortedCopy(100, 0)));
    }
}
```

```text
[90, 60, 80, 70]
[60, 70, 80, 90]
2
-1
-1
[0, 100]
```

The parameter supplied to find must be sorted; the method does not check this precondition on every call. Otherwise, a linear check would eliminate the benefit of binary search. The parameter name and documentation should make this requirement explicit.

## Example 2. Ukrainian vowels

The vowel alphabet is defined explicitly: а, е, є, и, і, ї, о, у, ю, я. The method uses chars because all these letters fit in one UTF-16 code unit. Other characters, including emoji, are not counted. For general letter counting, switch to codePoints and Character.isLetter(int).

```java
public class Main {
    static boolean vowel(int code) {
        int lower = Character.toLowerCase(code);
        return switch (lower) {
            case 'а', 'е', 'є', 'и', 'і', 'ї',
                    'о', 'у', 'ю', 'я' -> true;
            default -> false;
        };
    }

    static int countVowels(String text) {
        if (text == null) {
            throw new IllegalArgumentException("Missing text");
        }
        int total = 0;
        for (int code : text.chars().toArray()) {
            if (vowel(code)) { total++; }
        }
        return total;
    }

    public static void main(String[] args) {
        System.out.println(countVowels("Україна"));
        System.out.println(countVowels("АЕЄИІЇОУЮЯ"));
        System.out.println(countVowels("123 😀"));
        System.out.println(countVowels(""));
    }
}
```

```text
4
10
0
0
```

A separate vowel method lets you check the rule independently of the loop. Adding Latin vowels changes the contract, so do not do this silently.

## Example 3. Recursive palindrome

After normalization, only ASCII letters and digits remain. This is an explicit limitation of the teaching example, not universal processing for all languages. The method compares the outermost characters and recursively narrows the interval. The maximum length of 200 bounds stack usage.

```java
import java.util.Locale;

public class Main {
    static String clean(String input) {
        if (input == null || input.length() > 200) {
            throw new IllegalArgumentException("Invalid text");
        }
        return input.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]", "");
    }

    static boolean palindrome(String text, int left, int right) {
        if (left >= right) { return true; }
        return text.charAt(left) == text.charAt(right)
                && palindrome(text, left + 1, right - 1);
    }

    static boolean byReverse(String text) {
        String reversed = new StringBuilder(text)
                .reverse().toString();
        return text.equals(reversed);
    }

    public static void main(String[] args) {
        String[] samples = {"Never odd or even", "Java", "!!!"};
        for (String sample : samples) {
            String text = clean(sample);
            boolean recursive = palindrome(
                    text, 0, text.length() - 1);
            System.out.println(recursive + ":" + byReverse(text));
        }
    }
}
```

```text
true:true
false:false
true:true
```

An empty normalized sequence is a palindrome under the chosen definition. If the user interface must require at least one letter, it should check that separately. The two algorithms give the same answers, but the second creates an additional buffer while the first uses the stack.
