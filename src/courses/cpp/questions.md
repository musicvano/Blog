---
title: "Review questions"
description: "Object-Oriented Programming in C++: review questions on the course topics"
sourceHash: "62c2463568de1a9e0a31e150b06d38db4aa6b972102d4224c93052c1677d32c5"
---

# Review questions

Questions for self-check and exam preparation, grouped by course topic.

## Topic 1. C++ and your first program

1. Briefly describe the history of the C++ language and its standards. What are the main new features associated with C++26, and how do you check whether the installed compiler supports them?
2. Explain the stages of building a C++ program: preprocessing, compilation and linking. What is a translation unit?
3. How do you create, build and run a C++ console project in Microsoft Visual Studio 2026? Explain the Debug and Release configurations.
4. Describe the structure of the simplest C++ program: the main function, including libraries, namespaces.
5. What is the Git version control system? Explain the concepts of a repository, a commit and a branch, and the basic Git commands.
6. How do you work with a Git repository in Visual Studio 2026? What is the .gitignore file for in a C++ project?

## Topic 2. Types, operators, control flow

7. What fundamental data types does C++ have? What do their sizes and value ranges depend on?
8. Explain the ways of initializing variables in C++, including uniform initialization with braces. What are auto, const and constexpr used for?
9. Explain implicit and explicit type conversions in C++. What is the static\_cast operator for?
10. Which C++ operators do you know? Explain operator precedence, integer division and the three-way comparison operator `<=>`.
11. How do you output data with std::print and std::println and read data from the std::cin stream? Compare std::print with the std::cout stream.
12. Describe the C++ control structures: if, switch, the for, while and do-while loops, and the range-based for loop.

## Topic 3. Functions

13. Explain function declaration and definition. What is a function prototype, and why is it placed in a header file?
14. Compare the ways of passing parameters to a function: by value, by reference and by const reference.
15. What are default parameters and function overloading? How does the compiler choose which function to call?
16. What are inline functions and constexpr functions?
17. What is recursion? Give an example of a recursive function and explain the risk of stack overflow.
18. How do you return several values from a function using std::pair, std::tuple or a struct and structured bindings?

## Topic 4. Arrays, strings, vector

19. Explain how to declare, initialize and traverse built-in C++ arrays. What are their drawbacks?
20. Compare built-in arrays, std::array and std::vector.
21. Explain the main operations of the std::vector class: adding and removing elements, size and capacity, memory reallocation.
22. Which main methods of the std::string class are used for searching, comparison, extracting a substring and concatenation?
23. What is std::string\_view? What are the benefits of using it, and what dangers arise from the lifetime of the string?
24. How do you convert between strings and numbers (std::to\_string, std::stoi, std::format)?

## Topic 5. Pointers and memory

25. What is a pointer? Explain the address-of and dereference operators and the null pointer nullptr.
26. Compare pointers and references in C++.
27. Explain pointer arithmetic and the relationship between pointers and arrays.
28. Explain how a program’s memory is organized (the stack and the heap). How do you allocate and free dynamic memory with the new and delete operators?
29. What are memory leaks, dangling pointers and double frees? How do you detect them?
30. Explain the smart pointers std::unique\_ptr and std::shared\_ptr and the functions std::make\_unique and std::make\_shared.
31. What is std::weak\_ptr for? How does it solve the problem of circular references?

## Topic 6. Debugging and errors

32. What debugging tools does Visual Studio 2026 provide: breakpoints, stepping, and the Autos, Locals, Watch and Call Stack windows?
33. How does the exception mechanism work in C++: throw, try, catch? What happens to the stack when an exception is thrown?
34. Describe the hierarchy of standard exceptions rooted in std::exception. How do you create your own exception class?
35. What does the noexcept specifier mean? Which levels of exception safety guarantees do you know?
36. What is std::expected? Compare error handling with exceptions and with std::expected.
37. What are assert, static\_assert and sanitizers (AddressSanitizer) used for?

## Topic 7. Classes and objects

38. What are a class and an object in C++? Compare the class and struct keywords.
39. Explain encapsulation and the access specifiers public, private and protected.
40. What kinds of constructors exist in C++? Explain the member initializer list and delegating constructors.
41. What is a destructor? In what order are the constructors and destructors of objects called?
42. What are const methods and the mutable keyword? What is the this pointer used for?
43. What are static fields and methods of a class? How do you split a class into a header file and an implementation file?

## Topic 8. Copy, move, RAII

