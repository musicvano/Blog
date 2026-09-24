---
title: "Copies, wrappers, and choosing a collection"
description: "Topic 10. Collections: Copies, wrappers, and choosing a collection"
outline: [2, 3]
sourceHash: "267e9d8274653bbf244afd7f79753981119d41801a17e65e7eb06b09f4914681"
---

# Copies, wrappers, and choosing a collection

## Copies, wrappers, and special classes

`Collections.unmodifiableList(source)` prohibits modifications through the wrapper but reflects later changes to source. `List.copyOf` provides an unmodifiable list with a snapshot of the elements at the moment of the call. Neither of these makes a deep copy of mutable elements. API contracts must describe the mutability of the container and the mutability of the objects inside it separately.

The algorithms `Collections.sort`, `reverse`, `shuffle`, `frequency`, `min`, and `max` work through the corresponding interfaces. `nCopies` creates an unmodifiable list of repetitions of the same reference; it is not a factory of independent objects. For random shuffling in tests, use a generator with a fixed seed.

`EnumSet` and `EnumMap` are specialized for enum keys and often express a finite set of states more precisely. EnumSet does not accept null; EnumMap does not accept null keys but allows null values. The iteration order matches the declaration order of the enum constants.

Ordinary ArrayList, HashMap, and ArrayDeque are not thread-safe. A synchronized wrapper does not automatically make a compound "check, then modify" sequence atomic. Concurrent structures have their own guarantees, which will be discussed later; do not choose them just to hide an iterator error.

## From requirements to a verifiable solution

Consider an event log that must keep every arrival, quickly find the latest state by id, and show the chronology. One structure does not have to play every role. A list of events is the source of history, and a map of latest states can be a derived index. You then need to define clearly when the index is updated and how to rebuild it, so that the two structures do not contradict each other.

If history is not needed, a map keyed by unique id can be the single source of truth. The report is built from its entrySet, copying and sorting only the required view. Do not choose LinkedHashMap just because it produced a nice order in the first example: insertion order and date order can differ.

The contract for returning a collection must match the class's responsibility. If a getter returns an internal mutable list, a client can bypass the check for unique ids or capacity. An unmodifiable copy protects the structure, and a dedicated add method keeps control of the invariant inside the class. Returning a live view is also acceptable, but its contents and lifecycle must be described explicitly.

Checks of a collection algorithm are conveniently built around properties. Sorting does not change the count or the multiset of elements; a set union contains every element of both sources; LRU eviction does not exceed capacity; moving items from a queue to a log neither loses nor duplicates requests. Such checks reveal more bugs than a single match of a printed line.

Separate tests must distinguish an equal key from an equal value. Two books can have the same title but different ids; two orders can have the same amount but different times. If the test data never contains ties, a comparator bug or accidental removal of duplicates can go unnoticed.

| Check | What it reveals |
| --- | --- |
| Empty set | An unjustified getFirst, min, or division by zero |
| Repeated key | An undocumented replacement or merge policy |
| Equal sort keys | An unstable report or a lost entry in a TreeSet |
| Changing the source | Confusion between a copy and a live view |
| Operation after removal | An invalid iterator or queue state |

::: info Screenshot
Pause the frequency example after counts has been filled. Show the keys and values in Variables, the JDK version, and the breakpoint line. Mark the internal fields of HashMap as implementation details.
:::

Figure 10.7. Inspecting a map in the IntelliJ IDEA debugger {.caption}
