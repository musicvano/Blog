---
title: "Common mistakes"
description: "Topic 10. REST web services: Common mistakes"
outline: [2, 3]
sourceHash: "80e0ece26bcad506c15e4bc1bda97581d47285744dbdaf4a1fb5ec66da2d1bc9"
---

# Common mistakes

## Common mistakes

Table 10.4 lists the mistakes most often made when creating and consuming web services.

Table 10.4. Common mistakes when working with web services {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| a nonexistent resource returns 500 or 200 with `null` | the handler does not check the lookup result | `Results<Ok<T>, NotFound>` and `TypedResults.NotFound()` |
| invalid JSON in Development gives 500 | `BadHttpRequestException` is caught by the exception handler | a `StatusCodeSelector` returns `bad.StatusCode` |
| validation does not trigger | there is no `AddValidation()`, or the attributes are on the entity rather than on the parameter or DTO | register validation, annotate the DTO |
| the client gets `Title` instead of `title`, or numbers instead of names | different JSON settings on the server and the client | `JsonSerializerOptions.Web` and the same `JsonStringEnumConverter` |
| `InvalidOperationException` about concurrent use of a `DbContext` | the context or repository is registered as Singleton | `AddDbContext` (Scoped) and `AddScoped` for the repository |
| socket exhaustion under load | `new HttpClient()` for every request | `IHttpClientFactory`, a typed client |
| the application "hangs" during a request | `.Result` or `.Wait()` instead of `await` | asynchronous methods with `await` all the way up the chain |
