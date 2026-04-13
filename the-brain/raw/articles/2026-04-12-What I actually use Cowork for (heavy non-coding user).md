---
title: "What I actually use Cowork for (heavy non-coding user)"
source: "https://www.reddit.com/r/ClaudeAI/comments/1rubfbx/what_i_actually_use_cowork_for_heavy_noncoding/"
author:
  - "[[rebelytics]]"
published: 2026-03-15
created: 2026-04-12
description: "I did this post about my Cowork setup a few weeks back and people wanted to know what I actually do with it. Here‘s the follow-up I promised"
tags:
  - "clippings"
---
I did [this](https://www.reddit.com/r/ClaudeAI/comments/1rbiv89/my_current_cowork_setup_workarounds_heavy/) post about my Cowork setup a few weeks back and people wanted to know **what I actually do with it**. Here‘s the follow-up I promised.

**Banner uploads to affiliate network**

I had hundreds of new banners to upload to AWIN (an affiliate network). Cowork analysed the content of the images, created all required metadata field values correctly and generated the import CSV automatically. What would have taken hours took minutes. I also had Cowork create a skill based on the first run to make it repeatable (no explaining required when I need to upload more banners) and have repeated it several times since.

**Prompt tracking strategies for AI visibility monitoring tools**

I used Cowork to build prompt tracking strategies in different AI monitoring tools for several websites based on Google Search Console query data, website crawl exports and 3rd-party rank tracking data. One of the tools provides an API, so I used Cowork to push everything via the API. When it hit limitations with the public API, Cowork used the Chrome extension to reverse-engineer the UI’s internal API and pushed the data through that instead. This felt borderline, but it was fascinating.

**Twitter > LinkedIn contact migration**

I used to have a great network on Twitter, but wasn’t connected with most of those people on LinkedIn. I had Cowork scrape my mutuals via the Chrome extension (on what’s now X) and set up a daily scheduled task that surfaces 20 LinkedIn profile URLs for people from that list every morning. It takes me about 2 minutes to send the connection requests manually every day. I deliberately didn’t automate that part because of LinkedIn’s automation detection.

**Trending topics research (scheduled)**

I have a weekly scheduled task for one of the industries I work in that compiles new trending topics since the last run, classifies them by content potential (guide content, newsletter, social media) and business impact (including competitor monitoring). Each run has access to the previous results so it doesn’t repeat anything and the series builds up logically. Next planned steps: Automate the delivery to the team via email and use their direct replies to the emails to further improve the process automatically.

*Additional tip: With projects like this one, I figured out that it works better to keep scheduled tasks brief and put all important information in a skill that the scheduled task invokes. It's easier to improve skills than scheduled task.*

**Product feed optimisation**

I loaded 25 product feeds with around 100k products each into Cowork via the shared folder and used it to analyse quality issues and improve them: Missing columns, incorrect values, inconsistencies between feeds, etc.: Not something I could have done manually, at least not at this scale.

**Dev tickets for schema implementation**

I built a workflow that uses the Chrome extension to analyse a website, identify all page types, extract existing structured data and generate developer tickets for improving the setup (all based on my own knowledge of schema implementation). The workflow lives in a skill that improves automatically each time I use it on a new website. I also used the same skill as the basis for an article about how to write good schema tickets.

**Analysing sales tracking discrepancies**

I used Cowork to compare transaction data exports from a shop system and a web analytics platform to find the cause of discrepancies we had noticed. Found and fixed several issues by looking for patterns across payment providers, countries, order status, etc. in exports with tens of thousands of rows.

**Page type segmentation configs**

My main website crawling tool has a segmentation feature based on JSON rules for URL patterns and dataLayer or content extractions. In the workflow I created, Cowork either analyses the website via the Chrome extension or takes a crawl export as input (or both) and generates the segmentation script, improving it over several iterations. I had Cowork build a self-improving skill for this, so that every new project runs smoother than the previous one.

**Image alt texts at scale**

I am currently using Cowork to generate image alt texts for thousands of images, combining crawl data about missing or empty alt attributes with Chrome extension verification of the actual images and their context on the pages. Following accessibility standards, Cowork also checks for decorative images and lists them as candidates for empty alt attributes (so that screen readers don’t read out the file names).

**Website crawl analysis**

I frequently use Cowork to analyse all kinds of crawl data exports, often combined with the Chrome extension to verify findings or fetch additional information directly from the page (as it might have changed since the crawl).

**Automatic Shopify translation app analysis**

I used the Chrome extension in Cowork to analyse the output of an automatic Shopify translation app, identify gaps in what the app was able to translate, and make specific recommendations for fixes in the shop settings and configurations of other Shopify apps.

**Skill creation and improvement**

Cowork builds and improves my skills automatically based on my sessions. I created a meta-skill that watches my sessions and captures reusable patterns. It’s the backbone of my work now. When I open-sourced the meta-skill on GitHub (my first repo ever, yay!), Cowork supported me with the whole process: creating license and README files and walking me through the required steps.

**Time management, resource planning and content ideas**

Cowork has access to my time tracking, my strategic business goals, my planned tasks (via the iOS reminders app) and my calendar. Every Friday, it runs a scheduled weekly review to check my progress against my goals and help me stay on track. The review also surfaces content ideas from the topics I work on during the week.

*Additional tip: You see that almost all of my workflows involve the Chrome extension. This is because it's the most reliable way to get accurate data from websites. The built-in web fetch tool that Cowork normally uses gets blocked by many websites (as it is detected as an automated request) and when that happens, Cowork often falls back to cached search engine results, which tend to be out of date and incomplete. The Chrome extension uses your browser, so it gets exactly what a user would get on the website.*

That‘s my list for now. I’m sure I did more, but it's hard to remember everything.

I’d love to hear about more Cowork use cases. Other fields of work would be particularly interesting, but don’t hold back your technical marketing stuff either!

---

## Comments

> **Charming-Shoulder527** · [2026-04-06](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oenntd3/) · 0 points
> 
> Visitei um cliente que está na **Gowork da Ministro** e achei o espaço muito bacana, o prédio é bem estruturado e o ambiente bem profissional. Hoje vejo que o modelo de coworking evoluiu bastante e se tornou uma ótima opção para quem busca um lugar prático e confortável para trabalhar.

> **Fabulous\_Maybe\_4011** · [2026-04-01](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/odrwgin/) · 1 points
> 
> i love you wow

> **Substantial-Cost-429** · [2026-03-20](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/obiqlwx/) · 1 points
> 
> wow, this list is super inspiring. im also a heavy noncoding user, but cowork is now central to my workflows. I use it for product requirement docs, QA for websites (spot check alt tags, segmentation), migrating spreadsheets to CMS, summarising research etc. To keep things manageable i run my cowork off our local \`caliber ai-setup\` environment so the sessions persist and we can version skills. We store skills in \`skills/\` folder and treat them like functions, and we schedule tasks to run via cron plus /wrap up summarizing. I didnt know about the Chrome extension hack to call internal api; thanks for the tip.

> **Illustrious\_Cow\_2920** · [2026-03-19](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/obbmbus/) · 2 points
> 
> So good!!! Thank you. Do you publish any of your tools? Would be helpful so I don't have to reinvent the wheel. Thanks for sharing.
> 
> > **rebelytics** · [2026-03-19](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/obc2kqp/) · 1 points
> > 
> > I’ve open-sourced my meta-skill: [https://github.com/rebelytics/one-skill-to-rule-them-all](https://github.com/rebelytics/one-skill-to-rule-them-all) - I haven’t published anything else so far, but if you’re interested in anything specific, let me know!

> **tom\_mathews** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob4yq2m/) · 2 points
> 
> Super cool and thanks for sharing. The API reverse-engineering is the most technically interesting part. DevTools + patient agent beats manually hunting undocumented endpoints every time tbh.
> 
> > **rebelytics** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob55351/) · 2 points
> > 
> > Glad you liked it and I agree on the API reverse-engineering topic. It's pretty impressive what Claude can do if you give it access to your browser. I've also noticed that it can be quite a token-burner though. The only times I hit my sessions limits are when Claude runs wild via the Chrome extension.

> **MinimalMemes** · [2026-03-17](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oazq4e5/) · 2 points
> 
> Would love to use the meta-skill that learns from the sessions.
> 
> > **rebelytics** · [2026-03-17](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob01ua9/) · 1 points
> > 
> > Here you go! [https://github.com/rebelytics/one-skill-to-rule-them-all](https://github.com/rebelytics/one-skill-to-rule-them-all)
> > 
> > > **MinimalMemes** · [2026-03-21](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/obplwq6/) · 2 points
> > > 
> > > Thank you so much for this, recently started using Cowork + this meta skill. This feels like magic.
> > > 
> > > Want to understand & better implement such skills.
> > > 
> > > > **rebelytics** · [2026-03-21](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/obqji3x/) · 1 points
> > > > 
> > > > That’s amazing. I’m super happy to hear you’re using it!
> > 
> > > **MinimalMemes** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob2d23d/) · 2 points
> > > 
> > > - Do you have any blog or a place where you share/document your experiments & experiences?
> > > - Have you tried anything for SEO?
> > > - How did the idea of the meta skill originate? I never thought that this could be a thing. What i used to do is...create a project then after each conversation I'd tell it to read the current project instructions & the changes made in current conversation and then give me a new updated project instruction.
> > > 
> > > > **rebelytics** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob391vs/) · 2 points
> > > > 
> > > > Yes I do have a blog ([https://www.rebelytics.com/](https://www.rebelytics.com/)). I mainly write about SEO, so that also answers your second question.
> > > > 
> > > > About the idea for the meta-skill: When I first heard of skills, I felt a strong urge to use them to formalise my knowledge, as the value of my work is that **I know how to do things**, and skills are basically that: Instructions for how to do things.
> > > > 
> > > > The first skill I created was for schema implementation dev ticket creation, and I created it by doing the work with Claude first and then having Claude write the skill based on all the instructions I gave during the work session and the corrections I made on Claude's output.
> > > > 
> > > > After creating that first skill, I thought that the process should be automated, so the second skill I created was already the meta-skill. And that's how it all happened! But it's basically what you've already been doing yourself, just formalised around the concept of skills.
> > > > 
> > > > > **MinimalMemes** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob5zeny/) · 2 points
> > > > > 
> > > > > Thanks for the efforts you have put into all this. Will check out the blog.
> > > > > 
> > > > > Have you dabbled with Programmatic SEO?
> > > > > 
> > > > > > **rebelytics** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob64yzs/) · 1 points
> > > > > > 
> > > > > > Not really. The closest I’ve come to programmatic SEO is probably creating e-commerce product descriptions based on product data sheets with AI.
> > 
> > > **MinimalMemes** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ob2c0n9/) · 2 points
> > > 
> > > Thanks 🙏🏻

> **FileAffectionate4669** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaq03x7/) · 1 points
> 
> Bonjour, comment travaillez vous avec une plateforme d'affiliation sous Claude ?
> 
> > **rebelytics** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaq58ix/) · 1 points
> > 
> > Pour l’instant, la seule chose que j’ai faite avec Claude Cowork dans le domaine de l’affiliation correspond au cas d’usage décrit dans le post original : mettre en ligne des bannières. Mais je vois beaucoup plus de potentiel, notamment pour analyser les données et peut-être automatiser davantage de processus, par exemple la validation des transactions ou l’acceptation / le refus des demandes d’affiliation des éditeurs.
> > 
> > > **FileAffectionate4669** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaqdhcq/) · 2 points
> > > 
> > > Intéressant, je l'utilise aussi pour de l'affiliation mais principalement pour l'analyse des performances/action marketing de mon portefeuille déjà intégré sur Awin. Ce pilotage là demanderait une connexion via desktop pour réaliser ces actions (validation des transactions/acceptation.. ? Désolée je débute avec Claude ^^
> > > 
> > > > **rebelytics** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaqg3v7/) · 1 points
> > > > 
> > > > Je ne l’ai pas testé moi-même, mais il semble que Awin propose une API pour valider les transactions, ce qui permettrait d’automatiser l’approbation des ventes au lieu du processus manuel d’import/export via Excel. Cowork est très performant pour interagir avec des API, et quand ça ne fonctionne pas, l’extension de navigateur est souvent une bonne alternative, mais il faut rester prudent si on lui donne accès à des interfaces nécessitant une connexion.

> **swdrumm** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oao5y5z/) · 2 points
> 
> Nuclear engineer background, now running a digital product business (AI workflow tools for Claude Code users) entirely through Cowork. A few things that don't fit the usual productivity framing:
> 
> **Product generation pipeline.** All four paid products — PDFs, reference cards, product images — are generated programmatically via Python scripts Cowork wrote and runs. When I update content, I re-run the script, not a design tool. Reproducible, version-controlled, zero manual layout work.
> 
> **Website deployment.** Cowork manages the full deploy cycle: builds the HTML, bundles the zip, writes the changelog. I push to the server; Cowork handles everything upstream of that.
> 
> **Video production.** Cowork scripted and assembled a 47-second motion graphics explainer — 5 HTML/CSS/JS animation scenes combined via ffmpeg with ElevenLabs voiceover. Never opened a video tool.
> 
> **Marketing cadence.** Weekly newsletter drafts, X thread copy, and launch sequencing all live as skills. Cowork knows the brand voice and product catalog; I just direct the work.
> 
> The pattern I keep coming back to: invest in skills upfront, explain less per session. My main product is literally the skill set I use to run the business — I packaged and sold it. [arcanium.us](http://arcanium.us/) if curious.
> 
> > **rebelytics** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oapfgeo/) · 1 points
> > 
> > This is amazing, thanks for sharing!

> **eSorghum** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oanfcn2/) · 2 points
> 
> The skill-that-improves-itself pattern is the part most people miss. Building a repeatable workflow on the first run and then letting it refine each time you use it — that's where the compounding value is. Most people treat each session as a fresh start.
> 
> Curious whether you've noticed skills drifting over time — picking up assumptions from edge cases that don't generalize well to the next run.
> 
> > **rebelytics** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oapftyx/) · 2 points
> > 
> > I review most improvements before they are applied, so I catch some things that I decline, but yes, there is a danger of quality drift and the skills require some maintenance. It’s manageable though and absolutely worth it for the value you generate!

> **PlantainAmbitious3** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oalhf46/) · 2 points
> 
> Honestly the banner upload workflow sounds like a massive time saver. I do similar repetitive data entry stuff for my work and never thought about using Cowork for that kind of thing. Always assumed it was mostly for coding tasks so this is really useful to see real non-dev examples.
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oalicun/) · 1 points
> > 
> > I hope you find good solutions for your work!

> **FuzzyIdeaMachine** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oalfkm5/) · 2 points
> 
> This is fascinating. I need to dive into skills more.
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oalg7ib/) · 1 points
> > 
> > Happy to hear that! I hope you have a lot of fun with skills.
> > 
> > > **FuzzyIdeaMachine** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaplx2c/) · 2 points
> > > 
> > > This evening I created my first one. And then used the skill to create a variation of a deliverable I provide. Saved about three hours of admin time.
> > > 
> > > > **rebelytics** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oapnjle/) · 1 points
> > > > 
> > > > Great job! I’m so happy for you!!

> **Ok\_Diver9921** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oald8mt/) · 2 points
> 
> The banner upload workflow is a great example of something that sounds trivial but would eat hours manually. Getting AI to understand visual content and generate correct metadata for a bulk import is exactly the kind of task where the time savings compound.
> 
> The part I found most interesting is the skill improvement loop - having the workflow get better each time is basically what I do with CLAUDE.md files in coding but applied to non-coding tasks. The AI remembers what formatting each platform expects and stops asking clarifying questions after the first few runs.
> 
> One thing I would add for anyone trying similar non-coding workflows - start with the messiest most manual task you do regularly, not the most complex one. The ugly spreadsheet cleanup or repetitive email drafting is where you build trust in the tool before handing it anything important.
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oalg0hd/) · 1 points
> > 
> > Thanks for adding your perspective!

> **Hsoj707** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakulhs/) · 7 points
> 
> This is a great list, thanks for sharing. I've been trying to put together a list of the top use cases for Cowork.
> 
> Most specific task boils down to a combination of email management, research and analysis, document creation, process automation, content creation and repurposing and file organization.
> 
> Many of these will benefit from using the Claude in Chrome extension as OP mentioned.
> 
> I've written more about each use case here for those interested
> 
> [https://ainalysis.pro/learn-ai/category/ai-agent-use-cases/](https://ainalysis.pro/learn-ai/category/ai-agent-use-cases/)
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakw5dr/) · 2 points
> > 
> > Very nice, thanks for sharing your use cases!

> **Dry\_Pea3547** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakjsl7/) · 2 points
> 
> \> The workflow lives in a skill that improves automatically each time I use it on a new website. I also used the same skill as the basis for an article about how to write good schema tickets.
> 
> I'm bigly on the value of skills I think they are a massive under-tapped resource right now and building good skills can help you massively and create sharable playbooks and workflows for others.
> 
> Curious how you're really doing the improvement loop you described here? Do you say something like 'at the end of each use run the claude skill-creator skill to update the skill'
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakkb6m/) · 3 points
> > 
> > It works via the meta-skill that I mentioned at the end. You can check it out here and please feel free to ask more questions if anything remains unclear: [https://github.com/rebelytics/one-skill-to-rule-them-all](https://github.com/rebelytics/one-skill-to-rule-them-all)
> > 
> > > **SFCritic** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oas2xew/) · 2 points
> > > 
> > > I always worry with tools like this that it weights the wrong actions/conversations more than I'd want. Like, a learning from a conversation inaccurately reflects a challenge I had with my prompt vs. Claude's interpretation. Is there a way to adjust what reinforcement happen or not? Or, comparatively, have it make inferences on optimizations across insights—vs. specific insights draw from one conversation informing a change to the system? (Hope that makes sense. Thank you!!)
> > > 
> > > > **rebelytics** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oas5fvq/) · 2 points
> > > > 
> > > > You’re right to be cautious here. I review most of the optimisations before applying them and I regularly catch stuff that I decline. Mostly not because it would be harmful, but simply irrelevant. When you work with a system like this, I believe you have to maintain a certain level of control.
> > > > 
> > > > > **SFCritic** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oasdbt5/) · 2 points
> > > > > 
> > > > > Makes a ton of sense. Appreciate the validation. Have you tested it against any other similar approaches? Does anything exist that optimizes based on insights/patterns assessed from the analysis of multiple conversations?
> > > > > 
> > > > > > **rebelytics** · [2026-03-16](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaseiww/) · 2 points
> > > > > > 
> > > > > > I've used only this approach and refined it over countless sessions, but I can see your idea working in practice: You could log observations in every session like I do, but only move them to a list of "ready-to-apply" observations once they have been confirmed in at least one other session.
> > 
> > > **Oh\_hey\_a\_TAA** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oalh8w4/) · 2 points
> > > 
> > > This is brilliant and as I'm looking at implementing it I'm wondering if you've given thought to accidentally falling into a survivorship bias through the meta-skill? If the meta skill subtly but continually aligns Claudea output with your corrections and habits, won't the system lose its edge, or blunt it's tendency to present friction which indicates a potential opportunity for expansion / learning / better-way?
> > > 
> > > > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaljkxz/) · 1 points
> > > > 
> > > > I’ve thought about that and I try to make sure to keep adjusting my skills to what’s actually possible with Claude, as the developments are so rapid. For example, if I create a workaround for a missing or buggy feature, I also include a check to make sure that the workaround is actually still needed. The meta-skill also looks for potential to simplify skills, so that they don’t overgrow. Your concerns are definitely valid.
> > 
> > > **nucci\_mane** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oal0xso/) · 2 points
> > > 
> > > A fellow LoTR enthusiast and a heavy cowork user? I think we just became best friends 
> > > 
> > > > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oal2b4y/) · 2 points
> > > > 
> > > > I'm afraid I have to disappoint you regarding one of the two things: I'm not THAT much into LoTR. If you're willing to accept my apologies for using the reference as a non-enthusiast, maybe we can still be besties
> > > > 
> > > > > **nucci\_mane** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oal2nug/) · 2 points
> > > > > 
> > > > > Nobody is perfect. I forgive you friend 
> > > > > 
> > > > > > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oal2y7x/) · 1 points
> > > > > > 
> > > > > > Thank you!
> > > > > > 
> > > > > > **nucci\_mane** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oal2s9j/) · 2 points
> > > > > > 
> > > > > > Regardless I am definitely installing this meta skill 
> > > > > > 
> > > > > > > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oal3d2s/) · 1 points
> > > > > > > 
> > > > > > > Let me know how it goes and if any questions come up!

> **Awkward-Tale-6101** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakiyaa/) · 2 points
> 
> Based on your list I ran a similar trending topics for my book of business and that was super helpful. Thanks for posting.
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakjig5/) · 1 points
> > 
> > Awesome! Thanks for sharing!

> **Abject-Roof-7631** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakf091/) · 2 points
> 
> On your chrome extension tip at the end, do your prompts ask it to leverage the extension and if so, can you share the prompt?
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oaki2n1/) · 2 points
> > 
> > Not my prompts, but my skills. Here’s an example (copied from one of my custom skills): “ WebFetch 403 → Browser fallback When WebFetch returns a 403 or similar block (common with Cloudflare-protected sites), offer to try via the Chrome browser extension instead. Navigate to the URL and use get\_page\_text to extract content. Many documentation and help sites behind WAFs will block programmatic fetches but allow real browser access.”
> > 
> > > **michaelcrook\_ca** · [2026-03-25](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/ocfsmow/) · 2 points
> > > 
> > > The Webfetch fail in Cowork was kinda crazy making when I first started in Cowork. Seems its actually a known issue with the Cowork VM config because sites will work with Webfetch when the request comes from the Claude Chat part of the app.
> > > 
> > > I ended up turning on a free Tavily account and the Apify connector has its own browser tool and then created a web-access-policy skill that falls back from WebSearch -> Tavily -> Apify Browser -> Claude in Chrome
> > > 
> > > Now I have found a new Claude bug that connectors lose OAuth authentication silently so I have to reconnect the Tavily connector from time to time but the skill stops the task to ask me to do it.
> > > 
> > > **Abject-Roof-7631** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakx8y1/) · 2 points
> > > 
> > > Excellent. Is this in a master skill claude.md that loads each time or a skill you intended for specific use cases? Still getting my sea legs with skills. Thanks again.
> > > 
> > > > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oakz0cx/) · 1 points
> > > > 
> > > > I have a [CLAUDE.md](http://claude.md/) file in the local folder that I share with Cowork at the start of every task. It contains some general instructions, e.g. which skills to load for every task. The skills themselves live in your Claude account though (if you want them to work in Cowork). You can upload them via Settings > Capabilities. It makes sense to create separate skills for all use cases. Claude can write them for you and you can now copy them from a conversation in Cowork into your capabilities with one click, which is very comfortable.
> > > > 
> > > > > **Abject-Roof-7631** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oamf3sv/) · 2 points
> > > > > 
> > > > > Interesting, what skills are you typically loading each task?
> > > > > 
> > > > > Back to your other have chrome do the search for you, I find at times without telling it, it will do the search, at other times it forgets it hangs up on that search.
> > > > > 
> > > > > > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oamggq3/) · 1 points
> > > > > > 
> > > > > > One skill that’s called “conversation-defaults” that defines some general behaviours for Claude to apply in every conversation. The issue you mention in your last comment could be solved with that. Another skill I load in every session is my meta-skill that observes all tasks and logs skill improvement and creation potentials.
> > > > > > 
> > > > > > > **Abject-Roof-7631** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oamk7d3/) · 2 points
> > > > > > > 
> > > > > > > Brilliant my man.

> **CrunchingTackle3000** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oak7wva/) · 1 points
> 
> I like this.
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oak8clt/) · 2 points
> > 
> > Happy to hear that!

> **VeronicaFrances** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oak1cga/) · 9 points
> 
> That’s a pretty cool list!
> 
> > **rebelytics** · [2026-03-15](https://reddit.com/r/ClaudeAI/comments/1rubfbx/comment/oak1jbm/) · 1 points
> > 
> > Glad you like it!