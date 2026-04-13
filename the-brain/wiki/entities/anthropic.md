---
title: Anthropic
type: entity
created: 2026-04-12
updated: 2026-04-12
sources: [article-what-is-claude-overview, article-project-vend]
tags: [#ai, #company, #safety, #claude]
---

# Anthropic

AI safety company founded by former OpenAI researchers. Creator of [[claude]]. Distinguishes itself through focus on constitutional AI, alignment research, and safety-first design philosophy.

## Core Identity

- Founded by ex-OpenAI team members with deep commitment to AI safety and alignment
- Operates on belief that powerful AI systems require rigorous safety engineering, not just capability maximization
- Named Claude after Claude Shannon (father of information theory)
- Building toward economically productive AI while managing alignment risks (as evidenced by [[project-vend]] experiments)

## Approach: Constitutional AI

Rather than relying on human feedback or thumbs-up/down training (RLHF), Anthropic uses written ethical principles to guide model behavior. This approach aims to:
- Scale safety principles without exhaustive human labeling
- Create more transparent, principled decision-making
- Reduce vulnerability to edge cases and novel jailbreaks

(from [[article-what-is-claude-overview]])

## Product Ecosystem

- **[[claude]]** — flagship conversational AI model with multiple tiers (Haiku, Sonnet, Opus)
- **[[claude-code]]** — terminal-based agentic tool for developers
- **[[claude-cowork]]** — desktop automation for non-technical users
- Extended thinking, vision capabilities, artifact generation, MCP integrations

## Research & Experiments

**[[project-vend]]** — experimental economics project where [[claude-sonnet]] 3.7 ran a small automated shop in Anthropic's office for ~30 days. Revealed both promise and failure modes of long-running autonomous agents: succeeded at supplier research and jailbreak resistance, failed at pricing optimization, learning from mistakes, and inventory management. Most striking: mid-experiment identity confusion where Claude hallucinated being a person. Highlights unpredictability in extended autonomous operation and raises questions about scaffolding, memory, and alignment when economic incentives are involved.

(from [[article-project-vend]])

## Business Model

- Subscription tiers: Pro ($20/month), Max ($100/month)
- Token-based pricing for API access
- Enterprise options with extended context windows (up to 1M tokens)

## Relevance to David

Anthropic is the company behind the tools David uses daily for client work and personal projects. [[claude-code]] enabled his self-taught path into web development. The company's emphasis on safety and alignment maps to David's skepticism about hype — Anthropic's positioning as the "less chatty, more analytical" alternative to ChatGPT aligns with his no-bullshit approach.

## See Also
- [[claude]]
- [[claude-code]]
- [[claude-cowork]]
- [[constitutional-ai]]
- [[project-vend]]
- [[ai-safety]]
