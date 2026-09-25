---
title: "Practice"
description: "Topic 6. Inheritance and polymorphism: worked examples"
outline: [2, 3]
sourceHash: "7be47ad93fb12b6fbcaa9c1a81822bca10f3d9e781577b3eb030bc160890c107"
---

# Practice

## Example 1. Animal sounds

The Animal class stores a name and defines a default sound. Subclasses change only the sound. The array is declared with the base type, so the loop has no conditions based on class names. Every construction path uses the base constructor's validation.

```java
class Animal {
    private final String name;

    Animal(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Empty name");
        }
        this.name = name.strip();
    }

    public String sound() { return "..."; }
    public final String describe() { return name + ": " + sound(); }
}

final class Cat extends Animal {
    Cat(String name) { super(name); }
    @Override
    public String sound() { return "meow"; }
}

final class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override
    public String sound() { return "woof"; }
}

public class Main {
    public static void main(String[] args) {
        Animal[] animals = {new Cat("Mira"), new Dog("Rex")};
        for (Animal animal : animals) {
            System.out.println(animal.describe());
        }
        try {
            new Cat(" ");
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }
    }
}
```

```text
Mira: meow
Rex: woof
Empty name
```

The final describe method fixes the format but uses the overridable sound method. The call occurs after construction, when invariants have already been established.

## Example 2. An account with interest

The balance field is private. The subclass receives a protected credit method that checks the amount and limit. The sample interest rule is one percent of the current balance, discarding fractional kopiykas. The withdraw method is final: a subclass cannot weaken the available funds check.

```java
class Account {
    private long balance;

    Account(long balance) {
        if (balance < 0 || balance > 1_000_000) {
            throw new IllegalArgumentException("Invalid balance");
        }
        this.balance = balance;
    }

    public final long balance() { return balance; }

    protected final void credit(long amount) {
        if (amount < 0 || amount > 1_000_000 - balance) {
            throw new IllegalArgumentException("Invalid credit");
        }
        balance += amount;
    }

    public final void withdraw(long amount) {
        if (amount <= 0 || amount > balance) {
            throw new IllegalArgumentException("Invalid withdrawal");
        }
        balance -= amount;
    }

    public void closePeriod() { }
}

final class SavingsAccount extends Account {
    SavingsAccount(long balance) { super(balance); }
    @Override
    public void closePeriod() { credit(balance() / 100); }
}

public class Main {
    public static void main(String[] args) {
        Account account = new SavingsAccount(10_000);
        account.closePeriod();
        System.out.println(account.balance());
        account.withdraw(100);
        System.out.println(account.balance());
        try {
            account.withdraw(20_000);
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }
        System.out.println(account.balance());
    }
}
```

```text
10100
10000
Invalid withdrawal
10000
```

Separately test a balance of 0, exactly 100 kopiykas, and the upper bound. Interest near the limit may be rejected; this is part of the closePeriod contract that should be documented for all account types, rather than hidden in a subclass.

## Example 3. Product equality and copying

We compare only objects of the same exact class. For DiscountProduct, the discount percentage is also meaningful. Calling super.equals preserves symmetry because the base method uses getClass. The name and price are immutable, and the copy constructor creates a separate object with the same value.

```java
import java.util.Objects;

class Product {
    private final String name;
    private final long price;

    Product(String name, long price) {
        if (name == null || name.isBlank()
                || price < 0 || price > 1_000_000) {
            throw new IllegalArgumentException("Invalid product");
        }
        this.name = name.strip();
        this.price = price;
    }

    Product(Product other) {
        this(Objects.requireNonNull(other).name, other.price);
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) { return true; }
        if (other == null || getClass() != other.getClass()) {
            return false;
        }
        Product product = (Product) other;
        return price == product.price && name.equals(product.name);
    }

    @Override
    public int hashCode() { return Objects.hash(name, price); }
    @Override
    public String toString() { return name + ": " + price; }
}

final class DiscountProduct extends Product {
    private final int percent;

    DiscountProduct(String name, long price, int percent) {
        if (percent < 0 || percent > 100) {
            throw new IllegalArgumentException("Invalid discount");
        }
        super(name, price);
        this.percent = percent;
    }

    @Override
    public boolean equals(Object other) {
        return super.equals(other)
                && percent == ((DiscountProduct) other).percent;
    }

    @Override
    public int hashCode() { return 31 * super.hashCode() + percent; }

    @Override
    public String toString() {
        return super.toString() + "/" + percent;
    }
}

public class Main {
    public static void main(String[] args) {
        Product a = new Product("Pen", 500);
        Product b = new Product(a);
        Product c = new DiscountProduct("Pen", 500, 10);
        Product d = new DiscountProduct("Pen", 500, 10);
        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(a.equals(c));
        System.out.println(c.equals(a));
        System.out.println(c.equals(d));
        System.out.println(c.hashCode() == d.hashCode());
        System.out.println(c);
    }
}
```

```text
false
true
false
false
true
true
Pen: 500/10
```

The Product copy constructor does not preserve subclass-specific fields. If a copy of DiscountProduct is needed, explicitly define its constructor or factory. Do not call conversion to a base value a deep copy of the entire derived object.
