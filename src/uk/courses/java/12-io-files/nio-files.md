---
title: "Files і каталоги NIO.2"
description: "Тема 12. Файли, NIO.2, серіалізація: Files і каталоги NIO.2"
outline: [2, 3]
---

# Files і каталоги NIO.2

## Files і життєвий цикл каталогу

Files надає створення каталогів, копіювання, переміщення, видалення, розмір, часові атрибути й перевірки типу. `createDirectory` створює один рівень, `createDirectories` – потрібний ланцюг. `delete` відхиляє відсутній шлях, `deleteIfExists` повертає false, коли його вже немає. Непорожній каталог не видаляється одним delete.

`exists` перед `newInputStream` не гарантує успіху: між діями ситуація може змінитися. Часто ясніше відразу виконати потрібну операцію й обробити її IOException. Перевірка існування корисна для інтерфейсу, але не замінює обробку фактичної відмови.

`Files.list` обходить один рівень, `walk` – дерево, `find` поєднує обхід з умовою над атрибутами. Усі повернені файлові потоки потрібно закривати. За замовчуванням walk не переходить через символічні посилання на каталоги; вмикання FOLLOW\_LINKS потребує аналізу циклів і меж дозволеного дерева.

### Приклад 3. Найбільші файли каталогу

Приклад створює два файли та вкладений каталог. Метадані читаємо один раз у допоміжний record, після чого сортуємо звичайні дані. Символічні посилання не вважаються звичайними файлами цього звіту.

```java
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

public class Main {
    record Info(Path path, long size) {}

    static Info info(Path path) {
        try {
            return new Info(path, Files.size(path));
        } catch (IOException error) {
            throw new UncheckedIOException(error);
        }
    }

    public static void main(String[] args) throws IOException {
        Path root = Files.createTempDirectory("java12-walk-");
        Path nested = Files.createDirectory(root.resolve("nested"));
        Path a = root.resolve("a.bin");
        Path b = nested.resolve("b.bin");
        try {
            Files.write(a, new byte[3]);
            Files.write(b, new byte[7]);
            List<Info> result;
            try (Stream<Path> paths = Files.walk(root)) {
                result = paths.filter(p -> Files.isRegularFile(p,
                        LinkOption.NOFOLLOW_LINKS))
                    .map(Main::info)
                    .sorted(Comparator.comparingLong(Info::size)
                        .reversed().thenComparing(i ->
                            i.path().getFileName().toString()))
                    .toList();
            }
            for (Info item : result) {
                System.out.println(item.path().getFileName()
                    + ": " + item.size());
            }
        } finally {
            Files.deleteIfExists(b);
            Files.deleteIfExists(a);
            Files.deleteIfExists(nested);
            Files.deleteIfExists(root);
        }
    }
}
```

```text
b.bin: 7
a.bin: 3
```

У реальному дереві два файли можуть мати однакове ім’я; для повного стабільного порядку додають відносний шлях. Метадані також можуть змінитися між обходом і читанням. Звіт файлової системи зазвичай є спостереженням у часі, а не транзакційним знімком.

`PathMatcher` з glob зручний для шаблону імен, але синтаксис glob відрізняється від регулярного виразу. Правила файлової системи й роздільників також важливі. Для простого контракту «розширення .txt без урахування регістру» іноді ясніший явний аналіз останнього компонента з Locale.ROOT.

## Надійне оновлення, конфігурація та архіви

Щоб не зіпсувати попередній документ при обриві запису, часто пишуть новий вміст у тимчасовий файл у тому самому каталозі, закривають його, перевіряють і лише тоді переміщують до цілі. ATOMIC\_MOVE підтримується не кожним провайдером чи між різними файловими системами. Після AtomicMoveNotSupportedException контракт має явно дозволити запасну неатомарну стратегію або повідомити, що необхідну гарантію забезпечити неможливо.

`Properties` зберігає конфігурацію ключ–значення. Для UTF-8 використовують load(Reader) і store(Writer,…); байтові перевантаження мають історичні правила ISO-8859-1 та escape. `getProperty(key, default)` задає запасне значення, але числовий розбір і перевірка діапазону залишаються відповідальністю програми. Не записуйте паролі в приклад конфігурації чи звіт.

`WatchService` сповіщає про зміни каталогу. Події можуть об’єднуватися, дублюватися, а OVERFLOW означає втрату частини спостережень і потребу повторного сканування. Після обробки WatchKey викликають reset і перевіряють його результат. Навчальна програма повинна мати спосіб завершення або обмежений час очікування.

ZIP-потоки дозволяють читати й записувати послідовність entry. При розпакуванні ім’я entry не можна без перевірки перетворювати на цільовий шлях: `../` або абсолютний шлях можуть вийти за корінь. Нормалізований результат має залишатися всередині виділеного каталогу; також потрібні політика посилань і ліміти кількості записів та сумарного розпакованого розміру.
