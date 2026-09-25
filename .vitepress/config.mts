import { defineConfig } from "vitepress";
import { mermaidPlugin } from "./markdown/mermaid.mts";
import { uk } from "./locales/uk.mts";
import { coursesBases, courseSidebar } from "./courses/sidebar.mts";
import cppEn from "./courses/en/cpp.mts";
import csharpEn from "./courses/en/csharp.mts";
import csharpAdvancedEn from "./courses/en/csharp-advanced.mts";
import javaEn from "./courses/en/java.mts";
import kotlinEn from "./courses/en/kotlin.mts";
import pythonEn from "./courses/en/python.mts";
import parallelEn from "./courses/en/parallel.mts";

// Courses translated into English (src/courses/<slug>/).
const coursesEn = [cppEn, csharpEn, csharpAdvancedEn, javaEn, kotlinEn, pythonEn, parallelEn];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "Dev Blog",
  description:
    "Programming in C#, C, C++, Rust, Python, JavaScript, TypeScript",
  srcDir: "./src",
  // Partials included into several pages (<!--@include: ...-->), not pages themselves.
  srcExclude: ["**/_shared/**"],
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://mvano.com",
  },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["link", { rel: "icon", href: "/favicon.ico", sizes: "any" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    [
      "script",
      {
        async: "true",
        src: "https://scripts.withcabin.com/hello.js",
      },
    ],
  ],

  locales: {
    root: { label: "English", lang: "en-US" },
    uk,
  },

  themeConfig: {
    // The language switcher opens the same page in the other language when it exists
    // (home, about, the course catalogue, the blog and every page of a course translated into
    // both languages) and the other locale's home otherwise. VitePress sends this function to
    // the browser as source code, so it must not use anything from outside its body.
    i18nRouting(data: any, route: any, targetLocale: string) {
      const site = data.site.value;
      const toUk = targetLocale === "uk";
      const prefix = toUk ? "/uk" : "";
      const path = route.path.replace(/\.html$/, "");
      const rel = path.startsWith("/uk/") ? path.slice(3) : path === "/uk" ? "/" : path;
      const course = rel.match(/^\/courses\/([^/]+)\//);
      if (course) {
        const sidebar = (toUk ? site.locales?.uk?.themeConfig?.sidebar : site.themeConfig?.sidebar) ?? {};
        const exists = Object.keys(sidebar).includes(`${prefix}/courses/${course[1]}/`);
        return exists ? prefix + rel : `${prefix}/courses/`;
      }
      if (["/", "/about", "/courses/"].includes(rel) || rel.startsWith("/blog/")) return prefix + rel;
      return toUk ? "/uk/" : "/";
    },
    logo: "/logo.svg",
    siteTitle: "Dev Blog",

    nav: [
      { text: "Home", link: "/" },
      {
        text: "Courses",
        items: [
          ...coursesEn.map((c) => ({ text: c.title, link: `${coursesBases.en}${c.slug}/` })),
        ],
      },
      { text: "Tutorials", link: "/csharp/introduction" },
      { text: "Blog", link: "/blog/courses" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      ...Object.fromEntries(
        coursesEn.map((c) => [`${coursesBases.en}${c.slug}/`, courseSidebar(c, "en")]),
      ),
      "/csharp/": [
        {
          text: "Fundamentals",
          collapsed: false,
          items: [
            { text: "Introduction", link: "/csharp/introduction" },
            { text: "Hello World", link: "/csharp/hello-world" },
            { text: "Float Product", link: "/csharp/float-product" },
            { text: "Integer Square Sum", link: "/csharp/int-sqr-sum" },
            { text: "Array Min, Max, Avg", link: "/csharp/array-min-max-avg" },
            { text: "Array Sort", link: "/csharp/array-sort" },
            { text: "Matrix Sort", link: "/csharp/matrix-sort" },
            { text: "Print Sin Wave", link: "/csharp/print-sin-wave" },
            { text: "Digits Sort", link: "/csharp/digits-sort" },
            { text: "Common Words", link: "/csharp/common-words" },
            { text: "Command Calculator", link: "/csharp/command-calc" },
            { text: "Random Password", link: "/csharp/random-password" },
          ],
        },
      ],
      "/blog/": [
        {
          text: "2026",
          collapsed: false,
          items: [{ text: "Seven programming courses", link: "/blog/courses" }],
        },
        {
          text: "2025",
          collapsed: false,
          items: [{ text: "Getting Started", link: "/blog/getting-started" }],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/musicvano",
        ariaLabel: "GitHub",
      },
      {
        icon: "bluesky",
        link: "https://musicvano.bsky.social",
        ariaLabel: "Bluesky",
      },
      { icon: "x", link: "https://x.com/musicvano", ariaLabel: "X" },
      {
        icon: "mastodon",
        link: "https://mastodon.social/@musicvano",
        ariaLabel: "Mastodon",
      },
      {
        icon: "telegram",
        link: "https://t.me/musicvano",
        ariaLabel: "Telegram",
      },
    ],

    externalLinkIcon: true,

    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "medium",
      },
    },

    footer: {
      message:
        'Released under the <a href="https://github.com/musicvano/Blog/blob/main/LICENSE.md">MIT License</a>',
      copyright:
        'Copyright © 2026 <a href="https://github.com/musicvano">Ivan Muzyka</a>',
    },
  },

  markdown: {
    math: true,
    config: (md) => {
      md.use(mermaidPlugin);
    },
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    //  languages: [ruxGrammar],
  },
});
