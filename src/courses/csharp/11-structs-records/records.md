---
title: "Records"
description: "Topic 11. Structures, records, tuples: Records"
outline: [2, 3]
sourceHash: "38060e6e74b03ee2fe6ead9be55fd6c93767b92d8ca7ef86e6f87b33e6d74e8d"
---

# Records

## Records

A **record** is a type intended primarily for storing data. The compiler automatically generates value equality, `GetHashCode`, `ToString`, a copy method, and deconstruction for it. The shortest, **positional** form of the declaration is:

```cs
record Book(string Title, string Author, int Year);
```

For each parameter, a read-only property with an `init` accessor is created, along with a primary constructor and a `Deconstruct` method. The `record` declaration is equivalent to `record class`: a record is a reference type. Compared with a class:

- **value equality**: `==` and `Equals` compare the values of all properties and the record type, not references (in Topic 9, you had to override `Equals` and `GetHashCode` manually for this);
- `ToString` prints the type name and property values: `Book { Title = Kobzar, … }`;
- the properties of a positional record are immutable: `book.Year = 2025` causes error CS8852.

A record can have a body with additional properties, methods, and parameter validation. Fig. 11.3 shows how a record looks in the debugger.

![Automatic ToString of a record in the debugger](./images/01-vs-record-datatip.png)

Figure 11.3. Automatic `ToString` of a record in the debugger {.caption}

### `with` expressions, deconstruction, inheritance

An immutable record is not changed; instead, a modified copy is created with a `with` **expression**: all properties are copied, and those listed in the braces get new values. **Deconstruction** breaks a record into variables in the order of the positional parameters; unneeded values are discarded with the `_` symbol:

```cs
Book book = new("Kobzar", "Taras Shevchenko", 1840);
Book reprint = book with { Year = 2024 };
var (title, _, year) = reprint;     // "Kobzar", 2024
```

A record can inherit **only from another record**. A derived record passes parameters to the base one, and equality also checks the type: a `Book` and an `EBook` with the same title, author, and year are not equal. `with` expressions also work for structures and anonymous types.

A positional record shortens a data declaration compared with a class with a primary constructor and properties (Fig. 11.4); in addition, it gets value equality and the other generated record members.

![A class with properties and a positional record](./images/02-vs-convert-to-record.png)

Figure 11.4. A class with properties and a positional record {.caption}

### `record struct` and choosing a type

The `record struct` declaration creates a **record structure**: a value type with generated `Equals`, `==`, `GetHashCode`, `ToString`, and deconstruction. Unlike `record class`, the properties of a positional `record struct` are **mutable** (`get; set;`). An immutable record structure is declared as `readonly record struct`:

```cs
record struct Size(int Width, int Height);          // mutable
readonly record struct Point(double X, double Y);  // immutable
```

Table 11.1 summarizes the options.

Table 11.1. Comparison of classes, structures, and records {.caption}

| **Feature** | `class` | `struct` | `record` | `record` `struct` |
| --- | --- | --- | --- | --- |
| kind of type | reference | value | reference | value |
| equality | of references | of fields | of values | of values |
| `==` generated | no | no | yes | yes |
| `ToString` with data | no | no | yes | yes |
| positional properties immutable | – | – | yes | with `readonly` |
| `with` expression | no | yes | yes | yes |
| inheritance | yes | no | from records | no |

Practical recommendations: entities with behavior and identity (an account, a user) are classes; immutable data compared by value (a book in a catalog, a message, a calculation result) are records; small values (a point, an amount of money, a color) are `readonly struct` or `readonly record struct`.
