---
title: "Practice"
description: "Topic 9. Inheritance and polymorphism: worked examples"
outline: [2, 3]
sourceHash: "36d27a0ebbfbda136667ed3ed5dab83aa8a393fe17623e29831598e7906285b1"
---

# Practice

## Example 1. An animal hierarchy

Create an `Animal` base class with a virtual `Speak` method, the derived classes `Dog` and `Cat`, and a sealed `Puppy` class derived from `Dog`. Show the order in which constructors are called and a polymorphic method call for an array of animals.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Animal[] zoo =
    [new Dog("Brovko"), new Cat("Murka"), new Puppy("Rex")];

foreach (Animal a in zoo)
{
    Console.WriteLine($"{a.GetType().Name,-6} {a.Name}: {a.Speak()}");
}

int dogs = 0;
foreach (Animal a in zoo)
{
    if (a is Dog)            // a Puppy is also a Dog
    {
        dogs++;
    }
}
Console.WriteLine($"Dogs: {dogs}");

class Animal
{
    public Animal(string name)
    {
        Console.WriteLine($"  Animal({name}) constructor");
        Name = name;
    }

    public string Name { get; }

    public virtual string Speak() => "...";
}

class Dog : Animal
{
    public Dog(string name) : base(name)
    {
        Console.WriteLine($"  Dog({name}) constructor");
    }

    public override string Speak() => "Woof!";
}

// A puppy is a dog; this class cannot be inherited from.
sealed class Puppy : Dog
{
    public Puppy(string name) : base(name)
    {
        Console.WriteLine($"  Puppy({name}) constructor");
    }

    public override string Speak() => base.Speak() + " (squeaky)";
}

class Cat : Animal
{
    public Cat(string name) : base(name) { }

    public sealed override string Speak() => "Meow!";
}
```

For the puppy, three constructors run: `Animal`, `Dog`, and `Puppy`, from the base class to the derived one. The `Speak` method in `Puppy` extends the `Dog` version by calling `base.Speak()`. In the `Cat` class, the method is overridden with the `sealed override` modifier: descendants of `Cat` can no longer change it. The `a is Dog` check also returns `true` for the puppy. Output:

```
  Animal(Brovko) constructor
  Dog(Brovko) constructor
  Animal(Murka) constructor
  Animal(Rex) constructor
  Dog(Rex) constructor
  Puppy(Rex) constructor
Dog    Brovko: Woof!
Cat    Murka: Meow!
Puppy  Rex: Woof! (squeaky)
Dogs: 2
```

## Example 2. Overriding versus hiding

Create a `Logger` class with a virtual `Write` method and a regular `Level` method, and a derived `TimestampLogger` class that overrides `Write` and hides `Level`. Call both methods through variables of the base and derived types.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Logger viaBase = new TimestampLogger();
TimestampLogger viaDerived = new TimestampLogger();

viaBase.Write("override: via Logger");
viaDerived.Write("override: via TimestampLogger");

viaBase.Level("new: via Logger");
viaDerived.Level("new: via TimestampLogger");

class Logger
{
    public virtual void Write(string message) =>
        Console.WriteLine($"[Logger] {message}");

    public void Level(string message) =>
        Console.WriteLine($"[INFO] {message}");
}

class TimestampLogger : Logger
{
    // Overriding: called according to the actual type of the object.
    public override void Write(string message) =>
        base.Write($"12:00:00 {message}");

    // Hiding: called according to the type of the variable.
    public new void Level(string message) =>
        Console.WriteLine($"[INFO 12:00:00] {message}");
}
```

For the overridden `Write` method, the result does not depend on the variable’s type: both calls execute the `TimestampLogger` version. The hidden `Level` method is selected by the variable’s type, so the call through the `Logger` variable executes the base version. Output:

```
[Logger] 12:00:00 override: via Logger
[Logger] 12:00:00 override: via TimestampLogger
[INFO] new: via Logger
[INFO 12:00:00] new: via TimestampLogger
```

## Example 3. Messages with address validation

Create a `Message` → `Email`, `Sms` hierarchy in which the derived class constructors validate the recipient’s address and throw a custom `InvalidRecipientException`, while the cost and sending format are determined by virtual members.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

(string Kind, string To, string Text)[] requests =
[
    ("email", "olena@knu.edu.ua", "Tomorrow's schedule has been updated"),
    ("sms", "+380671234567", "Confirmation code: 4821"),
    ("email", "olena.knu.edu.ua", "A letter with an address error"),
    ("sms", "+38067", "Short message"),
    ("sms", "+380501112233", new string('★', 75)),
];

decimal cost = 0;
foreach (var (kind, to, text) in requests)
{
    try
    {
        Message m = kind == "email"
            ? new Email(to, text)
            : new Sms(to, text);
        cost += m.Cost;
        Console.WriteLine($"{m.Send()}  ({m.Cost:N2} UAH)");
    }
    catch (InvalidRecipientException ex)
    {
        Console.WriteLine(
            $"Rejected: {ex.Message} “{ex.Recipient}”");
    }
}
Console.WriteLine($"Sending cost: {cost:N2} UAH");

class Message
{
    protected Message(string to, string text)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(text);
        To = to;
        Text = text;
    }

    public string To { get; }
    public string Text { get; }
    public virtual decimal Cost => 0m;

    public virtual string Send() => $"→ {To}: {Text}";
}

class Email : Message
{
    public Email(string to, string text) : base(to, text)
    {
        int at = to.IndexOf('@');
        if (at <= 0 || to.IndexOf('.', at) < 0)
        {
            throw new InvalidRecipientException(
                "invalid e-mail address", to);
        }
    }

    public override string Send() => "E-mail " + base.Send();
}

sealed class Sms : Message
{
    private const int PartLength = 70;   // Unicode text: 70 characters
    private const decimal PricePerPart = 0.85m;

    public Sms(string to, string text) : base(to, text)
    {
        if (to.Length != 13 || !to.StartsWith("+380"))
        {
            throw new InvalidRecipientException(
                "invalid number", to);
        }
    }

    public int Parts => (Text.Length + PartLength - 1) / PartLength;
    public override decimal Cost => Parts * PricePerPart;

    public override string Send()
    {
        string preview = Text.Length > 20 ? Text[..20] + "…" : Text;
        return $"SMS → {To}: {preview} [{Parts} part(s)]";
    }
}

class InvalidRecipientException : Exception
{
    public InvalidRecipientException(string message, string recipient)
        : base(message)
    {
        Recipient = recipient;
    }

    public string Recipient { get; }
}
```

The `Message` constructor has the `protected` modifier: you cannot create a “plain” message, only an e-mail or an SMS. The `Cost` property for an SMS depends on the number of parts (70 Unicode characters, such as Cyrillic, per part). The `(string Kind, string To, string Text)[]` notation declares an array of tuples with named fields (Topic 11), and `foreach (var (kind, to, text) in requests)` deconstructs each tuple into variables. Output:

```
E-mail → olena@knu.edu.ua: Tomorrow's schedule has been updated  (0,00 UAH)
SMS → +380671234567: Confirmation code: 4… [1 part(s)]  (0,85 UAH)
Rejected: invalid e-mail address “olena.knu.edu.ua”
Rejected: invalid number “+38067”
SMS → +380501112233: ★★★★★★★★★★★★★★★★★★★★… [2 part(s)]  (1,70 UAH)
Sending cost: 2,55 UAH
```
