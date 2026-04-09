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
