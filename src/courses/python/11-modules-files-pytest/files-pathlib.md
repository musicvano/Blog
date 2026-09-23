---
title: "Paths and text files"
description: "Topic 11. Modules, files, pytest: Paths and text files"
outline: [2, 3]
sourceHash: "4a80b2e107c7d52a12e5a64c124c04fe1b4ab8a75358aad11165c75f6d102c8b"
---

# Paths and text files

## Paths and pathlib file operations

`Path` is a path object; the `/` operator joins a component without manually choosing a Windows or Unix separator. `Path.cwd()` returns the process's working directory, and `Path.home()` returns the user's home directory. They do not necessarily match the program file's location. For a resource next to a module, you can use `Path(__file__).resolve().parent / "data.json"`.

A relative path is interpreted from the working directory. This is why a program may work in an IDE but fail to find a file in a terminal. Accept the path to a user file as a command argument. For a small test, pass a `Path` into the function; do not hide an absolute path from your own computer inside the function body.

`mkdir(parents=True, exist_ok=True)` creates a directory and its parents. `iterdir()` iterates over immediate children, `glob("*.csv")` over matching names, and `rglob("*.csv")` recursively. Do not assume traversal order is sorted: use `sorted` for a reproducible report. `stem` returns the name without its last suffix, `suffix` returns the suffix, and `stat().st_size` returns the file size in bytes.

`exists()` or `is_file()` does not guarantee that the next read will succeed: the state can change between operations. Handle `OSError` and its specific subclasses where you perform the action. `unlink()` deletes a file, so run such operations only in a separate test folder during labs. Documentation: <https://docs.python.org/3.14/library/pathlib.html>.

## Text files and encoding

`open` returns a file object. Mode `r` reads, `w` creates or truncates an existing file, `a` appends, and `x` creates a new file only. Adding `b` means binary data. Specify `encoding="utf-8"` for a text file; binary mode works with `bytes` and does not accept a text encoding. Use an open resource in `with`.

`read()` reads the entire file and is suitable for small datasets. A `for line in stream` loop processes a file line by line. A line may contain a trailing newline character, so use `strip` deliberately: it also removes leading and trailing spaces, which are sometimes part of the data. `Path` methods `read_text` and `write_text` are concise forms of reading and writing the entire contents.

```py
from pathlib import Path
from tempfile import TemporaryDirectory


with TemporaryDirectory() as folder:
    path = Path(folder) / "notes.txt"
    path.write_text("First\nSecond\n", encoding="utf-8")
    with path.open(encoding="utf-8") as stream:
        for number, line in enumerate(stream, 1):
            print(number, line.rstrip("\n"))
```

```
1 First
2 Second
```

The temporary directory here isolates the demonstration from real files. For persistent storage, use a path supplied by the user. `FileNotFoundError` means the file is absent, `PermissionError` means access is denied, and `IsADirectoryError` means an attempt to treat a directory as a file on platforms that report it this way. `UnicodeError` may indicate a different encoding. Do not replace all these causes with an empty list: otherwise, a corrupted file will look like an empty database.

`datetime` works with dates and time intervals, `os` with the process environment and system interfaces, and `shutil` with copying files and trees. Choose `pathlib` for paths and `shutil.copy2` for copying when available metadata is needed. No utility library removes the need to check exactly which directory will be changed.
