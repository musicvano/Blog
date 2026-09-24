---
title: "Managing books in PostgreSQL"
description: "Topic 16. MVC and data binding: Managing books in PostgreSQL"
outline: [2, 3]
sourceHash: "98eb5c0f65e8d1dbf2bf419ec3bd8a9302be8d8e799a6215d3e9b035d89c2d97"
---

# Managing books in PostgreSQL

## Example 4. Managing books in PostgreSQL

The following complete example uses a separate training table j16\_books. Before running it, execute the SQL in a dedicated database; the account should have rights only for the required operations. The URL, user, and password are passed through the environment variables COURSE\_DB\_URL, COURSE\_DB\_USER, and COURSE\_DB\_PASSWORD and are not printed.

```sql
CREATE TABLE j16_books (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title varchar(100) NOT NULL CHECK (length(trim(title)) > 0),
  year integer NOT NULL CHECK (year BETWEEN 1450 AND 2100)
);
```

The DAO closes the Connection, Statement, and ResultSet in every operation. The Service validates data independently of the form. One Task performs one operation; after a change, the user presses Reload separately. This deliberately separates a successful write from a possible failure of the subsequent read. The Save and Delete buttons require a selected id.

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

After Add, the label confirms the write itself, and the list is refreshed through Reload. If another user has deleted the selected book, update/delete does not return exactly one changed row, and the service reports an unknown id. Concurrent editing requires a version column and optimistic locking: the UPDATE condition must contain the id and the expected version.

Several related changes are performed in the service in one transaction with one Connection. A DAO that opens its own connection every time cannot be used unchanged for such a transaction: you need to pass a Connection or a separate transaction context. This difference is worth verifying with a rollback test, not just with a diagram.

::: info Screenshot
Show the training form with an empty title, a disabled Add button, and an explanation of the year error after validation.
:::

Figure 16.10. The form and the data validation state {.caption}

::: info Screenshot
Run BookMain on the training PostgreSQL, add synthetic books, press Reload, and show the selected row.
:::

Figure 16.11. The book catalog after loading {.caption}

::: info Screenshot
Refresh j16\_books in DataGrip after adding through the GUI. Show id, title, and year; hide the connection configuration.
:::

Figure 16.12. Confirming the record in PostgreSQL {.caption}

::: info Screenshot
In a test DAO, add a controlled delay and show Busy and the disabled buttons. Do not include the delay in the production DAO.
:::

Figure 16.13. Background loading and unavailable actions {.caption}

## Tests, diagnostics, and packaging

Rules are tested without launching JavaFX: an empty title, a year at the boundary, an unknown id, and a fake repository that throws SQLException. An integration test uses a dedicated PostgreSQL schema and checks the generated id, table constraints, CRUD, and rollback of related changes. A test must not wipe a personal database.

UI checks are run on the FX thread: a property change, button availability, the filter, table order, Cancel, and closing. FXML must actually be loaded, because javac does not detect an fx:id error or a missing resource. Read a LoadException together with its nested cause and the markup line number.

If an `@FXML` field is null, check the fx:id, the actual controller, the package's opens, and the moment of access. If you get "Not on FX application thread," find where background data reaches the scene graph. Do not wrap every line in runLater at random: that hides the order of operations and can create a queue of stale updates.

jpackage builds a platform application with a runtime; it does not turn a desktop database into a server and must not embed a password in the package. User configuration is stored outside the installation directory, and FXML resources are read from the module. The package is tested on the target OS with a clean profile, where there is no source project, Maven cache, or IDE settings.

A console report mode is better implemented as a separate launcher that parses –help and the parameters before Application.launch. It uses the same service and returns 0 for success, 2 for invalid input, and 1 for an operational failure. A report should not launch the GUI just to read the database.
