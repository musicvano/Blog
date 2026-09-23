---
title: "Підсумки"
description: "Тема 15. Кросплатформний .NET MAUI: висновки та контрольні питання"
---

# Підсумки

## Висновки

.NET MAUI дає змогу створювати застосунки для Android, iOS, macOS і Windows з одного проєкту мовою C# і XAML: обробники перетворюють кросплатформні елементи на нативні, а спільний код працює на .NET 10. Розробку зручно вести на *Windows Machine*, а перевіряти в емуляторі Android з апаратною віртуалізацією або на власному телефоні. Сторінки будують з контейнерів компонування, стилів і тем, дані показують через скомпільовані прив’язки `x:DataType` і `CollectionView`, а логіку виносять у ViewModel з CommunityToolkit.Mvvm, які отримують сервіси через контейнер DI у `MauiProgram`. Shell описує вкладки й маршрути та передає параметри між сторінками. Сервіси пристрою (`Preferences`, `Geolocation`, `MediaPicker`, датчики) потребують перевірки підтримки, дозволів і роботи з головним потоком, а дані зберігають у файлах, SQLite або отримують з вебсервісів.

## Питання для самоперевірки

1. Що таке .NET MAUI? Для яких платформ можна створювати застосунки й де їх збирати?
2. Що таке обробник (*handler*)? Як кнопка MAUI відображається на Android і у Windows?
3. Як встановити MAUI у Visual Studio 2026 і за допомогою dotnet CLI?
4. З яких частин складається єдиний проєкт MAUI? Для чого папки `Platforms` і `Resources`?
5. Що робить метод `MauiProgram.CreateMauiApp`? Для чого метод `App.CreateWindow`?
6. Що потрібно для роботи емулятора Android? Як запустити застосунок на власному телефоні?
7. Чим XAML Hot Reload відрізняється від .NET Hot Reload?
8. Якими класами MAUI замінюються `StackPanel`, `TextBox` і `ListBox` з WPF?
9. Як задати різні значення для світлої й темної тем, платформ і типів пристроїв?
10. Що дають скомпільовані прив’язки? Чому `x:DataType` задають і на `DataTemplate`?
11. Як зареєструвати сторінки, ViewModel і сервіси в контейнері DI? Коли обирати `AddTransient`?
12. Які можливості має `CollectionView`? Чому не варто використовувати `ListView` у .NET 10?
13. Як зареєструвати маршрут і перейти на сторінку з параметрами? Як отримати параметри?
14. Як перевірити й запитати дозвіл на геолокацію? Де оголошують дозволи на Android?
15. Як звернутися з емулятора Android до вебсервісу, запущеного на комп’ютері?

## Корисні посилання

- Документація .NET MAUI: <https://learn.microsoft.com/dotnet/maui/>
- Встановлення: <https://learn.microsoft.com/dotnet/maui/get-started/installation>
- Нове в .NET MAUI для .NET 10: <https://learn.microsoft.com/dotnet/maui/whats-new/dotnet-10>
- Навігація Shell: <https://learn.microsoft.com/dotnet/maui/fundamentals/shell/navigation>
- Прив’язка даних: <https://learn.microsoft.com/dotnet/maui/fundamentals/data-binding/>
- Впровадження залежностей: <https://learn.microsoft.com/dotnet/maui/fundamentals/dependency-injection>
- Інтеграція з платформами: <https://learn.microsoft.com/dotnet/maui/platform-integration/>
- Емулятор Android: <https://learn.microsoft.com/dotnet/maui/android/emulator/>
- Локальні бази даних: <https://learn.microsoft.com/dotnet/maui/data-cloud/database-sqlite>
- CommunityToolkit.Maui: <https://learn.microsoft.com/dotnet/communitytoolkit/maui/>
- Політика підтримки .NET MAUI: <https://dotnet.microsoft.com/platform/support/policy/maui>
