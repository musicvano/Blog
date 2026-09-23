---
title: "Текстові та двійкові дані"
description: "Тема 12. Файли, NIO.2, серіалізація: Текстові та двійкові дані"
outline: [2, 3]
---

# Текстові та двійкові дані

## Текстовий формат і валідація рядків

CSV – сімейство практик, а не просто split за комою. Поля можуть містити лапки, роздільники й переноси рядків. Навчальний приклад нижче має обмежений контракт: рівно два поля, кома між ними, латинська назва без коми й переносу, ціла невід’ємна кількість. Повний CSV вимагає спеціального парсера або перевіреної бібліотеки.

### Приклад 1. Читання та створення звіту

Програма сама створює вхід у тимчасовому каталозі, тому її можна відтворити без ручної підготовки. Заголовок перевіряється, номер неправильного рядка входить у повідомлення. Загальна кількість додається з перевіркою переповнення.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class Main {
    record Item(String name, int count) {}

    static List<Item> read(Path path) throws IOException {
        List<Item> items = new ArrayList<>();
        try (BufferedReader reader = Files.newBufferedReader(
                path, StandardCharsets.UTF_8)) {
            if (!"name,count".equals(reader.readLine())) {
                throw new IOException("invalid header");
            }
            String line;
            int number = 1;
            while ((line = reader.readLine()) != null) {
                number++;
                String[] fields = line.split(",", -1);
                try {
                    if (fields.length != 2
                            || !fields[0].matches("[A-Za-z]+")) {
                        throw new IllegalArgumentException();
                    }
                    int count = Integer.parseInt(fields[1]);
                    if (count < 0) {
                        throw new IllegalArgumentException();
                    }
                    items.add(new Item(fields[0], count));
                } catch (IllegalArgumentException error) {
                    throw new IOException(
                        "invalid row " + number, error);
                }
            }
        }
        return items;
    }

    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("java12-csv-");
        Path input = dir.resolve("input.csv");
        Path output = dir.resolve("report.txt");
        try {
            Files.writeString(input, "name,count\nTea,3\nBread,2\n",
                StandardCharsets.UTF_8);
            int total = 0;
            for (Item item : read(input)) {
                total = Math.addExact(total, item.count());
            }
            Files.writeString(output, "total: " + total + "\n",
                StandardCharsets.UTF_8);
            System.out.print(Files.readString(output));
        } finally {
            Files.deleteIfExists(output);
            Files.deleteIfExists(input);
            Files.deleteIfExists(dir);
        }
    }
}
```

```text
total: 5
```

Виклик split з від’ємним limit зберігає порожнє останнє поле: рядок `Tea,` не можна випадково прийняти за запис іншої форми. Точне обмеження формату робить простий парсер чесним. Пропуск неправильних рядків замість зупинки є іншою політикою; тоді звіт повинен містити відхилені рядки й причини.

## Бінарне копіювання та числові формати

Копіювання довільного файла має працювати з байтами. Декодування зображення чи архіву як тексту змінює зміст. `InputStream.transferTo` копіює решту потоку до OutputStream і повертає кількість байтів, але не закриває потоки замість їхнього власника.

### Приклад 2. Копія з контрольованим буфером

Явний цикл дозволяє рахувати прогрес і перевіряє запис лише фактично прочитаних байтів. У прикладі дані навмисно містять нуль і байт 255, які не слід інтерпретувати як текст.

```java
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class Main {
    static long copy(Path source, Path target) throws IOException {
        long total = 0;
        try (InputStream input = Files.newInputStream(source);
             OutputStream output = Files.newOutputStream(target,
                 StandardOpenOption.CREATE_NEW,
                 StandardOpenOption.WRITE)) {
            byte[] buffer = new byte[8192];
            int count;
            while ((count = input.read(buffer)) != -1) {
                output.write(buffer, 0, count);
                total += count;
            }
        }
        return total;
    }

    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("java12-copy-");
        Path source = dir.resolve("source.bin");
        Path target = dir.resolve("target.bin");
        try {
            Files.write(source, new byte[]{0, 1, 2, (byte) 255});
            System.out.println("bytes: " + copy(source, target));
            System.out.println("equal: " + (Files.mismatch(source,
                target) == -1));
        } finally {
            Files.deleteIfExists(target);
            Files.deleteIfExists(source);
            Files.deleteIfExists(dir);
        }
    }
}
```

```text
bytes: 4
equal: true
```

CREATE\_NEW не перезаписує наявний цільовий файл. Після збою частково створений файл може залишитися, тому виробничий контракт повинен визначити його очищення або безпечне завершення. Пряме копіювання в той самий шлях відхиляється ще до запису.

`DataOutputStream` і `DataInputStream` записують та читають примітивні значення в узгодженому порядку. Читач повинен знати послідовність типів: запис int, double не можна читати як double, int. Для формату корисні magic-число, версія, кількість записів і обмеження довжини. `readUTF` використовує modified UTF-8 з власним обмеженням довжини, а не загальний довільний UTF-8 файл.

`RandomAccessFile` дозволяє seek до зміщення. Для записів фіксованої довжини позицію обчислюють як розмір заголовка плюс індекс, помножений на розмір запису. Змінна довжина тексту руйнує таку формулу, якщо формат не містить індексу. Перевіряйте переповнення й діапазон зміщення до переходу.
