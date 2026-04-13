---
title: "CLAUDE.md Best Practices via Prompt Learning (Arize)"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [article-claudemd-prompt-optimization]
tags: [#claude-code, #prompt-engineering, #development, #workflow, #optimization]
---

# CLAUDE.md Best Practices via Prompt Learning (Arize)

**Source:** Arize AI Blog — Priyan Jindal, November 2025
**URL:** arize.com/blog/claude-md-best-practices-learned-from-optimizing-claude-code-with-prompt-learning/

## Summary

Arize used a technique called Prompt Learning (a prompt optimization approach inspired by reinforcement learning) to systematically improve Claude Code's CLAUDE.md instructions via automated feedback loops — with no model fine-tuning, no tool changes, no architecture changes. Result: 5.19% improvement on SWE Bench Lite for general coding, and 10.87% improvement when specialized to a single repository.

## What Prompt Learning Does

Instead of RL updating model weights, Prompt Learning updates system prompts. The loop:

1. Run Claude Code on training examples, generating solution patches
2. Run unit tests on each patch (binary pass/fail score)
3. Ask an LLM to generate richer feedback: *why* did this fail? What's the conceptual error? What's the right approach?
4. Feed the scored examples + LLM feedback into a meta-prompt that generates an improved CLAUDE.md
5. Test the new rules on the held-out test set
6. Repeat until plateau or cost limit

The LLM feedback in step 3 is the key differentiator over plain RL. Instead of just knowing "6 tests passed, 4 failed," the optimizer knows *why* tests failed: misunderstood APIs, missing edge cases, wrong assumptions about repository structure.

## Key Findings

- **+5.19% general codegen improvement** (by-repo split: test set contained repos not in training set — meaning generalization, not overfitting)
- **+10.87% in-repo improvement** (same repo, later issues in training) — this mirrors real developer workflow, where "overfitting" to a specific codebase is actually the goal
- All gains came purely from better CLAUDE.md instructions. No model changes whatsoever.

## Implications

This confirms that CLAUDE.md quality has measurable, quantifiable impact on Claude Code performance. The ceiling hasn't been reached by writing CLAUDE.md by hand — there's room for systematic optimization.

The in-repo result is particularly interesting for solo developers: if you work on the same codebase every day, you can train Claude Code's CLAUDE.md to internalize that repo's patterns, conventions, and pitfalls. 11% better code, automated.

## Questions Raised

- What did the optimized CLAUDE.md rules actually say? The paper doesn't quote them directly.
- How quickly does an optimized CLAUDE.md go stale as the codebase evolves?
- At what project size does the overhead of running Prompt Learning pay back vs. just writing CLAUDE.md by hand?

## Connections to Existing Pages

- [[claude-code]] — the tool being optimized
- [[context-engineering]] — CLAUDE.md is a key piece of the context that gets engineered
- [[claude-skills]] — parallel to skills: structured instructions that compound performance
- [[prompt-engineering]] — Prompt Learning is a systematic extension of prompt engineering

## See Also
- [[article-wizard-skill-tdd-claude]]
- [[claude-code-workflow]]
