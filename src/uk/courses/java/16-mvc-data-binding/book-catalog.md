---
title: "Облік книг у PostgreSQL"
description: "Тема 16. MVC і прив’язка даних: Облік книг у PostgreSQL"
outline: [2, 3]
---

# Облік книг у PostgreSQL

## Приклад 4. Облік книг у PostgreSQL

Наступний повний приклад використовує окрему навчальну таблицю j16\_books. Перед запуском у виділеній базі виконайте SQL; обліковий запис повинен мати права лише на потрібні операції. URL, користувач і пароль передаються змінними середовища COURSE\_DB\_URL, COURSE\_DB\_USER, COURSE\_DB\_PASSWORD і не друкуються.

```sql
CREATE TABLE j16_books (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title varchar(100) NOT NULL CHECK (length(trim(title)) > 0),
  year integer NOT NULL CHECK (year BETWEEN 1450 AND 2100)
);
```

DAO закриває Connection, Statement і ResultSet у кожній операції. Service перевіряє дані незалежно від форми. Один Task виконує одну операцію; після зміни користувач окремо натискає Reload. Це навмисно відокремлює успішний запис від можливого збою наступного читання. Кнопки Save і Delete потребують вибраного id.

```java
package demo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Consumer;
import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.collections.FXCollections;
import javafx.concurrent.Task;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class BookMain extends Application {
    record Book(long id, String title, int year) {
        @Override public String toString() {
            return id + ": " + title + " (" + year + ")";
        }
    }

    interface Repository {
        List<Book> all() throws SQLException;
        void save(long id, String title, int year)
            throws SQLException;
        void delete(long id) throws SQLException;
    }

    static final class JdbcRepository implements Repository {
        Connection connect() throws SQLException {
            String url = System.getenv("COURSE_DB_URL");
            if (url == null) throw new SQLException("Missing DB URL");
            return DriverManager.getConnection(url,
                System.getenv("COURSE_DB_USER"),
                System.getenv("COURSE_DB_PASSWORD"));
        }

        public List<Book> all() throws SQLException {
            List<Book> rows = new ArrayList<>();
            try (Connection c = connect();
                 PreparedStatement p = c.prepareStatement(
                    "SELECT id,title,year FROM j16_books "
                        + "ORDER BY id")) {
                p.setQueryTimeout(10);
                try (ResultSet r = p.executeQuery()) {
                    while (r.next()) rows.add(new Book(r.getLong(1),
                        r.getString(2), r.getInt(3)));
                }
            }
            return rows;
        }

        public void save(long id, String title, int year)
                throws SQLException {
            String sql = id == 0
                ? "INSERT INTO j16_books(title,year) VALUES (?,?)"
                : "UPDATE j16_books SET title=?,year=? WHERE id=?";
            try (Connection c = connect();
                 PreparedStatement p = c.prepareStatement(sql)) {
                p.setQueryTimeout(10);
                p.setString(1, title);
                p.setInt(2, year);
                if (id != 0) p.setLong(3, id);
                if (p.executeUpdate() != 1) {
                    throw new SQLException("Unknown book id");
                }
            }
        }

        public void delete(long id) throws SQLException {
            try (Connection c = connect();
                 PreparedStatement p = c.prepareStatement(
                    "DELETE FROM j16_books WHERE id=?")) {
                p.setQueryTimeout(10);
                p.setLong(1, id);
                if (p.executeUpdate() != 1) {
                    throw new SQLException("Unknown book id");
                }
            }
        }
    }

    static final class Service {
        private final Repository repository;
        Service(Repository repository) {
            this.repository = repository;
        }
        List<Book> all() throws SQLException {
            return repository.all();
        }
        void save(long id, String title, int year)
                throws SQLException {
            if (id < 0 || title == null || title.isBlank()
                    || title.length() > 100 || year < 1450
                    || year > 2100) {
                throw new IllegalArgumentException("Invalid book");
            }
            repository.save(id, title.strip(), year);
        }
        void delete(long id) throws SQLException {
            if (id <= 0) {
                throw new IllegalArgumentException("Select book");
            }
            repository.delete(id);
        }
    }

    private final Service service = new Service(new JdbcRepository());
    private final ExecutorService worker =
        Executors.newSingleThreadExecutor(runnable -> {
            Thread thread = new Thread(runnable, "book-dao");
            thread.setDaemon(true);
            return thread;
        });
    private final SimpleBooleanProperty busy =
        new SimpleBooleanProperty(false);
    private final Label status = new Label("Ready");

    <T> void run(Callable<T> action, Consumer<T> success) {
        if (busy.get()) return;
        busy.set(true);
        status.setText("Busy");
        Task<T> task = new Task<>() {
            @Override protected T call() throws Exception {
                return action.call();
            }
        };
        task.setOnSucceeded(event -> {
            busy.set(false);
            success.accept(task.getValue());
        });
        task.setOnFailed(event -> {
            busy.set(false);
            status.setText("Operation failed; draft kept");
        });
        task.setOnCancelled(event -> {
            busy.set(false);
            status.setText("Cancelled; reload to verify DB state");
        });
        worker.execute(task);
    }

    @Override public void start(Stage stage) {
        ListView<Book> list = new ListView<>(
            FXCollections.observableArrayList());
        TextField title = new TextField();
        TextField year = new TextField("2026");
        Button load = new Button("Reload");
        Button add = new Button("Add");
        Button save = new Button("Save selected");
        Button delete = new Button("Delete selected");
        list.disableProperty().bind(busy);
        title.disableProperty().bind(busy);
        year.disableProperty().bind(busy);
        load.disableProperty().bind(busy);
        var invalid = Bindings.createBooleanBinding(
            () -> title.getText().isBlank(), title.textProperty());
        add.disableProperty().bind(busy.or(invalid));
        var absent = list.getSelectionModel()
            .selectedItemProperty().isNull();
        save.disableProperty().bind(busy.or(invalid).or(absent));
        delete.disableProperty().bind(busy.or(absent));
        list.getSelectionModel().selectedItemProperty()
            .addListener((value, oldBook, book) -> {
                if (book != null) {
                    title.setText(book.title());
                    year.setText(Integer.toString(book.year()));
                }
            });
        load.setOnAction(event -> run(service::all, rows -> {
            list.getItems().setAll(rows);
            status.setText("Loaded: " + rows.size());
        }));
        Consumer<Long> write = id -> {
            try {
                String text = title.getText();
                int number = Integer.parseInt(year.getText());
                run(() -> {
                    service.save(id, text, number);
                    return id;
                },
                    result -> status.setText("Saved; press Reload"));
            } catch (NumberFormatException error) {
                status.setText("Year must be an integer");
            }
        };
        add.setOnAction(event -> write.accept(0L));
        save.setOnAction(event -> write.accept(
            list.getSelectionModel().getSelectedItem().id()));
        delete.setOnAction(event -> {
            long id = list.getSelectionModel().getSelectedItem().id();
            run(() -> { service.delete(id); return id; },
                result -> status.setText("Deleted; press Reload"));
        });
        stage.setOnCloseRequest(event -> {
            if (busy.get()) {
                event.consume();
                status.setText("Wait for operation before closing");
            }
        });
        stage.setScene(new Scene(new VBox(8, list, title, year,
            new HBox(8, load, add, save, delete), status), 620, 430));
        stage.setTitle("Books / PostgreSQL");
        stage.show();
    }

    @Override public void stop() { worker.shutdown(); }
    public static void main(String[] args) { launch(args); }
}
```

