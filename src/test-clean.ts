import { fetchUrl, cleanHtml } from "./index.js";

const URLS: Array<{ label: string; url: string }> = [
  { label: "Wikipedia (random)", url: "https://en.wikipedia.org/wiki/Special:Random" },
  { label: "BBC News",           url: "https://www.bbc.com/news" },
  { label: "Ars Technica",       url: "https://arstechnica.com" },
  { label: "The Verge",          url: "https://www.theverge.com" },
  { label: "Zillow",             url: "https://www.zillow.com" },
  { label: "NY Times",           url: "https://www.nytimes.com" },
];

function kb(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function pct(before: number, after: number): string {
  return `${(((before - after) / before) * 100).toFixed(1)}%`;
}

async function run(): Promise<void> {
  const col = { label: 22, before: 12, after: 12, reduction: 12 };
  const header = [
    "Page".padEnd(col.label),
    "Before".padStart(col.before),
    "After".padStart(col.after),
    "Reduction".padStart(col.reduction),
  ].join("  ");
  const divider = "-".repeat(header.length);

  console.log("\n" + header);
  console.log(divider);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const { label, url } of URLS) {
    process.stdout.write(`Fetching ${label}...`);
    try {
      const raw = await fetchUrl(url);
      const cleaned = cleanHtml(raw);
      const before = Buffer.byteLength(raw, "utf8");
      const after = Buffer.byteLength(cleaned, "utf8");
      totalBefore += before;
      totalAfter += after;

      process.stdout.write("\r");
      console.log(
        [
          label.padEnd(col.label),
          kb(before).padStart(col.before),
          kb(after).padStart(col.after),
          pct(before, after).padStart(col.reduction),
        ].join("  ")
      );
    } catch (err) {
      process.stdout.write("\r");
      console.log(
        label.padEnd(col.label) + "  " + String(err instanceof Error ? err.message : err)
      );
    }
  }

  console.log(divider);
  console.log(
    [
      "TOTAL".padEnd(col.label),
      kb(totalBefore).padStart(col.before),
      kb(totalAfter).padStart(col.after),
      pct(totalBefore, totalAfter).padStart(col.reduction),
    ].join("  ")
  );
  console.log();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
