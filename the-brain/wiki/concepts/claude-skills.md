---
title: Claude Skills
type: concept
created: 2026-04-12
updated: 2026-04-12
sources: [article-39-claude-skills-examples, article-6am-dispatch-parallel-workflows, article-best-use-cases-cowork, article-cowork-10-use-cases-tested, article-skill-authoring-best-practices]
tags: [#claude-skills, #workflow-automation, #reusable-systems, #productivity, #anthropic]
---

# Claude Skills

Skills are saved instruction sets that Claude loads automatically. Once you encode a workflow, style, or decision framework as a skill, Claude applies it consistently on every invocation—no need to re-explain your preferences, context, or output format.

Think of a skill as a saved prompt that compounds: you write it once, then it works a thousand times. The tool is available in [[claude-cowork]], browser Claude, [[claude-code]], and Claude API.

## How It Works

A skill is a markdown file (SKILL.md) containing:
- Your custom instructions (tone, style, how you think)
- Context (your domain knowledge, constraints, decision rules)
- Examples (outputs you consider correct)
- Output format specifications

When you invoke a skill, Claude loads the full instruction set into context automatically. For [[claude-cowork]] users, this means assigning a skill to a task queue and Claude follows the rules without being told again.

**Example:** A "Voice DNA" skill captures what a writer never does—not just what they always do. This prevents Claude from "correcting" your writing toward its own style, which is why one example skill has three separate instructions: one for your core voice, one for your public-facing audience voice, one for your coaching voice (from [[article-39-claude-skills-examples]]).

Skills compound because:
1. **First use:** 30 minutes to define and test
2. **Every subsequent use:** reusable, consistent, no setup friction
3. **Composition:** skills stack—a content-writing skill + a brand-guidelines skill + a voice skill create a custom author

## Why This Matters

Without skills, every invocation requires context. With skills:
- You don't explain your voice twice
- Claude doesn't "correct" your preferences
- Batch operations (processing 100 articles) maintain consistency
- Non-developers can automate without scripting
- [[agentic-ai]] workers know your rules before acting

From [[article-39-claude-skills-examples]], one creator encoded a "QA + Proofreading" skill that runs sequentially: fix strategy first, then polish execution. Another created an "Email Conversion Tester" skill that catches weak CTAs by reviewing from a fresh angle. These aren't one-liners; they're reusable frameworks.

The larger benefit: skills let you encode business logic. A skill can embody your pricing strategy, your brand voice, your decision criteria. Every agent that loads that skill acts aligned with your mental model.

## Common Skill Types

From the 39 examples in [[article-39-claude-skills-examples]]:

**Writing skills:**
- Voice (capture your style, what you never do)
- Public audience (different tone for external messaging)
- QA + Proofreading (sequential strategy/polish)

**Creative skills:**
- Hero image prompt generator (applies brand guidelines automatically)
- Content calendar planner
- Social amplification (final step, not first)

**Business skills:**
- Business case builder (forces quantification: conservative/expected/optimistic)
- Inventory analyst (uses brand context, velocity, seasonal buffers)
- Job description analyzer (scoring compatibility)
- Compensation analyzer (for HR)

**Development skills:**
- Frontend design (forces bold aesthetic commitments before code)
- UI testing (automated parallel checks)
- MCP debugger (converts 20-minute debugging to 2-minute reads)

**Knowledge skills:**
- Content extraction ("Blue Fish" skill auto-captures learning into Notion)
- Report generator (transforms raw data into formatted insight)
- Research framework (custom domain-specific analysis)

## Relevance to David

For Dead Pixel Design and Wretcher:

**Design-specific skills:**
- Brand voice (Dead Pixel aesthetic, tone, what you never do)
- Code review (style enforcement, performance patterns you care about)
- Client communication (how you handle specific client types)

**Music-specific skills:**
- Production decision framework (mixing approach, when to automate vs. manual, what makes a Wretcher song)
- Arrangement logic (how you think about song structure)
- Tone/timbre preferences (what you like and dislike in gear/synths)

**Business skills:**
- Proposal generator (client type + project scope → proposal format)
- Project scoping (how you estimate work)
- Retrospective analyzer (lessons from past projects)

Once defined, these skills let Claude operate independently while staying aligned with your taste. You're not explaining yourself repeatedly; the skill is doing it.

## Limitations and Gotchas

- **Skill bloat:** 50+ skills become hard to manage and remember. Keep skill count focused.
- **Versioning:** Skills evolve; old invocations don't update. You may need to re-run work if you improve a skill.
- **Composition conflicts:** If two skills contradict on output format, Claude follows the most recently loaded one. Avoid overlapping scope.
- **Over-engineering:** A 1,000-line skill solving one problem is overkill. Start with 50-100 lines and grow.

## Authoring Best Practices (Updated 2026-04-12)

Anthropic published comprehensive official guidance on writing effective skills. Core principles:

**Concise is non-negotiable.** The context window is a public good. Every token your skill occupies competes with the actual work. The wrong instinct is to explain what Claude already knows. Only add context Claude doesn't have.

**Description field is the discovery mechanism.** Claude loads only name + description for all skills at startup; SKILL.md is only read when the skill is selected. The description must answer both "what does this do" and "when should I use it." Third person, specific, includes trigger terms.

**Progressive disclosure architecture.** SKILL.md is a table of contents. Reference files live one level deep — never nested. Files the current task doesn't need consume zero tokens.

**Build evaluations first.** Before writing documentation, run Claude without the skill and document specific failures. Write test cases for those failures. Then write minimum instructions to address them. Don't anticipate requirements that might never materialize.

**The Claude A / Claude B method.** Use one Claude instance to design the skill. Test with fresh instances on real tasks. Observe where fresh instances struggle. Bring observations back to the designer instance. This pattern works because Claude understands both sides of the exchange.

**SKILL.md body under 500 lines** for optimal performance. Split content into domain-specific files when approaching that limit.

(from [[article-skill-authoring-best-practices]])

## See Also
- [[agentic-ai]] — agents powered by skills execute autonomously
- [[claude-cowork]] — primary platform for skill usage
- [[cognitive-offloading]] — skills encode your mental model so Claude can embody it
- [[context-engineering]] — skills are pre-encoded context engineering
- [[article-skill-authoring-best-practices]]
- [[claude-ecosystem]] — broader context where skills fit
