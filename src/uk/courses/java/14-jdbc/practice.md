---
title: "Практика"
description: "Тема 14. Бази даних і JDBC: розібрані приклади"
outline: [2, 3]
---

# Практика

У кожний проєкт додайте повний клас `demo.Db` із лекції та залежність pgJDBC 42.7.13. Налаштуйте окрему навчальну базу PostgreSQL. Перші два приклади читають DB\_URL/DB\_USER/ DB\_PASSWORD; третій показує альтернативну конфігурацію у файлі.

## Приклад 1. Таблиця контактів

Побудувати тимчасову таблицю, додати два контакти, змінити один запис і показати остаточні значення. Імена й телефони передаються параметрами, id має CHECK &gt; 0. Номери демонстраційні; це не контакти реальних осіб.

```java
package demo;

import java.sql.*;

public final class ContactsMain {
    public static void main(String[] args) throws Exception {
        try (Connection connection = Db.open();
             Statement setup = connection.createStatement()) {
            setup.executeUpdate("""
                CREATE TEMP TABLE j14_contacts (
                  id bigint PRIMARY KEY CHECK (id > 0),
                  name text NOT NULL, phone text NOT NULL)
                """);
            String insertSql =
                "INSERT INTO j14_contacts VALUES (?,?,?)";
            try (PreparedStatement insert =
                    connection.prepareStatement(insertSql)) {
                for (int id = 1; id <= 2; id++) {
                    insert.setLong(1, id);
                    insert.setString(2, id == 1 ? "Олена" : "Тарас");
                    insert.setString(3, "+38000000000" + id);
                    insert.executeUpdate();
                }
            }
            try (PreparedStatement update =
                    connection.prepareStatement(
                    "UPDATE j14_contacts SET name=? WHERE id=?")) {
                update.setString(1, "Марія");
                update.setLong(2, 2);
                System.out.println(
                    "Змінено: " + update.executeUpdate());
            }
            try (ResultSet rows = setup.executeQuery(
                    "SELECT id,name FROM j14_contacts ORDER BY id")) {
                while (rows.next()) {
                    System.out.println(rows.getLong(1) + ": " +
                        rows.getString(2));
                }
            }
        }
    }
}
```

```text
Змінено: 1
1: Олена
2: Марія
```

Заміна id у UPDATE на 999 повинна повернути нуль, а не створити новий контакт. Для постійної адресної книги схему створюють міграцією без TEMP, а id генерує сервер. Не переносіть очищення демонстраційних даних у робочу базу.

## Приклад 2. Пошук товарів за ціною

Ціна має точність двох десяткових знаків. Межа пошуку передається BigDecimal; результат матеріалізується у список records до закриття Statement. Нульовий результат – порожній список, а не null і не виняток.

```java
package demo;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class ProductsMain {
    record Product(String name, BigDecimal price) {}

    static List<Product> find(Connection connection, BigDecimal max)
            throws SQLException {
        if (max.signum() < 0) {
            throw new IllegalArgumentException("Negative limit");
        }
        List<Product> result = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(
                "SELECT name,price FROM j14_products " +
                "WHERE price<=? ORDER BY price,name")) {
            query.setBigDecimal(1, max);
            try (ResultSet rows = query.executeQuery()) {
                while (rows.next()) {
                    result.add(new Product(rows.getString(1),
                        rows.getBigDecimal(2)));
                }
            }
        }
        return List.copyOf(result);
    }

    public static void main(String[] args) throws Exception {
        try (Connection connection = Db.open();
             Statement setup = connection.createStatement()) {
            setup.executeUpdate("""
                CREATE TEMP TABLE j14_products (
                  name text NOT NULL,
                  price numeric(12,2) NOT NULL CHECK (price>=0))
                """);
            setup.executeUpdate("""
                INSERT INTO j14_products VALUES
                  ('Чай',45.50),('Кава',72.00),('Какао',63.00)
                """);
            for (Product product : find(connection,
                    new BigDecimal("65.00"))) {
                System.out.println(
                    product.name + ": " + product.price);
            }
            System.out.println("До 1 грн: " +
                find(connection, BigDecimal.ONE).size());
        }
    }
}
```

