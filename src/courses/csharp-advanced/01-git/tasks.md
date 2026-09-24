---
title: "Tasks"
description: "Topic 1. Git version control: task variants"
outline: [2, 3]
sourceHash: "c4c16942c0ee1517c6335d26ca9d660f1749de05c650386d3923d46b1bf57d10"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

The C# programs in these tasks are small: what matters is the history of their development in Git. All tasks are done with local repositories, without a GitHub account or network access.

## Variants

### Variant 1. Shopping list {#v1}

**1. Initial level.** Create a C# "Shopping list" console program that displays items with quantities, and keep its history in a local Git repository: create `.gitignore` with `dotnet new gitignore`, make at least four commits with meaningful messages (creating the project, displaying the list, adding an item from the keyboard, counting items), and show the history with `git log --oneline`.

**2. Basic level.** Create a C# "Shopping list" console program (items with quantity and price) in a local Git repository, and develop two commits each in the `feature/remove` (removing an item) and `feature/total` (calculating the total cost) branches; merge the first branch into `main` with a fast-forward and the second with a three-way merge after a new commit in `main`, delete the merged branches, mark the result with the annotated tag `v1.0`, and show `git log --oneline --graph --all` and `git show v1.0`.

**3. Advanced level.** Create a C# "Shopping list" console program (items with quantities) and organize its team development without a hosting service: create a bare repository `D:\Labs\remote\Shopping.git`, push `main` to it, and make a second clone on behalf of another team member (own `user.name` and `user.email` in the clone). Each team member develops their own feature (sorting, saving the list to a file) in a separate branch and pushes it, and the other reviews the branch with `git log main..origin/<branch>` and `git diff main...origin/<branch>` and merges it. Get and resolve one merge conflict, mark the release with the `v1.0` tag and a `CHANGELOG.md` file, and show the history graph in both clones and `git ls-remote --tags origin`.

### Variant 2. Library record card {#v2}

**1. Initial level.** Create a C# "Library record card" console program (books lent to a reader and their return dates) and record its development in a local Git repository with at least ten small commits, each of which leaves the project in a buildable state; show the history with `git log --oneline` and `git log --stat -3`.

**2. Basic level.** Create a C# "Library record card" console program (books lent to a reader and their return dates) in a Git repository, create a `feature/overdue` branch (finding overdue books) with two commits, meanwhile add a commit with a different change to `main`, rebase the branch with `git rebase main`, merge it with a fast-forward, and show that the history is linear (`git log --oneline --graph`) and the branch commit hashes have changed.

**3. Advanced level.** Create a C# "Library record card" console program (lent books and return dates) in a Git repository and prepare its releases following semantic versioning rules: develop a bug fix, a new feature, and a change to the output format in separate branches, rebase each branch onto the current `main` before merging, update `CHANGELOG.md` after each merge, and add the annotated tags `v1.0.0`, `v1.0.1`, `v1.1.0`; create a release archive with `git archive --format=zip -o Library-1.1.0.zip v1.1.0` and show `git tag -n`, `git log --oneline --graph --decorate`, and `git diff --stat v1.0.0 v1.1.0`.

### Variant 3. Expense tracker {#v3}

**1. Initial level.** Create a C# "Expense tracker" console program that totals expenses by category in a Git repository; commit an erroneous change (an incorrect total), undo it with `git revert`, and use `git log --oneline` and `git show` to show that the history kept both commits.

**2. Basic level.** Create a C# "Expense tracker" console program (expense totals by category) in a Git repository, create two branches that change the total output line in different ways, merge them into `main`, get a conflict and resolve it in the terminal (remove the markers, combine the changes), check the build, and complete the merge; show `git status` during the conflict and `git log --oneline --graph` after the merge.

**3. Advanced level.** Create a C# "Expense tracker" console program (expense totals by category) and simulate the work of two team members with a bare repository `D:\Labs\remote\Expenses.git` and two clones: both change the total calculation, the second gets a `git push` rejection (`rejected`), runs `git pull`, resolves the conflict in the Visual Studio 2026 merge editor, and pushes the result. Then find a published erroneous commit, undo it with `git revert` without rewriting history, keep a `CHANGELOG.md`, and show the history graph of both clones.

### Variant 4. Bell schedule {#v4}

**1. Initial level.** Create a C# "Bell schedule" console program that displays the start and end times of classes in a Git repository; start changing the break duration, stash the unfinished work with `git stash`, fix and commit a typo in a class name, restore the changes with `git stash pop`, and finish them in a separate commit. Show `git stash list` and `git log --oneline`.

