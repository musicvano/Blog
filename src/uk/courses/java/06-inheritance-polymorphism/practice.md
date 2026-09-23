---
title: "Практика"
description: "Тема 6. Наслідування та поліморфізм: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Голоси тварин

Клас Animal зберігає ім’я та визначає стандартний голос. Підкласи змінюють лише голос. Масив оголошено через базовий тип, тому цикл не містить умов за назвами класів. Усі створення використовують перевірку базового конструктора.

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

Фінальний describe фіксує формат, але використовує перевизначуваний sound. Виклик відбувається після конструювання, коли інваріанти вже встановлені.

## Приклад 2. Рахунок із нарахуванням

Поле balance приватне. Підклас отримує захищений метод credit, який перевіряє суму та ліміт. Навчальне правило нарахування – один відсоток поточного залишку з відкиданням дробової копійки. Метод withdraw фінальний: підклас не може послабити перевірку доступних коштів.

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

Перевірте окремо залишок 0, рівно 100 копійок і верхню межу. Нарахування біля ліміту може відхилятися; це частина контракту closePeriod, яку слід документувати для всіх видів рахунків, а не приховувати в підкласі.

## Приклад 3. Рівність товарів і копіювання

Порівнюємо лише об’єкти одного точного класу. Для DiscountProduct значущі також відсотки знижки. Виклик super.equals зберігає симетричність, оскільки базовий метод використовує getClass. Ім’я й ціна незмінні, а копіювальний конструктор створює окремий об’єкт із тим самим значенням.

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

Копіювальний конструктор Product не зберігає специфічні поля підкласу. Якщо потрібна копія DiscountProduct, слід явно визначити її конструктор або фабрику. Не називайте перетворення до базового значення глибокою копією всього похідного об’єкта.
