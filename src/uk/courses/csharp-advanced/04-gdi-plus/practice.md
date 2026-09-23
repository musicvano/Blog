---
title: "Практика"
description: "Тема 4. Графіка GDI+: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад – проєкт *Windows Forms App* (.NET 10). Файли `Form1.cs` і `Form1.Designer.cs` видаляють, а в `Program.cs` замінюють `new Form1()` на `new MainForm()`; елементи керування створюються в коді.

## Приклад 1. Стовпчикова діаграма

Написати застосунок, у якому користувач редагує в таблиці `DataGridView` місяці та суми продажів, а поруч будується стовпчикова діаграма. Суми мають бути невід’ємними числами; над стовпчиком виводиться сума, під ним – назва місяця. Діаграма перемальовується після кожної зміни даних і розміру вікна.

```cs
using System.ComponentModel;
using System.Drawing.Drawing2D;

namespace BarChart;

public class SalesItem
{
    public string Month { get; set; } = "";
    public decimal Amount { get; set; }
}

public class MainForm : Form
{
    private readonly BindingList<SalesItem> items =
    [
        new() { Month = "Jan", Amount = 120 },
        new() { Month = "Feb", Amount = 95.5m },
        new() { Month = "Mar", Amount = 143 },
        new() { Month = "Apr", Amount = 180.25m },
    ];
    private readonly PictureBox chart = new()
    {
        Dock = DockStyle.Fill,
        BackColor = Color.White
    };
```

Список `BindingList<SalesItem>` пов’язано з таблицею властивістю `DataSource`: таблиця сама створює стовпці `Month` і `Amount`, а зміни в клітинках потрапляють у список. Подія списку `ListChanged` повідомляє про кожну зміну, тому діаграма перемальовується без додаткового коду:

```cs
public MainForm()
{
    Text = "Bar Chart";
    ClientSize = new Size(720, 400);
    var grid = new DataGridView
    {
        Dock = DockStyle.Left,
        Width = 250,
        DataSource = items
    };
    // Нечислове значення в стовпці Amount.
    grid.DataError += (s, e) =>
    {
        MessageBox.Show(this, "Amount must be a number.", Text);
        e.Cancel = true;
    };
    grid.CellValidating += (s, e) =>
    {
        if (grid.Columns[e.ColumnIndex].Name == "Amount"
            && decimal.TryParse(e.FormattedValue?.ToString(),
                out decimal amount)
            && amount < 0)
        {
            MessageBox.Show(this, "Amount must be >= 0.", Text);
            e.Cancel = true;
        }
    };
    items.ListChanged += (s, e) => chart.Invalidate();
    chart.Paint += (s, e) =>
        DrawChart(e.Graphics, chart.ClientRectangle, items);
    chart.Resize += (s, e) => chart.Invalidate();
    Controls.Add(chart);
    Controls.Add(grid);
}
```

Якщо введено не число, таблиця не може перетворити текст на `decimal` і генерує подію `DataError`; від’ємне число перехоплює подія `CellValidating`. В обох випадках `e.Cancel = true` залишає курсор у клітинці. `PictureBox` має подвійну буферизацію, тому підходить як полотно без створення нащадка.

```cs
    public static void DrawChart(Graphics g, Rectangle area,
        IList<SalesItem> data)
    {
        area.Inflate(-20, -30);            // поля для підписів
        if (data.Count == 0 || area.Width < 50 || area.Height < 50)
            return;
        g.SmoothingMode = SmoothingMode.AntiAlias;
        decimal max = Math.Max(data.Max(i => i.Amount), 1);
        float slot = (float)area.Width / data.Count;
        float barWidth = slot * 0.6f;
        using var font = new Font("Segoe UI", 9);
        using var hatch = new HatchBrush(
            HatchStyle.WideUpwardDiagonal, Color.Black, Color.White);

        for (int i = 0; i < data.Count; i++)
        {
            float h = (float)(data[i].Amount / max) * area.Height;
            float x = area.Left + i * slot + (slot - barWidth) / 2;
            var bar = new RectangleF(x, area.Bottom - h, barWidth, h);
            g.FillRectangle(hatch, bar);
            g.DrawRectangle(Pens.Black, x, bar.Y, barWidth, h);

            float center = x + barWidth / 2;
            DrawCentered(g, data[i].Amount.ToString("N1"), font,
                center, bar.Top - 10);
            DrawCentered(g, data[i].Month, font,
                center, area.Bottom + 12);
        }
        g.DrawLine(Pens.Black, area.Left, area.Bottom,
            area.Right, area.Bottom);
    }

    // Центр тексту в точці (x; y): розмір дає MeasureString.
    private static void DrawCentered(Graphics g, string text,
        Font font, float x, float y)
    {
        SizeF size = g.MeasureString(text, font);
        g.DrawString(text, font, Brushes.Black,
            x - size.Width / 2, y - size.Height / 2);
    }
}
```