**2. Basic level.** Create a C# "Bell schedule" console program (class start and end times) in a Git repository and develop two features in the `feature/short-day` (shortened day) and `feature/next-bell` (time until the next bell) branches: while working on the first, stash the changes with a message (`git stash push -m`), finish the second, return, and restore the stash; merge both branches and add the annotated tag `v1.0`. Show `git log --oneline --graph --all` and `git tag -n`.

**3. Advanced level.** Create a C# "Bell schedule" console program that reads class times from a file in a Git repository and organize its releases: feature branches, the `v1.0.0` and `v1.1.0` tags, and two independent unfinished changes in the stash, applied selectively (`git stash apply "stash@{1}"`). After the `v1.1.0` release, fix a bug in a `hotfix/1.1.1` branch created from the tag (`git switch -c hotfix/1.1.1 v1.1.0`), merge it into `main`, add the `v1.1.1` tag, and update `CHANGELOG.md`. Show the history graph, the tags, and `git diff v1.1.0 v1.1.1`.

### Variant 5. Weather diary {#v5}

**1. Initial level.** Create a C# "Weather diary" console program (temperatures for a week and the average) in a Git repository with `.gitignore` and `.gitattributes` files created by `dotnet new` templates, make several commits, and use `git ls-files --eol` to show that text files are stored in the index with LF line endings.

**2. Basic level.** Create a C# "Weather diary" console program (temperatures for a week and the average) in a Git repository, make at least eight commits, one of which quietly introduces a bug into the average temperature calculation; find this commit with `git bisect`, marking versions `good` and `bad` after running the program, show its changes with `git show`, and undo the bug with `git revert`.

**3. Advanced level.** Create a C# "Weather diary" console program with a method that calculates the minimum, maximum, and average temperature, build a history of 15 or more commits with a hidden bug, write a check script that runs the program with known data and returns exit code 0 for a correct result, and find the faulty commit automatically with `git bisect run`. Show `git bisect log` and the author of the faulty line (`git blame -L`), fix the bug in a `fix/average` branch, and merge it.

### Variant 6. Grade book {#v6}

**1. Initial level.** Create a C# "Grade book" console program (student grades and average score), commit it to a local Git repository, create a bare repository with `git init --bare D:\Labs\remote\Grades.git`, add it as `origin`, push the `main` branch with `git push -u origin main`, and show `git remote -v` and `git status`.

**2. Basic level.** Create a C# "Grade book" console program (student grades and average score), a bare repository `D:\Labs\remote\Grades.git`, and two clones on behalf of two team members (each clone with its own `user.name` and `user.email`); the first adds sorting by average score, the second adds student search; each pushes their commits and gets the other's changes with `git pull`. Show `git log --oneline --graph` and `git shortlog -sn` in both clones.

**3. Advanced level.** Create a C# "Grade book" console program (student grades and average score) and simulate a code review without a hosting service: a bare repository and two clones; the author pushes a `feature/report` branch, the reviewer reviews it with `git log main..origin/feature/report` and `git diff main...origin/feature/report`, writes comments to a `REVIEW.md` file in a separate commit in the branch, the author addresses them with new commits, and the reviewer merges the branch with the `--no-ff` option and deletes it on the server and locally (`git push origin --delete`, `git fetch --prune`). Show the history graph and `git branch -a` in both clones.

### Variant 7. Workout tracker {#v7}

**1. Initial level.** Create a C# "Workout tracker" console program (workout type, duration, total time) in a Git repository, add the annotated tag `v1.0`, fix duration rounding in a `hotfix/rounding` branch, merge it into `main`, add the `v1.0.1` tag, and show `git tag -n` and `git log --oneline --decorate`.

**2. Basic level.** Create a C# "Workout tracker" console program (workout type, duration, total time) in a Git repository, make three commits in a `feature/stats` branch, one of which fixes a bug that also exists in `main`; move only this fix to `main` with `git cherry-pick`, add the `v1.0.1` tag, then rebase `feature/stats` onto `main` and show that Git skipped the already applied commit.

**3. Advanced level.** Create a C# "Workout tracker" console program (workouts and total time) in a Git repository and maintain two release lines: a `release/1.x` branch created from the `v1.0.0` tag and `main` for version 2. Make fixes in `main` and port them to `release/1.x` with `git cherry-pick -x`, resolving conflicts if the branch code has diverged; add the `v1.0.1` and `v2.0.0` tags and keep a `CHANGELOG.md` in each line. Show `git log --oneline --graph --all`, the message of the ported commit, and `git branch --contains` for the fix.

### Variant 8. Café menu {#v8}

