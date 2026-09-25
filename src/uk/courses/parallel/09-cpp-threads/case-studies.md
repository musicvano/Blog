---
title: "Приклади та типові помилки"
description: "Тема 9. Багатопотоковість у C++: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі програми зібрано компілятором GCC 15.2 (MinGW-w64 з CLion 2026.2.1), CMake 4.4 і Ninja 1.13 у конфігурації Release та запущено на комп’ютері з процесором Intel Core i9-11900KF (8 ядер, 16 логічних процесорів) під керуванням Windows 11. На іншому комп’ютері й в Ubuntu час буде іншим.

### Паралельна сума вектора

Програма заповнює вектор зі 100 млн випадкових чисел, обчислює суму їхніх квадратних коренів у $p = 1 , 2 , 4 , 8 , 16$ потоках `std::jthread` і виводить медіану часу п’яти запусків, прискорення, ефективність і відносну похибку порівняно з послідовною сумою. Проєкт складається з файлів `CMakeLists.txt`, `CMakePresets.json` (обидва наведено вище) і `main.cpp`.

```cpp
#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <numeric>
#include <print>
#include <random>
#include <string>
#include <thread>
#include <vector>

using Clock = std::chrono::steady_clock;

// Сума квадратних коренів елементів з індексами [from, to).
double sum_range(const std::vector<double>& v,
                 std::size_t from, std::size_t to) {
    double sum = 0.0;
    for (std::size_t i = from; i < to; ++i) sum += std::sqrt(v[i]);
    return sum;
}

double parallel_sum(const std::vector<double>& v, unsigned p) {
    std::vector<double> parts(p);          // результат кожного потоку
    {
        std::vector<std::jthread> threads;
        std::size_t chunk = v.size() / p;
        for (unsigned k = 0; k < p; ++k) {
            std::size_t from = k * chunk;
            std::size_t to = k + 1 == p ? v.size() : from + chunk;
            threads.emplace_back([&v, &parts, k, from, to] {
                parts[k] = sum_range(v, from, to);
            });
        }
    }   // тут деструктори jthread чекають завершення потоків

    return std::accumulate(parts.begin(), parts.end(), 0.0);
}

// Медіана часу (мс) п’яти запусків; result – сума останнього.
double median_ms(const std::vector<double>& v, unsigned p,
                 double& result) {
    std::vector<double> times;
    for (int run = 0; run < 5; ++run) {
        auto start = Clock::now();
        result = parallel_sum(v, p);
        std::chrono::duration<double, std::milli> ms =
            Clock::now() - start;
        times.push_back(ms.count());
    }
    std::ranges::sort(times);
    return times[2];
}

int main(int argc, char* argv[]) {
    std::size_t n = argc > 1 ? std::stoull(argv[1]) : 100'000'000;
    unsigned cores = std::thread::hardware_concurrency();

    std::vector<double> v(n);
    std::mt19937_64 gen(42);                     // фіксоване зерно
    std::uniform_real_distribution<double> dist(0.0, 100.0);
    std::ranges::generate(v, [&] { return dist(gen); });

    std::println("n = {}, логічних процесорів: {}", n, cores);
    double expected = sum_range(v, 0, n);        // також прогрівання
    double t1 = 0.0;
    std::println("{:>3} {:>9} {:>6} {:>6} {:>10}",
                 "p", "T, мс", "S", "E", "похибка");
    for (unsigned p = 1; p <= cores; p *= 2) {
        double sum = 0.0;
        double tp = median_ms(v, p, sum);
        if (p == 1) t1 = tp;
        double s = t1 / tp;
        std::println("{:>3} {:>9.1f} {:>6.2f} {:>5.0f}% {:>10.1e}",
                     p, tp, s, 100 * s / p,
                     std::abs(sum - expected) / expected);
    }
}
```

