---
title: "Initializers, ToString, and conventions"
description: "Topic 7. Classes and objects: Initializers, ToString, and conventions"
outline: [2, 3]
sourceHash: "6fc0730d540b37b775210c9270501a6beca939a11730c73e5dd21f87c50fab56"
---

# Initializers, ToString, and conventions

## Object initializers

An **object initializer** sets accessible properties immediately after object creation, inside braces: `new Book { Title = "Kobzar", Year = 1840 }`. Execution order: first the constructor, then the initializer assignments in the order written. An initializer can be combined with a parameterized constructor: `new Time(8) { … }`. You can set `init` properties only in an initializer (or constructor), and the presence of `required` properties is checked only there.

## The `ToString` method and inspecting objects

Every object has a `ToString()` method: `Console.WriteLine(obj)` and interpolated strings call it. By default, it returns the full type name (`Book`), which provides little information. A class can supply its own version of the method with the `override` keyword (covered in detail in Topic 9):

```cs
var book = new Book { Title = "Kobzar", Year = 1840 };
Console.WriteLine(book);              // “Kobzar” (1840)

class Book
{
    public string Title { get; init; } = "";
    public int Year { get; init; }

    public override string ToString() => $"“{Title}” ({Year})";
}
```

The debugger also uses `ToString` for a short object description. In the *Locals* window, an object expands into a list of properties and fields (Fig. 7.9). Automatically generated backing fields have names such as `<Title>k__BackingField`; the normal *Locals* view may hide them.

![Object state in the Locals window](./images/05-vs-locals-object.png)

Figure 7.9. Object state in the *Locals* window {.caption}

## Object lifetime

An object lives on the managed heap as long as at least one reference to it remains in variables, fields of other objects, or array elements. When no references remain, the object becomes unreachable, and the **garbage collector** will eventually free its memory. This is why C#, unlike C++, has no `delete` operator: the programmer does not free memory manually, and errors such as accessing an already freed object are impossible. The exact time when garbage collection occurs is not known in advance; resources such as open files are released explicitly (Topic 16).

## Naming conventions

- Classes, properties, methods, and public members use PascalCase: `BankAccount`, `TotalMinutes`, `Deposit`; a class name is a noun, and a method name is a verb.
- Private fields use camelCase: `balance`, often with an underscore prefix: `_balance`. Use one consistent style within a project.
- Parameters and local variables use camelCase.
- One public class per file, with the same name as the class.