**1. Initial level.** Create a C# "Café menu" console program (dishes and prices) with a dish class in a separate file in a Git repository; delete the class file and commit the deletion, then restore the file from the previous commit with `git restore --source HEAD~1 <file>` and commit the restoration. Show `git log --oneline --stat`.

**2. Basic level.** Create a C# "Café menu" console program (dishes and prices) in a Git repository and mark three of its versions with annotated tags describing the changes (`v1.0`—menu, `v1.1`—discounts, `v1.2`—dish search); show `git tag -n`, the file content in version 1.0 (`git show v1.0:Program.cs`), and the changes `git diff v1.0 v1.2`, temporarily switch to version `v1.1` with `git switch --detach`, and return to `main`.

**3. Advanced level.** Create a C# "Café menu" console program that stores dishes and prices in a `menu.json` file in a Git repository, and recover lost data: after several commits, commit an emptied menu, run `git reset --hard` several commits back, find the lost commits in `git reflog`, restore the branch, bring back `menu.json` from the required version with `git restore --source`, and describe the sequence of actions in a `RECOVERY.md` file. Show `git reflog -10` and the final history.

### Variant 9. Parking lot {#v9}

**1. Initial level.** Create a C# "Parking lot" console program (free and occupied spaces) in a local Git repository and develop three features (entry, exit, report) in three separate branches, merging each into `main` with `git merge --no-ff`; show `git log --oneline --graph` with three merge commits.

**2. Basic level.** Create a C# "Parking lot" console program (free and occupied spaces) in a Git repository, push it to a bare repository `D:\Labs\remote\Parking.git`, and protect the `main` branch there with the `receive.denyNonFastForwards` and `receive.denyDeletes` settings; show that a normal push works, while the server rejects `git push --force` after `git commit --amend` of a published commit and `git push origin --delete main`.

**3. Advanced level.** Create a C# "Parking lot" console program (entry, exit, free-space report) and set up a GitHub Flow–style workflow for it without a hosting service: a bare repository with a protected `main` branch and a server-side `pre-receive` hook that rejects a push if the message of any new commit is shorter than 10 characters; three feature branches from two team members, a review of each branch before merging (`git log`, `git diff main...`), merges with `--no-ff`, and deletion of branches on the server. Show the hook rejection, the history graph, and `git ls-remote origin`.

### Variant 10. Glossary {#v10}

**1. Initial level.** Create a C# "Glossary" console program (looking up a definition by term) in a Git repository, change the "term not found" message differently in two branches, merge the branches into `main`, resolve the conflict in the terminal, and show the conflict markers before the fix and `git log --oneline --graph` after it.

**2. Basic level.** Create a C# "Glossary" console program (a glossary class and definition lookup by term in `Program.cs`) in a Git repository, get a merge conflict in two files at once (the glossary class and `Program.cs`), and resolve it in the Visual Studio 2026 merge editor (*Git Changes*, *Unmerged Changes*, *Accept Merge*): in one file accept both changes, in the other only the incoming ones; complete the merge with a commit and show it with `git show --stat`.

**3. Advanced level.** Create a C# "Glossary" console program that stores terms and definitions in a `terms.txt` file, and simulate parallel work by two team members with a bare repository and two clones: both edit adjacent lines of the file and get conflicts during `git pull` and `git rebase`; one resolves the conflict with a merge in Visual Studio 2026, the other with a rebase in the terminal (`git rebase --continue`). Enable `git config merge.conflictStyle zdiff3`, show the markers with the common version, and explain them in a `CONFLICTS.md` file.

### Variant 11. Vehicle fleet tracking {#v11}

**1. Initial level.** Create a C# "Vehicle fleet tracking" console program (vehicles and mileage) in a local Git repository, make three commits, undo the last two with `git reset --soft HEAD~2`, combine their changes into a single commit, and show the history before and after (`git log --oneline`).

**2. Basic level.** Create a C# "Vehicle fleet tracking" console program (vehicles and mileage) in a Git repository and demonstrate the `git reset --soft`, `--mixed`, and `--hard` modes on the same sequence of commits (in three temporary branches), showing `git status --short` and `git log --oneline -3` after each, and then recover the commits lost after `--hard` using `git reflog`.

**3. Advanced level.** Create a C# "Vehicle fleet tracking" console program (vehicles and mileage), a bare repository `D:\Labs\remote\Fleet.git`, and two clones, and show the difference between local and published commits: remove erroneous local commits with `git reset`, undo a published erroneous commit with `git revert` and push it; show that `git push --force-with-lease` is rejected if another team member has already pushed new commits. Write the team's rules for undoing changes to a `NOTES.md` file and show the history of both clones.

