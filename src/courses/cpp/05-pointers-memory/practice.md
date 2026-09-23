---
title: Practice
description: "Topic 5. Pointers and Memory: worked examples"
outline: [2, 3]
sourceHash: "a454a01fe2822592f4e659a32508db52a4096d28e34a3198c006acf9c117ef7d"
---

# Practice

Each example is a separate complete program: first the problem, then the code and the explanation, followed by the output.

## Example 1. Length and copying of a C string

The length function takes a valid null-terminated string.
The copy function additionally takes the destination capacity.
If there isn’t enough space, it changes nothing and returns false.
The buffers must not overlap.

```cpp
#include <cstddef>
#include <print>

std::size_t length(const char* text)
{
    const char* end = text;
    while (*end != '\0') ++end;
    return static_cast<std::size_t>(end - text);
}

bool copy(char* destination, std::size_t capacity,
    const char* source)
{
    const auto size = length(source);
    if (size >= capacity) return false;
    for (std::size_t i = 0; i <= size; ++i)
        destination[i] = source[i];
    return true;
}

int main()
{
    char buffer[6]{};
    std::println("Copied: {}", copy(buffer, 6, "Hello"));
    std::println("{}; length={}", buffer, length(buffer));
    std::println("Too small: {}", copy(buffer, 3, "World"));
    std::println("Unchanged: {}", buffer);
}
```

```text
Copied: true
Hello; length=5
Too small: false
Unchanged: Hello
```

Six cells are needed for five letters and the null.
The condition `size >= capacity` leaves room for the terminator.
The element with index size is copied too.
These functions cannot check whether an arbitrary
address is accessible: the validity of the source is a precondition guaranteed by the caller.

## Example 2. A directory tree

A parent node owns its children via unique_ptr.
The back link parent is a raw non-owning pointer:
the parent lives longer than its children. A weak_ptr is not
needed here, because there is no shared owner at all.

```cpp
#include <memory>
#include <vector>
#include <string>
#include <print>
#include <utility>

struct Directory
{
    std::string name;
    Directory* parent{};
    std::vector<std::unique_ptr<Directory>> children;
};

Directory& add(Directory& parent, std::string name)
{
    auto child = std::make_unique<Directory>();
    child->name = std::move(name);
    child->parent = &parent;
    parent.children.push_back(std::move(child));
    return *parent.children.back();
}

int main()
{
    Directory root{"root", nullptr, {}};
    auto& docs = add(root, "docs");
    auto& images = add(docs, "images");
    std::println("{} -> {} -> {}", root.name,
        docs.name, images.name);
    std::println("Parent: {}", images.parent->name);
}
```

The output is `root -> docs -> images` and `Parent: docs`.
Reallocation of the vector moves the unique_ptr objects, but not
the dynamic Directory objects themselves, so references to the nodes
remain valid while their owners exist.
Removing a node, in contrast, invalidates references to it
and its subtree.

## Example 3. Finding memory errors

The working program below is a safe baseline for comparison.
In copies of the project, introduce one deliberate defect each:
change the loop condition to `i <= 3`; save get(),
call reset() and read the old address; for a separate
raw `new int[3]`, mistakenly apply `delete`.
Run these defective copies only under AddressSanitizer.
Don’t add all the defects at once: the first failure will hide the rest.

```cpp
#include <memory>
#include <print>

int main()
{
    auto values = std::make_unique<int[]>(3);
    for (int i = 0; i < 3; ++i) values[i] = i + 1;
    int total{};
    for (int i = 0; i < 3; ++i) total += values[i];
    std::println("Total: {}", total);
    values.reset();
    std::println("Empty: {}", values == nullptr);
}
```

The correct program prints `Total: 6` and `Empty: true`.
Build a copy with `/fsanitize=address /Zi` and
`/link /INCREMENTAL:NO`, without `/RTC` and `/ZI`.
On Windows, the allocation/deallocation mismatch check
`alloc_dealloc_mismatch` is disabled by default. For the separate
copy with `new[]` and the mistaken `delete`, before running it
enable the check in the current Developer PowerShell:

```powershell
$env:ASAN_OPTIONS = 'alloc_dealloc_mismatch=1'
.\main.exe
```

The executable name must match your build.
The official description:
<https://learn.microsoft.com/cpp/sanitizers/error-alloc-dealloc-mismatch>.

For each defect, write down the message type, the line of
the first invalid access and the corrected rule.
It isn’t enough to hide the message or skip
the problematic branch: the fixed program must pass the same test.
