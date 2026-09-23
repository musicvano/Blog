---
title: "Підсумки"
description: "Тема 9. Багатопотоковість у C++: висновки та контрольні питання"
---

# Підсумки

## Висновки

Багатопотокові програми мовою C++ у курсі збираються компілятором GCC 15 за допомогою CMake і Ninja: CMake описує проєкт через цілі й генерує `build.ninja`, пресети фіксують параметри конфігурацій Debug і Release, а Ninja паралельно компілює файли. Середовище CLion використовує ті самі файли CMake і тулчейн WSL з Ubuntu 26.04. Потоки створюються класами `std::thread` і `std::jthread`; останній сам чекає завершення потоку й підтримує кооперативну зупинку через `std::stop_token`. Спільні дані захищають `std::mutex` з охоронцями `lock_guard`, `unique_lock`, `scoped_lock`, `shared_lock`, очікування умов реалізують `condition_variable`, семафори, `latch` і `barrier`, а прості лічильники – `std::atomic`. Результати й винятки між потоками передають `std::future`, `std::promise`, `std::packaged_task` і `std::async`; на цих засобах будується пул потоків. Паралельні алгоритми стандартної бібліотеки з політиками `seq`, `unseq`, `par`, `par_unseq` у GCC потребують бібліотеки TBB, інакше виконуються послідовно. Модель `std::execution` C++26 у GCC ще не реалізовано. Гонитви даних виявляє ThreadSanitizer, а час вимірюють годинником `steady_clock` і утилітою `perf stat`.

## Питання для самоперевірки

1. Які етапи має збирання C++ проєкту за допомогою CMake і Ninja?
2. Що описують команди `add_executable`, `target_compile_features` і `target_link_libraries`?
3. Навіщо потрібен файл `CMakePresets.json`? Як зібрати проєкт за пресетом?
4. Що таке тулчейн і профіль CMake у CLion? Чим відрізняються тулчейни MinGW і WSL?
5. Чим `std::jthread` відрізняється від `std::thread`?
6. Що станеться, якщо зруйнувати приєднуваний об’єкт `std::thread`?
7. Як передати потоку аргумент за посиланням?
8. Як працює кооперативна зупинка через `std::stop_token`?
9. Чим відрізняються `lock_guard`, `unique_lock`, `scoped_lock` і `shared_lock`?
10. Навіщо умовній змінній предикат?
11. Для чого призначені `counting_semaphore`, `latch` і `barrier`?
12. Як працює операція `compare_exchange_weak`? Навіщо її викликають у циклі?
13. Чим відрізняються політики `std::launch::async` і `std::launch::deferred`?
14. Як виняток із потоку передається через `std::future`?
15. З яких частин складається пул потоків?
16. Чим відрізняються політики виконання `seq`, `unseq`, `par` і `par_unseq`?
17. Яку роль відіграє бібліотека TBB для паралельних алгоритмів GCC?
18. Як знайти гонитву даних за допомогою ThreadSanitizer?

## Корисні посилання

- Бібліотека потоків C++: <https://en.cppreference.com/w/cpp/thread>
- Політики виконання: <https://en.cppreference.com/w/cpp/algorithm/execution_policy_tag_t>
- Документація CMake: <https://cmake.org/cmake/help/latest/>
- Пресети CMake: <https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html>
- Посібник Ninja: <https://ninja-build.org/manual.html>
- Документація GCC: <https://gcc.gnu.org/onlinedocs/>
- Тулчейн WSL у CLion: <https://www.jetbrains.com/help/clion/how-to-use-wsl-development-environment-in-product.html>
- Бібліотека oneTBB: <https://github.com/uxlfoundation/oneTBB>
