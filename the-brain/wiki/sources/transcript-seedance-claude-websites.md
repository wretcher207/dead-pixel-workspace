---
title: "Transcript: Building Cinematic Websites with Claude Code + Seedance 2.0"
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [transcript-seedance-claude-websites, transcript-seedance-deep-dive, transcript-claude-code-design-levels, transcript-claude-code-prompting-hacks]
tags: [#claude-code, #seedance, #video, #workflow, #web-dev, #transcripts]
---

# Transcript: Claude Code + Seedance 2.0 Workflow Videos

**Sources (4 transcripts grouped):**
- "claude code + seedance 2.0" — Jack Roberts YouTube tutorial
- "claude code + seedance again" — Raw Keith (Gen HQ CEO) YouTube tutorial
- "another seedance + claude tranny" — Duncan Rogoff YouTube tutorial (5 levels of design)
- "claude code prompting" — Mikuel YouTube tutorial (5 prompting hacks)

## Summary

Four YouTube video transcripts focused on Claude Code workflows, particularly around Seedance 2.0 integration and prompting techniques. Heavy on practical workflow steps, light on theory.

---

## Jack Roberts: Cinematic Website Workflow

**Core thesis:** Claude Code + Seedance 2.0 produces cinematic website hero sections clients will pay thousands for. The technical barrier is low — buildable in minutes.

**Three-step workflow:**
1. Build base website in Claude Code (either from a GitHub template or via prompt builder)
2. Generate Seedance video clip (Claude skill creates the detailed image prompt → Hixfield generates the image → Claude skill creates video prompt → Kling.ai generates the clip)
3. Embed video as hero background and deploy (GitHub → Vercel)

**Key tips from Jack:**
- Use Claude's Seedance skill to generate image prompts first — gives you a base image before animating
- Include logo in the image generation for branded product shots
- When the site loads black: right-click → Inspect → copy the error → paste it into Claude Code
- Use Glideo for voice-to-text prompting
- For start-frame/end-frame constrained animation, Kling.ai supports it; Hixfield's Seedance doesn't
- Embed video: tell Claude Code "I've downloaded a video called [name]. Make it the hero section background running on repeat with sufficient contrast."

---

## Raw Keith (Gen HQ): Seedance 2.0 Deep Dive + Claude Skill

**Core thesis:** The Claude Seedance skill is the primary unlock — it generates technically precise video prompts with cinematic terminology, VFX language, and frame-by-frame breakdowns that most users wouldn't write naturally.

**The skill's structure:** Includes lighting design, specific hex codes, camera behavior, particle/atmospheric effects, character presentation, environment arc, mood/tone. Breaks prompts into 2-second chunks with explicit timestamps for the model to follow. 

**Workflow for real footage:**
1. Record yourself on iPhone
2. Extract a still frame at the action point (the "start frame")
3. Upload still frame to both Claude (for prompt generation) and Seedance (as start frame)
4. Generate detailed prompt describing what happens next
5. Output: seamless transition between real and AI footage

**Omni-reference:** Upload character sheet + location image + (optionally) a text reference image. The model synthesizes all three into one scene with consistent character identity. This is how the Gen HQ mini production was made in one day.

**Prompt limit:** Seedance allows 4,000 characters; Hixfield allows ~3,000. If the Claude-generated prompt exceeds the limit, paste it back to Claude and ask it to compress.

**Meta-ads application:** Generate 15-second promo clips from product photos. Upload product as Omni-reference, describe effects, generate hundreds of variants for A/B testing.

---

## Duncan Rogoff: 5 Levels of Claude Code Design

**Core thesis:** There are five levels of design quality attainable with Claude Code, and most people stop at level 1 (basic prompting). Using skills, audience research, external components, and brand extraction gets you to level 5.

**Five levels:**
1. **Basic prompting** — tell Claude Code what to build in plain language. Produces functional but generic output.
2. **LLM-enhanced prompting** — use Claude chat to improve your own prompt with more detail, brand context, section breakdown, audience copy. Feed the improved prompt to Claude Code.
3. **Design skills** — install the frontend-design skill (or similar). This gives Claude Code explicit guidance on anti-generic aesthetics: typography, color treatment, motion, composition.
4. **Parallel agent research** — while design is running, spin up a second Claude Code agent to research your audience. Pain points, dream outcomes, language they use. Merge the research into the landing page copy for higher conversion.
5. **External components + brand extraction** — 21st.dev provides professional components (hero sections, testimonials, pricing cards) with copy-prompt instructions. Firecrawl MCP scrapes your existing website for brand colors, fonts, and typography, feeding them directly into Claude Code.

**Key insight:** "Using your audience's own language back to them in a landing page is going to convert at a much higher rate. Your audience sees themselves in your landing page and thinks this person really understands me."

**Plan mode:** In Anthropic tools, switching from "edit automatically" to plan mode forces Claude to outline its entire approach before touching code. Fewer surprises, less back-and-forth, better results on complex tasks.

---

## Mikuel: 5 Claude Code Prompting Hacks

**Core thesis:** Most Claude Code users treat it like a regular chatbot — vague prompts, huge task bundles, then frustration when outputs break. Five specific habit changes produce dramatically more reliable results.

**Hack 1: Split prompts.** Don't ask for "a CRM with auth, database, API, dashboard, email, and deploy" — that's four to seven separate tasks. One task per prompt. Breaking monolithic requests into sequential steps is the single highest-leverage change.

**Hack 2: Context loading.** Claude Code's biggest weakness is context loss across sessions. Load context at the start of every new session: key files, architectural decisions, current state of the project. Don't assume Claude remembers.

**Hack 3: Use the /plan command.** Before any significant change, tell Claude to outline its approach first. Catch misunderstandings before they become code. "What's your plan for implementing X?" before "implement X."

**Hack 4: Incremental builds.** Instead of building full features in one session, build piece by piece with testing at each step. Smaller = more controllable, more reviewable, more correctable.

**Hack 5: Explicit output format.** Specify exactly what kind of output you want. "Give me a single function with no imports" beats "write code for X." Format instructions dramatically reduce noise.

---

## Cross-Cutting Themes

All four videos share common ground:

- Claude Code's output quality is directly proportional to prompt quality — there's no shortcut around this
- Skills/CLAUDE.md files are the highest-leverage investment (encode the expertise once, benefit every session)
- Parallel agents are underused — while one agent builds, a second can research, a third can test
- The gap between "works" and "worth $10K" is almost entirely process, not intelligence

## Connections to Existing Pages

- [[seedance-2]] — the video model central to three of these transcripts
- [[claude-code]] — the primary tool in all four
- [[claude-skills]] — skills are central to the workflow in every video
- [[claude-code-workflow]] — Mikuel's hacks and Duncan's levels both operationalize the same principles
- [[prompt-engineering]] — the underlying discipline all four are teaching

## See Also
- [[seedance-2]]
- [[claude-code-workflow]]
- [[article-seedance-overview]]
