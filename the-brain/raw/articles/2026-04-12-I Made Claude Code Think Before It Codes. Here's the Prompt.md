---
title: "I Made Claude Code Think Before It Codes. Here's the Prompt."
source: "https://dev.to/_vjk/i-made-claude-code-think-before-it-codes-heres-the-prompt-bf"
author:
published: 2026-03-10
created: 2026-04-12
description: "Claude Code is the fastest coder I've ever worked with. It can scaffold a feature, write tests, and... Tagged with claudecode, ai, tdd, productivity."
tags:
  - "clippings"
---
Claude Code is the fastest coder I've ever worked with. It can scaffold a feature, write tests, and open a PR in minutes. But I kept running into the same problem: the code *worked*, and then it *didn't*.

A race condition in a status transition. A hard-coded string that should have been a constant. A transaction that rolled back an audit record it was supposed to keep. Tests that asserted `true` instead of asserting the *right* value.

The fixes were always fast too. But each fix came with a side quest: the incident, the regression, the "why didn't we catch this?" retro. The velocity was high. The *net* velocity, after accounting for the bugs, wasn't.

And even with a decent `CLAUDE.md`, I was still babysitting every session. Please don't forget TDD this time. Hey, you forgot to check Bug Bot. Can you actually run the tests before opening the PR? Each prompt felt like a conversation with someone extremely talented who also had the short-term memory of a goldfish. The problem wasn't Claude's ability. It was that good habits written down somewhere in a markdown file don't automatically become *practiced* habits. I was the process. Which meant the process was inconsistent, forgetful, and increasingly annoyed at itself.

So I tried something different. Instead of fixing Claude's output, I changed how Claude *thinks*.

## The problem isn't intelligence. It's process.

