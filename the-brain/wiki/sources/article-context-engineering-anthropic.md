---
title: "Effective Context Engineering for AI Agents"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [article-context-engineering-anthropic]
tags: [#ai, #claude-code, #agents, #context, #anthropic, #engineering]
---

# Effective Context Engineering for AI Agents

**Source:** Anthropic Engineering Blog — written by the Applied AI team (Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield, et al.)
**URL:** anthropic.com/engineering/effective-context-engineering-for-ai-agents

## Summary

Anthropic draws a formal distinction between prompt engineering and context engineering, positioning the latter as the natural evolution of the field. Context engineering is the practice of curating the optimal set of tokens during LLM inference — not just writing prompts, but managing the entire state available to the model at any given moment: system instructions, tools, MCP connections, external data, message history.

The core problem: LLMs have a finite "attention budget." As token counts grow, model performance on information retrieval degrades — a phenomenon called **context rot**. Every token costs attention. More isn't better. Smaller, higher-signal context windows consistently outperform bloated ones.

## Key Claims

- **Context rot is real.** Studies show that as context window size increases, model accuracy at retrieving specific information decreases. The degradation is gradual, not a cliff — but it's consistent across all models.
- **System prompts should hit the right altitude.** Too prescriptive = brittle, breaks when models improve. Too vague = fails to give actionable signals. The goldilocks zone: clear enough to guide behavior, flexible enough to let the model reason.
- **Tools should be minimal and non-overlapping.** Bloated tool sets with overlapping functionality cause ambiguous decision points. If a human engineer can't determine which tool to use in a given situation, neither can the agent.
- **"Just in time" context** beats pre-loading everything. Rather than dumping all relevant data upfront, effective agents maintain lightweight references (file paths, queries, links) and load data dynamically as needed. Claude Code uses this approach — it writes targeted bash commands to retrieve exactly what it needs rather than loading full codebases into context.
- **Compaction is the first lever for long-horizon tasks.** When a context window nears its limit, the agent summarizes and reinitializes. Claude Code does this automatically, preserving architectural decisions and unresolved bugs while discarding redundant tool outputs.
- **Structured note-taking enables persistence.** Agents write notes to files (NOTES.md, TODO files) that persist across context resets. This is how [[claude-code]] tracks tasks mid-session. Claude playing Pokémon maintained strategic notes across thousands of steps, learning which attacks worked against which opponents.
- **Sub-agent architectures decompose complexity.** The lead agent coordinates; specialized sub-agents do deep technical work with clean context windows. Each sub-agent might use tens of thousands of tokens but returns only 1,000-2,000 tokens of condensed output to the orchestrator.

## CLAUDE.md as Hybrid Strategy

CLAUDE.md files exemplify the hybrid retrieval model: dropped into context upfront (like pre-loaded data), while bash primitives like `glob` and `grep` enable just-in-time retrieval. This bypasses stale indexing and complex syntax trees.

## Questions Raised

- As models improve and "context anxiety" disappears (see [[article-managed-agents-anthropic]]), which harness behaviors become dead weight?
- What's the right compaction prompt for a given domain? Maximizing recall vs. improving precision is a real tradeoff.
- How does structured note-taking interact with multi-agent architectures? Do sub-agents maintain their own notes, or surface everything to the orchestrator?

## Connections to Existing Pages

- [[claude-code]] — uses hybrid CLAUDE.md + just-in-time retrieval model described here
- [[mcp]] — MCP is listed as a key component of the context that needs engineering
- [[agentic-ai]] — the scaling context for why this matters
- [[claude-skills]] — skills are one form of structured context that gets loaded when relevant

## See Also
- [[article-managed-agents-anthropic]]
- [[context-engineering]]
