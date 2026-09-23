---
title: Summary
description: "Topic 10. Inheritance and Polymorphism: conclusions and review questions"
sourceHash: "c0804f374a126712441f5a9c1dbf2c1e9caaa9cf4ebcdb03917c1d9cf9e1a524"
---

# Summary

## Conclusions

Public inheritance defines a substitution contract. A virtual call depends on the actual type. Ownership and polymorphism require separate decisions. Slicing changes the object itself, not just the call path.

## Self-check questions

1. When does an “is-a” relationship justify inheritance?
2. How does the static type differ from the dynamic type?
3. Why is a virtual destructor needed?
4. Why doesn’t a vector store the derived part?
5. What does override check?
6. How does virtual behave in a base constructor?
7. In what order is a hierarchy destroyed?
8. Why is a protected method better than open access to a field?
9. How does a failed dynamic_cast of a pointer differ from that of a reference?
10. Why are exceptions caught by const reference?
11. What does final mean for a class and for a method?
12. What are the risks of a static_cast to a derived type?
13. Why isn’t the vtable diagram an ABI guarantee?
14. How does using Base::Base affect new fields?
15. When does dynamic_cast suggest changing the interface?

## Useful links

- <https://learn.microsoft.com/cpp/cpp/inheritance-cpp>
- <https://learn.microsoft.com/cpp/cpp/virtual-functions>
- <https://learn.microsoft.com/cpp/cpp/dynamic-cast-operator>
