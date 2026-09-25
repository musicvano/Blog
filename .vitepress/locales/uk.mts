import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";
import { coursesBase, courseSidebar } from "../courses/sidebar.mts";
import cpp from "../courses/uk/cpp.mts";
import csharp from "../courses/uk/csharp.mts";
import csharpAdvanced from "../courses/uk/csharp-advanced.mts";
import java from "../courses/uk/java.mts";
import kotlin from "../courses/uk/kotlin.mts";
import python from "../courses/uk/python.mts";
import parallel from "../courses/uk/parallel.mts";

const courses = [cpp, csharp, csharpAdvanced, java, kotlin, python, parallel];

export const uk: LocaleSpecificConfig<DefaultTheme.Config> & {
  label: string;
  link?: string;
} = {
  label: "Українська",
  lang: "uk-UA",
  link: "/uk/",
  title: "Dev Blog",
  description: "Курси з програмування: C++, C#, Java, Kotlin, Python, паралельні та розподілені обчислення",

  themeConfig: {
    nav: [
      { text: "Головна", link: "/uk/" },
      {
        text: "Курси",
        items: [
          ...courses.map((c) => ({ text: c.title, link: `${coursesBase}${c.slug}/` })),
        ],
      },
      { text: "Блог", link: "/uk/blog/courses" },
      { text: "Про автора", link: "/uk/about" },
    ],

    sidebar: {
      ...Object.fromEntries(courses.map((c) => [`${coursesBase}${c.slug}/`, courseSidebar(c)])),
      "/uk/blog/": [
        {
          text: "2026",
          collapsed: false,
          items: [{ text: "Сім курсів з програмування", link: "/uk/blog/courses" }],
        },
        {
          text: "2025",
          collapsed: false,
          items: [{ text: "Початок", link: "/uk/blog/getting-started" }],
        },
      ],
    },

    outline: { label: "На цій сторінці" },
    docFooter: { prev: "Попередня сторінка", next: "Наступна сторінка" },
    lastUpdated: {
      text: "Оновлено",
      formatOptions: { dateStyle: "medium", timeStyle: "medium" },
    },
    darkModeSwitchLabel: "Тема",
    lightModeSwitchTitle: "Увімкнути світлу тему",
    darkModeSwitchTitle: "Увімкнути темну тему",
    sidebarMenuLabel: "Меню",
    returnToTopLabel: "Нагору",
    langMenuLabel: "Змінити мову",
    skipToContentLabel: "Перейти до вмісту",
    notFound: {
      title: "СТОРІНКУ НЕ ЗНАЙДЕНО",
      quote: "Схоже, цієї сторінки не існує або її було переміщено.",
      linkLabel: "перейти на головну",
      linkText: "На головну",
    },

    footer: {
      message:
        'Поширюється за <a href="https://github.com/musicvano/Blog/blob/main/LICENSE.md">ліцензією MIT</a>',
      copyright:
        'Copyright © 2026 <a href="https://github.com/musicvano">Іван Музика</a>',
    },
  },
};
