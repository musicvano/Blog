---
title: "Розгалуження: if і switch"
description: "Тема 2. Типи, операції, керування: Розгалуження: if і switch"
outline: [2, 3]
---

# Розгалуження: if і switch

## if і switch-вираз

`if` обирає гілку за логічною умовою. Використовуйте фігурні дужки навіть для короткого тіла, коли це зменшує ризик помилки під час додавання інструкції. Вкладений `else` належить найближчому незавершеному `if`.

Сучасний `switch` може бути виразом. Гілка зі стрілкою не провалюється в наступну. Для блоку, який має повернути значення switch-виразу, використовують `yield`. Повнота гілок важлива: компілятор має знати значення для кожного випадку.

```java
public class Delivery {
    public static void main(String[] args) {
        int zone = 2;
        int price = switch (zone) {
            case 1 -> 40;
            case 2, 3 -> 60;
            default -> {
                System.out.println("Віддалена зона");
                yield 100;
            }
        };
        System.out.println("Доставка: " + price);
    }
}
```

Результат – `Доставка: 60`. Старий switch із двокрапкою і `break` залишається частиною мови, тому його потрібно вміти читати. Для нових простих виборів стрілки зменшують ризик випадкового переходу між гілками. Опис switch-виразів: <https://openjdk.org/jeps/361>.

Типи та зразки у `switch` розглядатимуться в темі 8. Не переносіть preview-приклад із `double` у селекторі до базової програми без перевірки статусу можливості. Основні приклади цього курсу не потребують preview.

### Приклад 2. Калькулятор із меню

Контракт: операція `+`, `-`, `*`, `/` або `exit`, після операції два скінченні числа з крапкою. Неправильний набір не змінює лічильник успіхів.

```java
import java.util.Locale;
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in, "UTF-8");
        in.useLocale(Locale.US);
        int completed = 0;
        while (in.hasNext()) {
            String operation = in.next();
            if (operation.equals("exit")) break;
            if (!operation.matches("[+*/-]")) {
                System.out.println("Невідома операція");
                if (in.hasNextLine()) in.nextLine();
                continue;
            }
            if (!in.hasNextDouble()) {
                System.out.println("Потрібне перше число");
                if (in.hasNextLine()) in.nextLine();
                continue;
            }
            double a = in.nextDouble();
            if (!in.hasNextDouble()) {
                System.out.println("Потрібне друге число");
                if (in.hasNextLine()) in.nextLine();
                continue;
            }
            double b = in.nextDouble();
            if (!Double.isFinite(a) || !Double.isFinite(b)
                    || (operation.equals("/") && b == 0)) {
                System.out.println("Неприпустимі операнди");
                continue;
            }

            double result = switch (operation) {
                case "+" -> a + b;
                case "-" -> a - b;
                case "*" -> a * b;
                default -> a / b;
            };
            if (!Double.isFinite(result)) {
                System.out.println("Нескінченний результат");
                continue;
            }
            completed++;
            System.out.printf(Locale.US, "%.3f%n", result);
        }
        System.out.println("Успішно: " + completed);
    }
}
```

Для рядків `+ 2 3`, `/ 4 0`, `exit` результат – `5.000`, повідомлення про операнди, `Успішно: 1`. Регулярний вираз у перевірці операції поки слід читати як перелік допустимих одиночних знаків; загальний розбір регулярних виразів належить наступній темі.
