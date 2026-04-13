---
title: Claude Ecosystem
type: map
created: 2026-04-12
updated: 2026-04-12
sources: [article-what-is-claude-overview, article-6am-dispatch-parallel-workflows, article-how-i-use-claude-code, article-cowork-10-use-cases-tested, article-39-claude-skills-examples, article-best-use-cases-cowork]
tags: [#claude, #anthropic, #ecosystem, #tools, #workflow, #ai]
---

# Claude Ecosystem

A map of how [[claude]] and its siblings fit together: who makes what, what each tool does, how they relate to each other, and which one fits your workflow.

## The Model Layer

The foundation: [[claude]] itself. Built by [[anthropic]], available in tiers.

**Models:**
- **Claude Opus 4.6** — Frontier reasoning model. Complex problem-solving, long-running workflows, novel research synthesis. Best for scaffolding and planning, worst for token efficiency.
- **Claude Sonnet 4.6** — Balanced model. 80% of Opus capability at fraction of the cost. Best for most production work.
- **Claude Haiku 4** — Fast, cheap model. Good for simple tasks, edge case handling, high-volume batch work.

**Context windows:** Up to 1M tokens for enterprise (200k for standard). Can read entire codebases, long books, months of email history.

**Capabilities:** Text understanding and generation, vision (images and charts), extended thinking (reasoning-heavy tasks), artifacts (standalone output).

**Access:** Web browser (free + Pro at $20/month, Max at $200/month), API, desktop apps.

## The Tool Layer

These are where [[claude]] meets your actual work.

### [[claude-code]] (Terminal-based agent for developers)

What it does: Autonomous codebase work. Read files, run tests, write code, review PRs, debug, refactor. Access to your entire filesystem and git.

Who it's for: Developers. Anyone comfortable with terminal.

How it works: VS Code extension. `/terminal-setup` to configure. Can queue tasks and run them asynchronously. Parallel agents for repetitive work.

Pricing: Included in Max plan ($200/month).

Key features:
- GitHub PR review integration (finds bugs humans miss)
- Custom slash commands via `.claude/commands/*.md`
- Hook system for automation (format code, test before commit)
- Memory system (hierarchical CLAUDE.md files per folder)
- Large codebase support (handles 18,000+ line React components)

From [[article-how-i-use-claude-code]], it's a meaningful upgrade over Cursor for large codebases and parallel task execution.

### [[claude-cowork]] (Folder-based agent for non-developers)

What it does: Autonomous file-based workflows. Read/write files, organize folders, parallel tasks, web research, custom skills. No coding required.

Who it's for: Non-technical knowledge workers, managers, solo business operators.

How it works: Desktop app. Create a folder, define a workflow, assign a skill, queue the task. Claude works autonomously. Returns organized files, presentations, reports.

Pricing: Max plan ($200/month).

Key features:
- Folder-based projects (organize by client, project type, domain)
- Skills (saved workflows; encode your preferences once)
- Web research integration (find and synthesize information)
- File output (PowerPoints, Excel, PDFs, organized folders)
- MCP connectors (email, Slack, Linear, Notion)
- Parallel execution (dispatch five workflows, return to five deliverables)

From [[article-6am-dispatch-parallel-workflows]], the 6 AM Dispatch pattern: five tasks in five minutes, return to finished work an hour later.

### Browser Claude (Web-based chat)

What it does: Conversational AI. Fast iteration, brainstorming, one-off questions, creative thinking.

Who it's for: Everyone. Fastest to use, most accessible.

How it works: chat.claude.ai. Type and get responses. Can upload files, paste long text. Uses artifacts for standalone output.

Pricing: Free tier (limited use), Pro ($20/month, more use), Max ($200/month, highest limits).

Key differences from [[claude-code]] and [[claude-cowork]]: No filesystem access, no file output (just text), no autonomous operation, no skills.

Best for: Brainstorming, research questions, code review, writing feedback, learning. Not for workflow automation.

### Claude API

What it does: Programmatic access for developers. Build custom applications using Claude as the reasoning engine.

Who it's for: Developers building products that need AI reasoning.

How it works: REST API. Standard authentication. Token-based pricing.

Pricing: Per-token cost (Haiku cheapest, Opus most expensive).

Use cases: Chatbots, document processing systems, content generation platforms, autonomous agents, internal tools.

From [[article-what-is-claude-overview]], tokens are sold in two buckets: input tokens (what you send) and output tokens (what Claude generates). Pricing scales with model and volume.

## The Extension Layer

These augment [[claude]] capabilities.

### [[claude-skills]]

Reusable instruction sets. Encode your voice, decision framework, style, or workflow once. Apply it to every invocation.

Examples: Voice DNA (what you never do), QA + proofreading (strategy then polish), brand guidelines (auto-apply to every output), business case builder (conservative/expected/optimistic scenarios), job analyzer (compatibility scoring).

From [[article-39-claude-skills-examples]], 39 examples across writing, marketing, development, operations, career.

Best for: Consistency across batches, non-developers automating workflows, encoding business logic.

### [[MCP]] (Model Context Protocol)

Open standard for connecting Claude to external tools and services.

Current connectors: Email, Slack, GitHub, Linear, Notion, Google Drive (partial).

How it works: Claude reads from and writes to these services directly. No manual copy-paste.

Example: Draft an email in [[claude-cowork]], Claude sends it via Gmail connector, all in one flow.

From [[article-6am-dispatch-parallel-workflows]], MCP enables fire-and-forget automation: send Slack messages to team, update Linear with findings, query databases.

Broader context: This is why [[agentic-ai]] is viable. Agents need integration, MCP standardizes it.

### Plugins (Marketplace integrations)

Third-party extensions for Claude in browser and [[claude-code]].

Examples: Web search, calculator, file uploads, integrations with popular services.

Status: Smaller marketplace than ChatGPT's, but growing.

Best for: One-off capabilities without writing custom code.

### Hooks ([[claude-code]] automation)

Custom automation rules that trigger on patterns. Run before/after code changes.

Examples: Format code, run tests, lint checks, security scans.

How it works: Define in `.claude/hooks/` directory with matcher patterns ("Edit|Write" or regex).

Best for: Enforcing team standards, preventing bad commits, automating repetitive checks.

## Who Uses What

**Developers:** [[claude-code]] for deep codebase work. Browser Claude for learning and quick questions. API if building products.

**Solo business owners:** [[claude-cowork]] for workflow automation, file management, business coordination. Browser Claude for brainstorming.

**Teams:** API for custom integration, [[claude-code]] for shared codebases, [[claude-cowork]] for non-developers, browser Claude for everyone.

**Content creators:** Browser Claude for drafting, [[claude-cowork]] + skills for batch processing and consistency.

**Researchers:** Browser Claude for exploration, API for scale, [[claude-cowork]] if automating document processing.

## The Economics

Pricing structures (as of April 2026):

- **Browser Claude Pro:** $20/month (unlimited use, limited model access)
- **Browser Claude Max:** $200/month (best models, highest limits, includes [[claude-code]] and [[claude-cowork]])
- **Claude API:** Per-token cost (scales with use). Haiku cheapest (~$0.80/1M input tokens), Opus most (~$15/1M input tokens)
- **Team/Enterprise:** Custom pricing, dedicated account manager, security/compliance support

Break-even analysis (for small business):
- If you're spending 5 hours/week on mechanical work (email, organization, first drafts)
- And your hourly rate is $50+
- The $200/month Max plan breaks even in one week
- Most knowledge workers are positive ROI within 2-3 weeks

From [[article-best-use-cases-cowork]], actual case: 49 hours saved in 63 minutes at $2.60, vs. $16,313 freelancer cost.

## How They Connect

```
Anthropic (company)
│
├─ Claude (model)
│   ├─ Opus 4.6 (reasoning)
│   ├─ Sonnet 4.6 (balanced)
│   └─ Haiku 4 (fast/cheap)
│
├─ Browser Claude
│   ├─ Free/Pro/Max tiers
│   ├─ Plugins
│   └─ Artifacts
│
├─ Claude Code (for devs)
│   ├─ Skills
│   ├─ Hooks
│   └─ GitHub integration
│
├─ Claude Cowork (for non-devs)
│   ├─ Skills
│   └─ MCP connectors
│
├─ Claude API (for builders)
│   └─ Custom applications
│
└─ MCP (open standard)
    ├─ Email, Slack, GitHub, Linear, Notion...
    └─ Works across all tools
```

## Relevance to David

As a solo operator (Dead Pixel Design, Wretcher, writing):

**Daily workflow:**
- Browser Claude for brainstorming, research, code review feedback
- [[claude-code]] for development work (Dead Pixel)
- [[claude-cowork]] for business coordination (proposals, scoping, file organization)

**Skills to create:**
- Design voice (Dead Pixel aesthetic and decision-making)
- Production framework (Wretcher mixing/arrangement logic)
- Client communication (how you interface with clients)
- Writing style (voice DNA for memoir project)

**Scaling without hiring:**
- Use [[claude-cowork]] to handle proposal generation, project scoping, file organization
- Use [[claude-code]] for code review and refactoring across Dead Pixel projects
- Use skills to ensure consistency across all domains
- Use [[MCP]] (when available) to automate client communication (email) and project tracking (Linear/GitHub)

The ecosystem is designed for your use case: non-uniform work across multiple domains, solo operation, high judgment required but also high mechanical overhead.

## See Also
- [[agentic-ai]] — the capability that ties everything together
- [[claude-code]] — for developers
- [[claude-cowork]] — for non-developers
- [[claude-skills]] — reusable automation
- [[mcp]] — external integration
- [[ai-for-small-business]] — economic implications