### Variant 12. Rental calculator {#v12}

**1. Initial level.** Create a C# "Rental calculator" console program (cost based on the number of days and the rate) in a Git repository, mark the version with the annotated tag `v1.0.0`, create a lightweight tag `v1.0.0-test`, compare both tags with `git show`, and delete the lightweight tag.

**2. Basic level.** Create a C# "Rental calculator" console program (cost based on the number of days and the rate) in a Git repository and release versions `v1.0.0`, `v1.0.1` (fix), `v1.1.0` (weekly discount), and `v2.0.0` (new input format), keeping a `CHANGELOG.md` file with a section for each version; show `git tag -n`, `git log --oneline --decorate`, and the list of changes between versions `git log --oneline v1.0.0..v1.1.0`.

**3. Advanced level.** Create a C# "Rental calculator" console program (cost by days and rate) in a Git repository and a PowerShell script `release.ps1` for releasing it, which receives the version number as an argument, checks the `MAJOR.MINOR.PATCH` format, that the working directory is clean (`git status --porcelain`), and that no such tag exists, builds the project, adds to `CHANGELOG.md` a section with the commit messages since the previous tag (`git log --pretty=format:"- %s"`), and creates a commit, an annotated tag, and a `git archive` archive; on error, it prints a message to the error stream and exits with a nonzero code.

### Variant 13. Bike rental {#v13}

**1. Initial level.** Create a C# "Bike rental" console program that reads the rate and the database access password from an `appsettings.Local.json` file in a Git repository; add this file to `.gitignore`, commit an `appsettings.Example.json` template without secrets, and use `git status` and `git check-ignore -v` to show that the file with the secret is ignored.

**2. Basic level.** Create a C# "Bike rental" console program (the rate and the database access password in a `secrets.json` file) in a Git repository and fix a situation in which the `bin` and `obj` folders and the `secrets.json` file ended up in a commit: add rules to `.gitignore`, remove the files from the index with `git rm -r --cached`, commit the changes, and show `git ls-files` before and after; explain in `README.md` why a secret that has entered the history is considered compromised.

**3. Advanced level.** Create a C# "Bike rental" console program that reads the rate and the database access password from a `secrets.json` file in a Git repository, and write a `pre-commit` hook in a `.githooks` folder connected via `core.hooksPath` that rejects a commit if the staged files (`git diff --cached --name-only`) include `*.pfx`, `secrets.json`, or `.env`, or if their content contains the string `Password=`; the hook explains the reason in the error stream. Show the hook rejection, a successful commit after the fix, and the `.gitignore` rules checked with `git check-ignore -v`.

### Variant 14. Medical record {#v14}

**1. Initial level.** Create a C# "Medical record" console program (patient data and a list of visits) in a Git repository, develop adding a visit in a `feature/visit` branch, rebase the branch onto the updated `main` before merging, and merge it with a fast-forward; show the history graph before and after the rebase.

**2. Basic level.** Create a C# "Medical record" console program (patient data, allergies, and visits) in a Git repository and develop three features in the `feature/allergies`, `feature/visits`, and `feature/export` branches, adding commits to `main` between merges; rebase each branch onto `main` before merging, resolve the rebase conflict (`git rebase --continue`), and merge with a fast-forward. Show the linear history `git log --oneline --graph`.

**3. Advanced level.** Create a C# "Medical record" console program (patient data and visits) in a Git repository and clean up the history of a feature branch before merging: make 6–8 small commits (including "fix typo" and "wip"), combine them into 2–3 logical commits with `git rebase -i` (the `squash` and `reword` actions and reordering), rebase the branch onto the current `main`, check the build after each commit with `git rebase --exec "dotnet build" main`, and merge the branch. Show the history before and after and find the state of the branch before the cleanup in `git reflog`.

### Variant 15. League table {#v15}

**1. Initial level.** Create a C# "League table" console program (teams, points, sorting) in a Git repository with several branches and merges and show the history in different formats: `git log --oneline --graph --all`, `git log --stat`, `git log --since`, `git log --author`, and `git log --pretty=format:"%h %an %ad %s" --date=short`.

**2. Basic level.** Create a C# "League table" console program (teams, points, sorting) in a Git repository, simulate the work of three authors (different `user.name` values or the `--author` parameter), make at least 12 commits, and display: the number of commits by each author (`git shortlog -sn`), one author's commits over a period, the files changed in each commit (`git log --name-only`), and the history of one file (`git log --follow`).

