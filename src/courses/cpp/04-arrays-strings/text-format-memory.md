---
title: "Text format and memory"
description: "Topic 4. Arrays, Strings, vector: Text Format and Memory"
outline: [2, 3]
sourceHash: "3032f51416667931cef8f892c69ca47e01ebae2559e08e8f83d2c89bdd387bf0"
---

# Text format and memory

## Designing a text format

Suppose one line contains
`name;score`. Before
writing `find(';')`,
you need to decide
whether a name can be
empty, contain
a semicolon or
leading spaces.
For a simple teaching
model you can require
a non-empty ASCII name
without the delimiter and
an integer score 0–100.
Then the line must
have exactly one
semicolon.

The order of checks:
find the delimiter,
check that it is present,
look for a possible second one,
extract the fields, check
for emptiness, parse the
number completely, check the
range. If you first
execute `substr(separator + 1)`
without a check,
the value `npos` can
break the logic of the
indices. Each stage
has a clear reason
for rejection.

For CSV with quotes
you need to remember
the state “inside a
quoted field”.
A comma in this state
is part of the text,
not a delimiter.
A double quote can
mean the end of the field
or an escaped quote,
depending on the next
character. Unclosed
quotes at the end
of a line are an error,
not a reason to
silently accept
part of the record.

### Ownership of parsing results

If the fields are needed
only for processing
the current line,
views allow you to
avoid copying.
But if the records
are stored in a
long-lived vector,
the next `getline`
will overwrite the buffer.
Then the fields must
become owning
strings or have
another owner whose
lifetime is
explicitly guaranteed.

Returning a vector of
string_view from a function
that created a local
string is dangerous
even if a test
once showed
the correct words.
The memory may still
contain the old bytes,
but the object no longer
exists. The sign
“the text is visible
in the debugger” is not
proof of a valid
lifetime.

## Memory and size limits

A user-supplied number
of elements must be
limited before creating
the vector. If a negative
integer is converted to
size_t, it can
become a huge
positive value.
First check
the signed input against the
allowed range,
and only then
convert it
for indexing.

For a matrix you check
not only the rows and
the columns separately,
but also their product.
Two valid
sizes of 100000 each
can mean
ten billion
elements. The upper
limit on the number
of cells must
match the problem
and the capabilities
of the environment.

Reserving a large
capacity is not
free, even
when size stays 0.
Do not call reserve
before every push_back
with a new exact
capacity: this way you can
lose the benefits of
geometric growth.
If the approximate final
count is known,
one reasonable
reserve is enough;
otherwise let
the vector manage
its buffer.

### Checking bounds in a booking example

The user sees rows 1–3 and seats 1–4,
while the array has indices 0–2 and 0–3.
First check both entered
coordinates, then subtract 1.
If you convert a negative row
to size_t before the check, it
can become a large positive
number. Checking only the upper
bound after such a conversion
will complicate diagnostics and will not
fix the wrong order of actions.

The booking operation has two
different failures: the coordinates
are invalid, or the seat is already
taken. The first must not
read the matrix at all.
The second reads a valid cell
but does not change the state.
A successful action changes exactly
one cell from false to true.
Repeating the same action
must not increase the number
of taken seats a second time.

An independent total can be
recomputed by traversing the whole
matrix after a series of commands.
If the program also keeps
a counter of taken seats,
both results must
match. Such a check
detects errors in updating
the counter that are invisible
in a single snapshot of the map.
Canceling a booking
requires symmetric checks:
the coordinate exists, the seat
was taken, after
success it is free.

When adding a list of
customer names, you should not
keep parallel
matrices of states, names and
prices without an explicit link.
A Seat structure can
contain all fields of one
cell, and the matrix can hold
such structures. Then
cancellation clears a consistent
record rather than leaving
an old name on an already
free seat.

This example shows
that a container solves
the question of storage, but
the invariants of the problem
domain are defined by the author
of the program. The correct
type vector or array
does not prove the correctness
of the booking. You need
clear preconditions, state
changes and checks
after each operation.

### A practical protocol for checking a collection

Before running a large data set, check
a small set that you can read completely.
For a vector of records these are three different records
and one duplicate. Add an element at
the beginning, in the middle and at the end; after
each action print all records
with their indices. Then remove them
in reverse order. If the program
supports its own identifiers, make sure
that they do not change along with the positions.

An empty vector must be checked
separately rather than considered “the
same case with zero iterations”.
The loop may indeed not execute,
but access to `front`, `back`
or element 0 before the loop
will already be an error. Likewise,
the minimum of an empty set is not
obtained automatically from a variable
initialized with zero. The interface
must explicitly report the absence
of a result or forbid empty
input by a checked precondition.

For string views, a useful
test is not only “is the word
printed correctly” but also
“who owns these bytes
at the moment of printing”. Draw
the owning string and all
views of it. At
each append, assignment
and exit from a block,
check whether the views
remain valid. This
analysis often finds
a defect earlier than
a random test.

Checking `capacity()` in
the debugger is a way
to observe the implementation,
not a condition of the algorithm’s
correctness. Do not write
a test that requires
exactly capacity=8
after the fifth addition
if the program has no
such guaranteed
precondition. Check
size, the values and
the public guarantees of the
container. This is exactly what
allows the same
code to work after
a library update.

The last step is to repeat
the tests after formatting
the output. A table can
look neat but
show the wrong
record after sorting.
Compare the link between
the name, the identifier
and the value, not
only the number of
rows or the width of
the columns. The presentation
of the result should
support checking the
content, not hide
errors of the model.
