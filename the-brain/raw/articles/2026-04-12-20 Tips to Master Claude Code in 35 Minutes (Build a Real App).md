---
title: "20 Tips to Master Claude Code in 35 Minutes (Build a Real App)"
source: "https://creatoreconomy.so/p/20-tips-to-master-claude-code-in-35-min-build-an-app"
author:
  - "[[Peter Yang]]"
published: 2025-09-24
created: 2026-04-12
description: "My 20 best tips to master Claude Code while building a personalized family activity finder app step-by-step"
tags:
  - "clippings"
---
[AI Tutorials & Tools](https://creatoreconomy.so/s/ai-tutorials-and-tools/?utm_source=substack&utm_medium=menu)

### My 20 best tips to master Claude Code while building a personalized family activity finder app step-by-step

Dear subscribers,

Today, I want to share 20 tips to master Claude Code while building a real app.

> **In this tutorial, we’ll build a family activity finder for busy parents to find local events personalized to their location, kids’ age, schedule, and interests.**

While building this app, we'll cover every essential Claude Code tip from planning to coding to debugging. I guarantee that you’ll learn a lot from this video!

![](https://www.youtube.com/watch?v=jWlAvdR8HG0)

Timestamps:

- ([00:00](https://www.youtube.com/watch?v=jWlAvdR8HG0)) Start in plan mode and explore solutions with Claude
- ([03:57](https://www.youtube.com/watch?v=jWlAvdR8HG0&t=237s)) Follow the spec → to do → code process
- ([09:58](https://www.youtube.com/watch?v=jWlAvdR8HG0&t=598s)) Use the explanatory output style to learn while building
- ([11:41](https://www.youtube.com/watch?v=jWlAvdR8HG0&t=701s)) Use Claude.md to add your personal preferences
- ([15:41](https://www.youtube.com/watch?v=jWlAvdR8HG0&t=941s)) Debugging with "think ultra hard" and browser console logs
- ([18:26](https://www.youtube.com/watch?v=jWlAvdR8HG0&t=1106s)) Add version control with GitHub integration
- ([23:42](https://www.youtube.com/watch?v=jWlAvdR8HG0&t=1422s)) Hook up Claude API with web search for real-time events
- ([33:00](https://www.youtube.com/watch?v=jWlAvdR8HG0&t=1980s)) Recap: All 20 Claude Code tips from beginner to advanced

**[Watch now on YouTube](https://youtu.be/jWlAvdR8HG0)** or read the written guide below.

---

Thanks to **[Bland](https://www.bland.ai/?utm_campaign=PeterYang1&utm_medium=paid&utm_source=PeterYang1)** for sponsoring today’s newsletter!

![[b42481f37d0b6b882507d64346dcb70f_MD5.webp]]

Bland creates AI customer support agents that sound human, speak any language, and work 24/7. Features include:

1. Custom prompts and guardrails to keep conversations on-brand and accurate.
2. Seamless integrations with your CRM, scheduler, and existing systems.
3. Self-hosted infra with 99.99% uptime and zero marginal call costs.

They are already trusted by companies like Gallup, Samsara, and Snap to handle millions of interactions a day. To try Bland, call the number in the image above or…

---

## Planning and project setup

![[f9a4014955a6a8b167e9c5ab4fa748cf_MD5.webp]]

The family activity finder that you’ll build

1. **Use plan mode before coding.** If you just remember one tip, make it this one. The more time you spend planning, the more likely Claude will succeed. I always press shift-tab to cycle to plan mode to start. If Claude asks to start coding, just hit escape to cancel. Think of Claude as an overeager engineer that you have to train.
2. **Ask Claude to explore solutions first.** The first thing I like to do in plan mode is to ask Claude to “explain the code base.” Then I tell it: “I want to build X, can you explore solutions starting with the simplest one first?” Collaborate with Claude to come up with the plan first before coding.  
	  
	Let’s use this prompt to explore solutions for our activity finder:
```markup
I want to build a family activity finder. Parents enter:
1. Their city
2. Kids ages
3. When they're free (like "Saturday afternoon")
4. How far they'll drive (miles)
5. Any other preferences

The app searches for weekend activities nearby and returns 5 recommendations with bold titles, an emoji, and 2-4 sentences each. What are 3 solutions starting with the simplest first? Include a solution that uses the Claude Messages API.
```
1. **Follow the spec → to do → code process.** After exploring and selecting a solution with Claude, I like to ask it to create a spec with the requirements, tech stack, design guidelines, and up to 3 milestones. I’ll then ask it to “Create a detailed to do list for milestone 1.” This way, I’m always auditing Claude’s plans in each step.  
	  
	Let’s ask Claude to create the spec and the prompt for our family activity finder. Make sure you review the spec before asking it to draft a to do list for milestone 1:
```markup
Create a spec.md with requirements, tech stack (React + Express + Claude API), design guidelines, and up to 3 milestones. Keep it as simple as possible. 

For milestone 1, let's get the UI set up with dummy data. For milestone 2, let's connect to Claude API with the web search tool: https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool.

//

Also create a prompt.md file with the prompt that we're going to use for milestone 2 where we call the Claude API to get the 5 recommendations. Have input fields in place for city, kids ages, availability, miles range, and other preferences.

//

Create a todo.md with a list of tasks for milestone 1.
```
1. **Use output styles to learn while building.** Type “/output-style explanatory” to get Claude to add Insights boxes that explain why it made each choice so that you can learn to read code and understand Claude’s decisions while it’s building. If you want to get your hands dirty, you can also type “/output-style learning” to get Claude to mark to do items for you to implement yourself.
1. **Use Claude.md to bootstrap project understanding.** You can type “/init” to have Claude scan the code base and create a detailed Claude.md file with project context. This becomes Claude's memory for every future conversation. Since we’re starting from an empty project we’ll skip this step.
2. **Use Claude.md to add your personal preferences.** You can also add your personal preferences to Claude.md. For example, I want Claude.md to know that I’m a PM with limited coding experience and that it should always explain changes and new technology to me when it’s coding.  
	  
	Let’s ask Claude to create the Claude.md file now:
```markup
Create a Claude.md file with the text below:

I'm a product manager with limited coding experience who's looking to learn to become more technical. When you're coding and doing your work, please share tips that explain the tech architecture and any changes that you're making and why.
```

---

## Core coding workflows

Hi **drjr1021@gmail.com**

## This post is for paid subscribers

[Already a paid subscriber? **Switch accounts**](https://substack.com/sign-in?redirect=%2Fp%2F20-tips-to-master-claude-code-in-35-min-build-an-app&for_pub=peteryang&change_user=true)