Кожен потік записує результат лише у свій елемент `parts[k]`, тому синхронізація не потрібна. Вектор потоків оголошено у вкладеному блоці: на його закритті деструктори `std::jthread` дочікуються всіх потоків, і лише потім частини додаються. Останній потік отримує залишок елементів, якщо `n` не ділиться на `p`. Лямбда захоплює вектор за посиланням, а межі – за значенням: захоплення `k` за посиланням призвело б до гонитви зі змінною циклу. Збирання й результат:

```
cmake --preset release
cmake --build --preset release
./build/release/parallel_sum
n = 100000000, логічних процесорів: 16
  p     T, мс      S      E    похибка
  1     134.1   1.00   100%    0.0e+00
  2      69.1   1.94    97%    7.0e-14
  4      34.8   3.86    96%    2.7e-14
  8      28.5   4.70    59%    1.1e-15
 16      22.1   6.06    38%    7.1e-14
```

До 4 потоків прискорення майже лінійне, далі ефективність падає: обчислення кореня дуже швидке, і обмеженням стає пропускна здатність пам’яті, з якої потоки читають 800 МБ даних. Похибка порядку $10^{- 14}$ пояснюється іншим порядком додавання дробових чисел у частинах, а не помилкою розпаралелювання.

### Банківський рахунок

Програма порівнює три способи поповнення рахунку з 8 потоків по 1 млн разів: без синхронізації, з `std::mutex` і з `std::atomic`, а потім виконує зустрічні перекази між двома рахунками за допомогою `std::scoped_lock` і перевіряє, що сума грошей не змінилася.

```cpp
#include <atomic>
#include <chrono>
#include <mutex>
#include <print>
#include <thread>
#include <vector>

const int Threads = 8;
const int Deposits = 1'000'000;          // поповнень у потоці

// Суми поповнень (по 1 грн): запис у пам’ять, а не лише в регістр.
std::vector<long long> amounts(Deposits, 1);

// Запускає Threads потоків, кожен викликає deposit Deposits разів.
template <typename F>
double run(F deposit) {
    auto start = std::chrono::steady_clock::now();
    {
        std::vector<std::jthread> threads;
        for (int t = 0; t < Threads; ++t)
            threads.emplace_back([&] {
                for (int i = 0; i < Deposits; ++i)
                    deposit(amounts[i]);
            });
    }
    std::chrono::duration<double, std::milli> ms =
        std::chrono::steady_clock::now() - start;
    return ms.count();
}

struct Account {
    int id;
    long long balance;
    std::mutex m;
};

// Переказ: scoped_lock блокує обидва м’ютекси без взаємоблокування.
void transfer(Account& from, Account& to, long long amount) {
    std::scoped_lock lock(from.m, to.m);
    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
    }
}

int main() {
    long long expected = 1LL * Threads * Deposits;
    std::println("Очікуваний баланс: {}", expected);

    long long unsafe = 0;                        // гонитва!
    double t = run([&](long long x) { unsafe += x; });
    std::println("Без синхронізації: {:>9} ({:.0f} мс)", unsafe, t);

    long long guarded = 0;
    std::mutex m;
    t = run([&](long long x) {
        std::lock_guard lock(m);
        guarded += x;
    });
    std::println("std::mutex:        {:>9} ({:.0f} мс)", guarded, t);

    std::atomic<long long> atomic = 0;
    t = run([&](long long x) { atomic += x; });
    std::println("std::atomic:       {:>9} ({:.0f} мс)",
                 atomic.load(), t);

    // Зустрічні перекази між двома рахунками з двох потоків.
    Account a{1, 1'000'000, {}}, b{2, 1'000'000, {}};
    {
        std::jthread ab([&] {
            for (int i = 0; i < Deposits; ++i) transfer(a, b, 30);
        });
        std::jthread ba([&] {
            for (int i = 0; i < Deposits; ++i) transfer(b, a, 20);
        });
    }
    std::println("Рахунки: {} + {} = {}", a.balance, b.balance,
                 a.balance + b.balance);
}
```

