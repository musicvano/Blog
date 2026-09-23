---
title: "Practice"
description: "Topic 12. Databases, SQL, SQLAlchemy: worked examples"
outline: [2, 3]
sourceHash: "9129eae2851d09445552f8a36d2c9055fe5bd26b38c7515ab1c32d2584864cb5"
---

# Practice

## Example 1. A library and loan integrity

Create tables for readers and loans. Each loan references an existing reader; the date is supplied as ISO text. For a compact example, the book title is stored in the loan, but the variant's complete catalog has a separate books table. Test rejection of a nonexistent reader and preservation of the original record.

```py
import sqlite3
from contextlib import closing


with closing(sqlite3.connect(":memory:", autocommit=True)) as db:
    db.execute("PRAGMA foreign_keys=ON")
    db.autocommit = False
    with db:
        db.execute("""CREATE TABLE readers (
            id INTEGER PRIMARY KEY, name TEXT NOT NULL)""")
        db.execute("""CREATE TABLE loans (
            id INTEGER PRIMARY KEY,
            reader_id INTEGER NOT NULL REFERENCES readers(id),
            title TEXT NOT NULL, due TEXT NOT NULL)""")
        db.execute("INSERT INTO readers VALUES(1,?)", ("Olena",))
        db.execute("INSERT INTO loans VALUES(1,1,?,?)",
                   ("Algorithms", "2026-10-01"))
    try:
        with db:
            db.execute("INSERT INTO loans VALUES(2,99,?,?)",
                       ("Networks", "2026-10-02"))
    except sqlite3.IntegrityError:
        print("Reader does not exist")
    query = """SELECT r.name,l.title,l.due FROM loans l
        JOIN readers r ON r.id=l.reader_id ORDER BY l.id"""
    for row in db.execute(query):
        print(*row)
```

```
Reader does not exist
Olena Algorithms 2026-10-01
```

Deleting a reader with loans should also be prohibited unless another policy is defined. Automatic cascading may be undesirable for a loan history: it destroys related records. In your variant, justify the deletion policy and test it.

## Example 2. A sales report and a view

Store sales as a product, quantity, and unit price in kopiykas. A view calculates each row's revenue. The summary query groups by product and shows only products with revenue of at least 1000 kopiykas. The sample amounts are integers, so binary `float` error does not arise.

```py
import sqlite3
from contextlib import closing


with closing(sqlite3.connect(":memory:", autocommit=False)) as db:
    with db:
        db.execute("""CREATE TABLE sales (
            product TEXT NOT NULL,
            quantity INTEGER NOT NULL CHECK(quantity > 0),
            cents INTEGER NOT NULL CHECK(cents >= 0)) STRICT""")
        db.executemany("INSERT INTO sales VALUES(?,?,?)",
                       [("Notebook", 2, 500), ("Notebook", 1, 500),
                        ("Pencil", 1, 300)])
        db.execute("""CREATE VIEW revenue AS
            SELECT product,quantity*cents AS total FROM sales""")
    query = """SELECT product,SUM(total) FROM revenue
        GROUP BY product HAVING SUM(total)>=?
        ORDER BY product"""
    for product, cents in db.execute(query, (1000,)):
        print(product, cents)
```

```
Notebook 1500
```

The view does not duplicate all results. After a new sale is added, the next query sees current data. Test an empty table, a zero price, and a prohibited zero quantity. `SUM` over absent rows can return NULL; for a report consisting of one number, explicitly decide whether to replace it with zero.

## Example 3. A product repository through SQLAlchemy

The `inventory.py` file contains a model and a repository. The calling code supplies the session; the repository performs no hidden commit. Thus, two additions can be combined in one transaction. The price is nonnegative, and the code is unique; constraints apply in the database regardless of how the object is created.

```py
# inventory.py
from sqlalchemy import CheckConstraint, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session
from sqlalchemy.orm import mapped_column


class Base(DeclarativeBase):
    pass


class Product(Base):
    __tablename__ = "products"
    __table_args__ = (CheckConstraint("cents >= 0"),)
    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(unique=True)
    cents: Mapped[int]


class Repository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def add(self, code: str, cents: int) -> Product:
        if not code.strip() or type(cents) is not int:
            raise ValueError("invalid product data")
        item = Product(code=code, cents=cents)
        self.session.add(item)
        return item

    def list_codes(self) -> list[str]:
        query = select(Product.code).order_by(Product.code)
        return list(self.session.scalars(query))
```

A negative price is intentionally left to the `CHECK` constraint to demonstrate a database-error test. A user-facing service can add preliminary domain validation with a helpful explanation. It does not replace the schema constraint.

The `demo_inventory.py` file demonstrates saving and reading.

```py
# demo_inventory.py
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from inventory import Base, Repository


engine = create_engine("sqlite://",
                       connect_args={"autocommit": False})
Base.metadata.create_all(engine)
with Session(engine) as session:
    repository = Repository(session)
    with session.begin():
        repository.add("B2", 1200)
        repository.add("A1", 500)
    print(", ".join(repository.list_codes()))
engine.dispose()
```

```
A1, B2
```

For the tests, install pytest and SQLAlchemy into the project environment. The following `test_inventory.py` fully isolates each test's database. The fixture closes the session and then disposes of the engine. This setup is single-threaded; for parallel threads, an in-memory database requires a separate connection design.

```py
# test_inventory.py
from collections.abc import Iterator
import pytest
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from inventory import Base, Repository


@pytest.fixture
def session() -> Iterator[Session]:
    engine = create_engine("sqlite://",
                           connect_args={"autocommit": False})
    Base.metadata.create_all(engine)
    try:
        with Session(engine) as value:
            yield value
    finally:
        engine.dispose()


def test_add(session: Session) -> None:
    repository = Repository(session)
    with session.begin():
        repository.add("A1", 500)
    assert repository.list_codes() == ["A1"]


def test_duplicate_rolls_back(session: Session) -> None:
    repository = Repository(session)
    with pytest.raises(IntegrityError):
        with session.begin():
            repository.add("A1", 500)
            repository.add("A1", 800)
    assert repository.list_codes() == []


def test_negative_price(session: Session) -> None:
    repository = Repository(session)
    with pytest.raises(IntegrityError):
        with session.begin():
            repository.add("A1", -1)
    assert repository.list_codes() == []
```

`python -m pytest -q test_inventory.py` gives `3 passed`. The most important check in the second test is the empty database after failure: even the first valid row did not remain. The exception occurs during flush at transaction completion, not necessarily during `repository.add`.