Watch a junior developer work: they read the ticket, open the file, start typing. They're fast. They're also the ones who forget to check if the method they're calling actually exists, or whether the database column they're referencing was renamed three weeks ago. (It was renamed three weeks ago. It's always three weeks ago.)

Now watch a senior developer: they read the ticket, read the code around it, read the tests, check the git history, *then* start typing. They're slower to start but faster to finish, because they don't have to go back and fix what they broke.

Claude Code defaults to junior mode. Not because it lacks knowledge, but because it lacks *process*. It has no internal checklist telling it to verify assumptions, write tests first, or think about what happens when two requests hit the same endpoint at the same time. It's enthusiastic. It ships. And enthusiasm, it turns out, does not catch nullable datetime crashes.

I built that checklist.

## Introducing /wizard

`/wizard` is a Claude Code skill, a markdown file that lives in your project and activates when you type `/wizard` in the CLI. It transforms Claude from a fast coder into a methodical software architect. Think of it as the senior engineer looking over Claude's shoulder, except this one never asks if you've tried turning it off and on again.

It's an 8-phase methodology, and it works best with a few things already in place: a `CLAUDE.md` defining your project conventions, a GitHub issue created before work begins (`/wizard` can help you write one), a real commitment to TDD, and a clean feature branch per task. For CI, I use GitHub Actions, but the skill doesn't care. It just needs something to respond to in Phase 8. More on that shortly.

Here's how the 8 phases work.

### Phase 1: Plan before you touch anything

Claude reads your `CLAUDE.md`, finds the linked GitHub issue, and builds a structured todo list before a single line of code is written. It assesses complexity: how many files are likely affected, whether there's architectural impact, how much could go wrong. Then it sizes the work accordingly.

This sounds obvious. It is obvious. It's also the step that gets skipped most often when you're in a hurry, which is exactly when you need it most. Funny how that works.

### Phase 2: Explore before you assume

With a plan in place, Claude explores the actual codebase. It greps for every model, method, relationship, and constant it intends to use and verifies they exist before referencing them in code.

Without this phase, Claude might confidently call `user.clientProfile.accounts`, a relationship chain it hallucinated with complete conviction. Phase 2 exists specifically to prevent that. This one change alone eliminated an entire class of bugs in my project. Turns out "does this actually exist" is a pretty good question to ask before you build on top of it.

### Phase 3: Write the tests first

Phase 3 enforces TDD. Claude writes failing tests, runs them (they must fail), implements the minimum code to make them pass, then verifies. In that order, every time, no shortcuts.

But here's the key part: it uses a **mutation testing mindset**. Instead of `assert($result)`, it writes `assertEquals('completed', $result->status)`. Instead of checking that a function runs without errors, it checks that *every* side effect actually happened: the timestamp was set, the notification was sent, the counter was incremented.

The difference matters. `assert(true)` passes if the code does nothing. Mutation-resistant assertions catch real bugs. Your test suite should be a skeptic, not the friend who tells you your PR looks great without reading it.

### Phase 4: Implement the minimum

With failing tests in place, Claude writes the implementation. Not the full vision, not the clever abstraction it already has in mind, just the minimum code required to make the tests pass. Scope creep is a bug too, and it's the most expensive kind because it looks like progress.

### Phase 5: Verify nothing regressed

Phase 5 runs the broader test suite, not just the new tests. The goal is zero regressions. If something unrelated broke, better to find out now than in a PR review comment that says "uh, why is the billing module failing?"

### Phase 6: Document while the context is fresh

Inline comments, changelog entries, anything that needs updating. Small step, easy to skip, always worth doing before the context evaporates. The next person reading this code might be you in three months, staring at it with absolutely no memory of why you made that decision.

### Phase 7: The adversarial review

This is where `/wizard` earns its keep. Before every commit, Claude reviews its own work not as the author, but as an attacker. The checklist:

- What happens if this runs twice concurrently?
- What if the input is null? Empty? Negative?
- What assumptions am I making that could be wrong?
- Would I be embarrassed if this broke in production?

This isn't theoretical. In my codebase, this phase caught:

- A status transition service that lacked database locking. Two concurrent API calls could apply conflicting transitions. A race condition, just sitting there quietly, waiting for a bad day.
- A Blade template calling `->format()` on a nullable datetime. A crash on any page load where the field was null. Completely silent until it wasn't.
- Notification payloads using hard-coded category strings instead of the enum that was *literally created in the same PR*. Breathtaking, really.

None of these would have been caught by tests alone. They required thinking about the code in a different mode: as an attacker, not an author.

### Phase 8: The quality gate cycle

Phase 8 handles the PR lifecycle. `/wizard` doesn't just open the PR and consider its job done. It monitors the automated review bot status (Bug Bot, CodeRabbit, whatever you have), reads every finding, fixes valid issues, replies to false positives, and repeats until the status is clean.

This is the phase I used to do manually and frequently forgot, leaving PRs sitting with unresolved bot findings for days. Now it's part of the process, which is exactly where it should have been all along.

## A real example

Here's what all 8 phases look like on a real task: implementing ACAT transfer status tracking with notifications.

**Phase 1**: Claude reads `CLAUDE.md`, finds the GitHub issue, assesses the task as "Complex" (7+ files, architectural impact), and builds a todo list.

**Phase 2**: Claude greps for the `AcatTransfer` model, verifies the `VALID_TRANSITIONS` constant exists, checks that `ClientProfile` has the right relationships, and confirms the `NotificationCategory` enum. No hallucinated method chains. No surprises.

**Phase 3**: Claude writes 23 failing tests covering status transitions, notifications, command behavior, and dashboard rendering. Runs them. All fail. Good. That's the point.

**Phase 4**: Claude implements the service, command, 5 notification classes, controller changes, and Blade template. Runs tests. All pass.

**Phase 5**: Runs the full related test suite (49 tests). Zero regressions.

**Phase 6**: Updates the changelog and adds inline comments to the transition service.

**Phase 7**: Adversarial review catches that `initiated_at->format()` could NPE if the field is null. Fixes it before it becomes a 2am incident.

**Phase 8**: Opens PR. Bug Bot finds 4 issues:

1. Hard-coded category strings (should use enum): fixed
2. Missing database locking on status transitions: fixed with `lockForUpdate()`
3. Nullable `initiated_at` in Blade template: fixed with null-safe operator
4. Wrong notification tone for completion events: fixed

After 3 fix cycles, Bug Bot returns `success`. PR ready.

**Total**: 49 tests, 108 assertions, 4 bugs caught before they shipped. Not bad for a checklist.

## How to install it

One command:  

```
curl -sL https://raw.githubusercontent.com/vlad-ko/claude-wizard/main/install.sh | bash
```

This drops three files into `.claude/skills/wizard/`:

- `SKILL.md`: The core 8-phase methodology
- `CHECKLISTS.md`: Quick-reference checklists
- `PATTERNS.md`: Common patterns and anti-patterns

Then type `/wizard` in Claude Code to activate it.

## Making it yours

The skill is framework-agnostic by design. It doesn't know if you're writing Laravel, Rails, Next.js, or Rust. The methodology, plan, explore, test, implement, verify, document, review, ship, works everywhere.

But it gets *more* powerful when you customize it. In my project, I added:

- Laravel-specific test commands (`./vendor/bin/sail test`)
- Our logging service patterns (`LoggingService::logPortfolioEvent()`)
- Database locking conventions for our ORM
- Bug Bot thread resolution commands (GraphQL mutations)
- Alpine.js requirements for UI components

The more project-specific context you add, the less Claude has to guess. And the less Claude guesses, the fewer bugs slip through. Turns out those two things are related.

## What it's not

`/wizard` is not a replacement for code review. It's not a testing framework. It's not a CI pipeline.

It's a **process prompt**: a way to encode senior engineering habits into Claude's workflow so those habits happen consistently, on every task, even at 2am when you're tired and just want the feature to ship.

The prompt is roughly 500 lines of markdown. There's no magic. It's the same checklist a good tech lead would run through, made explicit and repeatable. The only surprising thing is that nobody bothered writing it down sooner.

## The source

The full skill is open-source at [github.com/vlad-ko/claude-wizard](https://github.com/vlad-ko/claude-wizard). MIT licensed. Fork it, customize it, make it better.

It came out of building [wealthbot.io](https://wealthbot.io/), a fintech platform where "it mostly works" is genuinely not a product strategy. The patterns were refined over hundreds of PRs and real production incidents. The framework-specific parts have been stripped, but the methodology is battle-tested.

If you try it, I'd love to hear what it catches for you.