Суми поповнень беруться з масиву: якби потік просто додавав 1, компілятор міг би замінити весь цикл одним додаванням, і гонитва стала б непомітною (але не зникла б). Результат (значення без синхронізації й залишки рахунків змінюються від запуску до запуску):

```
Очікуваний баланс: 8000000
Без синхронізації:   1403547 (1 мс)
std::mutex:          8000000 (263 мс)
std::atomic:         8000000 (176 мс)
Рахунки: 2000000 + 0 = 2000000
```

Без синхронізації втрачено понад 80 % поповнень. М’ютекс і атомарна змінна дають правильний результат, але в сотні разів повільніші за некоректний код: потоки постійно конкурують за один м’ютекс або кеш-лінію, тож для такої дрібної роботи багатопотоковість невигідна. Кращий варіант – локальна сума в кожному потоці й одне додавання наприкінці. Зустрічні перекази не призвели до взаємоблокування, а загальна сума збереглася; залишки залежать від того, як планувальник чергував два потоки. Якщо зібрати цю програму з `-fsanitize=thread` в Ubuntu, TSan повідомить про гонитву в рядку `unsafe += x`.

### Пул потоків

Програма реалізує пул потоків на `std::jthread`, `std::condition_variable` і `std::packaged_task`, надсилає чотири задачі підрахунку простих чисел у діапазонах до 10 млн і одну задачу з некоректними аргументами, отримує результати через `std::future` і перехоплює виняток.

```cpp
#include <condition_variable>
#include <functional>
#include <future>
#include <mutex>
#include <print>
#include <queue>
#include <stdexcept>
#include <thread>
#include <vector>

class ThreadPool {
public:
    explicit ThreadPool(unsigned count) {
        for (unsigned i = 0; i < count; ++i)
            workers_.emplace_back([this] { work(); });
    }

    ~ThreadPool() {
        {
            std::lock_guard lock(mutex_);
            stopping_ = true;
        }

        ready_.notify_all();      // розбудити всіх для завершення
    }                             // далі деструктори jthread: join()

    // Ставить функцію в чергу й повертає future її результату.
    template <typename F>
    auto submit(F f) -> std::future<decltype(f())> {
        std::packaged_task<decltype(f())()> task(std::move(f));
        auto result = task.get_future();
        {
            std::lock_guard lock(mutex_);
            tasks_.emplace(std::move(task));
        }
        ready_.notify_one();      // розбудити один робочий потік
        return result;
    }

private:
    void work() {
        while (true) {
            std::move_only_function<void()> task;
            {
                std::unique_lock lock(mutex_);
                ready_.wait(lock, [this] {
                    return stopping_ || !tasks_.empty();
                });
                if (tasks_.empty()) return;   // черга порожня
                task = std::move(tasks_.front());
                tasks_.pop();
            }

            task();               // виконується без блокування
        }
    }

    std::mutex mutex_;
    std::condition_variable ready_;
    std::queue<std::move_only_function<void()>> tasks_;
    bool stopping_ = false;
    std::vector<std::jthread> workers_;  // останнє: руйнується першим
};

// Кількість простих чисел у діапазоні [from, to).
int count_primes(int from, int to) {
    if (from > to) throw std::invalid_argument("from > to");
    int count = 0;
    for (int n = std::max(from, 2); n < to; ++n) {
        bool prime = true;
        for (int d = 2; d * d <= n && prime; ++d) prime = n % d != 0;
        count += prime;
    }
    return count;
}

int main() {
    ThreadPool pool(4);
    const int Step = 2'500'000;
    std::vector<std::future<int>> results;
    for (int k = 0; k < 4; ++k)
        results.push_back(pool.submit([k] {
            return count_primes(k * Step, (k + 1) * Step);
        }));
    auto wrong = pool.submit([] { return count_primes(10, 1); });

    int total = 0;
    for (int k = 0; k < 4; ++k) {
        int count = results[k].get();       // чекає на результат
        std::println("[{:>8}; {:>8}): {:>6}", k * Step,
                     (k + 1) * Step, count);
        total += count;
    }
    std::println("Разом простих до {}: {}", 4 * Step, total);
    try {
        wrong.get();                        // виняток із потоку пулу
    } catch (const std::invalid_argument& e) {
        std::println("Помилка задачі: {}", e.what());
    }
}
```

