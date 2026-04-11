import { Actor, log } from 'apify';
import { generateSearchUrls } from './search.js';
import { createCrawler } from './crawler.js';
import { DEFAULT_CATEGORIES, DEFAULT_TOWNS } from './constants.js';

await Actor.init();

try {
    const input = await Actor.getInput() || {};

    const categories = input.categories || DEFAULT_CATEGORIES;
    const locations = input.locations || DEFAULT_TOWNS;
    const maxConcurrency = input.maxConcurrency || 3;
    const delayMin = input.delayMin || 2;
    const delayMax = input.delayMax || 5;

    log.info(`Starting lead finder: ${categories.length} categories x ${locations.length} locations = ${categories.length * locations.length} searches`);
    log.info(`Only keeping businesses with NO real website (lead scores A, B, C)`);

    const searchRequests = generateSearchUrls(categories, locations);
    const crawler = await createCrawler({ maxConcurrency, delayMin, delayMax });

    await crawler.run(searchRequests);

    // Pull results and sort by lead score
    const dataset = await Actor.openDataset();
    const { items } = await dataset.getData();

    const sorted = items.sort((a, b) => a.leadScore.localeCompare(b.leadScore));

    log.info(`\n===== LEAD FINDER COMPLETE =====`);
    log.info(`Total leads found: ${sorted.length}`);
    log.info(`Score A (no website + social + new): ${sorted.filter((i) => i.leadScore === 'A').length}`);
    log.info(`Score B (no website, limited signal): ${sorted.filter((i) => i.leadScore === 'B').length}`);
    log.info(`Score C (social-only website): ${sorted.filter((i) => i.leadScore === 'C').length}`);

    // Export CSV
    const headers = ['Lead Score', 'Business Name', 'Phone', 'Address', 'Website', 'Social Links', 'Review Count', 'Rating', 'Category', 'Location', 'Google Maps URL'];
    const rows = sorted.map((item) =>
        [
            item.leadScore,
            item.businessName,
            item.phone,
            item.address,
            item.website,
            item.socialLinks,
            item.reviewCount,
            item.rating,
            item.category,
            item.searchLocation,
            item.profileUrl,
        ]
            .map((f) => `"${(f ?? '').toString().replace(/"/g, '""')}"`)
            .join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');
    const kvStore = await Actor.openKeyValueStore();
    await kvStore.setValue('leads', csv, { contentType: 'text/csv' });

    log.info('CSV exported to key-value store as "leads"');

} catch (error) {
    log.error(`Actor failed: ${error.message}`);
    await Actor.fail();
}

await Actor.exit();
