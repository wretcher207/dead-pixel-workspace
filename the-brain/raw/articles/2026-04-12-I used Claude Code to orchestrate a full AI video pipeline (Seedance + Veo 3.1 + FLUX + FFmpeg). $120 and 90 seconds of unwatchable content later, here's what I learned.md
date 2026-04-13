---
title: "I used Claude Code to orchestrate a full AI video pipeline (Seedance + Veo 3.1 + FLUX + FFmpeg). $120 and 90 seconds of unwatchable content later, here's what I learned."
source: "https://www.reddit.com/r/ClaudeAI/comments/1rjuiwj/i_used_claude_code_to_orchestrate_a_full_ai_video/"
author:
  - "[[ludobos77]]"
published: 2026-03-03
created: 2026-04-12
description: "I tried making a 90-second vertical drama teaser from a novel I wrote. Claude Code was the brain of the whole thing: generating keyframes (F"
tags:
  - "clippings"
---
I tried making a 90-second vertical drama teaser from a novel I wrote. Claude Code was the brain of the whole thing: generating keyframes (FLUX Pro, Imagen 4), sending them to Seedance 1.5 Pro and Veo 3.1 for animation, assembling everything with FFmpeg.

Claude Code was actually the part that worked. The [CLAUDE.md](http://claude.md/) config, the pipeline logic, the orchestration between models, all solid. The problem is everything downstream.

What Claude Code can't fix:

- Seedance heals a one-eyed cat mid-animation. Safety filters. Spent an hour prompting around it. No luck.
- Zero character consistency between shots. Same character, different face, different ethnicity, different body type. Every single shot.
- Veo 3.1 burns random English text into frames. "NANTES. MIDNIGHT. THE RAIN NEVER STOPS." Thanks, didn't ask.
- Seedance generates French audio that sounds like someone who's never heard French. Switched to ElevenLabs.
- I didn't read Veo's pricing. $3.20/clip at Quality tier. $70 on four shots.

The honest takeaway: Claude Code is a great director's assistant. But it can't replace the director. I'm not an animator, and no amount of good orchestration fixes that.

Full writeup with failure screenshots: [https://open.substack.com/pub/streamingradar/p/i-spent-120-trying-to-make-an-ai](https://open.substack.com/pub/streamingradar/p/i-spent-120-trying-to-make-an-ai)

Pipeline is open source (CLAUDE.md, storyboard, prompts, budget): [https://github.com/ludobos/feliguard](https://github.com/ludobos/feliguard)

Curious if anyone here has tried similar multi-model pipelines with Claude Code and had better luck.

---

## Comments

> **shireen\_9** · [2026-04-09](https://reddit.com/r/ClaudeAI/comments/1rjuiwj/comment/of4reo8/) · 1 points
> 
> This is a gold post !! THANKS FOR SHARING . I was actually just searching for a way to connect seedance to claude , after reading this realised - doing it manually is still better till yet.

> **snow\_schwartz** · [2026-03-03](https://reddit.com/r/ClaudeAI/comments/1rjuiwj/comment/o8i1wgb/) · 1 points
> 
> Following as this has been my experience using imagegen as well - some people seem to have unlocked a process that works but I can’t crack it.