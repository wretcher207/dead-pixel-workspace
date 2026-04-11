// scrub-existing-csv.js
// Runs the domain-probe filter against an existing leads CSV and outputs
// a cleaned version with false positives (businesses that actually HAVE
// a website) removed. Runs locally — no Apify, no credits.
//
// Usage:   node scrub-existing-csv.js 2026-04-10_maine-leads.csv
//          node scrub-existing-csv.js 2026-04-10_national-leads.csv

import fs from 'fs';
import path from 'path';
import { checkDomainExists } from './src/extractor.js';
import { EXCLUDED_KEYWORDS } from './src/constants.js';

function isExcludedBrand(name) {
    if (!name) return false;
    const lower = name.toLowerCase();
    return EXCLUDED_KEYWORDS.some((kw) => lower.includes(kw));
}

const inputFile = process.argv[2] || '2026-04-10_maine-leads.csv';

if (!fs.existsSync(inputFile)) {
    console.error(`File not found: ${inputFile}`);
    process.exit(1);
}

const raw = fs.readFileSync(inputFile, 'utf8');
const lines = raw.split(/\r?\n/).filter(Boolean);
const header = lines[0];
const rows = lines.slice(1);

console.log(`Loaded ${rows.length} rows from ${inputFile}`);
console.log(`Probing domains for each business (HEAD requests, ~1-4s each)...\n`);

// Parse a single CSV row that may contain quoted fields with commas/quotes
function parseCsvRow(row) {
    const out = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
        const ch = row[i];
        if (ch === '"' && row[i + 1] === '"') { cur += '"'; i++; continue; }
        if (ch === '"') { inQuotes = !inQuotes; continue; }
        if (ch === ',' && !inQuotes) { out.push(cur); cur = ''; continue; }
        cur += ch;
    }
    out.push(cur);
    return out;
}

const headerCols = parseCsvRow(header);
const nameIdx = headerCols.findIndex((c) => /business\s*name/i.test(c));
if (nameIdx === -1) {
    console.error('Could not find "Business Name" column in header.');
    console.error(`Header was: ${header}`);
    process.exit(1);
}

const kept = [];
const dropped = [];
let i = 0;

// Simple concurrency-limited loop — higher is fine since this is just HEAD requests
// to many different hosts (no rate limit risk per domain).
const CONCURRENCY = 20;
const queue = rows.map((row, idx) => ({ row, idx }));
const results = new Array(rows.length);

async function worker() {
    while (queue.length) {
        const job = queue.shift();
        if (!job) return;
        const cols = parseCsvRow(job.row);
        const name = cols[nameIdx];

        // Brand chain filter — catches Walmart, Dick's, etc. that slipped past
        // the upstream exclusion list. Mark them as "found" with a BRAND tag
        // so they get dropped.
        if (isExcludedBrand(name)) {
            results[job.idx] = { row: job.row, name, found: 'BRAND_CHAIN' };
            i++;
            process.stdout.write(`[${String(i).padStart(4)}/${rows.length}] ${name.padEnd(45).slice(0, 45)}  BRAND CHAIN\n`);
            continue;
        }

        const found = await checkDomainExists(name);
        results[job.idx] = { row: job.row, name, found };
        i++;
        const tag = found ? `HAS SITE  ${found}` : 'real lead';
        process.stdout.write(`[${String(i).padStart(4)}/${rows.length}] ${name.padEnd(45).slice(0, 45)}  ${tag}\n`);
    }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

for (const r of results) {
    if (r.found) dropped.push({ name: r.name, foundUrl: r.found });
    else kept.push(r.row);
}

const ext = path.extname(inputFile);
const base = path.basename(inputFile, ext);
const dir = path.dirname(inputFile);
const outFile = path.join(dir, `${base}-scrubbed${ext}`);
const droppedFile = path.join(dir, `${base}-dropped.csv`);

fs.writeFileSync(outFile, [header, ...kept].join('\n') + '\n');
fs.writeFileSync(
    droppedFile,
    'Business Name,Found URL\n' +
        dropped.map((d) => `"${d.name.replace(/"/g, '""')}","${d.foundUrl}"`).join('\n') +
        '\n'
);

const pct = ((dropped.length / rows.length) * 100).toFixed(1);
console.log(`\n===== DONE =====`);
console.log(`Original rows:    ${rows.length}`);
console.log(`Real leads kept:  ${kept.length}  →  ${outFile}`);
console.log(`False positives:  ${dropped.length} (${pct}%)  →  ${droppedFile}`);
