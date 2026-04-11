import { PlaywrightCrawler, log } from 'crawlee';
import { Actor } from 'apify';
import { SELECTORS } from './constants.js';
import { extractBusinessData, isClosedBusiness } from './extractor.js';

/**
 * Two-stage Google Maps crawler:
 *   1. Search results page — scroll feed, enqueue every business detail URL
 *   2. Detail page — extract website/phone/address/reviews/socials, score,
 *      and push only if the business has NO real website (leads only).
 *
 * The old single-pass version tried to read the website field from search
 * result cards, but Maps cards don't contain that link — every business came
 * out as "no website / score B" no matter what. Visiting the detail page is
 * the only reliable way to know.
 */
export async function createCrawler({ maxConcurrency, delayMin, delayMax }) {
    const proxyConfiguration = await Actor.createProxyConfiguration();

    const crawler = new PlaywrightCrawler({
        maxConcurrency,
        proxyConfiguration,
        launchContext: {
            launchOptions: { headless: true },
        },
        navigationTimeoutSecs: 60,
        requestHandlerTimeoutSecs: 180,

        async requestHandler({ page, request }) {
            const { category, searchLocation, isDetailPage } = request.userData;

            // Dismiss Google consent dialog if it shows up
            const consentBtn = await page.$('button[aria-label="Accept all"]').catch(() => null);
            if (consentBtn) {
                await consentBtn.click();
                await new Promise((r) => setTimeout(r, 1500));
            }

            // Random delay — keeps us looking human
            const delay = (Math.random() * (delayMax - delayMin) + delayMin) * 1000;
            await new Promise((r) => setTimeout(r, delay));

            if (isDetailPage) {
                // ============================================================
                // STAGE 2 — DETAIL PAGE
                // ============================================================
                await page
                    .waitForSelector(SELECTORS.businessName, { timeout: 15000 })
                    .catch(() => null);

                // Skip permanently/temporarily closed
                const bodyText = await page.textContent('body').catch(() => '');
                if (isClosedBusiness(bodyText)) {
                    log.info(`Skipped closed: ${request.url}`);
                    return;
                }

                const data = await extractBusinessData(page, category, searchLocation);

                // extractBusinessData returns null when the business HAS a real
                // website (not a lead) or matches excluded keywords.
                if (!data) return;

                await Actor.pushData(data);
                log.info(
                    `LEAD [${data.leadScore}] ${data.businessName} — ${data.address || 'no address'}`
                );
                return;
            }

            // ============================================================
            // STAGE 1 — SEARCH RESULTS PAGE
            // ============================================================
            log.info(`Searching: "${category}" in ${searchLocation}`);

            await page
                .waitForSelector(SELECTORS.scrollContainer, { timeout: 30000 })
                .catch(() => null);
            await new Promise((r) => setTimeout(r, 3000));

            // Scroll the results feed to load all listings
            const feed = await page.$(SELECTORS.scrollContainer);
            if (feed) {
                let previousCount = 0;
                for (let i = 0; i < 25; i++) {
                    await feed.evaluate((el) => el.scrollBy(0, 1200));
                    await new Promise((r) => setTimeout(r, 1500));

                    const currentCount = await page
                        .$$eval(SELECTORS.resultItem, (items) => items.length)
                        .catch(() => 0);

                    if (currentCount === previousCount && currentCount > 0) break;
                    previousCount = currentCount;
                }
            }

            // Collect all business detail URLs
            const links = await page
                .$$eval(SELECTORS.resultItem, (items) =>
                    items
                        .map((a) => a.href)
                        .filter((href) => href && href.includes('/maps/place/'))
                )
                .catch(() => []);

            // Dedupe within this search (same business can appear twice)
            const uniqueLinks = [...new Set(links)];
            log.info(
                `Found ${uniqueLinks.length} businesses for "${category}" in ${searchLocation}`
            );

            for (const link of uniqueLinks) {
                await crawler.addRequests([
                    {
                        url: link,
                        userData: {
                            category,
                            searchLocation,
                            isDetailPage: true,
                        },
                    },
                ]);
            }
        },

        failedRequestHandler({ request }) {
            log.error(`Failed after retries: ${request.url}`);
        },
    });

    return crawler;
}
