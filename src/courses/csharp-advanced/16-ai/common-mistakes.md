---
title: "Common mistakes"
description: "Topic 16. AI in .NET: Common mistakes"
outline: [2, 3]
sourceHash: "2d3b936ca293f8ea3a0662f927d72d6e2d01f9325357a79a0ef1b7dc8257592a"
---

# Common mistakes

## Common mistakes

Table 16.4. Common mistakes when integrating models {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| `HttpRequestException` or "model not found" | the Ollama server is not running or the model is not downloaded | start Ollama, `ollama pull <name>`, `ollama list` |
| requests become slower and more expensive | the history grows without a limit | trim old messages, compress the history |
| the function is not called | the model does not support tools, or there is no `UseFunctionInvocation` | a model tagged *tools*, the `UseFunctionInvocation` layer |
| `TryGetResult` returns `false` | the model returned non-JSON or truncated JSON | temperature 0, a larger `MaxOutputTokens`, a retry |
| made-up books, items, methods | a hallucination | data through functions or RAG, a "do not make things up" instruction, verification |
| an API key in the repository | the key is written in code or `appsettings.json` | revoke the key, store it in user secrets |
| RAG finds the wrong chunks | different embedding models for the index and the query, chunks that are too large | one embedding model, smaller chunks, a similarity threshold |
