---
title: "How I Learned to Prompt AI Better — My Four Modes"
source: "https://sderosiaux.medium.com/how-i-learned-to-prompt-ai-better-my-four-modes-177bddcfa6bd"
author:
  - "[[Stéphane Derosiaux]]"
published: 2025-08-25
created: 2026-04-12
description: "How I Learned to Prompt Claude Code Better — Four Modes I spend a lot of my time working with AI — building apps, debugging code, writing strategy docs, even learning new technologies. At first …"
tags:
  - "clippings"
---
Get unlimited access to the best of Medium for less than $1/week.[Become a member](https://medium.com/plans?source=upgrade_membership---post_top_nav_upsell-----------------------------------------)

[

Become a member

](https://medium.com/plans?source=upgrade_membership---post_top_nav_upsell-----------------------------------------)

![[e0c2b682a616f2d62478509d6257b4c9_MD5.webp]]

I spend a lot of my time working with AI — building apps, debugging code, writing strategy docs, even learning new technologies. At first, I thought prompting was simple: ask a clear question, get a clear answer. But that assumption led me into chaos.

I had exported all my Claude Code prompts from `.claude/projects` and dropped them into ChatGPT with one question:

> *“Analyze these deeply. Find patterns in how I prompt. What am I doing right, what am I doing wrong?”*

The results were eye-opening.

It turned out that my prompts weren’t bad — but they were messy. I was often repeating myself, mixing different intentions in the same request, or stacking meta-instructions like “don’t be verbose / keep it short / make it snappy” until the AI didn’t know what I actually wanted.

That analysis showed me something simple but powerful: I was actually working in distinct **modes of prompting**. Once I gave those modes names, I suddenly had a way to be clearer with both myself and the AI. And clarity is everything.

## The Four Modes of Prompting

Each mode has its own purpose, tone, and expectation. If I don’t know which mode I’m in, I confuse both myself and the AI.

## 1\. Build Mode → “Give me something I can use.”

This is execution mode. I know what I want, I just need the AI to produce it.

**Examples of prompts:**

- “Implement a Kafka consumer in Java that retries with exponential backoff.”
- “Write me a bash script to tail logs and color errors in red.”
- “Create a marketing email for our upcoming webinar, short and direct.”

**Pitfall I noticed:** In my early prompts, I’d bury Build requests under too much meta-instruction — “don’t be verbose,” “make it snappy,” “avoid fluff.” That only created clutter.

**Takeaway:** In build mode, *strip away the meta*. Be concrete, short, and let the AI deliver the thing.

## 2\. Debug Mode → “Why is this happening?”

Here I’m confused. Something doesn’t work, or I don’t understand why.

**Examples of prompts:**

- “Is it normal that my Kafka consumer is rebalancing every 30 seconds?”
- “Why is this CSS leaking into my React component?”
- “My SQL query is running slow — can you spot the issue?”

**Pitfall I noticed:** I sometimes jumped too fast into “fix it” before giving enough context. Without logs, versions, or a minimal snippet, the AI could only guess.

**Takeaway:** In debug mode, *show your work*. Share the inputs, errors, and environment. Then let the AI diagnose before you ask it to build a fix.

## 3\. Rewrite / Critique Mode → “Make this sharper.”

This is when I already have something — a draft, an idea, a piece of text — but I know it could be better.

**Examples of prompts:**

- “Here’s my blog draft. Critique it for clarity and impact.”
- “Rewrite this function with better readability.”
- “Analyze my LinkedIn post and suggest how to make it more engaging.”

**Pitfall I noticed:** I sometimes asked for both “critique” *and* “rewrite” in the same breath. That led to polite rewrites instead of tough feedback.**Takeaway:** Separate critique from polish. First, ask “what’s wrong?” Then, once you’ve seen the critique, ask for a rewrite. That two-step process produces stronger results.

## 4\. Learn Mode → “Teach me like I’m new.”

This is when I want to understand something deeply, not just get the answer.

**Examples of prompts:**

- “Explain CROSS JOIN LATERAL in Postgres with simple examples.”
- “Walk me through Flink checkpoints — aligned vs unaligned.”
- “Help me understand OAuth2 step by step, as if I were implementing it from scratch.”

**Pitfall I noticed:** I often forgot to declare my level. The AI defaulted to beginner-friendly answers when I sometimes needed expert-level nuance.

**Takeaway:** In learn mode, *tell the AI your level and your goal*. “I know Kafka basics, but I don’t understand tiered storage — explain it as if I’m an infra engineer preparing for a debate.” That framing produces teaching you can actually use.

## Extra Lessons From My Prompting Habits

Through analyzing my own prompts, I also noticed a few patterns:

- **Repetition** → I often repeated instructions (“be concise, don’t be verbose, keep it short”). The AI already understood — I was just wasting tokens and creating noise.
- **Mode mixing** → My most confusing prompts tried to do Build + Learn + Critique in one go. Separating them into smaller turns made the output much stronger.
- **Meta-hooks help** → I started adding shorthand triggers like `AMA` (“Ask Me Anything”) to force the AI to pause and ask me clarifying questions before producing output. This prevented wasted answers when I’d been vague.
- **Context drift** → If a conversation was long, I sometimes forgot which mode I was in. Just adding a line like *“switching to Debug mode now”* helped reset expectations.

## Why Modes Matter

Mixing these modes in one prompt creates noise. If I ask the AI to “teach me Kafka rebalances” *and* “fix my code” *and* “make my writing sharper,” the system has no idea which hat to wear. The output is vague, scattered, and usually disappointing.

But when I separate them — when I consciously say, *I’m in build mode now* — the results are sharper, faster, and way closer to what I actually need.

## My Rule of Thumb

Before I hit “send” on any AI prompt, I pause and ask myself:

- Am I building?
- Debugging?
- Rewriting?
- Learning?

That tiny act of labeling the mode changes everything.

## Closing

Prompting isn’t about magic incantations or clever hacks. It’s about **knowing what role you want the AI to play** — and then sticking to it.

Once I started thinking in modes, the AI became less of a noisy assistant and more of a true partner in my work.

👉 I’m curious: have you noticed your own “modes” of prompting?

## Responses (3)

Isaac Barry

What are your thoughts?

  

```sh
I like your idea of thinking in modes when prompting. I tend to refresh the window context, have unique sessions for each stage of development-- learning/brainstorming, planning. Implementing, validating/debugging, critiquing, refactoring, etc
```

```sh
Nice Reading! Thank you for the insights
```

```sh
Thanks for this very helpful summary. I myself sometimes get confused which of these modes *I* am in, and it's very helpful to to separate them.
```

<iframe src="chrome-extension://cnjifjpddelmedmihgijeibhnjfabmlf/side-panel.html?context=iframe"></iframe>