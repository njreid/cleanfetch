// ---------------------------------------------------------------------------
// Generated / non-semantic CSS class name detector
// ---------------------------------------------------------------------------

// --- Two-letter semantic allowlist ---
const TWO_LETTER_SET: ReadonlySet<string> = new Set([
  "is", "has", "no", "on", "to", "up", "md", "sm", "lg", "xl", "xs",
  "id", "bg", "ui", "ux", "sr",
]);

// --- Main word list ---
const WORD_LIST: readonly string[] = [
  // Structure
  "header", "footer", "main", "aside", "section", "article", "nav", "navbar",
  "body", "content", "container", "wrapper", "inner", "outer", "page",
  "layout", "column", "row", "grid", "flex", "block", "inline", "list",
  "item", "group", "panel", "sidebar", "hero", "banner", "masthead", "site",
  "app", "view", "screen",
  // Components
  "button", "card", "modal", "dialog", "popup", "tooltip", "dropdown", "menu",
  "tab", "form", "input", "field", "table", "badge", "tag", "chip", "icon",
  "image", "avatar", "thumbnail", "figure", "caption", "label", "link",
  "breadcrumb", "carousel", "slider", "gallery", "accordion", "progress",
  "spinner", "alert", "toast", "notification", "step", "wizard", "stepper",
  "overlay", "backdrop", "divider", "separator", "drawer", "sheet",
  "snackbar", "toolbar", "statusbar", "actionbar", "tabbar", "bottombar",
  // States & modifiers
  "active", "inactive", "hover", "focus", "disabled", "enabled", "selected",
  "checked", "expanded", "collapsed", "hidden", "visible", "open", "closed",
  "loading", "loaded", "error", "success", "warning", "danger", "info",
  "valid", "invalid", "required", "optional", "empty", "filled", "dirty",
  "pristine", "touched", "untouched", "pending", "resolved", "rejected",
  "busy", "idle", "muted", "faded", "dimmed", "highlighted", "pinned",
  "locked", "frozen", "archived", "deleted", "draft", "published",
  // Layout modifiers
  "primary", "secondary", "tertiary", "accent", "base", "default", "custom",
  "global", "local", "current", "fixed", "sticky", "absolute", "relative",
  "static", "fluid", "responsive", "adaptive", "centered", "aligned",
  "justified", "wrapped", "truncated", "clipped", "scrollable", "overflowed",
  // Sizes
  "small", "medium", "large", "mini", "tiny", "big", "huge", "compact",
  "narrow", "wide", "tall", "short", "full", "half", "quarter", "auto",
  "none", "normal", "minimal", "maximal",
  // Typography
  "text", "font", "heading", "title", "subtitle", "paragraph", "bold",
  "italic", "regular", "light", "thin", "semibold", "underline",
  "strikethrough", "mono", "sans", "serif", "uppercase", "lowercase",
  "capitalize", "nowrap", "ellipsis", "truncate", "readable", "legible",
  // Colors
  "color", "dark", "light", "inverse", "contrast", "monochrome",
  "transparent", "opaque", "gradient", "palette", "scheme", "surface",
  "background", "foreground", "highlight", "shadow", "border", "outline",
  "ring", "stroke", "fill",
  // Positions & directions
  "top", "bottom", "left", "right", "center", "middle", "start", "end",
  "above", "below", "before", "after", "next", "previous", "first", "last",
  "leading", "trailing", "horizontal", "vertical", "diagonal", "inward",
  "outward", "forward", "backward", "reverse", "opposite",
  // Actions
  "search", "filter", "sort", "add", "remove", "delete", "edit", "save",
  "submit", "cancel", "close", "toggle", "show", "hide", "load", "reload",
  "refresh", "update", "create", "reset", "clear", "play", "pause", "stop",
  "scroll", "expand", "collapse", "drag", "drop", "resize", "rotate", "zoom",
  "pan", "swipe", "click", "press", "blur", "change", "select", "check",
  "upload", "download", "share", "copy", "paste", "cut", "undo", "redo",
  "print", "export", "import",
  // Abbreviations
  "btn", "col", "img", "sec", "cat", "alt", "src", "ref", "num", "str",
  "val", "var", "api", "url", "svg", "css", "html", "pic", "vid", "doc",
  "lib", "util", "config", "param", "arg", "opts", "props", "attr", "elem",
  "comp", "ctrl", "mgr", "svc", "repo", "ctx", "env", "tmp", "buf", "ptr",
  "idx", "cnt", "len", "min", "max", "avg", "sum", "diff", "prev", "curr",
  "init", "calc", "gen", "pub", "sub", "ret", "req", "res", "err", "msg",
  "log", "fmt", "sep", "delim", "addr", "auth", "perm", "role", "user",
  "admin", "guest", "owner", "member", "client", "server", "agent", "proxy",
  "cache", "queue", "pool", "batch", "chunk", "size", "type", "name", "path",
  "file", "data", "meta", "detail", "summary", "desc", "note", "code", "key",
  "date", "time", "hour", "year", "month", "day",
  // Common English words used in class names
  "above", "action", "align", "allow", "apply", "area", "around", "back",
  "break", "built", "call", "change", "check", "class", "clean", "control",
  "count", "cover", "direction", "display", "drop", "dynamic", "element",
  "event", "every", "extra", "feature", "flow", "follow", "handle", "height",
  "help", "high", "home", "host", "index", "level", "line", "margin",
  "match", "media", "mobile", "mode", "model", "number", "object", "offset",
  "order", "other", "override", "own", "padding", "parent", "place", "point",
  "position", "preview", "push", "route", "space", "split", "status",
  "store", "style", "switch", "target", "theme", "track", "transform",
  "transition", "trigger", "value", "version", "viewport", "weight", "width",
  "wrap", "zone", "box", "mask", "arrow", "flag", "lock", "mark", "move",
  "plan", "plus", "rate", "read", "rule", "scope", "sign", "skip", "slot",
  "span", "spec", "swap", "sync", "test", "tick", "tile", "tool", "tree",
  "trim", "unit", "void", "wait", "work", "state", "shape", "depth", "speed",
  "delay", "scale", "angle", "range", "ratio", "alpha", "delta", "gamma",
  "sigma", "limit", "bound", "clip", "crop", "glow", "grow", "fade", "flip",
  "spin", "wave", "snap", "pipe", "hook", "port", "node", "edge", "leaf",
  "root", "stem", "core", "hub", "bus", "map", "set", "get", "put", "post",
  "patch", "head", "hand", "arm", "leg", "eye", "ear", "door", "window",
  "frame", "shelf", "rack", "stack", "layer", "tier", "rank", "kind",
  // Additional web terms
  "desktop", "tablet", "touch", "mouse", "keyboard", "portrait", "landscape",
  "retina", "pixel", "vector", "raster", "brand", "logo", "identity",
  "spacing", "rhythm", "density", "motion", "animation", "keyframe",
  "duration", "easing", "spring", "bounce", "elastic", "smooth", "instant",
  "fast", "slow",
];

