---
title: "Підсумки"
description: "Тема 14. Анімація та мультимедіа WPF: висновки та контрольні питання"
---

# Підсумки

## Висновки

WPF зберігає дерево візуальних об’єктів і сам перемальовує його, тому анімація зводиться до зміни властивостей залежностей у часі. Базові анімації `DoubleAnimation`, `ColorAnimation`, `ThicknessAnimation`, `PointAnimation` переходять між значеннями `From`, `To`, `By` за `Duration`; параметри `BeginTime`, `AutoReverse`, `RepeatBehavior`, `SpeedRatio` і `FillBehavior` керують часом. Розкадрування `Storyboard` об’єднує анімації й вказує цілі; його запускають тригерами в XAML або методами `Begin`, `Pause`, `Resume`, `Stop` у коді. Функції пом’якшення та ключові кадри роблять рух природним, перетворення `RenderTransform` дозволяють рухати, повертати й масштабувати елементи без перерахунку компонування, а подія `CompositionTarget.Rendering` дає покадрову анімацію для ігор і фізичних моделей. Для мультимедіа WPF має `Image` і `BitmapImage`, `SoundPlayer` для WAV, `MediaPlayer` для звуку без інтерфейсу та `MediaElement` для відео з керуванням у режимі `Manual`; медіафайли копіюються до каталогу програми як *Content*.

## Питання для самоперевірки

1. Чим збережений режим графіки WPF відрізняється від негайного режиму GDI+?
2. Які фігури є у WPF? Як записати шлях міні-мовою розмітки `Path.Data`?
3. Які види перетворень є у WPF? Для чого `RenderTransformOrigin`?
4. Чим `RenderTransform` відрізняється від `LayoutTransform`? Що краще анімувати і чому?
5. Яким умовам має відповідати властивість, щоб її можна було анімувати?
6. Як поводиться анімація, якщо задано лише `To`, лише `By` або жодного значення?
7. Що означають `Duration`, `BeginTime`, `AutoReverse`, `RepeatBehavior`, `SpeedRatio`?
8. Чому після анімації присвоєння властивості в коді може не діяти? Як це виправити?
9. Що таке `Storyboard`? Як записати `TargetProperty` для кута `RotateTransform`?
10. Як запустити розкадрування подією в XAML і тригером властивості в стилі?
11. Як керувати розкадруванням з коду? Для чого параметр `isControllable`?
12. Що таке функції пом’якшення? Чим відрізняються режими `EaseIn`, `EaseOut`, `EaseInOut`?
13. Які види ключових кадрів є? Коли потрібні дискретні кадри?
14. Як працює подія `CompositionTarget.Rendering`? Чому зміщення обчислюють за часом кадру?
15. Які прийоми підвищують продуктивність анімації? Що дає `Freeze()`?
16. Чим відрізняються `SoundPlayer`, `MediaPlayer` і `MediaElement`?
17. Як налаштувати медіафайл у проєкті і чому його не можна додати як ресурс?

## Корисні посилання

- Графіка та мультимедіа WPF: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/>
- Огляд анімації: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/animation-overview>
- Розкадрування: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/storyboards-overview>
- Функції пом’якшення: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/easing-functions>
- Анімація за ключовими кадрами: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/key-frame-animations-overview>
- Перетворення: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/transforms-overview>
- Фігури та малювання: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/shapes-and-basic-drawing-in-wpf-overview>
- Покадрова анімація `CompositionTarget`: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/how-to-render-on-a-per-frame-interval-using-compositiontarget>
- Об’єкти `Freezable`: <https://learn.microsoft.com/dotnet/desktop/wpf/advanced/freezable-objects-overview>
- Мультимедіа у WPF: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/multimedia-overview>
- Керування `MediaElement`: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/how-to-control-a-mediaelement-play-pause-stop-volume-and-speed>
- Blend for Visual Studio: <https://learn.microsoft.com/visualstudio/xaml-tools/creating-a-ui-by-using-blend-for-visual-studio>
