---
title: "Limits, antipatterns, and debugging"
description: "Topic 5. TPL tasks and async/await: limits, antipatterns, and debugging"
outline: [2, 3]
sourceHash: "3b5de57be655a2cc885698e8a0121f5d97def4c36fbba95683f880f0f15ee906"
---

# Limits, antipatterns, and debugging

## Limiting concurrent operations

`Task.WhenAll` for a thousand tasks starts a thousand operations at once. For files, this means a thousand open handles; for networking, a thousand connections that the server might consider an attack. Limit concurrent operations with the **asynchronous semaphore** `SemaphoreSlim` (Topic 3): `WaitAsync()` waits for an available slot without blocking a thread. Each operation calls `await gate.WaitAsync(token)` before starting and `gate.Release()` in a `finally` block, and `Task.WhenAll` awaits all tasks (see the “Asynchronous file reading” example).

For simple cases, an alternative is `Parallel.ForEachAsync` with `MaxDegreeOfParallelism` (Topic 6).

### `HttpClient`

`HttpClient` is intended for reuse: one instance per application (or `IHttpClientFactory`), rather than a new instance for each request, which would exhaust sockets. The `Timeout` property defaults to 100 s and applies to the entire request; set an individual request's timeout using a `CancellationTokenSource` token with `CancelAfter`. Guidelines: <https://learn.microsoft.com/dotnet/fundamentals/networking/http/httpclient-guidelines>.

In this course's examples, `HttpClient` accesses only a **local** `HttpListener` test server started in the same program, so the programs work without internet access. Microsoft does not recommend `HttpListener` itself for new development — real web services are built with ASP.NET Core (Topic 14) — but it is convenient for a teaching server that takes just a few lines.

## Asynchronous code antipatterns

- **`async void`.** The caller cannot await such a method, and an exception from it bypasses the caller's `try`/`catch` and terminates the process. `async void` is acceptable only for event handlers; in every other case, return `Task`.
- **Synchronous waiting on asynchronous code** (*sync-over-async*): `GetDataAsync().Result`, `.Wait()`, `.GetAwaiter().GetResult()`. This blocks the thread and causes a deadlock in a synchronization context, or **thread pool starvation** on a server: all pool threads are blocked waiting for continuations that have no available threads.
- **Asynchronous wrappers around synchronous code** (*async-over-sync*) in libraries: `Task<int> ComputeAsync() => Task.Run(Compute)` is misleading because it looks like an I/O operation. Let the caller decide whether to use `Task.Run`.
- **“Forgotten” tasks** (*fire-and-forget*): `DoWorkAsync();` without `await`. Errors become unobserved, and the program may exit before the task finishes. If a task truly will not be awaited, indicate this with a discard, `_ = DoWorkAsync();`, and handle exceptions inside it.
- **`Thread.Sleep` in an asynchronous method** blocks a pool thread; use `await Task.Delay` instead.
- **Shared state without synchronization.** Continuations after `await` may run in parallel on different threads, so changing a shared counter from multiple tasks requires `Interlocked` or a lock (Topic 3). `lock` cannot contain `await`; use `SemaphoreSlim(1, 1)` for asynchronous mutual exclusion.

## Debugging tasks in Rider

Rider's *Debug* window has several tabs for multithreaded and asynchronous programs (<https://www.jetbrains.com/help/rider/Debugging_Multithreaded_Applications.html>):

- *Threads & Variables* — the thread list, selected thread's stack, and stack frame variables;
- *Parallel Stacks* — a diagram of all thread stacks: identical stack sections are merged, showing how many threads are executing the same code;
- *Tasks* — the state of `Task` and `ValueTask` objects at a breakpoint: ID, status, method.

To see waiting operations, click *Pause Program* while the example with several downloads is running (Fig. 5.8). An asynchronous method that is waiting does not occupy a thread, so it is absent from *Threads & Variables*; the *Tasks* tab and asynchronous call chains show it instead.

::: info Screenshot
Rider: Debug the local HttpClient download example, Pause Program while downloads wait; Debug window, Parallel Stacks tab (and Tasks tab) with several awaiting method chains
:::

Figure 5.8. Parallel stacks and tasks in Rider {.caption}
