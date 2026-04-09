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
export async function createCrawler({ maxConcurrency, delayMin, delayMax }) {
    const dedup = new Deduplicator();
    const proxyConfiguration = await Actor.createProxyConfiguration({
        groups: ['RESIDENTIAL'],
    });

    const crawler = new PlaywrightCrawler({
        maxConcurrency,
        launchContext: {
            launchOptions: {
                headless: true,
            },
        },
        proxyConfiguration,
        navigationTimeoutSecs: 60,
        requestHandlerTimeoutSecs: 120,

        async requestHandler({ page, request, enqueueLinks }) {
            const { category, town } = request.userData;

            // Dismiss Google consent dialog if present
            const consentBtn = await page.$('button[aria-label="Accept all"]').catch(() => null);
            if (consentBtn) {
                await consentBtn.click();
                await new Promise((r) => setTimeout(r, 2000));
            }

            // Random delay to avoid detection
            const delay = (Math.random() * (delayMax - delayMin) + delayMin) * 1000;
            await new Promise((r) => setTimeout(r, delay));

            if (request.userData.isDetailPage) {
                // === DETAIL PAGE: extract business data ===
                await page.waitForSelector(SELECTORS.businessName, { timeout: 15000 }).catch(() => null);

                // Check seasonal/closed status via page text
                const pageText = await page.content();
                const hasClosedMarker = pageText.includes('Permanently closed') || pageText.includes('Temporarily closed');

                if (hasClosedMarker && isSeasonalBusiness(await page.textContent('body').catch(() => ''))) {
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

                // Wait for results feed to load
                await page.waitForSelector(SELECTORS.scrollContainer, { timeout: 30000 }).catch(() => null);
                // Extra wait for results to populate
                await new Promise((r) => setTimeout(r, 3000));

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
