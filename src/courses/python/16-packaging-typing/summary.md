---
title: "Summary"
description: "Topic 16. Packaging and typing: conclusions and review questions"
sourceHash: "83b71805d595a082e4d5da44f6a810b368dd5a695ad1c309d17bad9e775a8c4e"
---

# Summary

## Conclusions

An import package and a distribution are different concepts: an sdist contains the sources for building, while a wheel contains ready-made files for installation, but it is not a self-contained executable. `pyproject.toml` describes the metadata, dependencies, entry point, and build method without paths to the author's environment. The `src/` layout and installing the built wheel into a clean environment reveal missing modules and resources that editable mode hides. A lock file helps reproduce the environment, and updating dependencies is a separate, tested change. Generic types link input and output, and `Protocol` defines a structural contract without inheritance. Annotations, `TypedDict`, and `cast` do not validate external data at run time, so validation remains mandatory. pytest, mypy, and Ruff check different properties of the code, and CI repeats these checks in a clean environment. PyInstaller builds an executable application, which is tested on the target system and from a different working directory.

## Self-check questions

1. How does an import package differ from a distribution?
2. Why is a wheel not the same as an executable file?
3. Which dependencies belong to `build-system`, runtime, and dev?
4. Which error does the `src/` layout help detect?
5. How does an entry point from `[project.scripts]` work?
6. What does the constraint `~=2.4` mean, and why is a lock file needed?
7. Why does an editable install not replace checking the wheel?
8. How does `--onedir` differ from `--onefile` in PyInstaller?
9. How does a type parameter link a function's input and output?
10. How does a structural `Protocol` differ from a base class?
11. Why do `TypedDict` and `cast` not validate external data?
12. How does `**P` preserve a function's parameters in a decorator?
13. What do mypy, Ruff, and pytest check?
14. Why is a green CI status not permission to publish?
15. How do you check the resources of a built GUI application?

Official sources: <https://packaging.python.org/en/latest/guides/writing-pyproject-toml/>, <https://docs.python.org/3.14/library/typing.html>, <https://mypy.readthedocs.io/en/stable/>, <https://docs.astral.sh/ruff/>, <https://docs.astral.sh/uv/guides/projects/>, <https://pyinstaller.org/en/stable/runtime-information.html>.
