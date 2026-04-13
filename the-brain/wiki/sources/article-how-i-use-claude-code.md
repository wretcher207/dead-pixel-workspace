---
title: How I use Claude Code (+ my best tips)
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [self]
tags: [#claude-code, #tools, #workflow, #development]
---

# How I use Claude Code (+ my best tips)

## Summary
Steve Sewell, former Cursor power user and author of the widely-referenced Cursor tips guide, switched entirely to [[claude-code]] weeks ago and details his workflow, practical tips, and the fundamental shift in how he works. The terminal interface, permission system quirks, GitHub integration, and parallel agent execution represent a meaningful upgrade over Cursor's agents for handling large codebases and complex tasks.

## Key Claims
- The VS Code extension makes launching Claude Code dead simple and enables parallel instances across different codebase sections
- The permission system (`claude --dangerously-skip-permissions`) is annoying but essential for productive workflow
- GitHub PR review integration finds bugs humans miss, though output needs customization to be non-verbose
- Claude Code handles 18,000-line React components where other agents consistently fail
- The terminal UI includes helpful features like `/clear` to manage context, up-arrow navigation, and queuing
- Parallel agents dramatically exceed sequential processing for repetitive tasks
- Hooks and custom slash commands enable reusable workflows; memory system allows hierarchical CLAUDE.md files
- Pricing ($100/month max plan) makes economic sense compared to human engineering labor
- Message queuing lets users batch tasks and let Claude work independently

## Notable Details
- Use `/terminal-setup` to enable Shift+Enter for newlines
- Drag files with Shift held to reference them properly
- Use Control+V (not Command+V) for pasting images
- Press Escape to stop Claude, double Escape to jump to previous messages
- Hooks support matcher patterns like "Edit|Write" or regex
- Custom slash commands stored in `.claude/commands/*.md` with `$ARGUMENTS` placeholder
- Claude Code works exceptionally well with complex tasks and large codebases; rarely gets stuck
- Builder.io's Fusion interface provides visual alternative for teams without terminal comfort

## Questions Raised
- How does the permission system trade-off safety for usability in production environments?
- What are the actual risks of `--dangerously-skip-permissions` in real-world development?
- Can hook systems scale to enterprise codebases with hundreds of custom rules?

## Connections
- [[claude-code]] — the core tool being evaluated
- [[anthropic]] — maker of Claude
- [[cursor]] — direct competitor mentioned throughout
- [[development-workflows]] — broader category this enables
- [[custom-hooks]] — Claude Code feature for automation
- [[github-integration]] — PR review automation