const WORD_SET: ReadonlySet<string> = new Set(WORD_LIST);

// --- Known CSS-in-JS prefix patterns ---
const GENERATED_PREFIX_RE =
  /^(?:sc-|css-|jsx-|emotion-|styled-|tw-|_[a-zA-Z])/;

// Pure hex string (3–8 hex chars, no non-hex chars)
const PURE_HEX_RE = /^[0-9a-f]{3,8}$/i;

// ---------------------------------------------------------------------------
// Stemmer — try suffixes longest-first, only for words longer than 5 chars
// ---------------------------------------------------------------------------

const SUFFIX_RULES: readonly [string, string][] = [
  ["-ations", ""],
  ["-ation",  ""],
  ["-ments",  ""],
  ["-ment",   ""],
  ["-ness",   ""],
  ["-ings",   ""],
  ["-ing",    ""],
  ["-able",   ""],
  ["-ible",   ""],
  ["-tion",   ""],
  ["-sion",   ""],
  ["-ical",   ""],
  ["-ful",    ""],
  ["-less",   ""],
  ["-ous",    ""],
  ["-ive",    ""],
  ["-ize",    ""],
  ["-ise",    ""],
  ["-ion",    ""],
  ["-ies",    "y"],
  ["-ied",    "y"],
  ["-al",     ""],
  ["-ly",     ""],
  ["-er",     ""],
  ["-ed",     ""],
  ["-es",     ""],
  ["-s",      ""],
];

function stem(word: string): string {
  if (word.length <= 5) return word;
  for (const [suffix, replacement] of SUFFIX_RULES) {
    const bare = suffix.slice(1); // strip leading '-'
    if (word.endsWith(bare)) {
      const stemmed = word.slice(0, word.length - bare.length) + replacement;
      if (stemmed.length >= 3) return stemmed;
    }
  }
  return word;
}

// ---------------------------------------------------------------------------
// Per-segment word check
// ---------------------------------------------------------------------------

function vowelCount(s: string): number {
  let n = 0;
  for (const ch of s) {
    if ("aeiou".includes(ch)) n++;
  }
  return n;
}

function isWordSegment(seg: string): boolean {
  const len = seg.length;
  if (len <= 1) return false;
  if (len === 2) return TWO_LETTER_SET.has(seg);
  // Heuristic hash rejection
  if (len >= 5 && vowelCount(seg) === 0) return false;
  if (len >= 6 && vowelCount(seg) / len < 0.12) return false;
  return WORD_SET.has(seg) || WORD_SET.has(stem(seg));
}

// ---------------------------------------------------------------------------
// Segmentation — split on `-` and `_`, then split camelCase boundaries
// ---------------------------------------------------------------------------

function segmentClass(cls: string): string[] {
  // Split on hyphens and underscores first
  const parts = cls.split(/[-_]/);
  const segments: string[] = [];
  for (const part of parts) {
    if (!part) continue;
    // Split camelCase: insert boundary before each uppercase letter
    const camelParts = part
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .split(" ");
    for (const cp of camelParts) {
      if (cp) segments.push(cp.toLowerCase());
    }
  }
  return segments;
}

// ---------------------------------------------------------------------------
// Module-level result cache
// ---------------------------------------------------------------------------

const cache = new Map<string, boolean>();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns `true` if `cls` looks like a generated/minified CSS class name
 * (and should therefore be removed), `false` if it appears semantic.
 */
export function isGeneratedClassName(cls: string): boolean {
  const cached = cache.get(cls);
  if (cached !== undefined) return cached;

  const result = _check(cls);
  cache.set(cls, result);
  return result;
}

function _check(cls: string): boolean {
  // Layer 1 — known CSS-in-JS prefixes
  if (GENERATED_PREFIX_RE.test(cls)) return true;

  // Pure hex string
  if (PURE_HEX_RE.test(cls)) return true;

  // Layer 2 — segmentation + Layer 3 — word check
  // Conservative: keep the class if ANY segment is word-like
  const segments = segmentClass(cls);
  if (segments.length === 0) return true; // nothing recognisable

  for (const seg of segments) {
    if (isWordSegment(seg)) return false; // at least one real word — keep it
  }

  return true; // no segment was word-like — treat as generated
}
