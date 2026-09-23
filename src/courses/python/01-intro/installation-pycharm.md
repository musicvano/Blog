---
title: "Installing Python and PyCharm"
description: "Topic 1. Python, PyCharm, and Git: Installing Python and PyCharm"
outline: [2, 3]
sourceHash: "58f082eb016e016ad8ef428027449669c0b03951519719dd94483ffd4ca1cdb0"
---

# Installing Python and PyCharm

## Installing Python

### Windows: the install manager

The main platform for the labs is Windows 11. Open <https://www.python.org/downloads/windows/> and install **Python Install Manager**. Do not confuse the manager with the runtime itself: it downloads and maintains the Python versions you need. The manager's commands are documented at <https://docs.python.org/3.14/using/windows.html>.

::: info Screenshot
python.org/downloads/windows: Install Manager and Python 3.14
:::

Figure 1.3. Downloading Python for Windows {.caption}

After installation, open a new PowerShell window and run:

```powershell
py install 3.14
py list
py -V:3.14 --version
python --version
where.exe python
```

`py list` shows installed versions, while `where.exe` shows the executables it finds. In PowerShell, use `where.exe` specifically, because the short form `where` has a different meaning. If `py install` is not recognized, the old Python Launcher may be running: use `pymanager install 3.14` and check the command's source. Do not remove existing interpreters until you know which projects need them.

::: info Screenshot
PowerShell: py install 3.14; py list; python –version
:::

Figure 1.4. Checking the installed Python 3.14 {.caption}

The traditional `.exe` installer is still available for Python 3.14, but is marked deprecated; releases for 3.16 and later are not planned. The *Add python.exe to PATH* checkbox belongs specifically to that installer. If the command opens Microsoft Store, check *App execution aliases* and the path to the Python you need; do not change all system aliases at random.

::: info Screenshot
python: `2 ** 100`; import sys; sys.version; exit()
:::

Figure 1.5. An interactive Python session {.caption}

### Linux and macOS

On Linux, the system `python3` may have a different version from the one required for the course. Do not use it to replace system components. On Debian/Ubuntu, the environment creation module may require a separate package:

```bash
python3 --version
sudo apt update
sudo apt install python3-venv
python3 -m venv .venv
source .venv/bin/activate
```

These commands use the distribution's version. If you specifically need 3.14, install uv using its official instructions, then run `uv python install 3.14`, followed by `uv venv --python 3.14 .venv` in a new project directory. Do not run both environment creation commands on the same existing environment unnecessarily.

On macOS, you can install the `.pkg` from <https://www.python.org/downloads/macos/>. Check `python3.14 --version`; create an environment with `python3.14 -m venv .venv`. After activation with `source .venv/bin/activate`, the `python` command should point to the project environment. On both systems, install project packages without `sudo pip`.

## JetBrains PyCharm

An **IDE** (*Integrated Development Environment*) combines an editor, execution, a debugger, and project management tools. PyCharm does not replace Python: the IDE runs the selected interpreter. Download: <https://www.jetbrains.com/pycharm/download/>.

PyCharm now ships as a unified product. Core features remain free; you can continue using them after the Pro trial. Paid features are not needed for this lab. Check educational terms separately: <https://www.jetbrains.com/academy/student-pack/>. Do not treat a student license as permission for unrestricted commercial use.

For PyCharm 2026.2, the documentation specifies 8 GB of total RAM, 3 GB available for the IDE, 10 GB of disk space, and a display of at least 1280×720. There is no need to install Java separately: JetBrains Runtime is bundled. Current requirements: <https://www.jetbrains.com/help/pycharm/installation-guide.html>.

::: info Screenshot
PyCharm download: Windows, version and download button
:::

Figure 1.6. The PyCharm download page {.caption}

Install the IDE directly or through JetBrains Toolbox App. On first launch, choose the English interface so that command names match this material. Importing old settings is optional. From the welcome window, you can create a project, open a directory, or clone a repository (Fig. 1.7).

::: info Screenshot
Welcome: New Project, Open, Clone Repository
:::

Figure 1.7. The PyCharm welcome window {.caption}

### Your first project

1. Click *New Project* and choose *Pure Python*.
2. Specify the directory `C:\Labs\hello`; the project name matches the directory name.
3. Choose *Project venv* and base Python 3.14. The environment will be in `.venv`.
4. Create `main.py` using *New → Python File*. If the IDE has already created an example, replace it with the code below.
5. For the first run, right-click the file and choose *Run 'main'*. Once the configuration exists, you can run it again with **Shift+F10**.

::: info Screenshot
New Project: Pure Python; hello; Project venv; Python 3.14
:::

Figure 1.8. A project with its own environment {.caption}

```py
"""The first program in the course."""


def main():
    print("Hello, Python!")


if __name__ == "__main__":
    main()
```

Program output:

```
Hello, Python!
```

In the *Run* window, the IDE also displays the launch command and exit code. `Process finished with exit code 0` means the process ended successfully, but does not prove that the calculations are correct. Check the result itself as well. Project creation instructions: <https://www.jetbrains.com/help/pycharm/creating-empty-project.html>.

::: info Screenshot
main.py; Project; Run with Hello, Python!; interpreter widget
:::

Figure 1.9. The editor and execution result {.caption}

The *Project* window shows files, *Run* shows the output of a separate process, *Python Console* provides interactive Python, and *Terminal* provides a command shell. Enter `python main.py` in the terminal, not after `>>>`. Use **Ctrl+Alt+L** to format code, **Alt+Enter** for a suggested fix, and **Ctrl+Q** for documentation in the default Windows keymap. Check reassigned shortcuts under *Settings → Keymap*.

## Module structure and errors

A **module** is a file containing Python code. A documentation string (*docstring*) is appropriate at the beginning, followed by imports, function definitions, and the entry point. `def main():` defines a function but does not execute it. Calling `main()` runs its body. The `__name__ == "__main__"` check distinguishes direct execution from import: importing loads the definitions without making this call.

Indentation defines blocks. Use four spaces per level, rather than mixing spaces and tabs. A comment begins with `#` and explains the intent. Write variable and function names in `snake_case`, and constants in `UPPER_CASE`. Style rules: <https://peps.python.org/pep-0008/>.

Deliberately replace `print` with `prnt` and run the file. In the **traceback**, find the last line with the error type, then the file and line number above it. `NameError` means an unknown name; an editor suggestion is not an automatic correction. Fix the error and run the program again to check the result.

::: info Screenshot
prnt("Hi"); Run: NameError and clickable source line
:::

Figure 1.10. Reading an error message {.caption}

Table 1.2. Initial errors and where to look for their causes {.caption}

| **Error** | **Example cause** | **What to check** |
| --- | --- | --- |
| `SyntaxError` | Missing `:` after `def` | The syntax of the indicated line |
| `IndentationError` | No indentation in the function body | Four spaces per level |
| `NameError` | `prnt` instead of `print` | The name's spelling and definition |
| `ModuleNotFoundError` | The package is in another environment | The interpreter path |

### Example: command-line arguments

The `args.py` file shows how the shell passes data to a program. This differs from `input`: values are provided before the process starts.

```py
"""Displays arguments without converting them."""
import sys

print("File:", sys.argv[0])
print("Arguments:", sys.argv[1:])
```

Running `python args.py alpha "beta gamma"` produces:

```
File: args.py
Arguments: ['alpha', 'beta gamma']
```

Quotes combine two words into one argument and usually are not part of its value. In PyCharm, open *Run → Edit Configurations* and enter these values in the script parameters field. Also check *Working directory*: relative paths depend on it. Do not append arguments to the filename itself.
