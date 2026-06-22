import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.SMOKE_URL ?? "http://localhost:3100";

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(800);

const step = async (name, fn) => {
  try {
    await fn();
    console.log("OK:", name);
  } catch (e) {
    console.log("FAIL:", name, "-", e.message.split("\n")[0]);
  }
};

// The Design panel is open by default; screenshot the full thumbnail grid.
await step("thumbnail grid renders all 10 swatches", async () => {
  const grid = page.locator('button[aria-label="رنگین‌کمان"]');
  await grid.waitFor({ state: "visible", timeout: 10000 });
  const labels = [
    "ساده (سفید)", "حباب‌های نرم", "برگ و شاخه", "نوار زیگزاگ", "قاب و حلقه",
    "زیگزاگ ریز", "رنگین‌کمان", "کمان‌های هم‌مرکز", "نقطه‌چین محو", "خطوط منحنی",
  ];
  for (const l of labels) {
    const n = await page.locator(`button[aria-label="${l}"]`).count();
    if (n < 1) throw new Error(`missing thumbnail: ${l}`);
  }
});
await page.screenshot({ path: "scripts/p-grid.png", fullPage: true });

// Select each new pattern, screenshot, and confirm at least one themed motif
// element actually rendered into the A4 page.
const newPatterns = [
  ["برگ و شاخه", "botanical"],
  ["نوار زیگزاگ", "chevronBands"],
  ["قاب و حلقه", "bracketsRings"],
  ["زیگزاگ ریز", "chevronField"],
  ["رنگین‌کمان", "rainbow"],
  ["کمان‌های هم‌مرکز", "concentricArcs"],
  ["نقطه‌چین محو", "dotGrid"],
  ["خطوط منحنی", "topoLines"],
];

for (const [label, id] of newPatterns) {
  await step(`select ${id} (${label})`, async () => {
    await page.locator(`button[aria-label="${label}"]`).click();
    await page.waitForTimeout(900); // allow the ~600ms debounced autosave to flush
    const persisted = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("ai-res:resume")).theme.backgroundPattern,
    );
    if (persisted !== id) throw new Error(`persisted ${persisted}, expected ${id}`);
    // Motif elements live inside the first A4 page's decoration SVG.
    const motifCount = await page.evaluate(() => {
      const pageEl = document.querySelector(".a4-page svg");
      return pageEl ? pageEl.querySelectorAll("path,circle,ellipse,polyline,line").length : 0;
    });
    if (motifCount < 1) throw new Error("no motif elements rendered in A4 page");
  });
}
await page.screenshot({ path: "scripts/p-topo.png", fullPage: true });

// Theme recolour: pick concentric arcs, read its stroke colour, switch theme,
// confirm currentColor changed (rainbow stays fixed — verified separately).
await step("themed pattern recolours with accent", async () => {
  await page.locator('button[aria-label="کمان‌های هم‌مرکز"]').click();
  await page.waitForTimeout(250);
  const colorOf = () =>
    page.evaluate(() => {
      const g = document.querySelector(".a4-page svg g[style*='color']");
      return g ? getComputedStyle(g).color : null;
    });
  const before = await colorOf();
  await page.getByRole("button", { name: "آبی آسمانی" }).click(); // skyBlue
  await page.waitForTimeout(300);
  const after = await colorOf();
  if (!before || !after) throw new Error("could not read motif color");
  if (before === after) throw new Error(`color did not change: ${before}`);
  console.log(`   accent recolour: ${before} -> ${after}`);
});

// Rainbow must ignore the theme (fixed palette).
await step("rainbow ignores theme hue (fixed palette)", async () => {
  await page.locator('button[aria-label="رنگین‌کمان"]').click();
  await page.waitForTimeout(250);
  const strokes = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".a4-page svg line")).map((l) => l.getAttribute("stroke")),
  );
  const expected = ["#FF9E9E", "#FFC078", "#FFE08A", "#8FD9A8", "#8FC9F0", "#B79CF0"];
  const ok = expected.every((c) => strokes.includes(c));
  if (!ok) throw new Error(`rainbow strokes wrong: ${JSON.stringify(strokes)}`);
});

console.log("CONSOLE_ERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
