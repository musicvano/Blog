---
title: Practice
description: "Topic 16. Modules and C++26: worked examples"
outline: [2, 3]
sourceHash: "8e743979823f6798c66107478ce85acc56ec16b0eaccb19f51bf705bf32337b6"
---

# Practice

Each example below is a separate project with its own directory. Do not add
all the `main.cpp`, `app.cpp`, and `tests.cpp` files to one executable target:
a program must have a single entry point. The commands are run from the directory
of the corresponding example in Developer PowerShell for Visual Studio 2026.

The example with manual commands shows the artifacts and dependencies. For your own
complex variant, you should keep a single reproducible build script.
After each command, check `$LASTEXITCODE`; after a failed build,
do not run the old `.exe` as if it were the result of the fixed program.

## Example 1. A temperature conversion module

**Problem.** Export a function that converts degrees Celsius to kelvins.
It accepts only finite numbers not lower than −273.15 °C. Place the implementation
in a separate module unit. A console client prints the results for
0 °C, absolute zero, and the invalid −300 °C; the data is set in the code.

**`units.ixx`:**
```cpp
export module units;

export namespace units {
    double celsius_to_kelvin(double value);
}
```

**`units.cpp`:**
```cpp
module;
#include <cmath>
#include <stdexcept>

module units;

double units::celsius_to_kelvin(double value)
{
    if (!std::isfinite(value) || value < -273.15) {
        throw std::invalid_argument("invalid temperature");
    }
    return value + 273.15;
}
```

The `<cmath>` and `<stdexcept>` headers belong to the global module fragment.
The function declaration is in the interface, and its definition is in the implementation
of the same module. The client does not need to include these internal headers
just to use the conversion.

**`main.cpp`:**
```cpp
#include <exception>
#include <print>
import units;

int main()
{
    for (double value : {0.0, -273.15, -300.0}) {
        try {
            const double result = units::celsius_to_kelvin(value);
            std::println("{:.2f} C -> {:.2f} K", value, result);
        } catch (const std::exception& error) {
            std::println("{:.2f} C: {}", value, error.what());
        }
    }
}
```

In the client, the `<exception>` header is needed for the type that the client itself names
in `catch`. Importing one interface does not give you permission to rely
on the accidental availability of all the headers of its implementation.

```powershell
$opts = '/nologo','/std:c++latest','/EHsc','/utf-8','/W4'
cl @opts /c units.ixx
cl @opts /c units.cpp /Fo:units-impl.obj `
  /reference units=units.ifc
cl @opts main.cpp units.obj units-impl.obj `
  /reference units=units.ifc
.\main.exe
```

Output:

```text
0.00 C -> 273.15 K
-273.15 C -> 0.00 K
-300.00 C: invalid temperature
```

The bound check is performed **before** the computation. A `NaN` cannot be rejected
with a single comparison against the lower bound, so `std::isfinite` is used.
A successful result has a unit of measurement; an error is not disguised as
the value 0 K, which is itself the correct result for absolute zero.

Separately check 100 °C, infinity, and NaN. To compare results
with a fractional part, use a justified tolerance, for example,
`1e-9` in this small example. It applies to the numerical check,
not to accepting a physically invalid argument.

## Example 2. A static library, an application, and tests

**Problem.** Training delivery of a parcel weighing 1–5000 g costs 40 UAH
for the first 1000 g and another 10 UAH for each started thousand grams after that.
The rate is a hypothetical parameter of the problem. The library computes the price as an integer,
the client shows the price for 1500 g, and a separate program checks the boundaries.

**`fees.h`:**
```cpp
#pragma once
namespace fees {
    int delivery(int grams);
}
```

**`fees.cpp`:**
```cpp
#include "fees.h"
#include <stdexcept>

int fees::delivery(int grams)
{
    if (grams <= 0 || grams > 5000) {
        throw std::invalid_argument("mass outside 1..5000");
    }
    return 40 + ((grams - 1) / 1000) * 10;
}
```

The formula `(grams - 1) / 1000` gives 0 for 1–1000 g, 1 for 1001–2000 g,
and so on. The subtraction is safe because the lower bound has been checked earlier.
It is important to check 1000 and 1001, not just a random value from the middle of the range.

**`app.cpp`:**
```cpp
#include "fees.h"
#include <print>

int main()
{
    std::println("1500 g: {} UAH", fees::delivery(1500));
}
```

