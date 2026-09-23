---
title: "Designing function interfaces"
description: "Topic 3. Functions: Designing Function Interfaces"
outline: [2, 3]
sourceHash: "6917ba736096270ed781c20a8b5eb59195dbbed7ae641b3b9b681b4778c4b02a"
---

# Designing function interfaces

## Step-by-step interface design

Let us consider a function that reduces a fraction. The initial
wording “reduce the numbers a and b” leaves
several questions: can the denominator be
zero, where to keep the sign, is a zero
numerator allowed, should the arguments be changed.
The answers define the interface even before choosing
Euclid’s algorithm. For a teaching variant
you can require a positive denominator and a
non-negative numerator, and return the result
as a structure with the fields numerator and denominator.

Then `reduce(0,7)` must return 0/1,
and `reduce(6,8)` must return 3/4. Computing the GCD
is a separate function that can be checked
on pairs of equal numbers and
coprime numbers. The reducing
function should not read the keyboard:
`main` will do that, check the denominator
and pass already valid numbers.
This way one computational interface
will work both for argv and for
the interactive mode.

The alternative interface
`void reduce(int& numerator, int& denominator)`
changes existing variables. It is also
possible, but the call must clearly
signal the change. Passing
the same variable to both
parameters creates an additional case
that has to be defined or
forbidden by a precondition. Returning
a structure removes this hidden
dependency between output parameters.

### Choosing an overload by hand

To understand a compiler message,
first write out the set of candidates.
For `area(double)` and
`area(double,double)`, the call
`area(2)` has only one candidate
by the number of arguments; the integer 2
is converted to double. For the
pair `calculate(int)` and
`calculate(double)`, the call
`calculate(2)` exactly matches
the first one, and `calculate(2.0)` the second.
The name of the outer variable does not
affect this choice.

If there are `calculate(long)` and
`calculate(double)`, an argument
of type int may need a
conversion in both cases,
and the choice can be ambiguous.
Do not add random type
casts until you have found out which
semantics the call expected.
Perhaps the interface should
have different names, for example
`count_items` and `measure_length`,
because the actions are conceptually different.

For default arguments
it is useful to write out the allowed
forms of the call. The function
`price(double amount,double rate=0.2)`
allows one or two arguments.
Adding another `price(double)`
creates competition for the call
with one argument. The rule
“less writing is better” does
not work here: the interface must
remain unambiguous.

### A recursive call as a separate instance

Beginners sometimes imagine that
a recursive function has one
variable n for all levels.
In fact, each call
creates its own parameter.
For the factorial of 3, the outer
call remembers n=3
while the inner one works
with n=2. When the latter
returns 2, the outer one
multiplies it by its own 3.
The local names are the same,
but the objects are different.

That is why in the debugger
it is important to select a
Call Stack frame before viewing
Locals. The value n=1
in the current frame does not
mean that all previous
frames also became 1.
For a reference parameter
to a shared counter
the picture is different: the frames
have access to one
outer object.
Comparing these cases
on the Towers of Hanoi
shows the difference between a copy
and shared state.

A recursive algorithm can often
be replaced with iteration,
but you need to reproduce
the state that was stored
in the frames. For the factorial
an accumulator
and a counter are enough. For
a tree traversal you need
a collection of pending
nodes. Therefore the choice of
recursion should be based
on the shape of the problem and
resource limits,
not only on the number
of program lines.

### Controlling the cost of computation

A call counter and the
maximum depth
measure different things.
On entry to the function
you can increment
the counter and compare the
current depth with the
maximum. On exit
the current depth must be
decreased on every
path, including the
base case.
If one early
return is missed,
the diagnostic counter
itself becomes wrong.

For teaching tasks
with an exponential number of
calls, set a
small allowed input.
Enlarging the type int
to long long removes
only some limits on
values, but it does not make
billions of calls fast.
Measuring time on
one small example
also does not replace an estimate
of how the work grows
with the input size.

### A reproducible example of an interface error

When a function returns a wrong answer,
first separate it from the large program.
Write down the smallest set of arguments on which
the discrepancy is visible. For example, if normalizing
time is wrong for large seconds, a
call with 0 hours, 0 minutes and 60 seconds is enough.
0:1:0 is expected. If you get 0:0:60,
check pass by reference; if
0:1:60, the remainder computation was forgotten.

A minimal example should keep the types,
the order of calls and the required settings,
but it does not need the whole menu, files or
graphical interface. It can be added
to the README as a regression case:
repeat it after the fix so that
the error does not come back. For functions
with a hidden static variable, one
call is sometimes not enough: you also need
to reproduce the previous calls
that formed the state.

When debugging, do not change
the algorithm, the types and the test data at the same time.
First check the actual arguments
on entry. Then execute one step
of the function, compare the local values
with a manual calculation and find
the first point of discrepancy. An error
on entry may be a consequence
of a mixed-up order of arguments
in the caller rather than of the formula inside.

Explain the result of a fix
through behavior: “the function now
changes the original components
because the parameters are references”,
not just “added the & symbol”.
This way the explanation remains useful
when moving the idea to another
function. The link between the interface,
the preconditions and the test is
the basis for the later design of
classes and libraries.

### Documenting a computational function

A comment before a function should state what
cannot be seen from its body. For an area, these are
the units of the lengths and of the result, the allowed
arguments and the error policy. For
sorting, whether the original
sequence changes, how equal
elements are compared and whether distinct objects are required
for all reference parameters. A list
of such conditions is a practical contract
of the interface even without a special
language mechanism of contracts.

Compare two possible results
of root finding. Returning only
double does not explain whether the method
converged and how small the residual is.
A structure with the fields root,
iterations and converged allows
the caller to make an informed
decision. At the same time, there is no need
to add dozens of fields “for
the future”: return only
the data needed by the current
usage scenarios.

Default arguments
also document assumptions.
If the bisection tolerance
defaults to 1e-6,
you should explain whether it is
the interval length, the absolute
residual or the relative
error. A single number
named epsilon without
explanation does not define
a reliable algorithm.
When different functions
use different
criteria, the same
parameter name can
be misleading.

During the defense, show
one example call of
each public function
and explain why
the arguments satisfy the
preconditions. Then give
one invalid case
and the place where
the program rejects it.
This way you can tell
accidentally working
code from an interface
that the author understands
and can safely
reuse.

## Common mistakes

Table 3.1. Errors in interfaces and calls {.caption}

| Situation | Explanation and fix |
| --- | --- |
| The number is unchanged after the call | The parameter is a copy; return the result or deliberately use a reference. |
| The function is not found | Check for a visible declaration before the call and the matching definition among the project files. |
| Ambiguous overload | Make the argument type precise or simplify the set of functions and default arguments. |
| Reference to a local variable | The object is destroyed after returning; return your own value. |
| Infinite recursion | Check the base, the valid input and the reduction of the problem on every path. |
| Arbitrary argv without validation | Check argc before indexing, and then the completeness of the numeric parsing. |
