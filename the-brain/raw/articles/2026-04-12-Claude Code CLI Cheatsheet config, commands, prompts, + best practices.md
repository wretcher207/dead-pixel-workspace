---
title: "Claude Code CLI Cheatsheet: config, commands, prompts, + best practices"
source: "https://shipyard.build/blog/claude-code-cheat-sheet/"
author:
  - "[[Shipyard Team]]"
published: 2026-01-19
created: 2026-04-12
description: "Get leet @ Anthropic's Claude Code with this cheatsheet, including config, CLI commands, advanced features, and best practices for faster dev + test."
tags:
  - "clippings"
---
![[f4caebe9e7aa93762fcc5a892696b72d_MD5.png]]

Get leet @ Anthropic's Claude Code with this cheatsheet, including config, CLI commands, advanced features, and best practices for faster dev + test.

Claude Code is Anthropic’s agentic coding tool that lives in your terminal and for now is SOTA for coding. This cheatsheet should give you everything you need to install, config, and use Claude Code for now…

## Getting started with Claude code

If you’re brand new to Claude Code, check out [this guide](https://shipyard.build/blog/claude-code-getting-started/).

Once you have a Claude Pro or Max subscription (or are paying for API access), you can start using Claude Code from your terminal or [the web](https://claude.ai/code).

(Our advice: opt for the subscription if you’re using it consistently and at a reasonable rate. It’s worth getting API tokens if you don’t want to deal with token refresh windows).

### Installation

**Install globally:**

```bash
npm install -g @anthropic-ai/claude-code
```

**Prereqs:** Node.js 18 or newer

### Auth

Set up your Anthropic API key before launching CC.

**Get your key:** Get an API key from the [Anthropic Console](https://console.anthropic.com/).

**Set your key:** Set the `ANTHROPIC_API_KEY` env var:

```bash
export ANTHROPIC_API_KEY="YOUR_ANTHROPIC_API_KEY"
```

Alternatively, if you have a Pro or Max plan, you’ll have the option to auth via your browser.

Add this to your shell profile (e.g., `~/.bashrc`, `~/.zshrc`) to persist across sessions.

### Basic usage

**Interactive mode (REPL):** Start a conversational coding session.

```bash
claude
```

**REPL with initial prompt:** Start with a specific question.

```bash
claude "explain this project"
```

**Print mode:** Query once and exit (great for scripting).

```bash
claude -p "explain this function"
```

**Piping content:** Process piped input.

```bash
cat logs.txt | claude -p "explain these errors"
```

**Continue recent conversation:**

```bash
claude -c
```

**Resume specific session:**

```bash
claude -r "session-id" "continue working on this feature"
```

## Config

You’re able to write (or generate) files to configure CC’s basic behaviors.

### Models

Claude Code plans all grant you access to the three latest Claude models: Sonnet 4.5, Haiku 4.5, and Opus 4.5. Quick overview:

- Sonnet 4.5: if you’re on a Pro or Max5 plan, this is the best model to default to. Strong results for most straightforward prompts
- Haiku 4.5: use this to save tokens (and get faster results) on easier tasks
- Opus 4.5: SOTA model, use sparingly with Pro or Max5 for multi-step planning or complex coding tasks, use as default with Max20

To change your model to one of these three, use the `/model` slash command.

To use a different Claude model, you can specify the model string with a flag:

```sh
claude --model claude-3-5-haiku-20241022
```

### Settings files

Claude Code uses hierarchical settings stored in JSON files:

- **User settings:** `~/.claude/settings.json` (applies to all projects)
- **Project settings:** `.claude/settings.json` (shared with team, checked into git)
- **Local project settings:** `.claude/settings.local.json` (personal, ignored by git)

**Example settings.json:**

```json
{
  "model": "claude-sonnet-4-20250514",
  "maxTokens": 4096,
  "permissions": {
    "allowedTools": ["Read", "Write", "Bash(git *)"],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Write(./production.config.*)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "python -m black $file"
          }
        ]
      }
    ]
  }
}
```

### Memory files (CLAUDE.md)

Use `CLAUDE.md` files to give context and instructions to Claude. They save time + tokens, and are super helpful for info you’d otherwise include in your prompts. These are loaded hierarchically:

- **Global:** `~/.claude/CLAUDE.md` (applies to all projects)
- **Project root:** `./CLAUDE.md` (project-wide context)
- **Subdirectories:** Component-specific instructions

**Example CLAUDE.md:**

```markdown
# Project context

## Coding standards
- Use TypeScript for all new code
- Follow existing ESLint configuration
- Write tests for all new functions using Jest
- Use functional components with hooks in React

## Architecture
- Frontend: Next.js with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL with Prisma
- State: Zustand for client state

## File organization
- Components in \`src/components/\`
- Utilities in \`src/utils/\`
- Tests alongside source files with \`.test.ts\` extension
```

## CLI commands + flags

You can use the following shell commands outside a Claude session.

### Core commands

| Command | Description | Example |
| --- | --- | --- |
| `claude` | Start interactive REPL | `claude` |
| `claude "query"` | Start REPL with initial prompt | `claude "explain this project"` |
| `claude -p "query"` | Query via print mode, then exit | `claude -p "review this code"` |
| `claude -c` | Continue most recent conversation | `claude -c` |
| `claude -c -p "query"` | Continue in print mode | `claude -c -p "run the tests"` |
| `claude -r "id" "query"` | Resume session by ID | `claude -r "abc123" "finish the PR"` |
| `claude update` | Update to latest version | `claude update` |
| `claude mcp` | Configure MCP servers | `claude mcp add server-name` |

### CLI flags

| Flag | Description | Example |
| --- | --- | --- |
| `--add-dir` | Add additional working directories | `claude --add-dir ../apps ../lib` |
| `--allowedTools` | Allow specific tools without prompting | `claude --allowedTools "Write" "Bash(git *)"` |
| `--disallowedTools` | Block specific tools | `claude --disallowedTools "Bash(rm *)"` |
| `--model` | Use specific Claude model | `claude --model claude-opus-4` |
| `--max-turns` | Limit conversation turns | `claude -p --max-turns 3 "query"` |
| `--output-format` | Set output format (text/json/stream-json) | `claude -p --output-format json "query"` |
| `--input-format` | Set input format | `claude -p --input-format stream-json` |
| `--verbose` | Enable verbose logging | `claude --verbose` |
| `--continue` | Continue most recent conversation | `claude --continue` |
| `--resume` | Resume specific session | `claude --resume abc123` |
| `--dangerously-skip-permissions` | Skip all permission prompts (proceed with caution) | `claude --dangerously-skip-permissions` |

## Interactive session commands

You can use these slash commands *during* a Claude Code session.

### Built-in slash commands

| Command | Description |
| --- | --- |
| `/help` | Show all commands + custom slash commands |
| `/config` | Configure Claude Code settings interactively |
| `/allowed-tools` | Configure tool permissions interactively |
| `/hooks` | Configure hooks |
| `/mcp` | Manage MCP servers |
| `/agents` | Manage subagents (create, edit, list) |
| `/vim` | Enable vim-style editing mode |
| `/terminal-setup` | Install terminal shortcuts (Shift+Enter for iTerm2/VS Code) |
| `/install-github-app` | Set up GitHub Actions integration |

**Note:** The `/help` command shows all available slash commands, including your custom commands from `.claude/commands/` and `~/.claude/commands/` directories, as well as any commands you have from connected MCP servers.

### File and directory references (@)

You can reference files or directories in your prompts. (If you don’t have an exact filename/location, CC can grep for it).

**Single file:**

```bash
> Review this component for accessibility issues. @./src/components/Button.tsx
```

**Directory (recursive):**

```bash
> Add comprehensive error handling to all API routes. @./src/api/
```

**Multiple files:**

```bash
> Compare these two implementations. @./src/old.js @./src/new.js
```

**Glob patterns:**

```bash
> Review all test files for completeness. @./src/**/*.test.ts
```

### Shell commands (!)

You can run shell commands directly in a Claude session. Use the `!` to bypass Claude’s conversational mode, which will use more tokens to get the same result:

**Single command:**

```bash
> !npm test
```

**Shell mode toggle:**

```bash
> !
# Now in shell mode. type ! again to exit
```

## Advanced features

We appreciate how customizable CC is, and it’s quite easy to extend it with a few features like custom commands, hooks, MCP, and stored prompts.

### Custom slash commands

You can create your own CC slash commands. This is a good “shortcut” for pulling up a common prompt. Again, the more context the better (but also keep these abstract so they can be widely applied). Define them in Markdown files:

**Project commands** (`.claude/commands/`):

```bash
# Create a project-specific command
mkdir -p .claude/commands
echo "Analyze this code for performance issues and suggest optimizations:" > .claude/commands/optimize.md
```

**Personal commands** (`~/.claude/commands/`):

```bash
# Create a personal command for all projects
mkdir -p ~/.claude/commands
echo "Review this code for security vulnerabilities:" > ~/.claude/commands/security.md
```

**Commands with arguments:**

```bash
# Create parameterized command
echo 'Fix issue #$ARGUMENTS following our coding standards' > .claude/commands/fix-issue.md

# Use that command in a Claude session
> /fix-issue 123
```

**Advanced command with context:**

```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit with context
---
## Context
- Current status: !\`git status\`
- Current diff: !\`git diff HEAD\`
- Current branch: !\`git branch --show-current\`

Create a meaningful commit message based on the changes above.
```

### Hooks for automation

Hooks run shell commands automatically after specific prompts/events:

**Example: Auto-format Python files**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command", 
            "command": "python -m black \"$file\""
          }
        ]
      }
    ]
  }
}
```

**Hook events:**

- `PreToolUse`: Before tool execution (can block)
- `PostToolUse`: After tool execution
- `UserPromptSubmit`: Before processing user input
- `SessionStart`: At session startup

### Model Context Protocol (MCP)

You can extend what Claude Code can do by adding MCP servers:

**Add MCP server:**

```bash
claude mcp add my-server -e API_KEY=123 -- /path/to/server arg1 arg2
```

(Check your MCP tool’s docs to get the right syntax here.)

**Common MCP use cases:**

- Connect to Google Drive for design docs
- Integrate with Jira for ticket management
- Add custom dev tooling
- Access external databases

### Skills

Skills are markdown-based guides that teach Claude Code how to handle specific tasks. Unlike slash commands, skills are invoked via natural language, so Claude decides when to use them.

**Create a skill:**

```bash
# add a blank skill to your project
mkdir -p .claude/skills/new-skill
```

Within that directory, create a `SKILL.md` file:

```markdown
---
name: add-numbers
description: Add numbers from natural language input
---

