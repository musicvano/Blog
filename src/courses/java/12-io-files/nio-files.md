---
title: "Files and NIO.2 directories"
description: "Topic 12. Files, NIO.2, and serialization: Files and NIO.2 directories"
outline: [2, 3]
sourceHash: "ecf6d2ed1934394bca7e8e214f1b5b11a18e3eb14c13785f8ef7f52a34178a95"
---

# Files and NIO.2 directories

## Files and the directory lifecycle

Files provides directory creation, copying, moving, deletion, size, time attributes, and type checks. `createDirectory` creates one level, and `createDirectories` creates the required chain. `delete` rejects a missing path, and `deleteIfExists` returns false when it is already gone. A nonempty directory is not deleted by a single delete.

Calling `exists` before `newInputStream` does not guarantee success: the situation can change between the two actions. It is often clearer to perform the required operation right away and handle its IOException. An existence check is useful for the user interface but does not replace handling the actual failure.

`Files.list` traverses one level, `walk` traverses a tree, and `find` combines traversal with a condition on attributes. All returned file streams must be closed. By default, walk does not follow symbolic links to directories; enabling FOLLOW\_LINKS requires analyzing cycles and the bounds of the allowed tree.

### Example 3. The largest files in a directory

The example creates two files and a nested directory. We read the metadata once into a helper record and then sort ordinary data. Symbolic links are not considered regular files in this report.

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

In a real tree, two files can have the same name; for a fully stable order, add the relative path. Metadata can also change between traversal and reading. A file system report is usually an observation over time, not a transactional snapshot.

A `PathMatcher` with a glob is convenient for a name pattern, but glob syntax differs from regular expressions. File system and separator rules also matter. For a simple contract such as "a .txt extension, case-insensitive," explicit analysis of the last component with Locale.ROOT is sometimes clearer.

## Reliable updates, configuration, and archives

To avoid corrupting the previous document if writing is interrupted, it is common to write the new content to a temporary file in the same directory, close it, check it, and only then move it to the target. ATOMIC\_MOVE is not supported by every provider or across different file systems. After an AtomicMoveNotSupportedException, the contract must either explicitly allow a non-atomic fallback strategy or report that the required guarantee cannot be provided.

`Properties` stores key–value configuration. For UTF-8, use load(Reader) and store(Writer,…); the byte-based overloads have historical ISO-8859-1 and escape rules. `getProperty(key, default)` supplies a fallback value, but numeric parsing and range checking remain the program's responsibility. Do not put passwords in a sample configuration or a report.

`WatchService` notifies about changes in a directory. Events may be merged or duplicated, and OVERFLOW means that some observations were lost and a rescan is needed. After processing a WatchKey, call reset and check its result. A training program must have a way to terminate or a bounded waiting time.

ZIP streams let you read and write a sequence of entries. When extracting, an entry name must not be turned into a target path without checking: `../` or an absolute path can escape the root. The normalized result must stay inside the designated directory; you also need a link policy and limits on the number of entries and the total extracted size.
