---
title: "Practice"
description: "Topic 8. Records, enum, and sealed classes: worked examples"
outline: [2, 3]
sourceHash: "5b46fe608933579058c4dac2f0c758c1ca02ba49f0b6115ab0271b6118f45809"
---

# Practice

## Example 1. A card with two enums

Suit and rank are not arbitrary strings. Card requires non-null components, and enum Rank has an explicit strength. It need not match ordinal, so the comparison rule does not depend on the constant's position.

```java
import java.util.Objects;

enum Suit { CLUBS, DIAMONDS, HEARTS, SPADES }

enum Rank {
    TWO(2), TEN(10), JACK(11), QUEEN(12), KING(13), ACE(14);
    private final int power;
    Rank(int power) { this.power = power; }
    int power() { return power; }
}

record Card(Suit suit, Rank rank) {
    Card {
        Objects.requireNonNull(suit);
        Objects.requireNonNull(rank);
    }

    boolean beats(Card other) {
        Objects.requireNonNull(other);
        return suit == other.suit
                && rank.power() > other.rank.power();
    }
}

public class Main {
    public static void main(String[] args) {
        Card ace = new Card(Suit.HEARTS, Rank.ACE);
        Card king = new Card(Suit.HEARTS, Rank.KING);
        System.out.println(ace);
        System.out.println(ace.beats(king));
        System.out.println(ace.beats(
                new Card(Suit.SPADES, Rank.TWO)));
        System.out.println(ace.equals(
                new Card(Suit.HEARTS, Rank.ACE)));
        try {
            Suit.valueOf("stars");
        } catch (IllegalArgumentException ex) {
            System.out.println("Unknown suit");
        }
    }
}
```

```text
Card[suit=HEARTS, rank=ACE]
true
false
true
Unknown suit
```

The rank list is deliberately shortened for the example. The beats rule compares only matching suits and does not model a complete card game. A full deck in a task variant must explicitly list all required ranks.

## Example 2. Valid order transitions

NEW allows PAID or CANCELLED, PAID allows SENT or CANCELLED, SENT allows DONE, and final states allow no transitions. The canMoveTo method defines the graph, while the immutable Order returns a new value only after successful validation.

```java
import java.util.Objects;

enum Status {
    NEW, PAID, SENT, DONE, CANCELLED;

    boolean canMoveTo(Status target) {
        Objects.requireNonNull(target);
        return switch (this) {
            case NEW -> target == PAID || target == CANCELLED;
            case PAID -> target == SENT || target == CANCELLED;
            case SENT -> target == DONE;
            case DONE, CANCELLED -> false;
        };
    }
}

record Order(String id, Status status) {
    Order {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("Empty id");
        }
        id = id.strip();
        Objects.requireNonNull(status);
    }

    Order moveTo(Status target) {
        if (!status.canMoveTo(target)) {
            throw new IllegalStateException("Forbidden transition");
        }
        return new Order(id, target);
    }
}

public class Main {
    public static void main(String[] args) {
        Order original = new Order("A1", Status.NEW);
        Order paid = original.moveTo(Status.PAID);
        Order sent = paid.moveTo(Status.SENT);
        System.out.println(original);
        System.out.println(sent);
        try {
            sent.moveTo(Status.CANCELLED);
        } catch (IllegalStateException ex) {
            System.out.println(ex.getMessage());
        }
        System.out.println(sent);
    }
}
```

```text
Order[id=A1, status=NEW]
Order[id=A1, status=SENT]
Forbidden transition
Order[id=A1, status=SENT]
```

Test every pair of states, including a transition to the same state. The given contract prohibits it. If the API should allow a repeated request without a change, document that explicitly and test it separately.

## Example 3. Messages as a closed set of forms

A message is either text or an image with a name and dimensions. No files are opened: this is only a validated metadata model. The switch uses record patterns, and the underscore ignores the name where only dimensions are needed.

```java
sealed interface Message permits TextMessage, ImageMessage { }

record TextMessage(String text) implements Message {
    TextMessage {
        if (text == null || text.isBlank() || text.length() > 200) {
            throw new IllegalArgumentException("Invalid text");
        }
        text = text.strip();
    }
}

record ImageMessage(String name, int width, int height)
        implements Message {
    ImageMessage {
        if (name == null || name.isBlank() || width < 1
                || height < 1 || width > 10_000 || height > 10_000) {
            throw new IllegalArgumentException("Invalid image");
        }
        name = name.strip();
    }
}

public class Main {
    static String preview(Message message) {
        return switch (message) {
            case null -> "No message";
            case TextMessage(var text) -> "Text: " + text;
            case ImageMessage(_, int w, int h) -> w + "x" + h;
        };
    }

    public static void main(String[] args) {
        Message[] messages = {
            new TextMessage(" Hello "),
            new ImageMessage("photo.png", 800, 600)
        };
        for (Message message : messages) {
            System.out.println(preview(message));
        }
        System.out.println(preview(null));
        try {
            new ImageMessage("bad.png", 0, 600);
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }
    }
}
```

```text
Text: Hello
800x600
No message
Invalid image
```

Add a temporary AudioMessage as a permitted subtype: the compiler should require extending preview. This checks model completeness, which an unconditional default with a generic message would hide.