Після Add напис підтверджує саме запис, а список оновлюється через Reload. Якщо інший користувач видалив вибрану книгу, update/delete повертає не один змінений рядок і сервіс повідомляє про невідомий id. Для конкурентного редагування потрібен version-стовпець і optimistic locking: умова UPDATE має містити id та очікувану версію.

Кілька пов’язаних змін виконують у сервісі в одній транзакції з одним Connection. DAO, який кожного разу відкриває власне з’єднання, не можна без змін використати для такої транзакції: потрібно передавати Connection або окремий transaction context. Цю різницю варто перевірити тестом відкату, а не лише діаграмою.

::: info Знімок екрана
Покажіть навчальну форму з порожньою назвою, недоступною кнопкою Add і поясненням помилки року після перевірки.
:::

Рис. 16.10. Форма та стан перевірки даних {.caption}

::: info Знімок екрана
Запустіть BookMain на навчальній PostgreSQL, додайте синтетичні книги, натисніть Reload і покажіть вибраний рядок.
:::

Рис. 16.11. Облік книг після завантаження {.caption}

::: info Знімок екрана
Оновіть j16\_books у DataGrip після додавання через GUI. Покажіть id, title, year; конфігурацію підключення приховайте.
:::

Рис. 16.12. Підтвердження запису в PostgreSQL {.caption}

::: info Знімок екрана
У тестовому DAO додайте контрольовану затримку й покажіть Busy та заблоковані кнопки. Затримку не включайте до робочого DAO.
:::

Рис. 16.13. Фонове завантаження та недоступні дії {.caption}

## Тести, діагностика та пакування

Правила перевіряють без запуску JavaFX: порожня назва, рік на межі, невідомий id, fake-репозиторій, який кидає SQLException. Інтеграційний тест використовує виділену PostgreSQL-схему й перевіряє generated id, обмеження таблиці, CRUD і rollback пов’язаних змін. Тест не повинен очищувати особисту базу.

UI-перевірки запускають на FX-потоці: зміна властивості, доступність кнопки, фільтр, порядок таблиці, Cancel і закриття. FXML потрібно справді завантажити, бо javac не знаходить помилку fx:id або відсутній resource. LoadException читають разом із вкладеною причиною й номером рядка розмітки.

Якщо `@FXML`-поле null, перевірте fx:id, фактичний контролер, opens пакета та момент звернення. Якщо виникає «Not on FX application thread», знайдіть перехід фонових даних у scene graph. Не обгортайте кожен рядок у runLater навмання: це приховає порядок операцій і може створити чергу застарілих оновлень.

jpackage формує платформний застосунок з runtime; він не перетворює настільну базу на сервер і не повинен вбудовувати пароль у пакет. Конфігурація користувача зберігається поза каталогом встановлення, а ресурси FXML читаються з модуля. Пакет перевіряють на цільовій ОС із чистим профілем, де немає вихідного проєкту, Maven-кешу чи налаштувань IDE.

Консольний режим звіту краще реалізувати окремим launcher, який аналізує –help і параметри до Application.launch. Він використовує той самий сервіс, повертає 0 для успіху, 2 для неправильного вводу й 1 для операційного збою. Звіт не повинен запускати GUI лише заради читання бази.
