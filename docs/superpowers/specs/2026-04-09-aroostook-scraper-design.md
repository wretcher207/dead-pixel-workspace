# Aroostook County Business Scraper — Design Spec

## Purpose

Custom Apify actor that scrapes Google Maps for small businesses across Aroostook County, Maine. Targets businesses that are open year-round and would benefit from an AI customer service voice bot. Feeds Dead Pixel Design's outreach pipeline.

## Platform

- **Apify Creator Account** (custom actors only, $500 credit)
- Node.js 18+ with Crawlee + Apify SDK v3
- PlaywrightCrawler for JS-rendered Google Maps pages
- Apify residential proxy pool with automatic rotation

## Search Strategy

The actor runs a **category x town matrix** to maximize coverage (Google Maps caps results at ~20-120 per search).

### Towns

All major Aroostook County towns: Houlton, Presque Isle, Caribou, Fort Kent, Madawaska, Van Buren, Limestone, Mars Hill, Ashland, Fort Fairfield, Washburn, Easton, Mapleton, and others as discovered.

### Business Categories

Businesses most likely to benefit from AI voice bots:

- Medical offices / clinics
- Dental offices
- Veterinary clinics
- Auto repair / mechanics
- Insurance agencies
- Property management companies
- Hotels / motels
- Funeral homes
- Plumbing / HVAC / electrical contractors
- Legal offices
- Real estate agencies
- Accounting / tax preparation
- Pharmacies

### Search Queries

Format: `"{category} in {town}, Maine"` submitted to Google Maps search.

## Architecture

### Actor Structure

```
aroostook-scraper/
├── .actor/
│   ├── actor.json
│   └── INPUT_SCHEMA.json
├── src/
│   ├── main.js          # Entry point, actor initialization
│   ├── crawler.js        # PlaywrightCrawler setup and config
│   ├── search.js         # Category x town matrix generation
│   ├── extractor.js      # Business data extraction from listing pages
│   ├── deduplicator.js   # Dedup by name + address
│   └── constants.js      # Town list, category list, selectors
├── package.json
├── Dockerfile
└── README.md
```

### Data Pipeline

1. **Input** — category list + town list (configurable via Apify input schema UI)
2. **Matrix generation** — every category x town combination becomes a search query
3. **Crawl** — PlaywrightCrawler loads Google Maps, scrolls results list to load all entries
4. **Detail extraction** — clicks into each listing to pull full business details
5. **Deduplication** — by normalized business name + address (handles overlap between adjacent towns)
6. **Seasonal filter** — drops businesses marked "Temporarily closed", "Seasonal", or with limited seasonal hours
7. **Store** — pushes to Apify Dataset, auto-exports to CSV

### Output Fields

| Field | Source |
|-------|--------|
| Business name | Listing title |
| Owner name | "Owner" field if available |
| Phone number | Listing phone |
| Email | Website scrape or listing |
| Website | Listing URL |
| Physical address | Listing address |
| Social media links | Listing or website scrape |

### Anti-Bot Strategy

- **PlaywrightCrawler** — full browser rendering, mimics real user
- **Apify residential proxies** — IP rotation per request
- **Concurrency** — max 2-3 concurrent browser tabs
- **Rate limiting** — random delays between 2-5 seconds per request
- **Memory** — 4-8 GB allocation for parallel browser instances
- **Retry logic** — automatic retry on transient failures, back off on CAPTCHA/blocks

### Input Schema

```json
{
  "title": "Aroostook County Business Scraper",
  "type": "object",
  "properties": {
    "categories": {
      "title": "Business Categories",
      "type": "array",
      "description": "List of business categories to search",
      "default": ["medical offices", "dental offices", "veterinary clinics", "auto repair", "insurance agencies", "property management", "hotels motels", "funeral homes", "plumbing HVAC electrical", "legal offices", "real estate agencies", "accounting tax preparation", "pharmacies"]
    },
    "towns": {
      "title": "Towns",
      "type": "array",
      "description": "List of towns to search within",
      "default": ["Houlton", "Presque Isle", "Caribou", "Fort Kent", "Madawaska", "Van Buren", "Limestone", "Mars Hill", "Ashland", "Fort Fairfield", "Washburn", "Easton", "Mapleton"]
    },
    "maxConcurrency": {
      "title": "Max Concurrent Browsers",
      "type": "integer",
      "default": 3,
      "maximum": 5
    },
    "delayMin": {
      "title": "Min Delay (seconds)",
      "type": "integer",
      "default": 2
    },
    "delayMax": {
      "title": "Max Delay (seconds)",
      "type": "integer",
      "default": 5
    }
  }
}
```

### Cost Estimate

- ~169 search queries (13 categories x 13 towns)
- PlaywrightCrawler at ~1 CU per 1,000 pages
- Each search + scrolling + detail clicks = ~20-50 page loads per query
- Rough estimate: 3,400-8,500 page loads = 3.4-8.5 CU
- Well within the $500 credit budget

## Output

- Apify Dataset with all fields
- Auto-exported CSV file
- No manual export step required
