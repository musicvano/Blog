---
title: "Practice"
description: "Topic 14. WPF animation and multimedia: worked examples"
outline: [2, 3]
sourceHash: "4b69ebb21d8df59021da7deee627c94703150c7d214bff6785d07ebcacb5b62c"
---

# Practice

Each example is a *WPF Application* project (.NET 10) created in Visual Studio 2026 or with the `dotnet new wpf` command. The window code is written in the `MainWindow.xaml` and `MainWindow.xaml.cs` files.

## Example 1. Animated infographic

Write an application that shows a bar chart of the number of visitors over five years. After the window opens, the bars "grow" from the bottom in a wave (each next one starts moving 0.15 s later) with deceleration at the end, and the numbers above them simultaneously count from 0 to the value. The *Replay* button repeats the animation.

The numbers above the bars are a custom `CounterText` element derived from `TextBlock`. Its `Value` property is registered as a dependency property, so it can be animated with a `DoubleAnimation`; the callback method converts each new value into text (the `CounterText.cs` file):

```cs
using System.Windows;
using System.Windows.Controls;

namespace Infographic;

// Text that shows a number; Value is a dependency property,
// so it can be animated.
public class CounterText : TextBlock
{
    public static readonly DependencyProperty ValueProperty =
        DependencyProperty.Register(nameof(Value), typeof(double),
            typeof(CounterText), new PropertyMetadata(0.0,
                (d, e) => ((CounterText)d).Text =
                    $"{(double)e.NewValue:N0}"));

    public CounterText() => Text = "0";

    public double Value
    {
        get => (double)GetValue(ValueProperty);
        set => SetValue(ValueProperty, value);
    }
}
```

The markup contains only an empty horizontal panel for the bars and a button:

```xml
<Window x:Class="Infographic.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="Visitors per Year" Width="460" Height="380">
    <DockPanel Margin="12">
        <Button DockPanel.Dock="Bottom" Content="Replay"
                HorizontalAlignment="Left" Padding="12,2"
                Click="Replay_Click"/>
        <StackPanel x:Name="chart" Orientation="Horizontal"
                    VerticalAlignment="Bottom" Margin="0,0,0,10"/>
    </DockPanel>
</Window>
```

The bars and counters are created in code from a data array, and the animations are started with the `BeginAnimation` method with the same duration, an easing function, and a `BeginTime` delay:

```cs
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Infographic;

public partial class MainWindow : Window
{
    private const double ChartHeight = 220;   // the tallest bar
    private readonly (string Year, double Value)[] data =
    [
        ("2021", 1250), ("2022", 2380), ("2023", 1920),
        ("2024", 3470), ("2025", 4010)
    ];
    private readonly List<(Rectangle Bar, CounterText Counter)>
        columns = [];

    public MainWindow()
    {
        InitializeComponent();
        foreach (var (year, _) in data)
        {
            var bar = new Rectangle
            {
                Width = 50, Height = 0, Fill = Brushes.Gray,
                Stroke = Brushes.Black
            };
            var counter = new CounterText
            {
                HorizontalAlignment = HorizontalAlignment.Center
            };
            var column = new StackPanel
            {
                Margin = new Thickness(10, 0, 10, 0),
                VerticalAlignment = VerticalAlignment.Bottom
            };
            column.Children.Add(counter);
            column.Children.Add(bar);
            column.Children.Add(new TextBlock
            {
                Text = year,
                HorizontalAlignment = HorizontalAlignment.Center
            });
            chart.Children.Add(column);
            columns.Add((bar, counter));
        }
        Loaded += (s, e) => Animate();
    }

    private void Animate()
    {
        double max = data.Max(d => d.Value);
        var ease = new CubicEase { EasingMode = EasingMode.EaseOut };
        for (int i = 0; i < data.Length; i++)
        {
            var (bar, counter) = columns[i];
            // Remove the previous animations: the value is 0 again.
            bar.BeginAnimation(HeightProperty, null);
            counter.BeginAnimation(CounterText.ValueProperty, null);
            var duration = TimeSpan.FromSeconds(1);
            var begin = TimeSpan.FromSeconds(0.15 * i);  // the "wave"
            var grow = new DoubleAnimation(0,
                data[i].Value / max * ChartHeight, duration)
            { BeginTime = begin, EasingFunction = ease };
            var count = new DoubleAnimation(0, data[i].Value,
                duration)
            { BeginTime = begin, EasingFunction = ease };
            bar.BeginAnimation(HeightProperty, grow);
            counter.BeginAnimation(CounterText.ValueProperty, count);
        }
    }

    private void Replay_Click(object sender, RoutedEventArgs e) =>
        Animate();
}
```

The `BeginAnimation(property, null)` call at the start of `Animate` removes the previous animations, so on a replay all bars immediately return to zero instead of waiting for their delay with the height from the previous showing. In a test, 0.5 s after the window opened, the first four bars had heights of 63, 104, 63, and 56 units, the counters showed 1,144, 1,893, 1,144, and 1,028, and the fifth bar had not started moving yet. After 2 s the heights were 69, 131, 105, 190, and 220, and the counters showed the exact values 1,250, 2,380, 1,920, 3,470, and 4,010.

