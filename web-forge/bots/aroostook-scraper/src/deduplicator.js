export class Deduplicator {
    constructor() {
        this.seen = new Set();
    }

    isDuplicate(business) {
        const key = this._normalize(business.businessName) + '||' + this._normalize(business.address);

        if (this.seen.has(key)) {
            return true;
        }

        this.seen.add(key);
        return false;
    }

    _normalize(str) {
        if (!str) return '';
        return str.toLowerCase().replace(/\s+/g, ' ').trim();
    }
}
