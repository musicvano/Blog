---
title: "Підсумки"
description: "Тема 13. Прив’язка даних і MVVM: висновки та контрольні питання"
---

# Підсумки

## Висновки

Прив’язка даних, стилі й шаблони відокремлюють вигляд від даних. У патерні MVVM View прив’язується до властивостей і команд ViewModel, який не знає про інтерфейс і тестується модульними тестами, а CommunityToolkit.Mvvm прибирає шаблонний код.

## Питання для самоперевірки

1. Що таке ціль і джерело прив’язки? Як успадковується `DataContext`?
2. Що відбувається, якщо шлях прив’язки помилковий? Як знайти таку помилку?
3. Чим відрізняються режими `OneWay`, `TwoWay`, `OneTime`, `OneWayToSource`?
4. Як реалізувати `INotifyPropertyChanged`? Для чого `[CallerMemberName]` і `SetProperty`?
5. Чим відрізняються `StringFormat`, `FallbackValue`, `TargetNullValue` і конвертер значень?
6. Чому для списків використовують `ObservableCollection<T>`? Що таке `DataTemplate`?
7. Як відсортувати, відфільтрувати й згрупувати елементи за допомогою `ICollectionView`?
8. Чим `StaticResource` відрізняється від `DynamicResource`? Як перемкнути тему оформлення?
9. Що таке неявний стиль, `BasedOn`, `Trigger` і `DataTrigger`?
10. Для чого `ControlTemplate`, `TemplateBinding` і `ContentPresenter`?
11. Як працює `INotifyDataErrorInfo` і як показати помилку валідації в інтерфейсі?
12. Які ролі мають Model, View і ViewModel? Які переваги дає патерн MVVM?
13. З яких членів складається `ICommand`? Коли викликають `CanExecuteChanged`?
14. Що генерують `[ObservableProperty]` і `[RelayCommand]`? Чому клас має бути `partial`?
15. Як протестувати ViewModel і чому його розміщують в окремій бібліотеці?

## Корисні посилання

- Прив’язка даних: <https://learn.microsoft.com/dotnet/desktop/wpf/data/>
- Діагностика прив’язок: <https://learn.microsoft.com/visualstudio/xaml-tools/xaml-data-binding-diagnostics>
- MVVM Toolkit: <https://learn.microsoft.com/dotnet/communitytoolkit/mvvm/>
