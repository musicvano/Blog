# Personal Blog

Built with [VitePress](https://vitepress.dev)

## Project Structure

Inside of the project, you'll see the following folders and files:

```
.
├── .vitepress/
│   ├── courses/
│   │   ├── sidebar.mts
│   │   ├── en/            English course navigation (cpp.mts, …)
│   │   └── uk/            Ukrainian course navigation (cpp.mts, csharp.mts, …)
│   ├── locales/
│   │   └── uk.mts
│   ├── markdown/
│   │   └── mermaid.mts
│   ├── theme/
│   │   ├── custom.css
│   │   ├── index.js
│   │   └── Mermaid.vue
│   └── config.mts
├── art/
│   ├── *.ai
│   └── ...
├── src/
│   ├── blog/
│   │   ├── *.md
│   │   └── ...
│   ├── csharp/
│   │   ├── *.md
│   │   └── ...
│   ├── uk/
│   │   ├── courses/
│   │   │   ├── cpp/
│   │   │   ├── csharp/
│   │   │   ├── csharp-advanced/
│   │   │   ├── java/
│   │   │   ├── kotlin/
│   │   │   ├── python/
│   │   │   ├── parallel/
│   │   │   └── index.md
│   │   ├── about.md
│   │   └── index.md
│   ├── public/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── ...
│   ├── index.md
│   └── *.md
└── package.json
```

VitePress looks for `.md` files in the `src/`, `src/csharp/` and `src/blog/` directories. Each file is exposed as a route based on its file name.

Images can be added to `src/public/images/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `src/public/` directory.

Source files for the logo and avatar are kept in `art/`, outside the published site.

## Languages

The site has two [locales](https://vitepress.dev/guide/i18n): English at `/` and Ukrainian at `/uk/` (settings and UI strings in `.vitepress/locales/uk.mts`). The language switcher (the `i18nRouting` function in `.vitepress/config.mts`) opens the same page in the other language for the home page, About, the course catalogue and courses that exist in both languages, and the other locale's home page otherwise.

## Courses

Courses are in Ukrainian, under `src/uk/courses/<course>/`. Each course is organized as modules → topics → chapters:

```
src/uk/courses/cpp/
├── index.md              course overview and program
├── questions.md          review questions («Контрольні питання»)
├── exam.md               review tasks («Контрольні завдання»)
├── literature.md         recommended reading (one alphabetical list)
├── links.md              useful links («Корисні посилання»)
└── 07-classes/           one folder per topic
    ├── index.md          topic overview and contents
    ├── class-invariant.md
    ├── ...               lecture chapters
    ├── practice.md       worked examples
    ├── tasks.md          task variants
    ├── summary.md        conclusions and questions
    └── images/           screenshots
```

The navigation of a course is described once per language in `.vitepress/courses/uk/<course>.mts` and `.vitepress/courses/en/<course>.mts` (modules, topics and chapters in reading order). `courseSidebar()` in `.vitepress/courses/sidebar.mts` builds the sidebar and the prev/next order from it. To add a course, create its data file and add it to the `courses` list in `.vitepress/locales/uk.mts` (Ukrainian) or to `coursesEn` in `.vitepress/config.mts` (English).

The C#, C# advanced, Java, Kotlin, Python and Parallel Computing courses were converted from the Typst sources in `D:\Courses` (`OOP`, `OOP C#`, `OOP Java`, `OOP Kotlin`, `OOP Python`, `Parallel Computing`); like C++, they are now maintained directly as Markdown. Screenshots that do not exist yet appear as an info box describing the planned image.

### English translations

English versions of the courses live in `src/courses/<course>/` (served at `/courses/<course>/`) with the same file names as the Ukrainian pages; their navigation is `.vitepress/courses/en/<course>.mts`, listed in `coursesEn` in `.vitepress/config.mts`. The language switcher opens the same page in the other language when both exist. Each English page stores the hash of the Ukrainian page it was translated from (`sourceHash` in the frontmatter).

## Features

- Diagrams via [Mermaid](https://mermaid.js.org): ` ```mermaid ` code blocks are rendered by `.vitepress/theme/Mermaid.vue` and follow the light/dark theme
- Math typesetting via [MathJax](https://www.mathjax.org), enabled with `markdown.math` in `.vitepress/config.mts`
- Self-hosted Inter and JetBrains Mono fonts, served from `src/public/fonts/` and declared in `.vitepress/theme/custom.css`
- Privacy-friendly analytics via [Cabin](https://withcabin.com), loaded from `.vitepress/config.mts`

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                             |
| :---------------- | :------------------------------------------------- |
| `npm install`     | Installs dependencies                              |
| `npm run dev`     | Starts local dev server at `localhost:5173`        |
| `npm run build`   | Build your production site to `./.vitepress/dist/` |
| `npm run preview` | Preview your build locally, before deploying       |

## Want to learn more?

Check out [VitePress Guide](https://vitepress.dev/guide/what-is-vitepress), read [VitePress Reference](https://vitepress.dev/reference/site-config), or jump into the [Getting Started](https://vitepress.dev/guide/getting-started).

## License

Licensed under the [MIT License](LICENSE.md).
