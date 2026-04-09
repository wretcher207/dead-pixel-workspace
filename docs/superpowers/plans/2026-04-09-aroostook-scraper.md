# Aroostook County Business Scraper — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a custom Apify actor that scrapes Google Maps for year-round small businesses across Aroostook County, Maine, outputting CSV with contact data for AI voice bot pitch outreach.

**Architecture:** Node.js Apify actor using PlaywrightCrawler to render Google Maps. Generates a category×town search matrix, scrolls/clicks through results, extracts business details, deduplicates, filters seasonal businesses, and pushes to Apify Dataset with auto CSV export.

**Tech Stack:** Node.js 18+, Crawlee (PlaywrightCrawler), Apify SDK v3, Playwright, Apify residential proxies

---

### Task 1: Project Scaffold & Apify Actor Config

**Files:**
- Create: `web-forge/bots/aroostook-scraper/.actor/actor.json`
- Create: `web-forge/bots/aroostook-scraper/.actor/INPUT_SCHEMA.json`
- Create: `web-forge/bots/aroostook-scraper/package.json`
- Create: `web-forge/bots/aroostook-scraper/Dockerfile`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "aroostook-scraper",
  "version": "1.0.0",
  "description": "Scrapes Google Maps for small businesses in Aroostook County, Maine",
  "type": "module",
  "main": "src/main.js",
  "scripts": {
    "start": "node src/main.js",
    "test": "node --experimental-vm-modules node_modules/.bin/jest"
  },
  "dependencies": {
    "apify": "^3.1.0",
    "crawlee": "^3.5.0",
    "playwright": "^1.40.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "@jest/globals": "^29.7.0"
  }
}
```

- [ ] **Step 2: Create actor.json**

```json
{
  "actorSpecification": 1,
  "name": "aroostook-scraper",
  "title": "Aroostook County Business Scraper",
  "description": "Scrapes Google Maps for year-round small businesses in Aroostook County, Maine",
  "version": "1.0.0",
  "input": "./INPUT_SCHEMA.json",
  "dockerfile": "../Dockerfile"
}
```

- [ ] **Step 3: Create INPUT_SCHEMA.json**

```json
{
  "title": "Aroostook County Business Scraper",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "categories": {
      "title": "Business Categories",
      "type": "array",
      "description": "Business categories to search on Google Maps",
      "editor": "stringList",
      "default": [
        "medical offices",
        "dental offices",
        "veterinary clinics",
        "auto repair",
        "insurance agencies",
        "property management",
        "hotels motels",
        "funeral homes",
        "plumbing HVAC electrical",
        "legal offices",
        "real estate agencies",
        "accounting tax preparation",
        "pharmacies"
      ]
    },
    "towns": {
      "title": "Towns",
      "type": "array",
      "description": "Towns to search within Aroostook County",
      "editor": "stringList",
      "default": [
        "Houlton",
        "Presque Isle",
        "Caribou",
        "Fort Kent",
        "Madawaska",
        "Van Buren",
        "Limestone",
        "Mars Hill",
        "Ashland",
        "Fort Fairfield",
        "Washburn",
        "Easton",
        "Mapleton"
      ]
    },
    "maxConcurrency": {
      "title": "Max Concurrent Browsers",
      "type": "integer",
      "description": "Maximum number of browser tabs running at once",
      "default": 3,
      "maximum": 5,
      "minimum": 1
    },
    "delayMin": {
      "title": "Min Delay (seconds)",
      "type": "integer",
      "description": "Minimum random delay between actions",
      "default": 2
    },
    "delayMax": {
      "title": "Max Delay (seconds)",
      "type": "integer",
      "description": "Maximum random delay between actions",
      "default": 5
    }
  }
}
```

- [ ] **Step 4: Create Dockerfile**

```dockerfile
FROM apify/actor-node-playwright-chrome:18

COPY package.json ./
RUN npm install --omit=dev --omit=optional \
    && echo "Installed NPM packages:" \
    && (npm list --omit=dev --all || true) \
    && echo "Node.js version:" \
    && node --version \
    && echo "NPM version:" \
    && npm --version

COPY . ./

