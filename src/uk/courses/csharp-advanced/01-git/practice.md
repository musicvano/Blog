---
title: "Практика"
description: "Тема 1. Керування версіями Git: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Журнал тренувань: `.gitignore`, `.gitattributes`, відновлення файлу

Створити консольну програму «Журнал тренувань» із записом `Workout` в окремому файлі та вести її в репозиторії Git. Показати, як виправити коміт, у який потрапили папки `bin` і `obj`, додати файл `.gitattributes` і відновити випадково видалений файл.

Файл `Workout.cs`:

```cs
namespace WorkoutLog;

public record Workout(DateOnly Date, string Kind, int Minutes);
```

Файл `Program.cs`:

```cs
using WorkoutLog;

Console.OutputEncoding = System.Text.Encoding.UTF8;

List<Workout> log =
[
    new(new DateOnly(2026, 9, 14), "Біг", 30),
    new(new DateOnly(2026, 9, 16), "Плавання", 45),
];

foreach (Workout w in log)
{
    Console.WriteLine($"{w.Date:dd.MM} {w.Kind,-10} {w.Minutes,3} хв");
}
Console.WriteLine($"Разом: {log.Sum(w => w.Minutes)} хв");
```

```
PS> dotnet run
14.09 Біг         30 хв
16.09 Плавання    45 хв
Разом: 75 хв
```

Після `dotnet run` у папці проєкту є `bin` і `obj`. Якщо створити репозиторій без `.gitignore` і виконати `git add .`, вони потрапляють у коміт: властивість `Count` масиву рядків, який PowerShell повертає для виводу `git ls-files`, показує 27 файлів замість трьох.

```
PS> git init
Initialized empty Git repository in D:/Labs/WorkoutLog/.git/

PS> git add .
PS> git commit -q -m "Create workout log"
PS> (git ls-files).Count
27
```

Щоб виправити помилку, створюємо `.gitignore`, прибираємо папки з індексу (але не з диска) командою `git rm -r --cached` і фіксуємо обидві зміни одним комітом. Ключ `-q` (*quiet*) прибирає довгий перелік видалених файлів:

```
PS> dotnet new gitignore
The template "dotnet gitignore file" was created successfully.
```

```
PS> git rm -r -q --cached bin obj
PS> git add .gitignore
PS> git commit -q -m "Stop tracking build output"
PS> git ls-files
.gitignore
Program.cs
Workout.cs
WorkoutLog.csproj
```

Файли збірки зникли з репозиторію (але залишилися в історії першого коміту). Далі додаємо `.gitattributes` і перевіряємо кінці рядків: `i/lf` означає LF в індексі, `w/crlf` – CRLF у робочому файлі:

```
PS> dotnet new gitattributes
The template "dotnet gitattributes file" was created successfully.

PS> git add .gitattributes
PS> git commit -m "Add .gitattributes"
[main 7f3d4cb] Add .gitattributes
 1 file changed, 107 insertions(+)
 create mode 100644 .gitattributes
```

```
PS> git ls-files --eol
i/lf    w/crlf  attr/text=auto          .gitattributes
i/lf    w/crlf  attr/text=auto          .gitignore
i/lf    w/crlf  attr/text               Program.cs
i/lf    w/crlf  attr/text               Workout.cs
i/lf    w/crlf  attr/text=auto          WorkoutLog.csproj
```

Нарешті «випадково» видаляємо `Workout.cs`. Збірка тепер завершується помилкою CS0246 (простір імен `WorkoutLog` не знайдено), а `git status` показує видалений файл (`D`). Оскільки файл є в останньому коміті, його повертає `git restore`:

```
PS> git status --short
 D Workout.cs

PS> git restore Workout.cs
PS> git status
On branch main
nothing to commit, working tree clean
```

Файл, видалений кілька комітів тому, відновлюють з потрібного коміту: `git restore --source <коміт> <файл>`.

## Приклад 2. Курси валют: `git stash`, `git cherry-pick`, `git rebase`

