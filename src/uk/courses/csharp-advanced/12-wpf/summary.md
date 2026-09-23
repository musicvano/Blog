---
title: "Підсумки"
description: "Тема 12. Основи WPF: висновки та контрольні питання"
---

# Підсумки

## Висновки

WPF – технологія настільних застосунків для Windows, у якій інтерфейс описують розміткою XAML, а поведінку – кодом C#. Елементи XAML перетворюються на об’єкти, атрибути – на властивості й обробники подій, а система малює збережене дерево елементів через DirectX у незалежних від пристрою одиницях. Панелі `Grid`, `StackPanel`, `DockPanel`, `WrapPanel`, `UniformGrid` і `Canvas` розміщують елементи за їхнім бажаним розміром, тому інтерфейс підлаштовується під вікно, шрифт і масштаб. Маршрутизовані події проходять деревом елементів тунелюванням і спливанням, що дає змогу обробляти події групи елементів одним обробником і фільтрувати введення. Властивості залежностей підтримують успадкування, стилі, анімацію, прив’язку даних і пріоритет джерел значення; на них будують власні елементи керування. Команди, ресурси, діалоги, інструменти *Live Visual Tree* і XAML Hot Reload роблять WPF зручною основою для застосунків, у яких далі (тема 13) логіку відокремлюють від інтерфейсу прив’язкою даних і патерном MVVM.

## Питання для самоперевірки

1. Чим WPF відрізняється від Windows Forms? Що означає збережений режим рендерингу?
2. Які збірки й компоненти входять до архітектури WPF? Який із них некерований і чому?
3. Які файли створює шаблон *WPF Application*? Яку роль відіграють `x:Class`, `partial` і `InitializeComponent`?
4. Як елементи й атрибути XAML відповідають об’єктам і властивостям C#? Що таке конвертер типів?
5. Чим логічне дерево відрізняється від візуального?
6. Які можливості дають *Live Visual Tree*, *Live Property Explorer* і XAML Hot Reload?
7. Чим відрізняються розміри `Auto`, число та `*` у `Grid`? Як додати `GridSplitter`?
8. Коли використовують `StackPanel`, `WrapPanel`, `DockPanel`, `UniformGrid` і `Canvas`?
9. Що таке модель вмісту? Чим `ContentControl` відрізняється від `ItemsControl`?
10. Які є стратегії маршрутизації подій? Чим `Source` відрізняється від `OriginalSource`?
11. Як зареєструвати властивість залежності? Чому обгортка не повинна містити логіки?
12. У якому порядку пріоритету визначається значення властивості залежності? Що робить `ClearValue`?
13. Як працюють вбудовані команди, `CommandBinding` і `CanExecute`?
14. Як показати модальне вікно й отримати результат? Для чого `Owner`, `IsDefault` і `IsCancel`?
15. Як увімкнути тему Fluent і чому звернення до `ThemeMode` в коді дає помилку WPF0001?

## Корисні посилання

- Документація WPF: <https://learn.microsoft.com/dotnet/desktop/wpf/>
- Огляд WPF: <https://learn.microsoft.com/dotnet/desktop/wpf/overview/>
- Створення застосунку у Visual Studio: <https://learn.microsoft.com/dotnet/desktop/wpf/get-started/create-app-visual-studio>
- XAML у WPF: <https://learn.microsoft.com/dotnet/desktop/wpf/xaml/>
- Компонування: <https://learn.microsoft.com/dotnet/desktop/wpf/advanced/layout>
- Маршрутизовані події: <https://learn.microsoft.com/dotnet/desktop/wpf/events/routed-events-overview>
- Властивості залежностей: <https://learn.microsoft.com/dotnet/desktop/wpf/properties/dependency-properties-overview>
- Нове у WPF для .NET 10: <https://learn.microsoft.com/dotnet/desktop/wpf/whats-new/net100>
