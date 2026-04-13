---
title: Context Engineering
type: concept
created: 2026-04-12
updated: 2026-04-12
sources: [article-context-engineering-anthropic, article-managed-agents-anthropic]
tags: [#ai, #agents, #claude-code, #anthropic, #engineering, #context]
---

# Context Engineering

The practice of curating and managing the optimal set of tokens available to an LLM at any given moment during inference. Distinct from — and more expansive than — [[prompt-engineering]].

Where prompt engineering asks "how should I write this instruction?", context engineering asks "what should be in the model's context window right now, and why?"

## The Core Problem

LLMs have a finite attention budget. The transformer architecture creates n² pairwise relationships between tokens — as context grows, the model's ability to attend to any specific piece of information gets stretched thin. This produces **context rot**: measurable degradation in information retrieval accuracy as token count increases.

More tokens is not better. The goal is the smallest possible set of high-signal tokens that maximize the probability of the desired outcome. (from [[article-context-engineering-anthropic]])

## What's Being Engineered

Context in an agent includes:

- **System prompts** — the baseline instructions
- **Tools** — how the agent interacts with its environment and pulls in new information
- **Examples** (few-shot) — concrete demonstrations of expected behavior
- **Message history** — the running conversation
- **External data** — files, database results, API responses, MCP connections
- **Agent-generated notes** — what the agent has written to persist across turns

Each of these competes for space in the attention budget. Good context engineering means knowing what to include, what to exclude, and when.

## Techniques

**Just-in-time retrieval** rather than pre-loading everything. Agents maintain lightweight references (file paths, query stubs, URLs) and fetch data only when needed. [[claude-code]] does this via glob and grep — it retrieves exactly the files it needs for the task at hand, rather than scanning full codebases.

**Compaction** for long-horizon tasks. As a context window fills, the agent summarizes the conversation and reinitializes with the compressed version. [[claude-code]] automates this: it passes message history to the model to summarize, preserving architectural decisions and unresolved bugs while discarding redundant tool outputs. The five most recently accessed files get carried forward.

**Structured note-taking** for cross-session persistence. The agent maintains notes in files (NOTES.md, TODO lists) that survive context resets. This is how agents maintain coherent long-horizon tasks — writing down what matters rather than relying on working memory that will get compacted away.

**Sub-agent architectures** for separation of concerns. A lead agent coordinates with a high-level plan; sub-agents do the deep technical work in clean context windows. Sub-agents might consume tens of thousands of tokens exploring a problem space, but return only a condensed 1,000–2,000 token summary to the orchestrator. This keeps the orchestrator's context focused.

**Tool design** as context engineering. Bloated tool sets with overlapping functionality cause decision paralysis. The rule: if a human engineer can't definitively say which tool to use in a given situation, the agent can't be expected to either. Minimal, non-overlapping tools are infrastructure for good context.

## CLAUDE.md as Hybrid Strategy

CLAUDE.md files are a practical example of hybrid context design: they're pre-loaded into context upfront (so the agent always has project conventions), but pair with just-in-time tools (grep, glob) that retrieve specific file contents when needed. This gives the agent a stable orientation layer without drowning it in code.

## Relevance to David

Every CLAUDE.md file David writes for his projects is applied context engineering. The decisions about what goes in it — coding conventions, project structure, forbidden patterns, tool preferences — directly affect how reliably [[claude-code]] performs.

The insight from [[article-context-engineering-anthropic]]: don't over-prescribe. Brittle CLAUDE.md files that hardcode every edge case become maintenance debt. The right altitude is clear enough to guide behavior, flexible enough to let the model reason.

## See Also
- [[prompt-engineering]] — the narrower precursor
- [[agentic-ai]] — the use case that makes context engineering necessary
- [[claude-code]] — the primary tool where context engineering decisions are made daily
- [[article-context-engineering-anthropic]] — the source
- [[article-managed-agents-anthropic]] — infrastructure layer where context lives
