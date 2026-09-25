---
title: "Practice"
description: "Topic 14. Databases and JDBC: worked examples"
outline: [2, 3]
sourceHash: "6ee3ab49b92232f8a127226c41be8ec01eb3556106c945f70620ec1bfd24bd01"
---

# Practice

Add the complete `demo.Db` class from the lecture and the pgJDBC 42.7.13 dependency to each project. Set up a separate training PostgreSQL database. The first two examples read DB\_URL/DB\_USER/ DB\_PASSWORD; the third shows an alternative configuration in a file.

## Example 1. A contacts table

Build a temporary table, add two contacts, change one record, and show the final values. Names and phone numbers are passed as parameters, and the id has CHECK &gt; 0. The numbers are for demonstration only; they are not the contacts of real people.

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
                    insert.setString(2, id == 1 ? "Olena" : "Taras");
                    insert.setString(3, "+38000000000" + id);
                    insert.executeUpdate();
                }
            }

            try (PreparedStatement update =
                    connection.prepareStatement(
                    "UPDATE j14_contacts SET name=? WHERE id=?")) {
                update.setString(1, "Maria");
                update.setLong(2, 2);
                System.out.println(
                    "Changed: " + update.executeUpdate());
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
Changed: 1
1: Olena
2: Maria
```

Replacing the id in the UPDATE with 999 must return zero, not create a new contact. For a persistent address book, the schema is created with a migration without TEMP, and the server generates the id. Do not carry the cleanup of demo data over into a production database.

## Example 2. Searching products by price

The price has a precision of two decimal places. The search limit is passed as a BigDecimal; the result is materialized into a list of records before the Statement is closed. An empty result is an empty list, not null and not an exception.

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
                  ('Tea',45.50),('Coffee',72.00),('Cocoa',63.00)
                """);
            for (Product product : find(connection,
                    new BigDecimal("65.00"))) {
                System.out.println(
                    product.name + ": " + product.price);
            }
            System.out.println("Up to 1 UAH: " +
                find(connection, BigDecimal.ONE).size());
        }
    }
}
```

```text
Tea: 45.50
Cocoa: 63.00
Up to 1 UAH: 0
```

A decimal literal is created from a string, not from a double. When comparing BigDecimal values for numeric equality, keep in mind the difference between `equals` (which includes the scale) and `compareTo`. Test a limit of exactly 63.00, zero, and a negative value.

## Example 3. A transfer between accounts

Keep `db.properties` outside Git. The `url`, `user`, and `password` fields define the connection; the example reads the file as UTF-8. The launch passes the path as the first argument. Do not print the whole Properties object on an error. Passing just the path is safer than a password on the command line, which can end up in the shell history.

The transfer locks the two accounts in id order, checks the balance and overflow, and changes both balances. In the demonstration, the table is temporary; the service works on the same Connection.

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
                System.out.println("Rollback: " + balances(connection));
            }
            transfer(connection, 3000, false);
            System.out.println("Transfer: " + balances(connection));
        }
    }
}
```

```text
Rollback: [10000, 5000]
Transfer: [7000, 8000]
```

The sum of the balances remains 15000 cents. Test a zero amount, an amount above the balance, a missing account, and a repeated transfer. For a concurrency test, use an ordinary table in an isolated test schema: the TEMP tables of two connections are not a shared data set.
