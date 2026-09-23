---
title: "Value categories and copy-and-swap"
description: "Topic 8. Copy, Move, RAII: Value Categories and Copy-and-Swap"
outline: [2, 3]
sourceHash: "a954545b73e0b63dbcde771aa208b9f46f85c9b72f689ead8fa8d5ae33676624"
---

# Value categories and copy-and-swap

## Value categories and references

A category belongs to an **expression**, not simply to the type of a variable.
An **lvalue** designates an object with identity; the name of a local variable
is an lvalue. A **prvalue** describes a computed value, for example the literal
`42` or the creation `T{}`. An **xvalue** designates an object whose resource
can be reused, for example the result of `std::move(a)`.

The names **glvalue** and **rvalue** group the categories: glvalue includes
lvalue and xvalue, and rvalue includes prvalue and xvalue. That is why the
diagram has a shared xvalue node rather than two different categories with the
same name. This classification explains why an object can have identity and be
a candidate for transferring its resource at the same time.

The parameter `T&& other` has an rvalue reference type, but the expression
`other` inside the function is an lvalue because it has a name. To pass its
resource further, you need `std::move(other)`. On the other hand, a move from a
`const T` often selects copying: an ordinary `T&&` cannot allow modifying a
constant source.

Do not put `std::move` next to every return statement or argument. After the
resource is transferred, the old value may be lost, and forcing a conversion of
a local result sometimes prevents optimization. First establish the ownership
and whether a copy is needed, and then choose the transfer mechanism.

## Copy-and-swap and the exception guarantee

The **copy-and-swap** idiom first creates a temporary copy and then swaps
resources with the target object. If copying fails, the old state of the target
has not changed. If the swap does not throw, the successful transition is short
and reliable. The temporary object destroys the old resource after the
operation completes.

The **strong guarantee** means that a rejected operation does not change the
observable state. The **basic guarantee** means that invariants are preserved and
nothing leaks, but the value may have changed. The **no-throw guarantee** is
stronger with respect to leaving the operation, but by itself it says nothing
about whether the result is mathematically correct. Tie the name of a guarantee
to a specific member function.

For copying a buffer, the temporary copy costs memory. This is an acceptable
price for a simple contract, but not the universal maximum of performance. An
optimized class can reuse the target’s capacity; then you have to separately
prove the behavior on a partial failure.

`std::exchange(other.data_, nullptr)` returns the previous value and sets the new
one at the same time. It is a convenient way to write a pointer transfer, not an
automatic release of the resource. In move assignment, you first need to handle
the target’s own resource and self-move.

## Returning values and copy elision

Returning an object by value does not mean a mandatory expensive copy. In the
corresponding C++17 prvalue cases, the result is created directly in its final
location. NRVO for a named local variable is a separate permitted optimization,
which you should not consider unconditional for every piece of code.

The ordinary `return result;` leaves the compiler the option of NRVO and the
move mechanisms provided by the language. Writing `return std::move(result);`
can remove the condition for NRVO. There is no need to “help” the compiler this
way without a specific justification and measurement.

A tracing destructor can make the sequence of messages depend on a permitted
optimization. That is why you should test the value and the invariant first,
not a universal number of copies for any compiler. In the `vector::reserve`
example, we check a known MSVC configuration and record it explicitly in the
manifest.

A simple performance test can also be misleading: allocation time, data size,
optimization, and warm-up all affect the result. Counting operations explains
the mechanics, while measuring time answers a different question. For small
types, a move can cost as much as a copy.

## RAII for state and transactions

Temporarily changing the settings of `std::cout` is also a resource: the old
flags, precision, and fill must be restored. A wrapper saves them in the
constructor and restores them in the destructor. The example uses
`ostringstream` to check the result without depending on the console or the
Windows API.

A transactional wrapper stores the previous state and has a commit flag. Before
`commit()`, the destructor performs a rollback; after it, the destructor leaves
the new state. Such a local transaction is not a database transaction: it
provides neither durability after a crash nor isolation from other threads.

The rollback must be reliable. Assigning a plain `int` does not throw, but
copying a large `vector` can allocate memory. For complex structures, the old
state is often prepared in advance and restored through a non-throwing swap. The
choice of mechanism depends on the contract of the data.

A scope guard holds a non-owning reference to the state; the state must outlive
the guard. Copying is forbidden, otherwise two destructors could roll back the
same change twice. In the simple example, we also forbid moving: the scenario
does not need it, and it would complicate the right to roll back.
