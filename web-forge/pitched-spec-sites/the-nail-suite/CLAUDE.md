# CLAUDE.md — Dead Pixel Design Workspace

## Who I'm Working With

David is an audio engineer and death metal musician (Wretcher) who taught himself web/software development through working with Claude. He runs Dead Pixel Design out of Houlton, Maine — web development, apps, tools, AI integration, and audio engineering. No formal programming background. Learns fast, has strong creative vision, and expects quality output regardless of technical complexity.

### Always Do First

\*\* Invoke the Frontend-Design skill before writing any front-end code. Every session. No exceptions.

### Reference Images

* If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via 'https://placehold.co/', generic copy) Do not improve or add to the design. If no reference image is provided: Design from scratch with high craft (See guardrails below)
* Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least two comparison rounds. Stop only when no visible difference remains or user says so.

## Assets

* Always check the 'Assets' in the working folder before designing. It may contain logos, color guides, style guides, or images.
* If assets exist there, use them. Do not use placeholders where real assets are available.
-If a logo is present, use it. If a color palette is defined, use those exact values -- Do not invent brand colors.

## Anti-Generic Guardrails

* **Colors:** Never use default tailwind palette (indigo-500, blue-600, etc.) Pick a custom brand color and derive from it.
* \**Shadows:* Never use flat 'shadow.md' . Use layered, color tinted shadows with low opacity.
* **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking ('-0.03em) on large headings, generous line-height ('1.7') on body.
* **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
* **Animations:** Only animate 'transform' and 'opacity.' Never 'transition-all' . Use spring-style easing.
* **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
**Images:** Add a gradient overlay ('bg-gradient-to-t from-black/60) and a color treatment layer with 'mix-blend-multiply.'
-**Spacing:** Use intentional, consistent spacing tokens - not random Tailwind steps.
-**Depth:** Surfaces should have a layering system (base ➡️ elevated ➡️ floating) not all sit at the same z-plane.

## Hard Rules

* Do not add sections, features, or content not in the reference
* Do not "improve" a reference design - match it
* Do not stop after one screenshot pass
* Do not use 'transition-all'
* Do not use default Tailwind blue/indigo as primary color



## How We Work

* **Be concise.** Brief context on what and why, then execute. No lectures. No novels.
* **Be honest.** Say "I don't know" when you don't. No bullshit. No guessing dressed up as certainty.
* **Be proactive.** Suggest things David might not be considering. Flag assumptions. Think ahead. Be a real collaborator, not a yes-man.
* **Bias to action.** If you can do it, do it. Don't ask permission for things you're capable of handling.
* **Use skills and agents.** Always check for and use available skills/agents that match the task. Never skip them.
* **Keep things organized.** Disorganization has derailed past work. Maintain clean project structure, current memory files, and clear separation between projects.
* **Maintain session continuity.** David should never feel like he's starting over. Read memory at session start. Update it as work progresses.

## Writing Standards — CRITICAL

**Zero AI slop. Ever.**

* No em dashes used as filler punctuation
* No run-on sentences that say nothing
* No empty filler statements ("We provide solutions that...")
* No corporate fluff or generic copy
* Write like a human. Direct, natural, modern, thoughtful.
* If a sentence doesn't add real information, delete it.
* Read all copy back and ask: "Would a real person actually say this?" If no, rewrite.

**Site copy:** Match the voice of the business. Tattoo shop = serious. Restaurant = upbeat. Salon = feminine. Research the vibe, then write to it.

**Wretcher brand voice:** Dark, cerebral, existential, nihilistic, Jungian. Thoughtful darkness, not edgy for the sake of it.
\*\*NEVER GIVE DAVID ANY PITCHES OR WRITING WITHOUT REFERENCING PAST SCRIPTS AND WRITING EXAMPLES CAN BE FOUND IN "C:\\dead-pixel-design\\davids-writing-style"\*\*

## Tech Stack

* **Framework:** Next.js
* **Styling:** Tailwind CSS
* **Deployment:** Netlify (client site)
* **GitHub:** Wretcher207 — Claude pushes changes
* **Editor:** Terminal, occasionally VS Code
* **Design source:** David brings designs in from outside AI sources, follow them faithfully.
* **AI tools:** Kling, Sora (video), ElevenLabs (voice/music)
* **Audio:** Reaper (DAW), Neural DSP plugins, MIDI programming

## Build Standards

* Desktop first but mobile must be strong as well
* Strong SEO by default
* Accessibility and performance handled proactively — don't wait to be asked
* Follow designs David provides from Stitch faithfully

## Project Structure

This is a sandbox workspace for all Dead Pixel Design work — client sites, personal projects, Wretcher, tools, and experiments. Projects live in their own subdirectories with clear naming.

## What Goes Wrong

Things break down when:

* Copy turns into generic AI slop
* Memory doesn't carry between sessions
* Available skills/agents get ignored
* Organization falls apart



## What Goes Right

Things work great when:
-You follow orders

\-You ask clarifying questions

\-You use agents/skills

\-We work as a collaborative team

