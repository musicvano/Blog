---
title: "Practice"
description: "Topic 15. Model/View and databases: worked examples"
outline: [2, 3]
sourceHash: "23d32c8d054dd15a07d1d027d241845e1cf48ce22584833059bf741456c5b005"
---

# Practice

## Example 1. An expense log with a date editor

Create a table of sample expenses and a `QDateEdit` delegate for the first column. The amounts in kopiykas are fixed in this example, and the category is edited as text. The export button saves all rows to CSV with a clear header; Cancel does nothing. The delegate passes the result to the model rather than changing the source directly.

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
        self.setWindowTitle("Expense log")
        self.model = QStandardItemModel(0, 3, self)
        self.model.setHorizontalHeaderLabels(
            ["Date", "Category", "Kopiykas"]
        )
        for date, category, amount in [
            ("2026-09-01", "Transport", 4000),
            ("2026-09-02", "Stationery", 7500),
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
        self.status = QLabel("Edit the date; amounts are fixed")
        export = QPushButton("Export all rows to CSV")
        export.clicked.connect(self.export)
        layout = QVBoxLayout(self)
        for widget in (self.view, export, self.status):
            layout.addWidget(widget)

    def export(self) -> None:
        name, _ = QFileDialog.getSaveFileName(
            self, "Export", "expenses.csv", "CSV (*.csv)"
        )
        if not name:
            return
        try:
            export_csv(self.model, Path(name))
        except OSError as error:
            self.status.setText(f"Not saved: {error}")
            return
        self.status.setText("CSV saved")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = ExpensesWindow()
    window.show()
    raise SystemExit(app.exec())
```

The table initially has two rows with amounts of 4000 and 7500. Changing the first date to 2026-09-03 produces exactly this ISO value in the export. The CSV rows begin with the header `date,category,amount_kopecks`. Check editing with the calendar, Cancel while choosing a file, and the error for an inaccessible directory. In a complete system, the model validates added expenses and amount limits.

## Example 2. A category tree

Build a `QStandardItemModel` in a `QTreeView`. A context menu adds a child category or removes the selected subtree. An empty name and a duplicate among the children of the same parent are not accepted. Identical names in different branches are allowed. Clicking on an empty area means adding to the root.

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
        self.setWindowTitle("Category tree")
        self.tree = QStandardItemModel(self)
        self.tree.setHorizontalHeaderLabels(["Category"])
        for title in ("Books", "Electronics"):
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
        add = menu.addAction("Add child category")
        remove = menu.addAction("Remove subtree")
        remove.setEnabled(self.currentIndex().isValid())
        chosen = menu.exec(self.viewport().mapToGlobal(position))
        if chosen == add:
            title, ok = QInputDialog.getText(
                self, "Category", "Name"
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

Select "Books" and add "Programming": the new row must be a child. Adding the same name again returns `False`, and the tree does not change. Removing "Books" also removes the subcategory. In this learning model, the data lives only in memory; irreversibly deleting saved data requires confirmation.

## Example 3. Employees: a model on top of a repository

Create an application with SQLite and SQLAlchemy 2 in which the repository does not import Qt. The name is unique, and the salary is an integer sample amount in hryvnias from 0 to 1000000. A custom model shows a cache of records; adding runs a transaction and, after success, reloads the model. Cancel in any dialog does not add a record.

```powershell
uv add sqlalchemy
```

This example uses SQLAlchemy Core: `Table` describes the columns, and `select` and `insert` build parameterized expressions. `engine.begin()` ends the block with a commit or a rollback. This small repository can be replaced with the ORM implementation from Topic 12 without changing the window's interface. <https://docs.sqlalchemy.org/en/20/tutorial/dbapi_transactions.html>.

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
            raise ValueError("Invalid name or salary")
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
            return ("ID", "Name", "Salary, UAH")[section]
        return section + 1

    def reload(self) -> None:
        rows = self.repository.all()
        self.beginResetModel()
        self.rows = rows
        self.endResetModel()


class EmployeesWindow(QWidget):
    def __init__(self, repository: Repository) -> None:
        super().__init__()
        self.setWindowTitle("Employees")
        self.repository = repository
        self.model = EmployeeModel(repository)
        view = QTableView()
        view.setModel(self.model)
        add = QPushButton("Add employee")
        add.clicked.connect(self.add)
        self.status = QLabel()
        layout = QVBoxLayout(self)
        for widget in (view, add, self.status):
            layout.addWidget(widget)

    def add(self) -> None:
        name, ok = QInputDialog.getText(self, "Employee", "Name")
        if not ok:
            return
        salary, ok = QInputDialog.getInt(
            self, "Employee", "Salary, UAH", 0, 0, 1_000_000
        )
        if not ok:
            return
        try:
            self.repository.add(name, salary)
            self.model.reload()
        except ValueError, SQLAlchemyError:
            self.status.setText("Check the fields and name uniqueness")
            return
        self.status.setText("Employee added")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    repo = Repository(Path("employees.sqlite").resolve())
    window = EmployeesWindow(repo)
    window.show()
    code = app.exec()
    repo.engine.dispose()
    raise SystemExit(code)
```

After adding Anna with 20000, the table contains one record. A duplicate name violates UNIQUE, the transaction is rolled back, and the model keeps its single row. A restart shows the saved data. In the model, `reload` first successfully reads the new list and only then starts the reset; a read error does not leave an unfinished begin/end pair.

For large tables, a full reset after every addition is replaced by precisely inserting a row or by pages. For this small demonstration, a simple reset clearly shows the boundary between saving and rereading. After closing, `dispose` releases the SQLAlchemy connection pool.
