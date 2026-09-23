---
title: "An error-handling strategy"
description: "Topic 6. Debugging and Errors: An Error-Handling Strategy"
outline: [2, 3]
sourceHash: "cbdac6bd7ab0f5f9f58ff05aec6350b4c31f6e4ce26c711b2e2853b05650d34c"
---

# An error-handling strategy

## Choosing how to report an error

An exception is appropriate
when the ordinary
result cannot
be obtained,
and the handler
is located higher up
the stack. Expected
is appropriate when
a failure is a
visible part
of the result type
and the caller
must resolve
it locally.
Optional is appropriate
when the absence
of a value doesn’t
require a diagnostic
reason.

Don’t claim that
one approach is always
faster. The cost
depends on the
frequency of failures,
the sizes of the types,
the compiler and the
organization of the code.
You need to measure
a specific scenario,
not an empty
function that doesn’t
reflect the program.

At the boundary of a library
or a module, the rules
must be documented:
which exceptions may
escape, which error codes
are returned,
and what remains
unchanged after
a failure. Don’t
turn any
exception into
an arbitrary zero
if zero is
a valid result.

C++26 contracts
describe preconditions,
postconditions and
assertion checks
through mechanisms
such as pre,
post and contract_assert.
This is an overview of how the
language is evolving, not
a confirmation of
MSVC support. In this
course, for the current
toolset,
explicit checks
and assert
are used;
the contract syntax
is not part of the
required programs.

## Systematically searching for the cause of a defect

In a large program, an incorrect result may
appear far from the place where the data was corrupted.
That is why setting a breakpoint only on the last
println is often not enough. Identify the stages:
reading, parsing, validation, computation, saving,
formatting. At the boundary of each stage, compare
the state with the expected one. The first boundary where the state
is wrong narrows down the search area.

For example, a final average grade of 0 may
have several causes: no records were
read, the sum is reset in the loop,
integer division discarded the fraction, or
a different variable is printed. Checking
only the final value doesn’t distinguish
between these causes. First look at
the size of the collection, then the sum, then
the type of the division, and only then
the string format.

During an experiment, change
one hypothesis at a time. If you simultaneously
replace the type, the formula and the test,
a successful result won’t explain
which change eliminated the defect.
After the fix, return
to the original reproducible
test and check the neighboring
edge cases. It is the
original test that becomes
the regression evidence for the fix.

### Debug and Release as different observations

In Debug, a local variable
may remain available
for inspection longer
than in an optimized
build. The Release
compiler may keep a
value in a register,
combine computations
or eliminate an unneeded
variable. A debugger
message about
an unavailable value
doesn’t mean that
the variable itself was
uninitialized.
You need to
distinguish this from
a real lifetime
defect.

If the behavior
changes between
configurations,
don’t conclude
“the optimizer broke
correct code”
without evidence.
First check for
out-of-bounds access,
dangling references,
signed overflow
and side effects
in assert.
These are common
reasons why
one
configuration
merely hides
an error of another.

## Designing failure messages

A message should help the user
fix the input, and the developer find the cause.
For a date parser, the useful details are the error category,
the position and the expected format. For
an insufficient balance, the requested amount
and the available balance. At the same time,
the text must not contain
accidental secrets or a full
password just because
it was a function argument.

An error code and a text
have different roles.
The program can make
decisions based on `Error::range`,
while the user sees
a localized explanation.
Don’t parse the what()
string as a stable
machine protocol:
its wording
may change.
A type or an enum
expresses the category
better for
further logic.

A custom exception
is needed when
the caller must
distinguish a special
situation or
receive additional
fields. A simple
type derived from
runtime_error lets you
keep the standard
what() and at the same time
have a separate catch.
Don’t create
a new class for
every message
if the reaction
to all cases
is the same.

A general catch
at the top level
can turn
an unhandled failure
into a controlled
exit code.
But it must
not continue
operations with
a partially modified
state if
the invariants are not
guaranteed.
“Caught” doesn’t
mean “recovered.”
