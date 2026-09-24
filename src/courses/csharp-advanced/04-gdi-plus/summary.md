---
title: "Summary"
description: "Topic 4. GDI+ graphics: conclusions and review questions"
sourceHash: "18d24ecccb41d00785b9924baaec0418e6db2bd616b782138ed27873d69d4fc8"
---

# Summary

## Conclusions

Windows Forms draws graphics with GDI+ through a `Graphics` object, which can be obtained for a window (in the `Paint` event), for a bitmap (`Graphics.FromImage`), and for a printer page (`PrintPage`). The window image is not stored, so the program keeps data in fields, draws everything in `OnPaint`, and calls `Invalidate()` after the data changes. Outlines are drawn with pens, fills with five kinds of brushes, and text with the `DrawString` method, aligned with `StringFormat` and measured with `MeasureString`. Pens, brushes, fonts, and images consume operating system resources and are released with the `using` statement. Coordinate transformations and the `Matrix` class let you draw in a convenient coordinate system, while `GraphicsPath` and `Region` let you build compound shapes, hit-test the mouse, and restrict the drawing area. Animation is based on a timer, and double buffering eliminates flicker. A drawing described as a list of shape objects is easy to edit with the mouse, save as PNG, print, and package as a custom control.

## Self-check questions

1. What is GDI+? Which namespaces contain its classes? On which operating systems does it work?
2. What is the purpose of the `Graphics` class? On which surfaces can it draw?
3. When is the `Paint` event raised? How does a `Paint` handler differ from overriding `OnPaint`?
4. How do the `Invalidate`, `Update`, and `Refresh` methods differ?
5. Why must you not draw through `CreateGraphics` in a button handler?
6. How are the axes of the screen coordinate system oriented? What is the client area?
7. What properties does a `Pen` have? What kinds of brushes are there in GDI+?
8. Why must pens and brushes be released? Which objects must not be released?
9. How do you draw text centered in a rectangle? What is the `MeasureString` method for?
10. How do the `TranslateTransform`, `RotateTransform`, and `ScaleTransform` methods work? Why does their order matter?
11. What is a `GraphicsPath`? How do you check whether the mouse cursor is inside a shape?
12. What is flicker, and how do you eliminate it?
13. How do you save a drawing to a PNG file? How does PNG differ from JPEG?
14. How do you print several pages with `PrintDocument`?
15. How do you create a custom control? What are the `[Category]`, `[Description]`, and `[DefaultValue]` attributes for?

## Useful links

- Windows Forms documentation: <https://learn.microsoft.com/dotnet/desktop/winforms/>
- Graphics and drawing in Windows Forms: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/graphics-and-drawing-in-windows-forms>
- The `Graphics` class: <https://learn.microsoft.com/dotnet/api/system.drawing.graphics>
- Custom painting and drawing on controls: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/custom-painting-drawing>
- Double buffering: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/how-to-reduce-graphics-flicker-with-double-buffering-for-forms-and-controls>
- Coordinate systems and transformations: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/coordinate-systems-and-transformations>
- The `GraphicsPath` class: <https://learn.microsoft.com/dotnet/api/system.drawing.drawing2d.graphicspath>
- The `PrintDocument` class: <https://learn.microsoft.com/dotnet/api/system.drawing.printing.printdocument>
- Custom controls: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/custom>
- `System.Drawing.Common` is Windows-only: <https://learn.microsoft.com/dotnet/core/compatibility/core-libraries/6.0/system-drawing-common-windows-only>
