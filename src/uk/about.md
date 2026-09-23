---
sidebar: false
prev: false
next: false
lastUpdated: false
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme-without-fonts'

const getMembers = () => [
  {
    avatar: '/images/photo.webp',
    name: 'Іван Музика',
    title: 'Автор',
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

# Про мене

Вітаю у моєму цифровому просторі — місці для курсів програмування, навчальних матеріалів, проєктів і всього, чим мені хочеться поділитися. Тут ви знайдете курси, які я викладаю, мої нові ідеї та навчальні матеріали, створені за останні роки.

<div style="display: flex; justify-content: center">
  <VPTeamMembers size="medium" :members="members" />
</div>

## Що тут можна знайти

Мої інтереси різноманітні, тож і матеріали тут охоплюють багато тем:

- [Курси програмування](/uk/courses/): об’єктно-орієнтоване програмування мовами C++, C#, Java, Kotlin і Python, паралельні та розподілені обчислення.
- [Навчальні матеріали](/csharp/introduction) та статті з C# та інших мов програмування (англійською).
- Моушн-дизайн, монтаж відео, цифрове мистецтво та розробка ігор.
- Результати моїх досліджень у галузі інформаційних технологій.
- Теми, пов’язані зі штучним інтелектом.

## Чим я займаюся зараз

Коротко про те, що займає мій час:

- Працюю доцентом в університеті та викладаю програмування.
- Беру участь у нових проєктах.
- Постійно вдосконалюю цей сайт і створюю нові матеріали.
- Дбаю про здорове харчування, люблю готувати та регулярно тренуюся.

## Зв’язок

Хочете привітатися або запропонувати спільний проєкт? Пишіть на musicvano@gmail.com.

Щоб стежити за новими публікаціями, підписуйтеся на мене в [GitHub](https://github.com/musicvano), [Bluesky](https://musicvano.bsky.social), [X](https://x.com/musicvano) або [Mastodon](https://mastodon.social/@musicvano).

Зручніше поспілкуватися в месенджері? Пишіть у [Telegram](https://t.me/musicvano).
