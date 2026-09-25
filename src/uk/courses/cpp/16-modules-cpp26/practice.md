---
title: Практика
description: "Тема 16. Модулі та C++26: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожний приклад нижче є окремим проєктом зі своїм каталогом. Не додавайте
всі файли `main.cpp`, `app.cpp` і `tests.cpp` до однієї виконуваної цілі:
програма має мати одну точку входу. Команди виконуються з каталогу
відповідного прикладу в Developer PowerShell for Visual Studio 2026.

Приклад із ручними командами показує артефакти й залежності. Для власного
складного варіанта слід зберегти один відтворюваний сценарій збирання.
Після кожної команди перевіряйте `$LASTEXITCODE`; після невдалого збирання
не запускайте старий `.exe` як нібито результат виправленої програми.

## Приклад 1. Модуль перетворення температури

**Умова.** Експортувати функцію перетворення градусів Цельсія в кельвіни.
Вона приймає лише скінченні числа не нижче −273,15 °C. Реалізацію розмістити
в окремій одиниці модуля. Консольний клієнт друкує результати для
0 °C, абсолютного нуля та некоректних −300 °C; дані задані в коді.

**`units.ixx`:**
```cpp
export module units;

export namespace units {
    double celsius_to_kelvin(double value);
}
```

**`units.cpp`:**
```cpp
module;
#include <cmath>
#include <stdexcept>

module units;

double units::celsius_to_kelvin(double value)
{
    if (!std::isfinite(value) || value < -273.15) {
        throw std::invalid_argument("invalid temperature");
    }
    return value + 273.15;
}
```

Заголовки `<cmath>` і `<stdexcept>` належать глобальному фрагменту.
Оголошення функції знаходиться в інтерфейсі, а її визначення – в реалізації
того самого модуля. Клієнтові не потрібно включати ці службові заголовки
лише для використання перетворення.

**`main.cpp`:**
```cpp
#include <exception>
#include <print>
import units;

int main()
{
    for (double value : {0.0, -273.15, -300.0}) {
        try {
            const double result = units::celsius_to_kelvin(value);
            std::println("{:.2f} C -> {:.2f} K", value, result);
        } catch (const std::exception& error) {
            std::println("{:.2f} C: {}", value, error.what());
        }
    }
}
```

У клієнті заголовок `<exception>` потрібний для типу, який він називає
власноруч у `catch`. Імпорт одного інтерфейсу не означає дозвіл покладатися
на випадкову доступність усіх заголовків його реалізації.

```powershell
$opts = '/nologo','/std:c++latest','/EHsc','/utf-8','/W4'
cl @opts /c units.ixx
cl @opts /c units.cpp /Fo:units-impl.obj `
  /reference units=units.ifc
cl @opts main.cpp units.obj units-impl.obj `
  /reference units=units.ifc
.\main.exe
```

Результат виконання:

```text
0.00 C -> 273.15 K
-273.15 C -> 0.00 K
-300.00 C: invalid temperature
```

Перевірка межі виконується **до** обчислення. Число `NaN` не можна відхилити
одним порівнянням із нижньою межею, тому використано `std::isfinite`.
Успішний результат має одиницю вимірювання; помилка не маскується під
значення 0 K, яке саме є коректним результатом для абсолютного нуля.

Окремо перевірте 100 °C, нескінченність і NaN. Для порівняння результатів
із дробовою частиною використовуйте обґрунтований допуск, наприклад
`1e-9` у цьому невеликому прикладі. Він стосується числової перевірки,
а не допуску до фізично некоректного аргументу.

## Приклад 2. Статична бібліотека, застосунок і тести

**Умова.** Навчальна доставка посилки масою 1–5000 г коштує 40 грн
за перші 1000 г і ще 10 грн за кожну наступну розпочату тисячу грамів.
Тариф є умовним параметром задачі. Бібліотека обчислює ціну цілим числом,
клієнт показує ціну для 1500 г, а окрема програма перевіряє межі.

**`fees.h`:**
```cpp
#pragma once
namespace fees {
    int delivery(int grams);
}
```

**`fees.cpp`:**
```cpp
#include "fees.h"
#include <stdexcept>

int fees::delivery(int grams)
{
    if (grams <= 0 || grams > 5000) {
        throw std::invalid_argument("mass outside 1..5000");
    }
    return 40 + ((grams - 1) / 1000) * 10;
}
```

Формула `(grams - 1) / 1000` дає 0 для 1–1000 г, 1 для 1001–2000 г
і так далі. Віднімання безпечне, оскільки нижню межу перевірено раніше.
Важливо перевіряти 1000 і 1001, а не лише випадкове значення з середини діапазону.

**`app.cpp`:**
```cpp
#include "fees.h"
#include <print>

int main()
{
    std::println("1500 g: {} UAH", fees::delivery(1500));
}
```

