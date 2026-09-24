---
title: "Summary"
description: "Topic 16. MVC and data binding: conclusions and review questions"
sourceHash: "0d01b8a49ad261b6ebab975e736be90c1ad9d711f3fcb865b4190d00729a3f2a"
---

# Summary

## Conclusions

A graphical application with a database is divided into a model, a view, a controller, a service, and a DAO so that each boundary corresponds to a separate reason for change. MVC, MVP, and MVVM describe the direction of dependencies, and FXML by itself does not prove a clean architecture. JavaFX properties combine a value with observation of changes, bindings define the dependent state of a form, and listeners are removed when the form's lifecycle ends. FXMLLoader creates the controller, injects its fields, and calls `initialize`, while a controller factory passes it a service through the constructor. `FilteredList` and `SortedList` are views of a single source, so data is changed in the original `ObservableList`. JDBC queries run in a background `Task`, the result is applied on the FX Application Thread, and buttons are disabled for the duration of the operation. The service validates data independently of the form, the DAO closes resources, and several related changes are performed in one transaction. Rules are tested without JavaFX, integration is tested on a dedicated PostgreSQL schema, and the package is tested on the target OS with no passwords inside.

## Review questions

1. Which layer owns domain validation?
2. When does FXMLLoader inject a controller's fields?
3. Why doesn't bidirectional binding implement Cancel?
4. When is an ObservableList extractor needed?
5. How does a SortedList get the TableView's order?
6. What is allowed inside Task.call?
7. Why doesn't cancel guarantee a rollback?
8. How do you test FXML and a DAO independently of personal data?

## Useful links

- <https://openjfx.io/openjfx-docs/>.
- <https://openjfx.io/javadoc/27/>.
- <https://jdbc.postgresql.org/documentation/>.
- <https://docs.oracle.com/en/java/javase/26/jpackage/>.
