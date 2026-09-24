---
title: "Practice"
description: "Topic 15. JavaFX graphical applications: worked examples"
outline: [2, 3]
sourceHash: "f4f52f8f1641ed78dfce3b93fc5ef3cd276aab64045af46d61a512db9d43e789"
---

# Practice

Each program uses the complete POM and module-info.java from the lecture. Put the class in `src/main/java/demo`, change mainClass to `demo.fx/demo.TipsMain`, ShoppingMain, or ViewerMain accordingly, and run `mvn javafx:run`.

## Example 1. A tip calculator

The bill amount is entered with a precision of one cent. A Slider sets the percentage, and a Spinner sets the number of people. A pure method returns the amount per person, rounded up: the total contributed must cover the bill. The explanation should point out that distributing the extra cent requires a separate rule in real payments.

```java
package demo;

import java.math.BigDecimal;
import java.math.RoundingMode;
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

public final class TipsMain extends Application {
    public static BigDecimal share(String input, int percent,
                                   int people) {
        BigDecimal total = new BigDecimal(
            input.strip().replace(',', '.'));
        if (total.signum() < 0 || total.scale() > 2
                || total.compareTo(new BigDecimal("1000000")) > 0
                || percent < 0 || percent > 30
                || people < 1 || people > 20) {
            throw new IllegalArgumentException("Invalid input");
        }
        return total.multiply(BigDecimal.valueOf(100 + percent))
            .divide(BigDecimal.valueOf(100L * people),
                2, RoundingMode.CEILING);
    }

    @Override
    public void start(Stage stage) {
        TextField bill = new TextField("100.00");
        bill.setId("bill");
        Slider percent = new Slider(0, 30, 10);
        percent.setId("percent");
        percent.setMajorTickUnit(10);
        percent.setMinorTickCount(9);
        percent.setSnapToTicks(true);
        percent.setShowTickLabels(true);
        Spinner<Integer> people = new Spinner<>(1, 20, 2);
        people.setId("people");
        Label result = new Label();
        result.setId("result");
        Button calculate = new Button("Calculate");
        calculate.setId("calculate");
        calculate.setDefaultButton(true);
        calculate.setOnAction(event -> {
            try {
                result.setText(share(bill.getText(),
                    (int) Math.round(percent.getValue()),
                    people.getValue()).toPlainString() + " UAH");
            } catch (IllegalArgumentException error) {
                result.setText(
                    "Check the amount: 0..1000000, up to 2 decimals");
            }
        });
        GridPane root = new GridPane();
        root.setPadding(new Insets(16));
        root.setVgap(12);
        root.setHgap(12);
        root.addRow(0, new Label("Bill, UAH:"), bill);
        root.addRow(1, new Label("Tip, %:"), percent);
        root.addRow(2, new Label("People:"), people);
        root.addRow(3, calculate, result);
        stage.setScene(new Scene(root, 530, 240));
        stage.setTitle("Tips");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

`100.00`, 10 %, and 2 people give `55.00 UAH`. `100`, 0 %, and 3 people give `33.34 UAH`. A zero bill is allowed; a negative amount or a third decimal place is rejected. The Spinner is not editable by hand, so its value always belongs to the specified range. The method's validation is still needed for calls from outside the GUI.

## Example 2. A shopping list

Adding is available through the button and through Enter. Empty text is rejected, and leading and trailing spaces are removed. Deleting without a selection changes nothing. In the example, duplicates are allowed: two identical lines can represent two separate items.

```java
package demo;

import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;

public final class ShoppingMain extends Application {
    @Override
    public void start(Stage stage) {
        var items = FXCollections.<String>observableArrayList();
        ListView<String> list = new ListView<>(items);
        list.setId("items");
        TextField input = new TextField();
        input.setId("input");
        input.setPromptText("Item name");
        Label status = new Label("The list is empty");
        status.setId("status");
        Button add = new Button("Add");
        add.setId("add");
        Button remove = new Button("Delete");
        remove.setId("remove");
        Runnable insert = () -> {
            String value = input.getText().strip();
            if (value.isEmpty() || value.length() > 80) {
                status.setText("Name: 1 to 80 characters");
                return;
            }
            items.add(value);
            input.clear();
            status.setText("Items: " + items.size());
        };
        add.setOnAction(event -> insert.run());
        input.setOnAction(event -> insert.run());
        remove.setOnAction(event -> {
            int index = list.getSelectionModel().getSelectedIndex();
            if (index >= 0) items.remove(index);
            status.setText("Items: " + items.size());
        });
        HBox commands = new HBox(8, input, add, remove);
        HBox.setHgrow(input, Priority.ALWAYS);
        VBox root = new VBox(10, commands, list, status);
        root.setPadding(new Insets(16));
        VBox.setVgrow(list, Priority.ALWAYS);
        stage.setScene(new Scene(root, 560, 350));
        stage.setTitle("Shopping");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

Entering ` Bread ` and `Milk` produces two lines and `Items: 2`. After selecting the first one and deleting it, `Milk` remains. Test more than just the size of the collection: check that the correct element was deleted, that the field is cleared, and that Enter works. For now, the state lives in memory; persisting it across restarts requires a separate repository from the next topic.

## Example 3. A text file viewer

The MenuBar contains opening and exiting. FileChooser returns a path; the reading method checks the limit and UTF-8. For the training example, a file of up to 256 KiB is allowed. A small local file is read synchronously; network paths and large files should be read in a Task, as in topic 16.

```java
package demo;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.BorderPane;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

public final class ViewerMain extends Application {
    public static String readText(Path path) throws IOException {
        final int limit = 256 * 1024;
        byte[] bytes;
        try (var input = Files.newInputStream(path)) {
            bytes = input.readNBytes(limit + 1);
        }
        if (bytes.length > limit) {
            throw new IOException("The file exceeds 256 KiB");
        }
        return StandardCharsets.UTF_8.newDecoder()
            .decode(java.nio.ByteBuffer.wrap(bytes)).toString();
    }

    @Override
    public void start(Stage stage) {
        TextArea text = new TextArea();
        text.setEditable(false);
        text.setWrapText(true);
        text.setId("text");
        Label status = new Label("No file open");
        MenuItem open = new MenuItem("Open…");
        MenuItem exit = new MenuItem("Exit");
        FileChooser chooser = new FileChooser();
        chooser.setTitle("Open UTF-8 text");
        chooser.getExtensionFilters().add(
            new FileChooser.ExtensionFilter("Text", "*.txt"));
        open.setOnAction(event -> {
            var file = chooser.showOpenDialog(stage);
            if (file == null) return;
            try {
                String loaded = readText(file.toPath());
                text.setText(loaded);
                status.setText(file.getName());
            } catch (IOException error) {
                status.setText("Could not read the UTF-8 file");
            }
        });
        exit.setOnAction(event -> Platform.exit());
        Menu menu = new Menu("File");
        menu.getItems().addAll(open, new SeparatorMenuItem(), exit);
        BorderPane root = new BorderPane(text);
        root.setTop(new MenuBar(menu));
        root.setBottom(status);
        stage.setScene(new Scene(root, 650, 420));
        stage.setTitle("Text viewer");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

For a file with the two lines `Welcome!` and `JavaFX`, both lines appear with their line breaks unchanged. Canceling the dialog keeps the previous text. An invalid UTF-8 sequence causes an error, because the decoder does not silently replace it. Reading at most limit+1 bytes bounds memory usage even if the file size changes while it is being opened.

All examples should be tested with the keyboard, in a narrow window, and at 100 % and 150 % scaling. An automated UI test scenario and a screenshot complement each other: neither on its own proves that the form is accessible and readable.