**`tests.cpp`:**
```cpp
#include "fees.h"
#include <print>
#include <stdexcept>

int main()
{
    int failed = 0;
    failed += fees::delivery(1) != 40;
    failed += fees::delivery(1000) != 40;
    failed += fees::delivery(1001) != 50;
    failed += fees::delivery(5000) != 80;
    for (int bad : {0, 5001}) {
        try { (void)fees::delivery(bad); ++failed; }
        catch (const std::invalid_argument&) {}
    }
    std::println("Failed: {}", failed);
    return failed == 0 ? 0 : 1;
}
```

Тут обов’язкові перевірки не залежать від `assert`: лічильник відмов
і код завершення працюють також у Release. Кожний тест використовує
незалежно відоме очікуване число. Перевірка недопустимого аргументу
зараховується як успішна лише за очікуваного `std::invalid_argument`.

```powershell
$opts = '/nologo','/std:c++latest','/EHsc','/utf-8','/W4'
cl @opts /c fees.cpp
lib /nologo /out:fees.lib fees.obj
cl @opts app.cpp fees.lib
cl @opts tests.cpp fees.lib
.\app.exe
.\tests.exe
$LASTEXITCODE
```

Результат послідовного запуску:

```text
1500 g: 50 UAH
Failed: 0
0
```

Бібліотека збирається один раз і використовується двома клієнтами.
Якщо змінити тариф, обидві програми мають отримати нову бібліотеку
після повторного компонування. Копіювання `fees.cpp` до тестового проєкту
замість посилання на бібліотеку послаблює цю перевірку: можна випадково
протестувати іншу реалізацію, ніж ту, яку використовує застосунок.

Для перевірки надійності самих тестів тимчасово змініть очікувану ціну
для 1001 г на 51. Тестова програма повинна повідомити одну відмову й код 1.
Поверніть очікуване значення 50. Цей експеримент доводить, що програма
реагує на розбіжність, а не лише завжди друкує повідомлення про успіх.

## Приклад 3. Модуль і перевірки у CMake

**Умова.** Створити модуль `score`, який обмежує ціле значення діапазоном
0–100: менші числа перетворюються на 0, більші – на 100. Консольний клієнт
показує три приклади, окрема тестова ціль перевіряє межі. Опис збирання
має відтворюватися командами CMake без ручного додавання файлів до IDE.

Це окремий каталог із чотирма файлами. Мінімум CMake 4.2 потрібний
для генератора Visual Studio 2026; перевірено CMake 4.4.3.
Бібліотечні заголовки клієнта підключаються через `#include`, тому
приклад не залежить від експериментальної автоматизації `import std` у CMake.

**`score.ixx`:**
```cpp
export module score;

export int limit_score(int value)
{
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
}
```

**`app.cpp`:**
```cpp
#include <print>
import score;

int main()
{
    for (int value : {-5, 70, 120}) {
        std::println("{} -> {}", value, limit_score(value));
    }
}
```

**`tests.cpp`:**
```cpp
import score;

int main()
{
    return limit_score(-1) == 0 && limit_score(0) == 0
        && limit_score(50) == 50 && limit_score(100) == 100
        && limit_score(101) == 100 ? 0 : 1;
}
```

**`CMakeLists.txt`:**
```cmake
cmake_minimum_required(VERSION 4.2)
project(ScoreCourse LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
add_library(score STATIC)
target_sources(score PUBLIC
  FILE_SET CXX_MODULES FILES score.ixx)
add_executable(app app.cpp)
target_link_libraries(app PRIVATE score)
add_executable(tests tests.cpp)
target_link_libraries(tests PRIVATE score)
if(MSVC)
  foreach(target score app tests)
    target_compile_options(${target} PRIVATE /W4 /utf-8)
  endforeach()
endif()
enable_testing()
add_test(NAME boundaries COMMAND tests)
```

`PUBLIC FILE_SET CXX_MODULES` робить інтерфейс модуля доступним
цілям, які використовують бібліотеку. Звичайне додавання `.ixx` як
довільного приватного файла не описує цей публічний контракт.
Сканер залежностей визначає, що модуль треба скомпілювати раніше за клієнтів.

```powershell
cmake -S . -B build -G "Visual Studio 18 2026" -A x64
cmake --build build --config Debug
.\build\Debug\app.exe
ctest --test-dir build -C Debug --output-on-failure
```

Виведення застосунку:

```text
-5 -> 0
70 -> 70
120 -> 100
```

CTest має повідомити, що тест `boundaries` пройшов: 1 тест, 0 відмов.
Тривалість залежить від машини й не є частиною очікуваного результату.
Якщо CTest повідомляє, що тестів немає, перевірте `enable_testing`,
`add_test` та правильність каталогу `--test-dir`.

Повторіть збирання з `--config Release` і тести з `-C Release`.
Каталог результатів зміниться відповідно. Після зміни компілятора або
генератора створюйте новий каталог збирання: не редагуйте кеш вручну,
щоб замаскувати несумісні налаштування. Для звичайної роботи використовуйте
постійний навчальний каталог, а не системний Temp.
