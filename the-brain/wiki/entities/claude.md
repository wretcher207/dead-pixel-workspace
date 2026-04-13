---
title: Claude (AI system)
type: entity
created: 2026-04-12
updated: 2026-04-12
sources: [article-what-is-claude-overview, article-claude-code-everything-guide, article-what-is-claude-cowork-zapier]
tags: [#claude, #ai, #tools, #language-model]
---

# Claude (AI system)

Advanced large language model built by [[anthropic]]. Competes with GPT-4 and other frontier models. Distinguished by massive context windows, safety-aligned training, and agentic capabilities through [[claude-code]] and [[claude-cowork]].

## Model Lineup

**Tier-based approach** targeting different use cases:

- **Claude Haiku** — Lightweight, fast, cheap. For quick tasks, casual use, high-volume inference
- **Claude Sonnet 4.6** — Balanced reasoning and cost. Everyday work, analysis, moderate complexity tasks. Scored 70.3% on SWE-bench verified coding tasks
- **Claude Opus 4.6** — Frontier reasoning. Complex analysis, extended reasoning, agentic workflows, long-running autonomy (capable of ~7 hours operation)

(from [[article-what-is-claude-overview]])

## Core Capabilities

### Context & Information Processing
- Context window: 200k tokens default, 1M tokens for enterprise (can analyze entire books or codebases in one request)
- Vision: can analyze images, graphs, screenshots, charts, flowcharts, design mockups, and handle optical character recognition

### Extended Thinking Mode
- Allows users to control reasoning depth vs. speed trade-off
- Useful for complex problem-solving where additional reasoning time yields better solutions

### Artifact Creation
- Standalone code, documents, diagrams created outside chat interface
- Reduces chat clutter; enables direct file delivery rather than drafted ideas

(from [[article-what-is-claude-overview]])

## Technical Foundation

- Built on [[constitutional-ai]] training methodology
- Named after Claude Shannon (father of information theory)
- Less chatty than ChatGPT; more analytical and direct
- Strong jailbreak resistance (demonstrated in [[project-vend]])

## Integration & Extension

- **[[mcp|MCP servers]]** — enable Claude to interact with external systems, data sources, and APIs
- Smaller but growing plugin marketplace compared to ChatGPT
- Deep integration with [[claude-code]] and [[claude-cowork]] for agentic workflows

## Agentic Deployment

Claude can operate autonomously:
- Via terminal through [[claude-code]] (for developers)
- Via desktop through [[claude-cowork]] (for non-technical users)
- With proper scaffolding, prompt engineering, and tool access
- With notable failure modes in long-running contexts (see [[project-vend]] identity confusion incident)

## Pricing

- Token-based API pricing
- Pro subscription: $20/month (caps monthly API usage)
- Max subscription: $100/month (higher cap)
- Enterprise pricing negotiable

(from [[article-what-is-claude-overview]])

## Relevance to David

Claude is the AI David learned web development with. His proficiency with [[claude-code]] enables him to build production systems for Dead Pixel Design clients. Claude's analytical approach matches his preference for no-bullshit communication. The extended context window enables code review and refactoring at scale. Vision capabilities support audio engineering workflows (analyzing waveforms, screenshots, setup diagrams).

## See Also
- [[anthropic]]
- [[claude-code]]
- [[claude-cowork]]
- [[constitutional-ai]]
- [[mcp]]
- [[project-vend]]
- [[extended-thinking]]
