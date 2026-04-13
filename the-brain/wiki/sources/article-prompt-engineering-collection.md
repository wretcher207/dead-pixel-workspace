---
title: "Prompt Engineering — Collected Frameworks and Practices"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [article-kernel-framework, article-anthropic-prompting-guide, article-prompt-engineering-collection]
tags: [#prompt-engineering, #ai, #claude, #workflow, #best-practices]
---

# Prompt Engineering — Collected Frameworks and Practices

**Sources (grouped):**
- "After 1000 hours of prompt engineering, I found the 6 patterns that actually matter" — Reddit/r/PromptEngineering, volodith, 2025-09
- "How to prompt Claude: The complete guide" — Anthropic documentation
- "12 prompt engineering tips to boost Claude's output quality"
- "Claude Prompt Engineering: We Tested 25 Popular Practices (These 5 Worked)"
- Various Claude Code prompting guides

## Summary

A batch of prompt engineering content that arrived together. The most useful frameworks and insights extracted across sources.

## The KERNEL Framework (1000 hours, volodith)

After tracking 1000+ real work prompts, a tech lead identified six patterns that separate effective prompts from ineffective ones:

**K — Keep it simple.** One clear goal per prompt. The "500 words of context → 70% less token usage, 3x faster responses with one goal" comparison is real. Complexity in the prompt usually produces complexity in the output, not precision.

**E — Easy to verify.** Build in a success criterion. Replace "make it engaging" with "include 3 code examples." If you can't tell whether Claude succeeded, Claude can't either. Verifiable criteria: 85% success rate vs. 41% without them.

**R — Reproducible results.** Avoid temporal references ("current trends," "latest best practices"). Use exact versions and specific requirements. A prompt that works today should work in three months.

**N — Narrow scope.** One prompt, one goal. Don't combine code + docs + tests + deployment in one request. Single-goal prompts: 89% satisfaction vs. 41% for multi-goal. This is the same lesson as task splitting in Claude Code.

**E — Explicit constraints.** Tell Claude what NOT to do. "Python code. No external libraries. No functions over 20 lines." Constraints reduced unwanted outputs by 91%.

**L — Logical structure.** Every prompt should be: Context (input) → Task (function) → Constraints (parameters) → Format (output).

**Chain prompts, don't stack tasks.** Instead of one massive prompt, chain multiple KERNEL-compliant prompts. Each does one thing, feeds the next.

## Anthropic's Core Guidance (distilled)

From Anthropic's official prompting documentation:

- **Be clear and direct.** Don't assume Claude will infer what you want. Spell it out.
- **Use positive and negative examples.** Show what good looks like and what bad looks like. Examples are more powerful than rules.
- **Encourage step-by-step reasoning.** For complex tasks, ask Claude to think through it before answering, or use extended thinking mode.
- **Use XML tags for structure.** `<context>`, `<instructions>`, `<output_format>` — clean structure helps Claude attend to each section correctly.
- **Specify length and format.** "Give me three bullet points" beats "give me a brief overview."
- **Give Claude a role when relevant.** "You are a senior backend engineer reviewing for security vulnerabilities" focuses output differently than a generic request.

## What Actually Works (25 practices tested)

From a systematic test of 25 popular prompt engineering practices, five consistently improved results:

1. **Few-shot examples** — showing Claude the desired output format before asking for it
2. **Chain of thought** — explicitly asking Claude to reason step-by-step before reaching a conclusion
3. **Role assignment** — framing Claude as a specific expert for the domain at hand
4. **Explicit constraints** — stating what NOT to do alongside what to do
5. **Output format specification** — defining exactly how the answer should be structured

**What didn't reliably work:** elaborate role-playing setups, excessive positive reinforcement ("you're the world's best..."), multi-level nested prompting, asking for multiple mutually exclusive options simultaneously.

## The Four Modes Framework (informal)

From "How I Learned to Prompt AI Better — My Four Modes": different tasks require different prompting modes:

1. **Creation mode** — give Claude enough context to make interesting choices (too much specificity kills the output)
2. **Execution mode** — maximum precision, enumerate every requirement
3. **Exploration mode** — open questions, "what are the implications of X?"
4. **Critique mode** — give Claude something to react to, not just a blank page

Knowing which mode you're in before writing the prompt is more useful than any specific technique.

## Metrics Across Sources

- First-try success rate with KERNEL: 72% → 94%
- Revisions needed per output: 3.2 → 0.4
- Token usage reduction: 58%
- Time to useful result: -67%

These metrics come from a single author's dataset (volodith) and should be read directionally, not as universal benchmarks.

## Key Tension

Multiple sources identify the same paradox: the more you know about a domain, the better your prompts — which means the AI is most useful to people who need it least, and least useful to people who need it most. Understanding what you want well enough to specify it clearly is the core skill, not prompt syntax.

## Connections to Existing Pages

- [[prompt-engineering]] — this is the source material
- [[context-engineering]] — the progression beyond individual prompts
- [[claude-code-workflow]] — prompt engineering principles applied to Claude Code specifically
- [[claude-skills]] — a way to pre-encode prompt engineering decisions so you don't have to re-specify them every session

## See Also
- [[prompt-engineering]]
- [[context-engineering]]
- [[claude-code-workflow]]
