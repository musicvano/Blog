---
title: "Iterators"
description: "Topic 13. Generics and collections: Iterators"
outline: [2, 3]
sourceHash: "0124c0a722f35e7b55b673b0dcb23d733c3d56aa41bac80e83bce129e02e0c30"
---

# Iterators

## Iterators

The `foreach` loop works with any object that has a `GetEnumerator()` method. The compiler converts the loop into calls to `MoveNext()` and reads of `Current` on the enumerator object. The easiest way to create your own sequence is an **iterator**: a method that returns `IEnumerable<T>` and uses `yield return`:

```cs
foreach (int n in Count(2))
{
    Console.Write($"{n} ");      // [yield] 1 [yield] 2
}

static IEnumerable<int> Count(int limit)
{
    for (int i = 1; i <= limit; i++)
    {
        Console.Write("[yield] ");
        yield return i;          // return a value and pause
    }
}
```

An iterator runs **lazily**: the method body does not start when `Count(2)` is called, and each call to `MoveNext()` resumes execution until the next `yield return` (Fig. 13.8). The `yield break` statement ends the sequence.

```mermaid
sequenceDiagram
  participant F as foreach (caller)
  participant I as iterator Count(2)
  F->>I: MoveNext()
  Note right of I: runs until yield return 1
  I->>F: Current = 1
  F->>I: MoveNext()
  Note right of I: continues until yield return 2
  I->>F: Current = 2
  F->>I: MoveNext()
  Note right of I: end of the method
  I->>F: false – exit the loop
```

Figure 13.8. Executing an iterator with `yield return` {.caption}

A collection cannot be modified during iteration: after `Add` or `Remove` in the body of `foreach`, the next `MoveNext()` throws `InvalidOperationException` with the message “Collection was modified; enumeration operation may not execute” (Fig. 13.9). To remove elements, iterate over a copy or use a `for` loop from the end.

![Modifying a collection during iteration](./images/04-vs-exception-collection-modified.png)

Figure 13.9. Modifying a collection during iteration {.caption}
