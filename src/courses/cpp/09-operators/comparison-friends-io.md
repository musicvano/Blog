---
title: "Comparison, friends and streams"
description: "Topic 9. Operator Overloading: Comparison, Friends and Streams"
outline: [2, 3]
sourceHash: "3010c913604a75331e955b3a420fc9e724345bf9d84f2fbcd2c5f7739b3d39ea"
---

# Comparison, friends and streams

## Comparison and ordering categories

`operator==` is responsible for equality, while the three-way comparison `<=>`
returns less, equivalent or greater; some types also
allow unordered results. An ordinary hand-written `<=>`
doesn’t define equality by itself. For the fraction, `==` is implemented separately.

`std::strong_ordering` suits ordinary integer values with strong
equality. `weak_ordering` allows equivalence without full
substitutability, for example, case-insensitive text comparison.
`partial_ordering` allows unordered, as in comparing a `double` with NaN.
A stronger result can be converted into a weaker one, but not the other way around.

For `operator<=> = default`, the compiler compares the bases and fields in declaration
order. This is a lexicographic order, not a guess about the domain
meaning. If you declare patch first in a version, the result will be wrong
for the expected major/minor/patch order. Declaring a defaulted spaceship
can also give the corresponding implicit `==` according to the language rules.

The compact numeric version in the lab example isn’t a full implementation
of SemVer: it doesn’t handle prerelease and build metadata. An explicit limit
of the contract is more important than an attractive name. For a release registry, you need to
agree on the format and the rules before implementing the comparison.

## Friend functions and hidden friends

`friend` gives a specific function or class access to private members.
A friend function remains a free function: it has no `this`
and receives objects as explicit parameters. That’s why a stream operator
with an `ostream` left operand is naturally written as a free function.

A friend defined inside a class is often called a **hidden friend**.
Argument-dependent lookup finds such an operator
for the corresponding class. This lets you keep helper operators next
to the invariant without exposing the internal fields to all code.

Friendship isn’t transitive and doesn’t mean that all acquaintances of a friend class
also get access. It isn’t passed on through inheritance automatically.
Granting friend should be evaluated as part of the interface: the function now
depends on the internal representation, so changing it may require changes
in this function too.

If an operator can be implemented correctly using public methods,
friend isn’t necessary. However, a dozen artificial getters just for the sake of
a single formatting can also weaken encapsulation. The choice should
reduce the number of ways to break the invariant, rather than follow
an absolute ban or an absolute permission of friendship.

## Stream input without partial state

`operator<<` returns a reference to the same stream. This supports
the chain `out << a << b`. It shouldn’t end the line without need:
the user decides where the line breaks go. It’s also undesirable
to permanently change the flags or precision of someone else’s stream.

`operator>>` must return `istream&` and signal a failed read
through the stream state. A convenient strategy is to read the arguments into local
variables, check them, and only then assign the new value to the object. If
the second component of a complex number is missing, the first one must not
have already silently changed half of the old object.

The example uses a pair of real numbers separated by a space. This is a deliberately
simple format, not the parsing of an arbitrary `a+bi` notation. After an error,
the target stays unchanged, and the stream has failbit set. Further recovery
of the stream and asking again are the responsibility of the console interface.

Exceptions and failbit shouldn’t be mixed by accident. With the usual exception
mask, `setstate` only changes the flags; if the user of the stream
has enabled exceptions for failbit, they may get `ios_base::failure`.
The operator’s contract must remain correct in this case too.

## Assignment, arrow and the limits of convenience

The assignment operator is related to resource ownership and was already discussed
in the rule of five. Don’t change its usual meaning to save on arithmetic:
after `a = b`, the user expects the corresponding state of `a`, not
an addition or a log entry instead of the assignment.

`operator->` is used by pointer-like classes. For example,
`unique_ptr` provides access to the managed object. A correct wrapper
must reconcile the lifetime, the possibility of an empty state and access
to the resource; the arrow syntax by itself doesn’t solve these problems.

Overloaded logical operators shouldn’t be used as a replacement for
ordinary short-circuit evaluation without a careful understanding of the rules
for evaluating operands. For a teaching class, it’s safer to have an explicit
domain operation or `explicit operator bool` than to surprise
the user with an unusual `&&` or `||`.

The criterion of good overloading is predictability. Read the expression
without knowing the implementation, state the expected result and check
whether the contract delivers it. If a symbol needs a long explanation
for every use, a named method is often better.
