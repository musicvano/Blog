---
title: "Утилітні класи та якість коду"
description: "Тема 5. Класи та об’єкти: Утилітні класи та якість коду"
outline: [2, 3]
---

# Утилітні класи та якість коду

## Утилітний клас і статичний імпорт

Клас із суто статичними операціями не потребує екземпляра. Приватний конструктор не дозволяє випадковий new. Такий клас не повинен накопичувати прихований змінний стан, якщо його методи описують чисті перетворення значень. Static import робить ім’я методу коротшим, але може погіршити читання при великій кількості однойменних функцій.

### Приклад 4. Утиліта температур

Файл Temperatures.java в пакеті ua.edu.study.util.

```java
package ua.edu.study.util;

public final class Temperatures {
    private Temperatures() { }

    /**
     * Converts a finite Celsius temperature to Fahrenheit.
     * @param celsius temperature, not below absolute zero
     * @return temperature in Fahrenheit
     * @throws IllegalArgumentException for invalid input
     */
    public static double toFahrenheit(double celsius) {
        if (!Double.isFinite(celsius) || celsius < -273.15
                || celsius > 1_000_000) {
            throw new IllegalArgumentException("Invalid temperature");
        }
        return celsius * 9 / 5 + 32;
    }
}
```

Файл Main.java в пакеті ua.edu.study.app.

```java
package ua.edu.study.app;

import static ua.edu.study.util.Temperatures.toFahrenheit;

public class Main {
    public static void main(String[] args) {
        System.out.println(toFahrenheit(0));
        System.out.println(toFahrenheit(25));
        try {
            toFahrenheit(Double.NaN);
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
32.0
77.0
Invalid temperature
```

Стабільний import module, фіналізований у JDK 25, дозволяє імпортувати доступні типи, експортовані модулем. Це не замінює залежності, module-info чи classpath. У цій темі використовуємо явні імпорти типів, щоб походження кожного імені було очевидним; модулі розглядаються окремо.

## Javadoc, IDE та контроль якості

Коментар документації починається `/**`. Param описує значення аргументу, return – результат, throws – умови відмови. Пишіть контракт і одиниці, а не повторюйте ім’я методу іншими словами. Javadoc корисний саме клієнту, який не повинен читати тіло реалізації.

Згенерувати документацію можна командою javadoc із -encoding UTF-8 та -d docs або через відповідну дію IDE. У IntelliJ IDEA шукайте *Tools → Generate JavaDoc…*; доступність дії залежить від конфігурації проєкту. <https://docs.oracle.com/en/java/javase/27/docs/specs/man/javadoc.html>.

::: info Знімок екрана
Generate Javadoc for Temperatures; open its HTML page and show parameter, return and exception contract.
:::

Рис. 5.7. Документація відкритого методу {.caption}

Меню *Generate* (**Alt+Insert**) допомагає створити конструктор, getter або toString, але не знає інваріантів. Перевірте згенерований код, особливо setter і поля в toString. *Rename* (**Shift+F6**) змінює пов’язані використання, а перенесення класу між пакетами потребує оновлення package та import. Користуйтеся рефакторингом, а не випадковою глобальною заміною рядка.

::: info Знімок екрана
Project &gt; src &gt; New &gt; Package, ua.edu.study.model; show model/app directories with compact middle packages disabled.
:::

Рис. 5.8. Організація моделі та точки входу {.caption}

::: info Знімок екрана
Alt+Insert in BankAccount; show Constructor, Getter and toString actions, avoiding a public balance setter.
:::

Рис. 5.9. Генерування членів класу {.caption}

Таблиця перевірок повинна включати звичайний стан, обидві межі, неправильне значення, успішну дію та відмову без часткової зміни. Окремо перевірте два незалежні об’єкти й два посилання на один об’єкт. Для масивів перевірте захист як вхідної, так і вихідної межі володіння.
