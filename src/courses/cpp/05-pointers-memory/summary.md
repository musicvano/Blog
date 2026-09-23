---
title: Summary
description: "Topic 5. Pointers and Memory: conclusions and review questions"
sourceHash: "3f1a53878d43c7f4a4de71fc7549084953cdd45fd192fb3296da04e0d4ce15f7"
---

# Summary

## Conclusions

An address doesn’t imply
ownership. Every
resource must have
a clear party responsible
for releasing it and
a valid lifetime
for all accesses.
Containers and smart
pointers express
these rules in
types; diagnostic
tools help
detect violations.

## Self-check questions

1. How do value, address and owner differ?
2. What do `&` and `*` mean in expressions?
3. Why can a non-null pointer be dangling?
4. How do a pointer to const and a const pointer differ?
5. What step does p+1 have?
6. Can you dereference the address past the end of an array?
7. What are the correct new/delete pairs?
8. Why doesn’t nullptr reset other copies of an address?
9. What does AddressSanitizer check?
10. How do get, reset and release differ?
11. What happens to a unique_ptr after a transfer?
12. Why are two shared_ptr objects created from the same raw address dangerous?
13. How does a strong cycle arise?
14. What is weak_ptr::lock for?
15. How does span differ from vector?

## Review questions for the lab

1. Is every pointer an owner?
2. What limits pointer arithmetic?
3. Why does a C string need a null?
4. How does delete differ from delete[]?
5. Why doesn’t setting one address to null fix all accesses?
6. What does std::move transfer for a unique_ptr?
7. When is get acceptable without release?
8. How does weak_ptr break a strong cycle?
9. Why can parent in a tree be non-owning?
10. What does a successful ASan run prove, and what doesn’t it prove?

## Useful links

- Smart pointers: <https://learn.microsoft.com/cpp/cpp/smart-pointers-modern-cpp>.
- unique_ptr: <https://learn.microsoft.com/cpp/standard-library/unique-ptr-class>.
- weak_ptr: <https://learn.microsoft.com/cpp/standard-library/weak-ptr-class>.
- ASan: <https://learn.microsoft.com/cpp/sanitizers/asan>.
- Guidelines: <https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines>.
