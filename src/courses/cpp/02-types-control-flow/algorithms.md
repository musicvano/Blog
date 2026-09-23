---
title: "From requirements to an algorithm"
description: "Topic 2. Types, Operators, Control Flow: From Requirements to an Algorithm"
outline: [2, 3]
sourceHash: "c949b7e1266fb82fd5fedf2d476c13fc8b0142c752bf272be08656f9f4370ae4"
---

# From requirements to an algorithm

## How to build an algorithm from the requirements of a problem

A short statement like “calculate the fee” is not yet a complete
specification. You need to define what exactly is entered, in which
units, which values are allowed, where the rate boundaries are,
and how the result is rounded. Only then do you choose
types, conditions, and loops. Otherwise, correctly written code may
solve a different problem than the user expects.

Consider a sample parking lot: the first started hour
costs 20 notional units, each subsequent one costs 15, and the input
is given in whole minutes from 1 to 1440. The word “started”
means rounding the number of hours up. Ordinary
integer division `minutes / 60` is wrong for 61 minutes:
it gives 1, although two hours are charged. For positive
minutes, the formula `(minutes + 59) / 60` gives the required
result. Adding 59 is safe only because a small
upper limit of the input is known.

Let `hours` be the computed number of hours. The fee
`20 + (hours - 1) * 15` separates the first hour
from the rest. Don’t multiply all the hours by 15 and then
add 20: that way, the first hour is counted twice.
Before writing code, it’s useful to fill in a table by hand.

Table 2.1. Tests at the boundaries of the sample rate {.caption}

| Minutes | Hours | Fee and reason |
| --- | --- | --- |
| 1 | 1 | 20: the first hour has started. |
| 59 | 1 | 20: the second hour hasn’t started yet. |
| 60 | 1 | 20: exactly one hour. |
| 61 | 2 | 35: the second hour has started. |
| 120 | 2 | 35: exactly two hours. |
| 121 | 3 | 50: the third hour has started. |

This table checks not the syntax but the interpretation of the problem.
The cases 59, 60, 61 are more important than three random values
inside a single rate interval. For any
threshold condition, use the rule “just
before the boundary, exactly on the boundary, just after the boundary.”
For floating-point quantities, the step near the boundary is chosen according
to the precision of the input data, for example 0.01 UAH or 0.1 km.

### Accumulator, counter, and current value

In a problem with a series of measurements, you need to distinguish three
roles of variables. The current `value` stores one entered
value. `count` counts the accepted measurements. `sum`
accumulates their total. If an entered value is rejected,
don’t increase `count` or add it to `sum`.
Otherwise, the mean will include data that isn’t in the report.

The initial state for a sum is 0, and for a product it is 1.
For a minimum, it is more convenient to accept the first valid
value separately and then compare the following ones. An initial
minimum of 0 gives a wrong answer if all
the temperatures are positive. An initial maximum of 0 is similarly
wrong for an entirely negative series. You can
use the limits of the type, but an empty series still
has to be recognized separately.

A **loop invariant** is a statement that holds
before each iteration and is preserved after it.
For accumulation, it is “sum equals the sum of the count values
accepted so far.” Initially, the statement is true
for an empty set. Adding one validated
value and incrementing the counter preserve it.
When the input ends, it explains why
the total is correct. Such a short proof helps
you find an extra reset of the sum inside the loop.

### The sequence of actions on an error

For an interactive interface, there are two sensible
policies: repeat the prompt or end the program
with a nonzero code. The choice depends on the scenario.
If the program reads a large batch of data from a file,
endlessly repeating the prompt to an already exhausted
stream doesn’t help. If the user enters one
mass by hand, repeating after an invalid token
is convenient. Apply the chosen policy consistently
and describe it in the README.

An invalid state must not partially change the data.
An ATM first checks the amount and the available
balance and then performs the subtraction. The approach
“subtract, check, maybe give it back” creates
unnecessary intermediate states and complicates error handling.
Similarly, before a table loop, you check the limits
and the step rather than printing half of the table before
finding out that the step is zero.

For numeric tables with a fractional step, repeatedly
adding the step accumulates error. If the number of
rows is known, you can compute a point as
`start + index * step`, where `index` is an integer.
Set a maximum number of rows separately.
The condition `x <= end` by itself doesn’t guarantee
that, because of rounding error, the last expected row
will be printed exactly once.

### A state table instead of guesswork

For a menu, it’s useful to write down not only the commands but also
the state transitions. The state of a sample ATM is
the current balance. The view command changes
nothing, a deposit increases the balance only after
checking the limit, and a withdrawal decreases it only if there are sufficient
funds. An unknown command also leaves the state
unchanged. Such a description lets you test
the program even without reading its implementation.

For example, the initial balance is 1000. A command
to withdraw 1500 must be refused, after which
viewing must again show 1000.
If it shows −500, the check came too late.
If it shows 2500, the developer mistakenly
added the amount during the “rollback,” even though
the subtraction never happened. Command sequences
test the relationship between operations,
which isn’t visible when you test each
branch of the `switch` separately.

A random game also has state:
the secret number, the number of accepted
attempts, and the current answer. An invalid
number 11 must not increase the number of
attempts if the problem says so.
Entering 0 ends the game and must not
print “Higher”. The order of checks
in the code must follow this meaning:
syntax, the exit command, the range,
counting attempts, comparison with the target.

### Test report

A useful test table has the columns
“input”, “expected result”,
“actual result”, and “explanation”.
The expected result is written down before
running. Otherwise, it is easy to call
any answer of the program correct.
For invalid input, also state
whether the program repeated the prompt
or exited, and which exit code
it returned. The message “error” alone
doesn’t prove the correct subsequent state.

Don’t limit the report to a screenshot
of a successful run. Record the compiler
switches and the data so that another
person can repeat the check.
For random algorithms, save
the seed and the library version; for
floating-point results, define the comparison
tolerance, and for tables,
the expected number of rows.
The absence of a crash doesn’t equal
a correct answer.

## Checking an algorithm and common mistakes

For each program, prepare three groups of tests: ordinary data,
boundary values, and invalid input. For the sum of the first N numbers,
these can be N=5, N=0, and a negative N. Zero sizes are not always
an error: an empty sum equals zero, but the mean of an empty
set requires a separate decision. The explanation of this difference should
come before you write the division in code.

Table 2.2. Sources of errors in simple algorithms {.caption}

| Error | Consequence and fix |
| --- | --- |
| `sum / count` for integers | The fractional part is lost; convert an operand before dividing and check `count != 0`. |
| `=` instead of `==` | The state changes instead of being checked; read the `/W4` warnings and use meaningful conditions. |
| Only `cin.clear()` | The invalid text stays; discard the rest of the line, and handle EOF by exiting. |
| Unchecked loop step | A zero step or a step with the wrong sign can cause an infinite loop; check it before starting. |
| Checking after overflow | Undefined behavior has already occurred; check whether the operation is possible before performing it. |
| Format width as a limit | A number that is too large isn’t truncated; validate data independently of the presentation. |
