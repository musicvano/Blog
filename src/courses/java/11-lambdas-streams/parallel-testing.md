---
title: "Parallelism and testing a pipeline"
description: "Topic 11. Lambdas and the Stream API: Parallelism and testing a pipeline"
outline: [2, 3]
sourceHash: "ac4afee7bb1bf96e74bc744cd0a1a71fc57f2b9b38be8b397b690f3e202dce5e"
---

# Parallelism and testing a pipeline

## Parallelism, errors, and debugging

`parallelStream` does not guarantee a speedup. Splitting, scheduling, and merging have overhead; a small data set or blocking I/O may run slower. The gain is verified with a representative measurement after the JVM has warmed up.

The side effect `result.add(x)` on an ordinary ArrayList from a parallel forEach is incorrect. A collector provides separate accumulators and merge rules. `forEachOrdered` preserves encounter order but may limit the parallel gain. `findAny` does not promise the very first element; if that is part of the contract, use findFirst and take the source order into account.

An exception inside a lambda aborts the pipeline. Do not turn all exceptions into null: that hides the cause and creates new errors later. For expected invalid lines, it is better to get an explicit parse result with the line number, and for an operational failure, let a defined program boundary handle it.

## The pipeline contract and equivalence testing

Before building a long pipeline, write down the type after each step. For example, a list of orders becomes a stream of orders, then a stream of line items, then product–quantity pairs, and finally a map of sums. If the variable is still called orders while it already contains product names, it is harder for the reader to verify the logic. A short domain method is often better than a nested lambda.

A pure transformation is easier to test: the same input gives the same result and does not modify the source. Parsing, the current time, randomness, and file access are better moved to the program boundary or passed explicitly as dependencies. This is not a ban on side effects but a way to define the place where they are expected and controlled.

For an important algorithm, it is useful to have a simple reference implementation with a loop in the test. It should not literally repeat the pipeline: the goal is to independently check the sum, the order, and the emptiness policy. Comparing on several small data sets with duplicates often finds bugs that go unnoticed in a large random example.

For fractional numbers, parallel regrouping of addition can change the last bits of the result, because machine addition of doubles is not mathematically associative. A check should use a tolerance justified by the domain task. For money, the examples use whole cents, but overflow still has to be controlled there too.

You should not test a required number of calls to peek or to a side-effecting function if the stream contract allows optimization. Instead, check the observable result. If calling an action for every element is itself a requirement, for example writing every line, put that action into a terminal operation with the required order and handle its errors explicitly.

| Situation | Question for the contract |
| --- | --- |
| Empty source | Is the result an empty list, an Optional, or an error? |
| Repeated key | Do we reject it, add it, take the first, or take the last? |
| Equal values | Which second key defines a stable report? |
| Short window | Do we accept an incomplete window? |
| Parallel execution | Is the merge associative, and is there no shared state? |

Finally, readability matters more than the number of dots in an expression. If a pipeline needs several try/catch blocks, complex external state, and conditional termination that returns a partial report, an ordinary loop may show the policy better. The Stream API is a tool for expressing transformations, not a mandatory style for every task involving a collection.

::: info Screenshot
In IntelliJ IDEA, show a custom functional interface, an anonymous implementation, and the available replace action. The code must come from a working training project, not a drawn mockup.
:::

Figure 11.7. Converting an anonymous class to a lambda {.caption}

::: info Screenshot
Show debugging of filter–map–limit in IntelliJ IDEA. If your IDE version does not have Stream Trace, use ordinary breakpoints in the lambdas and label this approach explicitly.
:::

Figure 11.8. Observing the elements of a pipeline {.caption}
