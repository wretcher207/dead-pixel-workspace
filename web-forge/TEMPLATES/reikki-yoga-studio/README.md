# Spec Site Template

Single-page local business site. Warm/organic aesthetic with service cards, testimonials, FAQ accordion, embedded map, and a chat widget stub.

## Folder Structure

```
TEMPLATE/
  index.html              # The template — all content is {{PLACEHOLDER}} markers
  assets/
    general/              # Logo, hero image, about photo, studio/shop photos
    services/             # Service-related photos (3 for the image grid)
    testimonials/         # Screenshot source files from Google/FB reviews
```

When starting a new client site, copy this entire folder and rename it.

## Images to Collect

- **Logo** (any format, square or horizontal) -> `assets/general/logo.jpg`
- **Hero image** (wide, 1200x800+) -> `assets/general/studio.jpg` or similar
- **About section photo** (portrait or environment shot, 800x600+)
- **Shop/secondary section photo** (if applicable)
- **3 service grid images** (4:3 ratio, 600x450+) -> `assets/services/`
- **Testimonial screenshots** (for reference when writing copy) -> `assets/testimonials/`

All photos should be compressed before going live. Use WebP if the client doesn't need IE11.

## Find-and-Replace Placeholders

Open `index.html` in your editor and search for `{{`. Every placeholder follows the `{{PLACEHOLDER_NAME}}` pattern.

### Global (replace everywhere at once)

| Placeholder | Example |
|---|---|
| `{{BUSINESS_NAME}}` | Awakened Intuition |
| `{{PHONE}}` | (207) 530-0716 |
| `{{PHONE_E164}}` | +12075300716 |
| `{{EMAIL}}` | hello@example.com |
| `{{ADDRESS}}` | 213 Water St |
| `{{CITY}}` | Gardiner |
| `{{STATE}}` | ME |
| `{{STATE_FULL}}` | Maine |
| `{{ZIP}}` | 04345 |
| `{{LATITUDE}}` | 44.2298 |
| `{{LONGITUDE}}` | -69.7756 |
| `{{INSTAGRAM_URL}}` | https://www.instagram.com/handle |
| `{{INSTAGRAM_HANDLE}}` | handle (no @) |
| `{{FACEBOOK_URL}}` | https://www.facebook.com/page |
| `{{BOOKING_URL}}` | https://booking-platform.com/client |
| `{{LOGO_PATH}}` | assets/general/logo.jpg |
| `{{CANONICAL_URL}}` | https://www.clientdomain.com/ |

### SEO / Meta

| Placeholder | Notes |
|---|---|
| `{{META_TITLE}}` | Under 60 chars. Include business name + city. |
| `{{META_DESCRIPTION}}` | Under 160 chars. Services + location + differentiator. |
| `{{META_KEYWORDS}}` | Comma-separated. Local terms first. |
| `{{OG_IMAGE_ALT}}` | Describe the hero/OG image for accessibility. |

### JSON-LD Schema

| Placeholder | Notes |
|---|---|
| `{{SCHEMA_BUSINESS_TYPE}}` | schema.org type: HealthAndBeautyBusiness, LocalBusiness, etc. |
| `{{BUSINESS_ALT_NAME}}` | Alternate/longer business name |
| `{{PRICE_RANGE}}` | e.g. "$50-$100" |
| `{{RATING_VALUE}}` | e.g. "5.0" |
| `{{REVIEW_COUNT}}` | e.g. "16" |

### Content Sections

**Hero:** `{{HEADLINE}}`, `{{SUBHEAD}}`, `{{HERO_IMAGE_PATH}}`, `{{HERO_IMAGE_ALT}}`

**Location bar:** `{{HOURS_LABEL}}`, `{{HOURS_DETAIL}}`

**Services:** Each category uses `{{SERVICE_CATEGORY_N_NAME}}`, `{{SERVICE_CATEGORY_N_DESCRIPTION}}`. Each card within uses `{{SERVICE_N_M_TIER}}`, `{{SERVICE_N_M_NAME}}`, `{{SERVICE_N_M_PRICE}}`, `{{SERVICE_N_M_DURATION}}`, `{{SERVICE_N_M_DESCRIPTION}}`. Copy/delete cards and categories as needed.

**About:** `{{ABOUT_HEADING}}`, `{{ABOUT_P1}}`, `{{ABOUT_P2}}`, `{{ABOUT_P3}}`, `{{ABOUT_IMAGE}}`, `{{ABOUT_IMAGE_ALT}}`

**Shop (optional):** `{{SHOP_HEADING}}`, `{{SHOP_DESCRIPTION}}`, `{{SHOP_IMAGE}}`, `{{SHOP_IMAGE_ALT}}` -- delete entire section if not needed.

**Testimonials:** `{{TESTIMONIAL_TEXT_N}}`, `{{TESTIMONIAL_AUTHOR_N}}` for N = 1-6. Add or remove cards as needed.

**FAQ:** `{{FAQ_QUESTION_N}}`, `{{FAQ_ANSWER_N}}` for N = 1-6. These appear in both the HTML and the JSON-LD schema -- keep them in sync.

**CTA Banner:** `{{CTA_TEXT}}`, `{{CTA_BUTTON_TEXT}}`

**Footer:** `{{TAGLINE}}`

**Chat widget:** `{{CHAT_MESSAGE}}`

**Map:** `{{GOOGLE_MAPS_EMBED_URL}}` -- get this from Google Maps > Share > Embed a map.

## Color Palette

The default palette is at the top of the `<style>` block:

```
Primary (warm mauve):    #B8A09A
Background (cream):      #F5F0EB / #FBF8F5
Accent (teal):           #7A9E9F
Headings (warm brown):   #6B4F3E
Text (charcoal):         #2C2C2C
```

To change colors: use find-and-replace across the entire CSS. The accent color (`#7A9E9F`) and its hover variant (`#6A8E8F`) are the most impactful to swap. The heading color (`#6B4F3E`) sets the overall tone.

## Copy Quality

Headlines must lead with the business differentiator. Not vibes, not generic lists. Ask: could any competitor put this headline on their site? If yes, rewrite it.

Service descriptions should tell the client what happens, not what it "means." Specific > poetic. If a description could apply to any business in the same industry, it's too generic.

Testimonials should be real, attributed, and pulled from Google/Facebook reviews. Screenshot the originals into `assets/testimonials/` for reference.
