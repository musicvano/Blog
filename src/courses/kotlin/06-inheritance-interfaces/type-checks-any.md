---
title: "Type casts, Any, and initialization"
description: "Topic 6. Inheritance and polymorphism: type casts, Any, and initialization"
outline: [2, 3]
sourceHash: "02a50fd12eb493b9a4743cb59cf63ee3c1e1a5a8d5d22cf9a7d98e50d621bc6c"
---

# Type casts, Any, and initialization

## Type checks and safe casts

`is` checks whether an object belongs to a type; after an appropriate condition, the compiler often applies a smart cast. This is especially predictable for a local `val`: the reference cannot change between the check and its use. For an open property or a property with a custom getter, that guarantee may be absent; store the value in a local variable.

`as?` returns `null` if the cast is impossible. Plain `as` throws an exception in that situation. A safe cast is appropriate at a boundary that actually receives heterogeneous objects. In the main polymorphic algorithm, many type checks often indicate that the common contract is incomplete.

```kotlin
interface Printable {
    fun text(): String
}

class Note(private val value: String) : Printable {
    override fun text(): String = value
}

fun inspect(value: Any) {
    if (value is Printable) {
        println("print: ${value.text()}")
    }
    val note = value as? Note
    println(note?.text() ?: "not a Note")
}

fun main() {
    inspect(Note("Hello"))
    inspect(42)
}
```

```text
print: Hello
Hello
not a Note
```

Here, `Any` deliberately allows different values. If the function always needs Printable, it is better to declare that parameter type and move the error to compile time. A runtime check should not replace a precise type when it is known.

## Any: equality, hashing, and string representation

All non-null classes share the root `Any`, with the methods `equals`, `hashCode`, and `toString`. `Any?` also allows `null`. Overriding `toString` helps diagnostics but does not define object equality. <https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-any/>.

`equals` must be reflexive, symmetric, transitive, and consistent while the comparison data remains unchanged. For a non-null object, comparison with null is false. If two objects are equal, their hashes must match; matching hashes do not imply equality. Override equals and hashCode together.

For an entity, equality often compares a stable identifier; for a value, it compares all meaningful components. Do not include a field in the hash if it changes while the object is used as a map key or set element. Otherwise, a lookup may stop finding an object that has already been inserted. Collections are covered in detail in Topic 10.

Inheritance complicates equality: a base class may consider two instances equal based only on id, while a subclass adds color. This can break symmetry. For simple value types, a final class without subclasses or a data class is often preferable to an open hierarchy with multiple equals rules.

## Initialization and unsafe open calls

The base part is initialized before the subclass's properties. If the base `init` calls an open method, dynamic dispatch can reach a subclass whose state is not ready yet. Even if an example happens to work, a subclass change can break it. Do not call open members in base class constructors, property initializers, or `init` blocks.

The following program demonstrates a safe order: both constructors merely report their own stage, and the polymorphic method is called after construction is complete.

```kotlin
open class Base(val label: String) {
    init { println("base: $label") }
    open fun describe(): String = label
}

class Derived(label: String, private val suffix: String) :
    Base(label) {
    init { println("derived: $suffix") }
    override fun describe(): String = "$label/$suffix"
}

fun main() {
    val value: Base = Derived("A", "B")
    println(value.describe())
}
```

```text
base: A
derived: B
A/B
```

If construction is complex, a factory can first create a fully initialized object and then perform an explicitly named stage. Factories in a companion object are covered in Topic 7. Do not expose a partially initialized instance to the client before validation finishes. The simplest reliable constructor is often the best.
