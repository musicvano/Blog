---
title: "Diagnostic experiments"
description: "Topic 5. Pointers and Memory: Diagnostic Experiments"
outline: [2, 3]
sourceHash: "dba10ec4f1881a564ed74d4f9238e54af5cd180653e3d069a9c3e8e8ee6ed0cc"
---

# Diagnostic experiments

## A buffer experiment: before and after release

A manual dynamic array
has at least three separate
characteristics: the buffer address,
the number of constructed elements
and the capacity. In a simple
`new int[n]` these numbers
often coincide, but in
a vector, size can be
less than capacity.
You cannot carry over
the rule “memory is allocated”
to the claim “an object
already exists at every position
and can be read.”

After delete[], the variable p
may hold the same
numeric representation of the address.
The Memory window may even
show the old values.
However, the right to access
these objects has already been lost.
The next allocation may
reuse the region,
and an old write will corrupt
a different object.
That is why the test “read
the old number without a crash”
doesn’t prove safety.

Table 5.2. A copy of an address is not a copy of a resource {.caption}

| Operation | State after it |
| --- | --- |
| `p = new int[3]{}` | p owns three zero ints; valid indices are 0–2. |
| `q = p` | Two address variables, but the model must define a single owner. |
| `delete[] p` | The objects are destroyed; neither p nor q gives access to them anymore. |
| `p = nullptr` | p is empty; q still holds the old address. |
| `delete[] q` | Double free; an invalid action. |

C strings add
one more condition: a
terminating null must exist in
the accessible buffer. If you
copy exactly the five
letters of Hello into five
cells, it is not yet a
null-terminated string.
Printing through a string API
may read further,
looking for a null in
someone else’s memory.
That is why capacity must
account for the
terminating character too.

## How to run a diagnostic experiment

Deliberately incorrect code
must be kept separate from
the working example. Save a
copy, note the expected
defect type and run
it with diagnostic
options. One experiment
should contain one defect:
out-of-bounds access, use
after free or
a mismatched allocation
and release pair. If
you combine all three,
the program may terminate
on the first one and never
reach the others.

For heap-buffer-overflow
you need to show the size
of the allocation and the index
of the invalid access.
For heap-use-after-free,
the allocation site, the release site
and the subsequent read.
For a mismatch between new[]
and delete, both
operations and the type
of the resource. Save
the report text or
a real screenshot, but
don’t replace it with
the expected message.

After the fix,
repeat the same
scenario, then an ordinary
one and a boundary one. If
the “fix” merely
removed the problematic
line along with required
functionality, the task
is not done yet.
A safe version
must preserve
the correct result
and have a clear
release of resources.

A leak report and an ASan report
are not interchangeable.
Don’t assume that
every implementation of
AddressSanitizer automatically
finds all leaks.
In MSVC, for a teaching
demonstration of a leak,
use the CRT Debug Heap described
above and
check the moment
the report is obtained.
An object that still
has a valid owner
is not necessarily
a leak.

## Removing a node without breaking the chain

In the list head→A→B→C
you need to remove A.
If you simply reset
the head, A’s owner
will also destroy B,
and B will destroy C. This is
correct for clearing
the whole list, but
not for removing
a single element.
First you need to
transfer ownership
of the rest of the chain
to the new head.

The safe sequence
in the example uses
a separate removed.
After the first move,
removed owns A and
head is empty.
After the second, head
owns B, and the next
of node A is empty.
At the end of the block
only A is destroyed.
Such an intermediate
variable makes
the order of lifetimes
obvious.

To clear a very
long list,
repeat this step
in a loop until
head becomes
empty. Each
iteration destroys
one node without
recursively destroying
the whole tail.
For a tree, the analogous
task is harder:
you need to explicitly
store the subtrees
that haven’t been
processed yet.

### Checking a resource transfer between owners

Imagine the inventories of two players.
An item belongs to exactly one
of them, so it is stored
via unique_ptr. The transfer
operation must have defined
behavior when the recipient’s slot
is already occupied. If you first
move the source and then
check the limit, you may lose
the initial state. First
check whether the operation is possible,
then perform the transfer.

After success, the source must
be empty, the recipient
must contain the same
item, and the item’s non-owning
identifier
must not change.
After a refusal, both
owners remain
in their initial state.
These properties can
be checked without knowing
a specific address
in memory.

If the recipient’s collection
is a vector, appending
may require
a memory allocation.
Correctness when
an allocation fails
is a separate question
of exception safety,
which we will consider
in the next topic.
A smart pointer
protects a resource from
leaking, but the consistency
of several collections
requires a well-thought-out
order of operations.

For a shared resource
the scenario is different:
adding to the second
playlist must not
remove the song
from the first. That is why
a shared_ptr is copied
rather than an exclusive
owner being moved.
After one list
is cleared,
the song continues
to exist while
there is a second owner.
This is not a “slower
unique_ptr” but
a different lifetime model.

Observation through
weak_ptr also
needs tests.
Check lock
while the owner
exists, after
one of several
owners is destroyed and
after the last one
is destroyed. Only
the last case
should give an
empty result.
Don’t use
use_count as a
substitute for this
interface.

In a memory
report, separate
measured facts
from assumptions.
“ASan did not report
a defect on
such-and-such tests”
is a verified
statement.
“The program never
has memory
errors” doesn’t
follow from
a single run.
Combine tests,
code reading
and an ownership
diagram.
