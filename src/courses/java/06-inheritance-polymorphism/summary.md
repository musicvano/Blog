---
title: "Summary"
description: "Topic 6. Inheritance and polymorphism: conclusions and review questions"
sourceHash: "5b9b78ccd2b639e4c2408d84796ea412b5e85162a104a7f50bac4523b63c71ba"
---

# Summary

## Conclusions

Inheritance defines a subtype and shared contract, polymorphism selects an instance implementation based on the object, and composition hides helpers behind a narrow API. A correct hierarchy requires not only `extends`, but also consistent invariants, constructors, and equality rules.

## Self-check questions

1. Are constructors inherited?
2. When is an explicit super with parameters needed?
3. Why should you not call an overridable method in a constructor?
4. How does protected work between packages?
5. What does the Override annotation check?
6. How does static hiding differ from overriding?
7. Which type determines an instance method's implementation?
8. Why is instanceof safer than an unchecked cast?
9. What is the relationship between equals and hashCode?
10. When does composition express a contract better?
