---
title: "The 6 AM Dispatch: How I Use Claude Cowork to Run Five Parallel Workflows Before Breakfast"
source: "https://techysurgeon.substack.com/p/the-6-am-dispatch-how-i-use-claude"
author:
  - "[[Christian Pean MD]]"
  - "[[MS]]"
published: 2026-01-24
created: 2026-04-12
description: "A practical guide to the morning ritual of an orthopedic surgeon, CEO, and early riser"
tags:
  - "clippings"
---
It’s 6:15 on a Saturday morning. My kids and wife are still asleep. The inbox hasn’t yet become unmanageable, and the hospital hasn’t called. These are the hours I guard most jealously, and increasingly, I spend them in conversation with Claude.

Not the browser-based Claude that most people know. The version I’m describing is **Claude Cowork:** Anthropic’s less technical sibling to Claude Code, designed for those of us who want agentic capabilities without living in a terminal. It runs on my Mac, works within my folders, connects to my tools, and allows me to dispatch multiple tasks simultaneously while I go make coffee.

What follows is not a product review but rather a walkthrough of how I’ve structured my mornings around this tool, and how you might adapt the approach to your own context-switching needs, whether you’re juggling clinical responsibilities, company building, academic work, or all three.

<video src="blob:https://techysurgeon.substack.com/0180f041-76fd-400f-89f4-0b1bc7e9af03" controls=""></video>

---

## The Problem: Too Many Hats, Too Few Hours

My professional life exists in what I’ve come to call “pillars,” discrete domains of work that each demand sustained attention but rarely receive it. I am an orthopedic trauma surgeon and academic at Duke. I am CEO and co-founder of RevelAi Health, where we’re building AI systems for care coordination. I write the Techy Surgeon newsletter. Most importantly, I have a family I cherish and want to maximize time with.

The challenge is not time management in the traditional sense. It’s cognitive overhead: the mental tax of switching between vastly different modes of thinking, each with its own vocabulary, stakeholders, and definition of what constitutes progress.

> **The question I’ve been asking is not “how do I do more?” but rather “how do I offload the mechanical work so that my limited attention goes to decisions that require judgment?”**

Claude Cowork has become my answer, or at least a significant part of it.

---

![[0b0d45b897744e8e2ce4fb7c73300c07_MD5.webp]]

---

## The Setup: Chat, Cowork, and Folders

