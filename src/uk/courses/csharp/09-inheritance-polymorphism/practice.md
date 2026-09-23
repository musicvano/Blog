---
title: "Практика"
description: "Тема 9. Наслідування та поліморфізм: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Ієрархія тварин

Створити базовий клас `Animal` з віртуальним методом `Speak`, похідні класи `Dog` і `Cat` та запечатаний клас `Puppy`, похідний від `Dog`. Показати порядок виклику конструкторів і поліморфний виклик методу для масиву тварин.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Animal[] zoo =
    [new Dog("Бровко"), new Cat("Мурка"), new Puppy("Рекс")];

foreach (Animal a in zoo)
{
    Console.WriteLine($"{a.GetType().Name,-6} {a.Name}: {a.Speak()}");
}

int dogs = 0;
foreach (Animal a in zoo)
{
    if (a is Dog)            // Puppy теж є Dog
    {
        dogs++;
    }
}
Console.WriteLine($"Собак: {dogs}");

class Animal
{
    public Animal(string name)
    {
        Console.WriteLine($"  конструктор Animal({name})");
        Name = name;
    }

    public string Name { get; }

    public virtual string Speak() => "...";
}

class Dog : Animal
{
    public Dog(string name) : base(name)
    {
        Console.WriteLine($"  конструктор Dog({name})");
    }

    public override string Speak() => "Гав!";
}

// Цуценя – собака; від цього класу наслідувати не можна.
sealed class Puppy : Dog
{
    public Puppy(string name) : base(name)
    {
        Console.WriteLine($"  конструктор Puppy({name})");
    }

    public override string Speak() => base.Speak() + " (тоненько)";
}

class Cat : Animal
{
    public Cat(string name) : base(name) { }

    public sealed override string Speak() => "Няв!";
}
```

Для цуценяти виконуються три конструктори: `Animal`, `Dog`, `Puppy` – від базового до похідного. Метод `Speak` у `Puppy` доповнює версію `Dog` викликом `base.Speak()`. У класі `Cat` метод перевизначено з модифікатором `sealed override`: нащадки `Cat` уже не зможуть його змінити. Перевірка `a is Dog` повертає `true` і для цуценяти. Результат:

```
  конструктор Animal(Бровко)
  конструктор Dog(Бровко)
  конструктор Animal(Мурка)
  конструктор Animal(Рекс)
  конструктор Dog(Рекс)
  конструктор Puppy(Рекс)
Dog    Бровко: Гав!
Cat    Мурка: Няв!
Puppy  Рекс: Гав! (тоненько)
Собак: 2
```

## Приклад 2. Перевизначення проти приховування

Створити клас `Logger` з віртуальним методом `Write` і звичайним методом `Level` та похідний клас `TimestampLogger`, який перевизначає `Write` і приховує `Level`. Викликати обидва методи через змінні базового та похідного типів.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Logger viaBase = new TimestampLogger();
TimestampLogger viaDerived = new TimestampLogger();

viaBase.Write("override: через Logger");
viaDerived.Write("override: через TimestampLogger");

viaBase.Level("new: через Logger");
viaDerived.Level("new: через TimestampLogger");

class Logger
{
    public virtual void Write(string message) =>
        Console.WriteLine($"[Logger] {message}");

    public void Level(string message) =>
        Console.WriteLine($"[INFO] {message}");
}

class TimestampLogger : Logger
{
    // Перевизначення: викликається за фактичним типом об’єкта.
    public override void Write(string message) =>
        base.Write($"12:00:00 {message}");

    // Приховування: викликається за типом змінної.
    public new void Level(string message) =>
        Console.WriteLine($"[INFO 12:00:00] {message}");
}
```

Для перевизначеного методу `Write` результат не залежить від типу змінної: обидва виклики виконують версію `TimestampLogger`. Прихований метод `Level` обирається за типом змінної, тому виклик через змінну `Logger` виконує базову версію. Результат:

```
[Logger] 12:00:00 override: через Logger
[Logger] 12:00:00 override: через TimestampLogger
[INFO] new: через Logger
[INFO 12:00:00] new: через TimestampLogger
```

## Приклад 3. Повідомлення з перевіркою адрес

Створити ієрархію `Message` → `Email`, `Sms`, у якій конструктори похідних класів перевіряють адресу отримувача й генерують власний виняток `InvalidRecipientException`, а вартість і формат відправлення визначаються віртуальними членами.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

(string Kind, string To, string Text)[] requests =
[
    ("email", "olena@knu.edu.ua", "Розклад на завтра оновлено"),
    ("sms", "+380671234567", "Код підтвердження: 4821"),
    ("email", "olena.knu.edu.ua", "Лист із помилкою в адресі"),
    ("sms", "+38067", "Коротке повідомлення"),
    ("sms", "+380501112233", new string('ї', 75)),
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
        Console.WriteLine($"{m.Send()}  ({m.Cost:N2} грн)");
    }
    catch (InvalidRecipientException ex)
    {
        Console.WriteLine(
            $"Відхилено: {ex.Message} «{ex.Recipient}»");
    }
}
Console.WriteLine($"Вартість відправлення: {cost:N2} грн");

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
                "некоректна e-mail адреса", to);
        }
    }

    public override string Send() => "E-mail " + base.Send();
}

sealed class Sms : Message
{
    private const int PartLength = 70;   // кирилиця: 70 символів
    private const decimal PricePerPart = 0.85m;

    public Sms(string to, string text) : base(to, text)
    {
        if (to.Length != 13 || !to.StartsWith("+380"))
        {
            throw new InvalidRecipientException(
                "некоректний номер", to);
        }
    }

    public int Parts => (Text.Length + PartLength - 1) / PartLength;
    public override decimal Cost => Parts * PricePerPart;

    public override string Send()
    {
        string preview = Text.Length > 20 ? Text[..20] + "…" : Text;
        return $"SMS → {To}: {preview} [{Parts} част.]";
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

Конструктор `Message` має модифікатор `protected`: створити «просте» повідомлення не можна, лише e-mail або SMS. Властивість `Cost` для SMS залежить від кількості частин (70 символів кирилиці в частині). Запис `(string Kind, string To, string Text)[]` оголошує масив кортежів з іменованими полями (тема 11), а `foreach (var (kind, to, text) in requests)` розкладає кожен кортеж на змінні. Результат:

```
E-mail → olena@knu.edu.ua: Розклад на завтра оновлено  (0,00 грн)
SMS → +380671234567: Код підтвердження: 4… [1 част.]  (0,85 грн)
Відхилено: некоректна e-mail адреса «olena.knu.edu.ua»
Відхилено: некоректний номер «+38067»
SMS → +380501112233: їїїїїїїїїїїїїїїїїїїї… [2 част.]  (1,70 грн)
Вартість відправлення: 2,55 грн
```
