---
title: "Summary"
description: "Topic 15. Model/View and databases: conclusions and review questions"
sourceHash: "6e81c194201e63b089bc4df3f3607f0aa18b2db3fcade0ba868c3acd4358ab72"
---

# Summary

## Conclusions

A model is a contract between the data and the view. Correct roles, indexes, and signals are just as important as the correct number in a cell. A dialog confirms prepared data, a proxy changes its visibility, and a transaction ensures consistent saving. Separating responsibilities lets you test these mechanisms independently.

## Self-check questions

1. How does Model/View differ from storing items in a QTableWidget?
2. Which methods are required for a flat table model?
3. Why does an invalid parent denote the root of a table?
4. How do DisplayRole and EditRole differ?
5. What must happen after a successful setData?
6. What is the order of actions when adding or removing a row?
7. Why is a reset unnecessary when changing a single cell?
8. How do literal and regular expression filters differ?
9. Why is mapToSource needed before removal?
10. Which methods does a custom delegate implement?
11. How does open differ from exec for a dialog?
12. What does QFileDialog return after Cancel?
13. Why does OnManualSubmit not replace a transaction?
14. When is it safe to close and remove an SQL connection?
15. What are the advantages of a repository outside Qt?

## Useful links

- <https://doc.qt.io/qt-6/model-view-programming.html>
- <https://doc.qt.io/qt-6/qsortfilterproxymodel.html>
- <https://doc.qt.io/qt-6/qdialog.html>
- <https://doc.qt.io/qt-6/sql-programming.html>
