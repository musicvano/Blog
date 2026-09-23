---
title: "Практика"
description: "Тема 14. Графічні застосунки PySide6: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Калькулятор індексу маси тіла

Створити форму для маси в кілограмах і зросту в метрах, обчислити `mass / height ** 2` при зміні значень. Показати числовий індекс та інтервал, до якого він потрапляє. Це навчальна формула й перевірка віджетів, не індивідуальна медична рекомендація. Межі полів – обмеження цієї вправи.

```py
import sys
from PySide6.QtCore import Slot
from PySide6.QtWidgets import (
    QApplication, QDoubleSpinBox, QFormLayout, QLabel, QWidget,
)


class BmiWindow(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Навчальний калькулятор ІМТ")
        self.mass = QDoubleSpinBox()
        self.mass.setRange(1, 300)
        self.mass.setSuffix(" кг")
        self.mass.setValue(70)
        self.height = QDoubleSpinBox()
        self.height.setRange(0.5, 2.5)
        self.height.setSingleStep(0.01)
        self.height.setSuffix(" м")
        self.height.setValue(1.75)
        self.result = QLabel()
        form = QFormLayout(self)
        form.addRow("Маса", self.mass)
        form.addRow("Зріст", self.height)
        form.addRow("Індекс", self.result)
        self.mass.valueChanged.connect(self.calculate)
        self.height.valueChanged.connect(self.calculate)
        self.calculate()

    @Slot()
    def calculate(self) -> None:
        value = self.mass.value() / self.height.value() ** 2
        band = "нижче 18.5" if value < 18.5 else "18.5–25"
        if value >= 25:
            band = "25–30" if value < 30 else "від 30"
        self.result.setText(f"{value:.2f}; інтервал: {band}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = BmiWindow()
    window.show()
    raise SystemExit(app.exec())
```

Для 70 кг і 1.75 м форма показує `22.86; інтервал: 18.5–25`. Нульовий зріст неможливо вибрати через поле. Оскільки значення надходять із `QDoubleSpinBox`, перетворення локалізованого тексту вручну не потрібне. Перевірте також межі полів і оновлення після зміни кожного з двох параметрів.

## Приклад 2. Секундомір

Створити секундомір зі стартом, паузою, скиданням і колами. Вимірювати час через монотонний `perf_counter`, а `QTimer` використовувати лише для оновлення показу. Пауза не входить до накопиченого часу. Коло – різниця між поточним накопиченим часом і часом попереднього кола.

```py
import sys
from time import perf_counter
from PySide6.QtCore import QTimer, Slot
from PySide6.QtWidgets import (
    QApplication, QHBoxLayout, QLabel, QListWidget,
    QPushButton, QVBoxLayout, QWidget,
)


class Stopwatch(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Секундомір")
        self.accumulated = 0.0
        self.started: float | None = None
        self.last_lap = 0.0
        self.display = QLabel("0.00 с")
        self.laps = QListWidget()
        layout = QVBoxLayout(self)
        layout.addWidget(self.display)
        layout.addWidget(self.laps)
        buttons = QHBoxLayout()
        for title, handler in (
            ("Старт/пауза", self.toggle),
            ("Коло", self.lap), ("Скинути", self.reset),
        ):
            button = QPushButton(title)
            button.clicked.connect(handler)
            buttons.addWidget(button)
        layout.addLayout(buttons)
        self.timer = QTimer(self)
        self.timer.setInterval(50)
        self.timer.timeout.connect(self.refresh)

    def elapsed(self) -> float:
        if self.started is None:
            return self.accumulated
        return self.accumulated + perf_counter() - self.started

    @Slot()
    def toggle(self) -> None:
        if self.started is None:
            self.started = perf_counter()
            self.timer.start()
        else:
            self.accumulated = self.elapsed()
            self.started = None
            self.timer.stop()
        self.refresh()

    @Slot()
    def refresh(self) -> None:
        self.display.setText(f"{self.elapsed():.2f} с")

    @Slot()
    def lap(self) -> None:
        if self.started is None:
            return
        total = self.elapsed()
        duration = total - self.last_lap
        self.last_lap = total
        number = self.laps.count() + 1
        self.laps.addItem(f"{number}: {duration:.2f} с")

    @Slot()
    def reset(self) -> None:
        self.timer.stop()
        self.started = None
        self.accumulated = self.last_lap = 0.0
        self.laps.clear()
        self.refresh()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = Stopwatch()
    window.show()
    raise SystemExit(app.exec())
```

