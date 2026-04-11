// brand-cleanup.js
// Applies the EXCLUDED_KEYWORDS brand filter to an already-scrubbed CSV.
// Catches chain stores that slipped past an earlier scrub pass with a
// shorter keyword list.
//
// Usage:   node brand-cleanup.js 2026-04-10_national-leads-scrubbed.csv

import fs from 'fs';
import path from 'path';
import { EXCLUDED_KEYWORDS } from './src/constants.js';

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node brand-cleanup.js <scrubbed-csv>');
    process.exit(1);
}
if (!fs.existsSync(inputFile)) {
    console.error(`File not found: ${inputFile}`);
    process.exit(1);
}

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

const raw = fs.readFileSync(inputFile, 'utf8');
const lines = raw.split(/\r?\n/).filter(Boolean);
const header = lines[0];
const rows = lines.slice(1);

const headerCols = parseCsvRow(header);
const nameIdx = headerCols.findIndex((c) => /business\s*name/i.test(c));
if (nameIdx === -1) {
    console.error('Could not find "Business Name" column');
    process.exit(1);
}

const kept = [];
const dropped = [];

for (const row of rows) {
    const cols = parseCsvRow(row);
    const name = (cols[nameIdx] || '').toLowerCase();
    const hit = EXCLUDED_KEYWORDS.find((kw) => name.includes(kw));
    if (hit) {
        dropped.push({ name: cols[nameIdx], reason: hit });
    } else {
        kept.push(row);
    }
}

const ext = path.extname(inputFile);
const base = path.basename(inputFile, ext);
const dir = path.dirname(inputFile);
const outFile = path.join(dir, `${base}-cleaned${ext}`);
const droppedFile = path.join(dir, `${base}-brand-dropped.csv`);

fs.writeFileSync(outFile, [header, ...kept].join('\n') + '\n');
fs.writeFileSync(
    droppedFile,
    'Business Name,Matched Keyword\n' +
        dropped.map((d) => `"${d.name.replace(/"/g, '""')}","${d.reason}"`).join('\n') +
        '\n'
);

console.log(`\n===== BRAND CLEANUP DONE =====`);
console.log(`Input rows:       ${rows.length}`);
console.log(`Kept:             ${kept.length}  →  ${outFile}`);
console.log(`Brand dropped:    ${dropped.length}  →  ${droppedFile}`);
