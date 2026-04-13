---
title: "What are your best Cowork examples / use cases?"
source: "https://www.reddit.com/r/ClaudeAI/comments/1rn9ojd/what_are_your_best_cowork_examples_use_cases/"
author:
  - "[[Marathon2021]]"
published: 2026-03-07
created: 2026-04-12
description: "Would love to hear what others are doing - if anything - with Cowork? It’s scheduled tasks - kind of what drove some of the frenzy about th"
tags:
  - "clippings"
---
Would love to hear what others are doing - if anything - with Cowork? It’s scheduled tasks - kind of what drove some of the frenzy about that “lobster” thing … so of course, I decided to try to do the same thing with Cowork.

First up was having it write its own Telegram integration. It worked! It’s not real-time, I set it on a 5 minute polling interval. But I was chatting with Cowork via telegram.

Next, I decided to give it its own dedicated email inbox on a server I maintain. It checks hourly, so now I can just dictate an email and ask for something.

If I email what looks like a receipt to it, it will hold onto it for a week and then on Monday morning provide an emailed expense report to both me and my administrative assistant based on categories with the receipt attachments.

Daily, I have it perusing various Reddit tech subreddits for things related to my work. If it finds any interesting discussions it sends me an email at 7am with summaries and key insights.

It really is like a junior assistant - but I’m trying to think of \*more\* things to ask it to do. The “hey organize my downloads folder!” examples are nice but kind of boring IMO. I want this thing to be a junior employee.

So - what have you done that’s saving you some time?

EDIT: Oh, I forgot to mention one other. I have a few pretty low-priority simple static web pages up in Amazon S3 storage. There never really would be much traffic there in general, but if someone does hit them I want to know about it - but I don't want to check log files every day. So every week I have Cowork connect to S3, grab the full week's worth of log files, and then look for hits which *do not seem like routine web crawlers*. I'm not sure it's fully perfected that last part yet, I'm trying a few tests causing website hits from residential and commercial locations to see if it will pick them up. But if it can do that, that'd be pretty helpful for me too...

---

## Comments

