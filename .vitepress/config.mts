import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dev Blog",
  description:
    "Programming in C, C++, Rust, C#, Python, JavaScript, TypeScript",
  srcDir: "./src",
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
        defer: "true",
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "1c33f2e4-e160-4bea-9a84-1b1763d41748",
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    siteTitle: "Dev Blog",

    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/posts/getting-started" },
      { text: "Tutorials", link: "/csharp/introduction" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/posts/": [
        {
          text: "2025",
          collapsed: false,
          items: [{ text: "Getting Started", link: "/posts/getting-started" }],
        },
      ],
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
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/musicvano",
        ariaLabel: "GitHub",
      },
      { icon: "x", link: "https://x.com/musicvano", ariaLabel: "X" },
      {
        icon: "bluesky",
        link: "https://musicvano.bsky.social",
        ariaLabel: "Bluesky",
      },
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
        'Released under the <a href="https://github.com/musicvano/Blog/blob/main/LICENSE">MIT License</a>',
      copyright:
        'Copyright © 2025 <a href="https://github.com/musicvano">Ivan Muzyka</a>',
    },
  },

  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    //  languages: [ruxGrammar],
  },
});
