---
title: "Покадрова анімація та швидкодія"
description: "Тема 14. Анімація та мультимедіа WPF: Покадрова анімація та швидкодія"
outline: [2, 3]
---

# Покадрова анімація та швидкодія

## Покадрова анімація

Розкадрування добре описують рух, відомий заздалегідь. У грі чи фізичній моделі наступне положення залежить від швидкості, зіткнень і дій користувача, тому його обчислюють у кожному кадрі. Для цього WPF має статичну подію `CompositionTarget.Rendering`, яка виникає перед малюванням кожного кадру, після компонування (<https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/how-to-render-on-a-per-frame-interval-using-compositiontarget>). Правила використання:

- частота кадрів залежить від комп’ютера й навантаження (на тестовому комп’ютері – 60 кадрів за секунду), тому зміщення обчислюють за часом: *x* = *x* + *v* · *dt*, де *dt* – час від попереднього кадру;
- параметр події приводять до `RenderingEventArgs`; його властивість `RenderingTime` – час кадру. Подія може виникнути кілька разів для того самого кадру, тоді `RenderingTime` не змінюється і повторний виклик пропускають;
- подія статична: підписка тримає вікно в пам’яті, тому від неї відписуються під час закриття.

`DispatcherTimer` (тема 5) теж викликає обробник у потоці інтерфейсу, але з власним інтервалом, не синхронізованим з кадрами. Його використовують для рідкісних подій: оновлення годинника, позиції медіафайлу, таймера гри.

### Приклад «М’ячик, що стрибає»

М’ячик падає під дією сили тяжіння, відскакує від підлоги й стін, втрачаючи частину швидкості під час кожного удару, і залишає пунктирний слід (рис. 14.7). Повзунки змінюють прискорення вільного падіння і пружність. Модель не залежить від WPF (файл `Ball.cs`), тому її можна перевірити без вікна:

```cs
namespace BouncingBall;

// Модель м’ячика: центр і швидкість у пікселях (DIP).
public class Ball
{
    public double X { get; set; } = 40;
    public double Y { get; set; } = 40;
    public double VX { get; set; } = 180;    // пікселів за секунду
    public double VY { get; set; }
    public double Radius { get; } = 20;
    public double Gravity { get; set; } = 900;
    public double Elasticity { get; set; } = 0.8;

    // Рух за dt секунд у полі width × height.
    // Повертає true, якщо м’ячик ударився об підлогу.
    public bool Step(double dt, double width, double height)
    {
        VY += Gravity * dt;
        X += VX * dt;
        Y += VY * dt;
        if (X < Radius || X > width - Radius)
        {
            X = Math.Clamp(X, Radius, width - Radius);
            VX = -VX;                        // відбиття від стіни
        }
        if (Y > height - Radius && VY > 0)
        {
            Y = height - Radius;
            VY = -VY * Elasticity;           // втрата енергії
            return true;
        }
        return false;
    }
}
```

Розмітка `MainWindow.xaml`: полотно з пунктирною ламаною сліду та м’ячиком, під ним повзунки:

```xml
<Window x:Class="BouncingBall.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="Bouncing Ball" Width="560" Height="420">
    <DockPanel>
        <StackPanel DockPanel.Dock="Bottom" Orientation="Horizontal"
                    Margin="8">
            <TextBlock Text="Gravity" VerticalAlignment="Center"/>
            <Slider x:Name="gravitySlider" Width="110" Margin="6,0"
                    Minimum="100" Maximum="2000" Value="900"/>
            <TextBlock Text="Elasticity" VerticalAlignment="Center"/>
            <Slider x:Name="elasticitySlider" Width="110" Margin="6,0"
                    Minimum="0.3" Maximum="0.95" Value="0.8"/>
            <Button Content="Throw" Padding="10,2"
                    Click="Throw_Click"/>
        </StackPanel>
        <Canvas x:Name="field" Background="White" ClipToBounds="True">
            <Polyline x:Name="trail" Stroke="Gray"
                      StrokeDashArray="4 3"/>
            <Ellipse x:Name="ballShape" Width="40" Height="40"
                     Fill="DimGray" Stroke="Black"
                     StrokeThickness="2"/>
        </Canvas>
    </DockPanel>
</Window>
```

Обробник `OnRendering` у файлі `MainWindow.xaml.cs` обчислює час від попереднього кадру, просуває модель і переносить її на екран. Обмеження *dt* до 0,05 с потрібне на випадок, коли вікно на мить «зависло» (перетягування, згортання): інакше за один крок м’ячик пролетів би крізь підлогу.

