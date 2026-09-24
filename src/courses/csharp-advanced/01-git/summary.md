---
title: "Summary"
description: "Topic 1. Git version control: conclusions and review questions"
sourceHash: "83fc2ba9e03544f08d9d4675a8b36a578a78b197a9ae8c7bf8286c8014e7cf90"
---

# Summary

## Conclusions

Git is a distributed version control system: every copy of a repository contains the entire history, and most operations run locally. Changes travel from the working directory through the index to the repository, where they are stored as commits—snapshots of the project with an author and a message. The `.gitignore` and `.gitattributes` files determine which files to store and how to normalize line endings. Branches isolate feature development; they are combined by merging or rebasing, and conflicts are resolved manually. Uncommitted changes are undone with `git restore`, published commits with `git revert`, and history may be rewritten (`reset`, `amend`, `rebase`) only before it is published. Tags mark versions, `log -S`, `blame`, and `bisect` help you search for changes, and hooks automate checks. Collaboration relies on remote repositories: a bare repository on disk or GitHub hosting with pull requests. All of these operations are available both in the terminal and in the Visual Studio 2026 windows.

## Self-check questions

1. How does a distributed version control system differ from a centralized one?
2. Which Git settings must you configure before your first commit, and why?
3. What are the working directory, the index, and the repository? Which commands move changes between them?
4. What is a commit and a commit hash? What does `HEAD~1` mean?
5. How does `git diff` differ from `git diff --staged`?
6. Which .NET project files are not added to the repository? How do you remove an already committed `bin` folder?
7. How does `git revert` differ from `git reset`? When must you not use `reset`?
8. What do `git restore`, `git restore --staged`, `git commit --amend`, and `git stash` do?
9. What is a branch? How does a fast-forward merge differ from a three-way merge?
10. How does rebasing differ from merging? When is `git cherry-pick` used?
11. How does a merge conflict arise, and how do you resolve it in the terminal and in Visual Studio?
12. How do you find the commit that introduced a bug using `git bisect`?
13. What is a Git hook? How do you make hooks shared by all team members?
14. What is a bare repository? How does `git fetch` differ from `git pull`?
15. Why does the server reject `git push`, and how do you fix it?

## Useful links

- Git for Windows: <https://git-scm.com/install/windows>
- The "Pro Git" book in Ukrainian: <https://git-scm.com/book/uk/v2>
- Git command reference: <https://git-scm.com/docs>
- Git hooks: <https://git-scm.com/docs/githooks>
- File attributes: <https://git-scm.com/docs/gitattributes>
- .NET templates, including `gitignore` and `gitattributes`: <https://learn.microsoft.com/dotnet/core/tools/dotnet-new-sdk-templates>
- Git in Visual Studio: <https://learn.microsoft.com/visualstudio/version-control/>
- Resolving conflicts in Visual Studio: <https://learn.microsoft.com/visualstudio/version-control/git-resolve-conflicts>
- Working with Git on GitHub: <https://docs.github.com/en/get-started/using-git>
- GitHub Flow: <https://docs.github.com/en/get-started/using-github/github-flow>
- Pull requests: <https://docs.github.com/en/pull-requests>
- Git Credential Manager: <https://github.com/git-ecosystem/git-credential-manager>
