---
title: "Type hints and PyCharm"
description: "Topic 3. Functions: Type hints and PyCharm"
outline: [2, 3]
sourceHash: "7ae83ce96b353e12a7541953500c271b9b844475ede4a76f1558ea3ef3604ba0"
---

# Type hints and PyCharm

## Type hints in Python 3.14

Annotations document a contract and help the IDE and static analyzer. Python itself does not check that an argument has the specified type. For example, multiplying a string by an integer works even in a function annotated for arithmetic. This is not a reason to pass incorrect types: the code may work by accident and fail later. <https://docs.python.org/3.14/library/typing.html>.

Annotate the parameters and results of your own functions. `list[int]` means a list of integers, `tuple[int, str]` a pair of two different types, and `dict[str, float]` a dictionary of string keys and floating-point values. `float | None` permits a number or no result. Use `-> None` for an action without a useful return value. In `*grades: float`, the annotation describes each argument, although `grades` is a tuple inside the function. In `**prices: float`, it describes each value.

`typing.Any` weakens static checks. It does not mean “any type that the analyzer will carefully check”. Beginners should name an exact type or allowed union rather than hiding a problem with `Any`. The absence of a warning does not prove a formula correct, so examples and boundary checks remain necessary.

### Deferred evaluation of annotations

In Python 3.14, function annotations are evaluated lazily by default when accessed. This differs both from immediate evaluation in earlier versions and from storing strings after `from __future__ import annotations`. That import is unnecessary for the Python 3.14 programs shown here; it remains supported and changes the semantics, so do not call it forbidden or remove it indiscriminately from older projects.

The `annotationlib` module provides `get_annotations` and the formats `VALUE`, `FORWARDREF`, and `STRING`. `STRING` is convenient for displaying function signatures; the result is a dictionary of text descriptions. Direct access to `__annotations__` under normal semantics yields evaluated values. Inspecting annotations does not validate an actual argument. <https://docs.python.org/3.14/library/annotationlib.html>.

```py
from annotationlib import Format, get_annotations


def label(code: int) -> str:
    return f"N{code}"


print(get_annotations(label, format=Format.STRING))
print(label.__annotations__["return"] is str)
```

```
{'code': 'int', 'return': 'str'}
True
```

Evaluating annotations may execute expressions. Ordinary application code does not need to read them manually for every call. Details of the deferred model are described in <https://peps.python.org/pep-0649/> and <https://peps.python.org/pep-0749/>.

## Working with functions in PyCharm

Place the cursor inside the parentheses of a `format_price` call and press **Ctrl+P** (*Parameter Info*): the IDE shows parameters, types, and default values. **Ctrl+Q** opens *Quick Documentation* with the docstring. These shortcuts are for the default Windows keymap; another *Keymap* may change them. <https://www.jetbrains.com/help/pycharm/viewing-reference-information.html>.

::: info Screenshot
PyCharm, format\_price call, Ctrl+P and Ctrl+Q in two crops.
:::

Figure 3.6. Function parameters and documentation {.caption}

The *Extract Function* refactoring (**Ctrl+Alt+M**) helps move selected code into a function. Check which variables became parameters and which result is returned. *Change Signature* (**Ctrl+F6**) changes parameters and the corresponding call sites. Review the proposed changes before confirming, then repeat reference runs afterward. Refactoring reference: <https://www.jetbrains.com/help/pycharm/extract-method.html> and <https://www.jetbrains.com/help/pycharm/change-signature.html>. Automatically changing text does not check the mathematical meaning of your contract.

For `area`, try `area("3", 4)` in the editor. The inspection should flag a `str` where `float` is expected. Do not leave this call in the final program. Static analysis with mypy and check configuration are covered in Topic 16.

::: info Screenshot
PyCharm: area("3", 4), hover highlighted string argument.
:::

Figure 3.7. Inspecting an argument's type {.caption}

## Common mistakes and checking contracts

If the program prints `None`, check whether every required path has a `return`. If state carries over between calls, check mutable defaults and global objects. If `UnboundLocalError` occurs, find every assignment to the name in the body. Do not mechanically add `global`: a parameter may be what you need.

Test a recursive algorithm separately for the base case, one step, several steps, and forbidden input. Record a quantity that strictly decreases: disk count, exponent, or interval length. Search also needs an empty set, the first and last elements, and an absent value. For statistics, check one element, equal grades, and an empty result after removal.

Separate invalid format from an invalid range of values. In this topic, text can be checked before `int`; for ready-made functions, a clearly stated precondition is acceptable. Exception handling and safe conversion of arbitrary text are covered in Topic 4. An annotation does not replace any of these checks.
