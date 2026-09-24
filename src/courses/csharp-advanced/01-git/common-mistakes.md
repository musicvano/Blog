---
title: "Common mistakes"
description: "Topic 1. Git version control: Common mistakes"
outline: [2, 3]
sourceHash: "2e3568571feafc3eb65a3dfd65aa0fda594d0518302ce514f7449332fefc5016"
---

# Common mistakes

## Common mistakes

Table 1.2 lists the situations you will most often run into when working with Git.

Table 1.2. Common mistakes when working with Git {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| `bin`, `obj`, `.vs` folders in the repository | committed before creating `.gitignore` | `dotnet new gitignore`, `git rm -r --cached bin obj`, commit |
| a password or API key in the history | a secret in a file added with `git add .` | change the secret; store it outside the repository and put the file in `.gitignore` |
| `! [rejected] … (fetch first)` | the server has someone else's commits | `git pull`, resolve conflicts, `git push` |
| `fatal: Need to specify how to reconcile divergent branches` | no `pull` strategy set for divergent branches | `git config --global pull.rebase false` or `git pull --rebase` |
| build: CS8300 *Merge conflict marker encountered* | `<<<<<<<` markers were left in the file | remove the markers, build, `git add`, `git commit` |
| commits lost after `reset --hard` | the branch was moved back | hash from `git reflog`, `git reset --hard <hash>` |
