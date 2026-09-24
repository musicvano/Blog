---
title: "Summary"
description: "Topic 18. Testing and refactoring: conclusions and review questions"
sourceHash: "6d79d81408f78e5e073876b6dba59351c8c8583cc7162499d63643cdb0af18e6"
---

# Summary

## Conclusions

Automated unit tests check individual classes quickly and repeatably, protecting against regressions; they should form the largest part of the testing pyramid. In .NET, tests are placed in a separate MSTest project that references the class library and are run in Test Explorer or with the `dotnet test` command. A test is built according to the Arrange–Act–Assert pattern, the result is checked with `Assert` assertions, and data sets are specified with `[DataRow]` attributes, choosing equivalence classes and boundary values. Dependencies on databases, the network, and time are replaced with test doubles through interfaces and `TimeProvider`. TDD builds code in short “red – green – refactor” cycles. Code coverage shows untested parts but does not guarantee the quality of the tests. Refactoring improves the structure of code without changing its behavior: “code smells” are eliminated in small steps under the protection of tests, using Visual Studio tools.

## Self-check questions

1. Why are automated tests needed? What is a regression?
2. What levels of testing do you know? What is the testing pyramid?
3. What do the FIRST principles mean?
4. How do you create a test project and reference a class library from it?
5. What are the `[TestClass]`, `[TestMethod]`, `[DataRow]`, and `[TestInitialize]` attributes for?
6. Describe the Arrange–Act–Assert pattern.
7. What MSTest assertions do you know? How do you check for an exception?
8. How do you compare floating-point numbers in a test?
9. What are equivalence classes and boundary values?
10. How do a stub, a fake, and a mock differ?
11. How do you test code that depends on the current time?
12. Describe the TDD cycle.
13. What does code coverage show? Why is 100% coverage not the goal?
14. What is refactoring? What are characterization tests?
15. What “code smells” do you know? Which refactorings eliminate them?

## Useful links

- Testing in .NET: <https://learn.microsoft.com/dotnet/core/testing/>
- Unit testing best practices: <https://learn.microsoft.com/dotnet/core/testing/unit-testing-best-practices>
- MSTest: <https://learn.microsoft.com/dotnet/core/testing/unit-testing-mstest-intro>
- Test Explorer: <https://learn.microsoft.com/visualstudio/test/run-unit-tests-with-test-explorer>
- Code coverage: <https://learn.microsoft.com/visualstudio/test/using-code-coverage-to-determine-how-much-code-is-being-tested>
- Refactoring in Visual Studio: <https://learn.microsoft.com/visualstudio/ide/refactoring-in-visual-studio>
