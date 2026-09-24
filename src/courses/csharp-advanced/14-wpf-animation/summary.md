---
title: "Summary"
description: "Topic 14. WPF animation and multimedia: conclusions and review questions"
sourceHash: "772cb1f90c58bd271b91fe9924db56cbd37eb8dc16807957cebc1ef342db197f"
---

# Summary

## Conclusions

WPF keeps a tree of visual objects and redraws it itself, so animation comes down to changing dependency properties over time. The basic `DoubleAnimation`, `ColorAnimation`, `ThicknessAnimation`, and `PointAnimation` animations move between the `From`, `To`, and `By` values over a `Duration`; the `BeginTime`, `AutoReverse`, `RepeatBehavior`, `SpeedRatio`, and `FillBehavior` parameters control timing. A `Storyboard` combines animations and specifies their targets; it is started by triggers in XAML or with the `Begin`, `Pause`, `Resume`, and `Stop` methods in code. Easing functions and keyframes make motion natural, `RenderTransform` transformations let you move, rotate, and scale elements without recalculating the layout, and the `CompositionTarget.Rendering` event provides frame-by-frame animation for games and physical models. For multimedia, WPF has `Image` and `BitmapImage`, `SoundPlayer` for WAV, `MediaPlayer` for sound without an interface, and `MediaElement` for video with control in `Manual` mode; media files are copied to the program folder as *Content*.

## Self-check questions

1. How does the WPF retained graphics mode differ from the GDI+ immediate mode?
2. What shapes does WPF have? How do you write a path in the `Path.Data` mini-language?
3. What kinds of transformations does WPF have? What is `RenderTransformOrigin` for?
4. How does `RenderTransform` differ from `LayoutTransform`? Which is better to animate, and why?
5. What conditions must a property meet to be animatable?
6. How does an animation behave if only `To`, only `By`, or no value at all is set?
7. What do `Duration`, `BeginTime`, `AutoReverse`, `RepeatBehavior`, and `SpeedRatio` mean?
8. Why might assigning a property in code have no effect after an animation? How do you fix it?
9. What is a `Storyboard`? How do you write the `TargetProperty` for the angle of a `RotateTransform`?
10. How do you start a storyboard with an event in XAML and with a property trigger in a style?
11. How do you control a storyboard from code? What is the `isControllable` parameter for?
12. What are easing functions? How do the `EaseIn`, `EaseOut`, and `EaseInOut` modes differ?
13. What kinds of keyframes are there? When are discrete frames needed?
14. How does the `CompositionTarget.Rendering` event work? Why is the displacement calculated from the frame time?
15. What techniques improve animation performance? What does `Freeze()` give?
16. How do `SoundPlayer`, `MediaPlayer`, and `MediaElement` differ?
17. How do you set up a media file in a project, and why can't it be added as a resource?

## Useful links

- WPF graphics and multimedia: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/>
- Animation overview: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/animation-overview>
- Storyboards: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/storyboards-overview>
- Easing functions: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/easing-functions>
- Key-frame animation: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/key-frame-animations-overview>
- Transforms: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/transforms-overview>
- Shapes and drawing: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/shapes-and-basic-drawing-in-wpf-overview>
- Frame-by-frame animation with `CompositionTarget`: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/how-to-render-on-a-per-frame-interval-using-compositiontarget>
- `Freezable` objects: <https://learn.microsoft.com/dotnet/desktop/wpf/advanced/freezable-objects-overview>
- Multimedia in WPF: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/multimedia-overview>
- Controlling a `MediaElement`: <https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/how-to-control-a-mediaelement-play-pause-stop-volume-and-speed>
- Blend for Visual Studio: <https://learn.microsoft.com/visualstudio/xaml-tools/creating-a-ui-by-using-blend-for-visual-studio>
