---
title: "Abstraction and abstract classes"
description: "Topic 10. Abstract classes, interfaces: Abstraction and abstract classes"
outline: [2, 3]
sourceHash: "77a573dc13a13ccdf71b5be8b733902b9a44ef07d2d13f1b3c45aca12ca6cc23"
---

# Abstraction and abstract classes

## Abstraction

**Abstraction** means identifying the essential common features of objects and discarding irrelevant details. In the previous topic, the `Shape` base class had an `Area` method that returned 0: the area of a “shape in general” cannot be calculated, and that implementation was artificial. C# lets you express this idea directly: declare **what** derived classes must be able to do without specifying **how**. This is what **abstract classes** and **interfaces** are for.

## Abstract classes

An **abstract class** is marked with the `abstract` modifier. It can contain **abstract members**: methods, properties, and indexers without an implementation, which derived classes must implement (<https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/abstract>):

```cs
abstract class Shape
{
    protected Shape(string name) => Name = name;

    public string Name { get; }
    public abstract double Area();          // no body
    public abstract string Kind { get; }

    public string Describe() => $"{Kind}: {Area():F2}";
}
```

Properties of an abstract class (Fig. 10.1):

- you cannot create an object of an abstract class: `new Shape("x")` causes error CS0144;
- an abstract class can have fields, regular methods, and constructors; a constructor is called from a derived class through `base(…)`, so it is made `protected`;
- an abstract member is implicitly virtual, and a non-abstract derived class must override **all** abstract members (`override`); otherwise, error CS0534 occurs;
- a variable of an abstract type can refer to an object of any derived class: polymorphism works the same way as with virtual methods.

```mermaid
classDiagram
  direction LR
  class Shape {
    <<abstract>>
    +Name: string
    +Kind: string #123;abstract#125;*
    +Area#40;#41;: double #123;abstract#125;*
    +Describe#40;#41;: string
  }
  class Circle {
    +Kind #123;override#125;
    +Area#40;#41; #123;override#125;
  }
  class Rectangle {
    +Kind #123;override#125;
    +Area#40;#41; #123;override#125;
  }
  class Triangle {
    +Kind #123;override#125;
    +Area#40;#41; #123;override#125;
  }
  Shape <|-- Circle
  Shape <|-- Rectangle
  Shape <|-- Triangle
  note "the abstract class name<br>and abstract members<br>are in italics"
```

Figure 10.1. An abstract class and its implementations {.caption}

Visual Studio creates override stubs for abstract members automatically: place the cursor on the class name with error CS0534 → **Ctrl+.** → *Implement abstract class* (Fig. 10.2).

![Automatically implementing an abstract class](./images/01-vs-implement-abstract.png)

Figure 10.2. Automatically implementing an abstract class {.caption}

### Template method

Abstract classes are often used for the **template method** design pattern: the base class contains a regular method with the overall algorithm, and individual steps of it are abstract or virtual methods. Derived classes change the steps but not the order in which they run (Fig. 10.3). An example is given in the “Example programs” section.

```mermaid
flowchart TD
  subgraph REP ["<b><i><code>Report</code></i></b><br><code>Print()</code>"]
    S1["<code>PrintHeader()</code>"] --> S2["<code>PrintBody()</code> {abstract}"] --> S3["<code>PrintFooter()</code> {virtual}"]
  end
  S2 <-.- SR["<b><code>SalesReport</code></b><br><code>PrintBody</code>: sales"]
  S2 <-.- ST["<b><code>StockReport</code></b><br><code>PrintBody</code>: stock"]
  S3 ~~~ SR
  S3 ~~~ ST
  SR ~~~ N["the base class sets the order of steps,<br>derived classes implement the variable steps"]
  ST ~~~ N
```

Figure 10.3. Template method {.caption}
