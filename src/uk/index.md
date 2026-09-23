---
layout: home

hero:
  name: "Dev Blog"
  text: "Програмування та розробка"
  tagline: C, C++, C#, Java, Kotlin, Python, TypeScript, JavaScript
  image:
    src: /images/avatar.svg
    alt: Аватар
  actions:
    - theme: brand
      text: Обрати курс
      link: "#courses"
    - theme: alt
      text: Як навчатися
      link: "#how-to-study"
    - theme: alt
      text: Про автора
      link: /uk/about

features:
  - icon:
      src: /icons/course-cpp.svg
      width: 48
      height: 48
    title: ООП мовою C++
    details: Від першої програми до класів, шаблонів, контейнерів, ranges і модулів C++26. 16 тем
    link: /uk/courses/cpp/
    linkText: Перейти до курсу
  - icon:
      src: /icons/course-csharp.svg
      width: 48
      height: 48
    title: ООП мовою C#
    details: Платформа .NET, класи, інтерфейси, узагальнення, LINQ, файли, SOLID і модульне тестування. 18 тем
    link: /uk/courses/csharp/
    linkText: Перейти до курсу
  - icon:
      src: /icons/course-dotnet.svg
      width: 48
      height: 48
    title: C# і технології .NET
    details: Продовження курсу C#. Windows Forms, async/await, бази даних, REST, SignalR, WPF, MAUI та штучний інтелект. 16 тем
    link: /uk/courses/csharp-advanced/
    linkText: Перейти до курсу
  - icon:
      src: /icons/course-java.svg
      width: 48
      height: 48
    title: ООП мовою Java
    details: JDK 27 та IntelliJ IDEA, класи, записи, узагальнення, колекції, Stream API, JDBC і JavaFX. 16 тем
    link: /uk/courses/java/
    linkText: Перейти до курсу
  - icon:
      src: /icons/course-kotlin.svg
      width: 48
      height: 48
    title: ООП мовою Kotlin
    details: Null-безпека, класи даних, узагальнення, колекції, корутини, Exposed і Compose Multiplatform. 16 тем
    link: /uk/courses/kotlin/
    linkText: Перейти до курсу
  - icon:
      src: /icons/course-python.svg
      width: 48
      height: 48
    title: ООП мовою Python
    details: Python 3.14 і PyCharm, класи й протоколи, pytest, SQLite, NumPy і pandas, PySide6 та пакування. 16 тем
    link: /uk/courses/python/
    linkText: Перейти до курсу
  - icon:
      src: /icons/course-parallel.svg
      width: 48
      height: 48
    title: Паралельні та розподілені обчислення
    details: Потоки, TPL і PLINQ, SIMD, OpenMP, CUDA, MPI, кластер Slurm, RabbitMQ, Orleans, Docker і Kubernetes. 18 тем
    link: /uk/courses/parallel/
    linkText: Перейти до курсу

head:
  - - meta
    - itemprop: name
      content: Dev Blog
  - - meta
    - itemprop: description
      content: "Курси з програмування для студентів: ООП мовами C++, C#, Java, Kotlin і Python, паралельні та розподілені обчислення"
  - - meta
    - itemprop: image
      content: https://mvano.com/images/social-wide.png
  - - meta
    - property: og:url
      content: https://mvano.com/uk/
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:locale
      content: uk_UA
  - - meta
    - property: og:title
      content: Dev Blog
  - - meta
    - property: og:description
      content: "Курси з програмування для студентів: ООП мовами C++, C#, Java, Kotlin і Python, паралельні та розподілені обчислення"
  - - meta
    - property: og:image
      content: https://mvano.com/images/social-wide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Dev Blog
  - - meta
    - name: twitter:description
      content: "Курси з програмування для студентів: ООП мовами C++, C#, Java, Kotlin і Python, паралельні та розподілені обчислення"
  - - meta
    - name: twitter:image
      content: https://mvano.com/images/social-wide.png
---

## Курси {#courses}

Оберіть курс своєї дисципліни. Курси ООП починаються з основ мови і не потребують досвіду роботи з нею. «C# і технології .NET» продовжує курс «ООП мовою C#», а «Паралельні та розподілені обчислення» розраховано на тих, хто вже пройшов курс об’єктно-орієнтованого програмування.

| Курс                                                          | Середовище розробки                      |
| ------------------------------------------------------------- | ---------------------------------------- |
| [ООП мовою C++](/uk/courses/cpp/)                             | Visual Studio 2026 (MSVC)                |
| [ООП мовою C#](/uk/courses/csharp/)                           | Visual Studio 2026, .NET 10              |
| [C# і технології .NET](/uk/courses/csharp-advanced/)          | Visual Studio 2026, .NET 10, PostgreSQL  |
| [ООП мовою Java](/uk/courses/java/)                           | IntelliJ IDEA, JDK 27                    |
| [ООП мовою Kotlin](/uk/courses/kotlin/)                       | IntelliJ IDEA, Kotlin 2.4                |
| [ООП мовою Python](/uk/courses/python/)                       | PyCharm, Python 3.14                     |
| [Паралельні та розподілені обчислення](/uk/courses/parallel/) | Rider, CLion, .NET 10, GCC, CUDA, Docker |

[Усі курси з описом →](/uk/courses/)

## Як влаштовано курс

Курс поділено на теми. Кожна тема відповідає одній лекції та одній лабораторній роботі і має чотири частини:

1. **Лекція.** Теорію подано розділами в порядку читання, з прикладами коду, схемами та результатами виконання.
2. **Практика.** Розібрані приклади розв’язання задач із повним кодом, які показують, як виконувати лабораторну роботу.
3. **Завдання.** 30 варіантів лабораторної роботи, у кожному три рівні складності: 1 – початковий, 2 – базовий, 3 – високий. Кожне завдання самодостатнє, тому можна одразу братися за обраний рівень.
4. **Підсумки.** Висновки теми, питання для самоперевірки та корисні посилання.

Для підготовки до контролю кожен курс також має **Контрольні питання**, **Контрольні завдання**, **Корисні посилання** і **Рекомендовану літературу**.

## Як навчатися {#how-to-study}

1. Відкрийте свій курс і встановіть середовище розробки, назване на сторінці курсу. Як це зробити, пояснено в першій темі кожного курсу, крім «C# і технології .NET», що використовує середовище з курсу «ООП мовою C#».
2. Читайте розділи лекції по черзі. Набирайте та запускайте приклади самостійно, а не лише читайте їх.
3. На сторінці **Практика** спершу спробуйте розв’язати задачу самі, а потім порівняйте своє рішення з розібраним.
4. На сторінці **Завдання** знайдіть свій варіант (номер повідомляє викладач) і оберіть рівень складності.
5. Перевірте себе питаннями на сторінці **Підсумки** і лише після цього переходьте до наступної теми.
6. Перед іспитом повторіть **Контрольні питання** та розв’яжіть кілька **Контрольних завдань**.

::: tip Навігація
Теми та їхні розділи перелічено в меню ліворуч (на телефоні воно відкривається кнопкою «Меню»). Кнопка «Наступна сторінка» внизу кожної сторінки веде далі за програмою курсу, а список «На цій сторінці» праворуч – до потрібного підрозділу.
:::
