---
title: "Summary"
description: "Topic 10. REST web services: conclusions and review questions"
sourceHash: "1db02d1fbeb6c50102d0a792b00d6ac6f98c863c80b8aaa40e33b013f7e38d99"
---

# Summary

## Conclusions

A REST web service exposes resources at URIs, and actions on them are defined by HTTP methods and status codes. ASP.NET Core Minimal API describes endpoints with `Map…` methods, groups them with `MapGroup`, and binds parameters from the route, the query string, the JSON body, and the dependency container. `TypedResults` make response codes explicit, the built-in .NET 10 validation checks DTOs, and `ProblemDetails` defines a single error format; OpenAPI and `.http` files are used to test the service. A repository behind an interface makes it possible to move from in-memory data to EF Core without changing the endpoints. Clients use an `HttpClient` from `IHttpClientFactory` and handle server unavailability and `ProblemDetails` bodies.

## Self-check questions

1. What parts do an HTTP request and response consist of? What are the `Content-Type` and `Location` headers for?
2. Which HTTP methods are safe, and which are idempotent? Why does this matter when retrying a request?
3. What status codes does a service return after a successful `GET`, `POST`, `PUT`, `DELETE`?
4. What are a resource and a representation in REST? How do you build URIs for collections and items correctly?
5. What does `JsonSerializerOptions.Web` enable? How do you write enumerations as names?
6. How does Minimal API differ from controllers? What stages does `Program.cs` consist of?
7. What is the middleware pipeline? Why does the order of `app.Use…` calls matter?
8. How do you define a route parameter with a constraint? What is `MapGroup` for?
9. From which sources does ASP.NET Core take the values of handler parameters?
10. How does `TypedResults` differ from `Results`? What is the `Results<Ok<T>, NotFound>` type for?
11. How do you enable the built-in validation in .NET 10? What does the client receive on an error?
12. What is `ProblemDetails`? Which calls are needed so that all errors have this format?
13. How do you get a service's OpenAPI document? How do you send a request from an `.http` file?
14. Why is `DbContext` registered as Scoped? How do you implement pagination in the database?
15. Why must you not create an `HttpClient` for every request? What is a typed client?

## Useful links

- Minimal API: <https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis>
- Parameter binding: <https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/parameter-binding>
- Handling errors in APIs: <https://learn.microsoft.com/aspnet/core/fundamentals/error-handling-api>
- What's new in ASP.NET Core 10 (validation): <https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-10.0>
- OpenAPI in ASP.NET Core: <https://learn.microsoft.com/aspnet/core/fundamentals/openapi/overview>
- `.http` files in Visual Studio: <https://learn.microsoft.com/aspnet/core/test/http-files>
- `System.Text.Json`: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/overview>
- `HttpClient`: <https://learn.microsoft.com/dotnet/fundamentals/networking/http/httpclient>
- `IHttpClientFactory`: <https://learn.microsoft.com/dotnet/core/extensions/httpclient-factory>
- HTTP Semantics, RFC 9110: <https://www.rfc-editor.org/rfc/rfc9110>
