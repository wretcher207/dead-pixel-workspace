---
title: Model Context Protocol (MCP)
type: concept
created: 2026-04-12
updated: 2026-04-12
sources: [article-6am-dispatch-parallel-workflows, article-cowork-10-use-cases-tested, article-what-is-claude-overview]
tags: [#mcp, #api, #integration, #anthropic, #tools, #claude]
---

# Model Context Protocol (MCP)

MCP is the bridge between Claude and external tools and services. It's an open standard that lets Claude read from and write to APIs—email, Slack, GitHub, Linear, databases, clinical systems—without the user having to manually copy-paste between windows.

## How It Works

MCP is a protocol, not a product. Anthropic released it as an open standard so that tool builders and service providers can write connectors once and Claude (and other models) can use them without custom integration work.

**Traditional flow (manual):**
1. User opens email in one window
2. User reads message
3. User switches to Claude in another window
4. User copy-pastes message content
5. Claude analyzes
6. User manually executes action in original service

**MCP flow (automated):**
1. Claude reads email directly through MCP connector
2. Claude drafts response
3. Claude sends via same connector
4. All happens in one flow; user sees final result

Technically: MCP connectors expose tools (functions the model can call) and resources (data the model can read). The model can invoke tools like "send_slack_message" or "search_jira_issues" as naturally as asking Claude a question.

## Why It Matters

[[agentic-ai]] only works when agents have direct access to the systems they need. Before MCP, that meant custom API integrations for every Claude deployment. MCP standardizes it: one connector serves Claude in the browser, Claude Code, Claude Cowork, Claude API—anywhere Claude runs.

The practical result: [[claude-cowork]] users can dispatch workflows that automatically:
- Send Slack messages to team members (from [[article-6am-dispatch-parallel-workflows]])
- Update Linear issues with research findings
- Query clinical databases and hospital systems (from [[article-6am-dispatch-parallel-workflows]], orthopedic surgeon use case)
- Manage Google Workspace (though still in development)
- Create Notion pages with structured data

This removes the manual handoff layer: Claude can be the middleman coordinating across your tools, not just an advice oracle.

## Current State

**Available connectors:**
- Email (Gmail, Outlook)
- Slack
- GitHub
- Linear
- Notion
- Google Drive (partial)
- Hospital EMR systems (custom in high-security environments)

**In development:**
- Google Workspace deeper integration
- Salesforce
- Stripe / payment systems
- Database connectors (PostgreSQL, etc.)

**Limitation:** MCP connectors require the service to have published a connector. Not every service has one yet. But the ecosystem is expanding fast because the standard is open—anyone can build a connector.

## Relevance to David

For Dead Pixel Design, MCP connectors enable:
- Client communication workflows (read/respond to email automatically)
- Project tracking (Claude updates Linear with research findings, design decisions)
- Slack integration (async status updates, approvals)
- GitHub automation (PR reviews, code discussions without manual copying)

The gain is focus: instead of managing three windows and copying between them, you define a workflow and Claude orchestrates it. Your attention goes to creative and judgment decisions, not tool-switching.

## See Also
- [[agentic-ai]] — the parent concept; agents need integration
- [[claude-cowork]] — uses MCP for workflow automation
- [[claude-code]] — GitHub integration via MCP
- [[claude-skills]] — often encode MCP tool usage patterns
- [[claude-ecosystem]] — broader positioning in the stack