Програма «Курси валют» переводить суму в гривнях (аргумент командного рядка, за замовчуванням 1000) в інші валюти. У першій версії курс євро записано з помилкою (`4.78m` замість `47.80m`). Розробник у гілці `feature/table` переробляє виведення на таблицю, коли надходить повідомлення про помилку. Потрібно: сховати незавершену роботу, виправити помилку в `main`, продовжити роботу в гілці, перенести з гілки в `main` лише файл `README.md` і перебазувати гілку на оновлений `main`.

```
PS> git switch -c feature/table
Switched to a new branch 'feature/table'

PS> git status --short
 M Program.cs

PS> git stash push -m "Table output"
Saved working directory and index state On feature/table: Table output
```

```
PS> git switch main
Switched to branch 'main'
```

Робочий каталог чистий, тому в `main` виправляємо курс і комітимо, після чого повертаємо схованку:

```
PS> git commit -am "Fix EUR rate"
[main 5c0d352] Fix EUR rate
 1 file changed, 1 insertion(+), 1 deletion(-)

PS> git switch feature/table
Switched to branch 'feature/table'
```

```
PS> git stash pop
On branch feature/table
...
Dropped refs/stash@{0} (d5f600ba3180c5add08bf9c3f1dc960cea590d61)

PS> git commit -am "Print rates as table"
[feature/table c143403] Print rates as table
 1 file changed, 3 insertions(+), 1 deletion(-)
```

У гілці також створено `README.md` з описом запуску. Він потрібен у `main` уже зараз, тому переносимо лише цей коміт. Вказана назва гілки означає її останній коміт:

```
PS> git add README.md
PS> git commit -m "Add README"
[feature/table 95faaef] Add README
 1 file changed, 3 insertions(+)
 create mode 100644 README.md

PS> git switch main
Switched to branch 'main'
```

```
PS> git cherry-pick feature/table
[main 789b9d2] Add README
 Date: Thu Sep 17 10:35:11 2026 +0300
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
```

Щоб гілка містила виправлений курс, перебазовуємо її на `main`. Git помічає, що коміт `Add README` уже є в `main` (як `789b9d2`), і пропускає його, тому в гілці залишається лише таблиця:

```
PS> git switch feature/table
Switched to branch 'feature/table'

PS> git rebase main
warning: skipped previously applied commit 95faaef
hint: use --reapply-cherry-picks to include skipped commits
...
Successfully rebased and updated refs/heads/feature/table.
```

```
PS> git log --oneline --graph --all
* 946dc78 Print rates as table
* 789b9d2 Add README
* 5c0d352 Fix EUR rate
* be5ce53 Create currency converter
```

Історія стала лінійною. Після `git switch main` і `git merge feature/table` гілку зливають перемотуванням. Програма з таблицею та виправленим курсом:

```
PS> dotnet run -- 5000
Сума: 5 000,00 грн
Валюта        Курс     Отримаєте
USD          41,25        121,21
EUR          47,80        104,60
PLN          11,20        446,43
```

## Приклад 3. Робота в парі: порожній репозиторій, перегляд гілки, конфлікт і випуск

Двоє студентів (Олена й Андрій) разом розробляють програму «Розклад консультацій». Спільний репозиторій – порожній репозиторій на диску, у кожного учасника свій клон. Андрій додає номер аудиторії в гілці, Олена переглядає й зливає гілку, розв’язує конфлікт і випускає версію 1.0.0.

Програма виводить заголовок «Консультації з ООП:» і для кожного дня з масиву `string[] days = ["Понеділок", "Середа", "П’ятниця"];` рядок `Console.WriteLine($"{day}: 14:00–15:00");`.

Олена створює порожній репозиторій і надсилає перший коміт:

```
PS> git init --bare D:\Labs\remote\Consultations.git
Initialized empty Git repository in D:/Labs/remote/Consultations.git/

PS> git remote add origin D:\Labs\remote\Consultations.git
PS> git push -u origin main
To D:\Labs\remote\Consultations.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Андрій клонує репозиторій у свою папку, задає в клоні своє ім’я (`git config user.name`, `git config user.email`), змінює рядок виведення на `"{day}: 14:00–15:00, ауд. 305"` у гілці й надсилає її:

```
PS> git clone D:\Labs\remote\Consultations.git
Cloning into 'Consultations'...
done.

