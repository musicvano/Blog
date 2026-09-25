---
title: "Practice"
description: "Topic 16. MVC and data binding: worked examples"
outline: [2, 3]
sourceHash: "676a2a770e3fc30dfe49c06fd9e0aeb59751931cc21a1a5f8e27d4cd9178fcf6"
---

# Practice

All examples use the JavaFX 27 and JDK 27 Maven project from the theory part. The classes belong to the demo package; mainClass is changed to the corresponding name. The third example requires pgJDBC 42.7.13, java.sql, and a dedicated PostgreSQL database.

## Example 1. A profile with a draft

The field is bidirectionally bound to a draft, not to the saved profile. Save copies the validated text into committed, and Cancel restores the draft. Thanks to this, canceling has real meaning rather than simply closing the form after a change has already been made.

```java
package demo;

import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.beans.property.SimpleStringProperty;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class ProfileMain extends Application {
    @Override public void start(Stage stage) {
        var committed = new SimpleStringProperty("Ada");
        var draft = new SimpleStringProperty(committed.get());
        TextField name = new TextField();
        name.textProperty().bindBidirectional(draft);
        Label saved = new Label();
        saved.textProperty().bind(committed.concat(" (saved)"));
        Button save = new Button("Save");
        Button cancel = new Button("Cancel");
        save.disableProperty().bind(Bindings.createBooleanBinding(
            () -> draft.get().isBlank(), draft));
        save.setOnAction(event -> committed.set(draft.get().strip()));
        cancel.setOnAction(event -> draft.set(committed.get()));
        stage.setOnHidden(event ->
            name.textProperty().unbindBidirectional(draft));
        stage.setScene(new Scene(new VBox(10, name, saved,
            new HBox(10, save, cancel)), 360, 180));
        stage.setTitle("Profile draft");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

Initially, `Ada (saved)` is visible. Entering Ira does not change this label until Save; Cancel returns Ada. After Save, the label becomes `Ira (saved)`. An empty draft disables Save. In a complex form, the draft contains all fields and errors, not just one string.

## Example 2. Cities and a result counter

A FilteredList keeps its link to the source, and the label depends on its current size. Searching does not create a new ListView on every keystroke. The input cities are immutable, so an extractor is not needed here; adding to source automatically changes the view.

```java
package demo;

