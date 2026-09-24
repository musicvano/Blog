---
title: "Practice"
description: "Topic 1. Git version control: worked examples"
outline: [2, 3]
sourceHash: "4c17870e825aef06ad47c43dcf4f5feb9e62eb5fc2655a9761f2a9d2050e0f98"
---

# Practice

## Example 1. Workout log: `.gitignore`, `.gitattributes`, restoring a file

Create a "Workout log" console program with a `Workout` record in a separate file and keep it in a Git repository. Show how to fix a commit that included the `bin` and `obj` folders, add a `.gitattributes` file, and restore an accidentally deleted file.

The `Workout.cs` file:

```cs
namespace WorkoutLog;

public record Workout(DateOnly Date, string Kind, int Minutes);
```

The `Program.cs` file:

```cs
using WorkoutLog;

Console.OutputEncoding = System.Text.Encoding.UTF8;

List<Workout> log =
[
    new(new DateOnly(2026, 9, 14), "Running", 30),
    new(new DateOnly(2026, 9, 16), "Swimming", 45),
];

foreach (Workout w in log)
{
    Console.WriteLine($"{w.Date:dd.MM} {w.Kind,-10} {w.Minutes,3} min");
}
Console.WriteLine($"Total: {log.Sum(w => w.Minutes)} min");
```

```
PS> dotnet run
14.09 Running     30 min
16.09 Swimming    45 min
Total: 75 min
```

After `dotnet run`, the project folder contains `bin` and `obj`. If you create a repository without `.gitignore` and run `git add .`, they end up in the commit: the `Count` property of the string array that PowerShell returns for the `git ls-files` output shows 27 files instead of three.

```
PS> git init
Initialized empty Git repository in D:/Labs/WorkoutLog/.git/

PS> git add .
PS> git commit -q -m "Create workout log"
PS> (git ls-files).Count
27
```

To fix the mistake, we create `.gitignore`, remove the folders from the index (but not from disk) with `git rm -r --cached`, and record both changes in one commit. The `-q` (*quiet*) option suppresses the long list of removed files:

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

The build files have disappeared from the repository (but remain in the history of the first commit). Next, we add `.gitattributes` and check line endings: `i/lf` means LF in the index, and `w/crlf` means CRLF in the working file:

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

Finally, we "accidentally" delete `Workout.cs`. The build now fails with error CS0246 (the `WorkoutLog` namespace cannot be found), and `git status` shows the deleted file (`D`). Since the file is in the last commit, `git restore` brings it back:

```
PS> git status --short
 D Workout.cs

PS> git restore Workout.cs
PS> git status
On branch main
nothing to commit, working tree clean
```

A file deleted several commits ago is restored from the required commit: `git restore --source <commit> <file>`.

## Example 2. Exchange rates: `git stash`, `git cherry-pick`, `git rebase`

The "Exchange rates" program converts an amount in hryvnias (a command-line argument, 1000 by default) into other currencies. In the first version, the euro rate was entered incorrectly (`4.78m` instead of `47.80m`). A developer is reworking the output into a table in the `feature/table` branch when a bug report arrives. You need to: stash the unfinished work, fix the bug in `main`, continue working in the branch, move only the `README.md` file from the branch into `main`, and rebase the branch onto the updated `main`.

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

The working directory is clean, so in `main` we fix the rate and commit, and then restore the stash:

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

A `README.md` file describing how to run the program was also created in the branch. It is needed in `main` right now, so we move only this commit. A branch name used this way means its latest commit:

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

For the branch to contain the fixed rate, we rebase it onto `main`. Git notices that the `Add README` commit is already in `main` (as `789b9d2`) and skips it, so only the table remains in the branch:

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

The history is now linear. After `git switch main` and `git merge feature/table`, the branch is merged with a fast-forward. The program with the table and the fixed rate:

```
PS> dotnet run -- 5000
Amount: 5,000.00 UAH
Currency      Rate      You get
USD          41.25       121.21
EUR          47.80       104.60
PLN          11.20       446.43
```

## Example 3. Working in pairs: a bare repository, branch review, a conflict, and a release

Two students (Olena and Andrii) are developing an "Office hours schedule" program together. The shared repository is a bare repository on disk, and each team member has their own clone. Andrii adds a room number in a branch, and Olena reviews and merges the branch, resolves a conflict, and releases version 1.0.0.

The program prints the heading "OOP office hours:" and, for each day in the array `string[] days = ["Monday", "Wednesday", "Friday"];`, the line `Console.WriteLine($"{day}: 14:00–15:00");`.

Olena creates a bare repository and pushes the first commit:

```
PS> git init --bare D:\Labs\remote\Consultations.git
Initialized empty Git repository in D:/Labs/remote/Consultations.git/

PS> git remote add origin D:\Labs\remote\Consultations.git
PS> git push -u origin main
To D:\Labs\remote\Consultations.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Andrii clones the repository into his folder, sets his name in the clone (`git config user.name`, `git config user.email`), changes the output line to `"{day}: 14:00–15:00, room 305"` in a branch, and pushes it:

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

Meanwhile, Olena added the teacher's name to the same line in `main` and pushed the commit. Now she fetches Andrii's branch and reviews it:

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

The `git diff main...origin/feature/room` command shows the branch's only change—the output line with the room number.

The changes are accepted, but the merge stops with a conflict because both team members changed the same line:

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
    Console.WriteLine($"{day}: 14:00–15:00 (Koval O.)");
=======
    Console.WriteLine($"{day}: 14:00–15:00, room 305");
>>>>>>> origin/feature/room
}
```

Olena keeps both changes in a single line: `Console.WriteLine($"{day}: 14:00–15:00, room 305 (Koval O.)");`. You can do the same in Visual Studio: *Git Changes → Unmerged Changes*, double-click `Program.cs`, select both fragments in the merge editor, edit the line in the *Result* pane, and click *Accept Merge*. Next come the merge commit and a check:

```
PS> git add Program.cs
PS> git commit --no-edit
[main a6af62f] Merge remote-tracking branch 'origin/feature/room'

PS> dotnet run
OOP office hours:
Monday: 14:00–15:00, room 305 (Koval O.)
Wednesday: 14:00–15:00, room 305 (Koval O.)
Friday: 14:00–15:00, room 305 (Koval O.)
```

For the release, Olena creates a `CHANGELOG.md` file with the heading "Changelog" and a "1.0.0 – 2026-09-17" section listing the version's features, commits it, adds an annotated tag, and pushes `main` together with the tag (`--follow-tags`), and then deletes the merged branch on the server:

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

Andrii updates his clone with `git pull` (a fast-forward to `848bdd1` together with the `v1.0.0` tag), deletes the merged local branch with `git branch -d feature/room`, and removes the reference to the deleted remote branch with `git fetch --prune`.
