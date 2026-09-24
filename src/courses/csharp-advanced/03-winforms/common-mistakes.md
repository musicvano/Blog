---
title: "Common mistakes"
description: "Topic 3. Windows Forms fundamentals: Common mistakes"
outline: [2, 3]
sourceHash: "274395862d0b6b6f092d9242d3c719def8ee3096205a6e5b0dd84624417140ef"
---

# Common mistakes

## Common mistakes

Table 3.5 lists the mistakes beginners make most often when creating Windows Forms applications.

Table 3.5. Common mistakes in Windows Forms applications {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| the code of `button1_Click`, `textBox3_TextChanged` handlers is hard to read | the controls were not renamed | change `(Name)` right after placing a control: `convertButton` |
| a compilation error after deleting a handler method | an event subscription remains in `Designer.cs` | clear the event in the *Properties* window (*Reset*) |
| `FormatException` in a button handler | `double.Parse` on a field's text without validation | `TryParse`, `NumericUpDown`, `ErrorProvider` |
| the window "freezes" during calculations | a long-running operation in a handler blocks the message loop | asynchronous `async`/`await` code (Topic 5) |
| a control with `Dock = Fill` covers the menu or status bar | wrong control order (*Z-order*) | *Bring to Front* for the control with `Fill` |
| the *Cancel* button does not close a form with an invalid field | `Validating` with `e.Cancel = true` does not release focus | `CausesValidation = false` for the *Cancel* button |
