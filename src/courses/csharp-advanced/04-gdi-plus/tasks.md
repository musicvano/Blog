---
title: "Tasks"
description: "Topic 4. GDI+ graphics: task variants"
outline: [2, 3]
sourceHash: "b3b4052f45c75b50684f20d874669cda860bfbac922efc7382139fbe54d6850d"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Budget pie chart {#v1}

**1. Initial level.** Create a Windows Forms application that draws a pie chart of expenses for five categories (amounts defined in the program): sectors with different `HatchBrush` hatching and a legend.

**2. Basic level.** Create a Windows Forms application in which categories and amounts (positive numbers) are entered in a `DataGridView` with validation, and a pie chart with percentages next to the sectors is repainted after every change to the data and the window size.

**3. Advanced level.** Create a "Budget" Windows Forms application that draws a pie chart of expenses by category, opens and saves categories and amounts in a CSV file (lines with errors are skipped with a message), highlights the sector under the cursor (`GraphicsPath.IsVisible`), saves the chart as PNG, and shows a print preview.

### Variant 2. Chessboard {#v2}

**1. Initial level.** Create a Windows Forms application that draws an 8 × 8 chessboard with hatched dark squares and the labels a–h and 1–8; the square size depends on the window size.

**2. Basic level.** Create a Windows Forms application that draws an 8 × 8 chessboard with labels, places the pieces (letters in circles) according to a FEN string from a text field with format validation, and shows the name of the square the user clicked (for example, e4) in the status bar.

**3. Advanced level.** Create a "Chessboard" Windows Forms application that draws an 8 × 8 board with the pieces in the starting position; pieces are dragged with the mouse, moves are recorded in a list in the `e2-e4` format, the last move is marked with dashed frames, the position is saved and opened as a FEN string, and the board is exported to PNG.

### Variant 3. Solar system {#v3}

**1. Initial level.** Create a Windows Forms application that draws the Sun in the center of the window and four planets on dashed circular orbits with their names.

**2. Basic level.** Create a Windows Forms application that draws the Sun and four planets on circular orbits; the planets move with different periods driven by a `Timer` without flicker, and buttons start and stop the animation and change the speed from 0.5 to 5 times.

**3. Advanced level.** Create a "Solar system" Windows Forms application that draws the Sun and planets moving along circular orbits, reads the planets' parameters (name, orbit radius, period, size) from a JSON file with validation, zooms with the mouse wheel, shows the data of the planet under the cursor, and saves the current frame as PNG.

### Variant 4. Temperature chart {#v4}

**1. Initial level.** Create a Windows Forms application that draws a line chart of temperature over 12 months (values defined in the program) with axes, month labels, and markers at the points.

**2. Basic level.** Create a Windows Forms application that draws a line chart of temperature over 12 months; temperatures (from −60 to 60 °C) are entered in a table, the chart scales to the range of values and the window size, and a tooltip with the month and value is shown under the cursor.

**3. Advanced level.** Create a "Temperatures" Windows Forms application that opens CSV files for several cities (each line is a month and a temperature), draws their temperature charts with different line styles and a legend, lets you turn cities on and off, saves the chart as PNG, and prints it with a preview.

### Variant 5. Speedometer {#v5}

**1. Initial level.** Create a Windows Forms application that draws a speedometer from 0 to 200 km/h with tick marks every 10 km/h, labels every 20 km/h, and a needle at 90.

**2. Basic level.** Create a `Speedometer` custom control that draws a circular speed scale with tick marks and a needle, with the `Value`, `Maximum`, and `RedZone` properties (range validation, the `Category`, `Description`, `DefaultValue` attributes); the zone above `RedZone` is hatched, and the needle on the form is controlled by a `TrackBar`.

**3. Advanced level.** Create a "Test drive" Windows Forms application with a `Speedometer` custom control (a circular scale with a needle, the `Value` and `Maximum` properties), in which the arrow keys change the speed smoothly (`Timer`), the control raises a speeding event, and the log of speeding events is saved to a file.

### Variant 6. Pythagoras tree {#v6}

**1. Initial level.** Create a Windows Forms application that recursively draws a Pythagoras tree of depth 8 using `TranslateTransform`, `RotateTransform`, `Save`, and `Restore`.

**2. Basic level.** Create a Windows Forms application that recursively draws a Pythagoras tree; the depth (1–14) and angle (15–75°) are set with `NumericUpDown`, the tree scales to fit the window, and the status bar shows the number of squares and the drawing time.

**3. Advanced level.** Create a "Fractals" Windows Forms application that draws a Pythagoras tree or a Koch curve into a `Bitmap`, changes the zoom and offset with the mouse, saves the parameters to a JSON file, and saves an image of a given size as PNG.

### Variant 7. Cinema seating map {#v7}

**1. Initial level.** Create a Windows Forms application that draws a seating plan of a cinema hall with 8 rows of 12 numbered seats, the screen at the top, and row numbers on the left.

**2. Basic level.** Create a Windows Forms application that draws a cinema seating plan (8 rows of 12 seats, the ticket price defined in the program); a click selects or deselects a seat (selected seats are hatched, occupied ones are crossed out and unavailable), and the selected seats and the total cost are shown on the right.

**3. Advanced level.** Create a "Cinema hall" Windows Forms application that reads the hall layout and occupied seats from a JSON file, draws the plan, lets you select no more than 6 seats with the mouse, saves the booking to a file, saves a ticket as PNG, and prints tickets with a preview.

### Variant 8. Stopwatch {#v8}

**1. Initial level.** Create a Windows Forms application that draws a stopwatch dial with 60 tick marks and a hand that moves driven by a `Timer`.

**2. Basic level.** Create a "Stopwatch" Windows Forms application that draws a dial with 60 tick marks and a hand, has *Start*, *Stop*, and *Reset* buttons, measures time with `Stopwatch`, uses double buffering, and shows the digital time in the `mm:ss.ff` format under the dial.

**3. Advanced level.** Create a "Stopwatch" Windows Forms application with a dial and lap recording: a list of laps, marking of the fastest and slowest lap, a bar chart of lap durations, saving the results to CSV, and saving the chart as PNG.

### Variant 9. Grade histogram {#v9}

**1. Initial level.** Create a Windows Forms application that draws a histogram of the number of grades "2"–"5" in a group (values defined in the program) with hatched bars and labels.

**2. Basic level.** Create a Windows Forms application in which students' scores (0–100) are entered in a list, grouped on the ECTS scale (A–F), and shown as a histogram with numbers above the bars and a dashed line for the average score.

**3. Advanced level.** Create a "Grade statistics" Windows Forms application that opens a CSV grade sheet file (surname; score 0–100) with a message about invalid lines, draws a histogram of scores with a selected interval width, saves the histogram as PNG, and prints a report on an A4 page.

### Variant 10. Apartment floor plan {#v10}

**1. Initial level.** Create a Windows Forms application that draws a plan of four rectangular rooms at a scale of 1 m = 50 pixels with the room names and areas.

**2. Basic level.** Create a Windows Forms application that draws a room plan at a scale of 1 m = 50 pixels with rectangular furniture; the furniture is dragged with the mouse without leaving the room, and the status bar shows the cursor coordinates in meters.

**3. Advanced level.** Create an "Apartment plan" Windows Forms application that draws to scale rectangular rooms with names and furniture, saves and opens the plan in a JSON file, lets you add rooms and furniture, rotate furniture by 90°, zoom with the mouse wheel, and print the plan with a preview.

### Variant 11. Snake game {#v11}

**1. Initial level.** Create a Windows Forms application that draws a 20 × 20 grid, a five-segment snake, and food in a random free cell.

**2. Basic level.** Create a "Snake" Windows Forms game in which the snake moves driven by a `Timer`, is controlled by the arrow keys, grows after eating, and a collision with the wall or itself ends the game with a score; drawing does not flicker.

**3. Advanced level.** Create a "Snake" Windows Forms game with speed levels, obstacles from a map file, a pause, and a table of 10 high scores in a JSON file; the game logic is implemented in classes independent of the form.

### Variant 12. Pattern generator {#v12}

**1. Initial level.** Create a Windows Forms application that draws an ornament: a shape made of ellipses repeated 12 times by rotating around the center of the window (`RotateTransform`).

**2. Basic level.** Create a Windows Forms application that draws an ornament from a shape repeated by rotation around the center of the window; the number of repetitions (3–36), the kind of shape (an ellipse, a petal from Bézier curves, a polygon), and the line width are set with controls, and the pattern is redrawn immediately.

**3. Advanced level.** Create a "Patterns" Windows Forms application that generates a symmetrical pattern of shapes rotated around the center from a seed number, saves and opens the parameters in a JSON file, exports a PNG of a given size (100–4000 pixels), and shows a print preview.

### Variant 13. Projectile trajectory {#v13}

**1. Initial level.** Create a Windows Forms application that draws the trajectory of a projectile launched at 50 m/s at an angle of 45° (*g* = 9.81 m/s²) with axes and a scale.

**2. Basic level.** Create a Windows Forms application that draws a projectile trajectory with axes; the speed (1–500 m/s) and angle (1–89°) are entered with validation, the trajectory fits the window, and the highest point and the range are marked with labels.

**3. Advanced level.** Create a "Ballistics" Windows Forms application that, from the entered speed and angle, draws projectile trajectories and compares up to five trajectories with different line styles and a legend, animates the flight with a `Timer`, saves the shots to a CSV file, and saves the chart as PNG.

### Variant 14. Gantt chart {#v14}

**1. Initial level.** Create a Windows Forms application that draws a Gantt chart for five tasks (name, start, duration defined in the program) with a daily timeline.

**2. Basic level.** Create a Windows Forms application that draws a Gantt chart with a daily timeline; the tasks (name, start, duration) are entered in a `DataGridView` with date validation, the current date is marked with a dashed line, and overdue tasks with hatching.

**3. Advanced level.** Create a "Gantt chart" Windows Forms application that saves the project to a JSON file, changes dates by dragging the bars with the mouse, draws dependencies as arrows, and prints the chart on several pages (`HasMorePages`).

### Variant 15. Drawing with the mouse {#v15}

**1. Initial level.** Create a Windows Forms application in which the user draws lines with the mouse; the lines are stored as lists of points and do not disappear after the window is resized.

**2. Basic level.** Create a "Brush" Windows Forms application in which the user draws lines with the mouse, the line width (1–30) is set with a `TrackBar` and the style with a `ComboBox`, the *Clear* button asks for confirmation, and **Ctrl+Z** undoes the last line.

**3. Advanced level.** Create a "Drawing" Windows Forms application in which the user draws with the mouse and the drawing accumulates in a `Bitmap`; the application supports 20 steps of undo and redo, an eraser, a background image, saving as PNG or JPEG, and warns about unsaved changes.

### Variant 16. Traffic light {#v16}

**1. Initial level.** Create a Windows Forms application that draws a traffic light of three circles: the active signal is filled, and the inactive ones are outlines; the signal is switched with a button.

**2. Basic level.** Create a `TrafficLight` custom control that draws a traffic light with three signals (the active one filled), with the `State` and `Interval` (1–60 s) properties with attributes for *Properties*, a `StateChanged` event, and automatic switching by a `Timer`.

**3. Advanced level.** Create an "Intersection" Windows Forms application with four coordinated `TrafficLight` custom controls (a three-signal traffic light with automatic switching), cars that stop at the signal, phase durations in a JSON file, and a switching log.

### Variant 17. Image mosaic {#v17}

**1. Initial level.** Create a Windows Forms application that opens an image via `OpenFileDialog` and shows it in the window preserving its proportions (`DrawImage`).

**2. Basic level.** Create a Windows Forms application that opens an image via `OpenFileDialog`, splits it into 4–64-pixel tiles, calculates the average color of the tiles with `GetPixel`, and draws a mosaic; an invalid file is reported without crashing.

**3. Advanced level.** Create a "Mosaic" Windows Forms application that converts an opened image into a mosaic of average-color tiles with the `LockBits` method, shows the original and the result side by side, offers square or round tiles, displays the processing time, and saves the result as PNG.

### Variant 18. Candlestick price chart {#v18}

**1. Initial level.** Create a Windows Forms application that draws a candlestick chart for 10 days (prices defined in the program): rising days as hollow candles and falling days as filled ones.

**2. Basic level.** Create a Windows Forms application that reads prices from a CSV file (date, open, high, low, close) with validation (the low is not greater and the high is not less than the other prices), draws a candlestick chart with axes and labels, and shows the data of the candle under the cursor.

**3. Advanced level.** Create a "Stock chart" Windows Forms application that draws a candlestick chart of prices from a CSV file (date, open, high, low, close) with zooming by the mouse wheel, scrolling by dragging, a moving average over a selected number of days, saving as PNG, and printing.

### Variant 19. Maze {#v19}

**1. Initial level.** Create a Windows Forms application that reads a maze from a text file (`#` is a wall, a space is a passage) and draws it as cells with hatched walls.

**2. Basic level.** Create a Windows Forms application that draws a maze from a text file (`#` is a wall, a space is a passage); a circle player moves through the maze with the arrow keys, does not pass through walls, steps are counted in the status bar, and reaching the exit ends the game with a message.

**3. Advanced level.** Create a "Maze" Windows Forms application that generates a maze of 5–60 cells using depth-first search, shows the shortest path as a dashed line, saves the maze to a file, and exports it to PNG.

### Variant 20. Thermometer {#v20}

**1. Initial level.** Create a Windows Forms application that draws a thermometer with a scale from −40 to 50 °C, tick marks every 5 °C, and a column at 22 °C.

**2. Basic level.** Create a `Thermometer` custom control that draws a thermometer with a scale and a column, with the `Value`, `Minimum`, `Maximum`, and `HighLimit` properties (range validation, attributes for *Properties*); the zone above `HighLimit` is hatched, and the value on the form is set by a `NumericUpDown`.

**3. Advanced level.** Create a "Weather station" Windows Forms application with three `Thermometer` custom controls (a scale with a column and a `HighLimit` limit), whose data is read from a CSV file (time and three temperatures) and played back by a `Timer`; an out-of-range event is written to a log, and the chart of changes is saved as PNG.

### Variant 21. Subway map {#v21}

**1. Initial level.** Create a Windows Forms application that draws three subway lines (solid, dashed, dash-dotted) with circle stations and names (coordinates defined in the program).

**2. Basic level.** Create a Windows Forms application that reads stations (name, coordinates) and lines from a text file with format validation, draws a subway map with circle stations and transfer stations as double circles, and highlights with a frame a station found by name.

**3. Advanced level.** Create a "Subway" Windows Forms application that draws a map of lines and stations from a file, finds a route with the fewest transfers between two stations selected with the mouse, highlights it with a thick line, shows the list of stations, and prints the map with the route.

### Variant 22. Time zone clocks {#v22}

**1. Initial level.** Create a Windows Forms application that draws three analog clocks with the current time in Kyiv, London, and Tokyo and city labels.

**2. Basic level.** Create a Windows Forms application that draws analog clocks with the current time in selected cities; the clocks are updated by a `Timer` without flicker, the cities (1–6) are selected from the `TimeZoneInfo` list, and nighttime is indicated by a dark dial.

**3. Advanced level.** Create a "World time" Windows Forms application with an `AnalogClock` custom control that draws an analog clock (the `TimeZone` and `ShowSeconds` properties), saving the selected cities to a JSON file, and a time converter between two cities.

### Variant 23. Image filters {#v23}

**1. Initial level.** Create a Windows Forms application that converts an opened image to grayscale with the `GetPixel` and `SetPixel` methods and shows the original and the result.

**2. Basic level.** Create a Windows Forms application that opens an image and applies the *Grayscale*, *Negative*, *Brightness* (−100…100), and *Threshold* (0–255) filters from a menu, shows the result next to the original, and shows the processing time in the status bar.

**3. Advanced level.** Create a "Photo editor" Windows Forms application that opens an image, applies filters (grayscale, negative, brightness, threshold) through `LockBits`, supports a chain of filters with undo, builds a brightness histogram, and saves the result as PNG or JPEG.

### Variant 24. Tetris game {#v24}

**1. Initial level.** Create a Windows Forms application that draws a 10 × 20 well and a "T" piece of four squares at the top.

**2. Basic level.** Create a "Tetris" Windows Forms game with a 10 × 20 well in which pieces fall driven by a `Timer`, move and rotate with keys with boundary checks, and full rows are removed with a row counter.

**3. Advanced level.** Create a "Tetris" Windows Forms game with a preview of the next piece, speed levels, a pause, a score, and a high-score table in a JSON file; the game logic is implemented in classes independent of the form.

### Variant 25. Venn diagram {#v25}

**1. Initial level.** Create a Windows Forms application that draws a Venn diagram for two sets: two circles with different hatching and the names of the sets.

**2. Basic level.** Create a Windows Forms application that draws a Venn diagram for two sets whose elements are entered separated by commas; the intersection and differences are shown in the corresponding areas, and the intersection area is highlighted using `Region.Intersect`.

**3. Advanced level.** Create a "Venn diagram" Windows Forms application that reads three sets from a file (each line is a name and elements separated by commas) and draws them as circles; clicking in an area (`Region.IsVisible`) shows its elements, the circles can be dragged, and the diagram is saved as PNG.

### Variant 26. Electrical circuit {#v26}

**1. Initial level.** Create a Windows Forms application that draws a circuit of a battery, a switch, a resistor, and a lamp connected by lines (the symbols are built from lines and shapes).

**2. Basic level.** Create a Windows Forms application in which electrical circuit elements (battery, switch, resistor, lamp) are chosen on a toolbar, placed with the mouse on a grid with a 20-pixel step, and dragged; each element is a descendant of an abstract class with a `Draw` method.

**3. Advanced level.** Create a "Circuit editor" Windows Forms application in which electrical circuit elements (battery, switch, resistor, lamp) are placed with the mouse and connected with lines, the lines move together with the elements, and the circuit is saved to a JSON file, exported to PNG, and printed.

### Variant 27. Participant badge {#v27}

**1. Initial level.** Create a Windows Forms application that draws a conference participant badge: a frame with rounded corners, the event name, the name, and the role.

**2. Basic level.** Create a Windows Forms application that draws a conference participant badge (frame, event name, name, role, photo); the name, role, and photo are entered on the form, a long name reduces the font (`MeasureString`), the photo is fitted preserving its proportions, and the badge is saved as PNG.

**3. Advanced level.** Create a "Badges" Windows Forms application that reads conference participants from a CSV file (name; role), generates badges (frame, event name, name, role) in batch as PNG at 300 dpi, and prints them 8 per A4 page with a preview.

### Variant 28. Pendulum {#v28}

**1. Initial level.** Create a Windows Forms application that draws a pendulum: a pivot point, a 200-pixel string, and a circular bob displaced by 30°.

**2. Basic level.** Create a Windows Forms application in which a pendulum swings according to the small-oscillation formula driven by a `Timer` without flicker, the length (0.1–5 m) and angle (1–60°) are set on the form, and the period is shown in the status bar.

**3. Advanced level.** Create a "Pendulum" Windows Forms application that simulates damped oscillations with a numerical method, lets you displace the bob with the mouse, draws a graph of angle versus time, and saves the data to CSV and the graph as PNG.

### Variant 29. Progress ring {#v29}

**1. Initial level.** Create a Windows Forms application that draws a progress ring: a light gray ring, a thick black arc for 65%, and the percentage text in the center.

**2. Basic level.** Create a `ProgressRing` custom control that draws a progress ring with an arc and percentage text, with the `Value` (0–100), `Thickness`, and `ShowText` properties with attributes for *Properties* and a `Completed` event; the value on the form is set by a `TrackBar`.

**3. Advanced level.** Create a "File copy" Windows Forms application with a `ProgressRing` custom control (a progress ring with percentage text) that smoothly animates value changes, has an indeterminate mode with a spinning arc, and shows the progress of copying a folder with a log in a file.

### Variant 30. Battleship {#v30}

**1. Initial level.** Create a Windows Forms application that draws a 10 × 10 grid with the labels A–J and 1–10 and five ships defined in the program as hatched cells.

**2. Basic level.** Create a Windows Forms application that draws a 10 × 10 "Battleship" grid with labels; ships are placed with the mouse with rule checks (they do not touch and do not go beyond the edges), and the space bar rotates a ship.

**3. Advanced level.** Create a "Battleship" Windows Forms game against the computer with two grids, shots with the mouse (a miss is a dot, a hit is a cross), saving the game to a JSON file, and game statistics.

## Procedure

1. Study the theory and worked examples.
2. Create a *Windows Forms App* (.NET 10) project for your variant; plan which data is stored in the form's fields and what is drawn in `OnPaint` or in a `Paint` handler.
3. Implement drawing in a separate method with a `Graphics` parameter so that it can be used for the window, a `Bitmap`, and printing; release pens, brushes, and fonts with the `using` statement.
4. Implement user interaction (mouse, keyboard, controls, timer) and input validation; for animation, enable double buffering.
5. Check that the drawing does not disappear after the window is minimized, scales correctly when resized, and is readable in grayscale.
6. Demonstrate the application to your instructor, explain the code, and answer the review questions.
