---
title: "Practice"
description: "Topic 5. Classes and objects: worked examples"
outline: [2, 3]
sourceHash: "c32ae4e7a4b6e27317d9e9cf29c268a20bf2f85fd1494d9e6b533ce145e1fa88"
---

# Practice

## Example 1. A rectangle with two constructors

The constructor taking one side delegates to the two-parameter constructor. Initial dimensions are finite and positive, and the fields are final. Area and perimeter are calculated on request and are not duplicated.

```java
final class Rectangle {
    private final double width;
    private final double height;

    Rectangle(double width, double height) {
        if (!Double.isFinite(width) || !Double.isFinite(height)
                || width <= 0 || height <= 0
                || width > 1e6 || height > 1e6) {
            throw new IllegalArgumentException("Invalid dimensions");
        }
        this.width = width;
        this.height = height;
    }

    Rectangle(double side) { this(side, side); }
    public double area() { return width * height; }
    public double perimeter() { return 2 * (width + height); }
    public String toString() { return width + " x " + height; }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle(3, 4);
        Rectangle square = new Rectangle(2);
        System.out.println(rectangle);
        System.out.println(rectangle.area());
        System.out.println(rectangle.perimeter());
        System.out.println(square.area());
        try {
            new Rectangle(Double.NaN);
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
3.0 x 4.0
12.0
14.0
4.0
Invalid dimensions
```

## Example 2. A discounted product

The price is specified in integer kopiykas before tax. The sample rate of 20% is an explicitly defined example constant, not tax advice. First, the discount is applied with rounding down, followed by tax using the same rule. Rounding order is part of the contract.

```java
final class Product {
    public static final int TAX_PERCENT = 20;
    private final String name;
    private long price;
    private int discount;

    Product(String name, long price) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Invalid name");
        }
        this.name = name;
        setPrice(price);
    }

    public void setPrice(long value) {
        if (value < 0 || value > 1_000_000_000L) {
            throw new IllegalArgumentException("Invalid price");
        }
        price = value;
    }

    public void setDiscount(int value) {
        if (value < 0 || value > 100) {
            throw new IllegalArgumentException("Invalid discount");
        }
        discount = value;
    }

    public long total() {
        long net = price * (100 - discount) / 100;
        return net + net * TAX_PERCENT / 100;
    }

    public String toString() { return name + ": " + total(); }
}

public class Main {
    public static void main(String[] args) {
        Product product = new Product("Notebook", 10000);
        product.setDiscount(10);
        System.out.println(product);
        try {
            product.setDiscount(101);
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
        System.out.println(product.total());
    }
}
```

```text
Notebook: 10800
Invalid discount
10800
```

## Example 3. Visitors and a shared total

Each entrance has its own counter, while a static field accumulates the total number of admitted visitors. This is a single-threaded model; thread synchronization is not covered here. The bound prevents overflow. The file Counter.java belongs to the ua.edu.study.counter package.

```java
package ua.edu.study.counter;

public final class Counter {
    private static int total;
    private int local;

    public void enter(int count) {
        if (count < 0 || count > 1_000_000 - total) {
            throw new IllegalArgumentException("Invalid count");
        }
        local += count;
        total += count;
    }

    public int getLocal() { return local; }
    public static int getTotal() { return total; }
}
```

The file Main.java belongs to the ua.edu.study.app package.

```java
package ua.edu.study.app;

import ua.edu.study.counter.Counter;

public class Main {
    public static void main(String[] args) {
        Counter north = new Counter();
        Counter south = new Counter();
        north.enter(3);
        south.enter(2);
        System.out.println(north.getLocal());
        System.out.println(south.getLocal());
        System.out.println(Counter.getTotal());
    }
}
```

```text
3
2
5
```

Build the package with javac -d out, run the fully qualified class name, create a JAR with Main-Class, and run it again. Compare stdout: packaging should not change the domain result.
