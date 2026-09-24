---
title: "Resources, theme, and distribution"
description: "Topic 15. Compose Multiplatform: Resources, theme, and distribution"
outline: [2, 3]
sourceHash: "ec0e105823f0d29c53cc2e28adab1cd4fca7ef3a05d93187ad41f1449cdddbe8"
---

# Resources, theme, and distribution

## Resources, theme, and preview

In a KMP project, resources are placed in `composeResources`. The generated `Res.string` or `Res.drawable` provides typed access; the Compose resources module is required. In an ordinary JVM module you can also work with classpath resources, but do not replace them with a path to a file in the source project.

Dark and light palettes must maintain contrast. An error message is conveyed with text, not only with a border color. A field must have a clear label, and a button a verb-based caption. Keyboard navigation and a visible focus are important on desktop.

`@Preview` helps you inspect a small component with given parameters without full navigation. Preview support depends on the IDE and plugins; a missing panel does not mean the program fails to compile. For a preview, pass demo data rather than starting a real database or network.

::: info Screenshot
Supported IDE preview; stateless component with sample data.
:::

Figure 15.9. A preview of an individual component {.caption}

Compose Hot Reload speeds up checking UI changes in a supported configuration. It does not replace a clean compilation, tests, or a restart with empty state. Add the plugin following the current official guide, matching its version to the project: <https://kotlinlang.org/docs/multiplatform/compose-hot-reload.html>.

::: info Screenshot
Verified Hot Reload setup; show changed text and status.
:::

Figure 15.10. Updating the interface during development {.caption}

## Testing and distribution

Testing has three levels. An ordinary unit test checks formulas and validation without Compose. A state test checks transitions after events. A UI test or a manual scenario checks button availability, the error text, focus, scrolling, and resizing. A successful compilation does not confirm that a graphical screen is readable.

For desktop, Compose provides packaging tasks, including `packageDistributionForCurrentOS`. The installer format depends on the OS and the configured `nativeDistributions`: a Windows package is prepared on Windows with the required packaging tools. `mainClass`, the package name, the version, and the included JVM modules must be defined before building the installer.

Do not write working data to the installation directory. Application resources may be read-only; the user's personal directory or a chosen path is suitable for the database and settings. A package is tested by running it from another working directory, on a clean profile, and by reopening the saved data.
