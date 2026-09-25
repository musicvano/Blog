---
title: "Class templates"
description: "Topic 12. Templates and Concepts: Class Templates"
outline: [2, 3]
sourceHash: "5180938d1a1277039b252c8b16d09c5cfd335f025df01baa1b66675e7413da4b"
---

# Class templates

## A class template and a non-type parameter

`FixedStack<int, 2>` and `FixedStack<int, 3>` are different types. The capacity `N` is part of the type, not a data member that can be changed after creation. This lets the compiler determine the array size; if you need a variable capacity, a container with dynamic memory is more appropriate. The parameter `std::size_t N` accepts a constant argument available at compile time. An ordinary number that has just been read from the keyboard is not such an argument.

The stack invariant is `0 <= used <= N`; the valid logical elements occupy the first `used` cells. All elements of the `std::array` physically exist the whole time. That is why this is not a general-purpose container implementation for arbitrary types: `T` must support default initialization and the required copy operations. After `pop`, the object in the cell is not destroyed; it just stops belonging to the logical stack. This matters for types that own a resource.

### A fixed-capacity stack

**Problem.** Store two numbers and get the last one; create a stack from an array and check a zero capacity.

```cpp
#include <array>
#include <cstddef>
#include <print>
#include <stdexcept>

template<class T, std::size_t N>
class FixedStack {
    std::array<T, N> data{};
    std::size_t used = 0;
public:
    FixedStack() = default;
    explicit FixedStack(const std::array<T, N>& source)
        : data(source), used(N) {}

    void push(const T& value) {
        if (used == N) throw std::length_error("full");
        data[used] = value;
        ++used;
    }

    T pop() {
        if (used == 0) throw std::out_of_range("empty");
        T result = data[used - 1];
        --used;
        return result;
    }
};

int main()
{
    FixedStack<int, 2> small;
    small.push(3);
    small.push(8);
    std::println("{}", small.pop());
    FixedStack inferred(std::array{10, 20, 30});
    std::println("{}", inferred.pop());
    FixedStack<int, 0> zero;
    try { zero.push(1); }
    catch (const std::length_error& e) {
        std::println("error: {}", e.what());
    }
}
```

Output:

```text
8
30
error: full
```

The definition of `push` changes the counter only after the assignment. If the assignment throws an exception, the counter keeps its old value. `pop` first copies the result and then decrements the counter. However, copying or moving the returned object can also throw its own exceptions. This training class does not promise a full strong guarantee for an arbitrary `T`.

The constructor that accepts `std::array<T, N>` gives the compiler information for CTAD: in `FixedStack inferred(std::array{10,20,30})`, both `T` and `N` are deduced. An empty `FixedStack inferred;` has no such information. CTAD works when an object is created; it does not let you omit the type’s parameters everywhere, for example in an arbitrary function signature.

For classes with other constructors, you can write a deduction guide. It is not a function and has no body; it describes which class parameters to deduce from the argument list. First check whether the implicit rules are enough, and only then add your own deduction rule.

## Default arguments and dependent names

The declaration `template<class T = int, std::size_t N = 8>` sets default arguments. The object `FixedStack<>` still uses the template, although the concrete values are taken from the declaration. Default values should not be hidden if they affect the capacity or the units of measurement: they are part of the interface. An `auto` parameter lets the type of a non-type parameter be deduced, for example `template<auto Limit>`, but constants of different types can create different specializations even with the same numeric value.

A name inside a template can depend on a parameter: `typename T::value_type` tells the compiler that the nested dependent name denotes a type. The `typename` keyword in this position does not create a new parameter. When you define a class method outside the class body, you repeat the parameter list and the full name `FixedStack<T, N>::push`. Omitting the list does not turn the method into an untyped function; it is a different, invalid declaration.

For readability, long types are given an alias with `using`. An alias does not create a new type, so `using Metres = double` does not prevent adding seconds. Strong typing of units in the lab example uses separate tag types, not just convenient names.

## Specialization and overloading

The primary template defines the general behavior. A full class specialization replaces it for exactly specified arguments. A partial specialization defines a family, for example `Holder<T*>` for pointer types. A function template cannot be partially specialized: for functions, you usually use overloading, constraints or a helper class.

A specialization does not automatically inherit the methods of the primary template. If the interface must contain `text`, you have to provide it in every specialization too. Otherwise, the client’s generic code will get different interfaces, even though the name of the class family stays the same. A specialization is declared before the first use that requires instantiating the corresponding variant.

### Formatting specialization

**Problem.** Use the standard format for an ordinary number, the words yes/no for bool and square brackets for a string.

```cpp
#include <format>
#include <print>
#include <string>

template<class T>
struct Serializer {
    static std::string text(const T& value) {
        return std::format("{}", value);
    }
};

template<>
struct Serializer<bool> {
    static std::string text(bool value) {
        return value ? "yes" : "no";
    }
};

template<>
struct Serializer<std::string> {
    static std::string text(const std::string& value) {
        return std::format("[{}]", value);
    }
};

int main()
{
    std::println("{}", Serializer<int>::text(42));
    std::println("{}", Serializer<bool>::text(true));
    std::println("{}",
        Serializer<std::string>::text("sample"));
}
```

Output:

```text
42
yes
[sample]
```

This is a training text representation, not JSON or a safe storage protocol. Bracket characters in the original string are not escaped, and parsing back is not defined here. The name `Serializer` describes the role of the example, but real serialization needs a version, escaping rules and error handling.

The primary template works only for types that support formatting. Merely declaring `Serializer<Custom>` does not necessarily instantiate the bodies of all methods. The error may appear only when `text` is called. This is one of the reasons to test the template operations that the client actually uses.

## Definition visibility and linker errors

An ordinary function needs only a declaration to be called; its definition is linked from another object file. For implicit instantiation of a template, the compiler usually needs a visible definition. That is why template definitions are placed in a header or in a `.tpp` file that it includes, rather than hidden in an arbitrary `.cpp`. The `.tpp` extension has no magic behavior: what matters is that its text is actually included.

If `math.h` contains only `template<class T> T twice(T);` and the definition is in `math.cpp`, the client may compile, but the linker will not find the specialization `twice<int>`. Adding another `#include` to the client helps only when it makes the definition itself visible. You should not include the same `.cpp` and at the same time compile it as a separate unit: this can create duplicate definitions.

Another, deliberate design is explicit instantiation of a limited set of types in the implementation. The line `template int twice<int>(int);` forces this variant to be created in the corresponding translation unit. An `extern template` declaration in the client can suppress repeated implicit instantiation. This approach is useful for a closed list of types, but an arbitrary new type is no longer supported without changing the library implementation.

Templates in headers are also subject to the one definition rule. Identical tokens and consistent name resolution are essential requirements. A macro that changes a template body in different `.cpp` files can violate the ODR, even if the linker does not report an obvious error.