**`tests.cpp`:**
```cpp
#include "fees.h"
#include <print>
#include <stdexcept>

int main()
{
    int failed = 0;
    failed += fees::delivery(1) != 40;
    failed += fees::delivery(1000) != 40;
    failed += fees::delivery(1001) != 50;
    failed += fees::delivery(5000) != 80;
    for (int bad : {0, 5001}) {
        try { (void)fees::delivery(bad); ++failed; }
        catch (const std::invalid_argument&) {}
    }
    std::println("Failed: {}", failed);
    return failed == 0 ? 0 : 1;
}
```

Here the mandatory checks do not depend on `assert`: the failure counter
and the exit code also work in Release. Each test uses
an independently known expected number. A check of an invalid argument
counts as passed only if the expected `std::invalid_argument` is thrown.

```powershell
$opts = '/nologo','/std:c++latest','/EHsc','/utf-8','/W4'
cl @opts /c fees.cpp
lib /nologo /out:fees.lib fees.obj
cl @opts app.cpp fees.lib
cl @opts tests.cpp fees.lib
.\app.exe
.\tests.exe
$LASTEXITCODE
```

The result of running them in sequence:

```text
1500 g: 50 UAH
Failed: 0
0
```

The library is built once and used by two clients.
If you change the rate, both programs must get the new library
after relinking. Copying `fees.cpp` into the test project
instead of referencing the library weakens this check: you may accidentally
test a different implementation from the one the application uses.

To check the reliability of the tests themselves, temporarily change the expected price
for 1001 g to 51. The test program must report one failure and exit code 1.
Restore the expected value of 50. This experiment proves that the program
reacts to a mismatch rather than always printing a success message.

## Example 3. A module and checks in CMake

**Problem.** Create a `score` module that clamps an integer value to the range
0–100: smaller numbers become 0, and larger ones become 100. A console client
shows three examples, and a separate test target checks the boundaries. The build description
must be reproducible with CMake commands without manually adding files to the IDE.

This is a separate directory with four files. CMake 4.2 or later is required
for the Visual Studio 2026 generator; CMake 4.4.3 was tested.
The client’s library headers are brought in with `#include`, so
the example does not depend on the experimental `import std` automation in CMake.

**`score.ixx`:**
```cpp
export module score;

export int limit_score(int value)
{
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
}
```

**`app.cpp`:**
```cpp
#include <print>
import score;

int main()
{
    for (int value : {-5, 70, 120}) {
        std::println("{} -> {}", value, limit_score(value));
    }
}
```

**`tests.cpp`:**
```cpp
import score;

int main()
{
    return limit_score(-1) == 0 && limit_score(0) == 0
        && limit_score(50) == 50 && limit_score(100) == 100
        && limit_score(101) == 100 ? 0 : 1;
}
```

**`CMakeLists.txt`:**
```cmake
cmake_minimum_required(VERSION 4.2)
project(ScoreCourse LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
add_library(score STATIC)
target_sources(score PUBLIC
  FILE_SET CXX_MODULES FILES score.ixx)
add_executable(app app.cpp)
target_link_libraries(app PRIVATE score)
add_executable(tests tests.cpp)
target_link_libraries(tests PRIVATE score)
if(MSVC)
  foreach(target score app tests)
    target_compile_options(${target} PRIVATE /W4 /utf-8)
  endforeach()
endif()
enable_testing()
add_test(NAME boundaries COMMAND tests)
```

`PUBLIC FILE_SET CXX_MODULES` makes the module interface available
to the targets that use the library. Simply adding the `.ixx` file as
an arbitrary private file does not describe this public contract.
The dependency scanner determines that the module must be compiled before its clients.

```powershell
cmake -S . -B build -G "Visual Studio 18 2026" -A x64
cmake --build build --config Debug
.\build\Debug\app.exe
ctest --test-dir build -C Debug --output-on-failure
```

The application output:

```text
-5 -> 0
70 -> 70
120 -> 100
```

CTest should report that the `boundaries` test passed: 1 test, 0 failures.
The duration depends on the machine and is not part of the expected result.
If CTest reports that there are no tests, check `enable_testing`,
`add_test`, and whether the `--test-dir` directory is correct.

Repeat the build with `--config Release` and the tests with `-C Release`.
The results directory changes accordingly. After changing the compiler or the
generator, create a new build directory: do not edit the cache manually
to mask incompatible settings. For everyday work, use a
permanent training directory, not the system Temp.
