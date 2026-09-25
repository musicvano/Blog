---
title: Практика
description: "Тема 9. Перевантаження операцій: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад є окремою програмою. Перевірки `assert` виконуються у збірці
без `NDEBUG`; вони перевіряють логіку прикладу й не замінюють перевірку
користувацького введення. Помилкові аргументи обробляються явними винятками.

## Приклад 1. Комплексні числа

**Умова.** Виконати чотири арифметичні операції, прочитати пару real imag зі збереженням цілі при помилці.

```cpp
#include <cassert>
#include <cmath>
#include <iostream>
#include <sstream>
#include <stdexcept>

class Complex {
    double re_, im_;
public:
    Complex(double re = 0, double im = 0) : re_(re), im_(im) {}

    friend Complex operator+(Complex a, Complex b) {
        return {a.re_ + b.re_, a.im_ + b.im_};
    }

    friend Complex operator*(Complex a, Complex b) {
        return {a.re_ * b.re_ - a.im_ * b.im_,
                a.re_ * b.im_ + a.im_ * b.re_};
    }

    friend Complex operator-(Complex a, Complex b) {
        return {a.re_ - b.re_, a.im_ - b.im_};
    }

    friend Complex operator/(Complex a, Complex b) {
        const double norm = b.re_ * b.re_ + b.im_ * b.im_;
        if (norm == 0) throw std::invalid_argument("zero divisor");
        return {(a.re_ * b.re_ + a.im_ * b.im_) / norm,
                (a.im_ * b.re_ - a.re_ * b.im_) / norm};
    }

    bool operator==(const Complex&) const = default;

    friend std::istream& operator>>(std::istream& in, Complex& x) {
        double re = 0, im = 0;
        if (in >> re >> im) {
            if (std::isfinite(re) && std::isfinite(im))
                x = Complex{re, im};
            else in.setstate(std::ios::failbit);
        }
        return in;
    }

    friend std::ostream& operator<<(std::ostream& out, Complex x) {
        return out << '(' << x.re_ << ", " << x.im_ << ')';
    }
};

int main() {
    Complex a{1, 2}, b{3, -1};
    assert((a + b == Complex{4, 1}));
    assert((a * b == Complex{5, 5}));
    assert((a - b == Complex{-2, 3}));
    assert((Complex{2, 2} / Complex{1, 1} == Complex{2, 0}));
    try { (void)(a / Complex{}); assert(false); }
    catch (const std::invalid_argument&) {}
    std::istringstream valid{"2 -3"}; valid >> a;
    assert((a == Complex{2, -3}));
    std::istringstream bad{"7 text"}; bad >> a;
    assert(bad.fail() && (a == Complex{2, -3}));
    std::cout << a << '\n';
}
```

Текстові потоки задають відтворювані вхідні дані тесту; консольний інтерфейс може використовувати той самий operator>>. Від’ємний уявний компонент не потребує розбору символу i. Формула ділення призначена для невеликих скінченних навчальних операндів; нульовий дільник відхиляється. Для дуже великих або малих значень потрібен чисельно стійкіший алгоритм.

Результат виконання:

```text
(2, -3)
```

## Приклад 2. Числова версія релізу

**Умова.** Порівняти трійки major/minor/patch лексикографічно; відхилити від’ємний компонент.

```cpp
#include <cassert>
#include <compare>
#include <print>
#include <stdexcept>

class Version {
    int major_, minor_, patch_;
public:
    Version(int a, int b, int c) : major_(a), minor_(b), patch_(c) {
        if (a < 0 || b < 0 || c < 0)
            throw std::invalid_argument("version");
    }

    auto operator<=>(const Version&) const = default;
};

int main() {
    const Version a{1, 9, 8}, b{2, 0, 0};
    assert(a < b && b > a);
    assert((Version{1, 9, 8} == a));
    assert((Version{1, 10, 0} > a));
    try { Version bad{-1, 0, 0}; assert(false); }
    catch (const std::invalid_argument&) {}
    std::println("1.9.8 < 2.0.0: {}", a < b);
}
```

Порядок полів визначає пріоритет компонентів. Тут немає prerelease і build metadata, тому клас не претендує на повний SemVer-парсер. Defaulted spaceship узгоджує порівняння для цієї трійки.

Результат виконання:

```text
1.9.8 < 2.0.0: true
```

## Приклад 3. Матриця 3 на 3

**Умова.** Перевірити двопараметрове індексування, множення та явне логічне перетворення.

```cpp
#include <array>
#include <cassert>
#include <print>
#include <stdexcept>

class Matrix3 {
    std::array<double, 9> data_{};

    static std::size_t index(std::size_t r, std::size_t c) {
        if (r >= 3 || c >= 3) throw std::out_of_range("matrix");
        return r * 3 + c;
    }
public:
    double& operator[](std::size_t r, std::size_t c) {
        return data_[index(r, c)];
    }

    double operator[](std::size_t r, std::size_t c) const {
        return data_[index(r, c)];
    }

    explicit operator bool() const {
        for (double x : data_) if (x != 0) return true;
        return false;
    }

    friend Matrix3 operator*(const Matrix3& a, const Matrix3& b) {
        Matrix3 result;
        for (std::size_t r = 0; r < 3; ++r)
            for (std::size_t c = 0; c < 3; ++c)
                for (std::size_t k = 0; k < 3; ++k)
                    result[r, c] += a[r, k] * b[k, c];
        return result;
    }
};

int main() {
    Matrix3 a, identity;
    assert(!a);
    for (std::size_t i = 0; i < 3; ++i) identity[i, i] = 1;
    a[0, 2] = 7;
    const Matrix3 result = a * identity;
    assert((result[0, 2] == 7));
    assert(static_cast<bool>(result));
    try { a[3, 0] = 1; assert(false); }
    catch (const std::out_of_range&) {}
    std::println("Елемент: {}", result[0, 2]);
}
```

Кома всередині квадратних дужок є списком аргументів перевантаженого operator[] C++23. true означає наявність ненульового елемента, а не математичну оборотність матриці. Перевірка індексів передує обчисленню позиції.

Результат виконання:

```text
Елемент: 7
```
