---
title: "Практика"
description: "Тема 12. Бази даних, SQL, SQLAlchemy: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Бібліотека та цілісність позик

Створити таблиці читачів і позик. Кожна позика посилається на наявного читача; дата подається ISO-текстом. Для стислого прикладу назва книги зберігається в позиці, але повний каталог варіанта має окрему таблицю книг. Перевірити відмову для неіснуючого читача й незмінність початкового запису.

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
        db.execute("INSERT INTO readers VALUES(1,?)", ("Олена",))
        db.execute("INSERT INTO loans VALUES(1,1,?,?)",
                   ("Алгоритми", "2026-10-01"))
    try:
        with db:
            db.execute("INSERT INTO loans VALUES(2,99,?,?)",
                       ("Мережі", "2026-10-02"))
    except sqlite3.IntegrityError:
        print("Читача не існує")
    query = """SELECT r.name,l.title,l.due FROM loans l
        JOIN readers r ON r.id=l.reader_id ORDER BY l.id"""
    for row in db.execute(query):
        print(*row)
```

```
Читача не існує
Олена Алгоритми 2026-10-01
```

Видалення читача з позиками також має бути заборонене, якщо не визначено іншу політику. Для історії видач автоматичний каскад може бути небажаним: він знищить пов’язані записи. У власному варіанті обґрунтуйте політику видалення й перевірте її.

## Приклад 2. Звіт продажів і представлення

Зберігати продажі як товар, кількість і ціна одиниці в копійках. Представлення обчислює виручку рядка. Підсумковий запит групує за товаром і показує лише товари з виручкою від 1000 копійок. Навчальні суми цілі, тому похибка двійкового `float` не виникає.

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
                       [("Зошит", 2, 500), ("Зошит", 1, 500),
                        ("Олівець", 1, 300)])
        db.execute("""CREATE VIEW revenue AS
            SELECT product,quantity*cents AS total FROM sales""")
    query = """SELECT product,SUM(total) FROM revenue
        GROUP BY product HAVING SUM(total)>=?
        ORDER BY product"""
    for product, cents in db.execute(query, (1000,)):
        print(product, cents)
```

```
Зошит 1500
```

Представлення не дублює всі результати. Після додавання нового продажу наступний запит бачить актуальні дані. Перевірте порожню таблицю, нульову ціну й заборонену нульову кількість. `SUM` над відсутніми рядками може повертати NULL; для звіту одним числом явно визначте, чи його слід замінити на нуль.

## Приклад 3. Репозиторій товарів через SQLAlchemy

Файл `inventory.py` містить модель і репозиторій. Клієнт коду передає сесію; репозиторій не виконує прихований commit. Тому два додавання можна об’єднати однією транзакцією. Ціна невід’ємна, код унікальний; обмеження діють у базі незалежно від способу створення об’єкта.

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
            raise ValueError("неправильні дані товару")
        item = Product(code=code, cents=cents)
        self.session.add(item)
        return item

    def list_codes(self) -> list[str]:
        query = select(Product.code).order_by(Product.code)
        return list(self.session.scalars(query))
```

Негативну ціну навмисно залишено обмеженню `CHECK`, щоб показати тест помилки бази. У користувацькому сервісі можна додати попередню предметну перевірку зі зручним поясненням. Вона не замінить обмеження в схемі.

Файл `demo_inventory.py` демонструє збереження й читання.

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

Для тестів установіть pytest і SQLAlchemy у середовище проєкту. Наступний `test_inventory.py` повністю ізолює базу кожного тесту. Фікстура закриває сесію, а потім звільняє engine. Ця схема однопотокова; для паралельних потоків база в пам’яті потребує окремого проєктування з’єднань.

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

`python -m pytest -q test_inventory.py` дає `3 passed`. Найважливіша перевірка другого тесту – порожня база після збою: перший допустимий рядок теж не залишився. Виняток виникає під час flush при завершенні транзакції, а не обов’язково під час `repository.add`.
