import { SELECTORS } from './constants.js';

async function safeEval(page, selector) {
    try {
        return await page.$eval(selector, (el) => el.textContent.trim());
    } catch {
        return null;
    }
}

export async function extractBusinessData(page, category, town) {
    const businessName = await safeEval(page, SELECTORS.businessName);
    const phone = await safeEval(page, SELECTORS.phone);
    const address = await safeEval(page, SELECTORS.address);

    let website = null;
    const websiteEl = await page.$(SELECTORS.website);
    if (websiteEl) {
        website = await websiteEl.getAttribute('href');
    }

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
        ownerName: null,
        category,
        town,
    };
}

export function isSeasonalBusiness(statusText) {
    if (!statusText) return false;
    const lower = statusText.toLowerCase();
    return (
        lower.includes('temporarily closed') ||
        lower.includes('seasonal') ||
        lower.includes('permanently closed')
    );
}
