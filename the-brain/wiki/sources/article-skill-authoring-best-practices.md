---
title: "Skill Authoring Best Practices (Anthropic Docs)"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [article-skill-authoring-best-practices]
tags: [#claude-code, #skills, #workflow, #anthropic, #tools]
---

# Skill Authoring Best Practices (Anthropic Docs)

**Source:** Anthropic Platform Documentation
**URL:** platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

## Summary

Anthropic's official guide for writing effective Claude skills (SKILL.md files). The guiding principle throughout: **concise is key.** The context window is a public good. Every token a skill occupies competes with the conversation, other skills, tools, and the actual work.

## Core Principles

**Assume Claude is already smart.** Only add context Claude doesn't have. Challenge every paragraph: "Does Claude really need this explanation? Can I assume Claude knows this? Does this justify its token cost?" The bad example: 150-token explanation of what a PDF is and why pdfplumber is a good choice. The good example: 50 tokens showing the actual import and one line of code.

**Set appropriate degrees of freedom.** High-freedom instructions (heuristics, general approach) for tasks where multiple approaches are valid. Low-freedom instructions (exact scripts, no modification allowed) for fragile, error-prone operations like database migrations. The bridge analogy: if there's a narrow bridge with cliffs on both sides, give exact instructions. If it's an open field, give direction.

**Progressive disclosure architecture.** SKILL.md should be a table of contents pointing to other files. When Claude needs the full API reference or a complex example set, it reads those files. When it doesn't, those files consume zero tokens. One level of depth from SKILL.md — references to references cause Claude to partially read files and miss content.

**The filesystem is the architecture.** Skills run in an environment with filesystem access. File names should be descriptive (`form_validation_rules.md`, not `doc2.md`). Use forward slashes, not backslashes. Reference files by domain: `reference/finance.md` vs. `reference/sales.md`.

## Description Field Is Critical

The `description` field is how Claude decides whether to activate a skill. It gets loaded upfront for all skills; SKILL.md is only read when the skill is selected. The description must answer both "what does this skill do" and "when should I use it."

**Always write in third person.** Descriptions are injected into the system prompt — inconsistent POV breaks discovery.

**Be specific, include trigger terms.** Not "Helps with documents" — that's useless. "Extracts text and tables from PDF files, fills forms, merges documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction."

## Development Methodology

**Evaluation-driven.** Build evaluations before writing documentation. Run Claude without the skill on representative tasks, document specific failures, write test cases for those failures, establish baseline, write minimum instructions to address the gaps, iterate.

**The Claude A / Claude B pattern.** Use one Claude instance (Claude A) to help design and refine the skill. Test the skill with fresh Claude instances (Claude B) on real tasks. Observe where Claude B struggles or makes unexpected choices. Bring observations back to Claude A for refinement. This works because Claude understands both how to write agent instructions and what agents need.

**The skill authoring observation checklist:**
- Does Claude read files in an unexpected order? (Your structure isn't as intuitive as you thought)
- Does Claude fail to follow references? (Links need to be more explicit)
- Does Claude overuse one section? (That content belongs in SKILL.md)
- Does Claude never access a bundled file? (It's either unnecessary or poorly signaled)

## Key Structural Rules

- SKILL.md body: under 500 lines for optimal performance
- Description: max 1024 characters
- Name: max 64 characters, lowercase + numbers + hyphens, no reserved words (anthropic, claude)
- Reference files: all linked directly from SKILL.md, never nested beyond one level
- Reference files over 100 lines: include a table of contents at the top
- MCP tools: always use fully qualified names (`ServerName:tool_name`)
- No Windows-style paths

## Skill Types

**Instruction-only skills** — markdown with heuristics, workflows, examples. High-freedom, flexible.

**Script-based skills** — utility scripts that Claude executes rather than reads. The script handles errors; Claude doesn't have to generate code every time. More reliable, more efficient.

**Hybrid** — SKILL.md instructions point to both reference docs (read as needed) and executable scripts (run as needed).

## Anti-Patterns to Avoid

- Offering too many options without a default
- Deeply nested file references
- Assuming packages are installed
- Time-sensitive information in main content (use an "old patterns" section with details)
- Vague descriptions

## Connections to Existing Pages

- [[claude-skills]] — this is the authoritative guide for what's in that page
- [[claude-code]] — skills run within Claude Code and Cowork environments
- [[context-engineering]] — skills are applied context engineering: pre-encoded instructions that reduce per-session overhead
- [[cognitive-offloading]] — skills enable consistent offloading without repeated setup

## See Also
- [[claude-skills]]
- [[article-wizard-skill-tdd-claude]]