> **floodassistant** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o951fil/) · 1 points
> 
> Hi [u/Marathon2021](https://www.reddit.com/user/Marathon2021/)! Thanks for posting to [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/). To prevent flooding, we only allow one post every hour per user. Check a little later whether your prior post has been approved already. Thanks!

> **Charming-Shoulder527** · [2026-04-06](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/oeniono/) · 0 points
> 
> Já tive a oportunidade de trabalhar em um coworking na **Paulista 302** e a experiência foi muito boa. O ambiente é bem organizado, com espaços amplos e salas de reunião que atendem bem às necessidades do dia a dia. É um lugar que proporciona conforto e praticidade para quem precisa de um espaço profissional.

> **Due\_Buy\_3520** · [2026-03-27](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/octi3ey/) · 1 points
> 
> I've got a new YT channel (8 months old). Had Cowork analyse my youtube channel and tiktok posts and provide clear insights on how and where TT was funnelling viewers for conversion off platform to youtube; mapped specific posts against youtube engagement spikes. Then ran audience, sentiment and trend analysis on both platforms to highlight the audience segments which were strongest. Then extrapolated to look at similarly sized channels in my niche, the top 10 biggest channels in my niche, and the channels they use most to maintain community momentum, as well as grow. Finally this was put into context for my channel and showed audience segment opportunities that I'm not capitalising on already but aren't oversaturated by competitors, a heatmap of channels that I should utilise, and a bunch of strategic positioning based on the SMART goals I've set.
> 
> I went straight to cowork, didn't mess around with chat first - so it would be interesting to see if I can get the same or similar outputs from just chat (and indeed may try and compare with chatGPT which is my daily driver). Good outputs so far though
> 
> So far I've given it access to my Google Drive for this project. Looking for other useful integrations; Gmail won't be of value at this point. I would love a Pinterest connector but the methods that have been recommended to me incl. building a custom connector via Rube / using Cdata don't work. I would LOVE a way to automate pinterest uploads and admin, then draw actionable insights

> **SignificantStudio178** · [2026-03-25](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/occiyk9/) · 1 points
> 
> I’m trying to spend less time on social media so I set up Claude Cowork to scroll my Instagram, X, and LinkedIn, and just summarize the posts based on what I want for the day, it’s a bit trashy for Instagram because to many videos, but it’s working fine for now

> **FreshPhase** · [2026-03-18](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/ob1knoj/) · 1 points
> 
> I recently used claude to help me make decisions in the type of equipment to buy to upgrade my home network for my internet. Then i had claude setup and build the jellyfin arr stack so i ever have to pay for movies and tv shows again it took about 3 days but claude was able to help me setup 8 vlans for my home network and configure opnsense and all the firewall rules and configure all the settings of the arr stack. Its Quiite remarkable.
> 
> AND
> 
> And this is a big one. Ive been using claude code since august ive developed many things with it (nothing i ever tried to make profit fun) just quality of life tools to simplify things. But i FINALLY got a basic understsnding of git and have gotten comfortable using the command line.
> 
> I have vibe coded the shit out of alot of stuff in this past 6ish months but this is the first time because of the setup l. Claude couldnt do everything for me because some things were on different computers we were working on and claude cowork gets messy and has some issues when you use it from 2 computers at the same time.
> 
> So u had to do a lot of stuff myself at times. But it was really helpful when claude could go in the browser and make changes via an api that would have taken me a lot longer if i had ti do it all by hand.
> 
> Its quite remarkable how powerful this technology is becoming im not super smart but im not dumb either and ive been able to work ai in a variety of ways that are beneficial. I know nothing about networks and im obsedded in learning more and expanding my capbabilites in my little homelab.
> 
> Looking forward to many more projects to come with cowork another big one i wanna tackle is replacing google drive/google photos with nextcloud and immich

> **Find-me-at-AMI** · [2026-03-17](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/ob0ivq6/) · 1 points
> 
> Using in combination with Claude for Chrome T built two apps in Power Automate and Copilot Studio for handing my email and distributing work including adaptive cards in Teams. It takes time. But it’s incredibly helpful. It just works. Iteration for sure. But no comparison to me doing the work

> **Frequent-Skill3507** · [2026-03-17](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/oaxdjs9/) · 1 points
> 
> Not necessarily the most "scaleable" use case in that sense, but for me I am using Claude Cowork for my Vibe Code Project as Test Manager
> 
> 1. Creating Test Cases based on Feature documentation of Codebase with Edge Cases & Happy Path, Priority, etc.
> 2. Run these Cases with Cowork Browser
> 3. Consolidate and attach Test result in Test Case Overview based in Notion and provide feedback, where Gaps can be capitalized
> 4. Make Test Result output cursor friendly for further code refinement/adjustment.

> **a\_longo88** · [2026-03-13](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/oaal5zj/) · 1 points
> 
> How much usage does one generally get on a Pro plan when using cowork?

> **ScholarOk6790** · [2026-03-09](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9kmrvq/) · 1 points
> 
> [u/Marathon2021What](https://www.reddit.com/user/Marathon2021What/) about Skills, did you try it?

> **Sea-Concern8019** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9azbsg/) · 1 points
> 
> Folder organization. Saved perhaps 30 mins Tried using it to find me camper for my business, but the perf was way too slow, and chewed through my tokens. Easier for me to do a google search. P

> **HighFivePuddy** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9atv44/) · 0 points
> 
> I have it doing a complete SEO strategy. It came up with a six phase plan that includes a review of our website, competitor analysis, gap analysis, keyword research/planning etc.
> 
> It’s literally 20x faster than doing it all myself. It’s god damn magic!
> 
> > **Theresellqueen** · [2026-03-26](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/oclyx5h/) · 1 points
> > 
> > I would love to know how you set this up because I could definitely use something like this
> > 
> > **girl-who-dreams-big** · [2026-03-13](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/oa8ongt/) · 1 points
> > 
> > Would love to know how you’ve set it up
> > 
> > **Marathon2021** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9b37mn/) · 0 points
> > 
> > But is that **Cowork** doing it? That sounds like something that Claude or Claude Code could do…
> > 
> > > **HighFivePuddy** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9b5qz9/) · 1 points
> > > 
> > > It’s navigating search console, GA, Similarweb and other tools, so Claude chat wouldn’t be able to do it. Code sure, but it’s easier with cowork.
> > > 
> > > > **herthalas** · [2026-03-09](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9hhtof/) · 2 points
> > > > 
> > > > Do you mind sharing how you set it up and the prompt you gave it to access those sites?
> > > > 
> > > > > **kaancata** · [2026-03-29](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/od6dqjm/) · 1 points
> > > > > 
> > > > > I have an extensive setup for competitor analysis as well as optimizing my own search ads across all of my clients' accounts. You just give claude code access to GSC API, GA API, GTM API, GA4 API and then you're able to prompt away, and have a conversation about your data.

