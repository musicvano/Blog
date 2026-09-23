---
title: "Підсумки"
description: "Тема 4. Графіка GDI+: висновки та контрольні питання"
---

# Підсумки

## Висновки

Windows Forms малює графіку засобами GDI+ через об’єкт `Graphics`, який можна отримати для вікна (у події `Paint`), для растрового зображення (`Graphics.FromImage`) і для сторінки принтера (`PrintPage`). Зображення вікна не зберігається, тому програма зберігає дані в полях, малює все в `OnPaint`, а після зміни даних викликає `Invalidate()`. Контури малюються перами, заливки – пензлями п’яти видів, текст – методом `DrawString` з вирівнюванням `StringFormat` і вимірюванням `MeasureString`. Пера, пензлі, шрифти й зображення займають ресурси операційної системи і звільняються оператором `using`. Перетворення координат і клас `Matrix` дозволяють малювати в зручній системі координат, `GraphicsPath` і `Region` – будувати складені фігури, перевіряти влучання миші та обмежувати область малювання. Анімація будується на таймері, а подвійна буферизація усуває мерехтіння. Малюнок, описаний як список об’єктів-фігур, легко редагувати мишею, зберігати в PNG, друкувати й оформлювати у вигляді власного елемента керування.

## Питання для самоперевірки

1. Що таке GDI+? Які простори імен містять його класи? На яких ОС він працює?
2. Яке призначення класу `Graphics`? На яких поверхнях він може малювати?
3. Коли генерується подія `Paint`? Чим обробник `Paint` відрізняється від перевизначення `OnPaint`?
4. Чим відрізняються методи `Invalidate`, `Update` і `Refresh`?
5. Чому не можна малювати через `CreateGraphics` в обробнику кнопки?
6. Як спрямовані осі екранної системи координат? Що таке клієнтська область?
7. Які властивості має перо `Pen`? Які види пензлів є в GDI+?
8. Чому пера та пензлі потрібно звільняти? Які об’єкти звільняти не можна?
9. Як вивести текст, вирівняний по центру прямокутника? Для чого метод `MeasureString`?
10. Як працюють методи `TranslateTransform`, `RotateTransform`, `ScaleTransform`? Чому важливий їх порядок?
11. Що таке `GraphicsPath`? Як перевірити, чи потрапив курсор миші у фігуру?
12. Що таке мерехтіння і як його усунути?
13. Як зберегти малюнок у файл PNG? Чим PNG відрізняється від JPEG?
14. Як надрукувати кілька сторінок за допомогою `PrintDocument`?
15. Як створити власний елемент керування? Для чого атрибути `[Category]`, `[Description]`, `[DefaultValue]`?

## Корисні посилання

- Документація Windows Forms: <https://learn.microsoft.com/dotnet/desktop/winforms/>
- Графіка та малювання у Windows Forms: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/graphics-and-drawing-in-windows-forms>
- Клас `Graphics`: <https://learn.microsoft.com/dotnet/api/system.drawing.graphics>
- Малювання власних елементів керування: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/custom-painting-drawing>
- Подвійна буферизація: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/how-to-reduce-graphics-flicker-with-double-buffering-for-forms-and-controls>
- Системи координат і перетворення: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/coordinate-systems-and-transformations>
- Клас `GraphicsPath`: <https://learn.microsoft.com/dotnet/api/system.drawing.drawing2d.graphicspath>
- Клас `PrintDocument`: <https://learn.microsoft.com/dotnet/api/system.drawing.printing.printdocument>
- Власні елементи керування: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/custom>
- `System.Drawing.Common` лише для Windows: <https://learn.microsoft.com/dotnet/core/compatibility/core-libraries/6.0/system-drawing-common-windows-only>
