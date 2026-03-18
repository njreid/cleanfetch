import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as cheerio from "cheerio";

// ---------------------------------------------------------------------------
// Tailwind detection
// ---------------------------------------------------------------------------

const TAILWIND_EXACT: ReadonlySet<string> = new Set([
  "block", "inline-block", "inline", "flex", "inline-flex", "table",
  "inline-table", "table-caption", "table-cell", "table-column",
  "table-column-group", "table-footer-group", "table-header-group",
  "table-row-group", "table-row", "flow-root", "grid", "inline-grid",
  "contents", "list-item", "hidden",
  "static", "fixed", "absolute", "relative", "sticky",
  "grow", "shrink",
  "italic", "not-italic",
  "uppercase", "lowercase", "capitalize", "normal-case",
  "underline", "overline", "line-through", "no-underline",
  "truncate", "text-ellipsis", "text-clip",
  "antialiased", "subpixel-antialiased",
  "sr-only", "not-sr-only",
  "container",
  "prose",
  "border", "rounded", "shadow", "blur", "grayscale", "invert",
  "visible", "invisible", "collapse",
  "float-right", "float-left", "float-none",
  "clear-left", "clear-right", "clear-both", "clear-none",
  "isolate", "isolation-auto",
  "object-contain", "object-cover", "object-fill", "object-none", "object-scale-down",
  "overflow-auto", "overflow-hidden", "overflow-clip", "overflow-visible", "overflow-scroll",
  "overscroll-auto", "overscroll-contain", "overscroll-none",
  "pointer-events-none", "pointer-events-auto",
  "resize-none", "resize-y", "resize-x", "resize",
  "select-none", "select-text", "select-all", "select-auto",
  "align-baseline", "align-top", "align-middle", "align-bottom",
  "align-text-top", "align-text-bottom", "align-sub", "align-super",
  "whitespace-normal", "whitespace-nowrap", "whitespace-pre",
  "whitespace-pre-line", "whitespace-pre-wrap", "whitespace-break-spaces",
  "break-normal", "break-words", "break-all", "break-keep",
  "border-collapse", "border-separate",
  "table-auto", "table-fixed",
  "transition", "duration", "ease", "delay", "animate",
  "cursor-auto", "cursor-default", "cursor-pointer", "cursor-wait",
  "cursor-text", "cursor-move", "cursor-help", "cursor-not-allowed",
  "cursor-none", "cursor-context-menu", "cursor-progress",
  "cursor-cell", "cursor-crosshair", "cursor-vertical-text",
  "cursor-alias", "cursor-copy", "cursor-no-drop", "cursor-grab",
  "cursor-grabbing", "cursor-all-scroll", "cursor-col-resize",
  "cursor-row-resize", "cursor-n-resize", "cursor-e-resize",
  "cursor-s-resize", "cursor-w-resize", "cursor-ne-resize",
  "cursor-nw-resize", "cursor-se-resize", "cursor-sw-resize",
  "cursor-ew-resize", "cursor-ns-resize", "cursor-nesw-resize",
  "cursor-nwse-resize", "cursor-zoom-in", "cursor-zoom-out",
  "touch-auto", "touch-none", "touch-pan-x", "touch-pan-left",
  "touch-pan-right", "touch-pan-y", "touch-pan-up", "touch-pan-down",
  "touch-pinch-zoom", "touch-manipulation",
  "appearance-none", "appearance-auto",
  "box-border", "box-content",
  "flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse",
  "flex-wrap", "flex-wrap-reverse", "flex-nowrap",
  "items-start", "items-end", "items-center", "items-baseline", "items-stretch",
  "justify-normal", "justify-start", "justify-end", "justify-center",
  "justify-between", "justify-around", "justify-evenly", "justify-stretch",
  "self-auto", "self-start", "self-end", "self-center",
  "self-stretch", "self-baseline",
  "font-thin", "font-extralight", "font-light", "font-normal",
  "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black",
  "text-left", "text-center", "text-right", "text-justify", "text-start", "text-end",
]);

const TAILWIND_PREFIXES: readonly string[] = [
  // Spacing
  "p-", "px-", "py-", "pt-", "pr-", "pb-", "pl-", "ps-", "pe-",
  "m-", "mx-", "my-", "mt-", "mr-", "mb-", "ml-", "ms-", "me-",
  "space-x-", "space-y-", "space-",
  // Sizing
  "w-", "h-", "size-",
  "min-w-", "max-w-", "min-h-", "max-h-",
  // Typography
  "text-", "font-", "leading-", "tracking-", "indent-",
  "line-clamp-",
  // Backgrounds
  "bg-", "from-", "via-", "to-", "bg-gradient-",
  // Borders
  "border-", "rounded-", "outline-", "ring-", "ring-offset-", "divide-",
  // Shadows / Effects
  "shadow-", "opacity-", "blur-", "brightness-", "contrast-",
  "drop-shadow-", "grayscale-", "hue-rotate-", "invert-", "saturate-",
  "sepia-", "backdrop-",
  // Flexbox / Grid
  "flex-", "grid-", "gap-", "gap-x-", "gap-y-",
  "col-", "row-", "basis-", "order-",
  "content-", "place-items-", "place-content-", "place-self-",
  "justify-items-", "justify-self-",
  // Positioning
  "z-", "top-", "right-", "bottom-", "left-", "inset-",
  // Transforms
  "scale-", "rotate-", "translate-", "skew-", "origin-",
  // Transitions / Animations
  "transition-", "duration-", "ease-", "delay-", "animate-",
  // Interactivity
  "cursor-", "scroll-", "snap-", "touch-", "will-change-",
  // SVG
  "fill-", "stroke-",
  // Layout
  "aspect-", "columns-", "overflow-", "overscroll-",
  // Lists
  "list-",
  // Prose
  "prose-",
  // Misc
  "caret-", "accent-", "decoration-",
  "object-", "float-", "clear-",
  "table-",
  // Negative variants (e.g. -m-4, -translate-x-2)
  "-m-", "-mx-", "-my-", "-mt-", "-mr-", "-mb-", "-ml-",
  "-p-", "-px-", "-py-", "-pt-", "-pr-", "-pb-", "-pl-",
  "-z-", "-top-", "-right-", "-bottom-", "-left-", "-inset-",
  "-translate-", "-rotate-", "-skew-", "-scale-",
  "-space-",
];

