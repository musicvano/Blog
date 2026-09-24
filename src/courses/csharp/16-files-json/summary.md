---
title: "Summary"
description: "Topic 16. Files, streams, JSON: conclusions and review questions"
sourceHash: "ab156c29b8ed7b2d7f5a0530c20abeef72e52216db9871ca42024e9a5c538698"
---

# Summary

## Conclusions

The `System.IO` namespace contains file system classes (`File`, `Directory`, `Path`, `FileInfo`, `DirectoryInfo`), byte streams (`Stream`, `FileStream`), and classes for reading and writing on top of streams (`StreamReader`, `StreamWriter`, `BinaryReader`, `BinaryWriter`). Paths are built with `Path` methods and are resolved relative to the working directory or the application directory. Text files use UTF-8 by default; other encodings are specified explicitly. Streams implement `IDisposable`, so they are created in `using`; otherwise, data may not be written and the file remains locked. Binary files with fixed-length records allow random access with the `Seek` method. File operations are accompanied by I/O exception handling, and CSV is parsed using the invariant culture. `System.Text.Json` serializes objects to JSON and back; `JsonSerializerOptions` and attributes control names, formatting, enumerations, encoding, and polymorphic types.

## Self-check questions

1. How does an absolute path differ from a relative one? What is the working directory?
2. What is `Path.Combine` used for?
3. How does `File.ReadAllLines` differ from `File.ReadLines`?
4. What are `FileInfo` and `DirectoryInfo` for?
5. What is text encoding? Which encoding is used by default?
6. What is a stream? Which stream classes do you know?
7. What `FileMode` modes and `FileAccess` access types exist?
8. Why must streams be closed? How do you do this reliably?
9. How do you get random access to a record in a binary file?
10. What exceptions can occur when working with files?
11. What difficulties arise when processing CSV?
12. What are serialization and deserialization?
13. What settings does `JsonSerializerOptions` provide?
14. What are the `[JsonPropertyName]`, `[JsonIgnore]`, and `[JsonRequired]` attributes used for?
15. How do you serialize a collection of objects of derived types?

## Useful links

- File and stream I/O: <https://learn.microsoft.com/dotnet/standard/io/>
- Common I/O tasks: <https://learn.microsoft.com/dotnet/standard/io/common-i-o-tasks>
- The `File` class: <https://learn.microsoft.com/dotnet/api/system.io.file>
- `System.Text.Json`: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/overview>
- JSON serialization and deserialization: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/how-to>
- Polymorphic serialization: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/polymorphism>
