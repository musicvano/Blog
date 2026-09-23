---
title: "Практика"
description: "Тема 15. Графічні застосунки JavaFX: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожна програма використовує повний POM і module-info.java з лекції. Помістіть клас у `src/main/java/demo`, змініть mainClass на `demo.fx/demo.TipsMain`, ShoppingMain або ViewerMain відповідно та виконайте `mvn javafx:run`.

## Приклад 1. Калькулятор чайових

Сума рахунку вводиться з точністю до копійки. Slider задає відсоток, Spinner – кількість людей. Чистий метод повертає суму для однієї людини, округлену вгору: сумарний внесок має покривати рахунок. У поясненні слід вказати, що зайва копійка розподілу потребує окремого правила в реальній оплаті.

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
        Button calculate = new Button("Розрахувати");
        calculate.setId("calculate");
        calculate.setDefaultButton(true);
        calculate.setOnAction(event -> {
            try {
                result.setText(share(bill.getText(),
                    (int) Math.round(percent.getValue()),
                    people.getValue()).toPlainString() + " грн");
            } catch (IllegalArgumentException error) {
                result.setText(
                    "Перевірте суму: 0..1000000, до 2 знаків");
            }
        });
        GridPane root = new GridPane();
        root.setPadding(new Insets(16));
        root.setVgap(12);
        root.setHgap(12);
        root.addRow(0, new Label("Рахунок, грн:"), bill);
        root.addRow(1, new Label("Чайові, %:"), percent);
        root.addRow(2, new Label("Людей:"), people);
        root.addRow(3, calculate, result);
        stage.setScene(new Scene(root, 530, 240));
        stage.setTitle("Чайові");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

`100.00`, 10 %, 2 людини дають `55.00 грн`. `100`, 0 %, 3 людини дають `33.34 грн`. Нульовий рахунок дозволений; від’ємна сума або третій десятковий знак відхиляються. Spinner не редагується вручну, тому його значення завжди належить заданому діапазону. Перевірка методу все одно потрібна для викликів поза GUI.

## Приклад 2. Список покупок

Додавання доступне кнопкою та Enter. Порожній текст відхиляється, пробіли по краях прибираються. Видалення без вибору нічого не змінює. У прикладі дублікати дозволені: два однакові рядки можуть представляти дві окремі позиції.

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
        input.setPromptText("Назва покупки");
        Label status = new Label("Список порожній");
        status.setId("status");
        Button add = new Button("Додати");
        add.setId("add");
        Button remove = new Button("Видалити");
        remove.setId("remove");
        Runnable insert = () -> {
            String value = input.getText().strip();
            if (value.isEmpty() || value.length() > 80) {
                status.setText("Назва: від 1 до 80 символів");
                return;
            }
            items.add(value);
            input.clear();
            status.setText("Позицій: " + items.size());
        };
        add.setOnAction(event -> insert.run());
        input.setOnAction(event -> insert.run());
        remove.setOnAction(event -> {
            int index = list.getSelectionModel().getSelectedIndex();
            if (index >= 0) items.remove(index);
            status.setText("Позицій: " + items.size());
        });
        HBox commands = new HBox(8, input, add, remove);
        HBox.setHgrow(input, Priority.ALWAYS);
        VBox root = new VBox(10, commands, list, status);
        root.setPadding(new Insets(16));
        VBox.setVgrow(list, Priority.ALWAYS);
        stage.setScene(new Scene(root, 560, 350));
        stage.setTitle("Покупки");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

Введення ` Хліб ` і `Молоко` дає два рядки та `Позицій: 2`. Після вибору першого й видалення лишається `Молоко`. Тестувати потрібно не лише розмір колекції: перевірте правильність видаленого елемента, очищення поля та Enter. Стан поки що живе в пам’яті; збереження після перезапуску потребує окремого репозиторію з наступної теми.

## Приклад 3. Переглядач текстових файлів

MenuBar містить відкриття та завершення роботи. FileChooser повертає шлях; метод читання перевіряє обмеження й UTF-8. Для навчального прикладу дозволено файл до 256 KiB. Читання локального малого файла виконується синхронно; мережеві шляхи й великі файли слід читати у Task, як у темі 16.

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
            throw new IOException("Файл перевищує 256 KiB");
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
        Label status = new Label("Файл не відкрито");
        MenuItem open = new MenuItem("Відкрити…");
        MenuItem exit = new MenuItem("Вийти");
        FileChooser chooser = new FileChooser();
        chooser.setTitle("Відкрити UTF-8 текст");
        chooser.getExtensionFilters().add(
            new FileChooser.ExtensionFilter("Текст", "*.txt"));
        open.setOnAction(event -> {
            var file = chooser.showOpenDialog(stage);
            if (file == null) return;
            try {
                String loaded = readText(file.toPath());
                text.setText(loaded);
                status.setText(file.getName());
            } catch (IOException error) {
                status.setText("Не вдалося прочитати UTF-8 файл");
            }
        });
        exit.setOnAction(event -> Platform.exit());
        Menu menu = new Menu("Файл");
        menu.getItems().addAll(open, new SeparatorMenuItem(), exit);
        BorderPane root = new BorderPane(text);
        root.setTop(new MenuBar(menu));
        root.setBottom(status);
        stage.setScene(new Scene(root, 650, 420));
        stage.setTitle("Перегляд тексту");
        stage.show();
    }

    public static void main(String[] args) { launch(args); }
}
```

Для файла з двома рядками `Вітаємо!` та `JavaFX` обидва рядки з’являються без зміни перенесень. Скасування діалогу залишає попередній текст. Неприпустима UTF-8 послідовність спричиняє помилку, оскільки decoder не замінює її мовчки. Читання максимум limit+1 байтів обмежує пам’ять навіть тоді, коли розмір файла зміниться під час відкриття.

Усі приклади слід перевірити клавіатурою, при вузькому вікні й на масштабі 100 % та 150 %. Сценарій автоматичного UI-тесту та знімок екрана доповнюють один одного: жоден окремо не доводить доступність і читабельність форми.