# Add Numbers Skill

When the user asks you to add, sum, or total numbers:
1. Extract all numeric values from the prompt
2. Calculate the sum using \`add.py\`
3. Return the result with a brief explanation

Example: "add 15, 27, and 8" → "The sum is 50 (15 + 27 + 8)"
```

Claude will automatically reference the skill’s instructions, scripts, and templates. Check out [Anthropic’s official skills](https://github.com/anthropics/skills) for pdf, docx, pptx, xlsx, and more.

### Subagents

Subagents are specialized Claude instances with their own context windows and personas. Use them for domain-specific tasks (code review, debugging, architecture) to get better results and save tokens.

**Create a subagent:**

```bash
> /agents
# Follow prompts to define name, description, model, and persona
```

**Subagent config (`.claude/agents/reviewer.md`):**

```markdown
---
name: reviewer
description: Use for thorough code reviews
model: sonnet
color: orange
---

You are an expert code reviewer. Focus on security, performance, and maintainability.
```

Claude will invoke subagents when tasks match their descriptions.

### Extended thinking

Extended thinking is enabled by default. It lets Claude reason through complex problems before writing code/responding.

**Toggle thinking:**

- **During session:** `Option+T` (macOS) or `Alt+T` (Windows/Linux)
- **Set default:** Use `/config` to toggle globally (saves to `~/.claude/settings.json`)

**View thinking output:**

Press `Ctrl+O` to enable verbose mode so you can see Claude’s reasoning

**Limit token budget:**

```bash
export MAX_THINKING_TOKENS=10000
```

**Note:** You’re charged for thinking tokens. Phrases like “think harder” in your prompt don’t allocate additional tokens, so use the toggle instead.

### Conversation management

**Continue recent work:**

```bash
claude --continue
claude --continue --print "show me our progress"
```

**Resume specific session:**

```bash
claude --resume  # Shows picker
claude --resume session-id
```

**Save and restore context:** All CC conversations are auto-saved with full message history and tool state.

## Common workflows

Here are a few different tasks that CC can help with. Remember, the more context, the better, so if you can provide specifics around your ask, Claude will give better results (and you’ll have fewer things to correct).

### Code analysis

```txt
> Analyze this codebase structure and suggest improvements. @./src/
```

### Feature development

```txt
> Implement a user auth system with JWT tokens and password hashing
```

### Bug fixing

```txt
> Debug this error: "TypeError: Cannot read property 'id' of undefined" @./src/user-service.js
```

### Code review

```txt
> Review this pull request for potential issues, performance problems, and adherence to our coding standards. @./src/
```

### Testing

```txt
> Generate comprehensive unit tests for this utility module. @./src/utils/validation.js
```

### Refactoring

```txt
> Refactor this class to use dependency injection and make it more testable. @./src/services/EmailService.js
```

### Docs

```txt
> Generate API docs for all endpoints in this directory. @./src/routes/
```

### CI/CD integration

```bash
# In GitHub Actions or other CI
claude -p "If there are any linting errors, fix them and suggest a commit message"
```

## Security + permissions

Claude Code defaults to asking permission for every single action it takes. If you trust it for a certain type of action (e.g. fetching links, reading files), you can grant it wider permissions. Most devs approve actions individually.

### Permission system

Claude Code lets you grant permissions as you see fit:

**Tool permissions:**

- `Read`: File reading operations
- `Write`: File writing/modification
- `Bash`: Shell command execution
- `MCP tools`: External integrations

**Configuration examples:**

```json
{
  "permissions": {
    "allowedTools": [
      "Read",
      "Write(src/**)",
      "Bash(git *)",
      "Bash(npm *)"
    ],
    "deny": [
      "Read(.env*)",
      "Write(production.config.*)",
      "Bash(rm *)",
      "Bash(sudo *)"
    ]
  }
}
```

### Best practices

As with anything in dev, keep an eye on what permissions you’re granting, and watch which shell commands are being run. Also:

- ALWAYS review changes before accepting
- Use `.claude/settings.local.json` for personal/sensitive settings
- Configure tool permissions for your env; verify everything (don’t use YOLO mode unless you’ve put the proper safeguards in place)
- Use hooks for auto code formatting/validation
- Keep sensitive data in `.env` files; deny CC permission to these

## Understanding Claude’s session model

If you want to best plan out your Claude sessions, you’ll want to understand your constraints. Claude’s tokens are granted by plan based on overall server load, so on busier days you’ll get fewer.

If you’re not using the API for pay-as-you-go Claude access, you’ll want to choose the Claude tier that works best for you.

- **Pro:** for a medium-high coding workload. Expect to use continuously for smaller code changes, and as a supplement to your own coding. Limited Opus access. $20/month
- **Max5:** for an intense coding workload. 5x the token allowance of Pro. Opus access. $100/month
- **Max20:** for near-autonomous, nonstop, heavy development workloads with multiple sessions/agents. Significantly larger context window. 20x the token allowance of Pro. Opus access. $200/month

Sessions kick off as soon as you send your first message, and last five hours. If you’re using Opus, you’ll burn through tokens much faster.

It’s most token-efficient (and guarantees better outputs) if you start different sessions for different tasks.

[Here’s how you can track your token spend.](https://shipyard.build/blog/claude-code-track-usage/)

---

**Extra resources**

- Claude has built-in access to its own docs: you can ask questions about features directly
- Check out the [official docs](https://docs.anthropic.com/en/docs/claude-code)
- Use `/help` in your Claude session
- Extend CC with these [recipes](https://github.com/sgharlow/claude-code-recipes?tab=readme-ov-file)

*Need to take CC to the next level? Give your AI agents ephemeral environments where they can deploy code, pull logs, and fix bugs autonomously. [Try Shipyard free for 30 days](https://shipyard.build/signup).*

![[4b4307c09739b7c8e6227f6223c89def_MD5.png]]

### Try Shipyard today

Get isolated, full-stack ephemeral environments on every PR.

[Try Free](https://shipyard.build/signup)[Use Docker Sandboxes to isolate your Claude Code session from your system, so you can more safely skip permissions with autonomous tasks.](https://shipyard.build/blog/docker-sandboxes-claude-code/)

Hear about the latest and greatest in cloud native, agents, engineering, and more when you sign up for our monthly newsletter.

<iframe src="chrome-extension://cnjifjpddelmedmihgijeibhnjfabmlf/side-panel.html?context=iframe"></iframe>