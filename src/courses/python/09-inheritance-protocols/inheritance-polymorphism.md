---
title: "Inheritance and polymorphism"
description: "Topic 9. Inheritance and protocols: inheritance and polymorphism"
outline: [2, 3]
sourceHash: "cee627bf8d1bd64ab9ee351ab3bc0985d795ee99e5fbb0b5de9e022d4e147bc7"
---

# Inheritance and polymorphism

## Inheritance and base classes

**Inheritance** creates a derived class from an existing one. In `class Child(Base)`, `Base` is the base class and `Child` the derived class. If no base is explicitly specified, an ordinary Python class ultimately derives from `object`. Inherited methods are available to the instance, but their behavior can be **overridden**. <https://docs.python.org/3.14/tutorial/classes.html#inheritance>.

```py
class Message:
    def __init__(self, text: str) -> None:
        if not text.strip():
            raise ValueError("Empty message")
        self.text = text.strip()

    def render(self) -> str:
        return self.text


class TaggedMessage(Message):
    def __init__(self, text: str, tag: str) -> None:
        super().__init__(text)
        self.tag = tag

    def render(self) -> str:
        return f"[{self.tag}] {super().render()}"


message = TaggedMessage("Ready", "INFO")
print(message.render())
print(isinstance(message, Message))
```

```
[INFO] Ready
True
```

An overridden derived `__init__` does not call the base initializer automatically. `super().__init__(text)` provides the base validation and the `text` attribute. Without it, an object may be created without required state, and the error may appear only during a later method call.

`super()` means “continue lookup after the current class in MRO order,” not always “call the immediate parent.” With one base class, these views often coincide, but with multiple inheritance, the difference is fundamental. Calling `Base.method(self)` directly bypasses the cooperative order.

### Type checks

`isinstance(obj, Base)` includes subclasses; `type(obj) is Base` checks the exact type. `issubclass(Child, Base)` compares classes. `obj.__class__` shows the actual class, `Class.__bases__` its direct bases, and `Class.__mro__` the complete lookup order. These tools are useful for diagnostics and checking contracts at boundaries.

Do not use them to replace polymorphism inside every operation. If adding a new shape requires changing every reporting function, the shared interface is not being used enough. An exact type check is appropriate only when the contract truly prohibits subclasses, as in the integer monetary amount example in Topic 8.

## Polymorphism and duck typing

**Polymorphism** is the ability to work with different implementations through a shared interface. A collection of shapes may contain a circle and a rectangle; each `area()` call selects the corresponding object's implementation. The shared interface also defines units, valid arguments, and the result's meaning. Matching method names alone do not guarantee compatible behavior.

**Duck typing** emphasizes the required operations rather than class ancestry. An object with a `render()` method may suit a report without inheriting from a special class. The call can still fail, however. The EAFP principle allows trying the required operation and handling an expected failure, but does not justify catching every exception without analysis.

`AttributeError` can also occur inside a method implementation, so an overly broad `try` can hide a defect as “unsupported object.” For learning models, it is better to establish the interface with an annotation, test it with examples, and handle domain exceptions at the program boundary.