If you’re new to Claude’s ecosystem, it helps to understand the three interfaces Anthropic now offers. The browser-based chat is familiar: conversational, ephemeral, useful for quick queries. Claude Code is the power-user version with command line access, full agentic capabilities, and GitHub integration. Claude Cowork sits between them. **If you’re interested in Claude Code specifically, [In the Weeds by Hannah Steinberg](https://open.substack.com/pub/hannahstulberg/p/claude-code-for-everything-finally?r=3adnor&utm_campaign=post&utm_medium=web) is shaping up to be a really nice series on how to use it for non-technical users (like myself).**

![[f0da785d9dd8b52235c38fbf1bd09223_MD5.webp]]

The key insight, and the thing that tripped me up initially, is that Cowork is fundamentally *folder-based*. You select a directory, and Claude operates within it: reading files, creating documents, organizing content. This sounds minor until you realize it means you can point Claude at your Downloads folder and ask it to categorize three months of accumulated chaos. Or at a project folder and ask it to draft a presentation from the materials inside.

I reorganized my Downloads folder into a structure that supports this workflow: an “Active Work” folder, a “Today’s Work” subfolder, and category-specific directories. The architecture matters less than the principle: give Claude a clear context to work within.

One advantage of Cowork that I haven't seen replicated elsewhere: Claude doesn't just give you text responses in a chat window. **It writes directly into your folders. When I ask for a presentation, I get an actual PowerPoint file sitting in my directory. When I need a financial model, an Excel spreadsheet appears. Some of my more complex skills generate entire project packages with multiple files, organized into subfolders, ready to use.** The output isn't something you copy-paste from a chat; it's real, editable documents living where you need them. For someone juggling clinical, company, and content work across dozens of file types, this changes the utility equation entirely.

![[7a6eb5dcdb43c7d19b563848dc3802cb_MD5.webp]]

---

## The Morning Ritual: Five Tasks in Parallel

Here is what 6:15 AM looks like in practice. I open Cowork and dispatch five tasks in roughly five minutes. Then I walk away, meditate, make breakfast, check on the kids, and return to find deliverables waiting.

**Task 1: Email Triage and Response Drafting**

I ask Claude to go through my inbox, prioritize tasks by importance, and draft responses for anything that seems straightforward. This runs in the Chat tab because it needs email connector access.

> *“Go through my emails, prioritize the tasks for me that are most important, and organize them. Draft emails where you can to the ones that I should be responding to.”*

**Task 2: Presentation Preparation**

I have a seven-minute talk to give on an ankle fracture classification to a group of residents. Claude looks through the PowerPoints already in my folder and organizes a thoughtful structure.

> *“I have a talk that I have to give on the Lauge-Hansen classification to a group of residents. It has to be seven minutes long. Look into the PowerPoints that I have in my folder and organize a thoughtful talk for that.”*

**Task 3: Content Calendar Planning**

For Techy Surgeon, I want to plan out Substack content for the month. I give Claude the topics I’m considering and ask it to search the web for compelling stories, then organize everything into a branded calendar.

> *“Plan out content for Substack. Make a Techy Surgeon branded HTML with candidate ideas. This month I want to speak about the CMS ACCESS Model. I want to give insights on the evolution of AI in clinical contexts. Search the web, look for compelling stories I may want to cover, and organize that as a content calendar.”*

**Task 4: Downloads Folder Organization**

My Downloads folder had become a graveyard of PDFs, slide decks, and forgotten attachments. I point Claude at it with specific instructions.

> *“Organize my Downloads folder. Segment RevelAi relevant files into that folder. Within the RevelAi folder, ensure you have relevant files categorized by customer and task.”*

**Task 5: Deep Research Report**

I need to understand the Peterson Health Technology Institute’s new report on performance-based pricing. Not just summarize it, but analyze it through the lens of what it means for RevelAi’s pricing strategy.

> *“Create a grounded, citation-rich document that briefs me on the new Peterson Health Technology Institute report on performance-based pricing. Focus on musculoskeletal care. Make it an interactive HTML that guides me on how I should think about performance-based pricing for RevelAi Health.”*

---

![[0cb00b8e3c39a9dcdc73d2dec6055449_MD5.webp]]

---

**The core principle:** Send off the tasks, walk away, return to deliverables. Your scarce resource isn’t time. It’s decision-making capacity. Spend it on judgment calls, not mechanical work.

---

## The Practical Realities: What Happens Next…

I should be honest about the friction. Claude Cowork is not yet a fully autonomous assistant. Sometimes it stops mid-task to ask a clarifying question about audience level, scope, or format. You have to check back. The notification system helps (you get a gray “unread” indicator when something needs attention), but the workflow isn’t yet fire-and-forget.

There’s also a rendering quirk: occasionally the HTML previews show question marks instead of content within Cowork. Opening the same file in Chrome usually resolves it. Don’t let it alarm you.

And the Google Workspace integration that many of us want, direct Gmail access and Google Drive manipulation, is still in development for Cowork, though it’s available in Claude Code and the browser. I switch between interfaces depending on what I need. Slack connector and a ton of other MCP tools are available.

> The browser-based chat has one significant limitation: if you navigate away while it’s working, it can lose its thread. Cowork doesn’t have this problem. Multiple tasks genuinely run in parallel, and you can move between them without disruption.

---

## Building Repeatable Workflows: Skills

When you find yourself typing the same complex prompt repeatedly, it’s time to create a skill. Skills are essentially saved workflows that Claude can invoke on command.

I built one called “email priority run” that automates my morning email triage. When I invoke it, Claude goes through all my emails, categorizes them by pillar of work (RevelAi, Duke, Techy Surgeon, Family), drafts responses where feasible, and produces a branded dashboard with copy-pastable replies.

The process for creating a skill is straightforward: once you have a workflow that works, you tell Claude to “create a skill” from it. The skill gets saved and becomes available for future invocations. I have nearly a hundred at this point, though I’ll admit that not all of them are well-designed. Like any organizational system, the skills library can become its own form of chaos if you’re not thoughtful about it.

---

![[7fdbc3d0cdc0ade14e2ea3fa8eeaf900_MD5.webp]]

---

## The Connectors Ecosystem

Beyond folder-based work, Cowork offers connectors, which are integrations with external tools via the Model Context Protocol (MCP). The ecosystem is growing rapidly. I have clinical-related connectors enabled (ClinicalTrials.gov, ICD-10 lookup, NPI registry), along with Slack, Linear, and various healthcare-specific tools.

The connector architecture is where the real power lies for those willing to configure it. You can have Claude read and send Slack messages, manage Linear issues, query clinical databases. The desktop extensions allow even deeper integration.

Most developers connect to GitHub and deposit code directly into repositories. For clinical and operational work, the value is in workflow automation: having Claude not just draft an email but send it, not just create a task but assign it in your project management system.

I’m not there yet. I still review and manually send the emails Claude drafts. But the infrastructure is being built.

---

## What I’ve Learned

After about a month of a version of this morning ritual, a few principles have crystallized:

**Folder structure is critical.** Give Claude clear contexts to work within. A well-organized directory is like a well-organized mind. It makes everything downstream more efficient.

**Prompts should be specific but not over-engineered.** Tell Claude what you need, who it’s for, and what format you want. Then let it work.

**Check every artifact.** Claude makes PowerPoints, drafts emails, organizes files. All of it needs human review. The value is in the first draft and the organization, not in unreviewed automation and “slop at scale”.

**Skills compound.** Every workflow you encode as a skill is time you don’t spend re-explaining your preferences. Invest in building them.

**Parallel execution changes the calculus.** When you can dispatch five tasks in five minutes and return to deliverables an hour later, your relationship to “busy work” fundamentally shifts.

---

## Cost and Adoption Considerations

I use Claude Max (it’s the only way to access Cowork) with Opus 4.5 enabled. The cost is not trivial— about $200/month. I personally believe the productivity gains justify the investment, and the morning hours I’m reclaiming are being spent on work that matters to me.

***\*\* quick edit, Cowork is available to Team and Enterprise accounts, so this is another way to get access without the $200 price tag. Thanks for pointing this out [Ken Nepple](https://open.substack.com/users/32081484-ken-nepple?utm_source=mentions)!!***

The honest answer though is that I’m still calibrating. Some mornings, I return from meditation to find exactly what I needed: an organized inbox, a coherent presentation outline, a research brief that shapes my thinking. Other mornings, I spend more time fixing Claude’s output. And then there is “artifact creep”. You can easily lull yourself into thinking you’re being creative and productive but actually just creating “slop” that others spend more time editing than gleaning insights from.

But the trajectory is clear. The tools are getting better. The workflows are getting smoother. And the fundamental insight—that my scarce resource is judgment not keystrokes—remains valid regardless of which specific AI assistant I’m using to act on it.

The infrastructure is being built. The question, as always, is whether those of us building it will use it to create genuine value, or just more sophisticated ways of being busy. For me, I hope this newsletter and my stumbling help more people capture the former and not the latter.

***I hope this is helpful— I’m sure there for many of you who have tips and tricks to automate even more of this workflow, please let me know in the comments what else you want to see or how you use these tools to get more out of your productivity in your life! And consider subscribing to Techy Surgeon for more like this.***

---

*Christian Pean, MD, MS is CEO and Co-Founder of RevelAi Health, Executive Director of AI & IT Innovation at Duke Health, and Assistant Professor of Orthopaedic Surgery at Duke University. He writes the Techy Surgeon newsletter on clinical AI and health policy for surgeons and health system leaders.*