44. What are the copy constructor and the copy assignment operator? When does the compiler call them?
45. Compare shallow and deep copying of objects that own dynamic memory.
46. What are lvalues and rvalues? Explain rvalue references and the std::move function.
47. What are the move constructor and the move assignment operator? What are the benefits of move semantics?
48. What is the RAII idiom? Give examples of standard library classes that implement it.
49. Explain the rules of zero, three and five. What are the default and delete specifiers used for with special member functions?
50. What are return value optimization (RVO) and guaranteed copy elision?

## Topic 9. Operator overloading

51. How do you overload operators for your own class? Which operators cannot be overloaded?
52. Compare overloading an operator as a class method and as a free function.
53. What are friend functions and friend classes? When is it appropriate to use them?
54. How do you overload the stream output and stream input operators for your own class?
55. How do you overload the three-way comparison operator `<=>` and the equality operator? What does the compiler generate automatically?
56. How do you overload the subscript, function call and increment operators for your own class?

## Topic 10. Inheritance and polymorphism

57. What is inheritance? Explain public, protected and private inheritance.
58. In what order are the constructors and destructors of the base and derived classes called? How do you call a base class constructor?
59. What are virtual functions? Explain the override and final specifiers.
60. Explain the typical implementation of dynamic polymorphism through a virtual function table and a pointer to it. Why is a specific object layout not required by the standard?
61. Why does a base class need a virtual destructor? What is object slicing?
62. Explain conversions within a class hierarchy: static\_cast, dynamic\_cast and RTTI.

## Topic 11. Abstract classes, interfaces

63. What are a pure virtual function and an abstract class?
64. How do you implement an interface in C++ using an abstract class?
65. What is multiple inheritance? What problems can it cause?
66. What is diamond inheritance, and how does virtual inheritance solve it?
67. Compare inheritance and composition. When should you prefer composition?
68. Compare dynamic polymorphism through virtual functions and static polymorphism through templates.

## Topic 12. Templates and concepts

69. What are function templates? How do template argument deduction and instantiation work?
70. What are class templates? Explain non-type template parameters and default values.
71. What is template specialization? Compare full and partial specialization.
72. Why are template definitions usually placed in header files?
73. What are concepts? How do you constrain template parameters with requires?
74. Give examples of standard concepts (std::integral, std::same\_as, std::totally\_ordered) and create your own concept.
75. What are variadic templates?

## Topic 13. Containers

76. What groups of containers does the C++ standard library have? Explain their purpose.
77. Compare the sequence containers vector, deque and list in terms of the performance of their main operations.
78. Explain the associative containers std::set and std::map. What ordering and complexity guarantees do they provide, and which data structures does an implementation usually use?
79. Explain the unordered containers std::unordered\_set and std::unordered\_map. What is a hash function?
80. Compare the insert, emplace and `operator[]` methods for adding elements to std::map.
81. What are the container adapters std::stack, std::queue and std::priority\_queue?

## Topic 14. Iterators, algorithms, ranges

82. What are iterators? Explain the iterator categories.
83. When do iterators become invalid? Give examples for std::vector.
84. Explain the main standard library algorithms: std::sort, std::find\_if, std::transform, std::accumulate.
85. What are lambda expressions? Explain capture by value and by reference in the capture list.
86. What is the ranges library? Compare the std::ranges algorithms with the classic algorithms.
87. Explain the range views std::views::filter and std::views::transform and their lazy evaluation.
88. What are std::function and function objects for?

## Topic 15. Streams and files

89. Describe the hierarchy of C++ input/output streams: istream, ostream, fstream, stringstream.
90. How do you read and write text files with std::ifstream and std::ofstream? How do you check the state of a stream?
91. How do you work with binary files: open modes, the read, write, seekg and tellg methods?
92. How do you format data with std::format and stream manipulators?
93. What does the std::filesystem library offer for working with paths, files and directories?
94. How do you handle input/output errors and guarantee that files are closed?

## Topic 16. Modules and C++26

95. How do you organize a multi-file C++ project: header files, implementation files, include guards?
96. Explain the one definition rule (ODR) and the role of the extern, static and inline keywords.
97. What are C++ modules? Explain the export module and import declarations.
98. Compare modules and header files. How do you import the standard library with import std?
99. How do you create and use static and dynamic libraries in Visual Studio 2026?
100. Explain the purpose of the C++26 features: reflection, contracts and the std::execution facilities. How do you distinguish the specification from support by a particular compiler and library, and check availability before use?