На старті показано `0.00 с`. Після паузи значення не змінюється; повторний старт продовжує накопичення. «Коло» на паузі нічого не додає. «Скинути» зупиняє таймер, очищає кола й повертає нуль. Тест порівнює час із допустимою похибкою, а не очікує точного числа timeout за секунду. Слот не містить `sleep`.

## Приклад 3. Список справ із Designer

Створити форму з полем, списком і кнопками додавання та видалення. Порожні або пробільні справи не додавати. Видаляти лише вибраний елемент; без вибору кнопку вимкнути. Повторні назви дозволені. Збережіть наведений XML як `tasks.ui`; його можна також відкрити й змінити у Designer.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ui version="4.0">
 <class>Form</class>
 <widget class="QWidget" name="Form">
  <property name="windowTitle"><string>Список справ</string></property>
  <layout class="QVBoxLayout" name="verticalLayout">
   <item><widget class="QLineEdit" name="taskEdit"/></item>
   <item><widget class="QPushButton" name="addButton">
    <property name="text"><string>Додати</string></property>
   </widget></item>
   <item><widget class="QListWidget" name="taskList"/></item>
   <item><widget class="QPushButton" name="removeButton">
    <property name="text"><string>Видалити</string></property>
   </widget></item>
  </layout>
 </widget>
 <resources/>
 <connections/>
</ui>
```

У каталозі форми виконайте:

```powershell
uv run pyside6-uic tasks.ui -o ui_tasks.py
```

Збережіть наступну програму як `tasks_app.py` поруч із формою і згенерованим модулем. Після кожної зміни `.ui` повторіть генерацію; власна логіка залишається у `TasksWindow`.

```py
import sys
from PySide6.QtCore import Slot
from PySide6.QtWidgets import QApplication, QWidget
from ui_tasks import Ui_Form


class TasksWindow(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.ui = Ui_Form()
        self.ui.setupUi(self)
        self.ui.addButton.clicked.connect(self.add_task)
        self.ui.taskEdit.returnPressed.connect(self.add_task)
        self.ui.removeButton.clicked.connect(self.remove_task)
        self.ui.taskEdit.textChanged.connect(self.validate)
        self.ui.taskList.itemSelectionChanged.connect(self.validate)
        self.validate()

    @Slot()
    def validate(self) -> None:
        text = self.ui.taskEdit.text().strip()
        self.ui.addButton.setEnabled(bool(text))
        self.ui.removeButton.setEnabled(
            self.ui.taskList.currentRow() >= 0
        )

    @Slot()
    def add_task(self) -> None:
        text = self.ui.taskEdit.text().strip()
        if text:
            self.ui.taskList.addItem(text)
            self.ui.taskEdit.clear()

    @Slot()
    def remove_task(self) -> None:
        row = self.ui.taskList.currentRow()
        if row >= 0:
            item = self.ui.taskList.takeItem(row)
            del item
        self.validate()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TasksWindow()
    window.show()
    raise SystemExit(app.exec())
```

Додавання `Прочитати тему` створює один елемент і очищає поле. Enter виконує ту саму дію, що кнопка. Вибір і видалення повертають порожній список; повторне натискання не спричиняє помилки. Перевірте форму при вузькому й широкому вікні, навігацію Tab і запуск із каталогу, де згенерований модуль доступний для імпорту.
