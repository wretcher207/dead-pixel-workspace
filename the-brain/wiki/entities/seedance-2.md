---
title: Seedance 2.0
type: entity
created: 2026-04-12
updated: 2026-04-12
sources: [article-seedance-guide, article-seedance-claude-skill, transcript-seedance-claude-websites, transcript-seedance-deep-dive]
tags: [#ai, #video, #tools, #bytedance, #audio-engineering, #creative]
---

# Seedance 2.0

ByteDance's AI video generation model. Generates cinematic video clips (4–15 seconds) from text prompts, static images, reference videos, and audio files. Accessible via platforms like Kling.ai and Hixfield. Released early 2026 and rapidly adopted in creative AI workflows.

## What It Is

A multimodal video generation model: you give it ingredients (text description, reference image, reference video for motion, audio clip), and it produces a short video that synthesizes all of them. The key differentiator over earlier AI video tools is the **multimodal all-round reference system** — you can specify what a character looks like, how the camera should move, and what the audio should feel like simultaneously, and the model integrates all three.

Key specs:
- Clips: 4–15 seconds
- Resolution: up to 1080p
- Aspect ratios: 16:9, 9:16, square
- Watermark-free downloads
- Prompt limit: 4,000 characters (3,000 on some platforms)

## Core Capabilities

**Multi-shot storyboarding.** Rather than generating isolated clips, Seedance 2.0 can break a concept into interconnected shots with consistent camera logic and smooth transitions. Output feels directed rather than algorithmically stitched.

**Native audio generation.** Audio isn't a separate layer — the model generates dialogue, background sounds, and effects synchronized to the visual output. Supports multiple languages and voice cloning from uploaded samples.

**Omni-reference.** Upload multiple character sheets, location images, or object references simultaneously. The model understands each and synthesizes them into a coherent scene. This enables consistent character identity across shots — something earlier models couldn't reliably do.

**Physics and motion simulation.** Objects behave according to physical rules: gravity, collision, realistic motion. Camera movement is controllable. Scenes feel coherent rather than like a dream sequence.

**VFX-level output.** Effects that previously required After Effects expertise (camera-tracked text, transformation sequences, VFX shots) can now be generated from text prompts. Prompting with cinematic terminology (macro digital zoom, handheld camera motion, character reveal) produces results that match the language.

## How to Use It

**Basic workflow:**
1. Generate a refined video prompt using a Claude skill (the Seedance skill generates technically detailed, cinematic language with proper VFX terminology, lighting hex codes, camera behavior specs)
2. Upload to your platform of choice (Hixfield, Kling.ai)
3. Optionally upload start/end frame images for constrained animation
4. Generate
5. Stitch with real footage if needed

**Prompt best practices:**
- Stay under 4,000 characters (3,000 for Hixfield)
- If a generated prompt exceeds the limit, paste it back into Claude and ask it to reduce characters
- Only copy the shot description (from "Shot 1:") — skip master effects inventories
- The Claude skill for Seedance handles cinematic terminology that most users wouldn't naturally include

**Omni-reference workflow:**
- Upload character sheets + location images directly to the prompt bar
- Describe the action you want
- The model identifies each reference and integrates them

**Cinematic website workflow** (from transcripts):
- Build base website in Claude Code
- Generate a Seedance clip (product rotating, abstract motion, brand animation)
- Embed as hero section video background
- Deploy via GitHub → Vercel/Netlify

## Platform Notes

- **Hixfield** — doesn't support start frame + end frame with Seedance (requires switching to a different model like Cling 3.0 for that feature)
- **Kling.ai** — supports start frame + end frame, cheapest per-generation option found so far; note: API access was temporarily offline during testing
- **Firecrawl MCP** — useful companion: scrapes an existing website for brand colors, fonts, and typography to feed into Claude Code alongside Seedance output

## Relation to Claude

Multiple workflows involve [[claude-code]] or [[claude]] directly:

- The official Seedance skill (created by Gen HQ / Raw Keith) handles prompt engineering inside Claude — you describe what you want in plain language, Claude generates a detailed, technically precise video prompt optimized for Seedance
- Claude Code can embed Seedance outputs into websites: "I've just downloaded a video. I want this video to be the first thing in the hero section as the background running on repeat."
- Seedance + Claude Code is being marketed as a "cinematic website" workflow for agency work

## See Also
- [[claude-skills]] — the Seedance skill that interfaces with this
- [[claude-code]] — used to build the websites that contain Seedance video
- [[article-seedance-guide]]
- [[transcript-seedance-claude-websites]]
- [[transcript-seedance-deep-dive]]
