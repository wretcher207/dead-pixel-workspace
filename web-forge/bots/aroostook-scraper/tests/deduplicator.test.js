import { describe, expect, test } from '@jest/globals';
import { Deduplicator } from '../src/deduplicator.js';

describe('Deduplicator', () => {
    test('allows first occurrence of a business', () => {
        const dedup = new Deduplicator();
        const result = dedup.isDuplicate({
            businessName: 'Houlton Vet Clinic',
            address: '123 Main St, Houlton, ME',
        });
        expect(result).toBe(false);
    });

    test('detects exact duplicate by name + address', () => {
        const dedup = new Deduplicator();
        const biz = { businessName: 'Houlton Vet Clinic', address: '123 Main St, Houlton, ME' };
        dedup.isDuplicate(biz);
        expect(dedup.isDuplicate(biz)).toBe(true);
    });

    test('normalizes whitespace and casing for comparison', () => {
        const dedup = new Deduplicator();
        dedup.isDuplicate({ businessName: 'Houlton Vet Clinic', address: '123 Main St' });
        const isDup = dedup.isDuplicate({ businessName: '  houlton  vet  clinic ', address: '123  main  st' });
        expect(isDup).toBe(true);
    });

    test('treats different addresses as different businesses', () => {
        const dedup = new Deduplicator();
        dedup.isDuplicate({ businessName: 'Houlton Vet', address: '123 Main St' });
        const isDup = dedup.isDuplicate({ businessName: 'Houlton Vet', address: '456 Court St' });
        expect(isDup).toBe(false);
    });

    test('handles null name or address gracefully', () => {
        const dedup = new Deduplicator();
        expect(dedup.isDuplicate({ businessName: null, address: null })).toBe(false);
        expect(dedup.isDuplicate({ businessName: null, address: null })).toBe(true);
    });
});
