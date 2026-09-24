---
title: "Summary"
description: "Topic 14. Databases with Exposed: conclusions and review questions"
sourceHash: "98dc3b4c0965f8f1c2136b1541a5b0de5a1e5a8f8fafcdddfd8caecec0116821"
---

# Summary

## Conclusions

Exposed combines typed Kotlin with the relational model. The quality of a program is determined by keys, explicit transactions, tested queries, and materialization of results. A repository with short JDBC transactions prepares the ground for working with a database in a graphical application.

## Self-check questions

1. How does a Table description differ from a data row?
2. Why must the order of a query be specified explicitly?
3. When is leftJoin needed instead of innerJoin?
4. How does an exception affect a transaction?
5. Why does suspend not make JDBC non-blocking?
6. Which tests reveal a foreign key violation?
