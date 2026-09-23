---
title: "Dynamic memory and its errors"
description: "Topic 5. Pointers and Memory: Dynamic Memory and Its Errors"
outline: [2, 3]
sourceHash: "88a4eaad25416c00317241e5beb6aa5aad37376f4f42f0b60a10bb1aa8213180"
---

# Dynamic memory and its errors

## Manual dynamic memory

`new int{5}` allocates memory and
creates an int with the value 5.
`delete p` destroys and releases
a single object created by the matching
new. An array `new int[n]{}`
requires `delete[] p`.
Mixing these pairs is not allowed,
even if the elements are simple.
`delete nullptr` is safe,
but a repeated delete of the
same non-null owned
resource is an error.

Plain new reports a
failed allocation with the exception
`std::bad_alloc`. The form
`new (std::nothrow)` from `<new>`
returns nullptr instead of
throwing that exception. It doesn’t
make subsequent work
safe automatically:
you must check the result
before writing. Modern
code prefers
containers and smart
pointers, which take
ownership immediately.

### Example 2. Growing an array manually

The program shows the mechanism
that a container hides.
First there is a buffer for
two values. The new
buffer is created before
the old one is released;
the data is copied, the old one
is released, and the owner’s
address is updated.

```cpp
#include <print>
#include <new>

int main()
{
    int* values = new (std::nothrow) int[2]{10, 20};
    if (!values) return 1;
    int* larger = new (std::nothrow) int[4]{};
    if (!larger)
    {
        delete[] values;
        return 1;
    }
    for (int i = 0; i < 2; ++i) larger[i] = values[i];
    delete[] values;
    values = larger;
    larger = nullptr;
    values[2] = 30;
    values[3] = 40;
    for (int i = 0; i < 4; ++i) std::print("{} ", values[i]);
    std::println();
    delete[] values;
    values = nullptr;
}
```

Output: `10 20 30 40`.
The check of the second allocation
must release the first buffer
on failure. This extra
branch illustrates the complexity of
manual ownership.
If later output throws an exception,
the manual cleanup
may not run;
a production solution should
use vector or
unique_ptr. The example
deliberately demonstrates the
mechanics, not a general-purpose
container.

A pointer to values[0] saved earlier
becomes dangling after delete,
even if the new buffer contains
the same number. Assigning
nullptr changes only one
variable, not all copies
of the address. That is why “I set
p to null after delete”
is not a complete solution to the
lifetime problem.

## Memory errors and diagnostics

A **leak** occurs
when a resource is still allocated,
but the program has lost
the means to release it
correctly. A **dangling
pointer** stores the address of
an object that has already
been destroyed. A **double
free** means
releasing the
same resource again.
All three situations
have different causes,
so a single check
for nullptr is not enough.

AddressSanitizer adds
memory access
checks and can detect
out-of-bounds access and use
after free. In
MSVC, you enable it with
`/fsanitize=address`.
For debug
information, use
`/Zi`, not `/ZI`.
The incompatible `/RTC`,
Edit and Continue and
incremental linking
must be turned off.
Documentation:
<https://learn.microsoft.com/cpp/sanitizers/asan>.

Read a sanitizer report
starting from the first invalid
access: the error type,
the line of the read or write,
the allocation site and
the release site.
Don’t change arbitrary
numbers in the code to make
the report disappear. You need to
fix the bound or the
ownership rule.
The absence of a report on
one run doesn’t
prove the absence of
all defects.

![Diagnosing use after free](./images/06-vs-asan-heap-use-after-free.png)

Figure 5.4. Diagnosing use after free {.caption}

The CRT Debug Heap in
the MSVC Debug configuration
can report
unreleased allocations
via `_CrtDumpMemoryLeaks()`
from `<crtdbg.h>`.
This is a feature of a specific
implementation, not a
standard C++ function.
Get the report
after the owners are destroyed;
otherwise a live, intended
object may be mistakenly
called a leak.

![CRT report of unreleased memory](./images/04-vs-memory-leaks-output.png)

Figure 5.5. CRT report of unreleased memory {.caption}
