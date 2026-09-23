---
title: "Валідація і зв’язані поля"
description: "Тема 14. Графічні застосунки PySide6: Валідація і зв’язані поля"
outline: [2, 3]
---

# Валідація і зв’язані поля

## Валідація і зв’язані поля

Перевірка має відрізняти завершене значення від проміжного стану. Під час набору від’ємного числа користувач спочатку вводить `-`. `QValidator` розрізняє Invalid, Intermediate та Acceptable. Валідатор допомагає редагуванню, але не замінює перевірку предметної області перед виконанням дії. `hasAcceptableInput()` перевіряє поточний завершений запис. <https://doc.qt.io/qtforpython-6/PySide6/QtGui/QDoubleValidator.html>.

Валідатор числа і його перетворення повинні використовувати ту саму локаль. Нижче явно обрано `QLocale.c()`, отже дробову частину відокремлюють крапкою. У локалізованому застосунку можна використати системну локаль, але не змішувати її з `float` без узгодженого формату.

### Конвертер температури

Створимо два поля: Celsius та Fahrenheit. Зміна будь-якого перераховує інше й показує Kelvin. Фізично допустимі значення не нижчі за абсолютний нуль; навчальна верхня межа – 100000 °C. Проміжне або неправильне введення показує пояснення. `QSignalBlocker` тимчасово блокує сигнали цільового поля, а `textEdited` не реагує на програмний запис – так немає циклу «поле A змінило B, поле B знову змінило A».

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
        self.setWindowTitle("Конвертер температури")
        self.celsius = QLineEdit("0")
        self.fahrenheit = QLineEdit("32")
        self.kelvin = QLabel("273.15 K")
        self.message = QLabel()
        form = QFormLayout(self)
        form.addRow("°C", self.celsius)
        form.addRow("°F", self.fahrenheit)
        form.addRow("Кельвіни", self.kelvin)
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
            self.message.setText("Завершіть числовий запис")
            self.kelvin.setText("–")
            return
        value, valid = QLocale.c().toDouble(source.text())
        celsius = value if to_c else (value - 32) * 5 / 9
        if not valid or not math.isfinite(celsius):
            self.message.setText("Потрібне скінченне число")
            return
        if celsius < -273.15 - 1e-9 or celsius > 100000:
            self.message.setText("Допустимо від -273.15 до 100000 °C")
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

Контрольні результати: 0 °C → 32.00 °F і 273.15 K; 212 °F → 100.00 °C і 373.15 K. Для незавершеного мінуса потрібне повідомлення, а не виняток. Помилка не повинна перезаписувати друге поле хибним результатом; повідомлення пояснює, що попереднє значення там ще не оновлено.

::: info Знімок екрана
Run Converter: show 100 Celsius, 212 Fahrenheit and 373.15 K; second crop shows incomplete input and validation message.
:::

Рис. 14.8. Двосторонній конвертер з перевіркою введення {.caption}