CMD npm start
```

- [ ] **Step 5: Install dependencies locally**

Run: `cd web-forge/bots/aroostook-scraper && npm install`

- [ ] **Step 6: Commit**

```bash
git add web-forge/bots/aroostook-scraper/
git commit -m "feat(scraper): scaffold Apify actor with input schema"
```

---

### Task 2: Constants — Town List, Category List, Selectors

**Files:**
- Create: `web-forge/bots/aroostook-scraper/src/constants.js`
- Create: `web-forge/bots/aroostook-scraper/tests/constants.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/constants.test.js
import { describe, expect, test } from '@jest/globals';
import { DEFAULT_TOWNS, DEFAULT_CATEGORIES, SELECTORS } from '../src/constants.js';

describe('constants', () => {
    test('DEFAULT_TOWNS contains all major Aroostook towns', () => {
        expect(DEFAULT_TOWNS).toContain('Houlton');
        expect(DEFAULT_TOWNS).toContain('Presque Isle');
        expect(DEFAULT_TOWNS).toContain('Caribou');
        expect(DEFAULT_TOWNS).toContain('Fort Kent');
        expect(DEFAULT_TOWNS.length).toBeGreaterThanOrEqual(13);
    });

    test('DEFAULT_CATEGORIES contains target business types', () => {
        expect(DEFAULT_CATEGORIES).toContain('medical offices');
        expect(DEFAULT_CATEGORIES).toContain('dental offices');
        expect(DEFAULT_CATEGORIES).toContain('veterinary clinics');
        expect(DEFAULT_CATEGORIES.length).toBeGreaterThanOrEqual(13);
    });

    test('SELECTORS has required Google Maps selectors', () => {
        expect(SELECTORS.searchBox).toBeDefined();
        expect(SELECTORS.resultItem).toBeDefined();
        expect(SELECTORS.businessName).toBeDefined();
        expect(SELECTORS.phone).toBeDefined();
        expect(SELECTORS.address).toBeDefined();
        expect(SELECTORS.website).toBeDefined();
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/constants.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Write implementation**

```js
// src/constants.js

export const DEFAULT_TOWNS = [
    'Houlton',
    'Presque Isle',
    'Caribou',
    'Fort Kent',
    'Madawaska',
    'Van Buren',
    'Limestone',
    'Mars Hill',
    'Ashland',
    'Fort Fairfield',
    'Washburn',
    'Easton',
    'Mapleton',
];

export const DEFAULT_CATEGORIES = [
    'medical offices',
    'dental offices',
    'veterinary clinics',
    'auto repair',
    'insurance agencies',
    'property management',
    'hotels motels',
    'funeral homes',
    'plumbing HVAC electrical',
    'legal offices',
    'real estate agencies',
    'accounting tax preparation',
    'pharmacies',
];

// Google Maps selectors — these WILL break when Google updates their UI.
// When they do, inspect the Google Maps page and update these.
export const SELECTORS = {
    searchBox: '#searchboxinput',
    resultItem: 'div[role="feed"] > div > div > a',
    scrollContainer: 'div[role="feed"]',
    businessName: 'h1',
    phone: 'button[data-item-id^="phone"] .fontBodyMedium',
    address: 'button[data-item-id="address"] .fontBodyMedium',
    website: 'a[data-item-id="authority"]',
    categoryLabel: 'button[jsaction="pane.rating.category"]',
    hoursTable: 'table.eK4R0e',
    temporarilyClosed: 'span:has-text("Temporarily closed")',
    permanentlyClosed: 'span:has-text("Permanently closed")',
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/constants.test.js`
Expected: PASS — all 3 tests

- [ ] **Step 5: Commit**

```bash
git add web-forge/bots/aroostook-scraper/src/constants.js web-forge/bots/aroostook-scraper/tests/constants.test.js
git commit -m "feat(scraper): add constants — towns, categories, selectors"
```

---

### Task 3: Search Matrix Generator

**Files:**
- Create: `web-forge/bots/aroostook-scraper/src/search.js`
- Create: `web-forge/bots/aroostook-scraper/tests/search.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/search.test.js
import { describe, expect, test } from '@jest/globals';
import { generateSearchUrls } from '../src/search.js';

describe('generateSearchUrls', () => {
    test('generates URL for each category x town combo', () => {
        const categories = ['dental offices', 'auto repair'];
        const towns = ['Houlton', 'Caribou'];
        const urls = generateSearchUrls(categories, towns);

        expect(urls).toHaveLength(4);
    });

    test('each URL is a valid Google Maps search URL', () => {
        const urls = generateSearchUrls(['dental offices'], ['Houlton']);

        expect(urls).toHaveLength(1);
        expect(urls[0].url).toContain('https://www.google.com/maps/search/');
        expect(urls[0].url).toContain('dental+offices');
        expect(urls[0].url).toContain('Houlton');
        expect(urls[0].url).toContain('Maine');
    });

    test('attaches category and town metadata to each URL', () => {
        const urls = generateSearchUrls(['veterinary clinics'], ['Fort Kent']);

        expect(urls[0].userData.category).toBe('veterinary clinics');
        expect(urls[0].userData.town).toBe('Fort Kent');
    });

    test('handles empty arrays', () => {
        expect(generateSearchUrls([], ['Houlton'])).toHaveLength(0);
        expect(generateSearchUrls(['dental'], [])).toHaveLength(0);
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/search.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Write implementation**

```js
// src/search.js

/**
 * Generates Google Maps search URLs for every category x town combination.
 * Returns Crawlee-compatible Request objects with userData metadata.
 */
export function generateSearchUrls(categories, towns) {
    const requests = [];

    for (const category of categories) {
        for (const town of towns) {
            const query = `${category} in ${town}, Maine`;
            const encoded = encodeURIComponent(query).replace(/%20/g, '+');
            const url = `https://www.google.com/maps/search/${encoded}`;

            requests.push({
                url,
                userData: { category, town },
            });
        }
    }

    return requests;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/search.test.js`
Expected: PASS — all 4 tests

- [ ] **Step 5: Commit**

```bash
git add web-forge/bots/aroostook-scraper/src/search.js web-forge/bots/aroostook-scraper/tests/search.test.js
git commit -m "feat(scraper): add search matrix generator"
```

---

### Task 4: Business Data Extractor

**Files:**
- Create: `web-forge/bots/aroostook-scraper/src/extractor.js`
- Create: `web-forge/bots/aroostook-scraper/tests/extractor.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/extractor.test.js
import { describe, expect, test } from '@jest/globals';
import { extractBusinessData, isSeasonalBusiness } from '../src/extractor.js';

describe('extractBusinessData', () => {
    test('extracts all fields from a mock page object', async () => {
        // Mock Playwright page with $eval and $$eval
        const mockPage = {
            $eval: (selector, fn) => {
                const values = {
                    'h1': 'Houlton Veterinary Clinic',
                    'button[data-item-id^="phone"] .fontBodyMedium': '(207) 532-1234',
                    'button[data-item-id="address"] .fontBodyMedium': '123 Main St, Houlton, ME 04730',
                };
                return Promise.resolve(values[selector] || null);
            },
            $: (selector) => {
                if (selector === 'a[data-item-id="authority"]') {
                    return Promise.resolve({
                        getAttribute: (attr) => Promise.resolve('https://houltonvet.com'),
                    });
                }
                return Promise.resolve(null);
            },
            $$eval: () => Promise.resolve([]),
        };

        const data = await extractBusinessData(mockPage, 'veterinary clinics', 'Houlton');

        expect(data.businessName).toBe('Houlton Veterinary Clinic');
        expect(data.phone).toBe('(207) 532-1234');
        expect(data.address).toBe('123 Main St, Houlton, ME 04730');
        expect(data.website).toBe('https://houltonvet.com');
        expect(data.category).toBe('veterinary clinics');
        expect(data.town).toBe('Houlton');
    });

    test('returns null fields gracefully when data is missing', async () => {
        const mockPage = {
            $eval: () => Promise.reject(new Error('not found')),
            $: () => Promise.resolve(null),
            $$eval: () => Promise.resolve([]),
        };

        const data = await extractBusinessData(mockPage, 'dental offices', 'Caribou');

        expect(data.businessName).toBeNull();
        expect(data.phone).toBeNull();
        expect(data.address).toBeNull();
        expect(data.website).toBeNull();
    });
});

describe('isSeasonalBusiness', () => {
    test('returns true for temporarily closed listings', () => {
        expect(isSeasonalBusiness('Temporarily closed')).toBe(true);
    });

    test('returns true for seasonal markers', () => {
        expect(isSeasonalBusiness('Seasonal hours may differ')).toBe(true);
    });

    test('returns false for normal listings', () => {
        expect(isSeasonalBusiness('Open now')).toBe(false);
        expect(isSeasonalBusiness(null)).toBe(false);
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/extractor.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Write implementation**

```js
// src/extractor.js
import { SELECTORS } from './constants.js';

/**
 * Safely evaluate a selector on the page — returns null if not found.
 */
async function safeEval(page, selector) {
    try {
        return await page.$eval(selector, (el) => el.textContent.trim());
    } catch {
        return null;
    }
}

/**
 * Extract all business data fields from a Google Maps listing detail page.
 */
export async function extractBusinessData(page, category, town) {
    const businessName = await safeEval(page, SELECTORS.businessName);
    const phone = await safeEval(page, SELECTORS.phone);
    const address = await safeEval(page, SELECTORS.address);

    let website = null;
    const websiteEl = await page.$(SELECTORS.website);
    if (websiteEl) {
        website = await websiteEl.getAttribute('href');
    }

    // Social links — grab all external links from the listing
    let socialLinks = [];
    try {
        socialLinks = await page.$$eval('a[href]', (anchors) =>
            anchors
                .map((a) => a.href)
                .filter((href) =>
                    /facebook\.com|instagram\.com|twitter\.com|x\.com|linkedin\.com|youtube\.com/.test(href)
                )
        );
    } catch {
        socialLinks = [];
    }

    return {
        businessName,
        phone,
        address,
        website,
        socialLinks: socialLinks.join(', ') || null,
        ownerName: null, // Google Maps rarely exposes this — filled if found
        category,
        town,
    };
}

/**
 * Check if a business listing indicates seasonal/temporary closure.
 */
export function isSeasonalBusiness(statusText) {
    if (!statusText) return false;
    const lower = statusText.toLowerCase();
    return (
        lower.includes('temporarily closed') ||
        lower.includes('seasonal') ||
        lower.includes('permanently closed')
    );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/extractor.test.js`
Expected: PASS — all 4 tests

- [ ] **Step 5: Commit**

```bash
git add web-forge/bots/aroostook-scraper/src/extractor.js web-forge/bots/aroostook-scraper/tests/extractor.test.js
git commit -m "feat(scraper): add business data extractor with seasonal filter"
```

---

### Task 5: Deduplicator

**Files:**
- Create: `web-forge/bots/aroostook-scraper/src/deduplicator.js`
- Create: `web-forge/bots/aroostook-scraper/tests/deduplicator.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/deduplicator.test.js
import { describe, expect, test } from '@jest/globals';
import { Deduplicator } from '../src/deduplicator.js';

describe('Deduplicator', () => {
    test('allows first occurrence of a business', () => {
        const dedup = new Deduplicator();
        const result = dedup.isDuplicate({
            businessName: 'Houlton Vet Clinic',
            address: '123 Main St, Houlton, ME',
        });
        expect(result).toBe(false);
    });

    test('detects exact duplicate by name + address', () => {
        const dedup = new Deduplicator();
        const biz = { businessName: 'Houlton Vet Clinic', address: '123 Main St, Houlton, ME' };
        dedup.isDuplicate(biz);
        expect(dedup.isDuplicate(biz)).toBe(true);
    });

    test('normalizes whitespace and casing for comparison', () => {
        const dedup = new Deduplicator();
        dedup.isDuplicate({ businessName: 'Houlton Vet Clinic', address: '123 Main St' });
        const isDup = dedup.isDuplicate({ businessName: '  houlton  vet  clinic ', address: '123  main  st' });
        expect(isDup).toBe(true);
    });

    test('treats different addresses as different businesses', () => {
        const dedup = new Deduplicator();
        dedup.isDuplicate({ businessName: 'Houlton Vet', address: '123 Main St' });
        const isDup = dedup.isDuplicate({ businessName: 'Houlton Vet', address: '456 Court St' });
        expect(isDup).toBe(false);
    });

    test('handles null name or address gracefully', () => {
        const dedup = new Deduplicator();
        expect(dedup.isDuplicate({ businessName: null, address: null })).toBe(false);
        expect(dedup.isDuplicate({ businessName: null, address: null })).toBe(true);
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/deduplicator.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Write implementation**

```js
// src/deduplicator.js

/**
 * Deduplicates businesses by normalized name + address.
 * Businesses in neighboring towns often show up in each other's results.
 */
export class Deduplicator {
    constructor() {
        this.seen = new Set();
    }

    /**
     * Returns true if this business has already been seen.
     * Adds it to the set if not.
     */
    isDuplicate(business) {
        const key = this._normalize(business.businessName) + '||' + this._normalize(business.address);

        if (this.seen.has(key)) {
            return true;
        }

        this.seen.add(key);
        return false;
    }

    _normalize(str) {
        if (!str) return '';
        return str.toLowerCase().replace(/\s+/g, ' ').trim();
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd web-forge/bots/aroostook-scraper && npm test -- tests/deduplicator.test.js`
Expected: PASS — all 5 tests

- [ ] **Step 5: Commit**

```bash
git add web-forge/bots/aroostook-scraper/src/deduplicator.js web-forge/bots/aroostook-scraper/tests/deduplicator.test.js
git commit -m "feat(scraper): add business deduplicator"
```

---

### Task 6: Crawler Setup (PlaywrightCrawler)

**Files:**
- Create: `web-forge/bots/aroostook-scraper/src/crawler.js`

This is integration code that creates the PlaywrightCrawler instance — tested via the end-to-end run in Task 7, not unit tested in isolation (mocking Crawlee internals is brittle and low-value).

- [ ] **Step 1: Write the crawler module**

```js
// src/crawler.js
import { PlaywrightCrawler, log } from 'crawlee';
import { SELECTORS } from './constants.js';
import { extractBusinessData, isSeasonalBusiness } from './extractor.js';
import { Deduplicator } from './deduplicator.js';
import { Actor } from 'apify';

/**
 * Creates and returns a configured PlaywrightCrawler.
 *
 * @param {object} options
 * @param {number} options.maxConcurrency - max browser tabs
 * @param {number} options.delayMin - min random delay in seconds
 * @param {number} options.delayMax - max random delay in seconds
 */
export function createCrawler({ maxConcurrency, delayMin, delayMax }) {
    const dedup = new Deduplicator();

    const crawler = new PlaywrightCrawler({
        maxConcurrency,
        launchContext: {
            launchOptions: {
                headless: true,
            },
        },
        proxyConfiguration: Actor.createProxyConfiguration({
            groups: ['RESIDENTIAL'],
        }),
        navigationTimeoutSecs: 60,
        requestHandlerTimeoutSecs: 120,

        async requestHandler({ page, request, enqueueLinks }) {
            const { category, town } = request.userData;

            // Random delay to avoid detection
            const delay = (Math.random() * (delayMax - delayMin) + delayMin) * 1000;
            await new Promise((r) => setTimeout(r, delay));

            if (request.userData.isDetailPage) {
                // === DETAIL PAGE: extract business data ===
                await page.waitForSelector(SELECTORS.businessName, { timeout: 10000 }).catch(() => null);

                // Check seasonal/closed status
                const statusText = await page.$eval(
                    `${SELECTORS.temporarilyClosed}, ${SELECTORS.permanentlyClosed}`,
                    (el) => el.textContent
                ).catch(() => null);

                if (isSeasonalBusiness(statusText)) {
                    log.info(`Skipping seasonal/closed: ${request.url}`);
                    return;
                }

                const data = await extractBusinessData(page, category, town);

                if (!data.businessName) {
                    log.warning(`No business name found at ${request.url}`);
                    return;
                }

                if (dedup.isDuplicate(data)) {
                    log.info(`Duplicate skipped: ${data.businessName}`);
                    return;
                }

                await Actor.pushData(data);
                log.info(`Saved: ${data.businessName} (${town})`);
            } else {
                // === SEARCH RESULTS PAGE: scroll and enqueue listings ===
                log.info(`Searching: ${category} in ${town}`);

                // Wait for results to load
                await page.waitForSelector(SELECTORS.scrollContainer, { timeout: 15000 }).catch(() => null);

                // Scroll the results panel to load all listings
                const scrollContainer = await page.$(SELECTORS.scrollContainer);
                if (scrollContainer) {
                    let previousCount = 0;
                    for (let i = 0; i < 20; i++) {
                        await scrollContainer.evaluate((el) => el.scrollBy(0, 1000));
                        await new Promise((r) => setTimeout(r, 1500));

                        const currentCount = await page.$$eval(
                            SELECTORS.resultItem,
                            (items) => items.length
                        ).catch(() => 0);

                        if (currentCount === previousCount) break;
                        previousCount = currentCount;
                    }
                }

                // Get all listing links and enqueue them as detail pages
                const links = await page.$$eval(SELECTORS.resultItem, (items) =>
                    items.map((a) => a.href).filter((href) => href && href.includes('/maps/place/'))
                ).catch(() => []);

                log.info(`Found ${links.length} listings for ${category} in ${town}`);

                for (const link of links) {
                    await crawler.addRequests([{
                        url: link,
                        userData: { category, town, isDetailPage: true },
                    }]);
                }
            }
        },

        async failedRequestHandler({ request }) {
            log.error(`Request failed after retries: ${request.url}`);
        },
    });

    return crawler;
}
```

- [ ] **Step 2: Commit**

```bash
git add web-forge/bots/aroostook-scraper/src/crawler.js
git commit -m "feat(scraper): add PlaywrightCrawler with scroll, extract, dedup pipeline"
```

---

### Task 7: Main Entry Point

**Files:**
- Create: `web-forge/bots/aroostook-scraper/src/main.js`

- [ ] **Step 1: Write the entry point**

```js
// src/main.js
import { Actor, log } from 'apify';
import { generateSearchUrls } from './search.js';
import { createCrawler } from './crawler.js';
import { DEFAULT_CATEGORIES, DEFAULT_TOWNS } from './constants.js';

await Actor.init();

try {
    const input = await Actor.getInput() || {};

    const categories = input.categories || DEFAULT_CATEGORIES;
    const towns = input.towns || DEFAULT_TOWNS;
    const maxConcurrency = input.maxConcurrency || 3;
    const delayMin = input.delayMin || 2;
    const delayMax = input.delayMax || 5;

    log.info(`Starting scrape: ${categories.length} categories x ${towns.length} towns = ${categories.length * towns.length} searches`);

    const searchRequests = generateSearchUrls(categories, towns);
    const crawler = createCrawler({ maxConcurrency, delayMin, delayMax });

    await crawler.run(searchRequests);

    // Export dataset to CSV automatically
    const dataset = await Actor.openDataset();
    const { items } = await dataset.getData();
    log.info(`Scrape complete. Total unique businesses: ${items.length}`);

    // Store CSV in key-value store for easy download
    const csvHeader = 'Business Name,Owner,Phone,Email,Website,Address,Social Links,Category,Town';
    const csvRows = items.map((item) =>
        [
            item.businessName,
            item.ownerName,
            item.phone,
            item.email,
            item.website,
            item.address,
            item.socialLinks,
            item.category,
            item.town,
        ]
            .map((field) => `"${(field || '').replace(/"/g, '""')}"`)
            .join(',')
    );
    const csv = [csvHeader, ...csvRows].join('\n');

    const kvStore = await Actor.openKeyValueStore();
    await kvStore.setValue('results', csv, { contentType: 'text/csv' });
    log.info('CSV exported to key-value store as "results"');
} catch (error) {
    log.error(`Actor failed: ${error.message}`);
    await Actor.fail();
}

await Actor.exit();
```

- [ ] **Step 2: Commit**

```bash
git add web-forge/bots/aroostook-scraper/src/main.js
git commit -m "feat(scraper): add main entry point with auto CSV export"
```

---

### Task 8: Local Smoke Test

- [ ] **Step 1: Create a minimal test input for local run**

Create file `web-forge/bots/aroostook-scraper/test-input.json`:

```json
{
  "categories": ["veterinary clinics"],
  "towns": ["Houlton"],
  "maxConcurrency": 1,
  "delayMin": 3,
  "delayMax": 6
}
```

- [ ] **Step 2: Run all unit tests**

Run: `cd web-forge/bots/aroostook-scraper && npm test`
Expected: All tests pass (constants, search, extractor, deduplicator)

- [ ] **Step 3: Attempt local run with Apify CLI**

Run: `cd web-forge/bots/aroostook-scraper && npx apify-cli run --input test-input.json`

This will test the full pipeline against a single category+town combo. Inspect the output dataset and CSV.

- [ ] **Step 4: Fix any selector issues**

Google Maps selectors are fragile. If extraction fails, inspect the page in a real browser, update `SELECTORS` in `src/constants.js`, and re-run.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A web-forge/bots/aroostook-scraper/
git commit -m "fix(scraper): update selectors and test input after smoke test"
```

---

### Task 9: Deploy to Apify

- [ ] **Step 1: Push actor to Apify platform**

Run: `cd web-forge/bots/aroostook-scraper && npx apify-cli push`

This uploads the actor to David's Apify Creator account.

- [ ] **Step 2: Run on Apify with full input**

Use Apify Console to trigger a run with all default categories and towns. Monitor the run log for:
- Proxy errors (switch proxy group if needed)
- CAPTCHA blocks (increase delays)
- Selector failures (update constants.js)

- [ ] **Step 3: Download and verify CSV output**

From the Apify run page, download the CSV from the key-value store. Verify:
- All columns present
- No duplicate rows
- Seasonal businesses filtered out
- Reasonable number of results

- [ ] **Step 4: Final commit**

```bash
git add -A web-forge/bots/aroostook-scraper/
git commit -m "feat(scraper): Aroostook County business scraper complete and deployed"
```
