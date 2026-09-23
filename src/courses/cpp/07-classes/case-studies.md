---
title: "Case studies and common mistakes"
description: "Topic 7. Classes and Objects: Case Studies and Common Mistakes"
outline: [2, 3]
sourceHash: "38e4de811415cf756b7e71bce24d9567693950762df2362e352082897c805769"
---

# Case studies and common mistakes

## Reference lifetime, member objects, and failed construction

Constness does not guarantee a long lifetime. A member function that returns
`const std::string&` can be safe for reading while the owner is alive. If the
owner is destroyed, the reference becomes dangling even though it is constant.
If the internal container is rebuilt, a reference to one of its elements can
also become invalid. The contract of a read member function must describe not
only the right to modify, but also the limits on using the result.

Returning a small value, for example `int balance() const`, does not tie the
user to the internal storage. Returning a copy of a string costs more, but it
also decouples the lifetime of the result. Returning a constant reference can be
justified for large data if the user understands the lifetime. In introductory
models, prefer a simple contract to optimization.

If the third data member could not be constructed, the first and second were
already complete and will be destroyed in reverse order. The body of the outer
object’s constructor may not have started running yet. That is why it is
dangerous to expect the outer destructor to fix any resource allocation error in
the initializer list. The owner must be a data member with its own correct
destructor, for example `unique_ptr`.

For the nested `Engine` and `Car`, the sequence in the example is part of the
language rules. For two independent local cars in the same scope, the one
created later is destroyed first. However, do not turn this into an implicit
system of dependencies between global objects in different files: their
initialization follows additional rules, which are covered when organizing
multi-file programs.

## Checking an interface with a contract table

Before implementing, write down the precondition, the result, and the state
after a rejection for each operation. For an account, this table separates the
allowed zero balance from the disallowed zero amount of an operation.

| Operation | Precondition | Result or rejection |
| --- | --- | --- |
| `BankAccount(0)` | Balance within limits | A valid empty account |
| `deposit(0)` | The amount must be positive | Rejected; balance unchanged |
| `withdraw(balance)` | Positive balance | Zero balance remains |
| `withdraw(balance+1)` | Insufficient funds | Rejected before assignment |
| `balance() const` | The object is alive | A copy of the number; state unchanged |

The table reveals ambiguities even before the tests. For example, should
`withdraw(0)` be a successful no-op or an error? Both contracts can make sense,
but arbitrarily changing the answer from one member function to another makes
the API hard to use. In our example, zero is rejected explicitly. At the
defense, you need to explain the rules you chose, not just list the names of
the access specifiers.

## The boundary between a constructor and user input

Two different errors are possible when reading a number. The text may not
convert to a number at all, or the number may break a domain rule. The input
layer rejects the string `abc`, while the constructor rejects the number -5 as
an initial balance. If you mix these responsibilities, the class becomes
dependent on a particular terminal and hard to test automatically.

The console interface can repeat the prompt after a rejection, but the
constructor must not wait for the next line itself. Its job is short: either
create a ready value or report why it cannot be created. Later, the same
constructor may be called by a test, a graphical interface, or a file reader.
In all cases, there is only one domain check.

A similar separation applies to formatting. The account returns the balance,
and the outside code chooses whether to show kopiykas or hryvnias with two
decimal places. A `print()` member function can be convenient in a first
exercise, but it must not be the only way to get the result: checking the number
would then require parsing already printed text.

For a lab project, it is useful to create three separate blocks: reading a
command, the domain operation, and presenting the result. They may stay in one
file at first, but they have different responsibilities. Splitting the code
into `.h` and `.cpp` only physically shapes the interface; by itself, it does
not provide such a design.

## When an accessor grants too much freedom

Suppose a library stores a list of borrowed books and checks that there are no
more than three of them. A `books()` member function returning
`std::vector<Book>&` would let a client push_back a fourth element without any
check. Formally, the data member remains private, but the invariant is no
longer protected by the public interface.

A constant reference removes the direct ability to modify the container through
this path, but it leaves the question of lifetime and iterator validity open. A
copy of the list decouples the result, but it costs a copy. A dedicated
operation `hasBook(id)` gives only the answer that a particular client needs.
The choice depends on the scenario, not on an automatic rule that “every data
member needs a getter.”

For a small training model, it is better to start with the simple operations
count, contains, and report. If a real need to iterate over the elements
arises, the contract can be extended deliberately. This keeps the option to
replace the vector with another structure later without rewriting all its
users.

## A review case: an initialization error

Suppose a class stores `capacity_` and then a container whose size depends on
the capacity. If the container is declared first, the attempt to use capacity_
to create it happens before capacity_ is initialized. Reordering the entries
after the colon does not fix this: the declaration order of the data members
sets the order.

The first way to fix it is to make the order of the data members match the
actual dependency. The second is to use the already validated constructor
parameter instead of relying on a member that is not ready yet. If validating
the parameter is complex, you can move it into a helper function that returns
only an allowed value or throws an exception.

In a report, it is not enough to write “the initializer list is more
efficient.” You need to explain that initialization and assignment are
different operations, that a const data member cannot be assigned later, and
that a data member of class type already exists before the constructor body.
This is a semantic difference, not just a potential optimization.