```text
Чай: 45.50
Какао: 63.00
До 1 грн: 0
```

Десятковий літерал створюють із рядка, а не з double. Для порівняння числової рівності BigDecimal врахуйте різницю між `equals` (включає scale) та `compareTo`. Перевірте межу рівно 63.00, нуль і від’ємне значення.

## Приклад 3. Переказ між рахунками

`db.properties` зберігайте поза Git. Поля `url`, `user`, `password` задають підключення; приклад читає файл UTF-8. Запуск передає шлях першим аргументом. Не друкуйте Properties цілком у разі помилки. Передавання самого шляху безпечніше за пароль у командному рядку, який може потрапити до історії.

Переказ блокує два рахунки в порядку id, перевіряє залишок і переповнення, змінює обидва баланси. У демонстрації таблиця тимчасова; сервіс працює на тому самому Connection.

```java
package demo;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.*;
import java.util.Properties;

public final class TransferMain {
    static void transfer(Connection connection, long amount,
                         boolean fail) throws SQLException {
        if (amount <= 0) throw new IllegalArgumentException("Amount");
        connection.setAutoCommit(false);
        try {
            long[] balances = new long[2];
            int count = 0;
            try (Statement query = connection.createStatement();
                 ResultSet rows = query.executeQuery("""
                     SELECT cents FROM j14_accounts
                     WHERE id IN (1,2) ORDER BY id FOR UPDATE
                     """)) {
                while (rows.next()) {
                    balances[count++] = rows.getLong(1);
                }
            }
            if (count != 2 || balances[0] < amount) {
                throw new IllegalArgumentException(
                    "Insufficient funds");
            }
            long target = Math.addExact(balances[1], amount);
            try (PreparedStatement update =
                    connection.prepareStatement(
                    "UPDATE j14_accounts SET cents=? WHERE id=?")) {
                update.setLong(1, balances[0] - amount);
                update.setInt(2, 1);
                update.executeUpdate();
                if (fail) throw new SQLException("Simulated failure");
                update.setLong(1, target);
                update.setInt(2, 2);
                update.executeUpdate();
            }
            connection.commit();
        } catch (SQLException | RuntimeException error) {
            try { connection.rollback(); }
            catch (SQLException rollback) {
                error.addSuppressed(rollback);
            }
            throw error;
        }
    }

    static String balances(Connection connection)
            throws SQLException {
        try (Statement query = connection.createStatement();
             ResultSet rows = query.executeQuery(
                 "SELECT cents FROM j14_accounts ORDER BY id")) {
            java.util.List<Long> values = new java.util.ArrayList<>();
            while (rows.next()) values.add(rows.getLong(1));
            return values.toString();
        }
    }

    public static void main(String[] args) throws Exception {
        if (args.length != 1) {
            System.err.println("Usage: TransferMain db.properties");
            System.exit(2);
        }
        Properties config = new Properties();
        try (var reader = Files.newBufferedReader(Path.of(args[0]),
                StandardCharsets.UTF_8)) { config.load(reader); }
        try (Connection connection = DriverManager.getConnection(
                config.getProperty("url"), config);
             Statement setup = connection.createStatement()) {
            setup.executeUpdate("""
                CREATE TEMP TABLE j14_accounts (
                  id integer PRIMARY KEY,
                  cents bigint CHECK(cents>=0))
                """);
            setup.executeUpdate(
                "INSERT INTO j14_accounts VALUES (1,10000),(2,5000)");
            try { transfer(connection, 3000, true); }
            catch (SQLException expected) {
                System.out.println("Відкат: " + balances(connection));
            }
            transfer(connection, 3000, false);
            System.out.println("Переказ: " + balances(connection));
        }
    }
}
```

```text
Відкат: [10000, 5000]
Переказ: [7000, 8000]
```

Сума балансів лишається 15000 копійок. Перевірте нульову суму, суму понад залишок, відсутній рахунок і повторний переказ. Для конкурентного тесту використайте звичайну таблицю в ізольованій тестовій схемі: TEMP-таблиці двох з’єднань не є спільним набором даних.
