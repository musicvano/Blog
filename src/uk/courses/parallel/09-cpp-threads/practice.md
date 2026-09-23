---
title: "Практика"
description: "Тема 9. Багатопотоковість у C++: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад – проєкт CMake, як у прикладі «Паралельна сума вектора» лекції, із заміною назви цілі.

## Приклад 1. Асинхронний підрахунок файлів у каталозі

Створити програму, яка отримує шлях до каталогу в аргументі командного рядка (за замовчуванням – поточний каталог), для кожного підкаталогу першого рівня запускає окрему задачу `std::async`, що рекурсивно підраховує файли та їхній загальний розмір за допомогою `std::filesystem`, і виводить таблицю підкаталогів, підсумок і час. Помилки файлової системи задачі мають виводитися в потік помилок, а некоректний шлях – завершувати програму з кодом 1. Для порівняння виміряти час послідовного обходу.

```cpp
#include <algorithm>
#include <chrono>
#include <cstdint>
#include <filesystem>
#include <future>
#include <print>
#include <string>
#include <vector>

namespace fs = std::filesystem;

struct Stats {
    std::uintmax_t files = 0;
    std::uintmax_t bytes = 0;
};

// Послідовний рекурсивний підрахунок файлів і їхнього розміру.
Stats count_files(const fs::path& dir) {
    Stats s;
    auto options = fs::directory_options::skip_permission_denied;
    for (const auto& entry :
         fs::recursive_directory_iterator(dir, options)) {
        if (entry.is_regular_file()) {
            ++s.files;
            s.bytes += entry.file_size();
        }
    }
    return s;
}

int main(int argc, char* argv[]) {
    fs::path root = argc > 1 ? argv[1] : fs::current_path();
    if (!fs::is_directory(root)) {
        std::println(stderr, "Не є каталогом: {}", root.string());
        return 1;
    }
    auto start = std::chrono::steady_clock::now();

    // Кожен підкаталог першого рівня – окрема асинхронна задача.
    std::vector<std::pair<std::string, std::future<Stats>>> tasks;
    Stats top;                               // файли в самому root
    for (const auto& entry : fs::directory_iterator(root)) {
        if (entry.is_directory()) {
            tasks.emplace_back(entry.path().filename().string(),
                std::async(std::launch::async, count_files,
                           entry.path()));
        } else if (entry.is_regular_file()) {
            ++top.files;
            top.bytes += entry.file_size();
        }
    }

    Stats total = top;
    std::println("{:<24} {:>7} {:>10}", "Каталог", "файлів", "КБ");
    for (auto& [name, future] : tasks) {
        try {
            Stats s = future.get();       // виняток задачі – тут
            std::println("{:<24} {:>7} {:>10}", name, s.files,
                         s.bytes / 1024);
            total.files += s.files;
            total.bytes += s.bytes;
        } catch (const fs::filesystem_error& e) {
            std::println(stderr, "{}: {}", name, e.what());
        }
    }
    std::chrono::duration<double, std::milli> ms =
        std::chrono::steady_clock::now() - start;
    std::println("{:<24} {:>7} {:>10}", "Разом", total.files,
                 total.bytes / 1024);
    std::println("Задач: {}, час: {:.1f} мс", tasks.size(),
                 ms.count());

    start = std::chrono::steady_clock::now();    // для порівняння
    Stats check = count_files(root);
    ms = std::chrono::steady_clock::now() - start;
    std::println("Послідовно: файлів {}, {:.1f} мс", check.files,
                 ms.count());
}
```

Функція `count_files` обходить дерево каталогів `recursive_directory_iterator` і пропускає каталоги без прав доступу. Для кожного підкаталогу `std::async` з політикою `launch::async` запускає окремий потік; пари «назва – `future`» зберігаються у векторі, тому задачі працюють одночасно, а не по черзі. Виняток `filesystem_error`, що виник у задачі, повторно кидається методом `get()` і перехоплюється в головному потоці. Результат для каталогу заголовкових файлів `include/c++` компілятора GCC 15.2 з CLion (в Ubuntu аналогічний каталог – `/usr/include/c++/15`):

