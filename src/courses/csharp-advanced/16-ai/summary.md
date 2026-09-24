---
title: "Summary"
description: "Topic 16. AI in .NET: conclusions and review questions"
sourceHash: "e3e80c59e525d690f504403b4358e50336739af19394284fd5b51bffadc9ced5"
---

# Summary

## Conclusions

Large language models generate text token by token within a context window, do not remember previous requests, and can be confidently wrong. The Microsoft.Extensions.AI libraries provide a common `IChatClient` interface for local (Ollama) and cloud models: an application sends a list of messages with roles, receives the response whole or as a stream, and through `GetResponseAsync<T>` gets a typed result that it checks in code. Function calling lets the model use the application's data, and `ChatClientBuilder` adds logging, caching, limits, and other middleware layers to the client and registers it in DI, so the provider is changed in only one place. Embeddings and cosine similarity underlie semantic search and RAG, which answers from your own documents with references to the sources. API keys are stored outside the code, personal data is not sent to the model without need, costs are limited, and code that uses a model is tested with a fake client.

## Self-check questions

1. What are a large language model and a prompt?
2. What are a token and a context window? Why does a long conversation become more expensive?
3. How does temperature affect the response? Which values should you choose for data extraction?
4. What are model hallucinations, and how do you reduce them?
5. How do cloud and local models differ? What is rate limiting?
6. What is the purpose of the `Microsoft.Extensions.AI.Abstractions`, `Microsoft.Extensions.AI`, and `OllamaSharp` packages?
7. What roles do `ChatMessage` messages have? Why is a system instruction needed?
8. How do you store the conversation history, and why must it be trimmed?
9. How does `GetStreamingResponseAsync` differ from `GetResponseAsync`? How do you cancel generation?
10. How does `GetResponseAsync<T>` work? Why must the result be checked?
11. How do you describe a C# method as a tool for the model? Who actually executes the method?
12. What security rules apply to functions that the model calls?
13. How does `ChatClientBuilder` determine the order of middleware clients? How do you create your own?
14. How do you change the model provider without changing the rest of the code? Where do you store the API key?
15. What are an embedding and cosine similarity?
16. What stages does RAG consist of? Why does the response include references to the sources?
17. How do you test code that uses `IChatClient` without a real model?

## Useful links

- Microsoft.Extensions.AI: <https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai>
- The `IChatClient` interface: <https://learn.microsoft.com/dotnet/ai/ichatclient>
- The `IEmbeddingGenerator` interface: <https://learn.microsoft.com/dotnet/ai/iembeddinggenerator>
- Tokens: <https://learn.microsoft.com/dotnet/ai/conceptual/understanding-tokens>
- Embeddings: <https://learn.microsoft.com/dotnet/ai/conceptual/embeddings>
- RAG: <https://learn.microsoft.com/dotnet/ai/conceptual/rag>
- Vector stores: <https://learn.microsoft.com/dotnet/ai/vector-stores/overview>
- A local model in .NET: <https://learn.microsoft.com/dotnet/ai/quickstarts/chat-local-model>
- Ollama: <https://docs.ollama.com>, models: <https://ollama.com/library>
- User secrets: <https://learn.microsoft.com/aspnet/core/security/app-secrets>
- Microsoft Agent Framework: <https://learn.microsoft.com/agent-framework/overview/>
- Model Context Protocol: <https://modelcontextprotocol.io>
