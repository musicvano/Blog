---
title: "Case studies and common mistakes"
description: "Topic 9. Operator Overloading: Case Studies and Common Mistakes"
outline: [2, 3]
sourceHash: "dd9f8a7420047c74485cb36920a6514841b3b54627453c3111ff3471412964da"
---

# Case studies and common mistakes

## Tests of algebraic properties

Besides the single example `1/2 + 1/3`, test reduction, the sign
of the denominator, zero, the rejection of a zero denominator and the range bounds.
Equality must be reflexive, symmetric and transitive for
allowed values. The results of `<`, `==` and `>` must not contradict
each other for a type with a strong order.

For floating-point numbers, mathematical identities may not
hold literally because of rounding. Don’t promise exact
associativity of `double` addition. Choose simple exactly representable
data for structural tests, or define the allowed error explicitly.

For input, test a complete pair, a missing second component,
non-numeric text and infinity; after a failure, compare the target
with the old value. For indexing, test the first, the last
and the first invalid index, as well as a const object.

Compare the prefix and postfix forms separately: both change
the state, but return different values. For symmetric multiplication,
test both orders of the operands. This way the tests check the contract
of the interface instead of just repeating the formula from the function body.

## Designing operators for a temperature and a temperature difference

Not every familiar number has ordinary arithmetic. The temperature at a point
and a change in temperature are different concepts. Adding two absolute
temperatures usually doesn’t have the meaning the user expects;
instead, adding a difference to a temperature defines a new temperature.
Subtracting two temperatures gives a difference. This can be expressed with two types.

Such a design forces you to choose the signatures before the implementation. The operation
`Temperature - Temperature` returns `TemperatureDelta`, and
`Temperature + TemperatureDelta` returns `Temperature`. For
converting Celsius to Fahrenheit, an absolute temperature includes
an offset, while a difference uses only the scale. A single universal
`double` doesn’t help the compiler notice when these cases are mixed up.

A similar situation arises for a calendar date and a duration, the coordinates
of a point and a displacement vector, an amount of money and a percentage. Well-chosen
types reduce the number of allowed but meaningless expressions.
Overloading then serves to limit mistakes, not just to shorten the code.

When you add a new operator, state the units of both arguments and
of the result. For `distance / time`, the result has the unit of speed;
a zero time requires a refusal. For `speed * time`, the result is again
a distance. The checks must include units and bounds, not just
the numeric formula, because a wrong unit gives a perfectly plausible number.

## Consistency of equality, ordering and normalization

The fractions 1/2 and 2/4 represent the same value. If the class keeps both
forms without normalization, comparing the fields returns inequality. You can
implement equality using cross products, but then you have to
control overflow in every comparison. Normalizing once
at creation simplifies the subsequent operations.

A canonical zero also matters. The values 0/3 and 0/7 must become
0/1. The sign is stored in the numerator, and the denominator is positive. Now
printing, equality and testing have one stable representation. This doesn’t
prove that any arithmetic is safe: the intermediate products still
need limits or a wider computation.

For an RGB color, equality of the components is natural, but the “less than”
order is ambiguous. Lexicographic order, brightness and
the index in a palette are different policies. If the task doesn’t need
a universal order of colors, don’t add a spaceship operator
just because it’s short to write. A named comparator
for a specific sort may be more precise.

For `double`, NaN isn’t equal to itself and produces unordered.
This isn’t a compiler bug but part of the floating-point model.
A class that wants a strong order must either exclude such values
from its invariant or explicitly define a different policy. You can’t just
declare strong_ordering and ignore the unordered case.

## A table of operator interface tests

| Operator | Property | Failure case |
| --- | --- | --- |
| `a + b` | Doesn’t modify a and b | Range exceeded |
| `a += b` | Returns a reference to a | State after a failure |
| `a == b` | Symmetry and transitivity | Different representations of the same value |
| `a <=> b` | Consistency with equality | NaN or an incomplete order |
| `x++` | The result is the old value | Maximum value |
| `++x` | The result refers to the new state | Overflow |
| `in >> x` | A complete result or an unchanged x | Incomplete text |
| `out << x` | The same stream is returned | An unwanted change of flags |

The table lets you check the behavior independently of the specific
algorithm. For example, if `operator+` is implemented via `+=`,
a test that both arguments stay unchanged is still useful: accidentally
taking the left argument by non-const reference breaks
the contract, even though the sum on the screen is correct.

For input, it’s worth testing the reuse of the same
object: first read a correct value, then an incorrect one.
Otherwise, a test on a new zero object may not notice a partial
assignment of the first component. It’s the sequence of states that reveals
a bug that isn’t visible in a single line of expected output.

## An interval contract: An operator doesn’t always return the same type

The intersection of two half-open intervals can be empty.
If the type requires a strictly positive length, the result can’t
always be represented by this type. You need to either
allow an empty interval, return optional,
or choose another explicit contract. A zero length
must not accidentally mask a constructor error.

The union of two non-adjacent intervals isn’t a single
interval. Returning the range from the minimum start to
the maximum end creates a bounding interval
and includes a gap that wasn’t in the input.
So the operation should be named accordingly, or it should return
a set of parts. A familiar symbol doesn’t fix
a mismatch with the mathematical meaning.

A similar question arises for rectangles.
In the task, the symbol | explicitly means the bounding
rectangle, not the exact geometric area of
the union. This convention must be visible
in the problem statement, the documentation and the tests. Otherwise, the user
may get a correct implementation of a wrong expectation.

## Why conversions are better made explicit

A Money class with an implicit constructor from an integer
would allow adding any integer to an amount,
but wouldn’t explain its unit: hryvnias or kopiykas.
An explicit constructor requires the choice to be visible
in the code. It’s a little extra length for the sake of
preventing a costly domain mistake.

Likewise, an operator int for a grade can open up
meaningless arithmetic if the conversion is implicit.
An explicit operator lets you get a number where
it’s deliberately needed, but doesn’t hijack
all overloads that happen to accept int.
The contextual conversion to bool for conditions is a separate
convenient feature of explicit operator bool.

When several implicit conversions form
a chain of candidates, the message about an ambiguous
operation becomes more complex. A minimal set of
conversions makes both choosing an overload
and reading the code easier. Don’t add conversions
just so that one test compiles
without explicitly stating the units.

## Two levels of testing a stream operator

The first level checks the text: operator&lt;&lt;
for a fraction must print the normalized
numerator and denominator in the defined format.
The second level checks the integration with the stream:
the same ostream is returned, chaining
works, no extra line break appears,
and other formatting parameters aren’t spoiled.

For operator>>, the first level is the correct
value after correct text. The second is
the failbit state and an unchanged target after
incomplete or wrong input. If
the reader accepts only two numbers separated by a space,
the test shouldn’t silently expect support for
parentheses or the symbol i.

The text format may later become a file
format. Then stability and unambiguity
matter more than decoration. Output
for a human and serialization may require
different functions. Don’t promise a round trip
just because of the matching names &lt;&lt; and >>:
check that the printed text really
reads back without losing the needed value.