Висота стовпчика пропорційна відношенню суми до найбільшої суми; `Math.Max(…, 1)` захищає від ділення на нуль, коли всі суми нульові. Стовпчики заштриховано похилими лініями, тому діаграма читається і на чорно-білому друці. Підписи центровано за розміром, який повертає `MeasureString`. Формат `N1` виводить суму з одним знаком після коми: 180,25 показується як «180,3». Для початкових даних діаграма має чотири стовпчики: Jan – 120,0, Feb – 95,5, Mar – 143,0, Apr – 180,3 (найвищий займає всю висоту поля).

## Приклад 2. Генератор сертифікатів

Написати застосунок, який створює сертифікат про проходження курсу: рамка, заголовок, ім’я слухача, назва курсу, дата та необов’язковий логотип із файлу. Сертифікат показується в області перегляду і зберігається у PNG-файл розміром 1600 × 1130 пікселів. Довге ім’я автоматично зменшується, щоб уміститися в ширину 1200 пікселів.

Малювання винесено в статичний клас `CertificateRenderer`, який не залежить від форми:

```cs
using System.Drawing.Drawing2D;

namespace Certificate;

public static class CertificateRenderer
{
    public const int Width = 1600, Height = 1130;   // пропорції A4

    public static Bitmap Render(string name, string course,
        DateTime date, Image? logo)
    {
        var bitmap = new Bitmap(Width, Height);
        bitmap.SetResolution(150, 150);
        using Graphics g = Graphics.FromImage(bitmap);
        g.SmoothingMode = SmoothingMode.AntiAlias;
        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
        g.Clear(Color.White);

        // Рамка із заокругленими кутами.
        using var frame = new Pen(Color.Black, 12);
        g.DrawRoundedRectangle(frame,
            new Rectangle(40, 40, Width - 80, Height - 80),
            new Size(80, 80));
        if (logo != null)
            DrawLogo(g, logo, new Rectangle(130, 130, 200, 200));

        using var format = new StringFormat
        {
            Alignment = StringAlignment.Center,
            LineAlignment = StringAlignment.Center
        };
        using var title = new Font("Georgia", 40, FontStyle.Bold);
        using var text = new Font("Georgia", 18);
        using Font nameFont = FitFont(g, name, 1200);
        g.DrawString("CERTIFICATE", title, Brushes.Black,
            new RectangleF(0, 180, Width, 160), format);
        g.DrawString(name, nameFont, Brushes.Black,
            new RectangleF(0, 420, Width, 150), format);
        g.DrawString($"has completed the course \"{course}\"",
            text, Brushes.Black,
            new RectangleF(200, 600, Width - 400, 140), format);
        g.DrawString(date.ToString("dd.MM.yyyy"), text,
            Brushes.Black, new RectangleF(0, 860, Width, 60), format);
        return bitmap;
    }
```

```cs
    // Зображення вписується в квадрат зі збереженням пропорцій.
    private static void DrawLogo(Graphics g, Image logo,
        Rectangle box)
    {
        float scale = Math.Min((float)box.Width / logo.Width,
            (float)box.Height / logo.Height);
        int w = (int)(logo.Width * scale);
        int h = (int)(logo.Height * scale);
        g.DrawImage(logo, box.X + (box.Width - w) / 2,
            box.Y + (box.Height - h) / 2, w, h);
    }

    // Найбільший шрифт (до 48 пт), з яким ім’я вміщується в ширину.
    private static Font FitFont(Graphics g, string text,
        float maxWidth)
    {
        for (float size = 48; size > 12; size -= 2)
        {
            var font = new Font("Georgia", size, FontStyle.Italic);
            if (g.MeasureString(text, font).Width <= maxWidth)
                return font;
            font.Dispose();
        }
        return new Font("Georgia", 12, FontStyle.Italic);
    }
}
```

