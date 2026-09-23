---
title: "The template method and hierarchy testing"
description: "Topic 6. Inheritance and polymorphism: the template method and hierarchy testing"
outline: [2, 3]
sourceHash: "5d2432f35a0ae4d479a00c18f348be4d98bbd55502c6a43193628b03615d54c2"
---

# The template method and hierarchy testing

## The template method and composition

An abstract class can define a fixed algorithm in a final method while leaving individual steps abstract. For example, a report always creates a header, body, and summary, but the subtype defines the body. This approach is called the **template method**. It differs from string templates and the generic types covered in later topics.

Composition represents a “has a” relationship. Instead of making Printer inherit from File, you can supply it with a Formatter and Writer. The dependencies have small interfaces, so the format and output mechanism can change independently. Not every repeated line of code justifies a common ancestor.

The Liskov substitution principle requires a client of the base contract to remain correct when using a subtype. Test the same scenarios for every implementation: valid input, a boundary, failure, and the expected result. If a subtype constantly requires special cases in the client, reconsider the contract.

A `fun interface` has one abstract method and supports convenient creation with a lambda. In this topic, it is enough to understand it as a small action contract. Complete examples of functions as values and lambdas belong to Topic 11. <https://kotlinlang.org/docs/fun-interfaces.html>.

::: info Screenshot
Create incomplete Shape subclass; Alt+Enter &gt; Implement members, select area and perimeter.
:::

Figure 6.6. Implementing abstract class members {.caption}

## UML and hierarchy testing

In UML, inheritance is represented by a solid line with a hollow triangle pointing to the base type. Interface implementation uses a dashed line with the same triangle. An abstract type is marked with italics or an explicit note. The arrow points from the concrete type to the general type, rather than the reverse.

Keep the properties and methods that explain the contract in the diagram. Alongside composition, indicate the dependency and object count if these matter to the model. Separate the type structure diagram from the diagram of concrete instances: they answer different questions.

::: info Screenshot
Cursor on Shape; Navigate &gt; Type Hierarchy (Ctrl+H), expand Rectangle to Square.
:::

Figure 6.7. Viewing the shape hierarchy {.caption}

To check polymorphism, place a breakpoint in the common client loop and in two overrides. Inspect the variable's static type and the object's actual class. Then step into the method and explain why the IDE opened that particular body. Compare the result with a direct call through a subtype variable.

Common mistakes include a missing `override`, an unnecessary `open`, narrowed visibility, duplicating a base class field, calling an open method before the subclass is ready, a `when` with dozens of type checks, and equals without a consistent hashCode. Each has a concrete remedy: a precise contract and fewer dependencies.

## Designing a contract test

Testing one concrete implementation and testing a common contract answer different questions. For Circle, you can test the area formula; for any Shape, you can test that the result is finite and nonnegative, reads are repeatable, and dimensions do not change. Run the shared checks for every new subtype. If you cannot formulate them, the base type's name has not yet become a sufficient contract.

Table 6.1. Testing the promises of the shape hierarchy {.caption}

| **Promise** | **Check** |
| --- | --- |
| A valid shape's area is positive | Create each implementation and check the result |
| An area query does not change state | Repeat the query; compare the area and perimeter |
| Invalid dimensions are rejected | Try zero, a negative number, NaN, and infinity |
| The client does not depend on a concrete type | Add a new subtype without changing the report loop |

Do not require identical numeric results from different formulas unless the contract promises them. Bus and Taxi have different prices but interpret valid distances and a zero-length trip consistently. These shared properties are what allow any Transport to be used correctly in the calculator.

A subtype may provide a stronger result, such as returning only an integer instead of any nonnegative value, if this does not harm the base type's client. However, it must not require additional preparation from the client that is absent from the base contract. Pay particular attention to exceptions, operation order, and method availability after a failure.

If a new “subtype” requires calling `prepare` before every `area`, that is a new precondition. Rather than hiding it in documentation, reconsider the model: create a ready-to-use Shape through a factory, or define a different contract for a calculation requiring resources. Words in UML do not eliminate behavioral differences.

During review, explain each inheritance arrow with one sentence about substitution. For a “has a” relationship, explain who creates the dependency and whether it can exist independently. These simple questions reveal deep hierarchies that actually arose only from a desire to reuse a few lines of code.
