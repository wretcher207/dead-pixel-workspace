---
title: "Scaling Managed Agents: Decoupling the Brain from the Hands"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [article-managed-agents-anthropic]
tags: [#ai, #agents, #anthropic, #engineering, #infrastructure]
---

# Scaling Managed Agents: Decoupling the Brain from the Hands

**Source:** Anthropic Engineering Blog — Lance Martin, Gabe Cemaj, Michael Cohen
**URL:** anthropic.com/engineering/managed-agents

## Summary

Anthropic's Managed Agents service is a hosted infrastructure layer for running long-horizon agents. The core architectural insight: decouple the **brain** (Claude + harness) from the **hands** (sandboxes and tools) and the **session** (the durable event log). Each component can fail, be replaced, or scale independently without disturbing the others.

This is explicitly modeled on operating system design — the way OS abstractions like `process` and `file` outlasted decades of hardware changes. Managed Agents creates stable interfaces that will outlast whatever specific harness Claude needs today.

## Key Claims

- **The pet problem.** Early design packed the session, harness, and sandbox into a single container. When the container failed, everything failed. There was no way to debug without access to a user's data. This is the "pet vs. cattle" problem — a named, hand-tended individual you can't afford to lose, versus interchangeable instances you can restart on demand.
- **Decoupling the brain from the hands.** The harness now calls the sandbox the same way it calls any other tool: `execute(name, input) → string`. If the container dies, the harness treats it as a tool call error and retries with a fresh container. No nursing, no manual debugging.
- **Session as external durable log.** The session log lives outside the harness. When a harness crashes, a new one boots with `wake(sessionId)`, reads the event log with `getSession(id)`, and resumes from the last event. The session log is the source of truth — not the running process.
- **Security boundary.** In the coupled design, credentials lived in the same container as Claude's generated code. A prompt injection attack could access them. Managed Agents separates credentials from the sandbox entirely: OAuth tokens live in a vault, accessed via a proxy that Claude never directly touches.
- **Performance gains from decoupling.** When the harness and container were coupled, every session paid container setup costs upfront — even sessions that never needed the sandbox. After decoupling: p50 time-to-first-token dropped ~60%, p95 dropped over 90%. Containers provision on-demand only when needed.
- **Context anxiety goes away with better models.** Claude Sonnet 4.5 showed "context anxiety" — wrapping up tasks prematurely as it sensed context limits. Anthropic added harness-level resets to compensate. Claude Opus 4.5 no longer shows this behavior. The harness assumption became dead weight. This is the recurring theme: **harnesses encode assumptions about model limitations that go stale.**
- **The session is not Claude's context window.** The session log functions as an external context object Claude can interrogate: select slices by position, rewind before a specific event, reread context before a specific action. This is distinct from compaction (which is lossy) — the full history is always recoverable.

## The Meta-Harness Principle

Managed Agents is a **meta-harness**: it doesn't prescribe what Claude needs to do, only that Claude needs the ability to manipulate state (session) and perform computation (sandbox). It makes no assumptions about the number or location of brains or hands. Claude Code is one harness that Managed Agents can run. Task-specific harnesses are another. As Claude improves, the harnesses will change — the interface layer survives.

## Questions Raised

- As models improve further, what other harness behaviors will become dead weight? What assumptions are current Claude Code users baking into their CLAUDE.md files that won't age well?
- The "many brains, many hands" architecture (brains can pass hands to one another) suggests genuinely distributed agent systems. What does that look like in practice for a solo operator?

## Connections to Existing Pages

- [[agentic-ai]] — the broader context
- [[claude-code]] — explicitly cited as an excellent harness that Managed Agents can accommodate
- [[mcp]] — MCP servers are connected via the secure proxy/vault pattern
- [[article-context-engineering-anthropic]] — compaction, note-taking, and sub-agents are the context engineering side; Managed Agents is the infrastructure side

## See Also
- [[article-context-engineering-anthropic]]
- [[context-engineering]]
- [[agentic-ai]]
