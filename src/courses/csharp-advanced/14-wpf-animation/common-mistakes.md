---
title: "Common mistakes"
description: "Topic 14. WPF animation and multimedia: Common mistakes"
outline: [2, 3]
sourceHash: "12a41c64a993fe4867c57b6876c4e8b72ccbd85268a2f3f58ce02f579465fe27"
---

# Common mistakes

## Common mistakes

Table 14.2 lists the mistakes that occur most often when creating animations and multimedia applications.

Table 14.2. Common mistakes in animation and multimedia work {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| the animation does not compile or has no effect | an ordinary C# property or field is animated | animate a dependency property; register one for your own class |
| a rotation or scale animation has no effect | `RenderTransform` is not set (it holds an immutable identity transform) or the path contains an error | set `<RotateTransform/>` in advance, check `(UIElement.RenderTransform).(…)` |
| after an animation, assigning the property in code is ignored | `FillBehavior="HoldEnd"` holds the value | `BeginAnimation(property, null)` or `FillBehavior="Stop"` and `Completed` |
| *Cannot animate … because the object is sealed or frozen* | the brush or transform is frozen (from a style, `Brushes.Gray`) | assign a new copy `new SolidColorBrush(…)` or `Clone()` |
| `Pause`/`Stop` have no effect on a storyboard | it was started without `isControllable: true` or for a different element | `Begin(this, true)` and the same element in all calls |
| the player buttons do not work | `LoadedBehavior` has the default value `Play` | `LoadedBehavior="Manual"` |
| the media file is not found after the build, `MediaFailed` | the file is not copied or the path is relative | *Content*, *Copy if newer*, a path based on `AppContext.BaseDirectory` |
| the interface "lags" | dozens of `Width`/`Margin` animations, `LayoutTransform` | animate `RenderTransform`, `Opacity`, `BitmapCache`, `Freeze` |
