---
title: "Choosing a model and common mistakes"
description: "Topic 7. Data classes, enums, sealed: choosing a model and common mistakes"
outline: [2, 3]
sourceHash: "b31ab7c49a2e31cb8b10ca6af2475ca10baa3e7998563a913be34867091fbf38"
---

# Choosing a model and common mistakes

## Model selection matrix

Table 7.1. Choosing a construct by its contract {.caption}

| **Need** | **Type** | **Example** |
| --- | --- | --- |
| Many values with the same structure | data class | Book |
| Fixed constants in one set | enum class | Planet |
| Closed alternatives with different data | sealed interface | OrderStatus |
| A single marker without data | data object | Created |
| A distinct type around one value | value class | UserId |
| Controlled creation | companion object | User.create |

These constructs can be combined. A sealed interface can have data subtypes, one of which contains a value identifier and an enum category. Combining them is appropriate when each type reduces ambiguity. Do not wrap every number if you cannot explain the wrapper's meaning in one sentence.

For a state hierarchy, draw the allowed transitions first. Determine which data each state needs, which actions are allowed, and what failure returns. Then choose data classes and data objects. A list of classes without transitions is not yet a complete lifecycle model.

## Checks and common mistakes

For a data class, test equality of identical values, inequality of different ones, consistent hashes, copy with a changed parameter, and the independence of parts that should be independent. Check body properties separately: should they really have no effect on equality?

For an enum, traverse all entries and check every when branch, an unknown name, and input case. For a sealed type, create one value of each subtype and test transitions that should be prohibited. Do not rely solely on when compiling: branch formulas can also be wrong.

For an object and a companion, check how state affects successive calls. A counter, time, or randomness makes results depend on order. In an educational example, pass initial data explicitly or run the scenario in a new process. Do not add a public reset to the domain API solely for a test.

The most common mistakes are a `var` in a map key, expecting a deep copy, using ordinal as a business code, an else that hides a new sealed variant, a global mutable object without an owner, and assuming boxing never occurs. In every case, the remedy begins with clarifying the contract.

## Behavior of individual enum constants

An enum can describe not only data but also a small closed set of strategies. Each constant implements an abstract method, and the client calls it through the enum type. This is appropriate when the set of actions is known at compile time and is not loaded by the user as a plugin.

```kotlin
interface BinaryOperation {
    fun apply(a: Int, b: Int): Int
}

enum class Operation : BinaryOperation {
    ADD {
        override fun apply(a: Int, b: Int): Int = a + b
    },
    MAX {
        override fun apply(a: Int, b: Int): Int = maxOf(a, b)
    };

    abstract override fun apply(a: Int, b: Int): Int
}

fun main() {
    for (operation in Operation.entries) {
        println("${operation.name}: ${operation.apply(7, 3)}")
    }
    val selected: BinaryOperation = Operation.MAX
    println(selected.apply(-2, -5))
}
```

```text
ADD: 10
MAX: 7
-2
```

Here, the constant itself holds the behavior. The client does not check name or manually call separate addition and maximum functions. The example uses small numbers; if ADD accepts arbitrary Int values, the contract must define the response to overflow. Choosing an enum does not eliminate the underlying type's arithmetic rules.

Compare this model with sealed commands: the ADD constant does not store the individual arguments of each call, while `data class Add(val left: Int, val right: Int)` can represent an expression tree node. One approach describes an operation; the other describes a specific command with data. Both can be correct for different client algorithms.

When choosing, ask three questions: is the set of alternatives known at compile time; does each alternative have its own data; and do you need to retain individual event instances? The answers help avoid global variables in enum constants that accidentally mix the states of different operations.
