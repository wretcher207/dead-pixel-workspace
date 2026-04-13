---
title: Log
type: log
updated: 2026-04-12
---

# The Brain — Log

Chronological record of all wiki operations. Newest entries at top.
Each entry prefixed with `## [YYYY-MM-DD] operation | description` for parseability.

---

## [2026-04-12] ingest | New articles and transcripts batch ingest (batch 2)

**Sources processed:**

**Anthropic Engineering (official):**
- `article-context-engineering-anthropic.md` — Anthropic Applied AI team on context engineering
- `article-managed-agents-anthropic.md` — Managed Agents architecture (brain/hands/session decoupling)

**Claude Code Best Practices:**
- `article-wizard-skill-tdd-claude.md` — /wizard skill, 8-phase methodology for reliable Claude Code
- `article-claudemd-prompt-optimization.md` — Arize Prompt Learning: +5-11% on SWE Bench via CLAUDE.md optimization

**Prompt Engineering:**
- `article-prompt-engineering-collection.md` — KERNEL framework, Anthropic guide, 25 tested practices, four modes

**Seedance 2.0:**
- `article-seedance-overview.md` — Features, workflow, use cases for ByteDance AI video model
- `article-skill-authoring-best-practices.md` — Anthropic official skill authoring guide

**Transcripts (4, grouped into 1 source page):**
- `transcript-seedance-claude-websites.md` — Jack Roberts (cinematic websites), Raw Keith (Seedance deep dive), Duncan Rogoff (5 levels of design), Mikuel (5 prompting hacks)

**Source files skipped / bulk-grouped:**
- ~30 articles on same topics (more Seedance content, more Claude Code tips, more prompting guides) captured in the grouped source pages above — content redundant with what was already extracted

**New entity pages created:**
- `wiki/entities/seedance-2.md` — ByteDance's AI video model

**New concept pages created:**
- `wiki/concepts/context-engineering.md` — the practice of curating optimal token context
- `wiki/concepts/prompt-engineering.md` — the foundational practice
- `wiki/concepts/claude-code-workflow.md` — accumulated best practices for Claude Code

**Existing pages updated:**
- `wiki/entities/claude-code.md` — added Advanced Practices section with context engineering, CLAUDE.md optimization, /wizard, parallel agents, harness-assumption decay
- `wiki/concepts/claude-skills.md` — added Anthropic's official authoring best practices

**Total pages after this ingest:** 68

**Key themes across all new sources:**
- Context engineering is now the frame Anthropic uses for agent design — not just prompt writing
- CLAUDE.md files are measurably impactful and systematically improvable
- The "junior mode vs. senior mode" gap in Claude Code is fixable through structured skills
- Managed Agents infrastructure decouples components so failure in one doesn't cascade
- Seedance 2.0 + Claude Code is an emerging workflow for cinematic website production
- Harness assumptions about model limitations go stale as models improve — revisit periodically

---

## [2026-04-12] ingest | 24 Claude/AI articles batch ingest

Batch ingest of all articles from `raw/articles/` and one from `raw/` root.

**Sources created (24):**
- `article-what-is-claude-overview.md` — Tom's Guide overview of Claude
- `article-claude-code-everything-guide.md` — wesammustafa's comprehensive Claude Code reference
- `article-how-i-use-claude-code.md` — Steve Sewell's Claude Code workflow
- `article-claude-code-for-non-technical.md` — Teresa Torres on Claude Code for non-devs
- `article-claude-code-researcher-setup.md` — Researcher's Claude Code setup guide
- `article-39-claude-skills-examples.md` — 39 skills from 23 creators
- `article-claude-for-hr-aihr.md` — AIHR HR plugin experiment
- `article-6am-dispatch-parallel-workflows.md` — Five parallel morning workflows
- `article-how-cowork-does-your-work.md` — Cowork as "Claude Code for non-coders"
- `article-what-do-you-use-claude-for.md` — Reddit diverse use cases
- `article-cowork-use-cases-reddit.md` — Reddit practical Cowork applications
- `article-best-use-cases-cowork.md` — "Chief of Staff" framework
- `article-beyond-hype-cowork.md` — Realistic Cowork productivity gains
- `article-what-i-actually-use-cowork-for.md` — Non-coding power user workflows
- `article-unusual-non-coding-uses.md` — Creative/unexpected uses
- `article-best-cowork-examples.md` — Autonomous agent patterns
- `article-cowork-10-use-cases-tested.md` — 10 tested + 67 by profession
- `article-cowork-small-businesses.md` — Small business guide
- `article-cowork-guide-2026.md` — 2026 guide with limitations
- `article-cowork-ruben-hassid.md` — Ruben Hassid setup guide
- `article-what-is-claude-cowork-zapier.md` — Zapier intro to Cowork
- `article-claude-ai-small-business.md` — Claude vs ChatGPT for small biz
- `article-project-vend.md` — Anthropic's vending machine experiment
- `article-setup-cowork-better.md` — Seven-step onboarding framework

