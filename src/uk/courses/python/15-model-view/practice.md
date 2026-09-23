---
title: "Практика"
description: "Тема 15. Model/View і бази даних: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Журнал витрат із редактором дати

Створити таблицю навчальних витрат і делегат `QDateEdit` для першого стовпця. Суми в копійках у цьому прикладі фіксовані, категорія редагується текстом. Кнопка експорту зберігає всі рядки у CSV з чітким заголовком; Cancel нічого не робить. Делегат передає результат моделі, а не змінює джерело напряму.

```py
import csv
import sys
from pathlib import Path
from PySide6.QtCore import QAbstractItemModel, QDate, QModelIndex, Qt
from PySide6.QtGui import QStandardItem, QStandardItemModel
from PySide6.QtWidgets import (
    QApplication, QDateEdit, QFileDialog, QLabel, QPushButton,
    QStyleOptionViewItem, QStyledItemDelegate, QTableView,
    QVBoxLayout, QWidget,
)


class DateDelegate(QStyledItemDelegate):
    def createEditor(self, parent: QWidget,
                     option: QStyleOptionViewItem,
                     index: QModelIndex) -> QDateEdit:
        editor = QDateEdit(parent)
        editor.setCalendarPopup(True)
        editor.setDisplayFormat("yyyy-MM-dd")
        return editor

    def setEditorData(self, editor: QDateEdit,
                      index: QModelIndex) -> None:
        date = QDate.fromString(str(index.data()), "yyyy-MM-dd")
        editor.setDate(date)

    def setModelData(self, editor: QDateEdit,
                     model: QAbstractItemModel,
                     index: QModelIndex) -> None:
        value = editor.date().toString("yyyy-MM-dd")
        model.setData(index, value, Qt.ItemDataRole.EditRole)


def export_csv(model: QStandardItemModel, path: Path) -> None:
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["date", "category", "amount_kopecks"])
        for row in range(model.rowCount()):
            writer.writerow([model.index(row, column).data()
                             for column in range(3)])


class ExpensesWindow(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Журнал витрат")
        self.model = QStandardItemModel(0, 3, self)
        self.model.setHorizontalHeaderLabels(
            ["Дата", "Категорія", "Копійки"]
        )
        for date, category, amount in [
            ("2026-09-01", "Транспорт", 4000),
            ("2026-09-02", "Канцелярія", 7500),
        ]:
            items = [QStandardItem(date), QStandardItem(category)]
            number = QStandardItem()
            number.setData(amount, Qt.ItemDataRole.EditRole)
            number.setEditable(False)
            items.append(number)
            self.model.appendRow(items)
        self.view = QTableView()
        self.view.setModel(self.model)
        self.view.setItemDelegateForColumn(0, DateDelegate(self.view))
        self.status = QLabel("Редагуйте дату; суми фіксовані")
        export = QPushButton("Експорт усіх рядків CSV")
        export.clicked.connect(self.export)
        layout = QVBoxLayout(self)
        for widget in (self.view, export, self.status):
            layout.addWidget(widget)

    def export(self) -> None:
        name, _ = QFileDialog.getSaveFileName(
            self, "Експорт", "expenses.csv", "CSV (*.csv)"
        )
        if not name:
            return
        try:
            export_csv(self.model, Path(name))
        except OSError as error:
            self.status.setText(f"Не збережено: {error}")
            return
        self.status.setText("CSV збережено")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = ExpensesWindow()
    window.show()
    raise SystemExit(app.exec())
```

Таблиця спочатку має два рядки й суми 4000 та 7500. Зміна першої дати на 2026-09-03 дає саме цей ISO-запис в експорті. Рядки CSV починаються заголовком `date,category,amount_kopecks`. Перевірте редагування календарем, Cancel під час вибору файла та помилку недоступного каталогу. У повній системі додавання витрат і межі сум перевіряє модель.

## Приклад 2. Дерево категорій

Побудувати `QStandardItemModel` у `QTreeView`. Контекстне меню додає дочірню категорію або видаляє вибране піддерево. Порожня назва і повтор серед дітей одного батька не приймаються. Однакові назви у різних гілках дозволені. Клік на порожньому місці означає додавання до кореня.

```py
import sys
from PySide6.QtCore import QPoint, Qt
from PySide6.QtGui import QStandardItem, QStandardItemModel
from PySide6.QtWidgets import (
    QApplication, QInputDialog, QMenu, QTreeView,
)


class CategoriesWindow(QTreeView):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Дерево категорій")
        self.tree = QStandardItemModel(self)
        self.tree.setHorizontalHeaderLabels(["Категорія"])
        for title in ("Книги", "Техніка"):
            item = QStandardItem(title)
            item.setEditable(False)
            self.tree.appendRow(item)
        self.setModel(self.tree)
        policy = Qt.ContextMenuPolicy.CustomContextMenu
        self.setContextMenuPolicy(policy)
        self.customContextMenuRequested.connect(self.menu)

    def add_child(self, title: str) -> bool:
        title = title.strip()
        if not title:
            return False
        parent = self.tree.itemFromIndex(self.currentIndex())
        if parent is None:
            parent = self.tree.invisibleRootItem()
        if any(parent.child(row).text() == title
               for row in range(parent.rowCount())):
            return False
        item = QStandardItem(title)
        item.setEditable(False)
        parent.appendRow(item)
        self.expand(self.currentIndex())
        return True

    def remove_selected(self) -> None:
        index = self.currentIndex()
        if index.isValid():
            self.tree.removeRow(index.row(), index.parent())

    def menu(self, position: QPoint) -> None:
        self.setCurrentIndex(self.indexAt(position))
        menu = QMenu(self)
        add = menu.addAction("Додати дочірню категорію")
        remove = menu.addAction("Видалити піддерево")
        remove.setEnabled(self.currentIndex().isValid())
        chosen = menu.exec(self.viewport().mapToGlobal(position))
        if chosen == add:
            title, ok = QInputDialog.getText(
                self, "Категорія", "Назва"
            )
            if ok:
                self.add_child(title)
        elif chosen == remove:
            self.remove_selected()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = CategoriesWindow()
    window.show()
    raise SystemExit(app.exec())
```