Порядок полів важливий: члени класу руйнуються у зворотному порядку оголошення, тому вектор `workers_` оголошено останнім – потоки завершуються раніше, ніж руйнуються м’ютекс, умовна змінна й черга, якими вони користуються. Робітник завершується, лише коли встановлено прапорець і черга порожня, тому всі поставлені задачі буде виконано. Виняток, кинутий у `count_primes`, `packaged_task` зберігає у `future`, і він повторно виникає під час `get()` у головному потоці. Результат:

```
[       0;  2500000): 183072
[ 2500000;  5000000): 165441
[ 5000000;  7500000): 159748
[ 7500000; 10000000): 156318
Разом простих до 10000000: 664579
Помилка задачі: from > to
```

### Паралельні алгоритми STL

Програма сортує 20 млн випадкових чисел політиками `seq` і `par` та обчислює суму $\sum e^{- x_{i}^{2}}$ алгоритмом `std::transform_reduce` з усіма чотирма політиками. Для кожного варіанта виводяться медіана часу п’яти запусків і прискорення, а також найбільше відносне відхилення суми від послідовної. `CMakeLists.txt` відрізняється від попереднього прикладу лише умовами: для GCC (`CMAKE_CXX_COMPILER_ID STREQUAL "GNU"`) виконується `find_package(TBB QUIET)` і, якщо TBB знайдено, підключається `TBB::tbb`, інакше команда `message(WARNING …)` попереджає, що `par` працює послідовно; для Visual C++ (`if(MSVC)`) задаються ключі `/O2 /utf-8`.

```cpp
#include <algorithm>
#include <chrono>
#include <cmath>
#include <execution>
#include <functional>
#include <print>
#include <random>
#include <string_view>
#include <vector>

namespace ex = std::execution;
using Data = std::vector<double>;

// Медіана часу (мс) п’яти запусків action(копія data).
double median_ms(const Data& data, auto action) {
    std::vector<double> times;
    for (int run = 0; run < 5; ++run) {
        Data copy = data;
        auto start = std::chrono::steady_clock::now();
        action(copy);
        std::chrono::duration<double, std::milli> ms =
            std::chrono::steady_clock::now() - start;
        times.push_back(ms.count());
    }
    std::ranges::sort(times);
    return times[2];
}

void report(std::string_view name, double t, double t_seq) {
    std::println("  {:<10} {:>8.1f} мс  S = {:.2f}", name, t,
                 t_seq / t);
}

// Сума exp(-x²) за політикою policy.
double gauss_sum(const auto& policy, const Data& v) {
    return std::transform_reduce(policy, v.begin(), v.end(), 0.0,
        std::plus<>{}, [](double x) { return std::exp(-x * x); });
}

int main() {
    const std::size_t N = 20'000'000;
    Data data(N);
    std::mt19937_64 gen(2026);
    std::uniform_real_distribution<double> dist(-3.0, 3.0);
    std::ranges::generate(data, [&] { return dist(gen); });

    std::println("sort, {} елементів:", N);
    double seq = median_ms(data, [](Data& v) {
        std::sort(ex::seq, v.begin(), v.end());
    });
    report("seq", seq, seq);
    double par = median_ms(data, [](Data& v) {
        std::sort(ex::par, v.begin(), v.end());
    });
    report("par", par, seq);

    std::println("transform_reduce, сума exp(-x²):");
    double sums[4];
    seq = median_ms(data, [&](Data& v) {
        sums[0] = gauss_sum(ex::seq, v); });
    report("seq", seq, seq);
    report("unseq", median_ms(data, [&](Data& v) {
        sums[1] = gauss_sum(ex::unseq, v); }), seq);
    report("par", median_ms(data, [&](Data& v) {
        sums[2] = gauss_sum(ex::par, v); }), seq);
    report("par_unseq", median_ms(data, [&](Data& v) {
        sums[3] = gauss_sum(ex::par_unseq, v); }), seq);
    double deviation = 0;
    for (double s : sums)
        deviation =
            std::max(deviation, std::abs(s - sums[0]) / sums[0]);
    std::println("Сума: {:.4f}, найбільше відхилення: {:.1e}",
                 sums[0], deviation);
}
```

