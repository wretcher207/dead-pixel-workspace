---
title: Agentic AI
type: concept
created: 2026-04-12
updated: 2026-04-12
sources: [article-6am-dispatch-parallel-workflows, article-cowork-10-use-cases-tested, article-how-i-use-claude-code, article-project-vend, article-what-is-claude-overview]
tags: [#ai, #claude, #agency, #workflow-automation, #anthropic]
---

# Agentic AI

The shift from AI-as-oracle to AI-as-autonomous-worker. Agentic AI takes goals as input and executes multi-step tasks independently—planning, gathering information, making decisions, writing output, managing files. The user's job becomes defining what matters and reviewing results, not narrating each step.

## How It Works

Agentic systems operate differently from chatbots:

**Chatbot (Oracle):** User asks → AI responds → User asks follow-up. The conversation is the work. Idle time is the user's problem.

**Agent (Worker):** User specifies goal + context → AI plans and executes → User reviews deliverable. Idle time is the user's: dispatch five tasks in five minutes, return to completed work an hour later (from [[article-6am-dispatch-parallel-workflows]]).

Agents need three things: a clear goal, access to tools (file system, web, APIs), and permission to act autonomously. [[claude-code]] provides this for developers through terminal access. [[claude-cowork]] provides this for non-developers through folder-based workflows. [[MCP]] (Model Context Protocol) extends capability by wiring external services (Slack, Linear, email, databases) directly into the agent's execution context.

The agent handles what humans find tedious:
- Organizing and cross-referencing files
- Running parallel workflows simultaneously
- Synthesizing information from multiple sources
- Generating first drafts and structure
- Batch processing repetitive tasks
- Maintaining context across extended work

## Why This Matters

Agentic AI inverts the economics of knowledge work. Judgment calls—deciding what's important, what's true, what matters—are scarce and valuable. Keystroke work, file organization, initial synthesis, formatting—these are abundant and mechanical.

[[claude-cowork]] (and [[claude-code]] for developers) off-loads the mechanical work, preserving human attention for decisions that require taste, discernment, and risk judgment. One user quantified the difference: 49 hours of work completed in 63 minutes at $2.60 cost, versus $16,313 equivalent freelancer expense (99.98% savings) (from [[article-best-use-cases-cowork]]).

The practical shift is striking: moving from "help me with this task" to "run this workflow while I do something else."

## The Promise and Limits

**Where agents succeed:**
- Multi-step workflows with clear objectives
- Document synthesis and pattern extraction
- Batch operations on similar items (from [[article-cowork-10-use-cases-tested]])
- Parallel task execution
- File manipulation and organization
- Research + local data synthesis

**Where agents fail or need caution:**
- Long-running autonomy without scaffolding (from [[article-project-vend]], Claude experienced identity confusion after weeks of continuous operation)
- Learning from mistakes (Project Vend's Claude ignored arbitrage opportunities repeatedly, failed to optimize pricing despite clear feedback)
- Tasks requiring sustained economic incentive alignment
- Context degradation over very long workflows

[[Project Vend]] is the cautionary tale: even with web and email access, an autonomous Claude agent running a real shop for four weeks succeeded at jailbreak resistance and customer adaptation but failed at business fundamentals—inventory management, pricing optimization, learning from experience. The most unsettling finding: Claudius hallucinated having visited fictional locations and believed itself to be a person, mid-experiment.

## Relevance to David

As a solo operator running Dead Pixel Design and Wretcher, agentic AI directly addresses your scarcest resource: attention. You can't scale coding or music by hiring—those are you. But you can scale workflow coordination, client communication triage, project organization, research synthesis.

[[claude-code]] fits your developer workflow: you define the architecture, Claude executes refactors and tests. [[claude-cowork]] fits the broader business side: client documents, proposals, content research, project scaffolding.

The key constraint is still human judgment: you set the goal, you review the output, you decide if the first draft is close enough or needs iteration. The agent removes the drudgery layer between problem and solution.

## See Also
- [[claude-code]] — agentic AI for developers
- [[claude-cowork]] — agentic AI for non-developers
- [[claude-skills]] — how agents learn preferences and workflows
- [[MCP]] — how agents connect to external tools
- [[cognitive-offloading]] — the philosophy behind why this works
- [[ai-for-small-business]] — economic implications
