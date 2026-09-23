---
title: "Concurrent and immutable collections"
description: "Topic 4. Thread-safe collections: concurrent and immutable collections"
outline: [2, 3]
sourceHash: "9aa9d9efa959534994d1bf97fdf5f1a0c25dac66ff6dceea291ed2797734b89b"
---

# Concurrent and immutable collections

## Concurrent collections

The `System.Collections.Concurrent` namespace contains collections safe for concurrent use from many threads without additional synchronization in user code (Table 4.1). According to the documentation, `ConcurrentQueue<T>` and `ConcurrentStack<T>` use no locks at all, relying on `Interlocked`; other collections use fine-grained locks on individual parts.

Table 4.1. Collections in System.Collections.Concurrent {.caption}

| **Collection** | **Order** | **Main methods** |
| --- | --- | --- |
| `ConcurrentQueue<T>` | FIFO (queue) | `Enqueue`, `TryDequeue`, `TryPeek`, `IsEmpty` |
| `ConcurrentStack<T>` | LIFO (stack) | `Push`, `PushRange`, `TryPop`, `TryPopRange` |
| `ConcurrentBag<T>` | Unordered | `Add`, `TryTake`, `TryPeek` |
| `ConcurrentDictionary<TKey, TValue>` | By key | `TryAdd`, `TryGetValue`, `TryRemove`, `TryUpdate`, `GetOrAdd`, `AddOrUpdate` |
| `BlockingCollection<T>` | Same as the underlying collection | `Add`, `Take`, `CompleteAdding`, `GetConsumingEnumerable` |

Methods with the `Try` prefix combine the check and action into one atomic operation and report the result as a `bool`:

```cs
ConcurrentQueue<Job> jobs = new();
jobs.Enqueue(new Job(1));

// Incorrect: the queue may become empty between Count and Dequeue.
// if (jobs.Count > 0) Process(jobs.Dequeue()); – ConcurrentQueue<T>
// has no Dequeue method for exactly this reason.

if (jobs.TryDequeue(out Job? job))  // atomically check and remove
{
    Process(job);
}
```

The `Count` and `IsEmpty` properties return the state at the time of the call, which may change before the next line; do not use them to make decisions. A `foreach` over a queue, stack, or bag works with a **snapshot** of its contents, while enumerating `ConcurrentDictionary` is safe during modifications but is not a snapshot: it may observe some changes made during enumeration.

**`ConcurrentBag<T>`** stores unordered elements and allows duplicates. Each thread has its own **thread-local list**: `Add` adds an element to the current thread's list, and `TryTake` first takes from that list, “stealing” an element from another thread's list only when its own is empty. A bag is therefore efficient when **the same** threads both add and remove elements (for example, a pool of reusable buffers), and slower than a queue in the classic arrangement where some threads only add and others only remove.

## ConcurrentDictionary

`ConcurrentDictionary<TKey, TValue>` is the most commonly used concurrent collection. Instead of check-then-act pairs, it offers atomic methods:

- `TryAdd(key, value)` — add if the key is absent;
- `TryRemove(key, out value)` — remove and return the value;
- `TryUpdate(key, newValue, comparisonValue)` — replace the value only if the current value equals `comparisonValue` (CAS for a dictionary value);
- `GetOrAdd(key, valueFactory)` — return the existing value or create and add a new one;
- `AddOrUpdate(key, addValue, updateValueFactory)` — add or update based on the old value.

```cs
ConcurrentDictionary<string, int> counts = new();
// Atomically “add 1 or increment by 1” from any thread.
counts.AddOrUpdate(word, 1, (_, old) => old + 1);

// The default value is created only for a new key.
List<string> list = groups.GetOrAdd(key, _ => []);
```

### Value factories run outside locks

According to the documentation, `GetOrAdd` and `AddOrUpdate` delegates run **outside** the dictionary's internal locks so that unknown user code cannot cause deadlock. Consequences:

- if two threads call `GetOrAdd` for a missing key simultaneously, the factory may run **twice**; only one value enters the dictionary, and the other is discarded;
- `AddOrUpdate` may call the update function several times if another thread changes the value in the meantime; the function must therefore be **pure**: calculate a new value from `old` without side effects (output, counters, requests);
- the object returned by `GetOrAdd` does not itself become thread-safe: the `List<string>` in the example above must not be modified from multiple threads.

If the factory is expensive (loading a file or performing a long computation) or has side effects, store `Lazy<T>` in the dictionary. Multiple threads may create multiple `Lazy<T>` objects, but only one enters the dictionary, and all threads receive that same object; in its default mode (`LazyThreadSafetyMode.ExecutionAndPublication`), `Lazy<T>` performs the computation once:

```cs
ConcurrentDictionary<string, Lazy<Report>> reports = new();

Report report = reports.GetOrAdd(name,
    key => new Lazy<Report>(() => BuildReport(key))).Value;
```

## Immutable and frozen collections

Another approach to shared data is not to modify it at all. **Immutable collections** in `System.Collections.Immutable` (`ImmutableList<T>`, `ImmutableDictionary<TKey, TValue>`, `ImmutableHashSet<T>`, `ImmutableArray<T>`, `ImmutableQueue<T>`, `ImmutableStack<T>`) do not change after creation. The `Add` method returns a **new** collection that shares most of its internal structure with the old one. Any number of threads can read an immutable collection without locks: each works with its own **snapshot**, which no one will modify.

```cs
ImmutableList<string> v1 = ["red", "green"];
ImmutableList<string> v2 = v1.Add("blue");   // v1 is unchanged
```

Updating a shared field that references an immutable collection requires atomic reference replacement. Writing `settings = settings.Add(x)` from multiple threads creates another read–modify–write race. The **`ImmutableInterlocked`** class performs this replacement through CAS: `Update` reads the current collection, applies a transformation, and writes the result only if the field has not changed in the meantime; otherwise, it repeats the transformation:

```cs
private ImmutableList<Setting> settings = [];

public void Add(Setting item) =>
    ImmutableInterlocked.Update(ref settings, list => list.Add(item));
```

For dictionaries, `ImmutableInterlocked` provides `AddOrUpdate`, `GetOrAdd`, `TryAdd`, `TryUpdate`, and `TryRemove`; for stacks and queues, it provides `Push`, `TryPop`, `Enqueue`, and `TryDequeue`. Immutable collections are convenient when reads greatly outnumber writes: each write creates a new version, and frequent concurrent writes require transformations to be repeated many times.

**Frozen collections**, `FrozenDictionary<TKey, TValue>` and `FrozenSet<T>` in `System.Collections.Frozen` (since .NET 8), are created once using `ToFrozenDictionary` and `ToFrozenSet`. Creation is relatively expensive, but lookup is faster than in an ordinary dictionary; the collection cannot be modified. A typical scenario is reference data loaded at startup and then read by many threads. To update it, build a new frozen collection and atomically replace the reference (`Interlocked.Exchange(ref catalog, newCatalog)`).