Метод `SetResolution(150, 150)` записує у файл роздільну здатність 150 dpi, тому сертифікат друкується у форматі близькому до A4 (1600 / 150 ≈ 10,7 дюйма). Рамку із заокругленими кутами малює метод `DrawRoundedRectangle`. Логотип вписується у квадрат 200 × 200 зі збереженням пропорцій. Метод `FitFont` зменшує шрифт на 2 пт, доки рядок не вміститься; об’єкти `Font`, які не підійшли, звільняються. Форма містить поля введення, кнопки й область перегляду `PictureBox`:

```cs
using System.Drawing.Imaging;

namespace Certificate;

public class MainForm : Form
{
    private readonly TextBox nameBox = new() { Width = 200 };
    private readonly TextBox courseBox = new() { Width = 200 };
    private readonly PictureBox preview = new()
    {
        Dock = DockStyle.Fill,
        SizeMode = PictureBoxSizeMode.Zoom
    };
    private Image? logo;

    public MainForm()
    {
        Text = "Certificate Generator";
        ClientSize = new Size(900, 600);
        var logoButton = new Button { Text = "Logo..." };
        var saveButton = new Button { Text = "Save PNG..." };
        var bar = new FlowLayoutPanel { Dock = DockStyle.Top };
        bar.Height = 34;
        bar.Controls.AddRange([
            new Label { Text = "Name:", AutoSize = true }, nameBox,
            new Label { Text = "Course:", AutoSize = true },
            courseBox,
            logoButton, saveButton]);
        Controls.Add(preview);
        Controls.Add(bar);

        nameBox.TextChanged += (s, e) => UpdatePreview();
        courseBox.TextChanged += (s, e) => UpdatePreview();
        logoButton.Click += (s, e) => LoadLogo();
        saveButton.Click += (s, e) => Save();
        UpdatePreview();
    }
```

```cs
private void UpdatePreview()
{
    Image? old = preview.Image;
    preview.Image = CertificateRenderer.Render(nameBox.Text,
        courseBox.Text, DateTime.Today, logo);
    old?.Dispose();                  // звільнити старий Bitmap
}

private void LoadLogo()
{
    using var dialog = new OpenFileDialog
    {
        Filter = "Images|*.png;*.jpg;*.jpeg;*.bmp"
    };
    if (dialog.ShowDialog(this) != DialogResult.OK) return;
    try
    {
        // Копія в пам’яті: файл не залишається заблокованим.
        using Image file = Image.FromFile(dialog.FileName);
        logo?.Dispose();
        logo = new Bitmap(file);
        UpdatePreview();
    }
    catch (Exception ex)
        when (ex is OutOfMemoryException or IOException)
    {
        MessageBox.Show(this, "Cannot open the image.", Text);
    }
}
```

```cs
    private void Save()
    {
        if (nameBox.Text.Trim() == "" || courseBox.Text.Trim() == "")
        {
            MessageBox.Show(this, "Enter the name and course.", Text);
            return;
        }
        using var dialog = new SaveFileDialog
        {
            Filter = "PNG image (*.png)|*.png",
            FileName = "certificate.png"
        };
        if (dialog.ShowDialog(this) != DialogResult.OK) return;
        using Bitmap bitmap = CertificateRenderer.Render(nameBox.Text,
            courseBox.Text, DateTime.Today, logo);
        bitmap.Save(dialog.FileName, ImageFormat.Png);
    }
}
```

Кожне оновлення створює новий `Bitmap`, тому старе зображення з `PictureBox` звільняється. Логотип копіюється в пам’ять, щоб файл не залишався заблокованим; пошкоджений файл спричиняє `OutOfMemoryException` (так GDI+ повідомляє про невідомий формат) і повідомлення замість аварійного завершення. Розмір шрифту в пунктах переводиться в пікселі з урахуванням роздільної здатності `Bitmap`, тому 48 пт при 150 dpi – це 100 пікселів. Для імені «Olena Kovalenko» залишається 48 пт, а для «Олександра Коваленко-Шевчук» шрифт зменшується до 36 пт.

## Приклад 3. Індикатор рівня

Написати власний елемент керування «Індикатор рівня»: вертикальний стовпчик із 10 сегментів, що світяться відповідно до значення 0–100. Сегменти вище порогу `WarningLevel` зафарбовуються штриховкою. Коли значення досягає порогу знизу, елемент генерує подію `WarningLevelReached`. Властивості мають бути доступні у вікні *Properties*.

