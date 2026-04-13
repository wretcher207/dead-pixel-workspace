---
title: Prompt Engineering
type: concept
created: 2026-04-12
updated: 2026-04-12
sources: [article-prompt-engineering-collection, article-context-engineering-anthropic]
tags: [#prompt-engineering, #ai, #claude, #workflow, #skills]
---

# Prompt Engineering

The practice of writing instructions that reliably produce desired outputs from LLMs. The predecessor to [[context-engineering]], and still foundational for understanding why AI systems behave the way they do.

## The Basic Problem

LLMs are not search engines with a natural language interface. They don't retrieve "the right answer" — they generate the most probable continuation of a prompt. This means prompt quality has a direct, measurable effect on output quality. The same request written two different ways can produce dramatically different results from the same model.

The bad news: you can't just "talk to it naturally" and expect consistently good results on complex tasks. The good news: the patterns that work are learnable and transferable across models.

## Core Principles

**Specificity over vagueness.** "Write a blog post about AI" → generic output. "Write a 600-word blog post for solo music producers who've never used AI, walking through three practical Reaper workflow improvements you can set up in under an hour" → targeted output. The specificity is the prompt engineering.

**Positive + negative examples.** Showing Claude what good looks like is more powerful than describing it. Showing what bad looks like (and labeling it bad) is often just as useful. Examples are the "pictures worth a thousand words" for LLMs — they demonstrate expected behavior more efficiently than rules.

**One thing per prompt.** Single-goal prompts dramatically outperform multi-goal prompts in both accuracy and satisfaction. Complex tasks should be broken into chains of simpler prompts, not packed into one massive request.

**Explicit constraints.** State what NOT to do alongside what to do. "No external libraries. No functions over 20 lines. Output only Python, no explanation." Constraints eliminate the second most common failure mode: Claude doing something technically correct but wrong for your context.

**Format specification.** LLMs are extremely responsive to format instructions. "Give me a bullet list of five items" and "explain this concept" produce fundamentally different outputs, even when the underlying knowledge is the same. Always specify the format you need.

**Role assignment.** Framing Claude as a specific expert focuses responses in useful ways: "You are a senior backend engineer reviewing this API for security vulnerabilities" produces a different analysis than a plain request.

## The KERNEL Framework

A practitioner-developed framework (from [[article-prompt-engineering-collection]]):

- **Keep it simple** — one clear goal
- **Easy to verify** — explicit success criteria
- **Reproducible** — no temporal references, exact specifications
- **Narrow scope** — one goal per prompt
- **Explicit constraints** — what not to do
- **Logical structure** — context → task → constraints → format

## What Doesn't Reliably Work

- Excessive role-playing setups ("you are the world's foremost expert in...")
- Gratuitous positive reinforcement
- Asking for multiple mutually exclusive options simultaneously
- Very long, multi-layered nested prompts
- Vague quality descriptors ("make it better," "make it engaging")

## The Core Paradox

The more you understand a domain, the better you can write prompts for it. Which means AI assistance is most useful to people who need it least, and hardest to leverage for people who need it most. Writing a good prompt requires knowing what you want well enough to specify it clearly — and that knowledge is the primary skill, not prompt syntax.

This is why [[claude-skills]] and [[context-engineering]] matter: they encode learned prompt engineering decisions into reusable structures, so you don't have to rediscover them every session.

## Relation to Context Engineering

Anthropic frames [[context-engineering]] as the natural progression of prompt engineering. Prompt engineering focuses on how to write instructions. Context engineering focuses on the entire state available to the model during inference — which includes prompts, but also tools, message history, external data, and agent-generated notes.

As Claude is used for longer, multi-step tasks rather than single-shot queries, context engineering supplants prompt engineering as the primary lever.

## Relevance to David

Every Claude Code session, every wiki entry prompt, every Cowork task is a prompting decision. The difference between "write a summary of this article" and a well-structured prompt with format specification, role framing, and explicit constraints is the difference between something you immediately use and something you re-prompt three times.

The practical upgrade: stop writing single-sentence prompts for complex tasks. Use the Context (input) → Task → Constraints → Format structure. Specify what you don't want. Show an example when format matters.

## See Also
- [[context-engineering]] — the evolution of this practice
- [[claude-code-workflow]] — prompt engineering applied to code tasks
- [[claude-skills]] — encoded prompt engineering for recurring tasks
- [[article-prompt-engineering-collection]]
