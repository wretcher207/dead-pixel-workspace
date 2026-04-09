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