Оберіть «Книги», додайте «Програмування»: новий рядок має бути дочірнім. Повторне додавання тієї самої назви повертає `False`, дерево не змінюється. Видалення «Книги» прибирає й підкатегорію. У навчальній моделі дані лише в пам’яті; для незворотного видалення збережених даних потрібне підтвердження.

## Приклад 3. Працівники: модель поверх репозиторію

Створити застосунок з SQLite й SQLAlchemy 2, де репозиторій не імпортує Qt. Ім’я унікальне, зарплата – ціла навчальна сума гривень від 0 до 1000000. Власна модель показує кеш записів; додавання виконує транзакцію, а після успіху перезавантажує модель. Cancel у будь-якому діалозі не додає запис.

```powershell
uv add sqlalchemy
```

Тут використано SQLAlchemy Core: `Table` описує стовпці, `select` і `insert` будують параметризовані вирази. `engine.begin()` завершує блок commit або rollback. Цей невеликий репозиторій можна замінити ORM-реалізацією з теми 12, не змінюючи інтерфейс вікна. <https://docs.sqlalchemy.org/en/20/tutorial/dbapi_transactions.html>.

```py
import sys
from pathlib import Path
from sqlalchemy import (
    Column, Integer, MetaData, String, Table, create_engine, select,
)
from sqlalchemy.exc import SQLAlchemyError
from PySide6.QtCore import QAbstractTableModel, QModelIndex, Qt
from PySide6.QtWidgets import (
    QApplication, QInputDialog, QLabel, QPushButton,
    QTableView, QVBoxLayout, QWidget,
)


class Repository:
    def __init__(self, path: Path) -> None:
        self.engine = create_engine("sqlite:///" + path.as_posix())
        metadata = MetaData()
        self.table = Table(
            "employees", metadata,
            Column("id", Integer, primary_key=True),
            Column("name", String, nullable=False, unique=True),
            Column("salary", Integer, nullable=False),
        )
        metadata.create_all(self.engine)

    def all(self) -> list[tuple[int, str, int]]:
        with self.engine.connect() as connection:
            result = connection.execute(
                select(self.table).order_by(self.table.c.id)
            )
            return [tuple(row) for row in result]

    def add(self, name: str, salary: int) -> None:
        name = name.strip()
        if not name or not 0 <= salary <= 1_000_000:
            raise ValueError("Неправильне ім’я або зарплата")
        with self.engine.begin() as connection:
            connection.execute(self.table.insert().values(
                name=name, salary=salary
            ))


class EmployeeModel(QAbstractTableModel):
    def __init__(self, repository: Repository) -> None:
        super().__init__()
        self.repository = repository
        self.rows = repository.all()

    def rowCount(self, parent: QModelIndex = QModelIndex()) -> int:
        return 0 if parent.isValid() else len(self.rows)

    def columnCount(self, parent: QModelIndex = QModelIndex()) -> int:
        return 0 if parent.isValid() else 3

    def data(self, index: QModelIndex, role: int = 0) -> object:
        if index.isValid() and role == Qt.ItemDataRole.DisplayRole:
            return self.rows[index.row()][index.column()]
        return None

    def headerData(self, section: int, orientation: Qt.Orientation,
                   role: int = 0) -> object:
        if role != Qt.ItemDataRole.DisplayRole:
            return None
        if orientation == Qt.Orientation.Horizontal:
            return ("ID", "Ім’я", "Зарплата, грн")[section]
        return section + 1

    def reload(self) -> None:
        rows = self.repository.all()
        self.beginResetModel()
        self.rows = rows
        self.endResetModel()


class EmployeesWindow(QWidget):
    def __init__(self, repository: Repository) -> None:
        super().__init__()
        self.setWindowTitle("Працівники")
        self.repository = repository
        self.model = EmployeeModel(repository)
        view = QTableView()
        view.setModel(self.model)
        add = QPushButton("Додати працівника")
        add.clicked.connect(self.add)
        self.status = QLabel()
        layout = QVBoxLayout(self)
        for widget in (view, add, self.status):
            layout.addWidget(widget)

    def add(self) -> None:
        name, ok = QInputDialog.getText(self, "Працівник", "Ім’я")
        if not ok:
            return
        salary, ok = QInputDialog.getInt(
            self, "Працівник", "Зарплата, грн", 0, 0, 1_000_000
        )
        if not ok:
            return
        try:
            self.repository.add(name, salary)
            self.model.reload()
        except ValueError, SQLAlchemyError:
            self.status.setText("Перевірте поля й унікальність імені")
            return
        self.status.setText("Працівника додано")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    repo = Repository(Path("employees.sqlite").resolve())
    window = EmployeesWindow(repo)
    window.show()
    code = app.exec()
    repo.engine.dispose()
    raise SystemExit(code)
```

Після додавання Анни з 20000 таблиця містить один запис. Повтор імені порушує UNIQUE, транзакція відкочується, модель залишається з одним рядком. Перезапуск показує збережені дані. У моделі `reload` спочатку успішно читає новий список, а лише потім починає reset; помилка читання не залишає незавершену пару begin/end.

Для великих таблиць повний reset після кожного додавання замінюють точним додаванням рядка або сторінками. Для цієї невеликої демонстрації простий reset явно показує межу між збереженням і перечитуванням. Після закриття `dispose` звільняє пул з’єднань SQLAlchemy.
