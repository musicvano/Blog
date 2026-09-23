---
title: "Case studies and common mistakes"
description: "Topic 5. Classes and objects: case studies and common mistakes"
outline: [2, 3]
sourceHash: "51d44e918d1cc1102e2efc28124a4521d6b4032e93e18360497bd9147fa71b0d"
---

# Case studies and common mistakes

## Lifecycle analysis: a step-by-step trace

The following program deliberately prints every construction stage. It does not model a domain; it helps connect the class text with execution order. The `mark` function returns its argument after printing a message, so it can serve as an initializer. Before running, write down the expected sequence on paper.

```kotlin
fun mark(text: String): String {
    println(text)
    return text
}

class Trace(name: String) {
    val first = mark("property: $name")

    init {
        println("init 1")
    }

    val second = mark("second property")

    init {
        println("init 2")
    }

    constructor() : this("default") {
        println("secondary body")
    }
}

fun main() {
    val item = Trace()
    println("ready: ${item.first}")
}
```

```text
property: default
init 1
second property
init 2
secondary body
ready: property: default
```

The order is determined by declaration placement, not names. Moving the second initializer above the first `init` changes the sequence. Avoid complex implicit dependencies between fields; prefer a small, clear constructor. If network or file access is needed, load the data separately and pass ready, validated data to the model.

When an exception occurs, the constructor does not return a usable instance to the caller. However, external side effects, such as printing or writing a file, are not automatically undone. This is why the message example is a teaching trace, not the style for every constructor. Keeping side effects minimal makes testing easier.

## Accessor visibility in practice

A modifier on a setter changes write access, but not the property's type or read access. An Account client can build a balance report while making changes through a domain method. If the property itself is `private`, it cannot be read directly from outside either. Provide a public getter only for data that truly belongs to the class client's contract.

In Kotlin, there is no need to manually declare Java-style `getBalance` and `setBalance` methods for every field. A property gives clients concise syntax while allowing the accessor implementation to change. Do not combine a `balance` property with a handwritten method having the same JVM signature: this can cause a compilation conflict.

::: info Screenshot
Cursor inside Account; Alt+Insert, inspect available toString and constructor generation actions.
:::

Figure 5.7. Class member generation tools {.caption}

The IDE generator speeds up mechanical work, but it does not know the invariants. Check an automatically created constructor for delegation and duplicated rules. Review a generated `toString` for unnecessary data exposure. Clicking a button does not replace reading the resulting code.

::: info Screenshot
Show Kotlin Bytecode &gt; Decompile Account; show backing balance field and public getBalance, restricted setter.
:::

Figure 5.8. Property representation on the JVM {.caption}

Compare access to the balance in Kotlin and decompiled Java. Do not transfer generated name details into the domain model: they explain platform interoperability, while the source contract remains properties and methods. In the next topic, this contract will support polymorphic use of objects.
