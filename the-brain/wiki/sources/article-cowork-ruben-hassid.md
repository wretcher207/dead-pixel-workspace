---
title: "Cowork: How to Set Up Claude Cowork (April 2026 Update)"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [self]
tags: [#claude-cowork, #workflow, #tools, #ai, #productivity, #setup, #voice-interface]
---

# Cowork: How to Set Up Claude Cowork (April 2026 Update)

## Summary
Ruben Hassid's comprehensive guide to [[claude-cowork]] setup details the folder structure, global instructions, and practices that enable efficient agentic work. The core insight is that [[claude-cowork]] works best with lean, purposeful folder organization and token management, with the bottleneck shifting from model capability to user input speed. The guide emphasizes pairing [[claude-cowork]] with voice dictation (via [[wispr-flow]]) to match thinking speed rather than typing speed.

## Key Claims
- [[claude-cowork]] requires $20/month Pro plan or higher; use Claude Opus 4.6 for complex tasks
- Folder structure matters more than most users realize: ABOUT ME (stores personal context), OUTPUTS (stores deliverables), TEMPLATES (stores reusable structures)
- Three core files in ABOUT ME folder: about-me.md (who you are, how you work), anti-ai-writing-style.md (what AI patterns you hate), my-company.md (goals and strategy)
- Global Instructions (Settings → Cowork) must tell Claude what to read before every task; lean files (under 6,000 tokens total) ensure Claude reads them fully rather than summarizing loosely
- Token efficiency comes from keeping ABOUT ME files small, restarting conversations rather than sending follow-ups, batching tasks, using Sonnet for cheap tasks and Opus only for deep work
- Voice dictation via [[wispr-flow]] is 4x faster than typing and produces richer context because thinking flows differently when speaking
- Context window management: long conversations become token furnaces (98.5% tokens spent re-reading history); intentional session breaks save significant budget
- Templates auto-populate in TEMPLATES folder when you ask Claude to save output as template; users reference them later by name

## Notable Details
- Five-hour rolling window for Claude's usage limits; spreading work across day maximizes available capacity
- Wispr Flow free tier: 2,000 words/week; paid tier includes free month with paid newsletter subscription
- Common setup time: 20 minutes to get folder structure, global instructions, and [[wispr-flow]] working
- Restarting conversation from a previous message saves tokens more effectively than follow-ups (prevents re-reading full history)
- Starting fresh session every 20 messages recommended; one developer found 98.5% of tokens spent re-reading, only 1.5% on output
- Distinguish between three model tiers: Opus (smartest, most expensive), Sonnet (balanced), Haiku (cheapest); Extended thinking adds reasoning but costs more

## Questions Raised
- How small can about-me files become while still capturing what makes your work unique?
- What's the actual ROI of [[wispr-flow]] adoption for different types of knowledge work?
- How does token budget scale for teams versus individuals?
- Can template-driven workflows reduce the need for elaborate about-me files?

## Connections
- [[claude-cowork]] - the tool itself; this guide is about optimizing its use
- [[wispr-flow]] - voice dictation that accelerates context input
- [[anthropic]] - creator of [[claude-cowork]]
- [[agentic-ai]] - broader category of AI that takes autonomous action
- [[tokens]] and [[context-window]] - the underlying constraints this guide helps manage
- [[about-me-files]] - concept of storing personal context as lean structured documents
- [[global-instructions]] - persistent prompts that frame every [[claude-cowork]] session