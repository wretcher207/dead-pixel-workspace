/**
 * Generates Google Maps search URLs for every category x town combination.
 * Returns Crawlee-compatible Request objects with userData metadata.
 */
export function generateSearchUrls(categories, towns) {
    const requests = [];

    for (const category of categories) {
        for (const town of towns) {
            const query = `${category} in ${town}, Maine`;
            const encoded = encodeURIComponent(query).replace(/%20/g, '+');
            const url = `https://www.google.com/maps/search/${encoded}`;

            requests.push({
                url,
                userData: { category, town },
            });
        }
    }

    return requests;
}
