---
title: "Practice"
description: "Topic 4. GDI+ graphics: worked examples"
outline: [2, 3]
sourceHash: "9027a9671310a3fb7cd3b09c19d1f5753a8da48a8b5c49f3987a046997a06e3a"
---

# Practice

Each example is a *Windows Forms App* (.NET 10) project. The `Form1.cs` and `Form1.Designer.cs` files are deleted, and in `Program.cs`, `new Form1()` is replaced with `new MainForm()`; the controls are created in code.

## Example 1. A bar chart

Write an application in which the user edits months and sales amounts in a `DataGridView` table, and a bar chart is built next to it. The amounts must be nonnegative numbers; the amount is shown above each bar and the month name below it. The chart is repainted after every change to the data and to the window size.

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

The `BindingList<SalesItem>` list is linked to the table with the `DataSource` property: the table creates the `Month` and `Amount` columns itself, and changes in the cells go into the list. The list's `ListChanged` event reports every change, so the chart is repainted without extra code:

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
    // A non-numeric value in the Amount column.
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

If something other than a number is entered, the table cannot convert the text to `decimal` and raises the `DataError` event; a negative number is caught by the `CellValidating` event. In both cases, `e.Cancel = true` keeps the cursor in the cell. A `PictureBox` has double buffering, so it works as a canvas without creating a descendant.

```cs
    public static void DrawChart(Graphics g, Rectangle area,
        IList<SalesItem> data)
    {
        area.Inflate(-20, -30);            // margins for labels
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

    // Text centered on the point (x; y): MeasureString gives the size.
    private static void DrawCentered(Graphics g, string text,
        Font font, float x, float y)
    {
        SizeF size = g.MeasureString(text, font);
        g.DrawString(text, font, Brushes.Black,
            x - size.Width / 2, y - size.Height / 2);
    }
}
```

The height of a bar is proportional to the ratio of its amount to the largest amount; `Math.Max(…, 1)` protects against division by zero when all amounts are zero. The bars are hatched with sloping lines, so the chart reads well in black-and-white print too. The labels are centered using the size returned by `MeasureString`. The `N1` format displays the amount with one decimal place: 180.25 is shown as "180.3". For the initial data, the chart has four bars: Jan – 120.0, Feb – 95.5, Mar – 143.0, Apr – 180.3 (the tallest takes the full height of the area).

## Example 2. A certificate generator

Write an application that creates a course completion certificate: a frame, a title, the participant's name, the course name, the date, and an optional logo from a file. The certificate is shown in a preview area and saved to a 1600 × 1130-pixel PNG file. A long name is automatically reduced to fit within a width of 1200 pixels.

Drawing is moved into the static `CertificateRenderer` class, which does not depend on the form:

```cs
using System.Drawing.Drawing2D;

namespace Certificate;

public static class CertificateRenderer
{
    public const int Width = 1600, Height = 1130;   // A4 proportions

    public static Bitmap Render(string name, string course,
        DateTime date, Image? logo)
    {
        var bitmap = new Bitmap(Width, Height);
        bitmap.SetResolution(150, 150);
        using Graphics g = Graphics.FromImage(bitmap);
        g.SmoothingMode = SmoothingMode.AntiAlias;
        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
        g.Clear(Color.White);

        // A frame with rounded corners.
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
    // The image is fitted into a square, preserving its proportions.
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

    // The largest font (up to 48 pt) with which the name fits the width.
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

The `SetResolution(150, 150)` method writes a resolution of 150 dpi to the file, so the certificate prints at a size close to A4 (1600 / 150 ≈ 10.7 inches). The frame with rounded corners is drawn by the `DrawRoundedRectangle` method. The logo is fitted into a 200 × 200 square, preserving its proportions. The `FitFont` method reduces the font by 2 pt until the string fits; the `Font` objects that did not fit are released. The form contains input fields, buttons, and a `PictureBox` preview area:

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
    old?.Dispose();                  // release the old Bitmap
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
        // A copy in memory: the file does not stay locked.
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

Each update creates a new `Bitmap`, so the old image in the `PictureBox` is released. The logo is copied into memory so that the file does not stay locked; a corrupted file causes an `OutOfMemoryException` (this is how GDI+ reports an unknown format) and a message instead of a crash. The font size in points is converted to pixels taking the `Bitmap` resolution into account, so 48 pt at 150 dpi is 100 pixels. For the name "Olena Kovalenko", 48 pt remains, and for "Oleksandra Kovalenko-Shevchuk" the font is reduced to 36 pt.

## Example 3. A level meter

Write a "Level meter" custom control: a vertical bar of 10 segments that light up according to a value of 0–100. Segments above the `WarningLevel` threshold are filled with hatching. When the value reaches the threshold from below, the control raises the `WarningLevelReached` event. The properties must be available in the *Properties* window.

```cs
using System.ComponentModel;
using System.Drawing.Drawing2D;

namespace LevelMeter;

// A vertical segmented level meter, 0–100.
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

The event is raised by the protected virtual `OnWarningLevelReached` method—this is how the events of all Windows Forms controls are organized, and a descendant can change the behavior by overriding the method. The event occurs only when crossing the threshold from below, not for every value above the threshold.

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

        for (int i = 0; i < Segments; i++)       // 0 – the bottom one
        {
            float y = Height - (i + 1) * (h + Gap);
            var cell = new RectangleF(Gap, y, Width - 2 * Gap, h);
            // A segment lights up if the level has reached its middle.
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

A segment lights up if the value has reached its middle: for 10 segments, the middles are at 5, 15, …, 95. The colors are taken from the `ForeColor` and `BackColor` properties, so the control adapts to the form. A form with the meter and a vertical `TrackBar`:

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

Testing the control: when `Value` is assigned 50, 80, 90, 60, 75, 200, and −5 in sequence (threshold 75), the property takes the values 50, 80, 90, 60, 75, 100, and 0, and the `WarningLevelReached` event occurs twice: on the transitions 50 → 80 and 60 → 75.
