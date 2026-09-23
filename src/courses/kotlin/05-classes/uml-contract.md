---
title: "UML and class contracts"
description: "Topic 5. Classes and objects: UML and class contracts"
outline: [2, 3]
sourceHash: "6b6d1d9376741fc26cae9fbac8e8dbada823e8b1999a4ba1f3faf8847041c6ad"
---

# UML and class contracts

## UML and class testing

In UML, a class rectangle contains its name, properties, and operations. `+` means public, `-` means private, and `#` means protected. For a property with a private setter, add the note “public get, private set.” UML should reflect the contract, not every local counter in a function body.

Before running, define a test table: a valid initial state, lower bound, upper bound, invalid value, successful change, failure without change, two independent objects, and two references to one object. For Double, add NaN and infinity. Running only the “happy” scenario does not test the invariant.

In IntelliJ IDEA, set breakpoints in `init` and the setter. Step through object creation, change a property, and attempt an invalid operation. Compare values before and after. To analyze JVM code, open *Tools → Kotlin → Show Kotlin Bytecode* and *Decompile*, if these actions are available in the installed IDE version. <https://www.jetbrains.com/help/idea/create-your-first-kotlin-app.html>.

Ordinary Kotlin properties on the JVM are usually represented by a field and access methods for Java, such as `getBalance()`. Under certain conditions, `@JvmField` exposes a field without such accessors; this interoperability tool should not be applied mechanically to properties that must maintain an invariant.

## Reading the contract before writing code

Start with the sentence “the object must always…” For an account, this means a nonnegative balance; for a rectangle, positive sides; for a track, a nonempty title and positive duration. Then list every entry point into the object: constructors, setters, methods, and references to mutable objects returned by getters. Any of these can violate the rule if overlooked.

Distinguish an invariant from an individual operation's precondition. A balance cannot be negative under any circumstances; a withdrawal amount must be positive for a particular `withdraw` call. After a successful call, the postcondition is that the balance decreases by the specified amount. After failure, the postcondition is that the balance remains unchanged. This wording immediately suggests expected test results.

Table 5.1. Account contract checks {.caption}

| **Scenario** | **Expectation** | **What it demonstrates** |
| --- | --- | --- |
| Balance 1000, withdrawal 200 | Balance 800 | Correct operation |
| Balance 1000, withdrawal 1000 | Balance 0 | Valid boundary |
| Balance 1000, withdrawal 1001 | Rejected, balance 1000 | State preservation |
| Withdrawal 0 or −1 | Rejected | Precondition validation |
| Creation with −1 | Object not created | Constructor validation |

Consider numeric representation separately. `Long` is exact for integer kopiykas within its range, but operations can overflow. Thus, Account checks the upper bound using subtraction before addition. Checking only an already calculated sum may be too late. Other types exist on the JVM for arbitrarily large amounts; this topic teaches model responsibilities, not how to build a production financial system.

For real numbers, check finiteness and units. The error “meters instead of centimeters” is not fixed by `Double`. Name the argument unambiguously, such as `radiusMeters`, or state its unit in the documentation. Do not hide conversions in an unclear setter that also changes several independent fields. Calculations with numerical error are tested using an acceptable tolerance.
