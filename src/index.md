---
layout: home

hero:
  name: "Dev Blog"
  text: "Programming and Development"
  tagline: C, C++, C#, Java, Kotlin, Python, TypeScript, JavaScript
  image:
    src: /images/avatar.svg
    alt: Avatar
  actions:
    - theme: brand
      text: Choose a course
      link: "#courses"
    - theme: alt
      text: How to study
      link: "#how-to-study"
    - theme: alt
      text: About the author
      link: /about

features:
  - icon:
      src: /icons/course-cpp.svg
      width: 48
      height: 48
    title: C++ OOP
    details: From your first program to classes, templates, containers, ranges and C++26 modules. 16 topics
    link: /courses/cpp/
    linkText: Go to the course
  - icon:
      src: /icons/course-csharp.svg
      width: 48
      height: 48
    title: C# OOP
    details: The .NET platform, classes, interfaces, generics, LINQ, files, SOLID and unit testing. 18 topics
    link: /uk/courses/csharp/
    linkText: Go to the course (in Ukrainian)
  - icon:
      src: /icons/course-dotnet.svg
      width: 48
      height: 48
    title: C# and .NET technologies
    details: A follow-up to the C# course. Windows Forms, async/await, databases, REST, SignalR, WPF, MAUI and AI. 16 topics
    link: /uk/courses/csharp-advanced/
    linkText: Go to the course (in Ukrainian)
  - icon:
      src: /icons/course-java.svg
      width: 48
      height: 48
    title: Java OOP
    details: JDK 27 and IntelliJ IDEA, classes, records, generics, collections, the Stream API, JDBC and JavaFX. 16 topics
    link: /uk/courses/java/
    linkText: Go to the course (in Ukrainian)
  - icon:
      src: /icons/course-kotlin.svg
      width: 48
      height: 48
    title: Kotlin OOP
    details: Null safety, data classes, generics, collections, coroutines, Exposed and Compose Multiplatform. 16 topics
    link: /uk/courses/kotlin/
    linkText: Go to the course (in Ukrainian)
  - icon:
      src: /icons/course-python.svg
      width: 48
      height: 48
    title: Python OOP
    details: Python 3.14 and PyCharm, classes and protocols, pytest, SQLite, NumPy and pandas, PySide6 and packaging. 16 topics
    link: /uk/courses/python/
    linkText: Go to the course (in Ukrainian)
  - icon:
      src: /icons/course-parallel.svg
      width: 48
      height: 48
    title: Parallel and distributed computing
    details: Threads, TPL and PLINQ, SIMD, OpenMP, CUDA, MPI, a Slurm cluster, RabbitMQ, Orleans, Docker and Kubernetes. 18 topics
    link: /uk/courses/parallel/
    linkText: Go to the course (in Ukrainian)

head:
  - - meta
    - itemprop: name
      content: Dev Blog
  - - meta
    - itemprop: description
      content: "Programming courses for students: OOP in C++, C#, Java, Kotlin and Python, parallel and distributed computing"
  - - meta
    - itemprop: image
      content: https://mvano.com/images/social-wide.png
  - - meta
    - property: og:url
      content: https://mvano.com
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Dev Blog
  - - meta
    - property: og:description
      content: "Programming courses for students: OOP in C++, C#, Java, Kotlin and Python, parallel and distributed computing"
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
      content: "Programming courses for students: OOP in C++, C#, Java, Kotlin and Python, parallel and distributed computing"
  - - meta
    - name: twitter:image
      content: https://mvano.com/images/social-wide.png
---

## Courses {#courses}

Choose the course for your subject. The OOP courses start from the basics of the language and need no prior experience with it. “C# and .NET technologies” continues the “C# OOP” course, and “Parallel and distributed computing” is meant for those who have already completed an object-oriented programming course. The courses marked “in Ukrainian” are being translated into English.

| Course                                                                     | Development environment                  |
| -------------------------------------------------------------------------- | ---------------------------------------- |
| [C++ OOP](/courses/cpp/)                                                   | Visual Studio 2026 (MSVC)                |
| [C# OOP](/uk/courses/csharp/) (in Ukrainian)                               | Visual Studio 2026, .NET 10              |
| [C# and .NET technologies](/uk/courses/csharp-advanced/) (in Ukrainian)    | Visual Studio 2026, .NET 10, PostgreSQL  |
| [Java OOP](/uk/courses/java/) (in Ukrainian)                               | IntelliJ IDEA, JDK 27                    |
| [Kotlin OOP](/uk/courses/kotlin/) (in Ukrainian)                           | IntelliJ IDEA, Kotlin 2.4                |
| [Python OOP](/uk/courses/python/) (in Ukrainian)                           | PyCharm, Python 3.14                     |
| [Parallel and distributed computing](/uk/courses/parallel/) (in Ukrainian) | Rider, CLion, .NET 10, GCC, CUDA, Docker |

[All courses with descriptions →](/courses/)

## How a course is organized

A course is divided into topics. Each topic corresponds to one lecture and one lab assignment and has four parts:

1. **Lecture.** The theory is split into chapters in reading order, with code examples, diagrams and program output.
2. **Practice.** Worked examples with complete code that show how to do the lab assignment.
3. **Tasks.** 30 variants of the lab assignment, each at three levels of difficulty: 1 – initial, 2 – basic, 3 – advanced. Every task is self-contained, so you can start right away at the level you choose.
4. **Summary.** The topic’s conclusions, self-check questions and useful links.

To prepare for assessment, every course also has **Review questions**, **Review tasks**, **Useful links** and **Recommended reading**.

## How to study {#how-to-study}

1. Open your course and install the development environment named on the course page. The first topic of each course explains how, except “C# and .NET technologies”, which uses the environment from the “C# OOP” course.
2. Read the lecture chapters in order. Type in and run the examples yourself rather than just reading them.
3. On the **Practice** page, first try to solve the problem yourself, then compare your solution with the worked one.
4. On the **Tasks** page, find your variant (your teacher gives you its number) and choose a level of difficulty.
5. Check yourself with the questions on the **Summary** page, and only then move on to the next topic.
6. Before the exam, go over the **Review questions** and solve a few **Review tasks**.

::: tip Navigation
The topics and their chapters are listed in the menu on the left (on a phone, open it with the “Menu” button). The “Next page” button at the bottom of every page follows the course program, and the “On this page” list on the right takes you to a section.
:::
