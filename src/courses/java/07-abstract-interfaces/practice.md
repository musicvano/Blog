---
title: "Practice"
description: "Topic 7. Abstract classes, interfaces: worked examples"
outline: [2, 3]
sourceHash: "4fe0dcf38bd013748874ef421abde2d11760b2bd6bf5c37622c0b44cd59ca54d"
---

# Practice

## Example 1. Musical instruments

The abstract instrument validates the name and fixes the structure of a performance. Subclasses implement only the sound. The contract lets you process an ensemble in a single loop.

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

## Example 2. Two device roles

Switchable works through isOn and setOn; the default toggle method has no state of its own. Chargeable validates percentages with a static method. One object is accessible through two different interface references but retains a single state.

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

The chargeTo contract in this example means charging to a specified level, rather than setting an arbitrary charge. Decreasing it is therefore prohibited. After an unsuccessful attempt to switch on, the on flag remains false.

## Example 3. A stack and a snapshot of its node chain

The static Node does not need a reference to IntStack. Its fields are final, and push adds a new node without modifying the previous ones. The iterator remembers the head at creation time and traverses the chain as it existed then. These are deliberately defined snapshot semantics, rather than fail-fast behavior.

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

Also test next after exhaustion and two iterators used simultaneously. An old iterator keeps its nodes reachable even if the stack has already been emptied. This is a normal consequence of references, rather than a leak in itself.
