---
title: "Case studies and common mistakes"
description: "Topic 10. Inheritance and Polymorphism: Case Studies and Common Mistakes"
outline: [2, 3]
sourceHash: "7698675429f2a2ac4a067bcb11b80d553103f8acc68654b092fee73a8d32e733"
---

# Case studies and common mistakes

## A substitution audit using a delivery example

Imagine a base delivery with a cost method for a non-negative weight.
A courier computes a base fee plus a per-kilogram fee, while pickup
returns zero. Both options can be used in the algorithm
“find the lowest cost” if the result is non-negative and the rules
for the allowed weight are the same.

If one kind has its own maximum load, the contract
must explicitly represent unavailability instead of returning
a negative “price” as a non-obvious signal. You can define
a separate capability check or a result type. The choice
depends on the task, but all implementations must follow
the same way of reporting impossibility.

The base shouldn’t know the names of all future delivery methods.
If its method contains a switch on a kind enum and all the formulas,
the derived classes may turn out to be unnecessary. If, however, the behavior
is overridden by methods, the algorithm works with the contract and doesn’t
change after a new kind is added.

A substitution check can use the same set
of inputs for all implementations: zero, a typical weight, the maximum,
a negative one and infinity. What’s checked isn’t that the prices are equal,
but that the general rules are the same: the form of refusal, an unchanged
state and the allowed range of a successful result.

This analysis explains why inheritance isn’t automatically
better than composition. If you only need to store a rate object
and call its calculation, composition with a strategy can
give a smaller and more flexible hierarchy. In the next topic, we’ll look at
this option through an abstract interface.

## A diagnostic route for an override error

Suppose the base declared `double area() const`, and the derived
class wrote `double area()`. Without override, this may be
a new function that hides the name. A call on the derived object
and a call through a base reference will then behave differently,
although the author expected a single algorithm.

The first diagnostic step is to add override and read
the mismatch message. The second is to compare
the parameter types, const, ref-qualifiers and the allowed
exception specification. The third is to make sure that the base
method is virtual at all and that the declaration is visible in the right base.

After the fix, a test should call the method in two ways:
directly on the derived object and through Base&.
The same result confirms the expected override
in this scenario. A test only on Derived doesn’t check
the behavior of a client of the base contract.

Another common problem is a `vector<Base>` instead of a `vector`
of owners of base pointers. No extra override
will bring back the sliced part. Check the way the parameter is stored
and passed before looking for a bug in the
formula of the derived method.

## Testing a hierarchy and the limits of responsibility

For each concrete type, test its own
constructor arguments and an ordinary result. Then
pass the object to a common function that knows only
the base reference. These are two different checks: local
arithmetic and the correctness of the polymorphic call.

For a collection, test an empty container, a single element,
several different kinds and clearing the container. If you count
destructors, the counter must live longer than the objects; otherwise
the test itself creates a lifetime problem. Don’t test
a non-virtual delete by running undefined behavior.

For dynamic_cast, you need both a successful and a failed case.
A failed pointer cast is checked before dereferencing.
A failed reference cast is checked with a bad_cast handler.
For an exception hierarchy, separately confirm that a specific
handler fires before the general one.

In the report, explain who owns the objects, which operations
are virtual and why, which data is private, and what
each result guarantees. A reference to the vtable doesn’t replace
a domain explanation: the goal of a hierarchy is
understandable substitution of behavior, not a demonstration
of the compiler’s hidden fields.

## A decision table for how to pass an object

| Form | What happens | Typical purpose |
| --- | --- | --- |
| `Base value` | A copy of only the base value | Ordinary value semantics |
| `const Base&` | Non-owning reading of the complete object | A polymorphic calculation |
| `Base&` | Non-owning modification according to the contract | A polymorphic command |
| `unique_ptr<Base>` | Transfer of the unique owner | A collection of different kinds |
| `Base*` | Non-owning access, may be null | An optional observer |

The form of a parameter says more than just syntax.
A reference means that the object must exist; a pointer
can have a separate empty state if the contract
allows it. A unique_ptr by value transfers ownership,
so the call is often preceded by std::move. Don’t hide
a transfer of ownership behind a raw pointer without documentation.

A function that only prints the name of a shape shouldn’t
require unique_ptr: const Base& is enough for it.
Otherwise, the interface ties the client too tightly to
the way objects are stored. The owner can be a local
object, an element of another composition or a smart
pointer; a read operation doesn’t need to know that.

## Why a protected field spreads the invariant across the whole hierarchy

If Employee gives derived classes direct access to
`salary_`, every derived class becomes responsible
for its bounds. The base can no longer guarantee
that the salary stays non-negative after an arbitrary
override. Adding a new kind increases
the number of places that need to be checked.

A protected modifying method with a check keeps
a single point of control. A protected const
read method lets you use the base result
without exposing how it’s stored. That’s why
the employee example keeps the field private,
even though it demonstrates protected as a language mechanism.

At the same time, don’t make a method protected
just “in case”. Every such method is
part of the contract for future derived
classes. Changing its behavior can break
the hierarchy even when an ordinary
public client doesn’t notice a signature change.

## Specializing the reaction without checking the error text

In the record lookup scenario, ValidationError
means that the identifier doesn’t have a valid
format or range. NotFoundError means
that the request is correct, but the record is missing.
These situations may require different reactions:
ask for input again or offer to create the record.

If both errors are caught as AppError,
the common handler can still show
a message and end the operation. But
analyzing what() to choose the behavior
is unreliable: editing the text, translating it
or refining the wording will change the logic.
The exception type is a more stable part of the contract.

When rethrowing an exception that’s already been caught,
a throw without a new operand
keeps its current dynamic type.
Creating a new base exception from a copy
of a derived one can lose specific data.
This is another manifestation of the difference between a reference
to the complete object and creating a base value.
