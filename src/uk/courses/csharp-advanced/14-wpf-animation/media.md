---
title: "Зображення, звук і відео"
description: "Тема 14. Анімація та мультимедіа WPF: Зображення, звук і відео"
outline: [2, 3]
---

# Зображення, звук і відео

## Зображення і звук

### Зображення `Image` і `BitmapImage`

Елемент `Image` показує зображення (PNG, JPEG, BMP, GIF, TIFF, ICO); `Stretch` задає масштабування: `Uniform` (за замовчуванням, зі збереженням пропорцій), `UniformToFill`, `Fill`, `None` (<https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/imaging-overview>). Зображення, додане до проєкту з дією збирання *Resource*, вказують відносним шляхом: `<Image Source="Images/logo.png"/>`. Для файлу з диска в коді створюють `BitmapImage`:

```cs
var bitmap = new BitmapImage();
bitmap.BeginInit();
bitmap.UriSource = new Uri(path);        // повний шлях до файлу
bitmap.DecodePixelWidth = 400;           // зменшити під час читання
bitmap.CacheOption = BitmapCacheOption.OnLoad;   // не тримати файл
bitmap.EndInit();
bitmap.Freeze();
photo.Source = bitmap;                   // елемент Image
```

`DecodePixelWidth` декодує фотографію одразу в потрібному розмірі й заощаджує пам’ять (шпалери Windows 1920 × 1200 було прочитано як зображення 400 × 250), а `CacheOption.OnLoad` читає файл повністю під час `EndInit`, тож його можна одразу видалити чи перезаписати.

### Звук: `SoundPlayer`, `MediaPlayer`, `SoundPlayerAction`

Для коротких звукових сигналів є три засоби:

- `System.Media.SoundPlayer` – лише файли WAV; методи `Load`, `Play` (асинхронно), `PlaySync`, `PlayLooping`, `Stop` (<https://learn.microsoft.com/dotnet/api/system.media.soundplayer>). Якщо файлу немає, `Load` і `Play` генерують `FileNotFoundException` з повідомленням *Please be sure a sound file exists at the specified location*;
- `System.Windows.Media.MediaPlayer` – аудіо й відео без візуального елемента (MP3, WMA, WAV, M4A і формати, які підтримує Windows Media Foundation), гучність `Volume`, кілька програвачів одночасно (<https://learn.microsoft.com/dotnet/api/system.windows.media.mediaplayer>);
- `SoundPlayerAction` – дія тригера в XAML, яка відтворює WAV без коду: `<EventTrigger RoutedEvent="Button.Click"><SoundPlayerAction Source="Sounds/click.wav"/></EventTrigger>` (<https://learn.microsoft.com/dotnet/api/system.windows.controls.soundplayeraction>).

```cs
private readonly MediaPlayer player = new();   // поле класу

player.MediaFailed += (s, e) =>
    status.Text = e.ErrorException.Message;
player.Open(new Uri(Path.Combine(AppContext.BaseDirectory,
    "Sounds", "click.wav")));
player.Play();
```

`MediaPlayer` відкриває файл асинхронно: помилки не генерують винятків, а надходять подією `MediaFailed`. Для відсутнього файлу `e.ErrorException` – `FileNotFoundException` *Cannot find the media file*. Тривалість `NaturalDuration` відома лише після події `MediaOpened` (для системного звуку `tada.wav` – 1,62 с).

## Відео та `MediaElement`

`MediaElement` – елемент інтерфейсу, який показує відео та відтворює аудіо; його можна розмістити на будь-якій панелі, повернути перетворенням чи накласти на нього текст (<https://learn.microsoft.com/dotnet/desktop/wpf/graphics-multimedia/multimedia-overview>). Він використовує кодеки Windows (Windows Media Player / Media Foundation): WPF відтворює ті формати, які підтримує операційна система (зазвичай MP4 з H.264, WMV, MP3, WAV). Основні члени:

- `Source` – `Uri` файлу; `LoadedBehavior`: за замовчуванням `Play` (відтворення одразу після завантаження). Щоб керувати відтворенням методами `Play`, `Pause`, `Stop`, потрібно встановити `LoadedBehavior="Manual"`, інакше виклики не працюють;
- `Position` – поточна позиція, присвоєння переходить до іншого місця (перемотування); `NaturalDuration` – тривалість, доступна після `MediaOpened` (`HasTimeSpan`);
- `Volume` (0–1, за замовчуванням 0,5), `IsMuted`, `Balance`, `SpeedRatio`;
- події `MediaOpened`, `MediaEnded`, `MediaFailed` (`ExceptionRoutedEventArgs.ErrorException`), `BufferingStarted`, `BufferingEnded`.

Подія `MediaElement` про зміну позиції немає, тому повзунок позиції оновлюють таймером `DispatcherTimer` кілька разів за секунду.

### Медіафайли в проєкті

Медіафайл **не можна** вбудувати як ресурс (*Resource*): `MediaElement` і `MediaPlayer` читають лише файли. Файл додають до проєкту (наприклад, `Media/intro.mp4`) і в *Properties* встановлюють *Build Action = Content* і *Copy to Output Directory = Copy if newer* (рис. 14.8), що в `.csproj` відповідає запису:

```xml
<ItemGroup>
  <Content Include="Media\intro.mp4">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
  </Content>
</ItemGroup>
```

Відносний `Uri` відраховується від **поточного каталогу** процесу, який залежить від способу запуску, тому надійніше будувати повний шлях від каталогу програми: `new Uri(Path.Combine(AppContext.BaseDirectory, "Media", "intro.mp4"))`.

![Налаштування медіафайлу у вікні Properties](./images/03-vs-media-content-properties.png)

Рис. 14.8. Налаштування медіафайлу у вікні *Properties* {.caption}

Для навчальних прикладів використовують **власні** файли: відео, записане застосунком *Camera* Windows або смартфоном, звук, записаний застосунком *Sound Recorder*, або файли з вільною ліцензією з офіційного джерела, умови якого дозволяють таке використання. Файли з неперевірених сайтів у проєкт не додають.

### Приклад «Медіаплеєр»

Медіаплеєр відкриває кілька файлів у список відтворення, показує відео, має кнопки *Play*/*Pause* і *Stop*, повзунок позиції з часом «поточний / загальний», повзунок гучності і переходить до наступного файлу після завершення поточного (рис. 14.9). `MediaElement` керується методами, а не властивостями, тому приклад написано в code-behind; у застосунку MVVM (тема 13) ці виклики виносять у сервіс представлення. Розмітка `MainWindow.xaml`:

```xml
<Window x:Class="Player.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="Media Player" Width="720" Height="460">
    <DockPanel>
        <DockPanel DockPanel.Dock="Bottom" Margin="8">
            <Button Content="Open..." Padding="8,2"
                    Click="Open_Click"/>
            <Button x:Name="playButton" Content="Play" Width="60"
                    Margin="6,0" Click="Play_Click"/>
            <Button Content="Stop" Padding="8,2" Click="Stop_Click"/>
            <Slider x:Name="volumeSlider" DockPanel.Dock="Right"
                    Width="80" Maximum="1" Value="0.5"
                    VerticalAlignment="Center" ToolTip="Volume"/>
            <TextBlock x:Name="timeText" DockPanel.Dock="Right"
                       Text="00:00 / 00:00" Margin="0,0,8,0"
                       VerticalAlignment="Center"/>
            <Slider x:Name="positionSlider" Margin="8,0"
                    VerticalAlignment="Center"
                    Thumb.DragStarted="Position_DragStarted"
                    Thumb.DragCompleted="Position_DragCompleted"/>
        </DockPanel>
        <ListBox x:Name="playlist" DockPanel.Dock="Right" Width="180"
                 DisplayMemberPath="Name"
                 SelectionChanged="Playlist_SelectionChanged"/>
        <Border Background="Black">
            <MediaElement x:Name="media" LoadedBehavior="Manual"
                Volume="{Binding Value, ElementName=volumeSlider}"
                MediaOpened="Media_MediaOpened"
                MediaEnded="Media_MediaEnded"
                MediaFailed="Media_MediaFailed"/>
        </Border>
    </DockPanel>
</Window>
```

Гучність пов’язано з повзунком прив’язкою до елемента. Приєднані події `Thumb.DragStarted` і `Thumb.DragCompleted` повідомляють, що користувач тягне бігунок повзунка позиції: у цей час таймер не повинен переписувати значення повзунка. Файл `MainWindow.xaml.cs`:

```cs
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Threading;
using Microsoft.Win32;

namespace Player;

public partial class MainWindow : Window
{
    private readonly DispatcherTimer timer =
        new() { Interval = TimeSpan.FromMilliseconds(250) };
    private bool isPlaying;
    private bool isDragging;       // користувач тягне повзунок

    public MainWindow()
    {
        InitializeComponent();
        timer.Tick += (s, e) => UpdatePosition();
    }

    private void Open_Click(object sender, RoutedEventArgs e)
    {
        var dialog = new OpenFileDialog
        {
            Filter = "Media files|*.mp4;*.wmv;*.mp3;*.m4a;*.wav"
                + "|All files|*.*",
            Multiselect = true
        };
        if (dialog.ShowDialog(this) != true) return;
        foreach (string file in dialog.FileNames)
            playlist.Items.Add(new FileInfo(file));
        if (playlist.SelectedIndex < 0) playlist.SelectedIndex = 0;
    }

    private void Playlist_SelectionChanged(object sender,
        SelectionChangedEventArgs e)
    {
        if (playlist.SelectedItem is not FileInfo file) return;
        media.Source = new Uri(file.FullName);
        SetPlaying(true);
    }
```

Список відтворення зберігає об’єкти `FileInfo`, а `DisplayMemberPath="Name"` показує лише імена файлів. Вибір елемента списку (клацанням або з коду) відкриває файл і починає відтворення. Метод `SetPlaying` перемикає відтворення і паузу, змінює напис кнопки та вмикає таймер лише під час відтворення.

```cs
private void SetPlaying(bool play)
{
    if (play) media.Play();
    else media.Pause();
    isPlaying = play;
    playButton.Content = play ? "Pause" : "Play";
    timer.IsEnabled = play;
}

private void Play_Click(object sender, RoutedEventArgs e)
{
    if (media.Source != null) SetPlaying(!isPlaying);
}

private void Stop_Click(object sender, RoutedEventArgs e)
{
    SetPlaying(false);
    media.Stop();                // позиція повертається в 0
    UpdatePosition();
}

private void Media_MediaOpened(object sender, RoutedEventArgs e)
{
    positionSlider.Maximum = media.NaturalDuration.HasTimeSpan
        ? media.NaturalDuration.TimeSpan.TotalSeconds : 0;
    UpdatePosition();
}

private void Media_MediaEnded(object sender, RoutedEventArgs e)
{
    if (playlist.SelectedIndex < playlist.Items.Count - 1)
        playlist.SelectedIndex++;          // наступний файл
    else
        Stop_Click(sender, e);
}

private void Media_MediaFailed(object? sender,
    ExceptionRoutedEventArgs e)
{
    Stop_Click(this, e);
    MessageBox.Show(this, e.ErrorException.Message,
        "Cannot play the file", MessageBoxButton.OK,
        MessageBoxImage.Error);
}
```

Повзунок позиції працює в секундах: його максимум – тривалість файлу, значення – поточна позиція. Коли користувач відпускає бігунок, плеєр переходить у вибрану позицію:

```cs
    private void Position_DragStarted(object sender,
        DragStartedEventArgs e) => isDragging = true;

    private void Position_DragCompleted(object sender,
        DragCompletedEventArgs e)
    {
        isDragging = false;
        media.Position = TimeSpan.FromSeconds(positionSlider.Value);
    }

    private void UpdatePosition()
    {
        if (!isDragging)
            positionSlider.Value = media.Position.TotalSeconds;
        TimeSpan total = media.NaturalDuration.HasTimeSpan
            ? media.NaturalDuration.TimeSpan : TimeSpan.Zero;
        timeText.Text = $@"{media.Position:mm\:ss} / {total:mm\:ss}";
    }
}
```

У рядку формату `mm\:ss` двокрапку екрановано, бо в спеціальному форматі `TimeSpan` вона не є роздільником за замовчуванням. Під час перевірки до списку додано два системні звуки Windows: після `MediaOpened` повзунок отримав максимум 1,09 (тривалість першого файлу), після `MediaEnded` плеєр сам перейшов до другого файлу (5,57 с), перехід `Position` на 1 с показав «00:01 / 00:05», а *Stop* – «00:00 / 00:05».

::: info Знімок екрана
Running Player with an own recorded video: video frame, playlist on the right with 3 files, position slider, "01:23 / 04:10", volume slider, Pause button
:::

Рис. 14.9. Застосунок «Медіаплеєр» {.caption}
