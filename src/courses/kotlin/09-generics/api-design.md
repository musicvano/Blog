---
title: "API design and testing"
description: "Topic 9. Generic programming: API design and testing"
outline: [2, 3]
sourceHash: "d091058c69236dafe46a4111a5f403e253e907a8c0acdb10d31ebfa31ad90b23"
---

# API design and testing

## API design: from operations to variance

Consider a service that moves one value between two containers. The naive solution accepts two `MutableBox<T>` objects. It is type-safe but overly restricts the client: a source of cats cannot be combined with a container of all animals, even though this particular operation only reads a cat and writes it as an animal.

A better signature expresses the direction of access: the source has the projection `out T`, and the receiver `in T`. The operation does not modify the source and does not read a specific `T` from the receiver. It gets exactly the capabilities the algorithm needs, and no more.

```kotlin
class Cell<T>(var value: T)

fun <T> moveValue(from: Cell<out T>, to: Cell<in T>) {
    to.value = from.value
}

fun <T> Cell<T>.readValue(): T = value

fun main() {
    val source = Cell("Kotlin")
    val target = Cell<Any>(0)
    moveValue(source, target)
    println(target.value)
    println(source.readValue().length)
    val unknown: Cell<*> = source
    println(unknown.value)
    // unknown.value = 5 // Deliberately does not compile.
}
```

```text
Kotlin
6
Kotlin
```

A projection restricts only this reference; it does not change the `Cell` class. Code that still holds `source: Cell<String>` can change the string through the setter. Code with `unknown: Cell<*>` does not know which write would be valid. Lacking the right to write does not mean that the object has become immutable for all participants of the program.

In a large system, separate `Source` and `Sink` interfaces are often better than numerous container projections. They hide the fact of storage: a source can receive a value from the network, compute it, or read a file. A projection is appropriate when the algorithm really works with an already known invariant type.

| Contract | Direction | Available operation |
| --- | --- | --- |
| `Cell<T>` | Invariant | Read and write T |
| `Cell<out T>` | Production only | Read T |
| `Cell<in T>` | Consumption only | Write T |
| `Cell<*>` | Type unknown | Read as the upper bound |

The table describes the observable capabilities of exactly this example with `var`. In more complex types, nesting of function parameters can change a type's position. Do not try to derive the rule merely from where the letter T appears in the line: you must take into account the signature of every nested contract.

## Verifying contracts without unchecked casts

For a stack, testing two types means repeating one behavioral specification: A added, then B; B removed, then A; the size returned to zero; a failed operation did not change the state. The exact lines of actual output matter less than these properties holding for every parameterized variant.

For a range, it is important to test equal bounds. The interval from 5 to 5 is not empty: it contains 5. Similarly for calendar dates, a single date can form a valid closed range. If the contract is half-open, the rules are different and must have a different implementation or an explicitly named operation.

A negative compilation test is written as a small separate file containing one expected error. It must not contain unknown imports or syntax errors that would prevent the compiler from reaching the check of the property in question. Record the compilation command, the nonzero exit code, and the essence of the diagnostic.

The example `Cell<String>` cannot be assigned to `Cell<Any>` because of invariance. The example `Source<Cat>` can be assigned to `Source<Animal>` thanks to `out`. Together, these two tests prove that the constraint does not simply forbid everything but allows exactly the safe interaction.

Do not leave commented-out casts in the project as a "backup way to fix the types". If the compiler demands `as`, first find out which information was lost and at which boundary. Sometimes you need to keep the type parameter in the signature, sometimes add a sealed result, and sometimes validate the external data structure.

Using JDK 27 does not change the JVM's argument erasure rules. The runtime version and the language's type model are different parts of the toolchain. The course examples are compiled with Kotlin 2.4.20 targeting JVM 26 and run on JDK 27; keep this in mind when reproducing the commands without an IDE.

## Generalization and domain identity

A type parameter can denote not only the type of the stored value but also a unit of measurement or another domain category. For example, `Quantity<Meter>` and `Quantity<Second>` can both store a `Double` yet remain different static types. Such a parameter is often called a phantom type if its value is not stored directly in the object.

Type safety here depends on the available operations. If the addition method accepts `Quantity<U>`, it does not allow mixing different units. If the constructor and arbitrary casts are open everywhere, the client can still label the initial data incorrectly. So types help preserve an already established meaning, but they cannot guess which units the user entered a number in.

```kotlin
sealed interface UnitTag
object Meter : UnitTag
object Second : UnitTag

data class Quantity<U : UnitTag>(val value: Double) {
    init { require(value.isFinite()) }

    operator fun plus(other: Quantity<U>): Quantity<U> =
        Quantity(value + other.value)
}

fun main() {
    val first = Quantity<Meter>(2.0)
    val second = Quantity<Meter>(3.0)
    println((first + second).value)
    val time = Quantity<Second>(4.0)
    println(time.value)
    // first + time // Deliberate error: different units.
}
```

```text
5.0
4.0
```

The result's constructor checks finiteness, so an overflowing sum is rejected by the same invariant. At the same time, the class does not solve every problem of physical quantities: multiplying length by time needs a different result type, and unit conversion needs an explicit factor and a numerical error policy.

You should also treat the generated equality of a data class with care. On the JVM, generic arguments are erased, so do not build a domain check of units on `equals` of two objects already converted to `Any`. If the unit must be distinguished at runtime, it needs an explicit runtime representation in the model.

This example shows the limit of the static type system's responsibility. It forbids incorrect addition in typed code, but external text, a file, or a general `Any` registry requires separately restoring the domain meaning. Constructors, factories, and validated decoders are appropriate at this boundary.