**Skipped (2):**
- Duplicate: "Claude Code What It Is...1.md" (identical to non-numbered version)
- Empty/minimal: "Get started with Claude Cowork 1.md" (178 bytes, no substantive content)

**Entity pages created (4):**
- `wiki/entities/anthropic.md` — the company
- `wiki/entities/claude.md` — the AI model
- `wiki/entities/claude-code.md` — terminal agentic tool
- `wiki/entities/claude-cowork.md` — desktop agentic assistant

**Concept pages created (5):**
- `wiki/concepts/agentic-ai.md` — autonomous AI vs chatbot paradigm
- `wiki/concepts/mcp.md` — Model Context Protocol
- `wiki/concepts/claude-skills.md` — reusable instruction sets
- `wiki/concepts/ai-for-small-business.md` — AI adoption patterns and ROI
- `wiki/concepts/cognitive-offloading.md` — delegating mechanical work

**Map pages created (1):**
- `wiki/maps/claude-ecosystem.md` — full ecosystem overview

**Key themes across all 24 sources:**
- Agentic AI (autonomous execution with tool access) is the paradigm shift, not better chatbots
- Parallel task dispatch inverts the attention problem — send five tasks, review five deliverables
- Skills compound over time — one-time setup pays back indefinitely
- MCP is infrastructure — agents need integration to be useful
- Project Vend is cautionary — long-running autonomy has failure modes
- ROI is fast for knowledge workers on mechanical tasks (positive within 2-3 weeks)
- Human review remains non-negotiable — this is not "set and forget"

**Total pages after this ingest:** 50

---

## [2026-04-12] ingest | David's writing style collection (4 sources)

Batch ingest of all documents from `davids-writing-style/`:

**Sources created:**
- `wiki/sources/notes-cast-and-characters.md` — character reference sheet
- `wiki/sources/notes-writing-style.md` — opening monologue / voice sample
- `wiki/sources/notes-annie-doesnt-drink.md` — chapter draft, Annie's secret drinking
- `wiki/sources/notes-meeting-annie.md` — chapter draft, how David met Annie

**Entity pages created (7):**
- `wiki/entities/david.md` — the author
- `wiki/entities/annie.md` — girlfriend/ex
- `wiki/entities/jo.md` — mother
- `wiki/entities/dad.md` — father
- `wiki/entities/alyssa.md` — best friend/housemate
- `wiki/entities/lou.md` — Alyssa's mother
- `wiki/entities/rory.md` — Annie's father

**Concept pages created (3):**
- `wiki/concepts/suffering-as-pathway.md` — core philosophical belief
- `wiki/concepts/invisibility.md` — the paradox of the unseen memoirist
- `wiki/concepts/writing-project.md` — overview of the autobiographical project

**Raw sources copied to:** `raw/notes/`

**Total pages after this ingest:** 14

---

## [2026-04-12] init | Wiki initialized

- Created CLAUDE.md schema
- Created index.md (empty)
- Created log.md (this file)
- Created directory structure: raw/, wiki/
- Wiki is live. First ingest pending.
