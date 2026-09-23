import type { MarkdownRenderer } from "vitepress";

// Renders ```mermaid fences as <Mermaid> components (see theme/Mermaid.vue).
export function mermaidPlugin(md: MarkdownRenderer) {
  const fence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() === "mermaid") {
      const code = encodeURIComponent(token.content);
      return `<Mermaid code="${code}" />`;
    }
    return fence(tokens, idx, options, env, self);
  };
}
