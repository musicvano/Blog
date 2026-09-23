---
title: "Практика"
description: "Тема 3. Методи, масиви, рядки: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Пошук оцінки

Метод sortedCopy приймає varargs, перевіряє оцінки та повертає відсортовану копію. Метод find повертає індекс у цій копії або −1, приховуючи від клієнта деталі кодування точки вставки binarySearch.

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

Параметр find повинен бути відсортованим; метод не перевіряє цю передумову за кожного виклику. Інакше лінійна перевірка знищила б перевагу бінарного пошуку. Назва параметра й документація мають робити вимогу явною.

## Приклад 2. Українські голосні

Алфавіт голосних задано явно: а, е, є, и, і, ї, о, у, ю, я. Метод використовує chars, бо всі ці літери вміщуються в одну кодову одиницю UTF-16. Інші символи, включно з емодзі, не враховуються. Для загального підрахунку літер слід перейти до codePoints та Character.isLetter(int).

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

Окремий vowel дозволяє перевірити правило незалежно від циклу. Додавання латинських голосних змінює контракт, тому його не слід робити непомітно.

## Приклад 3. Рекурсивний паліндром

Після нормалізації залишаються тільки ASCII-літери та цифри. Це явне обмеження навчального прикладу, а не універсальна обробка всіх мов. Метод перевіряє крайні символи й рекурсивно звужує інтервал. Максимальна довжина 200 обмежує стек.

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

Порожня нормалізована послідовність є паліндромом за обраним означенням. Якщо користувацький інтерфейс має вимагати хоча б одну літеру, він повинен перевірити це окремо. Два алгоритми дають однакові відповіді, але другий створює додатковий буфер, а перший використовує стек.
