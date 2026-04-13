---
title: Claude Code
type: entity
created: 2026-04-12
updated: 2026-04-12
sources: [article-claude-code-everything-guide, article-what-is-claude-overview, article-how-i-use-claude-code, article-wizard-skill-tdd-claude, article-claudemd-prompt-optimization, article-context-engineering-anthropic, article-managed-agents-anthropic]
tags: [#claude-code, #tools, #development, #agentic-ai, #workflow]
---

# Claude Code

Terminal-based agentic coding tool from [[anthropic]]. Enables developers to work alongside Claude as an autonomous agent capable of running commands, reading/writing files, and managing workflows. Distinguishes itself from generic chat interfaces through integrated system access and stateful memory.

## How It Works

**User interaction model:**
- Developer provides goal or task
- Claude develops plan and asks clarifying questions
- Claude executes autonomously with real-time transparency
- User pauses to review, ask questions, or redirect
- Claude delivers finished code/solutions rather than drafts

**Technical capabilities:**
- Direct terminal access (run shell commands)
- File system manipulation (read, write, delete, organize)
- Working memory via files (persistent context across sessions)
- Real-time stdout visibility (see what's happening)

## Core Features

### Slash Commands
Extensible shortcuts for common workflows. Stored in `.claude/commands/` directory. Enable reusable patterns without requiring traditional scripting.

### Hooks
Execution triggers at lifecycle points:
- PreToolUse — before Claude calls a tool
- PostToolUse — after tool completion
- Notification — for event handling
- Stop — cleanup and wrap-up

Allow automation and cross-tool orchestration without explicit user invocation.

### MCP (Model Context Protocol) Servers
Enable Claude Code to connect to external systems and data sources:
- Database queries
- API integrations
- Cloud services
- Custom tools
- 8,000+ integrations available

(from [[article-claude-code-everything-guide]])

## Prompt Engineering for Agentic Contexts

Different from conversational chat. Requires:
- Clear goal specification (what success looks like)
- Scaffolding (step-by-step structure or intermediate milestones)
- Explicit memory management (when to save state, what to remember)
- Permission boundaries (what Claude can/cannot delete or overwrite)

(from [[article-claude-code-everything-guide]])

## Workflow Integration

**Setup strategies:**
- Clean, intentional configuration prevents friction during development
- Obsidian recommended for reading/navigating documentation
- Step-by-step tutorials for hands-on learning
- Real-world examples demonstrate patterns beyond toy projects

**Automation patterns:**
- Multi-tool orchestration (combine with other systems)
- CI/CD integration
- Local development enhancement
- Research and analysis workflows

(from [[article-claude-code-everything-guide]])

## Why It Matters

Differs fundamentally from generic AI tools:
- Not a chat interface; a development partner
- Terminal + file system access = can actually build
- Persistent memory = learns from session to session
- Real-time transparency = can see reasoning and debug failures
- Extensible = integrate with existing workflows and tools

Enables non-developers and junior developers to ship code faster. Enables experienced developers to offload boilerplate, testing, refactoring, and knowledge work.

## Use Cases

- Full-stack web development
- DevOps and infrastructure
- Data analysis and processing
- Automation and scripting
- Code review and refactoring
- Research and exploration
- Testing and quality assurance

## Relevance to David

Claude Code is David's primary development tool. Taught himself web development using it. Uses it daily for Dead Pixel Design client work. Key advantage: can work at scale (large codebases, complex logic) while maintaining transparency and control. Terminal access + file management enable audio engineering workflows (batch processing, file organization, integration with Reaper via automation).

## Advanced Practices (Updated 2026-04-12)

New source material adds significant depth to best practices:

**Context engineering over prompt engineering.** CLAUDE.md files are the primary context engineering lever for Claude Code. The right CLAUDE.md: clear enough to guide behavior, flexible enough to let the model reason. Avoid over-prescribing — brittle files that hardcode every edge case become maintenance debt. (from [[context-engineering]], [[article-context-engineering-anthropic]])

**CLAUDE.md is measurably important.** Arize's Prompt Learning experiment showed 5–11% improvement in coding benchmark performance from CLAUDE.md optimization alone — no model changes, no tool changes. Developers working on a single codebase daily can "train" their CLAUDE.md to the specific repo's patterns and get substantially better output. (from [[article-claudemd-prompt-optimization]])

**Default behavior is "junior mode."** Claude Code reads the task, opens a file, starts typing — the junior developer pattern. Senior developer pattern: read the task, read surrounding code, check tests, verify method existence, *then* type. The /wizard skill enforces this as a structured 8-phase methodology. (from [[article-wizard-skill-tdd-claude]])

**Task splitting is the highest-leverage habit change.** Single-goal prompts dramatically outperform multi-goal prompts. Don't ask for a CRM with auth, database, API, dashboard, email, and deploy in one prompt. Break it up. Commit frequently. (from [[claude-code-workflow]])

**Plan mode before complex changes.** In Claude Code, switching to plan mode before a significant task forces Claude to outline its entire approach before touching anything. Fewer regressions, less back-and-forth.

**Parallel agents are underused.** While one agent is building, spin up a second to research your audience, a third to run tests. Claude Code supports multiple simultaneous sessions on the same project.

**The harness assumptions problem.** Anthropic's infrastructure team found that Claude Sonnet 4.5 showed "context anxiety" — premature task termination near context limits. They added harness resets to compensate. Claude Opus 4.5 no longer shows this behavior. The resets became dead weight. Lesson: CLAUDE.md instructions designed around a model's limitations may become counter-productive as models improve. (from [[article-managed-agents-anthropic]])

## See Also
- [[claude]]
- [[anthropic]]
- [[mcp]]
- [[claude-code-workflow]]
- [[context-engineering]]
- [[prompt-engineering]]
- [[claude-skills]]
- [[claude-cowork]]
