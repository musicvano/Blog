---
title: Practice
description: "Topic 1. The C++ Language and Your First Program: worked examples"
outline: [2, 3]
sourceHash: "8bd5f300921d29f81f39d2ba19cd33674507abd7d2450a8111f5b3bb86d37340"
---

# Practice

In these examples, all the input data is written in the code. The programs don’t wait
for keyboard input. Create each example as a separate console
project with a single `main.cpp` file: an executable program must have
only one `main` function. The `<print>` header provides `std::println`.
The project settings and terminal setup are described in the theory section.

## Example 1. Class schedule

**Problem.** Print the schedule of three classes. Set the class number, start time, end time,
and room in the code. Align the columns and add a header.

```cpp
#include <print>

int main()
{
    std::println("Class schedule");
    std::println("  No |  Start  |  End   |      Room");
    std::println("-----+---------+--------+----------");
    std::println("{:>4} | {:^7} | {:^6} | {:>9}",
        1, "08:30", "09:50", "201");
    std::println("{:>4} | {:^7} | {:^6} | {:>9}",
        2, "10:00", "11:20", "305");
    std::println("{:>4} | {:^7} | {:^6} | {:>9}",
        3, "11:30", "12:50", "112");
    return 0;
}
```

The format string contains four fields, and four values are passed after it
in the same order. `{:>4}` aligns the number to the right
in a field four positions wide. `{:^7}` centers the time in
a field seven positions wide. The `|` and `+` characters create a simple text
table that stays readable without colors.

Output:

```text
Class schedule
  No |  Start  |  End   |      Room
-----+---------+--------+----------
   1 |  08:30  | 09:50  |       201
   2 |  10:00  | 11:20  |       305
   3 |  11:30  | 12:50  |       112
```

The time here is text, not a special time type. The program doesn’t
calculate the intervals between classes. If you change room `201` to `1001`,
the column keeps its alignment because the value fits in nine
positions. If the text is longer than the field width, it isn’t truncated: the field
expands. You should check this when laying out tables.

## Example 2. A product label

**Problem.** For a sample product, “Notebook”, priced at 50 UAH before tax,
calculate a notional VAT of 20% and the price including tax. Print a label with a border.
The rate in this example is a given classroom parameter.

```cpp
#include <print>

int main()
{
    const double net = 50.0;
    const double rate = 0.20;
    const double tax = net * rate;
    const double total = net + tax;

    std::println("+----------------------------+");
    std::println("| Item: Notebook             |");
    std::println("| Net:     {:>10.2f} UAH    |", net);
    std::println("| VAT 20%: {:>10.2f} UAH    |", tax);
    std::println("| Total:   {:>10.2f} UAH    |", total);
    std::println("+----------------------------+");
    return 0;
}
```

The names `net`, `rate`, `tax`, and `total` let you read the calculation as
a sequence of steps. The `const` keyword marks a value that is not changed after
initialization. We use the `double` type for numbers
with a fractional part; data types are covered in detail in the next topic.
In code, the decimal separator is a period. Multiplication is written as `*`,
and addition as `+`. For example, `50.0 * 0.20` gives 10.0.

The `{:>10.2f}` specifier means right alignment, a minimum width of
ten positions, and two digits after the decimal separator. The regular
format without localization prints a period regardless of Ukrainian
regional settings. Formatting changes how the result looks,
not the value of the variable.

Output:

```text
+----------------------------+
| Item: Notebook             |
| Net:          50.00 UAH    |
| VAT 20%:      10.00 UAH    |
| Total:        60.00 UAH    |
+----------------------------+
```

::: tip Checking the calculation
Compare the result with a manual calculation: 50 · 0.20 = 10 UAH,
50 + 10 = 60 UAH. In this example, the initial price doesn’t include tax:
adding 20% to a price and extracting the tax from an already final price are
different problems. Real money calculations need separate rounding
rules; the goal here is to build and format your first program.
:::

Save the file as UTF-8. In Developer PowerShell opened in the folder
of this example, run:

```powershell
cl /nologo /std:c++latest /EHsc /W4 /utf-8 main.cpp
.\main.exe
```

The first line calls the compiler and the linker, and the second runs
the finished file. If the build failed, fix the error first
and build again: an old `main.exe` may be left over from a previous
successful build and not match the current code.

## Example 3. A project in Git

**Problem.** Create a local repository for a small console project,
save three meaningful commits, exclude service files, and learn
to restore one deliberate change that was saved in a file but not committed.

In Visual Studio, create a console project `Workshop` in a separate folder
for your coursework. Replace the contents of the program’s only file:

```cpp
#include <print>

int main()
{
    std::println("Training workshop");
    std::println("Version: 1");
    return 0;
}
```

Expected output of the first version:

```text
Training workshop
Version: 1
```

Build and run the program. In the *Git → Create Git Repository* menu,
select a local repository for the solution folder. A remote repository
is not needed for this example. If the dialog offers an initial commit,
count it as a separate service commit: the three program changes below
must still be visible in the history.

Check `.gitignore` in the repository root. The Visual Studio template
may be longer; for a classroom project, at least
the following build outputs and local settings must be ignored:

```text
.vs/
x64/
Debug/
Release/
*.obj
*.exe
*.pdb
*.ilk
*.vcxproj.user
```

The `.cpp`, `.vcxproj`, `.vcxproj.filters` files, the `.sln` or
`.slnx` solution, the README, and `.gitignore` itself are kept in the repository.
Ignore rules don’t stop tracking a file that was already
added earlier. So check the list of changes **before the first commit**.
The official description of the rules: <https://git-scm.com/docs/gitignore>.

1. In the *Git Changes* window, check the files, enter the message
  `Add workshop program`, and commit the initial program.
1. Change the version line to `Version: 2` and add, before `return 0;`,
  the call `std::println("Author: study group");`. Build and run
  the program, review the difference, and create the commit `Add author line`.
1. Create a README with the program’s purpose, the build command, and
  the expected output. Save it with the commit `Document build and output`.

Expected output of the second version, which stays current after
the README is added:

```text
Training workshop
Version: 2
Author: study group
```

Open the history in *Git Repository*. The messages explain the purpose
of each change, and the commit with the README doesn’t change the executable program. Short hashes,
author names, and times will be different in each repository. You can also check
the history and whether the working directory is clean with these commands:

```powershell
git log --oneline -3
git status --short
```

After all changes are saved, the second command shouldn’t print any lines.
If your variant includes a tag, the `git show v1.0` command shows the commit
it marks. To view just the file from this version without changing the working
directory, use `git show v1.0:main.cpp`; the path after the colon
is given from the repository root, for example `v1.0:Workshop/main.cpp`.
The tag must already exist; creating it is covered in the theory section.

Now, as an exercise, change only the text `Version: 2` to `Version: 999`,
save the file, but **don’t add it to the index**. Open a terminal
in exactly the folder where `main.cpp` is located, and check the difference:

```powershell
git diff -- main.cpp
```

Once you are sure this is only the deliberate trial change, restore the file:

```powershell
git restore -- main.cpp
git diff -- main.cpp
```

The second `git diff` call won’t print any differences. The `git restore` command
without additional options takes the contents from the index; since the trial change
wasn’t staged, version 2 comes back. No new commit
is created. Rebuild the program and check its output.
Documentation: <https://git-scm.com/docs/git-restore>.

::: tip Limits of restoring
In this experiment, we restore one known file and only a deliberate
change that was saved in the file but not committed. Review the difference before `git restore`:
Git usually can’t bring back discarded text that was never
committed. Committing changes, restoring a file, and running
a program are different actions.
:::