> **holden-monaro-1969** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o997g1c/) · 3 points
> 
> "Daily, I have it perusing various Reddit tech subreddits"
> 
> Assume this is done through the API? I can't get the Reddit API to work.
> 
> > **Marathon2021** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o99o5s7/) · 3 points
> > 
> > Nope.
> > 
> > Just gave it a half a dozen or so subreddits to watch for certain topics in the previous 24 hours and then summarize interesting ones that match the criteria I’m looking for.
> > 
> > Nothing other than that. Cowork does have Chrome on the MacBook it’s working from, I don’t know if it’s using that or not.
> > 
> > Notably, I’m not trying to have it crawl Reddit incessantly. I learned about throttling on some previous automation projects on n8n so I’ve approached things in a more lightweight fashion now.

> **\[deleted\]** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o97y5fs/) · 1 points
> 
> Yep, my "hold onto these expense receipts and then email me a report on Monday" kinda fits into that pattern - although I think Claude split it between 2 jobs, 1 in my email inbox handler for it where it'll write the receipt to a folder and OCR the necessary metadata out of it, and then the second task just checks that on Mondays and bundles it into a report for me.
> 
> > **Marathon2021** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9934xn/) · 1 points
> > 
> > Yep, my "hold onto these expense receipts and then email me a report on Monday" kinda fits into that pattern - although I think Claude split it between 2 jobs, 1 in my email inbox handler for it where it'll write the receipt to a folder and OCR the necessary metadata out of it, and then the second task just checks that on Mondays and bundles it into a report for me.

> **Mitrix** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o97c27t/) · 1 points
> 
> Maybe someone has the answer. I use Claude Code CLI and often just start some prompts at home while I go to work. Would I be able to just interface with Claude in the same way through Cowork except getting message updates when it completes tasks?
> 
> To be clear the remote feature would be ideal but it's not available on Pro

> **Hsoj707** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96qhti/) · 4 points
> 
> My top Cowork use cases are for managing email, compiling research from many sources, creating documents & PDFs, and working in Excel. I've seen other people use it to organize folders and clean hard drive space.
> 
> [https://ainalysis.pro/learn-ai/category/ai-agent-use-cases/](https://ainalysis.pro/learn-ai/category/ai-agent-use-cases/)
> 
> This page has some of Cowork's top use cases in detail.

> **AlleyCat800XL** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96atdy/) · 1 points
> 
> I asked it to do one of the examples it give, organise and rename my screenshot files. It got to a larger file, decided it was larger than it could handle and gave up. I moved on.

