---
title: "const, static, and aggregates"
description: "Topic 7. Classes and Objects: const, static, and Aggregates"
outline: [2, 3]
sourceHash: "806ab4563aaab3089a307addfe8ed4ddc110bc07a0a7362e2dc756007d8a14ef"
---

# const, static, and aggregates

## Constness, this, and observing state

A member function with `const` after its parameter list promises not to modify
the object’s ordinary data members through `this`. You can call it on a constant
object and through a constant reference. For the member function
`balance() const`, the result is an observation, while `withdraw()` changes the
state and has no such qualifier.

`this` is a pointer to the object on which a non-static member function was
called. In a `const` member function, access through it is constant. Writing
`this->` explicitly is usually unnecessary, but it can distinguish a data member
from a parameter with the same name. Returning `*this` by reference enables
chains of operations, but you should not make the interface complicated just
for the sake of shorter code.

`mutable` allows a particular data member to change even in a `const` member
function. A typical example is a cache of a derived value that does not change
the logical content of the object. It is not permission to hide a change of a
balance or a student’s grade. By itself, `mutable` also does not make access
from multiple threads safe.

An accessor should not return a non-constant reference to a private container
without need: the user would then be able to bypass all checks. For small
numbers, returning by value is enough. For complex data, consider a constant
reference, a copy, or a dedicated read operation with a clearly described
lifetime of the result.

## Static members and nested types

A static member function has no `this`: you call it on the class, not on a
particular state. It fits checking the format of a car license plate or a
factory, if the operation truly belongs to the concept of the class. For
ordinary independent arithmetic, a free function is often simpler than a
wrapper class.

`static constexpr` conveniently represents an immutable limit: a maximum
temperature or the capacity of a standard model. Changing an `inline static`
member affects all instances. Distinguish between a counter of objects ever
created, a counter of live objects, and the next identifier: these are
different contracts, especially once copies and moves appear.

A nested `enum class Mode` groups the allowed modes next to the type they
belong to. The name `Thermostat::Mode::heat` is clearer than the number 1, and
there is no implicit conversion from the enumeration to an integer. Do not
duplicate the mode state across several Boolean data members that can
contradict each other, for example being “off” and “heating” at the same time.

A nested type does not automatically create a nested object. The enumeration
declaration defines the allowed values, and a particular data member `mode_`
stores the current mode. This is the same difference between a type and an
instance as between the account class and two particular accounts.

## Aggregates and designated initialization

An **aggregate** is convenient for an open set of data if its data members do
not form a complex hidden invariant. An example declaration:
`struct Point { int x = 0; int y = 0; };`. You can create an object as
`Point p{.x = 1, .y = 2};`. This is C++20 designated initialization, which
names the data members explicitly and makes the code easier to read.

In C++, the order of designated members must match the order of their
declaration. Do not carry over arbitrary rules from C: the capabilities of the
similar syntax are not entirely the same. Omitted data members receive their
default member initializer or are initialized according to the corresponding
aggregate rules; check this for each particular type.

A class with a user-defined constructor that validates its arguments cannot
automatically be considered an aggregate. For `BankAccount`, not skipping the
check of the initial balance matters more than a short syntax for filling in
the data members. Open structs and encapsulated classes complement each other;
they do not form a ranking of “better” types.