```
Каталог                   файлів         КБ
backward                       8         99
bits                         167       4857
debug                         32        530
decimal                        2         33
experimental                  63       1412
ext                          286       1918
parallel                      43        526
pstl                          22        504
tr1                           62        728
tr2                            6         62
x86_64-w64-mingw32            23        177
Разом                        834      13297
Задач: 11, час: 38.9 мс
Послідовно: файлів 834, 22.6 мс
```

Обхід обмежений файловою системою, а не процесором, тому для маленького каталогу паралельний варіант навіть повільніший: створення 11 потоків займає більше часу, ніж сам обхід. Виграш можливий для великих дерев каталогів на швидкому SSD.

## Приклад 2. Обмежений буфер на семафорах

Створити шаблон класу обмеженого буфера (кільцевої черги) заданої місткості, у якому метод `put` чекає на вільне місце, а `take` – на наявність елемента. Реалізувати буфер на двох семафорах `std::counting_semaphore` і м’ютексі. Перевірити його на трьох виробниках, кожен з яких виготовляє 20 чисел, і двох споживачах з імітацією обробки 3 мс: суми виготовлених і спожитих чисел мають збігатися, а кількість елементів у буфері не повинна перевищувати місткість.

```cpp
#include <algorithm>
#include <atomic>
#include <chrono>
#include <cstddef>
#include <mutex>
#include <print>
#include <semaphore>
#include <thread>
#include <vector>

// Обмежений буфер: put() чекає на вільне місце, take() – на елемент.
template <typename T, std::size_t Capacity>
class BoundedBuffer {
public:
    void put(T value) {
        free_.acquire();                   // зайняти вільне місце
        {
            std::lock_guard lock(mutex_);
            items_[(head_ + count_) % Capacity] = std::move(value);
            ++count_;
            max_count_ = std::max(max_count_, count_);
        }
        used_.release();                   // з’явився елемент
    }

    T take() {
        used_.acquire();                   // дочекатися елемента
        T value;
        {
            std::lock_guard lock(mutex_);
            value = std::move(items_[head_]);
            head_ = (head_ + 1) % Capacity;
            --count_;
        }
        free_.release();                   // звільнилося місце
        return value;
    }

    std::size_t max_count() {
        std::lock_guard lock(mutex_);
        return max_count_;
    }

private:
    std::counting_semaphore<Capacity> free_{Capacity};
    std::counting_semaphore<Capacity> used_{0};
    std::mutex mutex_;
    T items_[Capacity]{};
    std::size_t head_ = 0, count_ = 0, max_count_ = 0;
};

int main() {
    const int Producers = 3, Consumers = 2, Items = 20;
    BoundedBuffer<int, 4> buffer;
    std::atomic<long> produced = 0, consumed = 0;
    std::vector<long> per_consumer(Consumers);

    auto start = std::chrono::steady_clock::now();
    {
        std::vector<std::jthread> consumers;
        for (int c = 0; c < Consumers; ++c)
            consumers.emplace_back([&, c] {
                // -1 – сигнал завершення для цього споживача.
                for (int x; (x = buffer.take()) != -1;) {
                    std::this_thread::sleep_for(
                        std::chrono::milliseconds(3));  // обробка
                    consumed += x;
                    ++per_consumer[c];
                }
            });
        {
            std::vector<std::jthread> producers;
            for (int p = 0; p < Producers; ++p)
                producers.emplace_back([&, p] {
                    for (int i = 1; i <= Items; ++i) {
                        int value = (p + 1) * 100 + i;
                        buffer.put(value);
                        produced += value;
                    }
                });
        }   // усі виробники завершились
        for (int c = 0; c < Consumers; ++c) buffer.put(-1);
    }       // усі споживачі завершились
    std::chrono::duration<double, std::milli> ms =
        std::chrono::steady_clock::now() - start;

    std::println("Виготовлено елементів: {}", Producers * Items);
    for (int c = 0; c < Consumers; ++c)
        std::println("Споживач {} обробив: {}", c + 1,
                     per_consumer[c]);
    std::println("Сума: виготовлено {}, спожито {}", produced.load(),
                 consumed.load());
    std::println("Найбільше елементів у буфері: {} з 4",
                 buffer.max_count());
    std::println("Час: {:.0f} мс", ms.count());
}
```

Семафор `free_` рахує вільні місця, `used_` – заповнені. Сума їхніх дозволів завжди дорівнює місткості, тому `put` блокується на повному буфері, а `take` – на порожньому, без умовних змінних і активного очікування. М’ютекс захищає лише короткі операції з масивом та індексами. Щоб завершити споживачів, після виробників у буфер кладеться по одному «сигнальному» значенню −1 на кожного споживача. Результат:

```
Виготовлено елементів: 60
Споживач 1 обробив: 30
Споживач 2 обробив: 30
Сума: виготовлено 12630, спожито 12630
Найбільше елементів у буфері: 4 з 4
Час: 495 мс
```

Суми однакові в кожному запуску, а розподіл між споживачами й час можуть змінюватися. Час більший за очікувані $60 \cdot 3 / 2 = 90$ мс, бо у Windows затримка `sleep_for` округлюється до кроку системного таймера.

## Приклад 3. Зупинка потоків за Ctrl+C

Створити програму, яка обчислює число $\pi$ методом Монте-Карло в `hardware_concurrency()` потоках `std::jthread` доти, доки користувач не натисне **Ctrl+C** або не мине кількість секунд, задана аргументом (за замовчуванням 10). Після зупинки програма коректно завершує всі потоки і виводить причину зупинки, загальну кількість точок і наближене значення $\pi$.

```cpp
#include <atomic>
#include <chrono>
#include <csignal>
#include <cstdint>
#include <print>
#include <random>
#include <stop_token>
#include <string>
#include <thread>
#include <vector>

// Прапорець, який встановлює обробник сигналу Ctrl+C.
std::atomic<bool> interrupted = false;

void on_interrupt(int) { interrupted = true; }

struct Counts {
    std::uint64_t inside = 0, total = 0;
};

// Метод Монте-Карло для π, доки не надійде запит на зупинку.
void worker(std::stop_token token, unsigned seed, Counts& result) {
    std::mt19937_64 gen(seed);
    std::uniform_real_distribution<double> dist(0.0, 1.0);
    Counts local;              // локальний лічильник потоку
    while (!token.stop_requested()) {
        for (int i = 0; i < 100'000; ++i) {  // порція
            double x = dist(gen), y = dist(gen);
            local.inside += x * x + y * y <= 1.0;
        }
        local.total += 100'000;
    }
    result = local;
}

int main(int argc, char* argv[]) {
    using namespace std::chrono;
    int limit = argc > 1 ? std::stoi(argv[1]) : 10;
    unsigned count = std::thread::hardware_concurrency();
    std::signal(SIGINT, on_interrupt);

    std::vector<Counts> results(count);
    std::vector<std::jthread> workers;
    for (unsigned i = 0; i < count; ++i)
        workers.emplace_back(worker, i + 1, std::ref(results[i]));

    std::println("Потоків: {}. Обчислення до {} с або Ctrl+C...",
                 count, limit);
    auto deadline = steady_clock::now() + seconds(limit);
    while (!interrupted && steady_clock::now() < deadline)
        std::this_thread::sleep_for(milliseconds(50));

    std::println("Зупинка: {}",
                 interrupted ? "Ctrl+C" : "час вийшов");
    for (auto& w : workers) w.request_stop();
    workers.clear();                    // деструктори: join()

    Counts sum;
    for (const Counts& c : results) {
        sum.inside += c.inside;
        sum.total += c.total;
    }
    std::println("Точок: {}, π ≈ {:.6f}", sum.total,
                 4.0 * sum.inside / sum.total);
}
```

Обробник сигналу `SIGINT` лише встановлює прапорець `std::atomic<bool>`: в обробнику сигналу заборонено блокувати м’ютекси, виділяти пам’ять і виводити текст, а атомарна змінна без блокувань допускається стандартом. Головний потік перевіряє прапорець і час кожні 50 мс, потім викликає `request_stop()` для всіх потоків, а `workers.clear()` руйнує об’єкти `jthread`, які чекають завершення. Робочі потоки перевіряють `stop_token` після кожної порції зі 100 000 точок, тому зупиняються за частки секунди. Кожен потік має власний генератор із різним зерном і лічильник у локальній змінній, а в спільний вектор записує результат лише один раз. Результат запуску з аргументом `3`:

```
Потоків: 16. Обчислення до 3 с або Ctrl+C...
Зупинка: час вийшов
Точок: 6384500000, π ≈ 3.141591
```

Кількість точок змінюється між запусками; після **Ctrl+C** виводиться `Зупинка: Ctrl+C`.
