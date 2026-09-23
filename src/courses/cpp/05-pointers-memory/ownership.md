---
title: "Ownership models and span"
description: "Topic 5. Pointers and Memory: Ownership Models and span"
outline: [2, 3]
sourceHash: "eaa1512e9dcc74aa9b6e1708df8f00997db90ee16c4019ac384c177172d7ac43"
---

# Ownership models and span

## A non-owning interface and span

A C++ Core
Guidelines rule: plain
raw pointers
usually denote
non-owning access.
If a function takes
`const Node*`, it
may read the node,
but it must not
delete it without a
separately defined
ownership contract.
Passing a unique_ptr
by value, in contrast,
expresses a transfer of
exclusive ownership.

`std::span<T>` from
`<span>` combines
the address and length
of a sequence without
owning it. It is
more convenient than a
pointer/size pair,
but it also doesn’t
extend the lifetime.
A span over a vector’s
buffer stops
being valid after
reallocation. Its
presence doesn’t make an
arbitrary index
correct automatically.

## Choosing an ownership model

First ask
whether a separate
dynamic allocation is needed.
An ordinary local
structure is often
enough. If
you need a sequence,
choose vector.
If a single object
must be passed
between owners,
choose unique_ptr.
If independent
parts of the system
really must
jointly extend the
object’s lifetime,
consider shared_ptr.

An observer must not
accidentally
become an owner.
For example, a reference
from a child tree node
to its parent
can be a raw
non-owning pointer
if the parent is guaranteed
to live longer. If
the parent is managed by
shared ownership
and can disappear
independently, you need
a weak_ptr. You cannot
create a weak_ptr
without a shared owner
from a raw address alone.

Testing ownership
also checks
removal and transfer,
not just creation.
Create an empty
list, one node,
several nodes;
remove the first,
the last and all of them.
After each action,
check the accessible
data and the absence of
an extra owner.
Run the sanitizer
on the same
scenarios, but
don’t treat it
as a substitute for the model.

## Analyzing an ownership graph in concrete scenarios

Consider a document directory. There is one root directory;
it contains child directories, and those contain lower ones. If
the root is destroyed, its whole subtree must disappear too.
This requirement naturally corresponds to unique_ptr for
child nodes. Each node has exactly one
parent owner. The back link from a child
to its parent is needed for navigation, but it must
not keep the parent from being destroyed.

On the diagram, draw a solid arrow for
ownership and a dashed one for observation.
Then mentally remove each external
owner and determine which objects will disappear.
If a closed cycle of solid
shared arrows remains, the counters won’t reach zero.
If an observer is used after
its target has disappeared, the model has a
lifetime violation. These are exactly the questions you need
to answer before writing delete.

Table 5.1. Choosing a type by object lifetime requirements {.caption}

| Requirement | Suitable model |
| --- | --- |
| A single local record | An ordinary object by value; no separate allocation is needed. |
| A sequence of values | vector owns the elements and the buffer. |
| A child belongs to one parent | unique_ptr to the child, non-owning access back. |
| A song is needed by two independent playlists | shared_ptr to the shared song. |
| A list of recent resources must not keep them alive | weak_ptr with a lock check. |
| A function temporarily reads a range | span or a const reference with a valid owner. |

Shared ownership doesn’t mean that every
function must take a shared_ptr.
If a function only prints the title
of a song during the call,
`const Song&` is enough. A shared_ptr parameter
by value is appropriate when the function
must keep its own share of ownership.
Otherwise the interface needlessly ties
simple reading to a specific way of
managing memory.

Likewise, `unique_ptr<T>&` means
that the function can change the
owner itself, for example replace the head
of the list. `T&` means access to an
existing object without transferring
ownership. `unique_ptr<T>` by
value means that the caller
hands over the resource. The difference between
these interfaces matters more than
the number of characters in the signature.

### What a move actually changes

Let `first` own a node,
and let `observer=first.get()` read
it. After `second=std::move(first)`,
the node doesn’t necessarily change its address:
what has been transferred is responsibility for it.
first is empty, second is the owner, and
observer may remain valid
until second destroys
or replaces the resource. This
explains why moving unique_ptr objects
in a vector doesn’t move the
dynamic tree nodes themselves.

But if `second` already owned
another node, the assignment destroys
its previous resource. Observers
of second’s old resource become
dangling. That is why the phrase “move
doesn’t change the address” without clarification
is dangerous: you need to ask
which object and which
owner we are considering.

`std::move` by itself doesn’t perform
a magical copy of bytes and
doesn’t release memory. It
lets the compiler choose an operation
that can take the resource.
For unique_ptr the rules
are unambiguous, and for your own
types the corresponding behavior
is defined by their implementation.
A detailed study of these
operations belongs to Topic 8.
