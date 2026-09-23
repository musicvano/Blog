---
title: Practice
description: "Topic 9. Operator Overloading: worked examples"
outline: [2, 3]
sourceHash: "5c6cbeced4716e40845555572c5397e3abe4311d120b1588b04bb46c659b4af0"
---

# Practice

Each example is a separate program. The `assert` checks run in a build
without `NDEBUG`; they check the logic of the example and don’t replace validation
of user input. Invalid arguments are handled with explicit exceptions.

## Example 1. Complex numbers

**Problem.** Perform the four arithmetic operations and read a real imag pair, keeping the target unchanged on an error.

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

String streams provide reproducible test input; a console interface can use the same operator>>. A negative imaginary component doesn’t require parsing the symbol i. The division formula is meant for small finite teaching operands; a zero divisor is rejected. Very large or very small values need a numerically more stable algorithm.

Output:

```text
(2, -3)
```

## Example 2. A numeric release version

**Problem.** Compare major/minor/patch triples lexicographically; reject a negative component.

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

The order of the fields defines the priority of the components. There’s no prerelease or build metadata here, so the class doesn’t claim to be a full SemVer parser. The defaulted spaceship operator makes the comparison consistent for this triple.

Output:

```text
1.9.8 < 2.0.0: true
```

## Example 3. A 3×3 matrix

**Problem.** Test two-parameter indexing, multiplication and an explicit conversion to bool.

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
    std::println("Element: {}", result[0, 2]);
}
```

The comma inside the square brackets is the argument list of the overloaded C++23 operator[]. true means that a nonzero element is present, not that the matrix is mathematically invertible. The index check comes before the position is computed.

Output:

```text
Element: 7
```
