---
title: Практика
description: "Тема 5. Вказівники та пам’ять: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад — окрема повна програма: спочатку умова, потім код і пояснення, далі результат виконання.

## Приклад 1. Довжина і копіювання рядка C

Функція довжини приймає чинний нуль-термінований рядок.
Функція копіювання додатково приймає місткість призначення.
Якщо місця недостатньо, вона нічого не змінює і повертає false.
Буфери не повинні перекриватися.

```cpp
#include <cstddef>
#include <print>

std::size_t length(const char* text)
{
    const char* end = text;
    while (*end != '\0') ++end;
    return static_cast<std::size_t>(end - text);
}

bool copy(char* destination, std::size_t capacity,
    const char* source)
{
    const auto size = length(source);
    if (size >= capacity) return false;
    for (std::size_t i = 0; i <= size; ++i)
        destination[i] = source[i];
    return true;
}

int main()
{
    char buffer[6]{};
    std::println("Copied: {}", copy(buffer, 6, "Hello"));
    std::println("{}; length={}", buffer, length(buffer));
    std::println("Too small: {}", copy(buffer, 3, "World"));
    std::println("Unchanged: {}", buffer);
}
```

```text
Copied: true
Hello; length=5
Too small: false
Unchanged: Hello
```

Потрібно шість комірок для п’яти літер і нуля.
Умова `size >= capacity` залишає місце завершувачу.
Копіюється також елемент із індексом size.
Ці функції не можуть перевірити доступність довільної
адреси: чинність джерела є передумовою, яку гарантує викликач.

## Приклад 2. Дерево каталогів

Батьківський вузол володіє дочірніми через unique_ptr.
Зворотний parent є сирим невласницьким вказівником:
батько живе довше за своїх дітей. Тут weak_ptr не
потрібний, бо shared-власника взагалі немає.

```cpp
#include <memory>
#include <vector>
#include <string>
#include <print>
#include <utility>

struct Directory
{
    std::string name;
    Directory* parent{};
    std::vector<std::unique_ptr<Directory>> children;
};

Directory& add(Directory& parent, std::string name)
{
    auto child = std::make_unique<Directory>();
    child->name = std::move(name);
    child->parent = &parent;
    parent.children.push_back(std::move(child));
    return *parent.children.back();
}

int main()
{
    Directory root{"root", nullptr, {}};
    auto& docs = add(root, "docs");
    auto& images = add(docs, "images");
    std::println("{} -> {} -> {}", root.name,
        docs.name, images.name);
    std::println("Parent: {}", images.parent->name);
}
```

Результат – `root -> docs -> images` та `Parent: docs`.
Перерозподіл вектора переміщує unique_ptr, але не
самі динамічні Directory, тому посилання на вузли
залишаються чинними, поки їхні власники існують.
Вилучення вузла натомість робить посилання на нього
і його піддерево недійсними.

## Приклад 3. Пошук помилок пам’яті

Робоча програма нижче є безпечною базою для порівняння.
У копіях проєкту створюйте по одному навмисному дефекту:
змінити умову циклу на `i <= 3`; зберегти get(),
виконати reset() і прочитати стару адресу; для окремого
сирого `new int[3]` помилково застосувати `delete`.
Ці дефектні копії запускаються тільки під AddressSanitizer.
Не додавайте всі дефекти одразу: перший збій приховає наступні.

```cpp
#include <memory>
#include <print>

int main()
{
    auto values = std::make_unique<int[]>(3);
    for (int i = 0; i < 3; ++i) values[i] = i + 1;
    int total{};
    for (int i = 0; i < 3; ++i) total += values[i];
    std::println("Total: {}", total);
    values.reset();
    std::println("Empty: {}", values == nullptr);
}
```

Правильна програма друкує `Total: 6` та `Empty: true`.
Зберіть копію командою з `/fsanitize=address /Zi` і
`/link /INCREMENTAL:NO`, без `/RTC` та `/ZI`.
У Windows перевірка невідповідності виділення та звільнення
`alloc_dealloc_mismatch` типово вимкнена. Для окремої
копії з `new[]` і помилковим `delete` перед запуском
увімкніть її в поточній Developer PowerShell:

```powershell
$env:ASAN_OPTIONS = 'alloc_dealloc_mismatch=1'
.\main.exe
```

Назва виконуваного файла має відповідати вашій збірці.
Офіційний опис:
<https://learn.microsoft.com/cpp/sanitizers/error-alloc-dealloc-mismatch>.

Для кожного дефекту запишіть тип повідомлення, рядок
першого неправильного доступу й виправлене правило.
Недостатньо приховати повідомлення або не виконувати
проблемну гілку: виправлена програма має пройти той самий тест.