```cs
using System.ComponentModel;
using System.Drawing.Drawing2D;

namespace LevelMeter;

// Вертикальний сегментний індикатор рівня 0–100.
public class LevelMeter : Control
{
    private int value;
    private const int Segments = 10;
    private int warningLevel = 80;

    public LevelMeter()
    {
        SetStyle(ControlStyles.UserPaint
            | ControlStyles.AllPaintingInWmPaint
            | ControlStyles.OptimizedDoubleBuffer
            | ControlStyles.ResizeRedraw, true);
        Size = new Size(60, 220);
    }

    [Category("Level"), Description("Current level, 0-100.")]
    [DefaultValue(0)]
    public int Value
    {
        get => value;
        set
        {
            int newValue = Math.Clamp(value, 0, 100);
            if (newValue == this.value) return;
            bool reached = this.value < warningLevel
                && newValue >= warningLevel;
            this.value = newValue;
            Invalidate();
            if (reached) OnWarningLevelReached(EventArgs.Empty);
        }
    }
```

```cs
[Category("Level"), Description("Start of the warning zone.")]
[DefaultValue(80)]
public int WarningLevel
{
    get => warningLevel;
    set
    {
        warningLevel = Math.Clamp(value, 0, 100);
        Invalidate();
    }
}

[Category("Level")]
[Description("Occurs when Value reaches WarningLevel.")]
public event EventHandler? WarningLevelReached;

protected virtual void OnWarningLevelReached(EventArgs e) =>
    WarningLevelReached?.Invoke(this, e);
```

Подію генерує захищений віртуальний метод `OnWarningLevelReached` – так влаштовано події всіх елементів Windows Forms, і нащадок може змінити поведінку, перевизначивши метод. Подія виникає лише під час переходу через поріг знизу вгору, а не для кожного значення вище порогу.

```cs
    protected override void OnPaint(PaintEventArgs e)
    {
        base.OnPaint(e);
        const int Gap = 3;
        float h = (Height - Gap * (Segments + 1)) / (float)Segments;
        if (h < 2 || Width < 10) return;
        Graphics g = e.Graphics;
        using var normal = new SolidBrush(ForeColor);
        using var warning = new HatchBrush(
            HatchStyle.WideUpwardDiagonal, ForeColor, BackColor);

        for (int i = 0; i < Segments; i++)       // 0 – нижній
        {
            float y = Height - (i + 1) * (h + Gap);
            var cell = new RectangleF(Gap, y, Width - 2 * Gap, h);
            // Сегмент світиться, якщо рівень досяг його середини.
            float middle = (i + 0.5f) * 100 / Segments;
            if (value >= middle)
            {
                g.FillRectangle(
                    middle >= warningLevel ? warning : normal, cell);
            }
            g.DrawRectangle(Pens.Gray, cell.X, cell.Y,
                cell.Width, cell.Height);
        }
    }
}
```

Сегмент світиться, якщо значення досягло його середини: для 10 сегментів середини лежать на 5, 15, …, 95. Кольори беруться з властивостей `ForeColor` і `BackColor`, тому елемент підлаштовується під форму. Форма з індикатором і вертикальним `TrackBar`:

```cs
namespace LevelMeter;

public class MainForm : Form
{
    public MainForm()
    {
        Text = "Level Meter";
        ClientSize = new Size(200, 260);
        var meter = new LevelMeter { WarningLevel = 75 };
        meter.SetBounds(20, 20, 60, 220);
        var track = new TrackBar
        {
            Orientation = Orientation.Vertical,
            Maximum = 100,
            TickFrequency = 10
        };
        track.SetBounds(100, 20, 45, 220);
        track.ValueChanged += (s, e) => meter.Value = track.Value;
        meter.WarningLevelReached += (s, e) =>
            MessageBox.Show(this, "Warning level reached!", Text);
        Controls.AddRange([meter, track]);
    }
}
```

Перевірка роботи елемента: під час послідовного присвоєння `Value` значень 50, 80, 90, 60, 75, 200 і −5 (поріг 75) властивість набуває значень 50, 80, 90, 60, 75, 100 і 0, а подія `WarningLevelReached` виникає двічі: під час переходу 50 → 80 і 60 → 75.