```cs
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace BouncingBall;

public partial class MainWindow : Window
{
    private readonly Ball ball = new();
    private TimeSpan lastTime = TimeSpan.Zero;

    public MainWindow()
    {
        InitializeComponent();
        Loaded += (s, e) =>
            CompositionTarget.Rendering += OnRendering;
        Closed += (s, e) =>
            CompositionTarget.Rendering -= OnRendering;
    }

    private void OnRendering(object? sender, EventArgs e)
    {
        TimeSpan now = ((RenderingEventArgs)e).RenderingTime;
        if (now == lastTime) return;         // цей кадр уже оброблено
        double dt = lastTime == TimeSpan.Zero
            ? 0 : (now - lastTime).TotalSeconds;
        lastTime = now;
        if (field.ActualWidth < 2 * ball.Radius) return;

        ball.Gravity = gravitySlider.Value;
        ball.Elasticity = elasticitySlider.Value;
        dt = Math.Min(dt, 0.05);             // після затримки вікна
        ball.Step(dt, field.ActualWidth, field.ActualHeight);
        Draw();
    }

    private void Draw()
    {
        Canvas.SetLeft(ballShape, ball.X - ball.Radius);
        Canvas.SetTop(ballShape, ball.Y - ball.Radius);
        trail.Points.Add(new Point(ball.X, ball.Y));
        if (trail.Points.Count > 150) trail.Points.RemoveAt(0);
    }

    private void Throw_Click(object sender, RoutedEventArgs e)
    {
        (ball.X, ball.Y, ball.VX, ball.VY) = (40, 40, 180, 0);
        trail.Points.Clear();
    }
}
```

Модель перевірено окремо з кроком 1/60 с у полі 544 × 343 (розмір полотна у вікні):

```
Удар 1: t = 0,80 с, x = 184, швидкість угору 576
Удар 2: t = 2,07 с, x = 412, швидкість угору 451
Удар 3: t = 3,07 с, x = 458, швидкість угору 359
Удар 4: t = 3,85 с, x = 317, швидкість угору 277
```

Після кожного удару швидкість зменшується в 0,8 раза, тому відскоки стають нижчими й частішими; між третім і четвертим ударом м’ячик відбився від правої стіни.

![Застосунок «М’ячик, що стрибає»](./images/02-app-bouncing-ball.png)

Рис. 14.7. Застосунок «М’ячик, що стрибає» {.caption}

## Продуктивність анімації

Анімації виконуються в потоці інтерфейсу, тому їх кількість і складність впливають на плавність усього вікна. Основні прийоми:

- **заморожування** об’єктів `Freezable`. Метод `Freeze()` робить пензель, перетворення, геометрію чи зображення незмінним: WPF більше не стежить за його змінами і може використовувати його в кількох потоках (<https://learn.microsoft.com/dotnet/desktop/wpf/advanced/freezable-objects-overview>). Перед викликом перевіряють `CanFreeze`. Готові пензлі `Brushes.Gray` уже заморожені;
- анімувати **перетворення** (`RenderTransform`) і `Opacity`, а не `Width`, `Margin` чи `LayoutTransform`, які змушують перераховувати компонування;
- `CacheMode="BitmapCache"` для складного елемента, який лише рухається, повертається або змінює прозорість: WPF малює його один раз у растрове зображення, а далі переміщує готовий растр (<https://learn.microsoft.com/dotnet/api/system.windows.media.bitmapcache>). Під час масштабування растр розмивається;
- `Timeline.DesiredFrameRate` – бажана частота кадрів кореневої часової шкали (`<Storyboard Timeline.DesiredFrameRate="30">`) для повільних фонових анімацій (<https://learn.microsoft.com/dotnet/api/system.windows.media.animation.timeline.desiredframerate>);
- приєднані властивості `RenderOptions`: `RenderOptions.BitmapScalingMode="NearestNeighbor"` (швидке масштабування зображень без згладжування, чіткі пікселі) і `RenderOptions.EdgeMode="Aliased"` (фігури без згладжування країв) (<https://learn.microsoft.com/dotnet/api/system.windows.media.renderoptions>);

```cs
var brush = new SolidColorBrush(Colors.Gray);
if (brush.CanFreeze) brush.Freeze();
brush.Color = Colors.Black;       // InvalidOperationException
```

Спроба змінити заморожений пензель завершилася винятком *Cannot set a property on object '#FF808080' because it is in a read-only state*, а спроба анімувати його – *Cannot animate the 'Color' property on 'System.Windows.Media.SolidColorBrush' because the object is sealed or frozen*. Метод `Clone()` створює незаморожену копію, яку можна змінювати.
