---
title: "Indexing, ranges, and iteration"
description: "Topic 8. Operations and delegation: Indexing, ranges, and iteration"
outline: [2, 3]
sourceHash: "2fdcfa08700fcef3dd52a13db476dd460bbf7155a85c32a1806a72e1f3a323d5"
---

# Indexing, ranges, and iteration

## Indexing, invocation, membership, and components

`get` and `set` implement indexed access. Multiple indices allow matrix notation `m[row, column]`. The setter receives the new value as its last argument. Index bounds remain the class's responsibility, not an automatic consequence of operator.

`x in a` calls `a.contains(x)`: the receiver is on the right in an ordinary expression. `!in` negates the result of contains. `invoke` lets you call an object as if it were a function. This is appropriate for a polynomial or a check, but it can hide an action if the object simultaneously has many incompatible roles.

`component1`, `component2`, and subsequent functions support destructuring of an ordinary class. A data class generates them itself. Components have a stable meaning and order; changing the order breaks client interpretation even without a compilation error.

## Ranges and iteration

`rangeTo` corresponds to the closed range `a..b`, and rangeUntil to the range `a..<b` with an excluded upper bound. Merely creating a range object does not make it iterable automatically. A loop needs an iterator, and an iterator has hasNext and next. Later topics explain generic types and collections in more detail.

In the example, DateSpan implements `Iterable<LocalDate>`, and the inner iterator implements `Iterator<LocalDate>`. The angle brackets here indicate which values the iteration returns. After the end, next throws NoSuchElementException. Each call to iterator creates a separate cursor, so the range can be traversed again.

### Example 2. A range of calendar dates

The example uses the well-tested JVM calendar type LocalDate. The end date is inclusive. An empty range is defined as a start after the end. The iterator does not add a day after the last date, so it does not overflow even at LocalDate.MAX. <https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>.

```kotlin
import java.time.LocalDate

class DateSpan(
    private val start: LocalDate,
    private val end: LocalDate
) : Iterable<LocalDate> {
    operator fun contains(date: LocalDate): Boolean =
        date >= start && date <= end

    override fun iterator(): Iterator<LocalDate> =
        object : Iterator<LocalDate> {
            private var current = start
            private var available = start <= end

            override fun hasNext(): Boolean = available

            override fun next(): LocalDate {
                if (!available) throw NoSuchElementException()
                val result = current
                if (current == end) available = false
                else current = current.plusDays(1)
                return result
            }
        }
}

operator fun LocalDate.rangeTo(other: LocalDate): DateSpan =
    DateSpan(this, other)

fun main() {
    val start = LocalDate.of(2024, 2, 28)
    val end = LocalDate.of(2024, 3, 1)
    val span = start..end
    for (date in span) println(date)
    println(LocalDate.of(2024, 2, 29) in span)
    println(LocalDate.of(2024, 3, 2) in span)
}
```

```text
2024-02-28
2024-02-29
2024-03-01
true
false
```

The rangeTo extension is available where it is declared or imported. It does not change the LocalDate class in the library. The contracts of contains and iteration are consistent: every date produced belongs to the range, and the upper bound is produced exactly once.