**3. Advanced level.** Create a C# console program `GitStats` that receives the path to a repository as an argument, runs `git log` with the `--pretty=format:` parameter via `System.Diagnostics.Process`, and displays a table of authors with the number of commits and the first and last dates, as well as the number of commits by day of the week; test it on a repository with commits from at least three authors, and report errors (the folder is not a repository, Git is not installed) to the error stream with a nonzero exit code. Develop `GitStats` in its own repository with a `v1.0` tag.

### Variant 16. Recipes {#v16}

**1. Initial level.** Create a C# "Recipes" console program (ingredients and cooking steps) in a Git repository, merge a branch with a new feature using a three-way merge, and undo this merge with `git revert -m 1 <merge commit>`; show `git log --oneline --graph` and explain the meaning of the `-m 1` option.

**2. Basic level.** Create a C# "Recipes" console program (ingredients and cooking steps) in a Git repository, merge the `feature/scale` branch (scaling ingredients to the number of servings) with a conflict, resolve it, then undo the merge with `git revert -m 1`; fix the branch and merge it again, first reverting the revert commit (`git revert` of that commit). Show the history graph.

**3. Advanced level.** Create a C# "Recipes" console program that stores recipes (ingredients and steps) in a `recipes.json` file, and simulate parallel editing of the same recipes by two team members with a bare repository and two clones; resolve conflicts so that the file remains valid JSON (checked by the program after the merge), undo an erroneous merge with `git revert -m 1`, push the revert, and merge the fixed branch again. Configure `.gitattributes` for `*.json` and show the history graph of both clones.

### Variant 17. Train timetable {#v17}

**1. Initial level.** Create a C# "Train timetable" console program (number, destination, departure time) in a Git repository with commits by two authors (different `user.name` values or the `--author` parameter), find the author and commit of a line with an incorrect time format using `git blame -L`, and fix the line in a `fix/time-format` branch.

**2. Basic level.** Create a C# "Train timetable" console program (number, destination, departure time, sorting by time) in a Git repository with several commits, one of which introduces a sorting bug; find this commit with `git log -S`, `git log -G`, and `git blame`, view its changes (`git show`), fix the bug in a `fix/sort` branch, merge it, and view the *Git → Blame (Annotate)* annotations for the fixed line in Visual Studio 2026.

**3. Advanced level.** Create a C# "Train timetable" console program (number, destination, time) in a Git repository with commits by several authors and a report on the origin of its code: a C# console program or PowerShell script receives the repository path as an argument, uses `git blame --line-porcelain` data to calculate the number of lines by each author for every `.cs` file, and displays a "file – author – lines – %" table. Also find the commit that introduced a bug into the program with `git bisect run`, fix the bug in a branch, and merge it. Show the report and `git bisect log`.

### Variant 18. Utility bill tracker {#v18}

**1. Initial level.** Create a C# "Utility bill tracker" console program (services, meter readings, amount) in a Git repository; start two independent changes, stash each separately with a message (`git stash push -m`), show `git stash list` and `git stash show -p`, apply one stash, and drop the other.

**2. Basic level.** Create a C# "Utility bill tracker" console program (services, meter readings, amount) in a Git repository, stash unfinished changes together with a new untracked file (`git stash push -u -m`), fix a bug in another branch, return, and restore the stash; separately, create a new branch from a stash with `git stash branch` and finish the work in it. Show `git status --short` at each step.

**3. Advanced level.** Create a C# "Utility bill tracker" console program (services, meter readings, amount) in a Git repository and simulate a conflict during `git stash pop` (the file was changed in the branch after the stash was created): resolve the conflict, make sure the stash was not dropped, and drop it manually; stash changes to only one file (`git stash push -- <file>`) and only part of the changes (`git stash push -p`). Describe the actions and results in a `STASH.md` file and show the history.

### Variant 19. School library {#v19}

**1. Initial level.** Create a C# "School library" console program (finding a book by author) in a Git repository and a `TASKS.md` file with three numbered tasks; complete each task in a separate commit with the task number in the message (for example, `Add search by author (#1)`) and find a task's commits with `git log --grep`.

**2. Basic level.** Create a C# "School library" console program (books, search by author) in a Git repository and keep a task list in a `TASKS.md` file (number, description, status): for each task, create a `task/<number>-<name>` branch, write `Closes #<number>` in the message of the final commit, and mark the task as done after merging with `--no-ff`. Show `git log --oneline --graph` and `git log --grep "Closes"`.

