import { describe, expect, test } from '@jest/globals';
import { extractBusinessData, isSeasonalBusiness } from '../src/extractor.js';

describe('extractBusinessData', () => {
    test('extracts all fields from a mock page object', async () => {
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
