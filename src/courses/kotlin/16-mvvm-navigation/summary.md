---
title: "Summary"
description: "Topic 16. MVVM and navigation: conclusions and review questions"
sourceHash: "d5cae4dd3fddf4a02c843e0780252cfaf2cd5447fa6f6aaebcf166e419b4c26a"
---

# Summary

## Conclusions

MVVM makes state and events explicit, navigation manages history, and the repository isolates persistence. Reliability is also determined by behavior on failure: the draft is not lost, the UI does not freeze, cancellation propagates, and success is confirmed after the transaction.

## Self-check questions

1. Why should a ViewModel not know about the NavController?
2. When does collectAsState stop collecting the flow?
3. Why is an id passed in a route instead of the full object?
4. How does a form error differ from a one-time message?
5. What does a fake repository test, and what does it not test?
6. Why is restarting the installed program a separate check?
