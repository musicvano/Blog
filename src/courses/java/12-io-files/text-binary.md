---
title: "Text and binary data"
description: "Topic 12. Files, NIO.2, and serialization: Text and binary data"
outline: [2, 3]
sourceHash: "a16c58f284a69efa679666e215ecca266f65954dd2575e584567b4e14e72e902"
---

# Text and binary data

## Text formats and line validation

CSV is a family of practices, not just a split on commas. Fields can contain quotes, delimiters, and line breaks. The training example below has a restricted contract: exactly two fields, a comma between them, a Latin name without commas or line breaks, and a nonnegative integer count. Full CSV requires a dedicated parser or a proven library.

### Example 1. Reading and creating a report

The program creates its own input in a temporary directory, so it can be reproduced without manual preparation. The header is checked, and the number of an invalid line is included in the message. The total is accumulated with an overflow check.

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

Calling split with a negative limit keeps an empty last field: the line `Tea,` cannot accidentally be accepted as a record of a different shape. A precise format restriction keeps a simple parser honest. Skipping invalid lines instead of stopping is a different policy; in that case, the report must list the rejected lines and the reasons.

## Binary copying and numeric formats

Copying an arbitrary file must work with bytes. Decoding an image or an archive as text changes its content. `InputStream.transferTo` copies the rest of the stream to an OutputStream and returns the number of bytes, but it does not close the streams on behalf of their owner.

### Example 2. A copy with a controlled buffer

An explicit loop lets you count progress and ensures that only the bytes actually read are written. In the example, the data deliberately contains a zero and the byte 255, which should not be interpreted as text.

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

CREATE\_NEW does not overwrite an existing target file. After a failure, a partially created file may remain, so a production contract must define how it is cleaned up or safely completed. A direct copy to the same path is rejected before anything is written.

`DataOutputStream` and `DataInputStream` write and read primitive values in an agreed order. The reader must know the sequence of types: a record written as int, double cannot be read as double, int. A format benefits from a magic number, a version, a record count, and length limits. `readUTF` uses modified UTF-8 with its own length limit, not a general arbitrary UTF-8 file.

`RandomAccessFile` allows seeking to an offset. For fixed-length records, the position is computed as the header size plus the index multiplied by the record size. Variable-length text breaks this formula unless the format contains an index. Check for overflow and the offset range before seeking.