// Variant prefixes — greedy strip (handles group-hover:, peer-focus:, aria-*:, data-*:)
const VARIANT_RE =
  /^(?:(?:sm|md|lg|xl|2xl|dark|hover|focus|focus-within|focus-visible|active|checked|disabled|first|last|odd|even|before|after|placeholder|print|rtl|ltr|motion-safe|motion-reduce|group(?:-[a-z0-9-]*)?|peer(?:-[a-z0-9-]*)?|aria-[a-z0-9-]+|data-[a-z0-9-]+):)*/;

function stripVariants(cls: string): string {
  return cls.replace(VARIANT_RE, "");
}

function isTailwind(cls: string): boolean {
  const core = stripVariants(cls);
  if (!core) return true; // pure variant — remove it
  // Arbitrary value
  if (/\[.*]/.test(core)) return true;
  // Exact match
  if (TAILWIND_EXACT.has(core)) return true;
  // Prefix match
  for (const prefix of TAILWIND_PREFIXES) {
    if (core.startsWith(prefix)) return true;
  }
  return false;
}

function filterClasses(classAttr: string): string {
  return classAttr
    .split(/\s+/)
    .filter((c) => c.length > 0 && !isTailwind(c))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Short-ID generation
// ---------------------------------------------------------------------------

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomShortId(): string {
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return id;
}

function uniqueShortId(used: Set<string>): string {
  let id: string;
  do {
    id = randomShortId();
  } while (used.has(id));
  used.add(id);
  return id;
}

// ---------------------------------------------------------------------------
// HTML cleaning
// ---------------------------------------------------------------------------

export function cleanHtml(raw: string): string {
  const $ = cheerio.load(raw, { decodeEntities: false });

  // 1. Remove <style> blocks
  $("style").remove();

  // 2. Remove stylesheet <link> tags
  $('link[rel="stylesheet"], link[as="style"]').remove();

  // 3. Remove style= attributes
  $("[style]").removeAttr("style");

  // 4. Strip Tailwind classes from class= attributes
  $("[class]").toArray().forEach((el) => {
    const node = $(el);
    const original = node.attr("class") ?? "";
    const cleaned = filterClasses(original);
    if (cleaned) {
      node.attr("class", cleaned);
    } else {
      node.removeAttr("class");
    }
  });

  // 5. Replace long id= values with short IDs and update references
  const idMap = new Map<string, string>(); // oldId -> newId
  const usedIds = new Set<string>();

  $("[id]").toArray().forEach((el) => {
    const node = $(el);
    const oldId = node.attr("id") ?? "";
    if (oldId.length > 5) {
      if (!idMap.has(oldId)) {
        idMap.set(oldId, uniqueShortId(usedIds));
      }
      node.attr("id", idMap.get(oldId) as string);
    } else if (oldId) {
      usedIds.add(oldId);
    }
  });

  // Update href="#oldId" anchor references
  $('a[href^="#"], area[href^="#"]').toArray().forEach((el) => {
    const node = $(el);
    const href = node.attr("href") ?? "";
    const target = href.slice(1); // strip leading #
    if (idMap.has(target)) {
      node.attr("href", `#${idMap.get(target) as string}`);
    }
  });

  // Update for= / htmlFor= references
  $("[for]").toArray().forEach((el) => {
    const node = $(el);
    const forVal = node.attr("for") ?? "";
    if (idMap.has(forVal)) {
      node.attr("for", idMap.get(forVal) as string);
    }
  });

  // 6. Collapse excess blank lines in the serialised output
  const html = $.html();
  return html.replace(/(\n\s*){3,}/g, "\n\n");
}

// ---------------------------------------------------------------------------
// HTTP fetch helper
// ---------------------------------------------------------------------------

export async function fetchUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) " +
        "Chrome/124.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} — ${url}`);
  }

  return response.text();
}

// ---------------------------------------------------------------------------
// MCP server
// ---------------------------------------------------------------------------

const server = new McpServer({ name: "clean-web-fetch", version: "1.0.0" });

server.tool(
  "CleanWebFetch",
  {
    url: z.string().describe("The URL to fetch."),
    prompt: z.string().optional().describe("Optional hint about what content you are looking for."),
  },
  { title: "CleanWebFetch" },
  async ({ url }) => {
    try {
      const raw = await fetchUrl(url);
      const cleaned = cleanHtml(raw);
      return { content: [{ type: "text" as const, text: cleaned }] };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text" as const, text: `Error fetching ${url}: ${message}` }],
        isError: true,
      };
    }
  }
);

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${String(err)}\n`);
  process.exit(1);
});
