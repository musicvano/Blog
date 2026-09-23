---
title: "Практика"
description: "Тема 12. Файли, NIO.2, серіалізація: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Нумерація рядків UTF-8

Нумерація зберігає порожні рядки й не вимагає завершального переносу у вході. PrintWriter перевіряється після flush: його зручність не повинна приховати помилку запису. Усі дані створюються в окремому тимчасовому каталозі.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    static void number(Path source, Path target) throws IOException {
        try (BufferedReader input = Files.newBufferedReader(source,
                StandardCharsets.UTF_8);
             PrintWriter output = new PrintWriter(
                Files.newBufferedWriter(target,
                    StandardCharsets.UTF_8))) {
            String line;
            int index = 1;
            while ((line = input.readLine()) != null) {
                output.println(index++ + ": " + line);
            }
            output.flush();
            if (output.checkError()) {
                throw new IOException("write failed");
            }
        }
    }

    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("java12-lines-");
        Path source = dir.resolve("source.txt");
        Path target = dir.resolve("numbered.txt");
        try {
            Files.writeString(source, "Привіт\n\nСвіт",
                StandardCharsets.UTF_8);
            number(source, target);
            System.out.print(Files.readString(target,
                StandardCharsets.UTF_8));
        } finally {
            Files.deleteIfExists(target);
            Files.deleteIfExists(source);
            Files.deleteIfExists(dir);
        }
    }
}
```

```text
1: Привіт
2: 
3: Світ
```

Не запускайте метод із тим самим джерелом і ціллю: відкриття Writer може обрізати файл до початку читання. Консольна оболонка має відхилити такий випадок, а для наявних файлів порівняти Files.isSameFile, врахувавши також різні посилання на той самий файл. У прикладі джерело й ціль гарантовано створені як різні шляхи.

## Приклад 2. Бінарний ряд температур

Формат містить magic, кількість і double-значення. Кількість обмежено перед виділенням масиву; кожне значення має бути скінченним. Зайві байти після очікуваного кінця теж є помилкою, щоб пошкоджений файл не приймався частково.

```java
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;

public class Main {
    static final int MAGIC = 0x54454D50;

    static void write(Path path, double[] values) throws IOException {
        if (values.length > 10_000) {
            throw new IllegalArgumentException("too many values");
        }
        for (double value : values) {
            if (!Double.isFinite(value)) {
                throw new IllegalArgumentException("not finite");
            }
        }
        try (DataOutputStream output = new DataOutputStream(
                Files.newOutputStream(path))) {
            output.writeInt(MAGIC);
            output.writeInt(values.length);
            for (double value : values) output.writeDouble(value);
        }
    }

    static double[] read(Path path) throws IOException {
        try (DataInputStream input = new DataInputStream(
                Files.newInputStream(path))) {
            if (input.readInt() != MAGIC) {
                throw new IOException("invalid magic");
            }
            int count = input.readInt();
            if (count < 0 || count > 10_000) {
                throw new IOException("invalid count");
            }
            double[] result = new double[count];
            for (int i = 0; i < count; i++) {
                result[i] = input.readDouble();
                if (!Double.isFinite(result[i])) {
                    throw new IOException("not finite");
                }
            }
            if (input.read() != -1) {
                throw new IOException("trailing data");
            }
            return result;
        }
    }

    public static void main(String[] args) throws IOException {
        Path path = Files.createTempFile("java12-values-", ".bin");
        try {
            write(path, new double[]{-2.5, 0.0, 18.25});
            System.out.println(Arrays.toString(read(path)));
            write(path, new double[0]);
            System.out.println(Arrays.toString(read(path)));
            Files.write(path, new byte[]{1, 2});
            try {
                read(path);
            } catch (IOException error) {
                System.out.println("truncated file rejected");
            }
        } finally {
            Files.deleteIfExists(path);
        }
    }
}
```

```text
[-2.5, 0.0, 18.25]
[]
truncated file rejected
```

Порожній набір має коректний заголовок із кількістю нуль; це не те саме, що порожній файл. Окремо перевірте неправильний magic, від’ємну кількість, обрив усередині double та зайвий байт. У майбутній версії додайте номер версії формату перед зміною полів.

## Приклад 3. Конфігурація Properties

Значення за замовчуванням застосовується лише до відсутнього ключа. Наявне неправильне значення не замінюємо мовчки: користувач повинен дізнатися про помилку конфігурації.

```java
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

public class Main {
    record Config(String title, int limit) {}

    static Config load(Path path) throws IOException {
        Properties values = new Properties();
        try (Reader reader = Files.newBufferedReader(path,
                StandardCharsets.UTF_8)) {
            values.load(reader);
        }
        String title = values.getProperty("title", "Report").strip();
        int limit;
        try {
            limit = Integer.parseInt(
                values.getProperty("limit", "20"));
        } catch (NumberFormatException error) {
            throw new IOException("limit is not an integer", error);
        }
        if (title.isEmpty() || limit < 1 || limit > 1000) {
            throw new IOException("invalid configuration");
        }
        return new Config(title, limit);
    }

    public static void main(String[] args) throws IOException {
        Path path = Files.createTempFile(
            "java12-config-", ".properties");
        try {
            Properties values = new Properties();
            values.setProperty("title", "Звіт");
            try (Writer writer = Files.newBufferedWriter(path,
                    StandardCharsets.UTF_8)) {
                values.store(writer, "demo");
            }
            Config config = load(path);
            System.out.println(config.title()
                + ": " + config.limit());
            Files.writeString(path, "limit=0\n",
                StandardCharsets.UTF_8);
            try {
                load(path);
            } catch (IOException error) {
                System.out.println(error.getMessage());
            }
        } finally {
            Files.deleteIfExists(path);
        }
    }
}
```

```text
Звіт: 20
invalid configuration
```

store додає службовий коментар із часом, тому тест не повинен порівнювати весь файл побайтово з фіксованим рядком. Перевіряйте семантичні властивості після повторного load. Порядок ключів Properties також не є контрактом звіту.
