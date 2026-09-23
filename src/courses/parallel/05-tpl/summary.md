---
title: "Summary"
description: "Topic 5. TPL tasks and async/await: conclusions and review questions"
sourceHash: "47a6af459b4cd330eb81a114a3eb488a4a96eb0a59ec4e6e2e87ec52889d158c"
---

# Summary

## Conclusions

A TPL task describes an operation that will complete successfully, with an exception, or with cancellation. It is not a thread: computations run in the thread pool, while waiting for I/O does not occupy a thread. `Task.Run` starts computation; `Task.WhenAll`, `WhenAny`, and `WhenEach` combine tasks without blocking, while `Wait` and `Result` block the thread and may cause deadlocks. Conditional `ContinueWith` continuations build task graphs. Task exceptions accumulate in an `AggregateException`; `await` throws the first one. Cancellation in .NET is cooperative: a `CancellationTokenSource` sends a request, and the operation checks the token and throws `OperationCanceledException`. The compiler transforms an `async` method into a state machine whose continuations run in the captured synchronization context or in the pool. `ValueTask`, `IAsyncEnumerable<T>`, `PeriodicTimer`, and `TaskCompletionSource<T>` extend the model to synchronous results, data streams, periodic actions, and events. `SemaphoreSlim` limits concurrent operations, while `async void` and synchronous waiting on asynchronous code are the most common antipatterns.

## Self-check questions

1. How does a task differ from a thread?
2. When do you use `Task.Factory.StartNew` instead of `Task.Run`? What does `LongRunning` provide?
3. What states can a task have? Which are final states?
4. How do `Task.WaitAll` and `Task.WhenAll` differ?
5. Why can accessing `Result` cause a deadlock?
6. What is a continuation? How do you run a continuation only if its antecedent fails?
7. How does a child task differ from a nested task?
8. Why is a task's `Exception` property of type `AggregateException`? What are `Flatten` and `Handle` for?
9. How do you retrieve all exceptions after `await Task.WhenAll(...)`?
10. Describe cooperative cancellation. What are the roles of `CancellationTokenSource` and `CancellationToken`?
11. Under what condition does a task enter the `Canceled` state rather than `Faulted`?
12. How does the compiler transform an `async` method? What does the state machine's state field store?
13. What is a synchronization context? When do you use `ConfigureAwait(false)`?
14. How do compute operations differ from I/O operations in terms of `async`/`await`?
15. When is `ValueTask` appropriate? What are its limitations?
16. What is `TaskCompletionSource<T>` for? Why use `RunContinuationsAsynchronously`?
17. How do you limit the number of concurrent asynchronous operations?
18. Why are `async void` and `.Result` considered antipatterns?

## Useful links

- Task Parallel Library (TPL): <https://learn.microsoft.com/dotnet/standard/parallel-programming/task-parallel-library-tpl>
- Task-based asynchronous programming: <https://learn.microsoft.com/dotnet/standard/parallel-programming/task-based-asynchronous-programming>
- Exception handling in TPL: <https://learn.microsoft.com/dotnet/standard/parallel-programming/exception-handling-task-parallel-library>
- Cancellation in managed threads: <https://learn.microsoft.com/dotnet/standard/threading/cancellation-in-managed-threads>
- Asynchronous programming with `async` and `await`: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/>
- Task-based Asynchronous Pattern (TAP): <https://learn.microsoft.com/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap>
- Consuming TAP: combinators, progress, cancellation: <https://learn.microsoft.com/dotnet/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern>
- `TaskCompletionSource<TResult>`: <https://learn.microsoft.com/dotnet/api/system.threading.tasks.taskcompletionsource-1>
- Debugging multithreaded and asynchronous programs in Rider: <https://www.jetbrains.com/help/rider/Debugging_Multithreaded_Applications.html>