Кожен запуск отримує нову копію даних, тому сортування завжди починається з того самого невпорядкованого масиву. Результат збирання GCC 15.2 (MinGW, TBB немає):

```
CMake Warning at CMakeLists.txt:13 (message):
  TBB не знайдено: par працює послідовно
...
sort, 20000000 елементів:
  seq          1373.8 мс  S = 1.00
  par          1555.1 мс  S = 0.88
transform_reduce, сума exp(-x²):
  seq           801.4 мс  S = 1.00
  unseq         791.2 мс  S = 1.01
  par           784.7 мс  S = 1.02
  par_unseq     789.3 мс  S = 1.02
Сума: 5910395.4111, найбільше відхилення: 2.8e-14
```

Той самий проєкт, зібраний Visual C++ 2026 (у *Developer PowerShell*: `cmake -S . -B build-msvc -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_COMPILER=cl`):

```
sort, 20000000 елементів:
  seq          1666.4 мс  S = 1.00
  par           285.6 мс  S = 5.84
transform_reduce, сума exp(-x²):
  seq            80.5 мс  S = 1.00
  unseq          76.9 мс  S = 1.05
  par             9.0 мс  S = 8.90
  par_unseq       9.3 мс  S = 8.65
Сума: 5910395.4111, найбільше відхилення: 4.6e-14
```

Без TBB бібліотека GCC виконує всі політики послідовно (відмінності в кілька відсотків – похибка вимірювання), і лише CMake попереджає про це під час конфігурування. У Visual C++ паралельне сортування прискорюється майже в 6 разів, а незалежні обчислення експоненти – приблизно в 9 разів, тобто більше за кількість фізичних ядер завдяки SMT. Політика `unseq` майже нічого не додала: компілятор не векторизує виклик `std::exp`. Різний послідовний час двох компіляторів пояснюється різними реалізаціями `std::sort` і `std::exp`; для таких коротких операцій (десятки мілісекунд) результати помітно коливаються між запусками. В Ubuntu з пакетом `libtbb-dev` GCC обирає бекенд TBB, і політика `par` також використовує всі ядра.

## Типові помилки

Таблиця 9.3. Типові помилки багатопотокових програм мовою C++ {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| програма аварійно завершується з `terminate called without an active exception` | об’єкт `std::thread` зруйновано без `join`/`detach`; використовувати `std::jthread` |
| потік змінює копію змінної | аргументи копіюються; передати `std::ref(x)` або захопити за посиланням |
| значення лічильника менше за очікуване або змінюється між запусками | гонитва даних; `std::mutex`, `std::atomic` або локальні результати потоків; перевірити TSan |
| програма «зависає» під час переказів | два м’ютекси блокуються в різному порядку; `std::scoped_lock(a, b)` |
| потік не прокидається або прокидається без даних | `wait` без предиката чи сповіщення поза зміною стану; `cv.wait(lock, pred)` |
| задачі `std::async` виконуються по черзі | `future` не збережено або не вказано `std::launch::async` |
| `std::execution::par` не прискорює програму з GCC | TBB не встановлено; `libtbb-dev`, `find_package(TBB)`, `TBB::tbb` |
| `undefined reference to std::__open_terminal` | `std::print` у MinGW; скомпонувати з `stdc++exp` |
| MinGW-програма не запускається поза CLion (немає `libstdc++-6.dll`) | додати каталог `mingw\bin` у `PATH` або компонувати статично (`-static`) |
| прискорення значно менше, ніж у Release | зібрано профілем Debug (`-O0`); `cmake --preset release` |
