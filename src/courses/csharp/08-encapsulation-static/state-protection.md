---
title: "Protecting state and readonly fields"
description: "Topic 8. Encapsulation, static members: Protecting state and readonly fields"
outline: [2, 3]
sourceHash: "94aa8d94c2869371ccbd58950396625518e017a48766db80318f97c1ee51a1d1"
---

# Protecting state and readonly fields

## Protecting object state

Hiding a field is not enough if the class **exposes** a reference to its internal mutable object. Common techniques for protecting state:

- **properties with restricted setters**: `{ get; private set; }` can change only inside the class; `{ get; init; }` is set only during creation; `{ get; }` only in the constructor;
- **command methods instead of setters**: instead of `account.Balance = 500`, a `Deposit(amount)` method that expresses a domain action and validates it;
- **defensive copies**: if a class stores an array, a property should not return the array itself, because external code could then change its elements, bypassing validation. The method returns a copy: `return operations[..count];`

```cs
var bad = new BadGroup();
bad.Grades[0] = -100;             // state changed, bypassing the class
Console.WriteLine(bad.Grades[0]); // -100

var good = new GoodGroup();
good.GetGrades()[0] = -100;       // only the copy changes
Console.WriteLine(good.GetGrades()[0]);  // 90

class BadGroup
{
    public int[] Grades { get; } = [90, 75, 82];
}

class GoodGroup
{
    private readonly int[] grades = [90, 75, 82];
    public int[] GetGrades() => (int[])grades.Clone();
}
```

The `{ get; }` property in `BadGroup` prevents assigning a **different** array but does not prevent changing the **elements** of the existing one: `readonly` protects the reference, not the object’s contents.

## `const`, `readonly`, and `static readonly` fields

- `const` is a **compile-time constant**: the compiler knows the value and substitutes it wherever it is used. Only simple types are allowed (`int`, `double`, `decimal`, `bool`, `char`, `string`). A constant is implicitly static and is accessed through the class name: `Validation.MaxAge`;
- `readonly` is an **instance** field that can be assigned only in its declaration or in a constructor; its value can differ between objects and can be calculated at run time;
- `static readonly` is a single value per class, calculated once at run time (in the declaration or a static constructor): the current startup date, a template object, a rate from settings (<https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/readonly>).

If a value is truly immutable by definition (the number of days in a week, π), use `const`. If it may change in future versions or has a type not allowed for `const` (for example, a class object), use `static readonly`.
