---
title: "Practice"
description: "Topic 12. Files, NIO.2, and serialization: worked examples"
outline: [2, 3]
sourceHash: "9de84d84b89a338b5eb00838564985e84c145647274fac67d3c1a8a1744871c6"
---

# Practice

## Example 1. Numbering UTF-8 lines

Numbering preserves empty lines and does not require a final line break in the input. The PrintWriter is checked after flush: its convenience must not hide a write error. All data is created in a separate temporary directory.

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
            Files.writeString(source, "Café\n\nNaïve",
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
1: Café
2: 
3: Naïve
```

Do not run the method with the same source and target: opening the Writer can truncate the file before reading begins. The console wrapper must reject this case, and for existing files it should compare them with Files.isSameFile, also taking into account different links to the same file. In the example, the source and target are guaranteed to be created as different paths.

## Example 2. A binary temperature series

The format contains a magic number, a count, and double values. The count is limited before the array is allocated; every value must be finite. Extra bytes after the expected end are also an error, so that a corrupted file is not partially accepted.

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

An empty set has a valid header with a count of zero; this is not the same as an empty file. Separately test an invalid magic number, a negative count, truncation in the middle of a double, and an extra byte. In a future version, add a format version number before changing the fields.

## Example 3. Properties configuration

The default value applies only to a missing key. We do not silently replace an existing invalid value: the user must find out about the configuration error.

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
            values.setProperty("title", "Café menu");
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
Café menu: 20
invalid configuration
```

store adds a service comment with a timestamp, so a test must not compare the whole file byte by byte with a fixed string. Check semantic properties after reloading with load. The order of Properties keys is not part of the report contract either.
