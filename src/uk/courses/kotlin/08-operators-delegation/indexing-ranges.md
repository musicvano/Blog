---
title: "Індексація, діапазони та ітерація"
description: "Тема 8. Операції та делегування: Індексація, діапазони та ітерація"
outline: [2, 3]
---

# Індексація, діапазони та ітерація

## Індексація, виклик, належність і компоненти

`get` та `set` реалізують доступ за індексами. Кілька індексів дозволяють матричний запис `m[row, column]`. Сетер одержує нове значення останнім аргументом. Межі індексів залишаються відповідальністю класу, а не автоматичним наслідком operator.

`x in a` викликає `a.contains(x)` – отримувач стоїть праворуч у звичайному виразі. `!in` заперечує результат contains. `invoke` дозволяє звертатися до об’єкта як до функції. Це доречно для полінома або перевірки, але може приховувати дію, якщо об’єкт одночасно має багато несумісних ролей.

`component1`, `component2` і наступні функції підтримують деструктуризацію звичайного класу. Data-клас генерує їх сам. Компоненти мають стабільний зміст і порядок; зміна порядку ламає клієнтське трактування навіть без помилки компіляції.

## Діапазон та ітерація

`rangeTo` відповідає закритому діапазону `a..b`, а rangeUntil – діапазону `a..<b` з невключеною верхньою межею. Саме створення об’єкта діапазону не робить його автоматично перебираним. Для циклу потрібен iterator, а ітератор має hasNext і next. Наступні теми докладніше пояснять узагальнені типи й колекції.

У прикладі DateSpan реалізує `Iterable<LocalDate>`, а внутрішній ітератор – `Iterator<LocalDate>`. Кутові дужки тут означають, які значення повертає перебір. Після завершення next породжує NoSuchElementException. Кожен виклик iterator створює окремий курсор, тому діапазон можна пройти повторно.

### Приклад 2. Діапазон календарних дат

Використано перевірений календарний тип JVM LocalDate. Дата закінчення включена. Порожній діапазон визначено як початок після кінця. Ітератор не додає день після останньої дати, тому не переповнюється навіть на LocalDate.MAX. <https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>.

```kotlin
import java.time.LocalDate

class DateSpan(
    private val start: LocalDate,
    private val end: LocalDate
) : Iterable<LocalDate> {
    operator fun contains(date: LocalDate): Boolean =
        date >= start && date <= end

    override fun iterator(): Iterator<LocalDate> =
        object : Iterator<LocalDate> {
            private var current = start
            private var available = start <= end

            override fun hasNext(): Boolean = available

            override fun next(): LocalDate {
                if (!available) throw NoSuchElementException()
                val result = current
                if (current == end) available = false
                else current = current.plusDays(1)
                return result
            }
        }
}

operator fun LocalDate.rangeTo(other: LocalDate): DateSpan =
    DateSpan(this, other)

fun main() {
    val start = LocalDate.of(2024, 2, 28)
    val end = LocalDate.of(2024, 3, 1)
    val span = start..end
    for (date in span) println(date)
    println(LocalDate.of(2024, 2, 29) in span)
    println(LocalDate.of(2024, 3, 2) in span)
}
```

```text
2024-02-28
2024-02-29
2024-03-01
true
false
```

Розширення rangeTo доступне там, де його оголошено або імпортовано. Воно не змінює клас LocalDate у бібліотеці. Контракт contains та перебору узгоджений: усі видані дати належать діапазону, верхня межа видається рівно один раз.