> **artfuldawdg3r** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95t59z/) · 26 points
> 
> 1. I have it auto update a large revenue model with the new forecast
> 2. I have it create a prep document for me to read before I run a pipeline meeting with reps
> 3. I have it update board slides based on progress towards al certain metrics
> 4. I have it run a sync that collects and organizes all my meeting notes
> 5. I receive a daily digest each morning with all my upcoming meetings, then it searches my meeting notes for relevant and recent meetings and lets me know if there’s any recent relevant convos as a reminder
> 6. I have various team and company wide meetings and updates I need to give, it does all the prep for those now, mostly by reviewing the CrM old my meeting notes
> 7. Before I go to a conference I feed it the attendees, connect it to Apollo and have it write bios on people I want to meet there and reach out to some of them, I read it on the plane
> 8. I run complex pricing and margin scenarios for large deals
> 9. I’ll get a digest Friday afternoon of key emails I go got to respond to so I can catch up at the end of the week
> 
> This has been a game changer for me the last few weeks
> 
> > **Steroids\_** · [2026-03-12](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9z26k9/) · 1 points
> > 
> > Any additional details you can share? How is it doing quality of these things? Is it without you reviewing? do you see issues, have you cross checked? Did you already have really good processes that made this easy or did you adapt more to make this happen.
> > 
> > > **artfuldawdg3r** · [2026-03-12](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9z3hr6/) · 2 points
> > > 
> > > I did manually checks and refinement the first time then after that it’s able to repeat reliably. You just need to put in the work the first time
> 
> > **ScholarOk6790** · [2026-03-09](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9kkhmx/) · 1 points
> > 
> > Hi, These tasks are amazing!! Could you share a little bit more about item 8?
> > 
> > Congrats.
> > 
> > > **artfuldawdg3r** · [2026-03-10](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9lbh2a/) · 1 points
> > > 
> > > I have a spreadsheet of costs that I copy into the folder, along with a previously acceptable analysis. I then either have it pull meeting notes or other info to build the margin analysis.
> > > 
> > > Like most things, having done it done it once well serves as great training data
> 
> > **Vaukins** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9adq8y/) · 1 points
> > 
> > Are you not concerned with uploading sensitive company information to some server?
> > 
> > > **artfuldawdg3r** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9bh2py/) · 1 points
> > > 
> > > It’s already on some server , and that server has ai (Microsoft/google) .
> 
> > **BlankedCanvas** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o993ow3/) · 3 points
> > 
> > I love Cowork/Claude Code’s use cases. But in my experience, its a bit of a hassle going from a cloud based workflow (Google Docs, Slides, etc) to working purely off local files. Is that a tradeoff you made (manually save them to the cloud each time for sharing) or is there a way around that hurdle?
> > 
> > > **j3rrylee** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9a2p1j/) · 3 points
> > > 
> > > I share the same pain, we use Google workspace at my company. I’m waiting for the day where Claude can read/write directly to Google files like gsheet.
> > > 
> > > > **drwbry** · [2026-03-10](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9r7nfd/) · 2 points
> > > > 
> > > > I use rclone to sync (multidirectional) a Google Drive folder with a local folder. I also have a laptop and desktop in which it syncs across as well - enabling me to pickup where I left off on the other device. Just set it up today, but so far it has worked well. You can schedule the sync to run at certain intervals or in my case I created a batch file that I run in a couple of seconds when I'm done with Cowork that does the sync
> > 
> > > **artfuldawdg3r** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o995llg/) · 3 points
> > > 
> > > I’ve never liked Google. I’ve been at startups on the commercial side for a while and it’s always the tech team go with Google. I immediately ask for a Microsoft license when I join a new org so I can use real excel.
> > > 
> > > Microsoft is in the cloud, and can be used as collaborative documents , you can just also have a copy in your drive. I point Claud at my one drive so I can easily share files and collaborate if I need to
> 
> > **Marathon2021** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o964s42/) · 2 points
> > 
> > That's amazing!
> > 
> > Yeah, I think there are so many more things I could unlock -- but which would require giving it access to my email, calendar, company data, etc. We've approved *some* LLMs - but not this one in particular. So for now, I kind of have to keep it closed off and focusing on more simple things like collecting my expense reciepts, looking for market insights on the Internet, etc.

> **T-LAD\_the\_band** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95q4wp/) · 3 points
> 
> Built a train and bus tracker website for belgium that collects all data and keeps history to measure the delays Build a recipe-website scraper that scrapes about 10 big websites, download the recipes and ingredients and pours them in one big site where I can filter bu recipe, type, time I have to cook etc.
> 
> > **Marathon2021** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96cebc/) · 1 points
> > 
> > Cool!

