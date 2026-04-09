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
