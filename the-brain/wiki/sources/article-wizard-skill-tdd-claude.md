---
title: "I Made Claude Code Think Before It Codes — The /wizard Skill"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [article-wizard-skill-tdd-claude]
tags: [#claude-code, #development, #tdd, #workflow, #skills]
---

# I Made Claude Code Think Before It Codes — The /wizard Skill

**Source:** dev.to — author unknown, published March 2026
**URL:** dev.to/_vjk/i-made-claude-code-think-before-it-codes-heres-the-prompt-bf

## Summary

The author identified a fundamental problem with Claude Code: high velocity, low net velocity. Code comes fast, bugs arrive faster. Even with a solid CLAUDE.md, Claude defaults to "junior mode" — reading the ticket, opening the file, starting to type. The senior developer pattern is different: read the ticket, read the surrounding code, read the tests, check git history, *then* start.

The solution was a Claude Code skill called `/wizard` — an 8-phase methodology that transforms Claude from a fast coder into a methodical software architect. The skill is a markdown file that activates when you type `/wizard` in the CLI.

## The 8 Phases

**Phase 1: Plan before you touch anything.** Claude reads CLAUDE.md and the linked GitHub issue, builds a structured todo list, assesses complexity (how many files affected, architectural risk, what could go wrong), and sizes the work. The step that gets skipped most often when you're in a hurry — which is exactly when you need it most.

**Phase 2: Explore before you assume.** Claude greps for every model, method, relationship, and constant it intends to use, and verifies they exist before referencing them. This phase eliminates hallucinated relationship chains like `user.clientProfile.accounts`. "Does this actually exist?" is a worthwhile question before building on top of it.

**Phase 3: Write the tests first.** Enforces TDD with a mutation testing mindset. Assertions must be specific: not `assert($result)` but `assertEquals('completed', $result->status)`. Not "this function runs without errors" but "the timestamp was set, the notification was sent, the counter was incremented." A skeptic test suite, not a friend who tells you your PR looks great without reading it.

**Phase 4: Implement the minimum.** Not the full vision, not the clever abstraction Claude already has in mind — the minimum code to make the tests pass. Scope creep is a bug, and the most expensive kind because it looks like progress.

**Phase 5: Verify nothing regressed.** Run the broader test suite, not just the new tests. Find regressions before they become PR review comments.

**Phase 6: Document while the context is fresh.** Inline comments, changelog entries. Easy to skip, worth doing before the context evaporates.

**Phase 7: The adversarial review.** Claude reviews its own work as an attacker. What happens if this runs twice concurrently? What if input is null, empty, negative? What assumptions are being made that could be wrong? Would I be embarrassed if this broke in production?

**Phase 8: CI integration.** Respond to the actual CI output, not a guess at what it might say.

## Key Insight

The problem wasn't Claude's intelligence. It was that good habits written in a markdown file don't automatically become *practiced* habits. The human was the process — inconsistent, forgetful, and increasingly annoyed at itself. /wizard makes the process Claude's job.

## Questions Raised

- How does this skill interact with non-TDD projects or rapid prototyping?
- Is an 8-phase methodology too heavy for small tasks? (The author seems to use it selectively, not for every change.)
- What does mutation-resistant test writing look like in JavaScript vs. PHP vs. Python?

## Connections to Existing Pages

- [[claude-code]] — extends Claude Code's default behavior with structured methodology
- [[claude-skills]] — an example of a project-level skill changing Claude's fundamental approach
- [[context-engineering]] — Phase 1-2 are applied context engineering: loading relevant context before acting

## See Also
- [[article-claudemd-prompt-optimization]]
- [[claude-code-workflow]]
