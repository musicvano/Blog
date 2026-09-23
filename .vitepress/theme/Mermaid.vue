<script setup>
import { onMounted, ref, watch } from "vue";
import { useData } from "vitepress";

const props = defineProps({ code: { type: String, required: true } });
const { isDark } = useData();
const svg = ref("");
// Mermaid measures label sizes in a temporary element. Measuring inside this component
// (within .vp-doc) gives the labels the same styles as the final diagram, so text is not cropped.
const scratch = ref(null);
let seq = 0;

// A wide diagram is scaled down to the column width, which can make its text tiny. Never shrink
// below 85 % (about 12px text): a wider diagram scrolls horizontally instead.
const MIN_SCALE = 0.85;
function withMinScale(svgText) {
  const viewBox = svgText.match(/viewBox="[-\d.]+ [-\d.]+ ([\d.]+) [\d.]+"/);
  if (!viewBox) return svgText;
  const minWidth = Math.round(parseFloat(viewBox[1]) * MIN_SCALE);
  return svgText.replace(/style="max-width: ([\d.]+)px;/, `style="max-width: $1px; min-width: ${minWidth}px;`);
}

async function render() {
  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark.value ? "dark" : "neutral",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    // Smaller than the 16px body text, like the figure captions.
    themeVariables: { fontSize: "14px" },
    // Labels wrap at 240px (default 200px) so a line of code such as a signature stays whole.
    flowchart: { wrappingWidth: 240 },
    // Narrower participants and margins than Mermaid's defaults (150/50/50), so three or four
    // participants fit the 688px column.
    sequence: { actorFontSize: 14, messageFontSize: 14, noteFontSize: 13, width: 110, actorMargin: 30, diagramMarginX: 10 },
    gantt: { fontSize: 12, sectionFontSize: 13 },
    xyChart: { titleFontSize: 14, width: 680 }, // fits the 688px column
  });
  // Measure with the web fonts, not with a fallback that is replaced later.
  await document.fonts?.ready;
  const id = `mermaid-${Math.random().toString(36).slice(2)}-${seq++}`;
  try {
    const result = await mermaid.render(id, decodeURIComponent(props.code), scratch.value ?? undefined);
    svg.value = withMinScale(result.svg);
  } catch (e) {
    document.getElementById(`d${id}`)?.remove(); // temporary node left by a failed render
    svg.value = `<pre class="mermaid-error">${String(e?.message ?? e).replace(/</g, "&lt;")}</pre>`;
  } finally {
    scratch.value?.replaceChildren();
  }
}

onMounted(render);
watch(isDark, render);
</script>

<template>
  <div class="mermaid-figure">
    <div class="mermaid" v-html="svg"></div>
    <div ref="scratch" class="mermaid-scratch" aria-hidden="true"></div>
  </div>
</template>

<style scoped>
.mermaid-figure {
  position: relative;
}

.mermaid {
  display: flex;
  /* safe: a diagram wider than the column starts at the left edge and scrolls, not cut off */
  justify-content: safe center;
  margin: 16px 0;
  overflow-x: auto;
}

/* Invisible place where Mermaid lays out and measures a diagram before it is shown. */
.mermaid-scratch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
}

/* Labels: compact paragraphs instead of the article's spacing. */
.mermaid-figure :deep(foreignObject p) {
  margin: 0;
  line-height: 1.5;
}

/* Code in labels (<code>…</code>): monospace, without the inline-code chip of the article. */
.mermaid-figure :deep(foreignObject code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.93em;
  padding: 0;
  background: none;
  color: inherit;
}

.mermaid :deep(.mermaid-error) {
  color: var(--vp-c-danger-1);
  font-size: 13px;
  white-space: pre-wrap;
}
</style>
