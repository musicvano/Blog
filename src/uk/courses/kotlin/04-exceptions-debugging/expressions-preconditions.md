---
title: "Вирази try/throw і передумови"
description: "Тема 4. Винятки, Result, налагодження: Вирази try/throw і передумови"
outline: [2, 3]
---

# Вирази try/throw і передумови

## try і throw як вирази

`try` може повертати результат останнього виразу у блоці `try` або вибраному `catch`. `finally` не визначає цей результат. Повернення або новий виняток із `finally` може приховати попередню причину, тому такого стилю слід уникати.

```kotlin
fun parsePort(text: String): Int {
    val port = try {
        text.toInt()
    } catch (error: NumberFormatException) {
        throw IllegalArgumentException("Порт не є числом", error)
    }
    require(port in 1..65535) { "Порт має бути1–65535" }
    return port
}

fun main() {
    println(parsePort("8080"))
    try {
        parsePort("abc")
    } catch (error: IllegalArgumentException) {
        println(error.message)
        println(error.cause?.javaClass?.simpleName)
    }
}
```

Результат: `8080`, `Порт не є числом`, `NumberFormatException`. Другий параметр конструктора зберігає `cause`, тому технічну причину можна проаналізувати окремо від користувацького пояснення. Порт тут лише перевіряється; мережеве з’єднання програма не створює.

Тип виразу `throw` – `Nothing`, тому запис `value ?: throw ...` дозволяє отримати ненульове значення або завершити шлях помилкою. Це корисно, коли відсутність є порушенням контракту, а не звичайною ситуацією, яку потрібно представити як `null`.

## Передумови require та перевірка стану check

`require` перевіряє аргумент і кидає `IllegalArgumentException`; `check` перевіряє стан і кидає `IllegalStateException`. Вибір типу допомагає відрізнити помилку викликача від неможливого стану. `requireNotNull` та `checkNotNull` повертають ненульове значення або відповідний виняток.

| **Засіб** | **Приклад призначення** |
| --- | --- |
| `require` | Розмір додатний, аргумент у діапазоні |
| `requireNotNull` | Обов’язкове поле не відсутнє |
| `check` | Операція дозволена в поточному стані |
| `checkNotNull` | Внутрішній результат уже ініціалізований |
| `error` | Шлях не повинен бути досяжним |
| `TODO()` | Незавершений код, не готове рішення |

`TODO()` не є обробкою помилки користувача. Він породжує `NotImplementedError`, тому залишений в остаточному прикладі означає відсутню реалізацію. Так само не слід вимикати передумови замість виправлення неправильного порядку операцій.

### Приклад 2. Реєстрація віку

У навчальній моделі приймається вік 18–120 років. Спочатку перевіряється формат, потім предметне правило. Власний тип винятку відрізняє ці причини. Синтаксис класів докладно розглянемо в наступній темі.

```kotlin
class InvalidAgeException(message: String) :
    IllegalArgumentException(message)

fun validateAge(age: Int): Int {
    if (age !in 18..120) {
        throw InvalidAgeException("Потрібен вік18–120")
    }
    return age
}

fun registerAge(text: String): Int {
    require(text.isNotBlank()) { "Вік не задано" }
    return validateAge(text.toInt())
}

fun main() {
    print("Вік: ")
    val text = readlnOrNull() ?: ""
    try {
        val age = registerAge(text)
        println("Зареєстровано вік: $age")
    } catch (error: InvalidAgeException) {
        println("Правило реєстрації: ${error.message}")
    } catch (error: NumberFormatException) {
        println("Потрібен цілий вік")
    } catch (error: IllegalArgumentException) {
        println(error.message)
    }
}
```

Для 20 – успішна реєстрація, для 17 – повідомлення про правило, для`abc` – про цілий вік. Ці межі задані лише навчальним контрактом, а не універсальним правилом для всіх інформаційних систем.

Клас власного винятку доцільний, коли викликачеві потрібно відрізняти причину програмно. Створювати новий клас для кожного тексту повідомлення не потрібно. Не розбирайте фрази `message` через `contains`, щоб визначити тип помилки: локалізація змінить текст.