PS> git switch -c feature/room
Switched to a new branch 'feature/room'
```

```
PS> git commit -am "Show room number"
[feature/room 2ddd122] Show room number
 1 file changed, 1 insertion(+), 1 deletion(-)

PS> git push -u origin feature/room
To D:\Labs\remote\Consultations.git
 * [new branch]      feature/room -> feature/room
branch 'feature/room' set up to track 'origin/feature/room'.
```

Тим часом Олена додала в `main` прізвище викладача в тому самому рядку й надіслала коміт. Тепер вона отримує гілку Андрія та переглядає її:

```
PS> git commit -am "Show teacher name"
[main a7f2b7c] Show teacher name
 1 file changed, 1 insertion(+), 1 deletion(-)

PS> git push
To D:\Labs\remote\Consultations.git
   423bf38..a7f2b7c  main -> main
```

```
PS> git fetch
From D:\Labs\remote\Consultations
 * [new branch]      feature/room -> origin/feature/room

PS> git log --oneline main..origin/feature/room
2ddd122 Show room number
```

Команда `git diff main...origin/feature/room` показує єдину зміну гілки – рядок виведення з номером аудиторії.

Зміни прийнято, але злиття зупиняється конфліктом, бо обидва учасники змінили той самий рядок:

```
PS> git merge origin/feature/room
Auto-merging Program.cs
CONFLICT (content): Merge conflict in Program.cs
Automatic merge failed; fix conflicts and then commit the result.
```

```cs
foreach (string day in days)
{
<<<<<<< HEAD
    Console.WriteLine($"{day}: 14:00–15:00 (Коваль О.)");
=======
    Console.WriteLine($"{day}: 14:00–15:00, ауд. 305");
>>>>>>> origin/feature/room
}
```

Олена залишає обидві зміни в одному рядку `Console.WriteLine($"{day}: 14:00–15:00, ауд. 305 (Коваль О.)");`. Те саме можна зробити у Visual Studio: *Git Changes → Unmerged Changes*, подвійне клацання на `Program.cs`, у редакторі злиття позначити обидва фрагменти, відредагувати рядок у панелі *Result* і натиснути *Accept Merge*. Далі – коміт злиття та перевірка:

```
PS> git add Program.cs
PS> git commit --no-edit
[main a6af62f] Merge remote-tracking branch 'origin/feature/room'

PS> dotnet run
Консультації з ООП:
Понеділок: 14:00–15:00, ауд. 305 (Коваль О.)
Середа: 14:00–15:00, ауд. 305 (Коваль О.)
П’ятниця: 14:00–15:00, ауд. 305 (Коваль О.)
```

Для випуску Олена створює файл `CHANGELOG.md` із заголовком «Журнал змін» і розділом «1.0.0 – 2026-09-17» з переліком можливостей версії, комітить його, ставить анотований тег і надсилає `main` разом із тегом (`--follow-tags`), а потім видаляє злиту гілку на сервері:

```
PS> git add CHANGELOG.md
PS> git commit -m "Add changelog for 1.0.0"
[main 848bdd1] Add changelog for 1.0.0
 1 file changed, 6 insertions(+)
 create mode 100644 CHANGELOG.md
```

```
PS> git tag -a v1.0.0 -m "Release 1.0.0"
PS> git push --follow-tags
To D:\Labs\remote\Consultations.git
   a7f2b7c..848bdd1  main -> main
 * [new tag]         v1.0.0 -> v1.0.0

PS> git push origin --delete feature/room
To D:\Labs\remote\Consultations.git
 - [deleted]         feature/room
```

```
PS> git log --oneline --graph
* 848bdd1 Add changelog for 1.0.0
*   a6af62f Merge remote-tracking branch 'origin/feature/room'
|\
| * 2ddd122 Show room number
* | a7f2b7c Show teacher name
|/
* 423bf38 Create consultation schedule
```

Андрій оновлює свій клон командою `git pull` (перемотування до `848bdd1` разом із тегом `v1.0.0`), видаляє злиту локальну гілку командою `git branch -d feature/room` і посилання на видалену віддалену гілку командою `git fetch --prune`.
