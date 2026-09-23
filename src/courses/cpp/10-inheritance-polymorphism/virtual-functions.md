---
title: "Virtual functions"
description: "Topic 10. Inheritance and Polymorphism: Virtual Functions"
outline: [2, 3]
sourceHash: "68f33f5511e65ca1fd4cf8d2ffe059e1ce637cfeb124b99016a1116bb7c126f2"
---

# Virtual functions

## Virtual functions, override and hiding

A virtual method lets the implementation be chosen by the dynamic type
of the object. A base reference to a Circle calls Circle::area
if the signature correctly overrides the base one. Without `virtual`, the choice
is determined by the static type of the expression, that is, the type of the reference
known at compile time.

Always write `override` where an override is intended. It
turns the intent into a check. Otherwise, a forgotten `const`, a different parameter type
or a wrong ref-qualifier can create a new
function instead of the expected override. With override, the compiler
reports the mismatch immediately.

Name hiding and overriding are different things. A derived method
with the same name can hide the base overloads even
if it overrides none of them. `using Base::method` brings the needed
names back into the lookup set, but doesn’t make a non-virtual function virtual.
So analyze both the signature and the name lookup rule.

An explicit qualified call `Base::method()` refers to
a specific base implementation. This is useful when a derived method
extends the common behavior, but you must not create accidental
recursion by calling your own override instead of the base one.

## A virtual destructor and ownership

If an object is destroyed through a pointer to the base type, the base must
support the corresponding polymorphic destruction contract. The usual
choice is a public virtual destructor, `virtual ~Base() = default`.
Then destruction through `unique_ptr<Base>` starts from the derived class
and correctly covers all its fields.

A non-virtual base destructor combined with deleting a derived object through
a base pointer forms a dangerous scenario with undefined
behavior. Don’t demonstrate it by running it and concluding “the message
wasn’t printed, so it’s only a leak”: the consequences aren’t limited to such
an observation. The error has to be eliminated in the design.

Another policy is a protected non-virtual base destructor if
deletion through the base is forbidden. In this course, containers of
polymorphic owners use the first option, because it
gives simple and unambiguous ownership.

`unique_ptr` manages the lifetime, but it doesn’t magically fix a wrong
base class destructor. A smart pointer performs
the specified delete operation; the types and the contract of the hierarchy still
have to be correct.

## Polymorphic collections and slicing

`vector<Base>` stores Base values. Adding a Derived creates
a base value and discards the derived part — this is **object slicing**.
Virtual functions in this new object
already see the dynamic type Base: the derived object isn’t hidden
inside; it simply isn’t there.

`vector<unique_ptr<Base>>` stores owners of objects of different
derived types. Each element has the same pointer type,
but the managed object can be different. A call through `->`
keeps the dynamic choice, and the virtual destructor ensures
the correct end of the lifetime.

Copying such a container isn’t available by default:
unique_ptr has a single owner. If you need an independent copy
of a polymorphic set, you should design a separate clone operation
or a different ownership model. Don’t replace unique_ptr with shared_ptr
just to make a compilation error go away without figuring out what the copy means.

References and raw pointers can be non-owning observers.
Their user doesn’t call delete, but must guarantee
that the object exists while it’s being used. Polymorphism and ownership are
different questions that must be reconciled, not conflated.

## RTTI and checked conversions

A conversion of Derived to an accessible unambiguous Base is called
an upcast; it doesn’t need to query the actual type. The opposite
direction requires a guarantee. `static_cast` doesn’t check at runtime
whether the object really has the required derived type; a wrong assumption
can lead to undefined behavior.

`dynamic_cast` for a polymorphic hierarchy uses runtime
information. For a pointer, a failed cast returns nullptr.
For a reference, a failure throws `std::bad_cast`. These different forms
give different error contracts: a check with a condition or an exception handler.

In MSVC, RTTI support is controlled by the `/GR` option; in a normal configuration
it’s enabled. Don’t disable it by accident for a downcast example.
`typeid` is also related to the runtime type of polymorphic objects,
but the text of `name()` is implementation-dependent and isn’t a stable
format for files or business logic.

A frequent chain of dynamic_cast for each new kind signals
that the common operation should be moved into the base interface.
A rare specific action may justify a capability check,
but the main algorithm of a collection is better built on a virtual
operation with a common contract.

## The virtual function table model

A common implementation of dynamic dispatch uses a table
of virtual functions and hidden pointers in the object. The MSVC
debugger may show `__vfptr`. This is a useful model to explain
how the same base call goes to different code.

The C++ standard defines the behavior of the call, not a mandatory byte layout
of the vtable. The size of pointers, the number of internal fields,
the placement of bases and optimizations depend on the ABI and the compiler.
The diagram in this lecture is conceptual, not an instruction to read
someone else’s memory through an arbitrary cast.

Virtual functions can add an indirect call and affect inlining,
but the optimizer sometimes knows the actual type and removes the indirection.
That’s why you can’t compute a universal “cost of virtual” from a single
run or claim that every call always has the same
machine instructions.

First choose the model based on the requirements for substitution and the life
cycle. If performance becomes a requirement, measure a representative
scenario in Release and explain the limitations of the measurement. The teaching
Locals screenshot shows a specific environment, not a general
standard format of a polymorphic object.
