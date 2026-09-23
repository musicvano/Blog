---
title: Practice
description: "Topic 13. Containers: worked examples"
outline: [2, 3]
sourceHash: "42d37deedaac02305ed7023bd727d921f0e2e17b056fba11681f084c5c751f99"
---

# Practice

Each complete example has its own `main` and is built in a separate
console project. The input data is given directly in the program.
Use x64, `/std:c++latest`, `/EHsc`, `/W4`, `/utf-8`, and
`/permissive-`. After a build error, do not run the old executable.

## Example 1. A bounded browser history

**Problem.** Store the last three visited pages.

```cpp
#include <deque>
#include <print>
#include <string>

int main()
{
    std::deque<std::string> history;
    for (const auto* page : {"home", "news", "help", "docs"}) {
        history.push_back(page);
        if (history.size() > 3) history.pop_front();
    }
    for (const auto& page : history)
        std::println("{}", page);
}
```

Output:

```text
news
help
docs
```

A deque lets you remove the oldest page from the front. This is a visit history, not a full implementation of the back/forward buttons. Test fewer than three pages and exactly three pages, and define a zero capacity as a separate policy.

## Example 2. Checking brackets

**Problem.** Check that parentheses and square brackets match; ignore all other characters.

```cpp
#include <print>
#include <stack>
#include <string_view>

bool balanced(std::string_view text)
{
    std::stack<char> opened;
    for (char c : text) {
        if (c == '(' || c == '[') opened.push(c);
        if (c != ')' && c != ']') continue;
        if (opened.empty()) return false;
        char expected = c == ')' ? '(' : '[';
        if (opened.top() != expected) return false;
        opened.pop();
    }
    return opened.empty();
}
int main()
{
    for (auto text : {"([])", "([)]", "]", ""})
        std::println("'{}': {}", text, balanced(text));
}
```

Output:

```text
'([])': true
'([)]': false
']': false
'': true
```

The stack stores the opening brackets that are not yet closed. Each closing bracket must match exactly the most recently opened one. That is why simply comparing counts is not enough. Empty text is valid, and anything left unclosed at the end means failure.

## Example 3. A library catalog

**Problem.** Find all books by one author, allowing repeated keys.

```cpp
#include <map>
#include <print>
#include <string>

int main()
{
    std::multimap<std::string, std::string> catalog{
        {"Author A", "Book 1"}, {"Author B", "Book 2"},
        {"Author A", "Book 3"}};
    auto [first, last] = catalog.equal_range("Author A");
    for (auto it = first; it != last; ++it)
        std::println("{}", it->second);
    auto [missing, end] = catalog.equal_range("Unknown");
    std::println("missing: {}", missing == end);
}
```

Output:

```text
Book 1
Book 3
missing: true
```

`equal_range` returns the bounds of the group, not a copy of the books. For a missing author, the bounds are equal. Do not change the author key through an iterator; to rename an author, rebuild the corresponding entries.
