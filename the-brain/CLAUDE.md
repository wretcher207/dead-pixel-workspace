# LLM Wiki Schema — The Brain

This file governs how the LLM maintains David's personal knowledge base.
The wiki is a persistent, compounding artifact. The LLM writes and maintains all of it.
David curates sources, directs analysis, asks questions, and thinks about what it means.

---

## Architecture

```
the-brain/
├── CLAUDE.md          ← this file (schema + rules)
├── index.md           ← content catalog, organized by category
├── log.md             ← chronological record of all operations
├── raw/               ← immutable source documents (David adds, LLM reads)
│   ├── articles/
│   ├── books/
│   ├── podcasts/
│   ├── notes/         ← journal entries, personal notes, freeform
│   ├── transcripts/
│   ├── images/
│   └── data/
└── wiki/              ← LLM-generated pages (LLM writes, David reads)
    ├── entities/      ← people, places, organizations, bands, tools
    ├── concepts/      ← ideas, techniques, patterns, philosophies
    ├── sources/       ← one summary page per ingested source
    ├── synthesis/     ← cross-cutting analysis, comparisons, theses
    └── maps/          ← high-level overviews of a domain or theme
```

---

## Page Format

Every wiki page uses this structure:

```markdown
---
title: Page Title
type: entity | concept | source | synthesis | map
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [source-slug-1, source-slug-2]
tags: [tag1, tag2]
---

# Page Title

Content here. Use `[[wikilinks]]` for cross-references to other wiki pages.

## See Also
- [[Related Page 1]]
- [[Related Page 2]]
```

### Rules for pages
- **Wikilinks everywhere.** Any mention of a person, concept, place, or source that has (or should have) its own page gets a `[[wikilink]]`.
- **Source attribution.** Claims must cite which source(s) they come from using the `sources` frontmatter field and inline references like `(from [[source-slug]])`.
- **Flag contradictions.** When new data contradicts existing pages, don't silently overwrite. Add a `> [!warning] Contradiction` callout noting both claims and their sources.
- **No orphans.** Every page must be linked from at least one other page and from `index.md`.
- **Frontmatter is mandatory.** Every page gets YAML frontmatter with at minimum: title, type, created, updated, tags.

---

## Operations

### 1. Ingest

Triggered when David adds a source to `raw/` and says to process it.

**Steps:**
1. Read the source document fully.
2. Discuss key takeaways with David — what stood out, what matters, what to emphasize.
3. Create a **source summary page** in `wiki/sources/` with:
   - One-paragraph summary
   - Key claims/findings (bulleted)
   - Notable quotes (if any)
   - Questions raised
   - Connections to existing wiki pages
4. **Update existing pages** — scan `index.md` for related entities/concepts. Read those pages. Update them with new information, adding source citations.
5. **Create new pages** for any entity or concept that appears significant but doesn't have a page yet.
6. **Update `index.md`** — add the new source page and any new entity/concept pages.
7. **Append to `log.md`** — record what was ingested, what pages were created/updated.

**Ingest rules:**
- Process one source at a time unless David says otherwise.
- Always show David the source summary before filing it.
- Never modify files in `raw/`. They're immutable.
- A single source may touch 5-15 wiki pages. That's normal.

### 2. Query

David asks a question. The LLM answers using the wiki.

**Steps:**
1. Read `index.md` to find relevant pages.
2. Read those pages.
3. Synthesize an answer with citations to specific wiki pages.
4. If the answer is substantial and reusable, offer to file it as a new page in `wiki/synthesis/` or `wiki/concepts/`.
5. If the question reveals a gap in the wiki, note it.

**Query rules:**
- Always cite which wiki pages informed the answer.
- If the wiki doesn't have enough to answer, say so. Suggest what sources might fill the gap.
- Good answers that represent real analysis should be offered as new wiki pages — don't let insights rot in chat history.

### 3. Lint

Periodic health check on the wiki. Run when David asks or when the wiki has grown significantly since last lint.

**Check for:**
- [ ] Contradictions between pages (flag with callouts)
- [ ] Stale claims superseded by newer sources
- [ ] Orphan pages (no inbound links)
- [ ] Important concepts mentioned but lacking their own page
- [ ] Missing cross-references between related pages
- [ ] Data gaps that could be filled with a web search
- [ ] Pages that have grown too long and should be split
- [ ] Frontmatter inconsistencies

**Output:** A lint report with findings and proposed fixes. Apply fixes after David approves.

---

## Conventions

### Naming
- File names: `kebab-case.md` (e.g., `carl-jung.md`, `shadow-work.md`)
- Source slugs: `source-type-short-title.md` (e.g., `article-memex-1945.md`, `book-maps-of-meaning-ch3.md`)

### Tags
Use consistent tags. Common tags for David's domains:
- `#music` `#wretcher` `#audio-engineering` `#death-metal`
- `#web-dev` `#business` `#dead-pixel`
- `#psychology` `#jung` `#shadow` `#self`
- `#writing` `#memoir`
- `#ai` `#tools` `#workflow`

### Cross-references
- Use Obsidian-style `[[wikilinks]]` — they work in the graph view.
- When referencing a specific section: `[[page-name#section]]`
- For source citations inline: `(from [[source-slug]])`

### Callouts (Obsidian syntax)
```markdown
> [!info] New finding
> Content here

> [!warning] Contradiction
> Source A says X, but Source B says Y.

> [!question] Open question
> Something worth investigating further.

> [!tip] Connection
> This relates to [[other-page]] because...
```

---

## Writing Standards

This is David's brain, not a corporate wiki.
- Write in clear, direct prose. No filler. No corporate voice.
- Match David's tone: dark-humored, cerebral, honest, no bullshit.
- For personal/psychological content: thoughtful, not clinical. Jungian depth, not self-help platitudes.
- For technical content: precise and practical.
- Never sanitize. If a source is dark, the summary is dark.
- Read `davids-writing-style/` before writing any substantial prose content.

---

## Session Protocol

Every session that touches the wiki:
1. Read `index.md` and `log.md` to understand current state.
2. Do the work (ingest, query, lint, or whatever David asks).
3. Update `log.md` with what happened.
4. Update `index.md` if pages were added or removed.

---

## Growth Notes

As the wiki grows, we may need:
- A search tool (qmd or custom) when index-based navigation gets slow (~100+ pages)
- Dataview queries in Obsidian for dynamic tables over frontmatter
- Map pages that provide high-level overviews of entire domains
- Periodic synthesis pages that distill cross-cutting themes

These will be added as needed, not upfront.
