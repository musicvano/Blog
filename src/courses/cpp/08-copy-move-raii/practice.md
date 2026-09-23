---
title: Practice
description: "Topic 8. Copy, Move, RAII: worked examples"
outline: [2, 3]
sourceHash: "dc649e7b8511e57280cecface0f6dc9f7f2d46f279ba5be7bfa705552f53d0d8"
---

# Practice

Each example is a separate program. The `assert` checks run in a build without
`NDEBUG`; they check the logic of the example and do not replace validating
user input. Invalid arguments are handled with explicit exceptions.

## Example 1. A dynamic matrix

**Problem.** Implement the rule of five for a buffer of double; check the dimensions, the indices, and the independence of a copy.

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
    std::println("Copy: {:.1f}", empty.at(0, 0));
}
```

The limit of 100 for each dimension is checked before the multiplication and the allocation. An empty matrix is allowed, but it has no accessible elements. The non-constant at is shown as a minimal interface; reading a constant matrix requires a separate overload.

Output:

```text
Copy: 7.0
```

## Example 2. Restoring a stream format

**Problem.** Temporarily enable fixed and a precision of two, and restore the previous flags/precision/fill even on an exception.

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

The wrapper is portable and does not need the Windows API. It restores three explicitly stated settings, but it does not claim to be a complete copy of the whole stream state: the locale, the buffer, and the error state follow other rules.

Output:

```text
2.50 2.5
```

## Example 3. A local transaction

**Problem.** Restore the previous integer value on an exception and keep the change after commit.

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
    std::println("After commit: {}", balance);
}
```

A repeated commit is safe. The commit must be the last step of a successful operation; an exception after commit no longer causes a rollback. This is a training transaction for a single local number.

Output:

```text
After commit: 80
```
