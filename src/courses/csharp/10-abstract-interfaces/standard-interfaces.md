---
title: "Standard interfaces and choosing an approach"
description: "Topic 10. Abstract classes, interfaces: Standard interfaces and choosing an approach"
outline: [2, 3]
sourceHash: "80a0a4cffb4cd18966e11921a4ba25e862d402631603a0e06290de5ec0453de3"
---

# Standard interfaces and choosing an approach

## Standard .NET interfaces

The .NET library uses interfaces extensively. The most common ones:

- `IComparable<T>` defines the **natural order** of objects: the `CompareTo(T other)` method returns a negative number, 0, or a positive number. `Array.Sort(array)` uses it (<https://learn.microsoft.com/dotnet/api/system.icomparable-1>);
- `IComparer<T>` is a **separate comparer object** with a `Compare(T x, T y)` method; it lets you sort the same objects in different ways: `Array.Sort(array, new ByAge())`;
- `IEquatable<T>` provides a typed `Equals(T other)` method without boxing or casting; it is implemented together with overriding `Equals(object)` and `GetHashCode`;
- `ICloneable` provides a `Clone()` method; it is rarely used because it does not specify whether a deep or shallow copy is created;
- `IDisposable` provides a `Dispose()` method for releasing resources (files, connections); it works with the `using` statement;
- `IEnumerable<T>` makes iteration in `foreach` possible; covered in detail in Topic 13.

### `IDisposable` and `using`

The garbage collector frees memory but does not know when to close files, network connections, or other operating system resources. A class that owns such resources implements `IDisposable`, and the code that uses it calls `Dispose` in a `finally` block. The `using` statement does this automatically (<https://learn.microsoft.com/dotnet/standard/garbage-collection/implementing-dispose>):

```cs
using (var session = new DeviceSession("Scanner"))
{
    session.Send("SCAN");
}                                   // Dispose is called here

using var printer = new DeviceSession("Printer");
printer.Send("PRINT");              // Dispose – at the end of the block
```

The second form (a *using declaration*) calls `Dispose` at the end of the block in which the variable is declared. `Dispose` is called even if an exception occurs. The `Dispose` method must be safe to call repeatedly, and methods of an already disposed object throw `ObjectDisposedException`.

## Abstract class or interface

Table 10.1 compares them.

Table 10.1. Comparison of abstract classes and interfaces {.caption}

| **Feature** | **Abstract class** | **Interface** |
| --- | --- | --- |
| state (fields) | can have instance fields | has no instance fields |
| constructors | has them; called through `base(…)` | has none |
| multiplicity | only one base class | a class implements several interfaces |
| implementation | regular, virtual, and abstract members | only default and static members |
| access modifiers | any, including `protected` | members are usually public |
| relationship | “is a”: a common base for related classes | “can do”: a capability, a contract |
| typical use | shared code and state of a hierarchy, template method | loose coupling, multiple roles of an object, swapping implementations |

A practical rule: an **interface** describes what an object **can do** (`IComparable`, `IDisposable`, `ISwitchable`); an **abstract class** describes what related classes **are** and what code they share. The two are often combined: an interface defines the contract, and an abstract class provides a partial implementation.

### Programming to interfaces

If a method or class depends on an **interface** rather than a concrete class, the implementation can be replaced without changing the code that uses it. For example, a report method that accepts an `IReportFormatter` works the same way with a text, CSV, or Markdown formatter, and in tests (Topic 18) it can be checked with a simple test implementation. This **loose coupling** underlies the SOLID principles (Topic 17).
