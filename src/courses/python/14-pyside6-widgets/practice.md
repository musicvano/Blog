---
title: "Practice"
description: "Topic 14. GUI applications with PySide6: worked examples"
outline: [2, 3]
sourceHash: "1cab23245e15b56909b08ac92184ed05075956f96e3a7c9539a0f967977daa77"
---

# Practice

## Example 1. A body mass index calculator

Create a form for mass in kilograms and height in meters, and compute `mass / height ** 2` whenever the values change. Show the numeric index and the range it falls into. This is a formula for practice and a widget exercise, not individual medical advice. The field limits are constraints of this exercise.

```py
import sys
from PySide6.QtCore import Slot
from PySide6.QtWidgets import (
    QApplication, QDoubleSpinBox, QFormLayout, QLabel, QWidget,
)


class BmiWindow(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Training BMI calculator")
        self.mass = QDoubleSpinBox()
        self.mass.setRange(1, 300)
        self.mass.setSuffix(" kg")
        self.mass.setValue(70)
        self.height = QDoubleSpinBox()
        self.height.setRange(0.5, 2.5)
        self.height.setSingleStep(0.01)
        self.height.setSuffix(" m")
        self.height.setValue(1.75)
        self.result = QLabel()
        form = QFormLayout(self)
        form.addRow("Mass", self.mass)
        form.addRow("Height", self.height)
        form.addRow("Index", self.result)
        self.mass.valueChanged.connect(self.calculate)
        self.height.valueChanged.connect(self.calculate)
        self.calculate()

    @Slot()
    def calculate(self) -> None:
        value = self.mass.value() / self.height.value() ** 2
        band = "below 18.5" if value < 18.5 else "18.5–25"
        if value >= 25:
            band = "25–30" if value < 30 else "30 and above"
        self.result.setText(f"{value:.2f}; range: {band}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = BmiWindow()
    window.show()
    raise SystemExit(app.exec())
```

For 70 kg and 1.75 m, the form shows `22.86; range: 18.5–25`. A zero height cannot be selected in the field. Because the values come from `QDoubleSpinBox`, there is no need to convert localized text manually. Also check the field limits and the update after changing each of the two parameters.

## Example 2. A stopwatch

Create a stopwatch with start, pause, reset, and laps. Measure time with the monotonic `perf_counter`, and use `QTimer` only to refresh the display. Paused time is not included in the accumulated time. A lap is the difference between the current accumulated time and the time of the previous lap.

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
        self.setWindowTitle("Stopwatch")
        self.accumulated = 0.0
        self.started: float | None = None
        self.last_lap = 0.0
        self.display = QLabel("0.00 s")
        self.laps = QListWidget()
        layout = QVBoxLayout(self)
        layout.addWidget(self.display)
        layout.addWidget(self.laps)
        buttons = QHBoxLayout()
        for title, handler in (
            ("Start/pause", self.toggle),
            ("Lap", self.lap), ("Reset", self.reset),
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
        self.display.setText(f"{self.elapsed():.2f} s")

    @Slot()
    def lap(self) -> None:
        if self.started is None:
            return
        total = self.elapsed()
        duration = total - self.last_lap
        self.last_lap = total
        number = self.laps.count() + 1
        self.laps.addItem(f"{number}: {duration:.2f} s")

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

At the start, `0.00 s` is shown. After a pause, the value does not change; starting again continues accumulating. "Lap" adds nothing while paused. "Reset" stops the timer, clears the laps, and returns to zero. A test compares the time within an allowed tolerance rather than expecting an exact number of timeouts per second. The slot does not contain `sleep`.

## Example 3. A to-do list with Designer

Create a form with a field, a list, and buttons for adding and removing. Do not add empty or whitespace-only tasks. Remove only the selected item; disable the button when nothing is selected. Duplicate names are allowed. Save the XML below as `tasks.ui`; you can also open and modify it in Designer.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ui version="4.0">
 <class>Form</class>
 <widget class="QWidget" name="Form">
  <property name="windowTitle"><string>To-do list</string></property>
  <layout class="QVBoxLayout" name="verticalLayout">
   <item><widget class="QLineEdit" name="taskEdit"/></item>
   <item><widget class="QPushButton" name="addButton">
    <property name="text"><string>Add</string></property>
   </widget></item>
   <item><widget class="QListWidget" name="taskList"/></item>
   <item><widget class="QPushButton" name="removeButton">
    <property name="text"><string>Remove</string></property>
   </widget></item>
  </layout>
 </widget>
 <resources/>
 <connections/>
</ui>
```

In the form's directory, run:

```powershell
uv run pyside6-uic tasks.ui -o ui_tasks.py
```

Save the following program as `tasks_app.py` next to the form and the generated module. After each change to the `.ui` file, regenerate the module; your own logic stays in `TasksWindow`.

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

Adding `Read the topic` creates one item and clears the field. Enter performs the same action as the button. Selecting and removing the item leaves the list empty; clicking again does not cause an error. Check the form in narrow and wide windows, Tab navigation, and running from a directory where the generated module can be imported.
