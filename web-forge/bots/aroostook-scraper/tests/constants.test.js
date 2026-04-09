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
