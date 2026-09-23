---
title: "Практика"
description: "Тема 7. Абстрактні класи, інтерфейси: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Музичні інструменти

Абстрактний інструмент перевіряє назву й фіксує структуру виконання. Підкласи реалізують лише звук. Контракт дозволяє обробити ансамбль одним циклом.

```java
abstract class Instrument {
    private final String name;
    Instrument(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Empty name");
        }
        this.name = name.strip();
    }
    protected abstract String sound();
    public final String play() { return name + ": " + sound(); }
}
final class Guitar extends Instrument {
    Guitar(String name) { super(name); }
    @Override
    protected String sound() { return "strings"; }
}
final class Piano extends Instrument {
    Piano(String name) { super(name); }
    @Override
    protected String sound() { return "keys"; }
}
public class Main {
    public static void main(String[] args) {
        Instrument[] band = {new Guitar("G1"), new Piano("P1")};
        for (Instrument instrument : band) {
            System.out.println(instrument.play());
        }
        try {
            new Piano("");
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }
    }
}
```

```text
G1: strings
P1: keys
Empty name
```

## Приклад 2. Дві ролі пристрою

Switchable працює через isOn і setOn; default toggle не має власного стану. Chargeable перевіряє відсотки статичним методом. Один об’єкт доступний через два різні інтерфейсні посилання, але зберігає один стан.

```java
interface Switchable {
    boolean isOn();
    void setOn(boolean on);
    default void toggle() { setOn(!isOn()); }
}
interface Chargeable {
    int charge();
    void chargeTo(int percent);
    static boolean valid(int value) {
        return value >= 0 && value <= 100;
    }
}
final class Device implements Switchable, Chargeable {
    private boolean on;
    private int charge;
    @Override
    public boolean isOn() { return on; }
    @Override
    public void setOn(boolean on) {
        if (on && charge == 0) {
            throw new IllegalStateException("Empty battery");
        }
        this.on = on;
    }
    @Override
    public int charge() { return charge; }
    @Override
    public void chargeTo(int percent) {
        if (!Chargeable.valid(percent) || percent < charge) {
            throw new IllegalArgumentException("Invalid charge");
        }
        charge = percent;
    }
}
public class Main {
    public static void main(String[] args) {
        Device device = new Device();
        Switchable control = device;
        Chargeable battery = device;
        try {
            control.toggle();
        } catch (IllegalStateException ex) {
            System.out.println(ex.getMessage());
        }
        battery.chargeTo(50);
        control.toggle();
        System.out.println(control.isOn());
        System.out.println(battery.charge());
        control.toggle();
        System.out.println(control.isOn());
    }
}
```

```text
Empty battery
true
50
false
```

Контракт chargeTo в цьому прикладі означає заряджання до заданого рівня, а не довільне встановлення заряду. Тому зменшення заборонене. Після невдалого ввімкнення прапорець on лишається false.

## Приклад 3. Стек і знімок ланцюжка вузлів

Статичний Node не потребує посилання на IntStack. Його поля фінальні, а push додає новий вузол, не змінюючи попередніх. Ітератор запам’ятовує голову на момент створення й обходить тодішній ланцюжок. Це свідомо визначена семантика знімка, а не fail-fast.

```java
import java.util.Iterator;
import java.util.NoSuchElementException;

final class IntStack implements Iterable<Integer> {
    private static final class Node {
        final int value;
        final Node next;
        Node(int value, Node next) {
            this.value = value;
            this.next = next;
        }
    }
    private Node head;
    public void push(int value) { head = new Node(value, head); }
    public int pop() {
        if (head == null) { throw new NoSuchElementException(); }
        int result = head.value;
        head = head.next;
        return result;
    }
    @Override
    public Iterator<Integer> iterator() {
        return new StackIterator();
    }
    private final class StackIterator implements Iterator<Integer> {
        private Node cursor = head;
        @Override
        public boolean hasNext() { return cursor != null; }
        @Override
        public Integer next() {
            if (!hasNext()) { throw new NoSuchElementException(); }
            int result = cursor.value;
            cursor = cursor.next;
            return result;
        }
    }
}
public class Main {
    public static void main(String[] args) {
        IntStack stack = new IntStack();
        stack.push(10);
        stack.push(20);
        Iterator<Integer> snapshot = stack.iterator();
        stack.push(30);
        while (snapshot.hasNext()) {
            System.out.println(snapshot.next());
        }
        System.out.println("Pop: " + stack.pop());
        System.out.println("Pop: " + stack.pop());
        System.out.println("Pop: " + stack.pop());
        try {
            stack.pop();
        } catch (NoSuchElementException ex) {
            System.out.println("Empty stack");
        }
    }
}
```

```text
20
10
Pop: 30
Pop: 20
Pop: 10
Empty stack
```

Перевірте також next після завершення та два ітератори одночасно. Наявність старого ітератора утримує його вузли доступними, навіть якщо стек уже спорожнено. Це звичайний наслідок посилань, а не витік сам по собі.
