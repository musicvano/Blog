---
title: "Summary"
description: "Topic 13. Data binding and MVVM: conclusions and review questions"
sourceHash: "983be966853295efc02438a3faa93db3ef2bdbd7da095ca445dc75bf1e9de056"
---

# Summary

## Conclusions

Data binding, styles, and templates separate the look from the data. In the MVVM pattern, the View binds to the properties and commands of the ViewModel, which knows nothing about the interface and is covered by unit tests, while CommunityToolkit.Mvvm removes boilerplate code.

## Self-check questions

1. What are the binding target and source? How is `DataContext` inherited?
2. What happens if a binding path is wrong? How do you find such an error?
3. How do the `OneWay`, `TwoWay`, `OneTime`, and `OneWayToSource` modes differ?
4. How do you implement `INotifyPropertyChanged`? What are `[CallerMemberName]` and `SetProperty` for?
5. How do `StringFormat`, `FallbackValue`, `TargetNullValue`, and a value converter differ?
6. Why is `ObservableCollection<T>` used for lists? What is a `DataTemplate`?
7. How do you sort, filter, and group items with `ICollectionView`?
8. How does `StaticResource` differ from `DynamicResource`? How do you switch the visual theme?
9. What are an implicit style, `BasedOn`, `Trigger`, and `DataTrigger`?
10. What are `ControlTemplate`, `TemplateBinding`, and `ContentPresenter` for?
11. How does `INotifyDataErrorInfo` work, and how do you show a validation error in the interface?
12. What roles do the Model, View, and ViewModel play? What advantages does the MVVM pattern give?
13. What members does `ICommand` consist of? When is `CanExecuteChanged` raised?
14. What do `[ObservableProperty]` and `[RelayCommand]` generate? Why must the class be `partial`?
15. How do you test a ViewModel, and why is it placed in a separate library?

## Useful links

- Data binding: <https://learn.microsoft.com/dotnet/desktop/wpf/data/>
- Binding diagnostics: <https://learn.microsoft.com/visualstudio/xaml-tools/xaml-data-binding-diagnostics>
- MVVM Toolkit: <https://learn.microsoft.com/dotnet/communitytoolkit/mvvm/>
