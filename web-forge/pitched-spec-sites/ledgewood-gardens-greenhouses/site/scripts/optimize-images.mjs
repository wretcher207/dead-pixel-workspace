// Generates responsive WebP variants for every showcase JPG.
// Runs automatically on `npm run dev` and `npm run build`.
//
// Output budget target: under 120 KB per 1600w variant at quality 78.
// If a file already exists and is newer than the source JPG, it's skipped.

import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const SHOWCASE_DIR = path.resolve(__dirname, "..", "public", "images", "showcase");
const LOGO_DIR = path.resolve(__dirname, "..", "public", "images");

// Photos are flower macros with lots of detail — they need more aggressive
// compression than stock UI graphics. Budget: 1600w under 150 KB, 800w under
// 85 KB. We retry at lower quality when a variant blows past the budget.
const WIDTHS = [
  { width: 800, budgetBytes: 85 * 1024, qualities: [72, 62, 55] },
  { width: 1600, budgetBytes: 150 * 1024, qualities: [65, 58, 52] },
];

async function existsAndFresh(sourcePath, targetPath) {
  try {
    const [src, tgt] = await Promise.all([fs.stat(sourcePath), fs.stat(targetPath)]);
    return tgt.mtimeMs >= src.mtimeMs;
  } catch {
    return false;
  }
}

async function processOne(sourcePath, widthSpecs) {
  const base = path.basename(sourcePath, path.extname(sourcePath));
  const dir = path.dirname(sourcePath);
  const results = [];
  for (const spec of widthSpecs) {
    const outPath = path.join(dir, `${base}-${spec.width}.webp`);
    if (await existsAndFresh(sourcePath, outPath)) {
      results.push({ outPath, skipped: true });
      continue;
    }
    let finalQuality = spec.qualities[0];
    for (const q of spec.qualities) {
      await sharp(sourcePath)
        .resize({ width: spec.width, withoutEnlargement: true })
        .webp({ quality: q, effort: 6 })
        .toFile(outPath);
      const { size } = await fs.stat(outPath);
      if (size <= spec.budgetBytes) {
        finalQuality = q;
        results.push({ outPath, size, quality: q, skipped: false });
        break;
      }
      finalQuality = q;
      if (q === spec.qualities[spec.qualities.length - 1]) {
        // Stick with the most aggressive quality even if still over budget.
        results.push({ outPath, size, quality: q, skipped: false, overBudget: true });
      }
    }
  }
  return results;
}

async function main() {
  const start = Date.now();
  let processed = 0;
  let skipped = 0;
  let overBudget = 0;

  const showcaseEntries = await fs.readdir(SHOWCASE_DIR);
  const showcaseJpgs = showcaseEntries
    .filter((name) => name.toLowerCase().endsWith(".jpg"))
    .sort();

  for (const name of showcaseJpgs) {
    const source = path.join(SHOWCASE_DIR, name);
    const results = await processOne(source, WIDTHS);
    for (const r of results) {
      if (r.skipped) {
        skipped += 1;
      } else {
        processed += 1;
        const kb = Math.round(r.size / 1024);
        if (r.overBudget) overBudget += 1;
        const flag = r.overBudget ? " [over budget]" : "";
        const q = r.quality !== undefined ? ` q${r.quality}` : "";
        console.log(
          `  ${path.basename(r.outPath).padEnd(26)} ${kb
            .toString()
            .padStart(4)} KB${q}${flag}`,
        );
      }
    }
  }

  // Also generate a small WebP variant for the logo for crisp rendering at high DPR.
  try {
    const logoPath = path.join(LOGO_DIR, "logo.jpg");
    const logoOut = path.join(LOGO_DIR, "logo-480.webp");
    if (!(await existsAndFresh(logoPath, logoOut))) {
      await sharp(logoPath)
        .resize({ width: 480, withoutEnlargement: true })
        .webp({ quality: 90, effort: 5 })
        .toFile(logoOut);
      console.log(`  logo-480.webp              generated`);
      processed += 1;
    } else {
      skipped += 1;
    }
  } catch (err) {
    console.warn("  logo webp generation skipped:", err.message);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(
    `\n[optimize-images] ${processed} generated, ${skipped} cached, ${overBudget} over budget in ${elapsed}s`,
  );
}

main().catch((err) => {
  console.error("[optimize-images] failed:", err);
  process.exit(1);
});