> **Socrav** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95q0y3/) · 13 points
> 
> Data reports, exec reports and turning them into presentations.
> 
> It’s crazy as to how good the outputs are, especially when you give a PowerPoint template or a word template.
> 
> Easily saving me days of work.
> 
> > **Marathon2021** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96cc7p/) · 3 points
> > 
> > Oh yeah, that's something that has been wild. I asked it to create a detailed Powerpoint presentation on something, gave it the central thesis and clued it in where to look for supporting data points, and it created a very solid powerpoint presentation. I mean, I had to go in and fix a couple tiny formatting things, but that was it. Then, I simply provided the hex codes for my company's branding standards and asked it to redo it again with that and it did.
> > 
> > Then I asked it to create a full detailed Word document report on that, and it did that as well - with amazing adherence to formatting and structuring guidance I gave it.
> > 
> > This was with Opus. It would have taken me a couple weeks to write that report.
> > 
> > > **Apart\_Pop8040** · [2026-03-21](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/obqrije/) · 1 points
> > > 
> > > Why use Cowork and not just Claude for that?
> 
> > **recess\_dropout** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o967fs8/) · 4 points
> > 
> > Super interesting! What types of data do you feed it to populate the exec reports/powerpoint?
> > 
> > > **Socrav** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96be0y/) · 2 points
> > > 
> > > Honestly, screenshots of the data (licensing). Since it’s corp data I have to obscure a bunch of fields so I take snippets and tell what it is. Then prompt it do an analysis from one architecture type to the other and recommend the best course of action to reduce cost/etc.
> > > 
> > > It’s such a simple workflow but the results are GOOD.
> > > 
> > > I’ll grab my prompt when I get home to show.
> > > 
> > > > **Ok\_Escape\_7412** · [2026-03-09](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9fckhb/) · 2 points
> > > > 
> > > > what was the prompt?
> > > > 
> > > > > **Socrav** · [2026-03-09](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9hs09e/) · 2 points
> > > > > 
> > > > > [https://github.com/djelp/prompts-and-stuff/tree/main/uc-migration-assessment](https://github.com/djelp/prompts-and-stuff/tree/main/uc-migration-assessment)
> > > > > 
> > > > > I popped it in a git. My actual prompt is a lot more specific to my role, but you get the general idea.
> > > > > 
> > > > > I distilled this prompt down from having conversation back and forth in QuoteWork, and then asked for it to do an output to a file for me to use next time.
> > > 
> > > > **recess\_dropout** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96eens/) · 1 points
> > > > 
> > > > 🙏
> > > > 
> > > > > **Socrav** · [2026-03-09](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o9hs0pa/) · 3 points
> > > > > 
> > > > > [https://github.com/djelp/prompts-and-stuff/tree/main/uc-migration-assessment](https://github.com/djelp/prompts-and-stuff/tree/main/uc-migration-assessment)
> > > > > 
> > > > > I popped it in a git. My actual prompt is a lot more specific to my role, but you get the general idea.
> > > > > 
> > > > > I distilled this prompt down from having conversation back and forth in QuoteWork, and then asked for it to do an output to a file for me to use next time.

> **Secret\_Law9332** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95pd33/) · 1 points
> 
> I’m interested to know as well bc I’m so far behind knowing what’s even possible. When ai first came out mainstream I was keeping up with it all but then I didn’t really need it anymore and it got overwhelming with all the updates. And now I just can’t even seem to fathom what is possible… but I need to learn for my new business.

> **teosocrates** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95jsjl/) · 1 points
> 
> Cowork only crashes on my computer I had to use code and it ran out of credit limits before it finished the first task. Cursor and antigravity and even codex feels more stable, on windows 11 can’t get Claude working

> **Flashy-Bandicoot889** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95en7s/) · 5 points
> 
> This seems like a solution in search of a problem. What I mean is I'm not sure how any of that saves you much time energy or effort and it almost seems like this will be more work than not. I'm super curious about ways that CoWork actually does save time and effort, but I've yet to find many. I am hopeful someone will respond in this post with good examples.
> 
> > **Marathon2021** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95nf4z/) · 4 points
> > 
> > I mean, you’re not wrong :)
> > 
> > I think the wall I have hit for now is for it to really become more of an assistant in my day-to-day life, I’d need to be giving it access to my email, calendar, messaging apps, etc. and I am just not willing to do that at the moment.
> > 
> > > **Flashy-Bandicoot889** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95oz1d/) · 3 points
> > > 
> > > Me neither. The privacy implications are big.

