---
title: "Практика"
description: "Тема 14. Анімація та мультимедіа WPF: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад – проєкт *WPF Application* (.NET 10), створений у Visual Studio 2026 або командою `dotnet new wpf`. Код вікна записують у файли `MainWindow.xaml` і `MainWindow.xaml.cs`.

## Приклад 1. Анімована інфографіка

Написати застосунок, який показує стовпчикову діаграму кількості відвідувачів за п’ять років. Після відкриття вікна стовпчики «виростають» знизу хвилею (кожен наступний починає рух на 0,15 с пізніше) з гальмуванням наприкінці, а числа над ними одночасно лічать від 0 до значення. Кнопка *Replay* повторює анімацію.

Числа над стовпчиками – власний елемент `CounterText`, похідний від `TextBlock`. Його властивість `Value` зареєстровано як властивість залежності, тому її можна анімувати `DoubleAnimation`; метод зворотного виклику перетворює кожне нове значення на текст (файл `CounterText.cs`):

```cs
using System.Windows;
using System.Windows.Controls;

namespace Infographic;

// Текст, що показує число; Value – властивість залежності,
// тому її можна анімувати.
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

Розмітка містить лише порожню горизонтальну панель для стовпчиків і кнопку:

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

Стовпчики та лічильники створюються в коді за масивом даних, а анімації запускаються методом `BeginAnimation` з однаковою тривалістю, функцією пом’якшення і затримкою `BeginTime`:

```cs
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Infographic;

public partial class MainWindow : Window
{
    private const double ChartHeight = 220;   // найвищий стовпчик
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
            // Зняти попередні анімації: значення знову 0.
            bar.BeginAnimation(HeightProperty, null);
            counter.BeginAnimation(CounterText.ValueProperty, null);
            var duration = TimeSpan.FromSeconds(1);
            var begin = TimeSpan.FromSeconds(0.15 * i);  // «хвиля»
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

Виклик `BeginAnimation(властивість, null)` на початку `Animate` знімає попередні анімації, тож під час повтору всі стовпчики одразу повертаються до нуля, а не чекають своєї затримки з висотою попереднього показу. Під час перевірки через 0,5 с після відкриття вікна перші чотири стовпчики мали висоту 63, 104, 63 і 56 одиниць, лічильники показували 1 144, 1 893, 1 144 і 1 028, а п’ятий стовпчик ще не почав рух. Через 2 с висоти дорівнювали 69, 131, 105, 190 і 220, а лічильники – точним значенням 1 250, 2 380, 1 920, 3 470 і 4 010.

## Приклад 2. Сонячна система

Написати застосунок, у якому чотири планети обертаються навколо Сонця пунктирними коловими орбітами з різними періодами. Кнопка *Pause*/*Resume* зупиняє і продовжує рух, повзунок змінює швидкість від 0,25 до 4 разів.

Кожна планета розміщена на окремому прозорому полотні-«плечі» розміром з усю сцену; поворот плеча `RotateTransform` навколо центра сцени переносить планету орбітою. Усі анімації зібрано в одне розкадрування, тому пауза і швидкість змінюються одним викликом. Розмітка:

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

Файл `MainWindow.xaml.cs`:

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
        AddCircle(space, Center, 18, Brushes.Black);         // Сонце
        AddPlanet("Mercury", 50, 3, 4);
        AddPlanet("Venus", 85, 7.5, 7);
        AddPlanet("Earth", 125, 12, 8);
        AddPlanet("Mars", 170, 22, 6);
        orbits.Freeze();                     // готова, незмінна
        Loaded += (s, e) => orbits.Begin(this, isControllable: true);
    }

    // Планета лежить на «плечі» – полотні 400 × 400, яке
    // обертається навколо центра.
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

Розкадрування створено в коді: `Storyboard.SetTarget` вказує сам об’єкт-ціль (у коді це простіше, ніж реєструвати імена), а шлях `(UIElement.RenderTransform).(RotateTransform.Angle)` – властивість його перетворення. Після побудови розкадрування заморожено (`Freeze`): воно більше не змінюється. `SetSpeedRatio` і `Pause` діють, бо розкадрування запущено з `isControllable: true`. Перевірка: через 1 с після запуску кути плечей становили 122°, 49°, 31° і 17° (період Меркурія 3 с – третина оберту); після зміни швидкості на 4 і ще 1 с – 250°, 244°, 152° і 83°; під час паузи кути не змінювалися.

## Приклад 3. Картки для вивчення слів

Написати застосунок для вивчення англійських слів. Картка показує слово; клацання перевертає її анімацією (картка стискається до вертикальної лінії, текст змінюється на переклад, картка розгортається). Кнопки *Previous* і *Next* показують сусідню картку, яка «в’їжджає» збоку. Кнопка *Listen* відтворює запис вимови з файлу `Sounds/<слово>.wav`; якщо запису немає, рядок стану показує повідомлення.

Файли вимови студент записує сам (власним голосом, у форматі WAV), додає до папки проєкту `Sounds` і встановлює для них *Build Action = Content* і *Copy to Output Directory = Copy if newer*. Розмітка:

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

Перетворення картки – група з масштабу (для перевертання) і зсуву (для появи збоку), тож обидві анімації можуть працювати одночасно. Файл `MainWindow.xaml.cs`:

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
        new("apple", "яблуко"), new("river", "річка"),
        new("window", "вікно"), new("light", "світло")
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

    // Перевертання: картка стискається до лінії, текст
    // змінюється, картка розгортається.
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
        // Нова картка «в’їжджає» збоку.
        var slide = new DoubleAnimation(step * 300, 0,
            TimeSpan.FromSeconds(0.3))
        { EasingFunction = new CubicEase() };
        cardSlide.BeginAnimation(TranslateTransform.XProperty, slide);
    }

    // Файл Sounds/<word>.wav, записаний студентом, копіюється
    // до вихідного каталогу (Content, Copy if newer).
    private void Listen_Click(object sender, RoutedEventArgs e)
    {
        string file = Path.Combine(AppContext.BaseDirectory,
            "Sounds", cards[index].Word + ".wav");
        player.Open(new Uri(file));
        player.Play();
    }
}
```

Перевертання складається з двох анімацій по 0,15 с: друга запускається в обробнику `Completed` першої, коли картка має нульову ширину і заміна тексту непомітна. `MediaPlayer` зберігається в полі класу, а не в локальній змінній, яку збирач сміття міг би знищити під час відтворення. Перевірка: через 0,1 с після клацання масштаб картки становив 0,56 і показувалося слово «apple», через 0,5 с – масштаб 1 і переклад «яблуко». Для слова `apple` із записом рядок стану показав «Playing "apple"», для слова `river` без запису – «No recording: Cannot find the media file.».
