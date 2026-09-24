---
title: "Tasks"
description: "Topic 14. WPF animation and multimedia: task variants"
outline: [2, 3]
sourceHash: "2ba767ac4dafaa1538b016977aafca143c2b42799044acf3a13f2d7d276eb385"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Pendulum clock {#v1}

**1. Initial level.** Create a WPF application in which a pendulum (a line with a ball at the end) continuously swings from −30° to 30° around its pivot point using a `RotateTransform`, `AutoReverse`, and the `SineEase` easing function.

**2. Basic level.** Create a WPF "Pendulum clock" application in which the hands of the clock face show the current time, the pendulum swings with a period of 2 s, and every extreme position of the pendulum is accompanied by a ticking sound from a WAV file; a button mutes the sound.

**3. Advanced level.** Create a WPF "Pendulum clock" application in which the pendulum period (0.5–4 s) and the volume are chosen with sliders with validation, the hands move smoothly (`CompositionTarget.Rendering`), there is an alarm mode with a melody from a file, and the settings are saved to a JSON file and restored at startup; file read errors are shown in the status bar.

### Variant 2. Traffic light {#v2}

**1. Initial level.** Create a WPF application in which a traffic light of three circles (top, middle, bottom) cycles through the signals with a key-frame `Storyboard`: the active signal is bright, and the inactive ones are semi-transparent (`Opacity` 0.2).

**2. Basic level.** Create a WPF "Traffic light" application with three circles cycled by a key-frame `Storyboard`; the duration of each signal (1–30 s) is entered in fields with validation, the storyboard is rebuilt with the *Apply* button, the top signal blinks three times before turning off, and a short sound is played at every signal change.

**3. Advanced level.** Create a WPF "Intersection" application with two traffic lights for cars and a pedestrian light, "normal", "night" (the middle signal blinks), and "manual" (a pedestrian button) modes, an animated countdown timer, sound signals for pedestrians, and a log of mode changes in a text file.

### Variant 3. Podcast audio player {#v3}

**1. Initial level.** Create a WPF application that opens an audio file through `OpenFileDialog` and plays it with the `MediaPlayer` class with *Play*, *Pause*, and *Stop* buttons and shows the duration after the `MediaOpened` event.

**2. Basic level.** Create a WPF "Podcasts" application that plays audio files with the `MediaPlayer` class, with a playlist (files are added through `OpenFileDialog`), *Play*, *Pause*, *Stop* buttons, a position slider updated by a `DispatcherTimer`, a choice of playback speed 0.75–2 (`SpeedRatio`), buttons for skipping 15 s back and 30 s forward, and handling of `MediaFailed`.

**3. Advanced level.** Create a WPF "Podcasts" application that plays audio files from a list with the `MediaPlayer` class, stores named position bookmarks and the last playback position for each file in a JSON file, resumes listening from where it stopped, lets you jump to a bookmark with a double-click, and shows an animated indicator during playback.

### Variant 4. Photo slide show {#v4}

**1. Initial level.** Create a WPF application that shows five images from the program folder in turn every 3 s, changing them with a smooth opacity transition (a `DoubleAnimation` for `Opacity`).

**2. Basic level.** Create a WPF "Slide show" application that loads all images of a selected folder through `BitmapImage` with `DecodePixelWidth`, shows them with a choice of "fade" or "zoom" (`ScaleTransform`) transitions, has pause, previous, and next slide buttons, and reports if the folder contains no images.

**3. Advanced level.** Create a WPF "Slide show" application that shows the images of a selected folder with smooth transitions, background music (`MediaPlayer`, repeating after `MediaEnded`), a slow pan-and-zoom effect, a configurable slide duration, a full-screen mode (**F11**), keyboard control, and saving of the slide list with captions to a file.

### Variant 5. Animated speedometer {#v5}

**1. Initial level.** Create a WPF application in which the needle of a speedometer (a 0–200 km/h scale) smoothly turns to the value chosen with a slider by animating the angle of a `RotateTransform`.

**2. Basic level.** Create a WPF "Speedometer" application with a scale with ticks and labels drawn with shapes, a needle with the `ElasticEase` easing function, a speed input field with range validation, and a blinking "speeding" mark above 120 km/h.

**3. Advanced level.** Create a WPF "Dashboard" application with a speedometer and a tachometer that replay a trip from a CSV file (time, speed, RPM) with a step of 0.1 s, with pause and fast-forward (`SpeedRatio`) buttons, a time slider, a speeding sound signal, and final trip statistics.

### Variant 6. "Catch the star" game {#v6}

**1. Initial level.** Create a WPF application in which a star (`Polygon`) appears at a random place on the canvas, smoothly grows, and disappears within 2 s; clicking the star increases the score.

**2. Basic level.** Create a WPF "Catch the star" application in which several stars fall from above at different speeds (frame-by-frame animation with `CompositionTarget.Rendering`), a star caught with a click disappears with a scale animation and a sound, missed stars reduce the number of lives, and the score shows the stars caught.

**3. Advanced level.** Create a WPF "Catch the star" game in which stars fall from above and are caught with a click, with difficulty levels, game acceleration, bonus stars, a pause with the **Space** key, background music that can be turned off, an animated game-over screen, and a top ten high score table in a JSON file.

### Variant 7. Planetary motion model {#v7}

**1. Initial level.** Create a WPF application in which a planet moves along an elliptical orbit around a star; the position is calculated in a `CompositionTarget.Rendering` handler from the frame time.

**2. Basic level.** Create a WPF "Planetary system" application with four planets on elliptical orbits, name labels that move together with the planets, a time scale slider (0.1–10), and a pause button.

**3. Advanced level.** Create a WPF "Planetary system" application that reads planet parameters (name, semi-major axis, eccentricity, period, radius) from a JSON file with validation, shows orbit trails, zooms with the mouse wheel, displays data about the planet under the cursor, and shows a counter of model days.

### Variant 8. Lecture video player {#v8}

**1. Initial level.** Create a WPF application that plays your own video file from the program folder in a `MediaElement` (`LoadedBehavior="Manual"`) with *Play*, *Pause*, and *Stop* buttons.

**2. Basic level.** Create a WPF "Video lectures" application that plays a selected video file in a `MediaElement` with *Play*, *Pause*, *Stop* buttons, a position slider, a "current / total" time display, a volume slider, a mute button, and a message if the file fails to open (`MediaFailed`).

**3. Advanced level.** Create a WPF "Video lectures" application that plays a lecture video in a `MediaElement`, reads the lecture's chapters with timecodes from a text file (`00:12:30 Introduction`), shows them as a list and jumps to the selected chapter, highlights the current chapter during playback, has a full-screen mode, and remembers the viewing position of each video.

### Variant 9. Animated restaurant menu {#v9}

**1. Initial level.** Create a WPF application with a list of menu categories in which clicking a category smoothly expands or collapses the list of its dishes with a height animation.

**2. Basic level.** Create a WPF "Restaurant menu" application with dish cards (name, price; defined in code) and a cart, in which the cards grow under the cursor (an `IsMouseOver` trigger with `EnterActions` and `ExitActions`), adding a dish to the order is accompanied by an animation of the card "flying" to the cart, and the total counts up to the new value with an animation.

**3. Advanced level.** Create a WPF "Restaurant menu" application with categories and dishes from a JSON file, a custom category button template with `VisualStateManager` states (`MouseOver`, `Pressed`), a price filter, a cart with quantity changes and a row removal animation, and saving of the order to a text file.

### Variant 10. Metronome {#v10}

**1. Initial level.** Create a WPF application in which a metronome arm swings at 60 beats per minute, and a WAV sound is played with the `SoundPlayer` class at each extreme position.

**2. Basic level.** Create a WPF "Metronome" application whose arm swings in time and plays a sound at each extreme position, with a choice of tempo 40–208 beats per minute with a slider and a validated field, a time signature of 2/4, 3/4, or 4/4, a separate sound for the first beat, and a *Tap* button that determines the tempo from the intervals between presses.

**3. Advanced level.** Create a WPF "Practice metronome" application with an animated arm and a sound for every beat, a list of exercises (name, tempo, number of bars), automatic gradual tempo increase, an animated beat indicator, saving of practice programs to a JSON file, and statistics of practice time.

### Variant 11. Aquarium {#v11}

**1. Initial level.** Create a WPF application in which a fish (a `Path` shape) swims across the aquarium to the right and back, turning around as a mirror image (`ScaleTransform ScaleX="-1"`) at the end of the path.

**2. Basic level.** Create a WPF "Aquarium" application in which fish move along curved paths (`MatrixAnimationUsingPath` with rotation along the tangent), bubbles rise with a random delay, and clicking the canvas adds a new fish at that place.

**3. Advanced level.** Create a WPF "Aquarium" application with different kinds of fish at different speeds, feeding (food falls, the fish swim to the nearest piece, frame-by-frame animation), a satiety counter, background water sounds, a pause, and saving of the aquarium state to a file.

### Variant 12. Dice for board games {#v12}

**1. Initial level.** Create a WPF application in which the *Roll* button "throws" a die: the die rotates and bounces with a key-frame animation and then shows a random value 1–6 as pips.

**2. Basic level.** Create a WPF "Dice" application in which a button throws dice (1–5 of them): the dice simultaneously rotate and bounce with animations of different durations, then show random values as pips; the application prints the total, plays a throwing sound, and shows the history of the last 20 throws in a list.

**3. Advanced level.** Create a WPF "Dice" application with an animated dice throw (rotation, bouncing, pip values), named players and a turn order, statistics of the frequency of each value as bars with a growth animation, undo of the last throw, and saving of the game history to a CSV file.

### Variant 13. Reaction trainer {#v13}

**1. Initial level.** Create a WPF application that after a random delay of 1–4 s shows a shape flash (a scale and opacity animation) and measures the time until the **Space** key is pressed.

**2. Basic level.** Create a WPF "Reaction trainer" application that after a random delay shows a shape flash (a scale and opacity animation) and measures the time until the **Space** key is pressed, with a series of 10 attempts, shapes of different forms at random places, a penalty for pressing too early, a flash sound, and a summary table: the best, worst, and average time.

**3. Advanced level.** Create a WPF "Reaction trainer" application that shows animated shape flashes and measures the reaction time, with a choice mode (press only for circles, ignore squares), difficulty levels, saving of user results to a JSON file, and a progress chart whose bars appear with an animation.

### Variant 14. Music box {#v14}

**1. Initial level.** Create a WPF application with an eight-key piano keyboard in which clicking a key animates the key press (a `TranslateTransform` down and back) and plays the note's sound from a WAV file.

**2. Basic level.** Create a WPF "Piano" application with an eight-key keyboard whose keys are pressed with the mouse or keyboard keys (**A**–**K**) with a press animation (`TranslateTransform`) and play the note's sound from a WAV file; several sounds can play at the same time (a separate `MediaPlayer` for each note), and if a sound file is missing, the key is marked and a message is shown.

**3. Advanced level.** Create a WPF "Music box" application with a piano keyboard (note sounds from WAV files, a press animation) that records the melody played (notes and pauses), plays it back with key animation, saves and opens melodies in the text format `C4 0.5; E4 0.25` with line validation, and lets you change the playback tempo.

### Variant 15. Animated sales chart {#v15}

**1. Initial level.** Create a WPF application that shows a bar chart of sales for 6 months; the bars grow from zero to the value with the `CubicEase` easing function.

**2. Basic level.** Create a WPF "Sales" application with a bar chart of monthly sales for several years (the data is defined in code) and switching between years with buttons; the bars smoothly change height from the old values to the new ones (an animation with `To` only), and the value labels above the bars count up to the new numbers with an animation.

**3. Advanced level.** Create a WPF "Sales" application that reads data from a CSV file (year, month, amount), skipping invalid lines, shows a bar or line chart with an animated transition and a tooltip with the value under the cursor, and saves the current chart to PNG (`RenderTargetBitmap`).

### Variant 16. Karaoke player {#v16}

**1. Initial level.** Create a WPF application that plays an audio file and shows the song lyrics, gradually scrolling them with a `TranslateTransform` animation over the duration of the song.

**2. Basic level.** Create a WPF "Karaoke" application that plays a song's audio file with the `MediaPlayer` class, reads the lyrics with timestamps (`[00:12.5] line`), highlights the current line by enlarging the font and making it bold based on the playback position, and smoothly scrolls the list so that the current line is in the middle.

**3. Advanced level.** Create a WPF "Karaoke" application that plays songs from a list and highlights the current lyrics line by timestamps, with a timestamp editor (a button sets the timestamp of the current line during playback), a check of the timestamp order, saving of the lyrics to a file, and a position slider, after moving which the highlight jumps to the corresponding line.

### Variant 17. Wheel of fortune {#v17}

**1. Initial level.** Create a WPF application with a wheel of eight labeled sectors that, after a button is clicked, spins by a random angle with `CubicEase EaseOut` deceleration.

**2. Basic level.** Create a WPF "Wheel of fortune" application with labeled sectors (2–12, entered as a list with validation) that, after a button is clicked, spins by a random angle with deceleration and, after stopping, determines the sector under the pointer from the final angle, shows its name with an animation, and plays a sound.

**3. Advanced level.** Create a WPF "Wheel of fortune" application that spins with deceleration and determines the sector under the pointer, with sector weights (probability proportional to the weight), a "click" sound as each sector passes, a history of results, a mode that removes the winning sector, and saving of sector sets to a JSON file.

### Variant 18. Spring pendulum model {#v18}

**1. Initial level.** Create a WPF application in which a weight on a spring oscillates up and down; the position is calculated in a `CompositionTarget.Rendering` handler by the harmonic oscillation formula, and the spring is stretched with a `ScaleTransform`.

**2. Basic level.** Create a WPF "Spring pendulum" application with sliders for mass (0.1–5 kg), stiffness (1–100 N/m), and damping coefficient, a numerical solution of the equation of motion over the frame time, a display of the period, and a restart button.

**3. Advanced level.** Create a WPF "Spring pendulum" application in which a weight on a spring oscillates according to a numerical solution of the equation of motion, with real-time charts of the coordinate and the kinetic and potential energy (`Polyline`), dragging the weight with the mouse to set the initial displacement, a pause, export of simulation data to a CSV file, and a comparison of the period with the theoretical one.

### Variant 19. Animated onboarding {#v19}

**1. Initial level.** Create a WPF application with three welcome pages between which the *Next* and *Back* buttons switch with a page slide animation to the right or left.

**2. Basic level.** Create a WPF "Onboarding" application with five pages, a step indicator (the active dot smoothly grows), switching with the arrow keys, a *Skip* button, and a final page with an animation in which the elements appear one after another (`BeginTime`).

**3. Advanced level.** Create a WPF "Onboarding" application with welcome pages (title, text, image) read from a JSON file with validation and switched with buttons with a slide animation and by dragging with the mouse, with a video clip on one of the pages (`MediaElement`) and saving in a settings file that onboarding has been completed.

### Variant 20. Alarm clock {#v20}

**1. Initial level.** Create a WPF application in which a melody from a WAV file is played at a given time (the hour and minute are entered in fields), and a bell icon swings with a rotation animation.

**2. Basic level.** Create a WPF "Alarm clock" application with several alarms in a list, a choice of melody from the `Sounds` folder, a 5-minute snooze button, a smooth increase of the melody volume (`MediaPlayer.Volume` on a timer), and validation of the entered time.

**3. Advanced level.** Create a WPF "Alarm clock" application with alarms by day of the week, an animated clock face, preview of melodies, saving of alarms to a JSON file, a message if the melody file is missing, and a log of alarms that went off.

### Variant 21. Ping-pong game {#v21}

**1. Initial level.** Create a WPF application in which a ball moves across the field and bounces off the walls; the position is calculated in a `CompositionTarget.Rendering` handler from the frame time.

**2. Basic level.** Create a WPF "Ping-pong" application for two players (the paddles are controlled with the **W** and **S** keys and the arrow keys) with the ball bouncing off the paddles at a changing angle, a hit sound, a score, and an animated goal message.

**3. Advanced level.** Create a WPF "Ping-pong" application with a mode for playing against the computer at three difficulty levels, gradual acceleration of the ball, a pause, a game to a given number of points, an animated winner screen, and a results table in a file.

### Variant 22. Soundboard {#v22}

**1. Initial level.** Create a WPF application with six sound effect buttons, each of which plays its own WAV file and pulses with a scale animation during playback.

**2. Basic level.** Create a WPF "Soundboard" application with sound effect buttons, each of which plays its own WAV file; sounds can play at the same time (`MediaPlayer`), each button has its own volume slider and an animated level indicator during playback, and a separate button stops all sounds.

**3. Advanced level.** Create a WPF "Soundboard" application with buttons that play the sound files assigned to them with an animation during playback; sounds are assigned to buttons by dragging files onto a button, the assignments and volumes are saved to a JSON file, the buttons are triggered with the hotkeys **1**–**9**, and unsupported files are rejected with a message.

### Variant 23. Traffic animation {#v23}

**1. Initial level.** Create a WPF application in which a car (a rectangle) moves along a road following a curved `PathGeometry` path, turning in the direction of motion (`MatrixAnimationUsingPath`).

**2. Basic level.** Create a WPF "Intersection" application in which cars appear at an interval and move along two roads, stop before a traffic light on a red signal (frame-by-frame animation), and continue on a green signal.

**3. Advanced level.** Create a WPF "Road traffic" application in which cars move along roads through an intersection with traffic lights (frame-by-frame animation) and keep their distance to the car ahead, the traffic intensity and signal durations are set with sliders, collisions are detected by rectangle intersection and marked with an animation and a sound, and throughput statistics are saved to a file.

### Variant 24. Travel video album {#v24}

**1. Initial level.** Create a WPF application that shows thumbnails of videos from the program folder (a `MediaElement` frame at the start of the file) and plays the selected video in a large window.

**2. Basic level.** Create a WPF "Video album" application that shows thumbnails of the video files of a selected folder (`MediaElement`) and plays the selected video in a large window; when the cursor hovers over a thumbnail, it grows and starts a silent preview, stops when the cursor leaves, and a placeholder label is shown for files that fail to open.

**3. Advanced level.** Create a WPF "Video album" application with videos grouped by trip from a JSON description file, captions and dates, a year filter, full-screen viewing with a position slider, and saving of favorite videos.

### Variant 25. Kitchen timer {#v25}

**1. Initial level.** Create a WPF application in which a countdown timer shows ring progress (a `Path` arc) that shrinks over the given time and plays a signal at the end.

**2. Basic level.** Create a WPF "Kitchen timer" application with a countdown and ring progress (a `Path` arc), in which the time is entered in the `mm:ss` format with validation, there are pause and reset buttons, the digits pulse during the last 10 s, and the signal at the end repeats until the user clicks *Stop*.

**3. Advanced level.** Create a WPF "Kitchen timers" application with several simultaneous named timers (adding and removing with an animation), a separate melody for each, dish presets from a JSON file, and a completion notification on top of other windows.

### Variant 26. Brownian motion {#v26}

**1. Initial level.** Create a WPF application in which 50 particles move chaotically in a rectangle and bounce off the walls; the positions are calculated in `CompositionTarget.Rendering`.

**2. Basic level.** Create a WPF "Brownian motion" application with one large particle among 200 small ones, elastic collisions, a "temperature" slider (the speed of the small particles), a trail of the large particle's trajectory, and a frames-per-second counter.

**3. Advanced level.** Create a WPF "Brownian motion" application with one large particle among many small ones that move chaotically and collide elastically, with a collision counter, a chart of the mean square displacement of the large particle over time, pause and step-by-step modes, optimization (frozen brushes, a single `DrawingVisual` or a `WriteableBitmap`), and export of data to a CSV file.

### Variant 27. Interactive museum map {#v27}

**1. Initial level.** Create a WPF application with a museum plan of five halls drawn as shapes, in which the hall under the cursor is highlighted with an opacity animation and a click shows the hall name.

**2. Basic level.** Create a WPF "Museum map" application with a plan of halls drawn as shapes, in which clicking a hall smoothly zooms the plan to that hall (`ScaleTransform` and `TranslateTransform`), shows a description, and plays the hall's audio guide from a WAV or MP3 file with pause and stop buttons.

**3. Advanced level.** Create a WPF "Museum" application whose plan (halls as `Path` shapes and their descriptions) is read from a JSON file with validation, with a tour route with an animated visitor marker moving between halls, automatic start of the audio guide in each hall, and marking of halls already listened to.

### Variant 28. Memory game {#v28}

**1. Initial level.** Create a WPF application with a 4 × 4 field of cards that flip on a click with a `ScaleTransform` animation (shrink, change side, unfold).

**2. Basic level.** Create a WPF "Memory" application with a 4 × 4 field of cards that flip on a click with a `ScaleTransform` animation: two cards are revealed, a matching pair stays open with a success sound, and different cards flip back after 1 s; a move counter and a timer show the result after the game ends.

**3. Advanced level.** Create a WPF "Memory" application with 4 × 4 and 6 × 6 field sizes, image sets from folders, a shuffle animation at the start, high scores for each size in a JSON file, and the ability to continue a saved game.

### Variant 29. Donation counter {#v29}

**1. Initial level.** Create a WPF application with a fundraising progress bar toward a goal of 100,000 UAH that fills smoothly after a new donation is entered, and an animated total counter.

**2. Basic level.** Create a WPF "Fundraiser" application with a progress bar toward the goal that fills smoothly, in which donations are entered with validation (a positive amount) and added to a list with an appearance animation, and after the goal is reached a "confetti" animation of falling particles starts and a sound is played.

**3. Advanced level.** Create a WPF "Fundraiser" application with several fundraisers, intermediate goals with marks on the progress bar, import of donations from a CSV file skipping invalid lines, statistics by day, and saving of data to a JSON file.

### Variant 30. Breathing trainer {#v30}

**1. Initial level.** Create a WPF application in which a circle smoothly grows for 4 s (inhale) and shrinks for 4 s (exhale) with a label of the current phase, repeating continuously.

**2. Basic level.** Create a WPF "Breathing trainer" application in which a circle smoothly grows (inhale) and shrinks (exhale) with a label of the current phase, with a choice of pattern (4-4, 4-7-8, "box" 4-4-4-4) with hold phases, a key-frame storyboard, a sound cue at the start of each phase, and a cycle counter.

**3. Advanced level.** Create a WPF "Breathing trainer" application with custom patterns (phases and durations) in a JSON file with validation, a session duration, background music that fades out at the end, pausing and resuming the storyboard, and a session log.

## Procedure

1. Study the theory and the worked examples.
2. Create a *WPF Application* project (.NET 10) for your variant; decide which motions are known in advance (storyboards) and which are calculated in every frame (`CompositionTarget.Rendering`).
3. Describe the markup in XAML and the animations in resources and triggers or in code; use `RenderTransform` for movement, rotation, and scaling.
4. Prepare your own media files or freely licensed files from an official source, set *Content* and *Copy if newer* for them, and handle the `MediaFailed` event.
5. Check the smoothness of the animations, the pause, stop, and replay behavior, and the behavior after the window is resized; make sure the motion is understandable without color.
6. Demonstrate the application to the instructor, explain the code, and answer the review questions.
