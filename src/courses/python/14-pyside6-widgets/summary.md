---
title: "Summary"
description: "Topic 14. GUI applications with PySide6: conclusions and review questions"
sourceHash: "6eeba47d2cafacd1e04f3b13b78efe0f6271964295dc77623c5c3c36b057adbd"
---

# Summary

## Conclusions

A GUI application reacts to events. Layouts make a form adaptive, signals connect components, and slots perform short actions. Computations should be kept separate from widgets. Validation must be understandable to the user and keep the program in a correct state.

## Self-check questions

1. Why do you need a single `QApplication` and a call to `exec()`?
2. Why does `show()` not replace the event loop?
3. How does the widget tree differ from the layout tree?
4. When can a local widget without a parent disappear?
5. Which tasks are the four main layouts intended for?
6. Why is `QSpinBox.value()` better than reading its text?
7. What do the `textChanged` and `textEdited` signals mean?
8. Why are parentheses not added after the function name in `connect`?
9. Where do you declare a custom `Signal`, and how do you emit a value?
10. How do you avoid a loop in two-way recalculation?
11. Why does a validator allow intermediate states?
12. How does a single action appear in both a menu and a toolbar?
13. Why can a timeout not be considered an exact time measurement?
14. How do `pyside6-uic` and `QUiLoader` differ?
15. Which checks cannot be replaced by offscreen tests?

## Useful links

- <https://doc.qt.io/qtforpython-6/>
- <https://doc.qt.io/qt-6/signalsandslots.html>
- <https://doc.qt.io/qt-6/layout.html>
- <https://doc.qt.io/qt-6/qtdesigner-manual.html>
