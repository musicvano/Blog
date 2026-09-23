import type { DefaultTheme } from "vitepress";

// A course is described once per language in en/<slug>.mts and uk/<slug>.mts;
// the sidebar, prev/next order and topic numbering are derived from it.
// English pages live in src/courses/<slug>/, Ukrainian ones in src/uk/courses/<slug>/.

export interface Topic {
  slug: string; // folder, e.g. "07-classes"
  short: string; // sidebar title
  chapters: [slug: string, title: string][]; // lecture chapters in reading order
}

export interface Module {
  title: string;
  topics: Topic[];
}

export interface Course {
  slug: string; // e.g. "cpp"
  title: string; // e.g. "ООП мовою C++"
  modules: Module[];
}

export type Locale = "uk" | "en";

export const coursesBases: Record<Locale, string> = {
  uk: "/uk/courses/",
  en: "/courses/",
};

export const coursesBase = coursesBases.uk;

const labels = {
  uk: {
    about: "Про курс",
    practice: "Практика",
    tasks: "Завдання",
    summary: "Підсумки",
    materials: "Матеріали курсу",
    questions: "Контрольні питання",
    exam: "Контрольні завдання",
    literature: "Рекомендована література",
    links: "Корисні посилання",
  },
  en: {
    about: "About the course",
    practice: "Practice",
    tasks: "Tasks",
    summary: "Summary",
    materials: "Course materials",
    questions: "Review questions",
    exam: "Review tasks",
    literature: "Recommended reading",
    links: "Useful links",
  },
} satisfies Record<Locale, Record<string, string>>;

export function courseSidebar(course: Course, locale: Locale = "uk"): DefaultTheme.SidebarItem[] {
  const text = labels[locale];
  const root = `${coursesBases[locale]}${course.slug}/`;
  // Pages every topic has after its lecture chapters.
  const topicPages: [string, string][] = [
    ["practice", text.practice],
    ["tasks", text.tasks],
    ["summary", text.summary],
  ];
  let number = 0;
  return [
    { text: text.about, link: root },
    ...course.modules.map((module) => ({
      text: module.title,
      collapsed: false,
      items: module.topics.map((topic) => {
        const base = `${root}${topic.slug}/`;
        return {
          text: `${++number}. ${topic.short}`,
          link: base,
          collapsed: true,
          items: [...topic.chapters, ...topicPages].map(([slug, title]) => ({
            text: title,
            link: base + slug,
          })),
        };
      }),
    })),
    {
      text: text.materials,
      collapsed: false,
      items: [
        { text: text.questions, link: `${root}questions` },
        { text: text.exam, link: `${root}exam` },
        { text: text.links, link: `${root}links` },
        { text: text.literature, link: `${root}literature` },
      ],
    },
  ];
}
