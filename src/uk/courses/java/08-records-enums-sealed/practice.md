---
title: "Практика"
description: "Тема 8. Записи, enum і sealed-класи: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Карта з двома переліками

Масть і ранг не є довільними рядками. Card вимагає ненульові компоненти, а enum Rank має явну вагу. Вона може не збігатися з ordinal, тому правило порівняння не залежить від позиції константи.

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

Перелік рангів навмисно скорочений для прикладу. Правило beats дозволяє порівнювати лише однакову масть і не моделює повну карткову гру. Повна колода у варіанті повинна явно перелічити всі потрібні ранги.

## Приклад 2. Допустимі переходи замовлення

Стан NEW дозволяє PAID або CANCELLED, PAID – SENT або CANCELLED, SENT – DONE, а фінальні стани не дозволяють переходів. Метод canMoveTo визначає граф, а незмінний Order повертає нове значення лише після успішної перевірки.

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

Перевірте всі пари станів, зокрема перехід у той самий стан. За наведеним контрактом він заборонений. Якщо API має дозволяти повторний запит без зміни, це потрібно явно записати й перевірити окремо.

## Приклад 3. Повідомлення як закритий набір форм

Повідомлення буває текстовим або зображенням із назвою й розмірами. Жодні файли не відкриваються: це лише перевірена модель метаданих. Switch використовує зразки записів, а підкреслення ігнорує назву там, де потрібні тільки розміри.

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

Додайте тимчасовий AudioMessage як дозволений підтип: компілятор повинен вимагати доповнити preview. Це перевірка повноти моделі, яку приховав би безумовний default із загальним повідомленням.
