---
title: "Summary"
description: "Topic 14. Databases and JDBC: conclusions and review questions"
sourceHash: "13d2ef1c197153cc5e489695b2c5a57c0a0b6348b054df4d9515d7a6cbef9f13"
---

# Summary

## Conclusions

JDBC gives explicit control over resources, SQL, and transactions. Parameterized queries separate data from syntax, a DAO separates persistence from the UI, and a short transaction protects a compound domain action. The following topics will use these contracts in JavaFX without moving SQL into a button handler.

## Self-check questions

1. Why doesn't PreparedStatement parameterize a table name?
2. How does JDBC distinguish NULL from a numeric zero?
3. Why is max(id) unsuitable for obtaining your own key?
4. What happens to a PostgreSQL transaction after an SQL error?
5. Who should manage commit if an operation uses two DAOs?
6. Why are batch and transaction different concepts?
