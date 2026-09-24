---
title: "Designer, styling, and testing"
description: "Topic 14. GUI applications with PySide6: Designer, styling, and testing"
outline: [2, 3]
sourceHash: "ec5af31619dce2a0c5a61909929150a982e9551dd201d624c1c7ac8ac59a2da6"
---

# Designer, styling, and testing

## Qt Widgets Designer and .ui files

Designer creates an XML `.ui` description with widgets, properties, and layouts. It does not replace data validation or domain logic. The main approach in this topic is building the interface in code; Designer is useful for reviewing a form and collaborating on its layout. <https://doc.qt.io/qtforpython-6/tutorials/basictutorial/uifiles.html>.

```powershell
uv run pyside6-designer
uv run pyside6-uic tasks.ui -o ui_tasks.py
```

Choose the *Widget* template, add fields, set a layout, give the widgets meaningful `objectName` values, and save the `.ui` file. The generated `ui_tasks.py` is not edited by hand: changes will be lost on regeneration. Your own class creates `Ui_Form`, calls `setupUi(self)`, and connects the handlers. The lab contains a complete example.

An alternative is `QUiLoader`, which reads the `.ui` file at run time. Open a `QFile`, check that it succeeded, pass it to `loader.load`, check the resulting window, and close the file. Fields are found with `findChild(QLineEdit, "nameEdit")`; a missing name is a form error that must be reported. With this approach, the `.ui` file must be distributed together with the program. Generation gives an ordinary Python import and detects some name errors earlier.

::: info Screenshot
Open lab tasks.ui in Designer; show Widget Box, form layout, Object Inspector and Property Editor with objectName.
:::

Figure 14.11. A form in Qt Widgets Designer {.caption}

::: info Screenshot
Use Edit Signals/Slots F4 on a scratch form: button clicked to form close; show Configure Connection. Do not add this connection to tasks.ui.
:::

Figure 14.12. Connecting a signal and a slot in Designer {.caption}

## Styling, accessibility, and testing

**QSS** is Qt style sheets with a CSS-like syntax, but it is not a full web technology. The style `QLineEdit { border: 1px solid gray; }` can be applied with `setStyleSheet`. Do not use color as the only indication of an error: add explanatory text. Arbitrarily hard-coding a white background and black text for only some components can break the system dark theme.

`QFont` configures the font, and `QIcon` configures an icon. `.qrc` resources and `pyside6-rcc` let you avoid depending on the current directory. For a simple project, build paths from `__file__`, not from an arbitrary launch location. Qt 6 supports High-DPI; check the window at an increased scale instead of drawing all elements with fixed pixel sizes.

Testing a GUI application has three parts. pytest tests the pure computational functions. Widget state is checked after setting data and simulating clicks, for example with QtTest. Appearance is evaluated in a real window: margins, keyboard focus, label wrapping, and behavior on resizing. The `QT_QPA_PLATFORM=offscreen` mode is useful for automated state checks but does not prove the visual quality on Windows.

## Common mistakes

- A widget is created before `QApplication`: create the application first.
- There is no `app.exec()`: the program does not process events.
- `connect(handler())` calls the handler prematurely: pass the function.
- Two fields endlessly change each other: distinguish `textEdited` from `textChanged` and use `QSignalBlocker`.
- A slot waits for the network or runs a long loop: split the work and do not block the GUI thread.
- A window disappears after a function returns: check the parent and the Python reference.
- Only the button is checked: repeat validation in the action and validate imported data separately.
- The generated `ui_*.py` is edited: change the `.ui` file and your own class.