## Example 2. The solar system

Write an application in which four planets revolve around the Sun along dashed circular orbits with different periods. The *Pause*/*Resume* button stops and resumes the motion, and a slider changes the speed from 0.25 to 4 times.

Each planet is placed on a separate transparent "arm" canvas the size of the whole scene; rotating the arm with a `RotateTransform` around the center of the scene carries the planet along its orbit. All animations are collected in one storyboard, so the pause and the speed are changed with a single call. The markup:

```xml
<Window x:Class="SolarSystem.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="Solar System" Width="440" Height="520">
    <DockPanel>
        <StackPanel DockPanel.Dock="Bottom" Orientation="Horizontal"
                    Margin="10">
            <Button x:Name="pauseButton" Content="Pause" Width="70"
                    Click="Pause_Click"/>
            <TextBlock Text="Speed" Margin="12,0,6,0"
                       VerticalAlignment="Center"/>
            <Slider x:Name="speedSlider" Width="150" Minimum="0.25"
                    Maximum="4" Value="1" IsSnapToTickEnabled="True"
                    TickFrequency="0.25"
                    ValueChanged="Speed_ValueChanged"/>
            <TextBlock Text="{Binding Value, ElementName=speedSlider,
                              StringFormat={}{0:0.##}x}"
                       Margin="6,0" VerticalAlignment="Center"/>
        </StackPanel>
        <Canvas x:Name="space" Width="400" Height="400"/>
    </DockPanel>
</Window>
```

The `MainWindow.xaml.cs` file:

```cs
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace SolarSystem;

public partial class MainWindow : Window
{
    private const double Center = 200;
    private readonly Storyboard orbits = new();
    private bool paused;

    public MainWindow()
    {
        InitializeComponent();
        AddCircle(space, Center, 18, Brushes.Black);         // the Sun
        AddPlanet("Mercury", 50, 3, 4);
        AddPlanet("Venus", 85, 7.5, 7);
        AddPlanet("Earth", 125, 12, 8);
        AddPlanet("Mars", 170, 22, 6);
        orbits.Freeze();                     // ready, immutable
        Loaded += (s, e) => orbits.Begin(this, isControllable: true);
    }

    // A planet lies on an "arm" – a 400 × 400 canvas that
    // rotates around the center.
    private void AddPlanet(string name, double radius,
        double periodSeconds, double size)
    {
        var orbit = new Ellipse
        {
            Width = 2 * radius, Height = 2 * radius,
            Stroke = Brushes.Gray, StrokeDashArray = [4, 4]
        };
        Canvas.SetLeft(orbit, Center - radius);
        Canvas.SetTop(orbit, Center - radius);
        space.Children.Add(orbit);

        var arm = new Canvas { Width = 400, Height = 400 };
        arm.RenderTransform = new RotateTransform(0, Center, Center);
        AddCircle(arm, Center + radius, size, Brushes.DimGray)
            .ToolTip = name;
        space.Children.Add(arm);

        var turn = new DoubleAnimation(0, 360,
            TimeSpan.FromSeconds(periodSeconds))
        { RepeatBehavior = RepeatBehavior.Forever };
        Storyboard.SetTarget(turn, arm);
        Storyboard.SetTargetProperty(turn, new PropertyPath(
            "(UIElement.RenderTransform).(RotateTransform.Angle)"));
        orbits.Children.Add(turn);
    }

    private static Ellipse AddCircle(Canvas canvas, double x,
        double size, Brush fill)
    {
        var circle = new Ellipse
        {
            Width = 2 * size, Height = 2 * size,
            Fill = fill, Stroke = Brushes.Black
        };
        Canvas.SetLeft(circle, x - size);
        Canvas.SetTop(circle, Center - size);
        canvas.Children.Add(circle);
        return circle;
    }

    private void Pause_Click(object sender, RoutedEventArgs e)
    {
        if (paused) orbits.Resume(this);
        else orbits.Pause(this);
        paused = !paused;
        pauseButton.Content = paused ? "Resume" : "Pause";
    }

    private void Speed_ValueChanged(object sender,
        RoutedPropertyChangedEventArgs<double> e)
    {
        if (IsLoaded) orbits.SetSpeedRatio(this, e.NewValue);
    }
}
```

The storyboard is created in code: `Storyboard.SetTarget` specifies the target object itself (in code this is simpler than registering names), and the path `(UIElement.RenderTransform).(RotateTransform.Angle)` specifies the property of its transform. After it is built, the storyboard is frozen (`Freeze`): it no longer changes. `SetSpeedRatio` and `Pause` work because the storyboard was started with `isControllable: true`. A check: 1 s after startup the arm angles were 122°, 49°, 31°, and 17° (Mercury's 3 s period means a third of a turn); after the speed was changed to 4 and another 1 s passed, they were 250°, 244°, 152°, and 83°; during the pause the angles did not change.

## Example 3. Vocabulary flash cards

Write an application for learning vocabulary. A card shows an English word; a click flips it with an animation (the card shrinks to a vertical line, the text changes to the Spanish translation, and the card unfolds). The *Previous* and *Next* buttons show the neighboring card, which "slides in" from the side. The *Listen* button plays a pronunciation recording from the file `Sounds/<word>.wav`; if there is no recording, the status line shows a message.

The student records the pronunciation files themselves (in their own voice, in WAV format), adds them to the project's `Sounds` folder, and sets *Build Action = Content* and *Copy to Output Directory = Copy if newer* for them. The markup:

```xml
<Window x:Class="FlashCards.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="Flash Cards" Width="420" Height="320">
    <DockPanel Margin="16">
        <TextBlock x:Name="status" DockPanel.Dock="Bottom"
                   Margin="0,8,0,0"/>
        <StackPanel DockPanel.Dock="Bottom" Orientation="Horizontal"
                    HorizontalAlignment="Center">
            <Button Content="Previous" Width="80"
                    Click="Previous_Click"/>
            <Button Content="Listen" Width="80" Margin="8,0"
                    Click="Listen_Click"/>
            <Button Content="Next" Width="80" Click="Next_Click"/>
        </StackPanel>
        <Border x:Name="card" Margin="30,10" BorderBrush="Black"
                BorderThickness="2" CornerRadius="8"
                Background="White"
                RenderTransformOrigin="0.5,0.5" Cursor="Hand"
                MouseLeftButtonUp="Card_Click">
            <Border.RenderTransform>
                <TransformGroup>
                    <ScaleTransform x:Name="cardScale"/>
                    <TranslateTransform x:Name="cardSlide"/>
                </TransformGroup>
            </Border.RenderTransform>
            <TextBlock x:Name="cardText" FontSize="32"
                       HorizontalAlignment="Center"
                       VerticalAlignment="Center"/>
        </Border>
    </DockPanel>
</Window>
```

The card's transform is a group of a scale (for flipping) and a translation (for sliding in from the side), so both animations can run at the same time. The `MainWindow.xaml.cs` file:

```cs
using System.IO;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;

namespace FlashCards;

public record Card(string Word, string Translation);

public partial class MainWindow : Window
{
    private readonly Card[] cards =
    [
        new("apple", "manzana"), new("river", "río"),
        new("window", "ventana"), new("light", "luz")
    ];
    private readonly MediaPlayer player = new();
    private int index;
    private bool showTranslation;

    public MainWindow()
    {
        InitializeComponent();
        player.MediaFailed += (s, e) => status.Text =
            $"No recording: {e.ErrorException.Message}";
        player.MediaOpened += (s, e) => status.Text =
            $"Playing \"{cards[index].Word}\"";
        ShowCard();
    }

    private void ShowCard()
    {
        Card c = cards[index];
        cardText.Text = showTranslation ? c.Translation : c.Word;
        Title = $"Flash Cards ({index + 1} of {cards.Length})";
    }

    // Flipping: the card shrinks to a line, the text
    // changes, and the card unfolds.
    private void Card_Click(object sender, MouseButtonEventArgs e)
    {
        var half = TimeSpan.FromSeconds(0.15);
        var fold = new DoubleAnimation(0, half)
        {
            EasingFunction = new QuadraticEase
            { EasingMode = EasingMode.EaseIn }
        };
        fold.Completed += (s, args) =>
        {
            showTranslation = !showTranslation;
            ShowCard();
            var unfold = new DoubleAnimation(1, half)
            {
                EasingFunction = new QuadraticEase
                { EasingMode = EasingMode.EaseOut }
            };
            cardScale.BeginAnimation(
                ScaleTransform.ScaleXProperty, unfold);
        };
        cardScale.BeginAnimation(ScaleTransform.ScaleXProperty, fold);
    }

    private void Next_Click(object sender, RoutedEventArgs e) =>
        Move(1);
    private void Previous_Click(object sender, RoutedEventArgs e) =>
        Move(-1);

    private void Move(int step)
    {
        index = (index + step + cards.Length) % cards.Length;
        showTranslation = false;
        ShowCard();
        // The new card "slides in" from the side.
        var slide = new DoubleAnimation(step * 300, 0,
            TimeSpan.FromSeconds(0.3))
        { EasingFunction = new CubicEase() };
        cardSlide.BeginAnimation(TranslateTransform.XProperty, slide);
    }

    // The Sounds/<word>.wav file recorded by the student is copied
    // to the output folder (Content, Copy if newer).
    private void Listen_Click(object sender, RoutedEventArgs e)
    {
        string file = Path.Combine(AppContext.BaseDirectory,
            "Sounds", cards[index].Word + ".wav");
        player.Open(new Uri(file));
        player.Play();
    }
}
```

Flipping consists of two 0.15 s animations: the second is started in the `Completed` handler of the first, when the card has zero width and the text change is invisible. The `MediaPlayer` is stored in a class field rather than in a local variable, which the garbage collector could destroy during playback. A check: 0.1 s after a click the card scale was 0.56 and the word "apple" was shown; after 0.5 s the scale was 1 and the translation "manzana" was shown. For the word `apple` with a recording, the status line showed "Playing "apple"", and for the word `river` without a recording, "No recording: Cannot find the media file.".
