---
title: "Summary"
description: "Topic 11. Modules, files, pytest: conclusions and review questions"
sourceHash: "4e41c0e9f457f6b99b980033a7c94cab7517f7067e3a15af94a1d980c8361215"
---

# Summary

## Conclusions

Modules and packages define responsibility boundaries. A file format is an external contract: you must check not only syntax but also domain meaning. Separate calculations and explicit paths let you test a program quickly and safely in temporary directories.

## Self-check questions

1. What code runs during the first import?
2. How does `sys.modules` differ from `sys.path`?
3. Why is the condition involving `__name__` needed?
4. How does a relative import depend on the launch method?
5. How does the working directory differ from the module directory?
6. Which open modes can change a file?
7. Why should encoding be specified explicitly?
8. What does JSON lose when converting a tuple or dataclass?
9. Why validate structure after `json.loads`?
10. Why can CSV not be split reliably with `split`?
11. What does `pytest.raises` check?
12. How does `parametrize` affect the number of tests?
13. What isolation guarantees does `tmp_path` provide?
14. When are `capsys` and `monkeypatch` useful?
15. Why does 100 percent coverage not prove correctness?

## Useful links

- <https://docs.python.org/3.14/tutorial/modules.html>.
- <https://docs.python.org/3.14/library/pathlib.html>.
- <https://docs.python.org/3.14/library/json.html>.
- <https://docs.python.org/3.14/library/csv.html>.
- <https://docs.pytest.org/en/stable/>.
