/**
 * Generates Google Maps search URLs for every category x location combination.
 */
export function generateSearchUrls(categories, locations) {
    const requests = [];

    for (const category of categories) {
        for (const location of locations) {
            const query = `${category} in ${location}`;
            const encoded = encodeURIComponent(query).replace(/%20/g, '+');
            const url = `https://www.google.com/maps/search/${encoded}`;

            requests.push({
                url,
                userData: { category, searchLocation: location },
            });
        }
    }

    return requests;
}
