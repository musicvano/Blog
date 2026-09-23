---
title: "Підсумки"
description: "Тема 3. Основи Windows Forms: висновки та контрольні питання"
---

# Підсумки

## Висновки

Windows Forms – технологія настільних застосунків для Windows, у якій інтерфейс складається з форм і елементів керування – об’єктів класів, похідних від `Control`. Проєкт `net10.0-windows` містить точку входу `Program.cs` з циклом повідомлень `Application.Run` та часткові класи форм: код програміста у `MainForm.cs` і код конструктора форм у `MainForm.Designer.cs`. Застосунок керується подіями: дії користувача перетворюються на події, а обробники з параметрами `sender` і `e` виконуються в потоці інтерфейсу. Панелі компонування, `Anchor` і `Dock` роблять форму стійкою до зміни розміру та масштабу, `Validating` і `ErrorProvider` допомагають перевіряти введення, а меню, стандартні діалоги, модальні форми, `DataGridView` з `BindingList<T>` і таймер дають змогу створювати повноцінні застосунки для роботи з даними.

## Питання для самоперевірки

1. Які технології настільних застосунків є в .NET? Чим Windows Forms відрізняється від WPF і .NET MAUI?
2. Чому цільовий фреймворк проєкту Windows Forms має вигляд `net10.0-windows`? Для чого властивість `UseWindowsForms`?
3. Що робить метод `Application.Run`? Коли виконуються рядки після нього?
4. Для чого клас форми розділено на файли `MainForm.cs` і `MainForm.Designer.cs`? Чому не можна редагувати `Designer.cs` вручну?
5. Які вікна Visual Studio використовують під час створення форми в конструкторі?
6. Які спільні властивості мають елементи керування? Чим `Enabled = false` відрізняється від `Visible = false`?
7. У якому порядку генеруються події `Load`, `Activated`, `Shown`, `FormClosing`, `FormClosed`?
8. Як скасувати закриття форми?
9. Що таке застосунок, керований подіями? Який шлях проходить клацання мишею до обробника?
10. Що передається в параметрах `sender` і `e` обробника події?
11. Як підключити один обробник до кількох елементів керування?
12. Чим відрізняються властивості `Anchor` і `Dock`?
13. Для чого використовують `TableLayoutPanel`, `FlowLayoutPanel` і `SplitContainer`?
14. Як працюють події `Validating` і `Validated`? Для чого властивість `CausesValidation`?
15. Як показати помилку введення за допомогою `ErrorProvider`?
16. Як задати клавіші швидкого доступу пункту меню та мнемоніку кнопки?
17. Чим модальна форма відрізняється від немодальної? Як передати дані між формами?
18. Для чого `BindingList<T>` і `BindingSource` під час роботи з `DataGridView`?
19. Чому таймер Windows Forms не підходить для точного вимірювання часу?

## Корисні посилання

- Документація Windows Forms: <https://learn.microsoft.com/dotnet/desktop/winforms/>
- Огляд Windows Forms: <https://learn.microsoft.com/dotnet/desktop/winforms/overview/>
- Створення застосунку у Visual Studio: <https://learn.microsoft.com/dotnet/desktop/winforms/get-started/create-app-visual-studio>
- Елементи керування: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/>
- Події: <https://learn.microsoft.com/dotnet/desktop/winforms/forms/events>
- Порядок подій: <https://learn.microsoft.com/dotnet/desktop/winforms/order-of-events-in-windows-forms>
- Компонування: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/layout>
- Перевірка введення: <https://learn.microsoft.com/dotnet/desktop/winforms/input-keyboard/validation>
- Клас `Form`: <https://learn.microsoft.com/dotnet/api/system.windows.forms.form>
- Нове у Windows Forms для .NET 10: <https://learn.microsoft.com/dotnet/desktop/winforms/whats-new/net100>