> **klewnscan** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o959osw/) · 13 points
> 
> I’ve been looking for great ideas to. Expenses was my first thought… Our process is manual and tedious, and I avoid it for too long and my expenses build up. It has to be done a certain way, coded properly for the accountant with specific tax’s called out, a fussy excel sheet has to be used, receipt images pasted in resized and positioned, pdf created. Blah! I spent a half hour describing the manual process to Claude, and had it write a Claude.md file for cowork. Gave it a folder with the template and inbox for receipt images and let it go for it. First try I got an error free expense report ready to submit. Blown away how well it worked
> 
> > **FortiTree** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95eud9/) · 1 points
> > 
> > I had a similar idea to have it do some recurring task with looking up in weekly/monhthly report and I was thinking to just give it a folder, provide a md to explain how it should process the files, and just drop the report each week to it. But I tried to analyze the current report first via chat and it just gave a script to run locally. So now I don't need the co-work idea anymore. Since the task now is just run the script, which Im not sure it's worth spending token on. I rather do it myself.

> **this\_for\_loona** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o958vhu/) · 2 points
> 
> Can you tell me what your setup is and your initial configuration for cowork?
> 
> > **Marathon2021** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95n730/) · 1 points
> > 
> > My setup isn’t complicated. I had recently reformatted a 2020 Macbook, so I just gave it that. I did not give it access to my email, calendar, etc. It’s just got Chrome, a desktop and filesystem, and my $20 pro plan.
> > 
> > Granted, I burned through credits fast building those capabilities and setting them on frequent refresh intervals, but I’ve stepped the polling way back for now.
> > 
> > > **this\_for\_loona** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o95rrn9/) · 1 points
> > > 
> > > Thank you. I’m debating getting a MacBook Air or some such to play around with Cowork but I’m not sure it’s worth it. I have a WinNUC but it holds all my important stuff so I’m not wanting to open that up to the intertubes. Your idea of polling email/signal to build its activity list and the like is an interesting one that i might be able to use.
> > > 
> > > When you say you burned through credits, how much time did this take you?
> > > 
> > > > **Marathon2021** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96bvuz/) · 1 points
> > > > 
> > > > It only took me a few days to build the automations. But I had a pretty aggressive checking schedule - especially on the Telegram one at 5 minute intervals, and yeah even though this is 'local' - each scheduled task *will* burn down some credits on your account.
> > > > 
> > > > So I topped up about $50 more during the week until I figured that out. For now I have the telegram integration "off" (i.e.: set to manual execution) - if I ever need it again I can turn it back on. And I set the email checking down to twice a day, 4am and 4pm. The other scheduled jobs - including backing *itself* up - still fire ... but I think with light usage I could definitely keep these executions to about $10-20 per month.
> > > > 
> > > > > **this\_for\_loona** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o96h10s/) · 1 points
> > > > > 
> > > > > So the pure pro account was not enough to keep your agent running? You experienced overages based on your initial scheduling? That seems excessive and reduces the benefit of setting these things up no?
> > > > > 
> > > > > > **Marathon2021** · [2026-03-07](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o97i1zs/) · 1 points
> > > > > > 
> > > > > > I think it might be enough to keep it running with the handful of daily / weekly jobs I have, plus a 2x daily email check. I suspect i'll be able to have that operate within the $20 plan - but I'm still fine-tuning.
> > > > > > 
> > > > > > I mean, yeah - sure ... it'd be cool to have an always-ready AI assistant with a full Macbook at it's disposal just a Telegram chat away and see them respond in real-time. I mean, that was one of the main draws of the "lobster" thing. But honestly, after building the Telegram integration ... if it was free, sure, I'd leave it on. But mostly it's a little bit of a gimmick so I turn it off. The outbound/inbound email pathway is really the most important one because now it can proactively / per-schedule create various outbound emails of expense reports, web log traffic reports, etc. for me. But then sometimes I want to reply to those and ask it a question or have it alter it's behavior, and it goes and makes its modifications.
> > > > > > 
> > > > > > If anything, I would probably try to increase the email polling interval to maybe once every 2 hours during business hours and then maybe once or twice overnight.
> > > > > > 
> > > > > > > **this\_for\_loona** · [2026-03-08](https://reddit.com/r/ClaudeAI/comments/1rn9ojd/comment/o98ixca/) · 1 points
> > > > > > > 
> > > > > > > Thank you for your help.