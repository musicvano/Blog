---
sidebar: false
prev: false
next: false
lastUpdated: false
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const getMembers = () => [
  {
    avatar: 'https://www.github.com/musicvano.png',
    name: 'Ivan Muzyka',
    title: 'Author',
    links: [
      { icon: "github", link: "https://github.com/musicvano", ariaLabel: "GitHub" },
      { icon: "bluesky", link: "https://musicvano.bsky.social", ariaLabel: "Bluesky" },
      { icon: "x", link: "https://x.com/musicvano", ariaLabel: "X" },
      { icon: "mastodon", link: "https://mastodon.social/@musicvano", ariaLabel: "Mastodon" },
      { icon: "telegram", link: "https://t.me/musicvano", ariaLabel: "Telegram" }
    ]
  }
]

const members = getMembers()
</script>

# About Me

Welcome to my digital space — a place for writing, projects, tutorials, art, and anything else I feel inspired to share. Here you'll find my latest ideas, reflections, and tutorials I've created over the years.

<div style="display: flex; justify-content: center">
  <VPTeamMembers size="medium" :members="members" />
</div>

## What You'll Find Here

My interests are wide-ranging, and so is the content you'll find on my blog. I focus on bringing unique insights into:

- Deep dives and tutorials in C/C++, C#, Rust, Python, JavaScript, and TypeScript.
- Exploring motion design, video editing, digital art, and game development.
- Sharing insights from my research in the field of Information Technology.
- Discussing topics related to artificial intelligence.

## What I'm Doing Now

Here's a quick peek into what's keeping me busy:

- Working full-time as an Associate Professor at the university.
- Actively contributing to new software projects.
- Continuously tweaking this website and creating new content.
- Focusing on healthy eating, cooking, and working out.

## Connect With Me

Want to say hi or collaborate on a project? Write to me at musicvano@gmail.com.

To stay up to date with my latest posts and tutorials please follow me on:

- [GitHub](https://github.com/musicvano)
- [Bluesky](https://musicvano.bsky.social)
- [X](https://x.com/musicvano)
- [Mastodon](https://mastodon.social/@musicvano)

Prefer to chat? You are welcome to reach out on [Telegram](https://t.me/musicvano)
