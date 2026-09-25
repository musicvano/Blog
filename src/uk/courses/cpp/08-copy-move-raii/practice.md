---
title: Практика
description: "Тема 8. Копіювання, переміщення, RAII: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад є окремою програмою. Перевірки `assert` виконуються у збірці
без `NDEBUG`; вони перевіряють логіку прикладу й не замінюють перевірку
користувацького введення. Помилкові аргументи обробляються явними винятками.

## Приклад 1. Динамічна матриця

**Умова.** Реалізувати правило п’яти для буфера double; перевірити розміри, індекси та незалежність копії.

```cpp
#include <algorithm>
#include <cassert>
#include <print>
#include <stdexcept>
#include <utility>

class Matrix {
    std::size_t rows_ = 0, cols_ = 0;
    double* data_ = nullptr;
public:
    Matrix(std::size_t r, std::size_t c) : rows_(r), cols_(c) {
        if (r > 100 || c > 100)
            throw std::invalid_argument("size");
        if (r && c) data_ = new double[r * c]{};
    }

    ~Matrix() { delete[] data_; }

    Matrix(const Matrix& x) : Matrix(x.rows_, x.cols_) {
        if (data_) std::copy_n(x.data_, rows_ * cols_, data_);
    }

    Matrix(Matrix&& x) noexcept
        : rows_(std::exchange(x.rows_, 0)),
          cols_(std::exchange(x.cols_, 0)),
          data_(std::exchange(x.data_, nullptr)) {}
    void swap(Matrix& x) noexcept {
        std::swap(rows_, x.rows_);
        std::swap(cols_, x.cols_);
        std::swap(data_, x.data_);
    }

    Matrix& operator=(const Matrix& x) {
        Matrix temp{x}; swap(temp); return *this;
    }

    Matrix& operator=(Matrix&& x) noexcept {
        if (this != &x) { Matrix temp{std::move(x)}; swap(temp); }
        return *this;
    }

    double& at(std::size_t r, std::size_t c) {
        if (r >= rows_ || c >= cols_) throw std::out_of_range("at");
        return data_[r * cols_ + c];
    }
};

int main() {
    Matrix a{2, 2}; a.at(0, 0) = 7;
    Matrix b{a}; b.at(0, 0) = 9;
    assert(a.at(0, 0) == 7);
    b = b;
    Matrix c{std::move(b)};
    assert(c.at(0, 0) == 9);
    try { b.at(0, 0); assert(false); }
    catch (const std::out_of_range&) {}
    b = a; c = std::move(b); c = std::move(c);
    assert(c.at(0, 0) == 7);
    Matrix empty{0, 0}; empty = a;
    try { Matrix bad{101, 1}; assert(false); }
    catch (const std::invalid_argument&) {}
    std::println("Копія: {:.1f}", empty.at(0, 0));
}
```

Межа 100 на кожен вимір перевіряється до добутку й алокації. Порожня матриця допустима, але не має доступних елементів. Неконстантний at показано як мінімальний інтерфейс; для читання константної матриці потрібне окреме перевантаження.

Результат виконання:

```text
Копія: 7.0
```

## Приклад 2. Відновлення формату потоку

**Умова.** Тимчасово ввімкнути fixed і точність два, відновити попередні flags/precision/fill навіть при винятку.

```cpp
#include <cassert>
#include <iomanip>
#include <ios>
#include <print>
#include <sstream>
#include <stdexcept>

class FormatGuard {
    std::ostream& out_;
    std::ios::fmtflags flags_;
    std::streamsize precision_;
    char fill_;
public:
    explicit FormatGuard(std::ostream& out)
        : out_(out), flags_(out.flags()),
          precision_(out.precision()), fill_(out.fill()) {}
    FormatGuard(const FormatGuard&) = delete;
    FormatGuard& operator=(const FormatGuard&) = delete;

    ~FormatGuard() {
        out_.flags(flags_);
        out_.precision(precision_);
        out_.fill(fill_);
    }
};

int main() {
    std::ostringstream out;
    const auto old = out.flags();
    try {
        FormatGuard guard{out};
        out << std::fixed << std::setprecision(2) << 2.5;
        throw std::runtime_error("test");
    } catch (const std::runtime_error&) {}
    assert(out.flags() == old && out.precision() == 6);
    out << ' ' << 2.5;
    assert(out.str() == "2.50 2.5");
    std::println("{}", out.str());
}
```

Обгортка переносима та не потребує Windows API. Вона відновлює три явно заявлені параметри, але не називається повною копією всього стану потоку: locale, буфер і стан помилок мають інші правила.

Результат виконання:

```text
2.50 2.5
```

## Приклад 3. Локальна транзакція

**Умова.** Повернути попереднє ціле значення при винятку й зберегти зміну після commit.

```cpp
#include <cassert>
#include <print>
#include <stdexcept>

class Transaction {
    int& target_;
    int before_;
    bool committed_ = false;
public:
    explicit Transaction(int& value)
        : target_(value), before_(value) {}
    Transaction(const Transaction&) = delete;
    Transaction& operator=(const Transaction&) = delete;
    void commit() noexcept { committed_ = true; }

    ~Transaction() noexcept {
        if (!committed_) target_ = before_;
    }
};

int main() {
    int balance = 100;
    try {
        Transaction tx{balance};
        balance -= 30;
        throw std::runtime_error("cancel");
    } catch (const std::runtime_error&) {}

    assert(balance == 100);
    {
        Transaction tx{balance};
        balance -= 20;
        tx.commit();
        tx.commit();
    }

    assert(balance == 80);
    std::println("Після підтвердження: {}", balance);
}
```

Повторний commit є безпечним. Підтвердження треба робити останнім кроком успішної операції; виняток після commit уже не спричинить відкат. Це навчальна транзакція одного локального числа.

Результат виконання:

```text
Після підтвердження: 80
```
