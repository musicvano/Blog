---
title: Практика
description: "Тема 15. Потоки та файли: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен завершений приклад має власний `main` і збирається в окремому
консольному проєкті. Початкові дані наведено безпосередньо в програмі.
Використайте x64, `/std:c++latest`, `/EHsc`, `/W4`, `/utf-8` та
`/permissive-`. Після помилки збирання не запускайте старий виконуваний файл.

## Приклад 1. Спрощені налаштування INI

**Умова.** Розібрати задані рядки секції ui, змінити theme та записати власний файл.

```cpp
#include <fstream>
#include <map>
#include <print>
#include <sstream>
#include <string>

int main()
{
    std::istringstream input("[ui]\ntheme=light\nsize=14\n");
    std::map<std::string, std::map<std::string, std::string>> data;
    std::string section;
    for (std::string line; std::getline(input, line);) {
        if (line.empty()) continue;
        if (line.front() == '[' && line.back() == ']') {
            section = line.substr(1, line.size() - 2);
            continue;
        }
        auto pos = line.find('=');
        if (section.empty() || pos == std::string::npos
            || pos == 0) return 1;
        data[section][line.substr(0, pos)] = line.substr(pos + 1);
    }
    data["ui"]["theme"] = "dark";
    std::ofstream out("settings-demo.ini");
    for (const auto& [name, entries] : data) {
        out << '[' << name << "]\n";
        for (const auto& [key, value] : entries)
            out << key << '=' << value << '\n';
    }
    out.close();
    if (!out) return 1;
    std::println("theme: {}", data.at("ui").at("theme"));
}
```

Результат виконання:

```text
theme: dark
```

Це обмежений формат: немає коментарів, екранування, багаторядкових значень чи обрізання пробілів. Повторний ключ замінює попередній. Дані породжені програмою; для зовнішнього файла додайте ifstream із перевіркою відкриття та номери помилкових рядків. Результат settings-demo.ini має секцію ui з size=14 та theme=dark.

## Приклад 2. Шістнадцятковий дамп блоками

**Умова.** Згенерувати п’ять байтів і прочитати блоками по чотири, не втрачаючи короткий хвіст.

```cpp
#include <array>
#include <fstream>
#include <print>

int main()
{
    {
        std::ofstream out("bytes-demo.bin", std::ios::binary);
        const char bytes[]{0, 1, 15, 16, 127};
        out.write(bytes, sizeof bytes);
        out.close();
        if (!out) return 1;
    }
    std::ifstream in("bytes-demo.bin", std::ios::binary);
    if (!in) return 1;
    std::array<char, 4> block;
    while (in.read(block.data(), block.size()) || in.gcount()) {
        for (std::streamsize i = 0; i < in.gcount(); ++i) {
            auto b = static_cast<unsigned char>(block[i]);
            std::print("{:02X} ", b);
        }
    }
    std::println();
    return in.bad() ? 1 : 0;
}
```

Результат виконання:

```text
00 01 0F 10 7F
```

Останнє read запитує чотири байти, але отримує один. Умова з gcount дозволяє обробити цей хвіст. Перетворення до unsigned char не дає знаковому char зіпсувати значення 128..255. Після завершення перевіряємо bad, щоб не називати помилку носія звичайним кінцем.

## Приклад 3. Навчальна резервна копія

**Умова.** Створити власний файл і скопіювати його за відсутності копії або ознаки зміни.

```cpp
#include <filesystem>
#include <fstream>
#include <print>
#include <system_error>

namespace fs = std::filesystem;

int main()
{
    fs::create_directories("backup-demo/source");
    fs::create_directories("backup-demo/copy");
    const fs::path source = "backup-demo/source/note.txt";
    const fs::path target = "backup-demo/copy/note.txt";
    {
        std::ofstream seed(source);
        seed << "training note\n";
        seed.close();
        if (!seed) return 1;
    }
    std::error_code ec;
    bool exists = fs::exists(target, ec);
    if (ec) return 1;
    bool changed = !exists;
    if (exists) {
        auto size1 = fs::file_size(source, ec);
        if (ec) return 1;
        auto size2 = fs::file_size(target, ec);
        if (ec) return 1;
        auto time1 = fs::last_write_time(source, ec);
        if (ec) return 1;
        auto time2 = fs::last_write_time(target, ec);
        if (ec) return 1;
        changed = size1 != size2 || time1 > time2;
    }
    if (changed) {
        fs::copy_file(source, target,
            fs::copy_options::overwrite_existing, ec);
        if (ec) return 1;
    }
    std::println("copy exists: {}", fs::exists(target));
}
```

Результат виконання:

```text
copy exists: true
```

Це копіювання одного контрольованого файла; воно не видаляє нічого у призначенні. Розмір і час не доводять побайтової рівності: файл однакової довжини з тим самим часом може мати інший вміст. Для сильної перевірки потрібне порівняння вмісту або відповідний хеш. Демонстрація щоразу створює джерело; після першого копіювання перевірте вміст обох файлів.
