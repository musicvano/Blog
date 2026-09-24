---
title: "Validation and linked fields"
description: "Topic 14. GUI applications with PySide6: validation and linked fields"
outline: [2, 3]
sourceHash: "fd67fde3ec045f0304316cbe888eb3754d577ea4ceeb7fb323e7505dd4e5fb84"
---

# Validation and linked fields

## Validation and linked fields

Validation must distinguish a finished value from an intermediate state. When typing a negative number, the user first enters `-`. `QValidator` distinguishes Invalid, Intermediate, and Acceptable. A validator helps with editing, but it does not replace domain validation before an action is performed. `hasAcceptableInput()` checks the current finished input. <https://doc.qt.io/qtforpython-6/PySide6/QtGui/QDoubleValidator.html>.

A number validator and its conversion must use the same locale. Below, `QLocale.c()` is chosen explicitly, so the fractional part is separated by a period. A localized application can use the system locale, but must not mix it with `float` without an agreed format.

### A temperature converter

Let us create two fields: Celsius and Fahrenheit. Changing either one recalculates the other and shows Kelvin. Physically valid values are not below absolute zero; the course's upper limit is 100000 °C. Intermediate or invalid input shows an explanation. `QSignalBlocker` temporarily blocks the target field's signals, and `textEdited` does not react to programmatic changes, so there is no "field A changed B, field B changed A again" loop.

```py
import math
import sys
from PySide6.QtCore import QLocale, QSignalBlocker, Slot
from PySide6.QtGui import QDoubleValidator
from PySide6.QtWidgets import (
    QApplication, QFormLayout, QLabel, QLineEdit, QWidget,
)


class Converter(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Temperature converter")
        self.celsius = QLineEdit("0")
        self.fahrenheit = QLineEdit("32")
        self.kelvin = QLabel("273.15 K")
        self.message = QLabel()
        form = QFormLayout(self)
        form.addRow("°C", self.celsius)
        form.addRow("°F", self.fahrenheit)
        form.addRow("Kelvin", self.kelvin)
        form.addRow(self.message)
        for field in (self.celsius, self.fahrenheit):
            validator = QDoubleValidator(-1e6, 1e6, 2, field)
            validator.setLocale(QLocale.c())
            validator.setNotation(
                QDoubleValidator.Notation.StandardNotation
            )
            field.setValidator(validator)
        self.celsius.textEdited.connect(self.from_celsius)
        self.fahrenheit.textEdited.connect(self.from_fahrenheit)

    def convert(self, source: QLineEdit, to_c: bool) -> None:
        if not source.hasAcceptableInput():
            self.message.setText("Finish entering the number")
            self.kelvin.setText("–")
            return
        value, valid = QLocale.c().toDouble(source.text())
        celsius = value if to_c else (value - 32) * 5 / 9
        if not valid or not math.isfinite(celsius):
            self.message.setText("A finite number is required")
            return
        if celsius < -273.15 - 1e-9 or celsius > 100000:
            self.message.setText("Allowed range: -273.15 to 100000 °C")
            self.kelvin.setText("–")
            return
        celsius = max(celsius, -273.15)
        target = self.fahrenheit if to_c else self.celsius
        result = celsius * 9 / 5 + 32 if to_c else celsius
        with QSignalBlocker(target):
            target.setText(f"{result:.2f}")
        self.kelvin.setText(f"{celsius + 273.15:.2f} K")
        self.message.clear()

    @Slot(str)
    def from_celsius(self, text: str) -> None:
        self.convert(self.celsius, True)

    @Slot(str)
    def from_fahrenheit(self, text: str) -> None:
        self.convert(self.fahrenheit, False)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = Converter()
    window.show()
    raise SystemExit(app.exec())
```

Reference results: 0 °C → 32.00 °F and 273.15 K; 212 °F → 100.00 °C and 373.15 K. An unfinished minus sign requires a message, not an exception. An error must not overwrite the second field with a wrong result; the message explains that the previous value there has not been updated yet.

::: info Screenshot
Run Converter: show 100 Celsius, 212 Fahrenheit and 373.15 K; second crop shows incomplete input and validation message.
:::

Figure 14.8. A two-way converter with input validation {.caption}
