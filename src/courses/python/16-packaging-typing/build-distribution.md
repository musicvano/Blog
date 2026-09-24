---
title: "Versions, builds, and distribution"
description: "Topic 16. Packaging and typing: versions, builds, and distribution"
outline: [2, 3]
sourceHash: "23639f62b7f15435975c5669e066809c0a3c0594d329d6f068d60e5acd66a249"
---

# Versions, builds, and distribution

## Versions, dependencies, and reproducibility

The version `0.1.0` follows the rules of PEP 440. The "major.minor.patch" convention describes the nature of changes, but tools do not prove API compatibility. A pre-release can have the version `1.0.0rc1`; a local version label serves a different purpose than a public release. Do not compare versions as ordinary strings.

The constraint `>=2,<3` allows a compatible range chosen by the author; `~=2.4` means `>=2.4,==2.*`, and `~=2.4.1` means `>=2.4.1,==2.4.*`. An exact `==` pins one version of a direct dependency, but not the entire graph. A lock file stores the selected transitive dependencies and helps reproduce the environment. It does not replace the wheel's metadata.

For uv, commit `uv.lock` to Git and use `uv sync --locked`: a mismatch with the metadata ends the command with an error instead of a silent update. Updating dependencies is a separate change with the tests rerun. Also pin the Python version and platform if the result depends on them.

Editable mode, `pip install -e .`, is convenient for development: changes to the sources are immediately available to the program. However, it can hide a resource missing from the wheel. Therefore, the final check uses a regular installation of the already built artifact.

## Building and clean installation

From the project root, using its Python, run:

```powershell
python -m pip install -e ".[dev]"
python -m pytest -q
python -m mypy src
python -m ruff check .
python -m ruff format --check .
python -m build
```

`python -m build` creates an sdist and a wheel in `dist/`; the equivalent way to build with uv is `uv build`. Inspect the wheel as a ZIP archive: it must contain the modules, `py.typed`, the metadata, and the entry point description. The file name alone does not prove completeness.

::: info Screenshot
An illustration will be added.
:::

Figure 16.3. Building an sdist and a wheel in the terminal {.caption}

Create a new test directory outside the root of the source project. Copy only the wheel there; the commands below are run in that directory.

```powershell
python -m venv consumer
consumer\Scripts\python -m pip install --no-index `
  --no-deps units_converter-0.1.0-py3-none-any.whl
consumer\Scripts\units-convert 1.25
consumer\Scripts\units-convert --help
consumer\Scripts\units-convert -1
```

`--no-deps` is appropriate specifically here: the package has no runtime dependencies. For another package, install them from a prepared repository or an allowed index. Run `pip check`, check the path `units_converter.__file__`, and the exit code. Do not add `src/` to `PYTHONPATH` during this check.

::: info Screenshot
An illustration will be added.
:::

Figure 16.4. A command from the installed wheel in a clean environment {.caption}

For a user CLI tool, `uv tool install path-to-wheel` creates a separate environment and provides the command. This differs from `uv add`, which adds a dependency to the current project.

## Package registries and executable applications

PyPI is a public registry, and TestPyPI is a separate site for testing the publishing process. Their accounts, tokens, and contents are independent. Publishing changes an external service: first check your rights to the name, the license, the contents of the archives, and the absence of secrets. A token is never written in code or a report. A local wheel is sufficient for defending this lab.

If a course project is later published, follow the current PyPA guide and use separate credentials. Do not mix indexes without understanding where the packages come from. A new release requires a new version and a verified artifact.

PyInstaller bundles the interpreter, the code, and the required libraries into a directory or a single executable file. It is not a means of protecting source code. Windows builds are made on Windows; compatibility is checked on the target system. The large size of a Qt GUI application is an expected consequence of including the libraries.

Start with `--onedir`: this makes it easier to see the files and the causes of errors. `--onefile` unpacks the contents at startup and may start more slowly. `--windowed` hides the Windows console, so add it after checking diagnostics. For Qt, there is also `pyside6-deploy`; this is a different build process, not a PyInstaller option. `zipapp` requires an installed compatible Python.
