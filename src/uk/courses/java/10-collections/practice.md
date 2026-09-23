---
title: "Практика"
description: "Тема 10. Колекції: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Журнал оцінок

Список зберігає всіх студентів, навіть якщо бали однакові. Сортування виконується за спаданням бала, а за рівності – за ідентифікатором. Пошук за id не залежить від позиції після сортування. Конструктор запису захищає діапазон оцінки та коректність id.

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Main {
    record Grade(int id, String name, int points) {
        Grade {
            if (id <= 0 || name == null || name.isBlank()
                    || points < 0 || points > 100) {
                throw new IllegalArgumentException("invalid grade");
            }
        }
    }

    static Grade find(List<Grade> grades, int id) {
        for (Grade grade : grades) {
            if (grade.id() == id) return grade;
        }
        return null;
    }

    public static void main(String[] args) {
        List<Grade> grades = new ArrayList<>(List.of(
            new Grade(2, "Bohdan", 90),
            new Grade(1, "Ada", 90),
            new Grade(3, "Ira", 75)
        ));
        grades.sort(Comparator.comparingInt(Grade::points)
            .reversed().thenComparingInt(Grade::id));
        int total = 0;
        for (Grade grade : grades) {
            System.out.println(grade.id() + " " + grade.name()
                + " " + grade.points());
            total += grade.points();
        }
        System.out.println("total: " + total);
        System.out.println("found: " + find(grades, 2).name());
        System.out.println("absent: " + (find(grades, 99) == null));
    }
}
```

```text
1 Ada 90
2 Bohdan 90
3 Ira 75
total: 255
found: Bohdan
absent: true
```

Для повної системи додайте перевірку унікальності id при вставленні: сам запис не знає про інші записи списку. Якщо пошук стає головною операцією, словник за id може бути доречнішим; це не підстава зберігати дві незалежні копії даних без правила їх узгодження.

## Приклад 2. Збалансовані дужки

Відкривальні дужки кладемо на вершину стека. Закривальна повинна відповідати останній незакритій. Інші символи ігноруємо: це перевірка дужок у звичайному рядку, а не синтаксичний аналізатор Java, який мав би враховувати літерали й коментарі.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static boolean balanced(String text) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char symbol : text.toCharArray()) {
            int open = "([{".indexOf(symbol);
            if (open >= 0) {
                stack.push(symbol);
                continue;
            }
            int close = ")]}".indexOf(symbol);
            if (close >= 0) {
                if (stack.isEmpty()) return false;
                if (stack.pop() != "([{".charAt(close)) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String[] inputs = {"a(b[c])", "([)]", "", ")"};
        for (String text : inputs) {
            System.out.println(balanced(text));
        }
    }
}
```

```text
true
false
true
false
```

Порожній рядок коректний, бо не містить незакритих дужок. Неправильний порядок `([)]` не можна виявити лише трьома лічильниками: потрібна інформація про вкладеність. Часова складність лінійна, додаткова пам’ять пропорційна глибині.

## Приклад 3. Кеш останніх документів

Порядок доступу відрізняється від порядку створення. Після читання A найдавніше нечитаним стає B, тож саме його потрібно витіснити. Місткість має бути додатною. Ключі та значення заборонено робити null, щоб відсутність ключа мала однозначний результат.

```java
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

public class Main {
    static final class Recent {
        private final int capacity;
        private final LinkedHashMap<String, String> data =
            new LinkedHashMap<>(16, 0.75f, true);

        Recent(int capacity) {
            if (capacity <= 0) {
                throw new IllegalArgumentException("capacity");
            }
            this.capacity = capacity;
        }

        void put(String key, String value) {
            Objects.requireNonNull(key);
            Objects.requireNonNull(value);
            data.put(key, value);
            if (data.size() > capacity) data.pollFirstEntry();
        }

        String get(String key) { return data.get(key); }

        Map<String, String> snapshot() {
            return new LinkedHashMap<>(data);
        }
    }

    public static void main(String[] args) {
        Recent recent = new Recent(2);
        recent.put("A", "alpha");
        recent.put("B", "beta");
        System.out.println(recent.get("A"));
        recent.put("C", "gamma");
        System.out.println(recent.snapshot());
        System.out.println(recent.get("B"));
        recent.put("A", "updated");
        System.out.println(recent.snapshot());
    }
}
```

```text
alpha
{A=alpha, C=gamma}
null
{C=gamma, A=updated}
```

Знімок повертає незалежний контейнер. Оскільки значення String незмінні, додаткове глибоке копіювання тут не потрібне. Перевірте місткість 1, оновлення без збільшення розміру, промах і зміну повернутого знімка. Для багатопотокового кешу цих гарантій недостатньо: складену операцію put–витіснення треба узгоджувати.
