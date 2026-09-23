---
title: "Checking guarantees after a failure"
description: "Topic 6. Debugging and Errors: Checking Guarantees After a Failure"
outline: [2, 3]
sourceHash: "3614cfa47f82731ebfc576137138e7c04231f725da62d51dc10862e8849df58a"
---

# Checking guarantees after a failure

## Checking a guarantee after a failure

For a function that
appends an element
to two
vectors, write down
the invariant: the sizes
are equal, and
positions describe
the same
record. After
success, both
sizes have increased
by one.
After a failure
under the strong
guarantee, both
vectors must
fully match
the original ones.

Checking only
the size is not enough:
an old value
could have changed
without a change
in the number of elements.
Save copies
before the call
and compare
the contents after
catching the exception.
For a teaching
experiment, you can
throw an exception in a controlled way
between the
preparation stages
to check
each path.
This must be
distinguished from
a real allocator
failure, which you must
not present as
measured if
you haven’t
reproduced it.

RAII guarantees
cleanup of temporary
resources during
stack unwinding,
but it doesn’t automatically roll back
an arbitrary
external effect.
An already printed
line, a sent
message or
a modified external
file doesn’t disappear
just because of
an exception. Such
operations
require a separate
transaction
or recovery protocol.

### An expected chain without hidden success

For a date, parse
checks the form,
validate checks the calendar
constraints, and
transform can
create the text
for output.
If parse
returned an error,
validate must
not be called.
You can
check this with a call
counter in
a test version
without changing
the working result.

Or_else is appropriate
when there is a meaningful
alternative: for example,
reading a fallback
format or
adding context
to the error.
Substituting an arbitrary
date such as today
after any
error would hide
invalid
input. Recovery
must be
part of the requirements,
not a way
to get rid of a red
message.

Value_or also
requires caution.
For an optional
scaling parameter,
a default of 1 may
be correct.
For a transfer
amount, a default of 0
after a failed
parse may
turn an error
into a different
operation. In
the final report
you must distinguish
“the user entered 0”
from “the value
was not read.”

### A test matrix for the parser

For a date, the list of tests must
cover the separate causes
of failure, not just
a few random strings.
Syntax and calendar
correctness are independent:
a string may have
the correct ten characters
but a nonexistent day.
Conversely, a person can
understand a date with
slashes,
but a program with
a strict format
must reject
it as a
different protocol.

Table 6.1. Independent classes of test data {.caption}

| Input | Expected | What we check |
| --- | --- | --- |
| `2024-02-29` | success | Divisible by 4, and a leap February. |
| `1900-02-29` | range | A century year not divisible by 400 is not a leap year. |
| `2000-02-29` | success | The exception for divisibility by 400. |
| `2024-04-31` | range | A month with 30 days. |
| `2024-00-10` | range | The month bound is checked before indexing. |
| `2024-12-00` | range | Day 0 is invalid. |
| `2024-2-03` | syntax | Fixed width of a component. |
| `2024-02-03x` | syntax | An extra suffix is not ignored. |

After these tests
pass, you can add
a property-based check:
for each valid
date, generate
the canonical text,
parse it
and compare
the fields. Such
a check covers
many combinations,
but it doesn’t replace
explicit invalid
strings. It
must also
use an
independent way of
obtaining the expected
date; otherwise
the same error
in formatting
and parsing
may go unnoticed.

For expected,
it is important to check
not only the text
of the message, but
the category itself.
A test for
Error::syntax
remains
stable
when the explanations
are translated
into another language.
A separate
interface test
checks
that the category
is correctly
explained
to a person.

Likewise, for
exceptions it is useful
to check the type,
the state after
the failure and
the exit code
of the top level.
A what() message
alone doesn’t
prove that
the data has not
changed.
If an operation
must provide
the strong guarantee,
comparing
the initial
and final
state is
part of
the required
test.