**3. Advanced level.** Create a C# "School library" console program (books, search by author) in a Git repository with a `TASKS.md` task file and a local equivalent of pull requests: a `commit-msg` hook that requires a task reference in the `(#N)` format in the message and checks that such a task exists in `TASKS.md`, and a PowerShell script `review.ps1` that, for the branch given as an argument, displays its commits (`git log main..<branch>`), change statistics (`git diff --stat main...<branch>`), and the numbers of the tasks mentioned. Show the hook rejection, the script report for two branches, and the history graph after merging.

### Variant 20. Alarm clock {#v20}

**1. Initial level.** Create a C# "Alarm clock" console program (alarm time and time remaining until it) in a Git repository; make a commit with a typo in the message and a missing file and fix it with `git commit --amend`, and remove a file accidentally added to the index with `git restore --staged`. Show `git status` and `git log --oneline` after each action.

**2. Basic level.** Create a C# "Alarm clock" console program (alarm time and time remaining until it) in a Git repository, change two independent fragments in one file and commit them in separate commits using partial staging `git add -p`, and add forgotten changes to the last commit with `git commit --amend --no-edit`; show `git diff --staged` before each commit and `git log --stat`.

**3. Advanced level.** Create a C# "Alarm clock" console program (alarm time and time remaining) in a Git repository and clean up a branch of 8–10 messy commits before merging: fixes as `git commit --fixup` and `git rebase -i --autosquash`, renaming commits (`reword`), splitting one commit into two (`edit`, `git reset HEAD~1`, partial staging). Configure a `commit-msg` hook that checks that the first line of the message is no longer than 72 characters and does not end with a period. Show the history before and after and the hook rejection.

### Variant 21. Movie catalog {#v21}

**1. Initial level.** Create a C# "Movie catalog" console program (title, year, rating) in a local Git repository, create a bare repository `D:\Labs\remote\Movies.git`, push `main` to it, clone it into another folder, make and push a commit from the clone, and get it in the first repository with `git pull`; show `git log --oneline` in both repositories.

**2. Basic level.** Create a C# "Movie catalog" console program (title, year, rating), a bare repository, and two clones, and show the difference between `git fetch` and `git pull`: after pushing commits from the second clone, run `git fetch` in the first, compare `main` and `origin/main` (`git status`, `git log main..origin/main`, `git diff main origin/main`), and merge the changes with `git merge origin/main`; repeat for divergent branches with `git pull --rebase`.

**3. Advanced level.** Create a C# "Movie catalog" console program (title, year, rating) in a Git repository and configure two remote repositories: `origin` (a bare repository on disk) and `backup` (a second bare repository in another folder or on a USB drive), push branches and tags to both (`git push --all`, `git push --tags`), delete the working clone, and restore the project from `backup` with `git clone`; verify that the history and tags match (`git log`, `git tag`, `git ls-remote`) and describe the backup procedure in a `BACKUP.md` file.

### Variant 22. ATM {#v22}

**1. Initial level.** Create a C# "ATM" console program (balance, withdrawal, deposit) in a local Git repository, mark two versions with the annotated tags `v1.0` and `v1.1`, and show the changes between them with `git diff v1.0 v1.1` and `git log --oneline v1.0..v1.1`.

**2. Basic level.** Create a C# "ATM" console program (balance, withdrawal, deposit) in a Git repository, create the tags `v1.0`, `v1.1` (cash withdrawal limit), and `v1.2`, build and run each version after `git switch --detach <tag>`, compare one file in two versions (`git diff v1.0 v1.2 -- Program.cs`), and find the first version with the withdrawal limit (`git log -S`, `git tag --contains`).

**3. Advanced level.** Create a C# "ATM" console program (balance, withdrawal, deposit) with several tagged versions and a PowerShell script `compare.ps1` that takes two tags, checks that they exist (`git rev-parse --verify`), displays the commits between them and per-file change statistics, builds both versions in temporary working directories created with `git worktree add`, runs them with the same input data to compare the results, and then removes these directories (`git worktree remove`); errors are written to the error stream with a nonzero exit code.

### Variant 23. Author's bibliography {#v23}

**1. Initial level.** Create a C# "Author's bibliography" console program (books and publication years) in a local Git repository, make two commits in an `experiment/json` branch, return to `main`, make sure that `git branch -d` does not delete an unmerged branch, and delete it with `git branch -D`.

**2. Basic level.** Create a C# "Author's bibliography" console program (books and publication years) in a Git repository, create three experimental branches, list the merged and unmerged branches (`git branch --merged`, `git branch --no-merged`), merge one, delete the rest, and then restore a mistakenly deleted unmerged branch by its hash from `git reflog`.

