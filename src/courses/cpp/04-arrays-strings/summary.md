---
title: Summary
description: "Topic 4. Arrays, Strings, vector: conclusions and review questions"
sourceHash: "744b9ccb2895e7419e773c5ca09acbcee9d30f1dde65f5c69c07c604ae8b251a"
---

# Summary

## Conclusions

An array fixes the number of elements,
while a vector allows changing it.
Size and capacity have different
meanings; reallocation affects
the validity of addresses and references.
A string owns its bytes, while
string_view only observes
them. Algorithms must
preserve bounds, the link between the fields
of a record and the lifetime of the owner.

## Self-check questions

1. What is the last index of an array with N elements?
2. How does array differ from a built-in array?
3. What does at check, and what does [] not guarantee?
4. When does a loop need auto\&?
5. How does reserve differ from resize?
6. When does push_back invalidate references?
7. What is the precondition of binary search?
8. Why is the whole record sorted rather than one of its fields?
9. Why can a vector of vectors be non-rectangular?
10. What does string::size count in UTF-8?
11. What does npos mean?
12. Why does cctype not decode UTF-8 Cyrillic?
13. How is the complete result of from_chars checked?
14. How does string_view::substr differ from string::substr?
15. What conditions make a view dangling?

## Review questions for the lab

1. When is a vector empty after reserve?
2. How do you correctly check a number entered by the user?
3. Why is [] not checked access?
4. When does the address of an element stop being valid?
5. How do you avoid skipping an element after erase?
6. Why does binary search require sorting?
7. What is the difference between a string and a view?
8. Why does size not count UTF-8 letters?
9. How do you determine that a number was parsed completely?
10. How does splitting words differ from CSV?

## Useful links

- Vector: <https://learn.microsoft.com/cpp/standard-library/vector-class>.
- Array: <https://learn.microsoft.com/cpp/standard-library/array-class-stl>.
- String view: <https://learn.microsoft.com/cpp/standard-library/basic-string-view-class>.
- Conversions: <https://learn.microsoft.com/cpp/standard-library/charconv-functions>.
