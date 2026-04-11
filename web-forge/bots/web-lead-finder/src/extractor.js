import { SELECTORS, SOCIAL_PLATFORMS, EXCLUDED_KEYWORDS } from './constants.js';

async function safeEval(page, selector) {
    try {
        return await page.$eval(selector, (el) => el.textContent.trim());
    } catch {
        return null;
    }
}

// Returns a URL string only if a guessed domain responds AND its HTML
// actually mentions the business. Prevents parking pages and squatters
// from getting counted as "this business has a website."
export async function checkDomainExists(businessName) {
    if (!businessName) return false;

    const cleanedFull = businessName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .trim();

    if (!cleanedFull || cleanedFull.length < 3) return false;

    const words = cleanedFull.split(/\s+/).filter(Boolean);
    const noSpace = cleanedFull.replace(/\s+/g, '');
    const firstTwo = words.slice(0, 2).join('');
    const firstThree = words.slice(0, 3).join('');

    const variants = [...new Set(
        [noSpace, firstThree, firstTwo].filter((v) => v && v.length >= 4)
    )];

    const candidates = [];
    for (const v of variants) {
        candidates.push(`https://${v}.com`);
        candidates.push(`https://www.${v}.com`);
        candidates.push(`https://${v}.net`);
    }

    // Tokens we need to see in the returned HTML to believe this is really
    // the business's site. Use words >= 4 chars to avoid "and", "the", etc.
    const matchTokens = words.filter((w) => w.length >= 4);
    if (matchTokens.length === 0) return false;

    for (const url of candidates) {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const res = await fetch(url, {
                method: 'GET',
                signal: controller.signal,
                redirect: 'follow',
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LeadFinder/1.0)' },
            });
            clearTimeout(timeout);
            if (res.status < 200 || res.status >= 400) continue;

            const html = (await res.text()).toLowerCase();
            // Reject obvious parking/for-sale pages
            if (
                html.includes('domain is for sale') ||
                html.includes('buy this domain') ||
                html.includes('parked free') ||
                html.includes('godaddy.com/domainsearch') ||
                html.length < 200
            ) continue;

            // Require at least one meaningful business-name token in the HTML
            const hit = matchTokens.some((t) => html.includes(t));
            if (hit) return res.url || url;
        } catch {
            // DNS failure, timeout, TLS error — treat as no site
        }
    }
    return false;
}

function isExcluded(name, category) {
    const text = `${name || ''} ${category || ''}`.toLowerCase();
    return EXCLUDED_KEYWORDS.some((kw) => text.includes(kw));
}

function isSocialOnlyWebsite(url) {
    if (!url) return false;
    return SOCIAL_PLATFORMS.some((p) => url.includes(p));
}

function scoreLeads({ website, socialLinks, reviewCount }) {
    // Has any real (non-social) website → not a lead
    if (website && !isSocialOnlyWebsite(website)) return null;

    const hasSocial = socialLinks && socialLinks.length > 0;

    // Social-media-only "website" field
    if (website && isSocialOnlyWebsite(website)) return 'C';

    // No website at all
    if (hasSocial) return 'A';        // has social presence = reachable
    return 'B';                        // no website, no social = harder to contact
}

export async function extractBusinessData(page, category, searchLocation) {
    const businessName = await safeEval(page, SELECTORS.businessName);
    if (!businessName) return null;
    if (isExcluded(businessName, category)) return null;

    // Phone — try multiple selectors since Google Maps changes structure
    let phone = null;
    const phoneSelectors = [
        'button[data-item-id^="phone"]',
        'button[aria-label*="phone" i]',
        '[data-tooltip*="phone" i]',
    ];
    for (const sel of phoneSelectors) {
        phone = await safeEval(page, sel);
        if (phone) break;
    }
    // Fallback: find any element containing a phone pattern
    if (!phone) {
        try {
            phone = await page.evaluate(() => {
                const all = document.querySelectorAll('button, span, div');
                for (const el of all) {
                    const text = el.textContent.trim();
                    if (/^\(?\d{3}\)?[\s\-]\d{3}[\s\-]\d{4}$/.test(text)) return text;
                }
                return null;
            });
        } catch { phone = null; }
    }

    // Address — try multiple selectors
    let address = null;
    const addressSelectors = [
        'button[data-item-id="address"]',
        'button[aria-label*="address" i]',
        '[data-item-id="address"]',
    ];
    for (const sel of addressSelectors) {
        address = await safeEval(page, sel);
        if (address) break;
    }

    // Website
    let website = null;
    const websiteSelectors = [
        'a[data-item-id="authority"]',
        'a[aria-label*="website" i]',
        'a[href*="http"]:not([href*="google"]):not([href*="maps"])',
    ];
    for (const sel of websiteSelectors) {
        try {
            const el = await page.$(sel);
            if (el) {
                website = await el.getAttribute('href');
                if (website) break;
            }
        } catch { continue; }
    }

    // Social links — fixed: extract hrefs in page context, filter in Node
    let socialLinks = [];
    try {
        const allHrefs = await page.$$eval('a[href]', (anchors) =>
            anchors.map((a) => a.href).filter(Boolean)
        );
        socialLinks = [...new Set(
            allHrefs.filter((href) => SOCIAL_PLATFORMS.some((p) => href.includes(p)))
        )];
    } catch {
        socialLinks = [];
    }

    // Review count
    let reviewCount = null;
    try {
        const reviewText = await safeEval(page, SELECTORS.reviewCount);
        if (reviewText) {
            const match = reviewText.match(/[\d,]+/);
            if (match) reviewCount = parseInt(match[0].replace(/,/g, ''), 10);
        }
    } catch { reviewCount = null; }

    // Rating
    let rating = null;
    try {
        const ratingText = await safeEval(page, SELECTORS.rating);
        if (ratingText) {
            const match = ratingText.match(/[\d.]+/);
            if (match) rating = parseFloat(match[0]);
        }
    } catch { rating = null; }

    // Domain probe if no website found
    let domainProbed = false;
    if (!website) {
        const probed = await checkDomainExists(businessName);
        if (probed) {
            website = probed;
            domainProbed = true;
        }
    }

    const leadScore = scoreLeads({ website, socialLinks, reviewCount });
    if (!leadScore) return null;

    return {
        leadScore,
        businessName,
        phone: phone || null,
        address: address || null,
        website: website || null,
        socialLinks: socialLinks.join(', ') || null,
        reviewCount,
        rating,
        category,
        searchLocation,
        profileUrl: page.url(),
        domainProbed,
    };
}

export function isClosedBusiness(pageText) {
    if (!pageText) return false;
    const lower = pageText.toLowerCase();
    return lower.includes('permanently closed') || lower.includes('temporarily closed');
}