**3. Advanced level.** Create a C# "Author's bibliography" console program (books and publication years) in a Git repository and compare two ways of storing its data in the `experiment/json` and `experiment/csv` branches, using `git worktree` to build and run both variants simultaneously in different folders; merge the chosen variant into `main` with `--no-ff`, keep the other as the tag `archive/csv`, and delete the branch. Show `git worktree list`, `git branch -a`, `git tag`, and the history graph.

### Variant 24. Weather station {#v24}

**1. Initial level.** Create a C# "Weather station" console program (sensor readings) in a local Git repository, push it to a bare repository `D:\Labs\remote\Weather.git`, create a "fork" copy of it with `git clone --bare D:\Labs\remote\Weather.git D:\Labs\remote\Weather-fork.git`, clone the fork into a working folder, add the original repository as `upstream`, and show `git remote -v`.

**2. Basic level.** Create a C# "Weather station" console program (sensor readings), push it to the original bare repository `upstream`, create a copy `origin` of it with `git clone --bare`, and synchronize the fork: after new commits in `upstream`, run `git fetch upstream`, merge or rebase `main` onto `upstream/main`, and push to `origin`; show `git log --oneline --graph --all` and `git status`.

**3. Advanced level.** Create a C# "Weather station" console program (sensor readings) and simulate contributing to someone else's project without a hosting service: the owner works with the `upstream` repository, the contributor works with the `origin` copy and sends changes as patch files (`git format-patch main..feature`), the owner reviews and applies them with `git am`, resolving a conflict, and the contributor synchronizes the fork with `upstream`. Show the patches, the commit authorship after `git am`, and the history graph of both repositories.

### Variant 25. Flower shop {#v25}

**1. Initial level.** Create a C# "Flower shop" console program (bouquets and prices) in a local Git repository, make three commits in an `experiment/delivery` branch, and move two of them to `main` with `git cherry-pick <hash1> <hash2>`; show `git log --oneline --graph --all`.

**2. Basic level.** Create a C# "Flower shop" console program (bouquets and prices) in a Git repository and move a range of commits from the `experiment/discounts` branch to `main` (`git cherry-pick A^..B`), resolve a conflict that occurs during the transfer (`git cherry-pick --continue`), and move one more commit without creating a commit (`--no-commit`) and add further changes to it; show the history and `git log --cherry-pick --oneline main...experiment/discounts`.

**3. Advanced level.** Create a C# "Flower shop" console program (bouquets and prices) in a Git repository with `main` and `release/1.x` branches: port fixes from `main` to `release/1.x` with `git cherry-pick -x`, and for control, write a PowerShell script that displays the `main` commits not yet ported to `release/1.x` (`git cherry -v release/1.x main`) and the commits marked "cherry picked from" (`git log --grep`). Show the script output before and after porting, the release tags, and the history graph.

### Variant 26. Dormitory {#v26}

**1. Initial level.** Create a C# "Dormitory" console program (rooms and residents in a `rooms.json` file) in a Git repository; in two branches, change the data of different rooms and merge the branches without a conflict, then change one room differently, get a conflict in `rooms.json`, and resolve it manually so that the file remains valid JSON.

**2. Basic level.** Create a C# "Dormitory" console program (rooms and residents in a `rooms.json` file) in a Git repository, get a conflict in `rooms.json` with three conflicting fragments when merging two branches, and resolve it: for the first keep the current branch version, for the second the incoming one, and for the third combine both; check the file with the program before the merge commit and show `git diff` during the conflict and `git show` of the merge commit.

**3. Advanced level.** Create a C# "Dormitory" console program (rooms and residents) that, to reduce conflicts, stores each room in a separate `rooms/<number>.json` file; simulate parallel work by two team members with a bare repository and show that changes to different rooms merge automatically; for a conflict in one file, use `git checkout --theirs <file>` or `--ours`; add validation of all data files to the program and run it from a `pre-commit` hook. Show the hook rejection for invalid JSON and the history graph.

### Variant 27. Sports equipment {#v27}

**1. Initial level.** Create a C# "Sports equipment" console program (items and their quantities) in a Git repository, switch to the version two commits back with `git switch --detach HEAD~2`, run the program, return to `main`, and explain the message about the detached HEAD state.

**2. Basic level.** Create a C# "Sports equipment" console program (items and their quantities) in a Git repository with a `v1.0` tag, switch to the detached HEAD state at this tag, make two commits with a fix there, return to `main`, find these commits in `git reflog`, save them in a `hotfix/1.0.1` branch, and merge it into `main`; show the history graph.

