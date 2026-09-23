---
title: "Case studies and common mistakes"
description: "Topic 8. Copy, Move, RAII: Case Studies and Common Mistakes"
outline: [2, 3]
sourceHash: "f7249af70008a24ca09e211d5017fb9553ae971820148951487cd26dd4b14145"
---

# Case studies and common mistakes

## Checking the owner of a resource

For a class with a buffer, test an empty object, the independence of a copy,
assignment between different sizes, self-assignment, move construction, move
assignment, and reuse of the source. If the contract promises an empty source,
test exactly that promise.

A zero size needs attention: do not perform arithmetic on a null pointer even
in a seemingly empty range. In the examples, copying is performed only for a
positive size, and element access checks the index. For a matrix, check the
product of the dimensions before allocating memory.

`assert` checks detect logic errors in particular scenarios. They do not prove
the absence of all leaks and do not automatically simulate a failure of `new`.
For a deeper experiment, add a controlled allocation failure point or a memory
analyzer; distinguish the results of such an experiment from an ordinary run
with small arrays.

The best final check of the design is whether you can replace the manual buffer
with a `vector` without changing the public interface. If so, the domain logic
is separated from the ownership details, and the rule of zero becomes a natural
conclusion of the training example.

## A step-by-step audit of assignment for an owned buffer

Suppose `a` owns three elements and `b` owns five. For `a = b`, you must not
first free the buffer of `a` and only then try to obtain a new one: if the
allocation ends with an exception, the old value is already lost. This may be
acceptable only with a clearly stated weaker guarantee, but in a short training
implementation it is simpler to provide a stronger one.

Copy-and-swap splits the operation into preparation and commit. First, `temp`
is created as an independent copy of `b`. At this point, `a` and `b` are
unchanged. Then a non-throwing `swap` hands the new buffer to `a`, and the old
buffer of `a` moves into `temp`. Finally, the destructor of `temp` frees the old
resource. No one has two obligations to free the same address.

For `a = a`, the temporary copy is also independent: the new buffer is created
before the old one is freed. A separate address check can save a copy, but it is
not required for the correctness of this implementation. Self-move is a
different situation: nulling out the source and freeing the target concern the
same object, so the example has an explicit `this != &x` check.

During an audit, it helps to label each address mentally: P belongs to a, Q
belongs to b, R belongs to temp. After the swap, a becomes the owner of R, temp
owns P, and Q stays with b. After the assignment completes, P is freed, and R
and Q are alive. This simple bookkeeping detects a double free more precisely
than looking only at element values in the debugger.

## A scenario matrix for the rule of five

Testing special member functions must cover not only sizes but also the
relationship between the source and the target. Different objects and a single
object carry different risks. An empty resource adds one more dimension to the
testing.

| Action | Initial state | Check after the action |
| --- | --- | --- |
| Copy constructor | Non-empty source | Data equal, storage independent |
| Copy assignment | Different sizes | Old target freed, source unchanged |
| Self-copy | The same object | Value and invariant preserved |
| Move constructor | Non-empty source | Resource in the target, source per contract |
| Move assignment | Target already has a resource | Target’s old resource freed exactly once |
| Self-move | The same object | An explicitly stated valid state |
| Copy empty | Zero length | No access to a nonexistent element |

To check independence, it is not enough to compare two arrays right after
copying: a shallow copy produces equal values too. You need to change one copy
and check the other. For an RAII token, it is the opposite: copying must be
unavailable at compile time, and a move must leave only one active owner.

Lifetime tests must not read already freed memory “to check.” Instead, observe a
safe external counter or an ownership log that outlives the objects under test.
Do not call the absence of a crash proof: undefined behavior can appear to
succeed by accident.

## How to choose a resource for an RAII wrapper

An RAII lesson does not require a dependency on the operating system. Temporary
access rights to training hardware can be modeled with an index in a pool and a
Boolean busy state. The constructor checks that a slot is free, and the
destructor returns the index. A real system handle adds the rules of a
particular API but does not change the basic idea of an owner.

The move contract of such a token must include whether the source is active.
After the transfer, the source must not return the same index to the pool. That
is why the source is put into an inactive state, and the destructor checks the
active flag. In move assignment, the target first returns its own old resource
and then accepts the new one.

The lifetime of the pool itself is checked separately. If a token stores a
reference to the pool, the pool must outlive it. RAII does not automatically
eliminate the problem of a dangling reference to an owner at another level. A
possible solution is an outer scope for the pool, inside which all tokens are
created; other models need a different explicit ownership mechanism.

For a local transaction, the resource is the right to decide whether to keep a
change. The guard has an initial snapshot and a commit flag. If an operation
involves several numbers, rolling back one data member may not be enough: the
whole invariant must be restored together. In a transfer between accounts, this
includes the sum of the two balances. In this way, the notion of a resource
connects with the domain contract instead of being reduced to a new/delete pair.

## What value should remain after a move

For our own string, we chose a strong and simple promise: the source becomes
empty. This promise does not follow from the T&& syntax itself. The author of a
class could leave a different valid state if it is clearly described and the
destructor can safely end its lifetime. It is the contract that determines what
the test must check.

For a standard container, do not check a specific capacity after a move unless
the documentation promises it. Even if an observation with one compiler shows
zero, that does not turn an implementation detail into a portable property of
the program. Instead, assign a new value to the source and check that it keeps
working.

Using a source after a move is not always an error. An error occurs when code
relies on the old value or violates the precondition of an operation. Calling
empty may be allowed, while accessing the first element without checking for
emptiness is not. A warning analyzer helps find a suspicious spot, but the final
decision relies on the contract of the type.

## Checking the strong guarantee without triggering undefined behavior

For copy-and-swap, the failure point is creating the temporary copy. If the new
buffer is not obtained, swap has not been called yet, so the target is
unchanged. This is a logical justification of the execution path. An ordinary
test on a small array does not force the system to return bad_alloc and must not
claim that this path was actually executed.

In an advanced exercise, you can add a controlled training counter that throws
an exception before the allocation of a particular copy. The test then first
saves the value of the target, activates the failure, performs the assignment,
and checks equality with the snapshot. This is not a test of a real
out-of-memory condition, but it checks exactly the chosen failure path.

Do not simulate an error with a double delete or a write after free. Such
actions are undefined behavior themselves, so the test result has no reliable
meaning. To check the number of releases, use a safe external counter or a
specialized tool that observes a correctly executing program.

## From a local guard to a composite operation

A single transaction can change several data members. For example, a transfer
debits money from one balance and credits it to another. If you save a snapshot
of only the first one, a rollback after the credit will not restore the system
total. First define the complete invariant, and then the set of states that must
be restored together.

For two integers, a snapshot is cheap and restoring it does not throw. For two
large containers, a snapshot can be expensive and can fail by itself. It is
prepared before the originals change. The commit must be short and non-throwing,
for example a swap of the prepared states with temporary objects.

After commit, the new state is final within this local model. If printing a
report follows and fails, that is not necessarily a reason to roll back the
domain operation. Define the boundary of the transaction: what belongs to the
atomic change, and what is only a message about an already completed result.
