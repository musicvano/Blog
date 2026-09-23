---
title: "Практика"
description: "Тема 9. Узагальнення (generics): розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Одномісний контейнер

Контейнер розрізняє відсутність значення та наявність непорожнього посилання. Значення `null` заборонене, тому стан можна зберігати одним полем. `put` замінює попереднє значення, а `get` не вилучає його. Читання порожньої коробки є помилкою стану клієнта.

```java
import java.util.NoSuchElementException;
import java.util.Objects;

public class Main {
    static final class Box<T> {
        private T value;

        boolean isEmpty() { return value == null; }

        void put(T next) {
            value = Objects.requireNonNull(next, "value");
        }

        T get() {
            if (isEmpty()) {
                throw new NoSuchElementException("empty");
            }
            return value;
        }

        void clear() { value = null; }
    }

    public static void main(String[] args) {
        Box<String> box = new Box<>();
        System.out.println(box.isEmpty());
        box.put("draft");
        box.put("ready");
        System.out.println(box.get());
        box.clear();
        try {
            box.get();
        } catch (NoSuchElementException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
true
ready
empty
```

Перевірте також `Box<Integer>`, повторне очищення та відхилення `null`. Заборону `box.put(42)` для коробки рядків перевіряють окремим негативним тестом компіляції. Перехоплення винятку не може перевірити код, який компілятор взагалі не приймає.

## Приклад 2. Межі масиву

Алгоритм здійснює один прохід і не сортує вхідний масив. Обмеження `Comparable<? super T>` підтримує типи, що успадкували порівняння зі своїм базовим типом. Порожній масив відхиляємо: повертати вигадані межі для відсутніх даних було б неправильним контрактом.

```java
import java.util.Objects;

public class Main {
    record Pair<A, B>(A first, B second) {}

    static <T extends Comparable<? super T>>
    Pair<T, T> minmax(T[] values) {
        Objects.requireNonNull(values, "values");
        if (values.length == 0) {
            throw new IllegalArgumentException("empty array");
        }
        T min = Objects.requireNonNull(values[0]);
        T max = min;
        for (T value : values) {
            Objects.requireNonNull(value);
            if (value.compareTo(min) < 0) min = value;
            if (value.compareTo(max) > 0) max = value;
        }
        return new Pair<>(min, max);
    }

    public static void main(String[] args) {
        System.out.println(minmax(new Integer[]{7, -2, 7}));
        System.out.println(minmax(new String[]{"cat", "ant"}));
        System.out.println(minmax(new Integer[]{5}));
        try {
            minmax(new Integer[0]);
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
Pair[first=-2, second=7]
Pair[first=ant, second=cat]
Pair[first=5, second=5]
empty array
```

Мінімум і максимум повертаються як посилання на початкові об’єкти. Для змінюваних об’єктів результат не є глибокою копією. Окремо перевірте однакові елементи, масив у зворотному порядку та `null` усередині. Для рядків використано природний лексикографічний порядок Unicode, а не мовні правила українського словника.

## Приклад 3. Фільтрація зі споживачем базового типу

Умова споживає значення `T`, тому її параметр має вигляд `Condition<? super T>`. Умову для `Number` можна застосувати до масиву `Integer`. Щоб зберегти фактичний тип масиву, створюємо копію через `Arrays.copyOf`, а не небезпечне приведення `Object[]`. Умова викликається рівно один раз для кожного елемента.

```java
import java.util.Arrays;
import java.util.Objects;

public class Main {
    interface Condition<T> {
        boolean test(T value);
    }

    static <T> T[] filter(T[] values, Condition<? super T> rule) {
        Objects.requireNonNull(values);
        Objects.requireNonNull(rule);
        T[] result = Arrays.copyOf(values, values.length);
        int size = 0;
        for (T value : values) {
            if (rule.test(value)) result[size++] = value;
        }
        return Arrays.copyOf(result, size);
    }

    public static void main(String[] args) {
        Condition<Number> positive = new Condition<>() {
            public boolean test(Number value) {
                return value != null && value.doubleValue() > 0;
            }
        };
        Integer[] input = {-2, 0, 3, null, 4};
        Integer[] result = filter(input, positive);
        System.out.println(Arrays.toString(result));
        System.out.println(Arrays.toString(input));
        System.out.println(filter(new Integer[0], positive).length);
    }
}
```

```text
[3, 4]
[-2, 0, 3, null, 4]
0
```

Анонімний клас реалізує інтерфейс умови; лямбда-вирази буде розглянуто окремо. Контракт конкретної умови дозволяє `null` і відкидає його. Інша умова може заборонити `null`, але така політика має бути явно задокументована. Перевірте, що результат зберігає порядок і що зміна комірки результату не змінює комірку вхідного масиву; самі об’єкти при цьому залишаються спільними.
