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

  // head: [
  //   [
  //     "script",
  //     {
  //       defer: "true",
  //       src: "https://cloud.umami.is/script.js",
  //       "data-website-id": "c3db4674-752d-4334-a22b-6deba2e4ecfb",
  //     },
  //   ],
  // ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    siteTitle: "Dev Blog",

    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/posts/markdown-examples" },
    ],

    sidebar: [
      {
        text: "2025",
        collapsed: false,
        items: [
          { text: "Markdown Examples", link: "/posts/markdown-examples" },
          { text: "Runtime API Examples", link: "/posts/api-examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/musicvano",
        ariaLabel: "GitHub",
      },
      { icon: "x", link: "https://x.com/musicvano", ariaLabel: "X" },
      {
        icon: "bluesky",
        link: "https://bsky.app/profile/musicvano.bsky.social",
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
      // {
      //   icon: "discord",
      //   link: "https://discord.com/invite/uvSHjtZSVG",
      //   ariaLabel: "Discord",
      // },
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
        'Released under the <a href="https://github.com/rux-lang/Rux/blob/main/LICENSE">MIT License</a>',
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
