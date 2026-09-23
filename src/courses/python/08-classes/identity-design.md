---
title: "Identity and class design"
description: "Topic 8. Classes and objects: identity and class design"
outline: [2, 3]
sourceHash: "356fe7d11b19697b7985e795ce0dcea7847492bb1c5efb0b67b6c178dba41d8c"
---

# Identity and class design

## Identity, equality, and the lifecycle

By default, two separately created instances of an ordinary class do not become equal merely because their fields match. `is` checks identity, while the meaning of `==` can be defined with a special method in Topic 10. Assignment `other = obj` does not copy the object: both names reference the same state.

```py
class Label:
    def __init__(self, text: str) -> None:
        self.text = text


a = Label("A")
b = Label("A")
c = a
print(a == b, a is b, a is c)
c.text = "B"
print(a.text, b.text)
```

```
False False True
B A
```

`del a` removes a name binding; it does not order immediate destruction of an object that still has references. Garbage collection frees unreachable objects, but finalization timing is not a universal language guarantee. Do not use `__del__` as the primary way to close a file or commit an operation. Resources need explicit management, including a `with` context manager.

## Design and working in PyCharm

Start with the class's responsibility: what entity it represents, which states are valid, and which operations a client can perform. Avoid a class that simultaneously reads keyboard input, calculates a rate, draws a table, and saves a file. The model returns data; the interface decides how to receive and display it. This lets you test the model without launching a menu and reuse it in another application.

In PyCharm, *Structure* (**Alt+7**) shows classes, methods, and properties, while *File Structure* (**Ctrl+F12**) lets you quickly navigate to a member. The *Generate* menu (**Alt+Insert**) depends on context; check the actual Python actions rather than expecting Java or C# entries. Help: <https://www.jetbrains.com/help/pycharm/generating-code.html>.

::: info Screenshot
BankAccount editor; Alt+7; show methods, property and fields.
:::

Figure 8.5. Class members in the Structure window {.caption}

UML support in PyCharm depends on the available features and components of the installed product. Check for *Diagrams → Show Diagram* in the context menu. Its absence does not prevent completing the work: you can draw UML manually using the same rules. Official instructions: <https://www.jetbrains.com/help/pycharm/class-diagram.html>.

::: info Screenshot
Pause after cart.add; expand cart, items, Product and mangled discount field.
:::

Figure 8.6. Cart state in the debugger {.caption}

Common mistakes include forgetting `self`, sharing a class-level list, recursively calling a setter forever, partially changing state before validation, and duplicating a derived value in two fields. For each method, test an ordinary case, a boundary, and a rejection. After rejection, compare the state with its previous value; the exception text alone is insufficient. For two instances, check that their collections are independent.
