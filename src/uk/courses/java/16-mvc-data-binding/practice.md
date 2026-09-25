---
title: "Практика"
description: "Тема 16. MVC і прив’язка даних: розібрані приклади"
outline: [2, 3]
---

# Практика

Усі приклади використовують Maven-проєкт JavaFX 27 і JDK 27 із теоретичної частини. Класи належать пакету demo; mainClass змінюють на відповідну назву. Для третього прикладу потрібні pgJDBC 42.7.13, java.sql і виділена PostgreSQL-база.

## Приклад 1. Профіль із чернеткою

Поле двонаправлено зв’язане з чернеткою, а не зі збереженим профілем. Save копіює перевірений текст у committed, Cancel відновлює чернетку. Завдяки цьому скасування має справжній зміст, а не просто закриває форму після вже внесеної зміни.

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

Початково видно `Ada (saved)`. Введення Ira не змінює цей напис до Save; Cancel повертає Ada. Після Save напис стає `Ira (saved)`. Порожня чернетка блокує Save. У складній формі чернетка містить усі поля й помилки, а не лише один рядок.

## Приклад 2. Міста й лічильник результатів

FilteredList зберігає зв’язок із джерелом, а напис залежить від його поточного розміру. Пошук не створює новий ListView на кожне натискання. Вхідні міста незмінні, тож extractor тут не потрібний; додавання до source автоматично змінить подання.

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

Початковий лічильник – 4, запит `p` дає Paris і Prague та лічильник 2. Запит, якого немає, дає 0, очищення повертає

1. Не змінюйте вихідний список лише для приховування рядків:

тоді очищення пошуку не могло б їх відновити.

## Приклад 3. Дві FXML-сцени журналу відвідувань

У виділеній навчальній PostgreSQL-базі створіть таблицю:

```sql
CREATE TABLE j16_attendance (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  person varchar(80) NOT NULL CHECK (length(trim(person)) > 0),
  day date NOT NULL,
  UNIQUE(person, day)
);
```

Змінні COURSE\_DB\_URL, COURSE\_DB\_USER, COURSE\_DB\_PASSWORD налаштовують так само, як у лекції. Для компактності дві повні FXML-розмітки зберігаються як text block; у звичайному проєкті їх переносять до resources/view без зміни контролерів. FXMLLoader справді завантажує кожну сцену та впроваджує поля.

HomeController передає вибране ім’я у новий EditController через конструктор. Поле редагується як чернетка, Cancel не пише до БД. Save створює новий запис дати; повтор імені на ту саму дату відхиляє UNIQUE. Усі JDBC-операції виконуються у Task, а оновлення сцени – у його кінцевих обробниках.

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

Перевірте послідовність: Reload, Add, введення імені й ISO-дати, Save, повторний Reload. Закрийте форму через Cancel і переконайтеся, що число записів не змінилося. Повторна дата того самого імені повинна дати помилку, залишивши чернетку доступною для виправлення. Вибір рядка перед Add лише підставляє ім’я, а не означає зміну старого запису.

FXML без fx:controller тут свідомо поєднано з setController. Якщо перейти до fx:controller, використовуйте controllerFactory для передавання залежностей і приберіть setController. Це два альтернативні способи створення одного фактичного контролера.