import java.util.Locale;
import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.collections.FXCollections;
import javafx.collections.transformation.FilteredList;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class CitiesMain extends Application {
    @Override public void start(Stage stage) {
        var source = FXCollections.observableArrayList(
            "London", "Madrid", "Paris", "Prague");
        var filtered = new FilteredList<>(source, city -> true);
        TextField search = new TextField();
        ListView<String> list = new ListView<>(filtered);
        Label count = new Label();
        count.textProperty().bind(Bindings.size(filtered)
            .asString("Found: %d"));
        search.textProperty().addListener((value, oldText, text) -> {
            String query = text.strip().toLowerCase(Locale.ROOT);
            filtered.setPredicate(city ->
                city.toLowerCase(Locale.ROOT).contains(query));
        });
        stage.setScene(new Scene(new VBox(8, search, list, count),
            380, 300));
        stage.setTitle("City filter");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

The initial counter is 4; the query `p` gives Paris and Prague and a counter of 2. A query with no matches gives 0, and clearing returns

1. Do not modify the source list just to hide rows:

then clearing the search could not restore them.

## Example 3. Two FXML scenes of an attendance log

In a dedicated training PostgreSQL database, create the table:

```sql
CREATE TABLE j16_attendance (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  person varchar(80) NOT NULL CHECK (length(trim(person)) > 0),
  day date NOT NULL,
  UNIQUE(person, day)
);
```

The COURSE\_DB\_URL, COURSE\_DB\_USER, and COURSE\_DB\_PASSWORD variables are configured the same way as in the lecture. For compactness, the two complete FXML layouts are stored as text blocks; in an ordinary project, they are moved to resources/view without changing the controllers. FXMLLoader really does load each scene and inject the fields.

HomeController passes the selected name to a new EditController through its constructor. The field is edited as a draft, and Cancel does not write to the database. Save creates a new date record; a repeated name on the same date is rejected by UNIQUE. All JDBC operations run in a Task, and scene updates happen in its completion handlers.

```java
package demo;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.function.Consumer;
import javafx.application.Application;
import javafx.concurrent.Task;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;

public class AttendanceMain extends Application {
    static final String HOME = """
        <?import javafx.scene.layout.VBox?>
        <?import javafx.scene.control.*?>
        <VBox xmlns:fx="http://javafx.com/fxml" spacing="8">
          <ListView fx:id="list"/>
          <Button text="Reload" onAction="#reload"/>
          <Button text="Add" onAction="#open"/>
          <Label fx:id="status"/>
        </VBox>
        """;
    static final String EDIT = """
        <?import javafx.scene.layout.VBox?>
        <?import javafx.scene.control.*?>
        <VBox xmlns:fx="http://javafx.com/fxml" spacing="8">
          <TextField fx:id="name" promptText="Name"/>
          <TextField fx:id="day" text="2026-09-17"/>
          <Button text="Save" onAction="#save"/>
          <Button text="Cancel" onAction="#cancel"/>
          <Label fx:id="status"/>
        </VBox>
        """;
    record Entry(String person, LocalDate day) {
        @Override public String toString() {
            return person + " / " + day;
        }
    }

    static final class Dao {
        Connection connect() throws SQLException {
            String url = System.getenv("COURSE_DB_URL");
            if (url == null) throw new SQLException("Missing DB URL");
            return DriverManager.getConnection(url,
                System.getenv("COURSE_DB_USER"),
                System.getenv("COURSE_DB_PASSWORD"));
        }

        List<Entry> all() throws SQLException {
            List<Entry> rows = new ArrayList<>();
            try (Connection c = connect();
                 PreparedStatement p = c.prepareStatement(
                    "SELECT person,day FROM j16_attendance "
                        + "ORDER BY day,person")) {
                p.setQueryTimeout(10);
                try (ResultSet r = p.executeQuery()) {
                    while (r.next()) rows.add(new Entry(
                        r.getString(1),
                        r.getObject(2, LocalDate.class)));
                }
            }
            return rows;
        }

        void add(String person, LocalDate day) throws SQLException {
            if (person == null || person.isBlank()
                    || person.length() > 80 || day == null) {
                throw new IllegalArgumentException("Invalid entry");
            }

            try (Connection c = connect();
                 PreparedStatement p = c.prepareStatement(
                    "INSERT INTO j16_attendance(person,day) "
                        + "VALUES (?,?)")) {
                p.setQueryTimeout(10);
                p.setString(1, person.strip());
                p.setObject(2, day);
                p.executeUpdate();
            }
        }
    }

    private Stage stage;
    private boolean busy;
    final Dao dao = new Dao();

    void show(String fxml, Object controller) throws Exception {
        FXMLLoader loader = new FXMLLoader();
        loader.setController(controller);
        Parent root = loader.load(new ByteArrayInputStream(
            fxml.getBytes(StandardCharsets.UTF_8)));
        stage.setScene(new Scene(root, 420, 360));
    }

    void home() {
        try { show(HOME, new HomeController(this)); }
        catch (Exception error) {
            throw new IllegalStateException(error);
        }
    }

    <T> void background(Callable<T> action, Label status,
            Consumer<T> success) {
        if (busy) return;
        busy = true;
        Parent root = stage.getScene().getRoot();
        root.setDisable(true);
        status.setText("Busy");
        Task<T> task = new Task<>() {
            @Override protected T call() throws Exception {
                return action.call();
            }
        };
        task.setOnSucceeded(event -> {
            busy = false;
            root.setDisable(false);
            success.accept(task.getValue());
        });
        task.setOnFailed(event -> {
            busy = false;
            root.setDisable(false);
            status.setText("Operation failed; draft kept");
        });
        task.setOnCancelled(event -> {
            busy = false;
            root.setDisable(false);
            status.setText("Cancelled; reload to verify");
        });
        Thread worker = new Thread(task, "attendance-dao");
        worker.setDaemon(true);
        worker.start();
    }
    @Override public void start(Stage stage) {
        this.stage = stage;
        stage.setTitle("Attendance / FXML");
        stage.setOnCloseRequest(event -> {
            if (busy) event.consume();
        });
        home();
        stage.show();
    }

    public static void main(String[] args) { launch(args); }

    public static final class HomeController {
        private final AttendanceMain app;
        @FXML private ListView<Entry> list;
        @FXML private Label status;
        HomeController(AttendanceMain app) { this.app = app; }

        @FXML private void reload() {
            app.background(app.dao::all, status, rows -> {
                list.getItems().setAll(rows);
                status.setText("Loaded: " + rows.size());
            });
        }

        @FXML private void open() throws Exception {
            Entry selected = list.getSelectionModel()
                .getSelectedItem();
            String name = selected == null ? "" : selected.person();
            app.show(EDIT, new EditController(app, name));
        }
    }

    public static final class EditController {
        private final AttendanceMain app;
        private final String initialName;

        @FXML private TextField name;
        @FXML private TextField day;
        @FXML private Label status;
        EditController(AttendanceMain app, String name) {
            this.app = app;
            initialName = name;
        }

        @FXML private void initialize() { name.setText(initialName); }
        @FXML private void cancel() { app.home(); }
        @FXML private void save() {
            try {
                String person = name.getText();
                LocalDate date = LocalDate.parse(day.getText());
                app.background(() -> {
                    app.dao.add(person, date);
                    return person;
                }, status, result ->
                    status.setText("Saved; Cancel to list"));
            } catch (java.time.format.DateTimeParseException error) {
                status.setText("Use ISO date: YYYY-MM-DD");
            }
        }
    }
}
```

Check the sequence: Reload, Add, entering a name and an ISO date, Save, another Reload. Close the form with Cancel and make sure that the number of records has not changed. A repeated date for the same name must produce an error while leaving the draft available for correction. Selecting a row before Add only fills in the name; it does not mean changing the old record.

FXML without fx:controller is deliberately combined with setController here. If you switch to fx:controller, use a controllerFactory to pass dependencies and remove setController. These are two alternative ways of creating one actual controller.
