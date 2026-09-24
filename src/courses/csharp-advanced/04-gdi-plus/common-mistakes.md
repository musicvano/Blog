---
title: "Common mistakes"
description: "Topic 4. GDI+ graphics: Common mistakes"
outline: [2, 3]
sourceHash: "21b82d9031a1c1511abca0a74614202b9c6152ae5d577f510c5cc700135a6861"
---

# Common mistakes

## Common mistakes

Table 4.3 lists the mistakes made most often when working with graphics.

Table 4.3. Common mistakes when working with graphics {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| the drawing disappears after the window is minimized or covered | drawing through `CreateGraphics` in a button handler | store data in fields, draw in `OnPaint`, call `Invalidate()` |
| "trails" of the old drawing remain when resizing | only the new strip of the window is repainted | `ResizeRedraw = true` |
| flicker during animation | the frame is drawn directly on the screen | `DoubleBuffered = true` or `SetStyle(OptimizedDoubleBuffer…)` |
| memory and GDI objects grow, eventually an exception | pens, brushes, and fonts are not released | `using` for everything created with `new` |
| the chart text is upside down | text is drawn after `ScaleTransform(1, -1)` | transform points with `Matrix.TransformPoints` |
| an image file cannot be overwritten | `Image.FromFile` keeps the file open | a copy `new Bitmap(image)` and releasing the original |
| error WFO1000 in a custom control | a property without serialization configuration | the `[DefaultValue]` or `[DesignerSerializationVisibility]` attribute |
