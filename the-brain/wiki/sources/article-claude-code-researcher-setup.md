---
title: "Getting Started with Claude Code: A Researcher's Setup Guide"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [self]
tags: [#claude-code, #research, #workflow, #terminal, #tools, #development, #data-analysis]
---

# Getting Started with Claude Code: A Researcher's Setup Guide

## Summary
Paul Goldsmith-Pinkham's guide positions [[claude-code]] as a terminal-based AI agent for empirical researchers and data analysts, emphasizing the shift from copy-paste coding to autonomous code execution with Claude reading your entire project. The core value proposition: vastly faster data cleaning, debugging, script generation, and iteration. The practical challenge: managing the [[context-window]] (200k tokens, filled faster than expected), requiring intentional session breaks, file-based state management, and understanding the degradation curve as context grows.

## Key Claims
- [[claude-code]] runs in your terminal with full filesystem access; can read files, write code, execute scripts, interact with entire project
- Key difference from ChatGPT: Claude Code has access to your local filesystem; can see project structure, datasets, modify scripts, run code
- Three subscription levels: Pro $20/month, Max $100/month, Max 20x $200/month (Pro already includes [[claude-code]])
- Files stay local; conversation goes through API (Anthropic doesn't persist on servers, but file contents sent as context)
- [[context-window]] is ~200k tokens; every message re-reads entire history (system prompt, messages, tool calls, outputs, thinking)
- Performance degrades as context grows; longer conversations are "token furnaces" with diminishing returns
- Five-level hierarchy of AI coding tools: (0-1) ChatGPT in browser with copy-paste, (2) IDE-based agents like Cursor, (3) [[claude-code]], (4) [[claude-code]] + [[mcp]] tools, (5) autonomous hours-long execution

## Notable Details
- Installation: npm install -g @anthropic-ai/claude-code or standalone installer for Mac/Linux/WSL
- Terminal recommendations: Ghostty (GPU-accelerated), Zellij (multiplexer with split-pane), Oh My Zsh (better shell)
- [[context-window]] auto-compacts when full; summarizes history into compressed form, but model may forget specific decisions
- Manual compaction better: type `/compact` with guidance like `/compact remember all things about nonlinear programming`
- Session degradation pattern: turn 3 much better than turn 30; after 20+ turns with code output, start fresh
- State management: write progress to files (progress.md), then start new session reading those files; full context budget available but relevant info loaded
- One developer tracked usage: 98.5% tokens spent re-reading history, only 1.5% on actual output
- Usage-based API option exists but subscriptions heavily cross-subsidized (better deal than pay-per-use)
- Ghostty brew install: `brew install ghostty`; Zellij: `brew install zellij`; Oh My Zsh: shell framework for zsh

## Questions Raised
- What's the optimal session length for different types of research tasks?
- How does [[claude-code]] compare to traditional IDE + human coding in reproducibility?
- What scaffolding (tools, prompts, fine-tuning) would eliminate the context window as a bottleneck?
- How quickly will Claude Code adoption change research workflows in empirical social science?

## Connections
- [[claude-code]] - the tool itself
- [[claude-sonnet]] - model that runs [[claude-code]]
- [[context-window]] - key technical constraint
- [[tokens]] - measurement of context
- [[agentic-ai]] - broader category
- [[mcp]] - Model Context Protocol for extending [[claude-code]] with tools
- [[cursor]] - alternative IDE-based agent
- [[anthropic]] - creator
- [[research-workflow]] - target audience
- [[terminal]] - execution environment
- [[ghostty]], [[zellij]], [[oh-my-zsh]] - supporting tools for better terminal experience