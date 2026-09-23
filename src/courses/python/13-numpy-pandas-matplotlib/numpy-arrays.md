---
title: "Tools and NumPy arrays"
description: "Topic 13. NumPy, pandas, Matplotlib: Tools and NumPy arrays"
outline: [2, 3]
sourceHash: "fa0b2b3d90616b9681332cd52937edbff8b6ced882a0ddf39ddd527e371db554"
---

# Tools and NumPy arrays

## Tools and reproducibility

**NumPy** provides multidimensional numeric arrays and operations on them; **pandas** provides tables with labeled columns and rows; **Matplotlib** provides plotting tools. Official introductory guides: <https://numpy.org/doc/stable/user/absolute_beginners.html>, <https://pandas.pydata.org/docs/user_guide/10min.html>, <https://matplotlib.org/stable/users/explain/quick_start.html>. These libraries do not replace validation of data meaning: a correct `mean` call will not fix a mixture of meters and centimeters in one column.

Create a separate project with Python 3.14 and add dependencies to its environment. In the PyCharm terminal, verify that the command uses the project interpreter. For a uv project:

```powershell
uv add numpy pandas matplotlib
uv add --dev pytest
uv run python -c "import numpy; print(numpy.__version__)"
```

For a `venv` environment, the equivalent installation is `python -m pip install numpy pandas matplotlib pytest`. Subsequent launch commands are written as `python file.py`; in a uv project, use `uv run python file.py`. Pin dependencies and the Python version, and save the original CSV and program text in Git. Do not add environment files or temporary images to the repository.

The examples use only synthetic learning datasets. They are included directly in the code or as CSV text, so another person can reproduce the results without an external website or account. If a file changes, an old report should not be silently overwritten: first define the results directory and naming rules. Do not name your own modules `numpy.py` or `pandas.py`, to avoid shadowing an installed library.

## The ndarray array: values, type, and shape

An `ndarray` **array** (*array*) stores elements with a single `dtype`. The `shape` attribute is a tuple of axis lengths, `ndim` is the number of axes, and `size` is the total number of elements. A one-dimensional array has shape `(n,)`, while a table has `(rows, columns)`. Shape `(n, 1)` is not identical to `(n,)`: the first has two axes, which matters for calculations.

```py
import numpy as np

values = np.array([[10, 20, 30], [12, 22, 32]], dtype=float)
print(values.shape, values.ndim, values.size)
print(values.dtype)
print(values[1, 2])
```

Output: `(2, 3) 2 6`, `float64`, `32.0`. For a nested list, access would look like `items[1][2]`; an array accepts comma-separated axis indices within square brackets. All rows of the example matrix have the same length. Do not try to hide uneven nested lists with an arbitrary `dtype=object`: that is a different model.

The `zeros` and `ones` functions create arrays of a given shape, `arange` generates values with a step, and `linspace` generates a given number of points between bounds. For a fractional step, the number of `arange` elements can depend on binary rounding; when the number of points and inclusion of the endpoint matter, choose `linspace`.

```py
import numpy as np

print(np.zeros((2, 3), dtype=int))
print(np.arange(1, 7).reshape(2, 3))
print(np.linspace(0, 1, 5))
```

Output:

```
[[0 0 0]
 [0 0 0]]
[[1 2 3]
 [4 5 6]]
[0.   0.25 0.5  0.75 1.  ]
```

`reshape` preserves the element count: six values can be represented as `(2, 3)`, but not `(2, 4)`. One length may be specified as −1 so the library calculates it. Changing the shape does not necessarily create a copy; if data independence is part of the contract, call `copy` explicitly and check the shape after transformation.

### Choosing dtype and handling errors

The `int64` type has a limited range, unlike Python's arbitrary-precision `int`. The `float64` type represents approximate real values. An array containing strings and numbers may convert the numbers to text if you rely only on automatic type inference. At the program boundary, explicitly define the expected columns and conversions.

For monetary totals, storing integer kopiykas and checking the permitted range is convenient, rather than adding binary fractions. For measurements, choose a unit and precision. `np.isfinite` excludes `NaN` and infinities; ordinary division by zero does not always raise a Python exception and may produce infinity with a warning. Do not suppress warnings before finding their cause.