**3. Advanced level.** Create a C# "Sports equipment" console program (items and their quantities) with several versions marked with `v*` tags and a PowerShell script for checking old versions: for each tag, create a working directory with `git worktree add` (or switch to the detached HEAD state), build and run the program with test data, record a "tag – build – result" table, and reliably return to the initial state (`try`/`finally`); make a fix for the oldest version in a branch from its tag and mark it with a new tag.

### Variant 28. Dental appointments {#v28}

**1. Initial level.** Create a C# "Dental appointments" console program (patient, dentist, appointment time) in a Git repository with several commits, use `git log -S` to find the commit in which the 30-minute appointment duration appeared, and view its changes with `git show`.

**2. Basic level.** Create a C# "Dental appointments" console program (patient, dentist, appointment time) in a Git repository with several commits and explore the history of its code: changes to one method (`git log -L :<method>:<file>`), commits that added or removed a string (`git log -S`), commits that changed lines matching a regular expression (`git log -G`), and commits with a certain word in the message (`git log -i --grep`); explain the results in a `HISTORY.md` file.

**3. Advanced level.** Create a C# console program `WhoChanged` that receives the repository path and a search string as arguments, calls `git log -S` and `git blame` via `System.Diagnostics.Process`, and displays a table of commits (hash, date, author, message) that added or removed this string and the current authors of the lines containing it; test it on your own repository with several commits, and report errors to the error stream with a nonzero exit code.

### Variant 29. Hiking trails {#v29}

**1. Initial level.** Create a C# "Hiking trails" console program (trails and their length) in a Git repository and a `pre-commit` hook that runs `dotnet build` and cancels the commit if the build fails; show the rejection of a commit with a compilation error and a successful commit after the fix.

**2. Basic level.** Create a C# "Hiking trails" console program (trails and their length) in a Git repository and store hooks in a `.githooks` folder (`git config core.hooksPath .githooks`): `pre-commit` checks formatting with `dotnet format --verify-no-changes`, and `commit-msg` checks that the message starts with a capital letter and has at least 10 characters; show the rejection by each hook, the fix, and skipping the checks with the `--no-verify` option.

**3. Advanced level.** Create a C# "Hiking trails" console program (trails and their length) with an xUnit test project and set up local continuous integration: a `pre-push` hook builds the solution and runs `dotnet test`, canceling the push to the bare repository if the tests fail, and a server-side `post-receive` hook in the bare repository appends the time, branch, and hash of the received commits to a `ci.log` file. Show a `git push` rejected because of a failing test, a successful push after the fix, and the contents of `ci.log`.

### Variant 30. Student notebook {#v30}

**1. Initial level.** Create a C# "Student notebook" console program (dated notes and search) in a Git repository and complete a minimal full cycle: `.gitignore`, the first commit, a `feature/search` branch with commits, a merge into `main`, and the annotated tag `v1.0.0`; show `git log --oneline --graph --decorate`.

**2. Basic level.** Create a C# "Student notebook" console program (dated notes and search) in a Git repository and complete a development cycle with a `TASKS.md` task file: create branches for two tasks, review each before merging (`git log main..<branch>`, `git diff main...<branch>`), merge with `--no-ff`, update `CHANGELOG.md`, and mark the release with the `v1.1.0` tag; push `main` and the tags to a bare repository `D:\Labs\remote\Notes.git` and show `git ls-remote origin`.

**3. Advanced level.** Create a C# "Student notebook" console program (dated notes and search) and carry out a full cycle of team development without a hosting service: a bare repository with a protected `main` branch, two clones, a `TASKS.md` file, task branches with review before merging, a conflict and its resolution in Visual Studio 2026, a `pre-commit` hook with a build, rebasing a branch onto the updated `main`, `CHANGELOG.md`, the `v1.0.0` and `v1.1.0` tags, and a `git archive` release archive. Show the history graph of both clones, `git tag -n`, and `git shortlog -sn`.

## Procedure

1. Study the theory and worked examples.
2. Install or update Git for Windows, configure `user.name`, `user.email`, `init.defaultBranch`, `core.autocrlf`, `core.editor`, and `pull.rebase`, and check them with `git config --global --list`.
3. In the `D:\Labs` folder, create the console project for your variant, the `.gitignore` and `.gitattributes` files, and a local repository; for tasks with several team members, create a bare repository and a second clone with a different author name.
4. Complete the task of the chosen level, recording each logical change in a separate commit with a meaningful message and checking the build before committing; perform at least one branch merge in Visual Studio 2026 (the *Git Changes* and *Git Repository* windows).
5. Present your work on your own computer: show `git log --oneline --graph --all`, `git status`, tags, branches, and other results specified in the task, explain each command, and answer the review questions.
