---
title: "Common mistakes"
description: "Topic 13. Data binding and MVVM: Common mistakes"
outline: [2, 3]
sourceHash: "06f6289c3808c00ac433639ffa72199d42a9afbb9bb8215e4680f499192b7acd"
---

# Common mistakes

## Common mistakes

Table 13.1 lists the mistakes that occur most often when working with data binding and MVVM.

Table 13.1. Common data binding and MVVM mistakes {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| a value does not appear or is not updated | an error in `Path`, a field instead of a property, no `INotifyPropertyChanged` | *XAML Binding Failures*, `SetProperty`, `[ObservableProperty]` |
| a new collection item does not appear in the list | `List<T>` instead of `ObservableCollection<T>` | `ObservableCollection<T>` |
| prices appear as `$1,299.00` regardless of the user's regional settings | the elements' `Language` defaults to `en-US` | override the `LanguageProperty` metadata |
| a button with a command does not become enabled after the data changes | `CanExecuteChanged` was not raised | `RaiseCanExecuteChanged`, `[NotifyCanExecuteChangedFor]` |
| an implicit `TextBlock` style in `App.xaml` changes the button text | styles from application resources also apply inside templates | implicit `TextBlock` styles in the window resources |
