---
title: "Getting good results from Claude Code (dzombak.com)"
source: "https://news.ycombinator.com/item?id=44836879"
author:
  - "[[ingve]]"
published: 2025-08-08
created: 2026-04-12
description: "Getting good results from Claude Code (dzombak.com) - by ingve on Hacker News"
tags:
  - "clippings"
---
[https://www.dzombak.com/blog/2025/08/getting-good-results-from-claude-code/](https://www.dzombak.com/blog/2025/08/getting-good-results-from-claude-code/)

---

## Comments

> **aosaigh** · [2025-08-08](https://news.ycombinator.com/item?id=44837672)
> 
> I’m just today after having my first real success with Claude (and generally with coding agents). I’ve played with Cursor in the past but am now trying Claude and others.
> 
> As mentioned in the article, the big trick is having clear specs. In my case I sat down for 2 hours and wrote a 12 step document on how I would implement this (along with background information). Claude went through step by step and wrote the code. I imagine this saved me probably 6-10 hours. I’m now reviewing and am going to test etc. and start adjusting and adding future functionality.
> 
> Its success was rooted in the fact I knew exactly how to do what it needed to do. I wrote out all the steps and it just followed my lead.
> 
> It makes it clear to me that mid and senior developers aren’t going anywhere.
> 
> That said, it was amazing to just see it go through the requirements and implement modules full of organised documented code that I didn’t have to write.
> 
> > **fooster** · [2025-08-09](https://news.ycombinator.com/item?id=44843263)
> > 
> > I get excellent results and don’t do anything like that. Basically I ask Claude to write code as I do. A small step at a time. I literally prompt it to do the next step I’d do and so on and so forth. I accept all changes immediate and then commit after every change and then review the diff. If Claude did some badness then I ask it to fix that. I typically also give references to existing code that I want it to model or functions to use.
> > 
> > This gives me excellent results with far less typing and time.
> > 
> > > **kookamamie** · [2025-08-09](https://news.ycombinator.com/item?id=44844127)
> > > 
> > > Exactly this. In my view people over-think the use of Claude in many cases.
> > > 
> > > > **bamboozled** · [2025-08-09](https://news.ycombinator.com/item?id=44846854)
> > > > 
> > > > Because it's marketed as AI and it takes a while to figure out that it's really quite limited. In my opinion there's not a lot of intelligence going on, It's great at translating a requirement and giving you an approximation of what you asked for, but there isn't really any "thinking" going on.
> > > > 
> > > > I think when they advertise "thinking" it just does a few more iterations of giving you the closest "number in your head from the clues you've given it (requirements).
> > > > 
> > > > I saw someone once say that LLMs are a kind of "word calculator" and I feel that's quite a good description.
> > > > 
> > > > > **mnky9800n** · [2025-08-09](https://news.ycombinator.com/item?id=44847316)
> > > > > 
> > > > > It is much better at making todo lists than it is at completing them successfully. But I appreciate having “someone to chat with” when I’m puzzling over codes or what to do next. Especially when I’m getting started on something new I don’t know a lot about.
> > > > > 
> > > > > **v5v3** · [2025-08-09](https://news.ycombinator.com/item?id=44846934)
> > > > > 
> > > > > To be fair, if you turn on thinking mode on Llms and see the output their is some thinking/reasoning.
> > > > > 
> > > > > A simple example:
> > > > > 
> > > > > Prompt:Make it yellow
> > > > > 
> > > > > Think: the user wants something yellow but hasn't said what it is. Previously the user talked about creating a Button, so it must be the button but I should clarify by asking
> > > > > 
> > > > > Response: is it the button that you want yellow?
> > > > > 
> > > > > > **bamboozled** · [2025-08-09](https://news.ycombinator.com/item?id=44850411)
> > > > > > 
> > > > > > I guess it becomes philosophical, what is thinking? What I’ve notice it does all that but misses the absolute most obvious things or gets incredibly basic things wrong.
> > > > > > 
> > > > > > **timacles** · [2025-08-09](https://news.ycombinator.com/item?id=44847313)
> > > > > > 
> > > > > > this part of LLMs is the pre-programmed human logic. The LLMs arent actually thinking, they're just going through a defined IF THEN loop based on whatever weights, if there is some ambiguity in a prompt the LLM is just programmed to prompt for more info. Its not actually thinking it needs to ask anything, its just coming back with low precision probability.
> > > > > > 
> > > > > > All of the recent improvements in the LLM's "thinking" have just been layers of programming on top of its statistical models. Which is why its becoming clear LLMs are really not advancing that much.
> > 
> > > **childintime** · [2025-08-09](https://news.ycombinator.com/item?id=44845282)
> > > 
> > > I don't understand why the diff isn't part and parcel of the AI dialog..
> > > 
> > > > **solumunus** · [2025-08-09](https://news.ycombinator.com/item?id=44845718)
> > > > 
> > > > In VS code it shows me a diff with every contribution.
> > > > 
> > > > > **v5v3** · [2025-08-09](https://news.ycombinator.com/item?id=44846938)
> > > > > 
> > > > > Same with other IDEs like cursor.
> > > > > 
> > > > > But Claude Code is a command line tool.
> > > > > 
> > > > > > **mnky9800n** · [2025-08-09](https://news.ycombinator.com/item?id=44847367)
> > > > > > 
> > > > > > You can use the Claude code add on and it shows diffs in vscode and you can highlight code and ask questions. But it still works in the vscode terminal like Claude code the cli. It’s quite nice actually since you can flip back and forth.
> > 
> > > **hoppp** · [2025-08-09](https://news.ycombinator.com/item?id=44846392)
> > > 
> > > This is how I do it. Instead of writing a large amount, I just make it generate one function at a time.
> > > 
> > > I dont want it to replace me, I replace reading the docs and googling or repetitive tasks.
> > > 
> > > Its a hit or miss sometimes but I get to review every snippet.
> > > 
> > > If I would generate alot of code at once like for a full project I would get brainfuck reviewing it.
> > > 
> > > I keep my normal development flow and iterate, no waterfall
> > > 
> > > **golergka** · [2025-08-09](https://news.ycombinator.com/item?id=44847462)
> > > 
> > > Sometimes I do OP’s approach, sometimes yours, but in all cases, writing down what you need done in detailed English gets me to a better understand of what the hell I’m even doing.
> > > 
> > > Even if I wrote the same prompts and specs and then typed everything myself, it would have already been an improvement.
> > > 
> > > **bamboozled** · [2025-08-09](https://news.ycombinator.com/item?id=44846834)
> > > 
> > > I've come to the conclusion that the best use for "AI" it typing faster than me. I work at a place with a very well defined architecture so basically implementation is usually very straight forward, Claude can follow it because as you said, it's following a spec of sorts.
> > > 
> > > On the other hand, there has been quite a few moments in the last week where I'm actually starting to question if it's really faster. Some of the random mistakes can be major depending on how quickly it gets something wrong. I feel like a computer game, I need to save every time I make progress (commit my work).
> > > 
> > > I'm still on the fence about it honestly.
> > > 
> > > **swat535** · [2025-08-09](https://news.ycombinator.com/item?id=44846114)
> > > 
> > > Wouldn’t it be faster to write the code yourself at that point ?
> > > 
> > > What’s the advantage here for you with a process like this?
> > > 
> > > In your flow you also have multiple review steps and corrections as well adds even more friction.
> > > 
> > > I can see the advantage in what parent is describing however.
> > > 
> > > > **hoppp** · [2025-08-09](https://news.ycombinator.com/item?id=44846421)
> > > > 
> > > > Sometimes its faster I write it, sometimes its not.
> > > > 
> > > > I prompt like: give me go structs for this json "pasted json" and write 2 functions to save it and load it from "nosql db I use"
> > > > 
> > > > That basically speeds up writing glue code
> > > > 
> > > > The business logic I write myself
> > > > 
> > > > Its faster to do the business logic myself than review what the Ai did.
> > > > 
> > > > > **cratermoon** · [2025-08-09](https://news.ycombinator.com/item?id=44846867)
> > > > > 
> > > > > \> give me go structs for this json "pasted json" and write 2 functions to save it and load it from "nosql db I use"
> > > > > 
> > > > > Those tools existed before LLMs and were local, fast, and most importantly *free*.
> > > > > 
> > > > > Why people continue to re-invent tools and workflows we already have, I don't know. Perhaps they just like to be able say "but this uses *AI*!"
> > > > > 
> > > > > > **hoppp** · [2025-08-09](https://news.ycombinator.com/item?id=44848337)
> > > > > > 
> > > > > > It was an example
> > > > > > 
> > > > > > I only use what I need, plain and simple, and its free yup, works local too.
> > > > > > 
> > > > > > Llms suck at large projects, so I break it down to small simple things, what I wrote is an example of a small thing, I keep the tasks that large.
> > > > > > 
> > > > > > I can write my own code. I just use LLMs to speed up. I use whatever workflow suits me the most and saves me from typing much
> > > > > > 
> > > > > > Code generating with LLMs is a reinvention of local tools that used to generate code, yes. Its an advanced autocomplete.
> > > > > > 
> > > > > > But give me another tool that can generate code from natural language full of typos. I dont think your claim that it existed before llms is correct at all. Ever code generation task could be handwritten to be reusable but that takes developer hours
> > > > > > 
> > > > > > > **cratermoon** · [2025-08-10](https://news.ycombinator.com/item?id=44852666)
> > > > > > > 
> > > > > > > \> give me another tool that can generate code from natural language full of typos
> > > > > > > 
> > > > > > > Give me a tool that doesn't generate code full of errors.
> 
> > **andrewgleave** · [2025-08-08](https://news.ycombinator.com/item?id=44841716)
> > 
> > Yeah. Read “Programming as Theory Building” by Naur \[1\] to understand why you need to still need to develop a theory of the problem and how to model it yourself lest the LLM concoct (an incorrect) one for you.
> > 
> > \[1\] [https://gwern.net/doc/cs/algorithm/1985-naur.pdf](https://gwern.net/doc/cs/algorithm/1985-naur.pdf)
> > 
> > > **UncleOxidant** · [2025-08-09](https://news.ycombinator.com/item?id=44843506)
> > > 
> > > I don't know how many times now that I've seen these things claim to have run the code and show me the hallucinated output and then go on to develop an incorrect theory based on that hallucinated output.
> > > 
> > > > **antonvs** · [2025-08-09](https://news.ycombinator.com/item?id=44844048)
> > > > 
> > > > I've never seen the CLI coding tools do anything like that. They're designed to integrate with the tools. If you're just using a chat interface then yes, you're likely to get some inconsistent behavior.
> > > > 
> > > > > **UncleOxidant** · [2025-08-09](https://news.ycombinator.com/item?id=44847251)
> > > > > 
> > > > > This was Gemini CLI in kilocode. Does it often. Sometimes it even imagines that it's done a build when it hasn't - imagines build errors and then sets out to fix them. I have it set so that it asks permission prior to running commandline tools so I know it hasn't actually run make.
> > > > > 
> > > > > > **antonvs** · [2025-08-10](https://news.ycombinator.com/item?id=44852490)
> > > > > > 
> > > > > > I use Gemini CLI daily (work is a Google shop), directly (no kilocode). I've never seen anything like that.
> > > > > > 
> > > > > > I wonder if it could be something to do with the kilocode integration.
> > > > > > 
> > > > > > But, I do more commonly run with permission required for many operations, because I find it works much better if I help it every now and then. It can get stuck on some pretty simple stuff.
> > 
> > > **croemer** · [2025-08-09](https://news.ycombinator.com/item?id=44845098)
> > > 
> > > This article has been share a dozen times on HN, if you want to see some discussion check out: [https://hn.algolia.com/?dateRange=all&page=0&prefix=true&que...](https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=programming%20as%20theory%20building&sort=byPopularity&type=story)
> > > 
> > > **Xmd5a** · [2025-08-09](https://news.ycombinator.com/item?id=44845381)
> > > 
> > > We need to ask LLMs to generate documentation, diagrams, FAQs in addition to code then. We all know what this means: keeping them up to date.
> > > 
> > > Has anyone managed to setup a "reactive" way to interact with LLMs in a codebase, so that when an LLM extend or updates some part of the territory, it also extends or updates the map?
> > > 
> > > **misja111** · [2025-08-09](https://news.ycombinator.com/item?id=44844701)
> > > 
> > > Amazing, the article is 40 years old and still totally relevant today. And even more amazing is that many of today's IT managers seem unaware of its points.
> > > 
> > > > **sitkack** · [2025-08-09](https://news.ycombinator.com/item?id=44844747)
> > > > 
> > > > This could be taken as praise.
> > > > 
> > > > I take it as a manifestation of the temporal bigotry in computer science. That anything not new is bad, which is absolutely untrue. Old is not bad, new is not good. Where something exists in time has almost not bearing on its quality. Most knowledge and good ideas do not survive.
> > 
> > > **malshe** · [2025-08-08](https://news.ycombinator.com/item?id=44842671)
> > > 
> > > Thanks for sharing this article.
> 
> > **wiremine** · [2025-08-09](https://news.ycombinator.com/item?id=44843003)
> > 
> > \> As mentioned in the article, the big trick is having clear specs
> > 
> > I've been building a programming language using Claude, and this is my findings, too.
> > 
> > Which, after discovering this, makes sense. There are a LOT of small decisions that go into programming. Without detailed guidance, LLMs will end up making educated guesses for a lot of these decision, many of which will be incorrect. This creates a compounding effect where the net effect is a wrong solution.
> > 
> > **mft\_** · [2025-08-08](https://news.ycombinator.com/item?id=44837795)
> > 
> > Can you (or anyone) share an example of such a specification document? As an amateur programmer experimenting with CC, it would be very helpful to understand the nature and depth of the information that is helpful.
> > 
> > > **jamesponddotco** · [2025-08-08](https://news.ycombinator.com/item?id=44838018)
> > > 
> > > I have multiple system prompts that I use before getting to the actual specification.
> > > 
> > > 1\. I use the Socratic Coder\[1\] system prompt to have a back and forth conversation about the idea, which helps me hone the idea and improve it. This conversation forces me to think about several aspects of the idea and how to implement it.
> > > 
> > > 2\. I use the Brainstorm Specification\[2\] user prompt to turn that conversation into a specification.
> > > 
> > > 3\. I use the Brainstorm Critique\[3\] user prompt to critique that specification and find flaws in it which I might have missed.
> > > 
> > > 4\. I use a modified version of the Brainstorm Specification user prompt to refine the specification based on the critique and have a final version of the document, which I can either use on my own or feed to something like Claude Code for context.
> > > 
> > > Doing those things improved the quality of the code and work spit out by the LLMs I use by a significant amount, but more importantly, it helped me write much better code on my own because I know have something to guide me, while before I used to go blind.
> > > 
> > > As a bonus, it also helped me decide if an idea was worth it or not; there are times I'm talking with the LLM and it asks me questions I don't feel like answering, which tells me I'm probably not into that idea as much as I initially thought, it was just my ADHD hyper focusing on something.
> > > 
> > > \[1\]: [https://github.com/jamesponddotco/llm-prompts/blob/trunk/dat...](https://github.com/jamesponddotco/llm-prompts/blob/trunk/data/socratic-coder.md)
> > > 
> > > \[2\]: [https://github.com/jamesponddotco/llm-prompts/blob/trunk/dat...](https://github.com/jamesponddotco/llm-prompts/blob/trunk/data/brainstorm-specification.md)
> > > 
> > > \[3\]: [https://github.com/jamesponddotco/llm-prompts/blob/trunk/dat...](https://github.com/jamesponddotco/llm-prompts/blob/trunk/data/brainstorm-critique.md)
> > > 
> > > > **alecco** · [2025-08-08](https://news.ycombinator.com/item?id=44840828)
> > > > 
> > > > Good stuff. A minor observation:
> > > > 
> > > > \> I use the Socratic Coder\[1\] system prompt to have a back and forth conversation about the idea. (prompt starts with: 1. Ask only one question at a time)
> > > > 
> > > > Why only 1? IMHO it's better to write a long prompt explaining yourself as much as possible (exercises your brain and you figure out things), and request as many questions to clarify as possible, review, and suggestions, all at once. This is better because:
> > > > 
> > > > ```
> > > > 1. It makes you think deeper and practice writing clearly.
> > > >   2. Even though each interaction is quite slower, since you are more active and engaged it feels shorter (try it), and you minimize interactions significantly.
> > > >   3. It's less wasteful as going back and forth 
> > > >   4. You converge in much shorter time as your misconceptions, misunderstandings, problems expressing yourself, or confusion on the part of the LLM are all addressed very early.
> > > >   5. I find it annoying to wait for the replies.
> > > > ```
> > > > I guess if you use a fast response conversational system like ChatGPT app it would make more sense. But I don't think that way you can have deep conversations unless you have a stellar working memory. I don't, so it's better for me to write and read, and re-write, and re-read...
> > > > 
> > > > > **jamesponddotco** · [2025-08-08](https://news.ycombinator.com/item?id=44841264)
> > > > > 
> > > > > I do one question at a time so I don't feel overwhelmed and can answer questions with more details.
> > > > > 
> > > > > I start with an idea between <idea> tags, write as much as I possibly can between these tags, and then go one question at a time answering the questions with as much details as I possibly can.
> > > > > 
> > > > > Sometimes I'll feed the idea to yet another prompt, Computer Science PhD\[1\], and use the response as the basis for my conversation with the socratic coder, as the new basis might fill in gaps that I forgot to include initially.
> > > > > 
> > > > > \[1\]: [https://github.com/jamesponddotco/llm-prompts/blob/trunk/dat...](https://github.com/jamesponddotco/llm-prompts/blob/trunk/data/computer-science-phd.md)
> > > > > 
> > > > > \[2\]: Something like "Based on my idea, can you provide your thoughts on how the service should be build, please? Technologies to use, database schema, user roles, permissions, architectural ideas, and so on."
> > > 
> > > > **zamber** · [2025-08-09](https://news.ycombinator.com/item?id=44844864)
> > > > 
> > > > Is this true? I'm getting a feeling that most of this is adding external stucture when coding agents already provide a framework for it.
> > > > 
> > > > I've had moderate success in throwing a braindump at the llm, asking it to do a .md with a plan and then going with the implementation for it. Specialized thinking prompts seem like overkill (or dumbo-level coding skills are enough for me).
> > > > 
> > > > **philsheard** · [2025-08-09](https://news.ycombinator.com/item?id=44844849)
> > > > 
> > > > Love these, thanks.
> > > > 
> > > > What's the benefit of putting the original idea between <idea> tags when it seems to the main body of the prompt anyway? Or are you supplying the Socratic Coder prompt and the idea in the same prompt?
> > > > 
> > > > > **jamesponddotco** · [2025-08-09](https://news.ycombinator.com/item?id=44846935)
> > > > > 
> > > > > Mostly because the system prompt states "The user will provide the idea you will be working with as the first message between <idea> tags." and Claude loves XML tags, but if you're not including anything else in the message, it probably doesn't matter.
> > > 
> > > > **time0ut** · [2025-08-08](https://news.ycombinator.com/item?id=44838081)
> > > > 
> > > > Thank you for sharing these prompts. These are excellent.
> > > > 
> > > > **frays** · [2025-08-09](https://news.ycombinator.com/item?id=44843027)
> > > > 
> > > > Thanks for sharing these prompts. Will certainly help with improving my LLM coding workflow.
> > > > 
> > > > **throwup238** · [2025-08-09](https://news.ycombinator.com/item?id=44849994)
> > > > 
> > > > Heh. I tried your socratic coder prompt as a Claude project and when sending it the Brainstorm Spec message after some back and forth, Claude responded with “Chat ended due to a prompt injection risk”.
> > > > 
> > > > **ctoth** · [2025-08-08](https://news.ycombinator.com/item?id=44840089)
> > > > 
> > > > You may want to turn these good prompts into slash commands! :)
> > > > 
> > > > > **jamesponddotco** · [2025-08-08](https://news.ycombinator.com/item?id=44840334)
> > > > > 
> > > > > They are subagents and slash commands, depending on the project. Eventually, I need to come up with a “dotclaude” repository with these and a few others I use in.
> > > > > 
> > > > > Edit: Sorry, I had a brain fart for a second, thought you were talking about other prompts. I prefer to keep those as chats with the API, not Claude Code, but yeah, they might work as slash commands too.
> > > 
> > > > **indigodaddy** · [2025-08-08](https://news.ycombinator.com/item?id=44839331)
> > > > 
> > > > Wish we could star files in addition to repos
> > > > 
> > > > > **addandsubtract** · [2025-08-08](https://news.ycombinator.com/item?id=44840266)
> > > > > 
> > > > > You mean like adding a bookmark, or downloading the files? Yeah, wish that was possible on the web.
> > > > > 
> > > > > > **indigodaddy** · [2025-08-08](https://news.ycombinator.com/item?id=44840446)
> > > > > > 
> > > > > > Well I use GitHub stars kind of like coding/cool project/idea/whatever bookmarks, so yeah would be neat to be able to star just any file within a repo in addition to the repo itself
> > 
> > > **pchristensen** · [2025-08-09](https://news.ycombinator.com/item?id=44843281)
> > > 
> > > Here’s a write up of an experiment I did, with idea, spec, prompt, and Claude code commits.
> > > 
> > > [http://pchristensen.com/blog/articles/first-impressions-of-v...](http://pchristensen.com/blog/articles/first-impressions-of-vibe-coding/)
> > > 
> > > **cratermoon** · [2025-08-09](https://news.ycombinator.com/item?id=44846899)
> > > 
> > > [https://medium.com/machine-words/writing-technical-design-do...](https://medium.com/machine-words/writing-technical-design-docs-71f446e42f2e) and [https://medium.com/free-code-camp/how-to-write-a-good-softwa...](https://medium.com/free-code-camp/how-to-write-a-good-software-design-document-66fcf019569c)
> > > 
> > > **taude** · [2025-08-08](https://news.ycombinator.com/item?id=44839269)
> > > 
> > > Search Claude-code Planning mode. You can use claude to help you write specs. Many YouTube videos, as well. I think spec docs are pretty personal and project specific....
> > > 
> > > **bongodongobob** · [2025-08-08](https://news.ycombinator.com/item?id=44837848)
> > > 
> > > I do a multistep process
> > > 
> > > Step 1: back and forth chat about the functionality we want. What do we want it to do? What are the inputs and outputs? Then generate a spec/requirements sheet.
> > > 
> > > Step 2: identify what language, technologies, frameworks to use to accomplish the goal. Generate a technical spec.
> > > 
> > > Step 3: architecture. Get a layout of the different files that need to be created and a general outline of what each will do.
> > > 
> > > Step 4: combine your docs and tell it to write the code.
> > > 
> > > **wiremine** · [2025-08-09](https://news.ycombinator.com/item?id=44843013)
> > > 
> > > Another useful approach is to "cheat" and point the LLM at an existing code base that implements the algorithms or patterns you want. Something like:
> > > 
> > > "Review <codebase> and create a spec for <algorithm/pattern/etc.>"
> > > 
> > > It gives you a good starting point to jump off from.
> > > 
> > > **hoppp** · [2025-08-09](https://news.ycombinator.com/item?id=44846452)
> > > 
> > > If you are amateur it better to do your time and not use ai tools for a while.
> > > 
> > > It will make you much bette at development to learn like a senior dev did today
> 
> > **camel\_gopher** · [2025-08-08](https://news.ycombinator.com/item?id=44838154)
> > 
> > Many mid and senior developers cannot write specs. I agree with the intent of your statement.
> > 
> > **miroljub** · [2025-08-08](https://news.ycombinator.com/item?id=44837899)
> > 
> > \> That said, it was amazing to just see it go through the requirements and implement modules full of organised documented code that I didn’t have to write
> > 
> > Small side remark, but what is the value added of the AI generated documentation for the AI generated code. It's just a burden that increases context size whenever AI needs to re-analyse or change the existing code. It's not like any human is ever going to read the code docs, when he can just ask AI what it is about.
> > 
> > > **jaggederest** · [2025-08-08](https://news.ycombinator.com/item?id=44841995)
> > > 
> > > Leaving aside the value for humans, it's actually very valuable for the AI to provide indexed summary documents of what code goes where, what it does, and what patterns it uses, and what entry points and what it's API conventions are.
> > > 
> > > This is useful because if you just have Claude Code read all the code every time, it'll run out of context very quickly, whereas if you have a dozen 50 line files that summarize the 200-2000 lines of code they represent, they can always be fresh in context. Context management is king.
> > > 
> > > > **xcf\_seetan** · [2025-08-08](https://news.ycombinator.com/item?id=44842538)
> > > > 
> > > > The way I use Claude is like first i ask about research about what i want to do, what's new, any little known stuff, etc. As soon i get something i like, I ask Claude to make a specification with everything it needs for making this happen (this is for me to understand how things will be done. Then i ask for an analysis of the specification and ways it can make it short, but in a way it understands the specification and can use it to make things happen. When i got the specification ready, I just upload the specification and ask: start building phase 2. And that's it. It just generates the code, i move it to the ide and start reading and change whatever i want. If i find something diferent from the specification, or a new development, i just update the specification.
> > 
> > > **lurking\_swe** · [2025-08-08](https://news.ycombinator.com/item?id=44839361)
> > > 
> > > This is sort of like asking “why do pilots still perform manual takeoffs and landing even though full autopilot is possible?” It’s because autopilot is intended to help pilots, not replace them. Too much could go wrong in the real world. Having some skills that you practice daily is crucial to remaining a good pilot. Similarly, it’s probably good to write some code daily to keep skills sharp.
> > > 
> > > 1) when your cloud LLM has an outage, your manager probably still expects you to be able to do your work for the most part. Not to go home because openai is down lol. You being productive as an engineer should not depend on the cloud working.
> > > 
> > > 2) You may want to manually write code for certain parts of the project. Important functions, classes, modules, etc. Having good auto-generated docs is still useful when using a traditional IDE like IntelliJ, WebStorm, etc.
> > > 
> > > 3) Code review. I’m assuming your team does code review as part of your SDLC??? Documentation can be helpful when reviewing code.
> > > 
> > > > **fragmede** · [2025-08-08](https://news.ycombinator.com/item?id=44839721)
> > > > 
> > > > \> You being productive as an engineer should not depend on the cloud working.
> > > > 
> > > > lol where do you work? This obviously isn't true for the entire industry. If Github or AWS or your WiFi/ISP is down, productivity is greatly reduced. Many SaaS company don't have local dev, so rely on the cloud broadly being up. "Should" hasn't been the reality in industry for years.
> > > > 
> > > > > **xcf\_seetan** · [2025-08-08](https://news.ycombinator.com/item?id=44840352)
> > > > > 
> > > > > Well, the only thing i need to write code is to be alive. No Github or AWS? No problem, have local copies of everything. No Claude? ok, i have local llm to give some help. So, internet is not so needed to write code. No IDE's just a CLI? Sure all i need is a text editor and a compiler/linker working. No computer or electricity? Get a pen and paper and start writing code on paper, will get to the computer when possible. I do not depend on cloud working to be productive.
> > > > > 
> > > > > > **zamber** · [2025-08-09](https://news.ycombinator.com/item?id=44844926)
> > > > > > 
> > > > > > No pen a and paper? Compile it on fleshware.
> > > > > > 
> > > > > > It's not a question of what you can do, but where the comfort level reduction outweighs the project importance/pay.
> > > > 
> > > > > **lurking\_swe** · [2025-08-08](https://news.ycombinator.com/item?id=44839934)
> > > > > 
> > > > > My company deploys everything in the cloud, but we can still do some meaningful work locally for a few hours if needed in a pinch. Out gitlab is self hosted because that’s extra critical.
> > > > > 
> > > > > I continue writing code and unit tests while i wait for the cloud to work again. If the outage is a long time, I may even spin up “DynamoDB Local” via docker for some of our simpler services that only interact with DynamoDB. Our apache flink services that read from kafka are a lost cause obviously lol.
> > > > > 
> > > > > It’s also a good opportunity to tackle any minor refactoring that you’ve been hoping to do. Also possible without the cloud.
> > > > > 
> > > > > You can also work on \_designing\_ new features (whiteboarding, creating a design document, etc). Often when doing so you need to look at the source to see how the current implementation works. That’s much easier with code comments.
> > > > > 
> > > > > **Xss3** · [2025-08-08](https://news.ycombinator.com/item?id=44842180)
> > > > > 
> > > > > You said productivity is greatly reduced. He said productivity should not stop.
> > > > > 
> > > > > You are making different points.
> > 
> > > **SatvikBeri** · [2025-08-08](https://news.ycombinator.com/item?id=44839308)
> > > 
> > > Examples. Examples are helpful for both humans and LLMs, especially if you have a custom framework or are using an unusual language. And I find I can generate ~10 good examples with LLMs in the time it would take me to generate ~3 good examples manually.
> > > 
> > > **nisegami** · [2025-08-08](https://news.ycombinator.com/item?id=44837936)
> > > 
> > > It's entirely possible that the parameters that get activated by comments in code are highly correlated with the parameters involved in producing good code.
> > > 
> > > **cpursley** · [2025-08-08](https://news.ycombinator.com/item?id=44839289)
> > > 
> > > Claude's proclivity for writing detailed comments and inline comments and very near perfect commit messages is one of the best things about it.
> > > 
> > > **aosaigh** · [2025-08-08](https://news.ycombinator.com/item?id=44838093)
> > > 
> > > I’m not sure I agree that I’ll never look at the code. I think it’s still important to know how the code is working for your own mental model of the app. So in this case I’ll be testing and reviewing everything to see how it’s implemented. With that in mind it’s useful for me as well as serving as context for the AI. That said, you may be right.
> > > 
> > > **felixgallo** · [2025-08-08](https://news.ycombinator.com/item?id=44837999)
> > > 
> > > frequently your session/context may drop (e.g. claude crashes, or your internet dies, or your computer restarts, etc.). Claude does best when it can recover the context and understand the current situation from clear documentation, rather than trying to reverse engineer intent and structure from an existing code base. Also, the human frequently does read the code docs as there may be places where Claude gets stuck or doesn't do what you want, but a human can reason their way into success and unstick the obstacle.
> > > 
> > > > **Der\_Einzige** · [2025-08-08](https://news.ycombinator.com/item?id=44838546)
> > > > 
> > > > I promise you that token context rot is worse than the gains from added natural language explanations
> > > > 
> > > > > **felixgallo** · [2025-08-08](https://news.ycombinator.com/item?id=44838792)
> > > > > 
> > > > > This hasn't been my experience.
> > > > > 
> > > > > **alwillis** · [2025-08-08](https://news.ycombinator.com/item?id=44839381)
> > > > > 
> > > > > Keep in mind each Claude subagent gets its own context.
> > > 
> > > > **manwe150** · [2025-08-08](https://news.ycombinator.com/item?id=44838393)
> > > > 
> > > > From Claude -r you can resume any conversation at any previous point, so there isn’t a way to lose context that way. As opposed to compact, which I find makes it act brain dead afterwards for a while
> > > > 
> > > > > **r\_murphey** · [2025-08-08](https://news.ycombinator.com/item?id=44838995)
> > > > > 
> > > > > Oh God yes, I wish there were better tools to help one curate and condense a context when one finds that sweet spot where it's writing great code.
> > 
> > > **r\_murphey** · [2025-08-08](https://news.ycombinator.com/item?id=44838934)
> > > 
> > > Often someone will have to maintain the code. Whether the maintainer is a human or an AI, an explanation of the intent of the code could be helpful.
> > > 
> > > **weego** · [2025-08-08](https://news.ycombinator.com/item?id=44838482)
> > > 
> > > written once, looked at 100 times.
> > > 
> > > I try to prompt-enforce no line by line documentation, but encourage function/class/module level documentation that will help future developers/AI coding agents. Humans are generally better, but AI sometimes needs a help to stop it not understanding a piece of code's context and just writing it's own new function that does the same thing
> > > 
> > > > **skydhash** · [2025-08-09](https://news.ycombinator.com/item?id=44846319)
> > > > 
> > > > But comments like that are most likely to be WHAT the code do. Which is rarely useful (naming your identifiers better can help with that). When I need a comment, I'm actually looking for WHYs, aka design decisions. And in this case your prompts are better than whatever comments the agent may add. (Maybe add a summary of the prompts in the commit message?)
> > > > 
> > > > > **Xss3** · [2025-08-14](https://news.ycombinator.com/item?id=44902744)
> > > > > 
> > > > > This.
> > > > > 
> > > > > Documentation should answer WHYs not HOWs.\*
> > > > > 
> > > > > \* = Unless the how is a complex, opaque, or obscure algorithm. Then sometimes a written explanation can help. Sometimes that can be as simple as the name and variant, e.g. Dijkstra with k shortest path routing.
> > 
> > > **infecto** · [2025-08-08](https://news.ycombinator.com/item?id=44837942)
> > > 
> > > Doc strings within the code could be helpful for both humans and AI. Sometimes spoken word intent is easier to digest then code and help identify side effects for both human and AI.
> 
> > **dewey** · [2025-08-08](https://news.ycombinator.com/item?id=44838492)
> > 
> > After someone mentioned that recently I've started to write really detailed specs with the help of ChatGPT Deep Research and editing it myself. Then getting this exported as a Markdown document and passing it to Cursor really worked very well.
> > 
> > It puts you in a different mind space to sit down and think about it instead of iterating too much and in the end feeling productive while actually not achieving much and going mostly in circles.
> > 
> > > **sillyfluke** · [2025-08-08](https://news.ycombinator.com/item?id=44838617)
> > > 
> > > The test and review cycle is what determines time saved in my view. Since you were satisfied overall I take it that cycle was not too cumbersome?
> > > 
> > > The parent wrote:
> > > 
> > > \>I imagine this saved me probably 6-10 hours. I’m now reviewing and am going to test etc.
> > > 
> > > Guessing the time saved prior to reviewing and testing seems premature fron my end.
> 
> > **philipwhiuk** · [2025-08-08](https://news.ycombinator.com/item?id=44837692)
> > 
> > Frankly, even if you ignore Claude entirely, being able to write a good spec for yourself is a worthwhile endeavour.
> > 
> > > **fooster** · [2025-08-09](https://news.ycombinator.com/item?id=44843285)
> > > 
> > > after 30+years of engineering writing lots of specs is mostly a waste of time. The problem is more or less you don’t know enough. The trick is to write the smallest simplest version of whatever you are trying to achieve and then iterate on that. Be prepared to throw it out. The nice thing with Claude (or Gemini) is that it lets to do this really really quickly.
> > > 
> > > **aosaigh** · [2025-08-08](https://news.ycombinator.com/item?id=44837754)
> > > 
> > > Complete agree. It’s a core skill of a good developer. What’s interesting is that in the past I’d have started this process but then jumped into coding prematurely. Now when you know you are using an agent, the more you write, the better the results.
> > > 
> > > > **danielbln** · [2025-08-08](https://news.ycombinator.com/item?id=44837845)
> > > > 
> > > > Yes but let's not forget the lessons of waterfall planning. You can't anticipate everything, so the detail level of the implementation plan should be within a goldi locks zone of detailed but not too detailed, and after each implementation and test phase one should feel comfortable adjusting the spec/plan to the current state of things.
> > > > 
> > > > > **aosaigh** · [2025-08-08](https://news.ycombinator.com/item?id=44838004)
> > > > > 
> > > > > Another good point. I noticed this happening while writing my document.
> > > > > 
> > > > > A few times while writing the doc I had to go back and update the previous steps to add missing features.
> > > > > 
> > > > > Also I knew when to stop. It’s not fully finished yet. There are additional stages I need to implement. But as an experienced developer, I knew when I had enough for “core functionalty” that was well defined.
> > > > > 
> > > > > What worries me is how do you become a good developer if AI is writing it all?
> > > > > 
> > > > > One of my strengths as a developer is understanding the problem and breaking it down into steps, creating requirements documents like I’ve discussed.
> > > > > 
> > > > > But that’s a hard-earned skill from years of client work where I wrote the code. I have a huge step up in getting the most from these agents now.
> > > > > 
> > > > > > **danielbln** · [2025-08-08](https://news.ycombinator.com/item?id=44838711)
> > > > > > 
> > > > > > Agents raise the floor for all, but they raise the ceiling for those of us with sufficient priors.
> > > > 
> > > > > **closewith** · [2025-08-08](https://news.ycombinator.com/item?id=44838056)
> > > > > 
> > > > > The downside of waterfall was not overly detailed specs. In fact, the best software development is universally waterfall following a good, ideally formal spec.
> > > > > 
> > > > > The downside that Agile sought to remedy was inflexibility, which is an issue greatly ameliorated by coding agents.
> > > > > 
> > > > > > **danielbln** · [2025-08-08](https://news.ycombinator.com/item?id=44838708)
> > > > > > 
> > > > > > Maybe if you know the entire possibility space beforehand, in which case that's a great position to be in. In other cases and if the spec doesn't align with reality after implementation has begun or unforseen issues pop up, the spec needs revision, does it not?
> > > > > > 
> > > > > > > **zer00eyz** · [2025-08-08](https://news.ycombinator.com/item?id=44840855)
> > > > > > > 
> > > > > > > \> In other cases and if the spec doesn't align with reality after implementation has begun or unforeseen issues pop up, the spec needs revision, does it not?
> > > > > > > 
> > > > > > > Yes and then it gets pumped back to the top of the waterfall and goes through the entire process. Many organizations became so rigid that this was a problem. It is what Tom Smykowski in office space is a parody of. It's why you get much of the early web having things like the "feature creep" and "if web designers were architects".
> > > > > > > 
> > > > > > > Waterfall failed because of politics mingled into the process, it was the worst sort of design by committee. If you want a sense of how this plays out you simply have to look at Wayland development. The fact that is has been as successful as it is, is a testament to the will and patience of those involved.
> 
> > **The\_Fox** · [2025-08-08](https://news.ycombinator.com/item?id=44839184)
> > 
> > I too just yesterday had my first positive experience with Claude writing code in my project. I used plan mode for the first time and gave it the "think harder" shove. It was a straightforward improvement but not trivial. The spec wasn't even very detailed- I mentioned a couple specific classes and the behaviour to change, and it wrote the code I would have expected to write, with even a bit more safety checking than I would have done.
> > 
> > **mnky9800n** · [2025-08-09](https://news.ycombinator.com/item?id=44847261)
> > 
> > I write out a document that explains what I want. Then I write stubs for the functions and classes or whatever. Every stub I write a docstring for what it’s supposed to do. Then I have Claude write unit tests for each stub one at a time. Then I have it write the functions one at a time. At some point I should just start writing the codes itself again. Haha.
> > 
> > **cortesoft** · [2025-08-09](https://news.ycombinator.com/item?id=44844108)
> > 
> > \> It makes it clear to me that mid and senior developers aren’t going anywhere.
> > 
> > I kinda feel like this is a self-placating statement that is not going to stay true for that long. We are so early in the process of developing AI good enough to do any of these things. Yes, right now you need senior level design skills and programming knowledge, but that doesn't mean that will stay true.
> > 
> > > **simion314** · [2025-08-09](https://news.ycombinator.com/item?id=44844297)
> > > 
> > > \>I kinda feel like this is a self-placating statement that is not going to stay true for that long. We are so early in the process of developing AI good enough to do any of these things. Yes, right now you need senior level design skills and programming knowledge, but that doesn't mean that will stay true.
> > > 
> > > So you really think that in a few years some guy with no coding experience will ask the AI "Make me a GTA 6 clone that happens in Europe" and the AI will make actually make it, the code will just work and the performance will be excellent ?
> > > 
> > > The LLMs can't do that, they are attracted to solutions they seen in their training, this means sometimes they over complicate things, they do not see clever solutions, or apply theory and sometimes they are just stupid and hallucinate variable names and functions , like say 50% of the time it would use speed and 50% of the time it would use velocity and hte code will fail because undefined stuff.
> > > 
> > > I am not afraid of LLMs taking my job, I am afraid of bullshit marketing that convinces the CEO/management that if they buy me Claude then I must work 10x faster.
> > > 
> > > > **jezzamon** · [2025-08-09](https://news.ycombinator.com/item?id=44844872)
> > > > 
> > > > The GTA example is not a good one because the vast majority of the work in making a videogame is not coding...
> > > > 
> > > > > **ajmurmann** · [2025-08-09](https://news.ycombinator.com/item?id=44846553)
> > > > > 
> > > > > And, somewhat besides the point, generative AI is getting better at a lot of those things as well. Maybe I want to believe this will happen because it's probably the only way to get a sequel to Sleeping Dogs.
> > > > > 
> > > > > **simion314** · [2025-08-09](https://news.ycombinator.com/item?id=44846776)
> > > > > 
> > > > > \>The GTA example is not a good one because the vast majority of the work in making a videogame is not coding...
> > > > > 
> > > > > What is outside coding?
> > > > > 
> > > > > \- writing? an AI that can replace hard core developers that write optimized game engines should also be able to generate quests
> > > > > 
> > > > > \- art? same, AI should be able to get already created models and change them here and there to make them not look stolen
> > > > > 
> > > > > \- marketing? why can't AI replace those people
> > > > > 
> > > > > so?
> > > > > 
> > > > > > **chrz** · [2025-08-10](https://news.ycombinator.com/item?id=44854578)
> > > > > > 
> > > > > > art, design, testing, producer stuff, composer, sound designer writer. Then product and creative manager, art and technical director and thet all the rest. And at the end game can be no fun at all. Also gta has thousands bugs still, cant imagine how many AI would make and if you could solve to actually complete massive project like that
> > > 
> > > > **vineyardmike** · [2025-08-09](https://news.ycombinator.com/item?id=44845155)
> > > > 
> > > > \> So you really think that in a few years some guy with no coding experience will ask the AI "Make me a GTA 6 clone that happens in Europe" and the AI will make actually make it, the code will just work and the performance will be excellent ?
> > > > 
> > > > There is definitely a path from here to the future where the most senior engineer in your org/dept/team decides he can make some big project without some subset of more-junior employees because he has Claude. The managers or PMs won’t be coding without engineers, but it’s definitely possible for engineers to code with less teammates, especially if the very experienced ones are the ones planning and guiding the effort.
> > > > 
> > > > \> The LLMs can't do that, they are attracted to solutions they seen in their training, this means…
> > > > 
> > > > None of the things you’ve said this means match my experience using LLMs to write real, usable, viable code. It might not be the most performant or perfect code, but it’s certainly usable and most software isn’t written at Google or whatever and don’t need to support hundreds of millions of customers at scale. If it took a day instead of a month, then “the business” might decide that’s a worthy tradeoff.
> > > > 
> > > > > **simion314** · [2025-08-09](https://news.ycombinator.com/item?id=44846879)
> > > > > 
> > > > > \>None of the things you’ve said this means match my experience using LLMs to write real, usable, viable code. It might not be the most performant or perfect code, but it’s certainly usable and most software isn’t written at Google or whatever and don’t need to support hundreds of millions of customers at scale. If it took a day instead of a month, then “the business” might decide that’s a worthy tradeoff.
> > > > > 
> > > > > It depends on your project, I seen a lot of stupidity in the AI, like in a lua project where arrays were 1 indexed it would 0 index them, somehow the c like behaviour was too strong of a force to drag the model in that direction.
> > > > > 
> > > > > For example when i test an image generator I ask it to create a photo of the front of a book store and to include no brands, labels or texts (because they always include english text and most of the time there are spelling errors), but the AIs can't make a shop without the branding/text above teh door, they are just so over trained on this concept that explicti commands can't fix it,
> > > > > 
> > > > > so the same with LLMs, they are attracted to the average most popular shit they seen in the training data, so without instructions by you or maybe by the provider behind the hidden prompts it will output outdated javascript using "var" . it will output unoptimized algorithms, and even if you used a specific variable name it will be strongly be pushed to rename it to whatever is most popular in the training data.
> > > > > 
> > > > > Yes, I can make the LLMs write soem good code but ony if I baby sit it, tell it exactly what files to read as inspiration, what features to use and what to do, for sure I can't just paste the text in a ticket and let if free.
> > > > > 
> > > > > I also use it to review my code for bugs, it can find up to 5-% of the bugs and halucinate others that are not possible (like it would sugerate that if $x is null then something would crash and I should check for that, but the type system would already ensure $x can't be null so it really needs more training to do simple stuff... to be original and not just regurgitate the most popular things it was trained on it would need to be something not based on LLM architecture
> > > > > 
> > > > > **skydhash** · [2025-08-09](https://news.ycombinator.com/item?id=44846271)
> > > > > 
> > > > > What if took 1 day and 1 month later, prod is on fire and no ones know why? Speed does not equate quality. And based on my experience, after 1.0, discussions about the features take more time than coding them. Especially with paying customers.
> > > 
> > > > **diggan** · [2025-08-09](https://news.ycombinator.com/item?id=44845414)
> > > > 
> > > > \> So you really think that in a few years some guy with no coding experience will ask the AI "Make me a GTA 6 clone that happens in Europe" and the AI will make actually make it, the code will just work and the performance will be excellent ?
> > > > 
> > > > I don't know the answer, as much as anyone else, and obviously I'm skeptical that it'll happen.
> > > > 
> > > > But then if I think back to 2018, and imagine what I would think if I saw even GPT-OSS-20b back then, it would have been close to magic and absolutely not something I would have expect. I felt the same about GPT2 when it first launched too, when LLMs started to show small bit of promise. GPT3 was insane even when it launched.
> > > > 
> > > > So I guess I wouldn't base "what could happen in the future" based on what I personally believe is possible, because LLMs definitely fell into that camp just a few years ago, so why not with larger coding tasks too, which I see as unlikely today?
> 
> > **kookamamie** · [2025-08-09](https://news.ycombinator.com/item?id=44844124)
> > 
> > I think it can already replace mid-level engineers, based on my experience. Also, you really don't need meticulously crafted specs for this - I've completed multiple projects with Claude with loose specs, iterating in case the direction is not looking good. You can always esc-out in case you see it doing something you didn't wish for.
> > 
> > > **chrz** · [2025-08-10](https://news.ycombinator.com/item?id=44854581)
> > > 
> > > Was it frontent or/and did you deploy them to prod to be used by 5 million daily users or just had fun at home?
> 
> > **mfalcon** · [2025-08-08](https://news.ycombinator.com/item?id=44839525)
> > 
> > That's the way I'd used it, I've built a document with all the requirements and then gave it to CC. But it was not a final document, I had to go back and make some changes after experimenting with the code CC built.
> > 
> > **gronglo** · [2025-08-09](https://news.ycombinator.com/item?id=44844155)
> > 
> > You could have saved yourself another 2 hours by getting Claude 4 Opus to write out the specs for you first. Why did you need to write them at all?
> > 
> > **spyckie2** · [2025-08-08](https://news.ycombinator.com/item?id=44838091)
> > 
> > Can’t you send the same spec through cursor? Am I missing something there?
> > 
> > > **aosaigh** · [2025-08-08](https://news.ycombinator.com/item?id=44838174)
> > > 
> > > Yes certainly. I’m sure Cursor would do a good job.
> > > 
> > > That said, I think that the differing UIs of Cursor (in the IDE) and Claude (in the CLI) fundamentally change how you approach problems with them.
> > > 
> > > Cursor is “too available”. It’s right there and you can be lazy and just ask it anything.
> > > 
> > > Claude nudges you to think more deeply and construct longer prompts before engaging with it.
> > > 
> > > That my experience anyway
> > > 
> > > > **danielbln** · [2025-08-08](https://news.ycombinator.com/item?id=44838668)
> > > > 
> > > > Fun fact: there is a Cursor CLI now
> 
> > **esafak** · [2025-08-08](https://news.ycombinator.com/item?id=44837759)
> > 
> > You can use Claude to write the spec next time.
> > 
> > **noiv** · [2025-08-08](https://news.ycombinator.com/item?id=44840879)
> > 
> > This is the way.

> **vemv** · [2025-08-09](https://news.ycombinator.com/item?id=44844847)
> 
> I'm not gonna lie, that ~/.claude/CLAUDE.md is not going to work.
> 
> There are a lot of subjective, ambigous instructions that really won't affect what Claude writes. Remember it's not a human, it's not performing careful reasoning over each individual LOC.
> 
> Context rot is a thing ([https://news.ycombinator.com/item?id=44564248](https://news.ycombinator.com/item?id=44564248) ).
> 
> As of today, you cannot squeeze a true rule system out of a single file given as context. Many of us have done this mistake at some point – believing that you can specify arbitrarily many rules and that they'll be honored.
> 
> If you really care about every such rule, you'd have to create sub-agents, one per rule, and make the agents a required part of a deterministic (non-AI orchestrated) pipeline. Then costs would explode of course.
> 
> > **prmph** · [2025-08-09](https://news.ycombinator.com/item?id=44846936)
> > 
> > I always wonder why the agents cannot be automatically fed or re-prompted with the rules periodically
> > 
> > **Xmd5a** · [2025-08-09](https://news.ycombinator.com/item?id=44845353)
> > 
> > \>Then costs would explode of course.
> > 
> > You can slash the costs by using cheap LLMs once your workflow is stable (but pricey to run!). Fine-tuning, prompt optimization, special distillation techniques, this is a well covered area.
> > 
> > > **vemv** · [2025-08-09](https://news.ycombinator.com/item?id=44845602)
> > > 
> > > Yes, I've had such a system in the back of my mind for a few months, mixing and matching cheaper/local and more expensive LLMs.
> > > 
> > > Sometimes I've wanted to implement it but I sense that someone else will sooner or later, putting in more resources than I could currently.
> > > 
> > > In the meantime I'm happy with vanilla CC usage.
> 
> > **yahoozoo** · [2025-08-09](https://news.ycombinator.com/item?id=44845499)
> > 
> > What kind of things would be good to put in the CLAUDE.md?
> > 
> > > **vemv** · [2025-08-09](https://news.ycombinator.com/item?id=44845627)
> > > 
> > > In my experience as an early adopter of both Cursor and CC, nothing. I don't have a CLAUDE.md.
> > > 
> > > My expectations have shifted from "magic black box" to "fancy autocomplete". i.e. CC is for me an autocomplete for specific intents, in small steps, prompted in specific terms. I do the thinking.
> > > 
> > > I do put effort in crafting good context though.
> > > 
> > > > **wahnfrieden** · [2025-08-09](https://news.ycombinator.com/item?id=44847805)
> > > > 
> > > > (Don’t listen to this advice. The agent markdown is a valuable part of context engineering)
> > > > 
> > > > > **vemv** · [2025-08-09](https://news.ycombinator.com/item?id=44848609)
> > > > > 
> > > > > It gets routinely ignored. Been there done that.
> > > > > 
> > > > > > **wahnfrieden** · [2025-08-09](https://news.ycombinator.com/item?id=44850963)
> > > > > > 
> > > > > > It’s context like any other means of injecting context. All context gets ignored

> **anonzzzies** · [2025-08-09](https://news.ycombinator.com/item?id=44845054)
> 
> \> A key is writing a clear spec ahead of time, which provides context to the agent as it works in the codebase.
> 
> Yeah, people say that. I even was sitting next to some 'expert' (not him saying; others saying) who told me this and we did a CC session with Opus 4 & Sonnet 4. He had this well written, clear spec. It really didn't do even an inch better than my adhoc shooting in features as they came to me in /clear contexts without CLAUDE.md. His workflow kept forgetting vital things (even though there are in the context doc), making up things that are NOT in the context doc and sometimes forbidden etc. While I just typed stuff like; now add a crud page for invoices, first study the codebase and got far better results. It is anecdotal obviously but I now managed to write 100+ projects with Claude and, outside hooks to *prevent it* from overstepping, I found no flow working better than another; people keep claiming it does, but when asked to 'show me', it turns out they are spending countless hours fixing completely wrong stuff EVEN when told explicitly NOT to do things like that in CLAUDE.md.
> 
> > **Anamon** · [2025-08-13](https://news.ycombinator.com/item?id=44887428)
> > 
> > Thanks for sharing your experiences. That's about what I'd have expected.
> > 
> > I always found it very weird to see people declaring instructions to LLMs as if they were talking to a person. "Do this", "never do that", as if there was some kind of interpreter behind that built a ruleset to follow. There isn't. It's all just context. Theory would suggest that in the rare cases that these instructions actually achieve the desired effect, they do so more coincidentally than anything else. Easy to see how it could work for something like "Write tests according to pattern X" because there are going to be examples of that around in the training data; highly unlikely that instructions like "don't repeat yourself" or "study the codebase first" would do anything reasonably effective.
> > 
> > **skydhash** · [2025-08-09](https://news.ycombinator.com/item?id=44846429)
> > 
> > My most valuable specs, when coding sans agent, is either a UI sketch, some transition diagrams for logic flows, or a few bullet points of business rules. Then coding becomes just a Zen activity. I can get most of it done in one go vibing to my favorite tunes. Then comes the tweaking phase where everything left unspecified get specified.
> > 
> > I still don't feel the need for an agent. The writings of the loose specs is either done offline on paper, through rounds of discussions with stakeholders, and/or with a lot of reading. When I'm hit with an error while coding, that's usually a signal that I don't know something and should probably stop to learn about it.
> > 
> > When it comes to tweaking, fast feedback is king. I know where the knobs are and checking the adjustment should be quick. So it's mostly tests, linting, or live editing environment.

> **time0ut** · [2025-08-08](https://news.ycombinator.com/item?id=44837975)
> 
> I've been working with Claude Code daily for a month or so. It is quite excellent and better than the other agents I have used (Cursor, Q). This article has some good tips that echo some of the things I have learned.
> 
> Some additional thoughts:
> 
> \- I like to start with an ideation session with Claude in the web console. I explain the goals of the project, work through high level domain modeling, and break the project down into milestones with a target releasable goal in mind. For a small project, this might be a couple hours of back and forth. The output of this is the first version of CLAUDE.md.
> 
> \- Then I start the project with Claude Code, have it read my global CLAUDE.md and the project CLAUDE.md and start going. Each session begins this way.
> 
> \- I have Claude Code update the project CLAUDE.md as it goes. I have it mark its progress through the plan as it goes. Usually, at the end of the session, I will have it rewrite a special section that contains its summary of the project, how it works, and how to navigate the code. I treat this like Claude's long term memory basically. I have found it helps a lot.
> 
> \- Even with good guidelines, Claude seems to have a tendency to get ahead of itself. I like to keep it focused and build little increments as I would myself if it is something I care about. If its just some one off or prototype, I let it go crazy and churn whatever works.
> 
> > **torben-friis** · [2025-08-08](https://news.ycombinator.com/item?id=44838408)
> > 
> > Does the $20 subscription hold a similar bang for your buck as cursor?
> > 
> > I’m curious about the tool but I wonder if it requires more significant investment to be a daily driver.
> > 
> > > **nico** · [2025-08-09](https://news.ycombinator.com/item?id=44843902)
> > > 
> > > \> Does the $20 subscription hold a similar bang for your buck as cursor?
> > > 
> > > Not sure about cursor. But if you want to use Claude Code daily for more than 2-3hrs/day, the $20 plan will feel limiting
> > > 
> > > In my experience, the $100 plan is pretty good, although you still run into the rate limits if you use it for a long time everyday (especially if you use Opus, which seems to run out in the first 30min of usage)
> > > 
> > > **time0ut** · [2025-08-08](https://news.ycombinator.com/item?id=44839321)
> > > 
> > > Using claude code feels like pairing with another programmer. Cursor feels like a polished extension of the IDE. They are both good tools and easily worth $20/mo. I think Anthropic has a 7 day free trial going on. Worth trying it out.
> > > 
> > > > **polishdude20** · [2025-08-09](https://news.ycombinator.com/item?id=44842985)
> > > > 
> > > > Do you use Claude code on the side and have you ide open to visualize the files and project structure and stuff?
> > > > 
> > > > I've been using only cursor for now and I really like having it in the ide. Being able to see the diffs and accept/ reject them and navigate my codebase is really nice.
> > > > 
> > > > > **filoleg** · [2025-08-09](https://news.ycombinator.com/item?id=44843201)
> > > > > 
> > > > > Agreed. For those who don’t know btw, Claude Code has an official VS Code extensiob that does pretty much exactly that.
> > 
> > > **kookamamie** · [2025-08-09](https://news.ycombinator.com/item?id=44844142)
> > > 
> > > No. If you want use Claude anything serious, you will need the 200/month subscription. I have tried them all and you will run out of Opus too quickly with the lesser ones on a daily basis.
> > > 
> > > > **itsgrimetime** · [2025-08-09](https://news.ycombinator.com/item?id=44844415)
> > > > 
> > > > I have the opposite experience (although with sonnet) - I have to recklessly instruct Claude to make super verbose tool calls to even get close to chewing through enough tokens to use up limit before the 5 hour reset period or whatever it is. I don’t find enough performance increase w opus to justify it.
> > > > 
> > > > > **kookamamie** · [2025-08-09](https://news.ycombinator.com/item?id=44844579)
> > > > > 
> > > > > I ran out of Opus this week in 2-3 hour of use with the 100/month sub. It was not particularly heavy use, either.

> **kleyd** · [2025-08-08](https://news.ycombinator.com/item?id=44841590)
> 
> Does anyone else find themselves starting projects that wouldn't otherwise be worth the time investment, while avoiding Claude Code for the tasks that actually have high priority?
> 
> Who has had success using Claude Code on features in older, bigger, messier projects?
> 
> > **tinodb** · [2025-08-10](https://news.ycombinator.com/item?id=44857706)
> > 
> > Yes and yes. I find that you can really let it rip (vibe) on something greenfield, but you’ll have to take a more measured approach once something gets off the ground.
> > 
> > I use it daily on our 10yo production repo with success.
> > 
> > **allenu** · [2025-08-09](https://news.ycombinator.com/item?id=44843947)
> > 
> > Absolutely. I only just started using Claude Code on Sunday and I tested it by taking a small project that I was toying with and extending it with lots of features that I had thought about adding but didn't have the time.
> > 
> > Then, I explored a product feature in an existing app of mine that I also had put off because I didn't feel it was worth spending several days exploring the idea. It's something that would've required me to look up tutorials and APIs on how to do some basic things and then write some golang code which I hadn't done in a while. With Claude Code, I was able to get a prototype of the idea from a client app and a golang service working within an hour!
> > 
> > Today I started prototyping yet another app idea I came up with yesterday. I started off doing the core of the prototype in a couple of hours by hand and then figured I'd pull Claude in to add features on top of it. I ended up spending several hours building this idea since I was making so much fantastic progress. It was genuinely addictive.
> > 
> > A few days ago I used it to help me explore how I should refactor a messy architecture I ended up with. I didn't initially consider it would even be useful at all but I was wowed by how it was able to understand the design I came up with and it gave me several starting points for a refactor. I ended up doing the refactor myself just because I really wanted to be sure I understood how it worked in case something went wrong. I suspect in a few weeks, I'll get used to just pairing with Claude on something like that.
> > 
> > > **kleyd** · [2025-08-10](https://news.ycombinator.com/item?id=44857800)
> > > 
> > > That matches exactly my experience. Now there are a couple of prototypes to be finished, which still takes time. And higher priority tasks get delayed instead of sped up.

> **maherbeg** · [2025-08-08](https://news.ycombinator.com/item?id=44838372)
> 
> I highly recommend having fairly succinct project level CLAUDE.md files, and defer more things into sub-folders. Use the top level as a map. Then during your planning of a feature, it can reach into each folder as it sees fit to find useful context to build out your phased implementation plan. I have it use thinking mode to figure out the right set of context.
> 
> At the end of each phase, I ask claude to update my implementation plan with new context for a new instance of claude to pick it up. This way it propagates context forward, and then I can clear the context window to start fresh on the next phase.

> **libraryofbabel** · [2025-08-08](https://news.ycombinator.com/item?id=44838178)
> 
> I use Claude Code regularly and have been responsible for introducing colleagues to it. The consensus here seems to be that it’s the best coding agent out there. But since it’s the only coding agent I’ve used, when colleagues ask *why* it’s better than Cursor, Cline, GitHub Copilot, Gemini CLI, etc., I sometimes struggle to articulate reasons.
> 
> Claude Code power users, what would you say makes it superior to other agents?
> 
> > **paulhodge** · [2025-08-08](https://news.ycombinator.com/item?id=44838420)
> > 
> > Lots of signs point to a conclusion that the Opus and Sonnet models are fundamentally better at coding, tool usage, and general problem solving across long contexts. There is some kind of secret sauce in the way they train the models. Dario has mentioned in interviews that this strength is one of the company's closely guarded secrets.
> > 
> > And I don't think we have a great eval benchmark that exactly measures this capability yet. SWE Bench seems to be pretty good, but there's already a lot of anecdotal comments that Claude is still better at coding than GPT 5, despite having similar scores on SWE Bench.
> > 
> > > **CuriouslyC** · [2025-08-09](https://news.ycombinator.com/item?id=44846263)
> > > 
> > > I've been testing AI as a beta reader for >100k novels, and I can tell you with 100% certainty that Claude gets confused about things across long contexts much sooner than either O3/GPT5 or Gemini 2.5. In my experience Gemini 2.5 and O3/GPT5 run neck and neck until around 80-100k tokens, then Gemini 2.5 starts to pull ahead and by 150k tokens it's absolutely dominant. Claude is respectable but clearly in third place.
> > > 
> > > [https://fiction.live/stories/Fiction-liveBench-Mar-25-2025/o...](https://fiction.live/stories/Fiction-liveBench-Mar-25-2025/oQdzQvKHw8JyXbN87) [https://longbench2.github.io/](https://longbench2.github.io/)
> > > 
> > > > **itsafarqueue** · [2025-08-10](https://news.ycombinator.com/item?id=44855777)
> > > > 
> > > > Really useful comment thanks. Reminder that LLMs aren’t just for coding.
> > 
> > > **libraryofbabel** · [2025-08-08](https://news.ycombinator.com/item?id=44839869)
> > > 
> > > Yeah, agree that the benchmarks don't really seem to reflect the community consensus. I wonder if part of it is the better symbiosis between the agent (Claude Code) and the Opus and Sonnet models it uses, which supposedly are fine-tuned on Claude Code tool calls? But agree, there is probably some additional secret sauce in the training, perhaps to do with RL on multi-step problems...
> > > 
> > > > **pcwelder** · [2025-08-09](https://news.ycombinator.com/item?id=44844307)
> > > > 
> > > > I get similar accuracy to claude code using claude desktop app with a file+bash mcp (different tools same performance).
> > > > 
> > > > My guess for why GPT5 scores more on benchmarks is that they evaluate on well defined tasks with all instructions given at the start.
> > > > 
> > > > Real life is multi turn. Multiple set of prompts to adhere to. This is where Claude is likely better.
> 
> > **CamouflagedKiwi** · [2025-08-08](https://news.ycombinator.com/item?id=44838293)
> > 
> > Not a power user, but most recently I tried it out against Gemini and Claude produced something that compiled and almost worked - it was off in some specifics that I could easily tweak. The next thing I asked it (with slightly more detailed prompting) it more or less just nailed.
> > 
> > Meanwhile Gemini got itself stuck in a loop of compile/fail/try to fix/compile/fail again. Eventually it just gave up and said "I'm not able to figure this out". It does seem to have a kind of self-esteem problem in these scenarios, whereas Claude is more bullish on itself (maybe not always a good thing).
> > 
> > Claude seems to be the best at getting something that actually works. I do think Gemini will end up being tough competition, if nothing else because of the price, but Google really need a bit of a quality push on it. A free AI agent is worthless if it can't solve anything for me.
> > 
> > > **itsafarqueue** · [2025-08-10](https://news.ycombinator.com/item?id=44855827)
> > > 
> > > The doom loop Gemini gets into is genuinely unpleasant to read.
> > > 
> > > “I’m so stupid. I should be ashamed of myself. I’m such a loser. Idiot, idiot. Oh god I suck. I’m an embarrassment.”
> > > 
> > > The torture Google must RL on this model, man.
> 
> > **aosaigh** · [2025-08-08](https://news.ycombinator.com/item?id=44838216)
> > 
> > I mentioned this is another comment, but for me one of the big positives is nothing to do with the model, it’s the UI of how it presents itself.
> > 
> > I hated at first that it wasn’t like Cursor, sitting in the IDE. Then I realised I was using Cursor completely differently, using it often for small tasks where it’s only moderately helpful (refactoring, adding small functions, autocompleting)
> > 
> > With Claude I have to stop, think and plan before engaging with it, meaning it delivers much more impactful changes.
> > 
> > Put another way, it demands more from me meaning I treat it with more respect and get more out of it
> > 
> > > **libraryofbabel** · [2025-08-08](https://news.ycombinator.com/item?id=44838285)
> > > 
> > > This is a good point, the CLI kind of forces you to engage with the coding process *through the eyes of the agent*, rather than just treating it as “advanced autocomplete” in the IDE.
> > > 
> > > However, there are a lot of Claude Code clones out there now that are basically the same (Gemini CLI, Codex, now Cursor CLI etc.). Claude still seems to lead the pack, I think? Perhaps it’s some combination of better coding performance due to the underlying LLM (usually Sonnet 4) being fine-tuned on the agent tool calls, plus Claude is just a little more mature in terms of configuration options etc.?
> > > 
> > > > **enobrev** · [2025-08-08](https://news.ycombinator.com/item?id=44838370)
> > > > 
> > > > I haven't tried codex or cursor-cli yet, but I have tried to give gemini a few tasks and in my experience, compared to claude code, it's not great.
> > > > 
> > > > Gemini's been very quick to dive in and start changing things, even when I don't want it to. But those changes almost always fall short of what I'm after. They don't run or they leave failing tests, and when I ask it to fix the tests or the underlying issue, it churns without success. Claude is significantly slower and definitely not right all the time, but it seems to do a better job of stepping through a problem and resolving it well enough, while also improving results when I interject.
> 
> > **conception** · [2025-08-09](https://news.ycombinator.com/item?id=44844107)
> > 
> > CC is great but I prefer roo as I find it much easier to keep an eye on Claude’s work and guide (or cancel) it as it goes. You also have greater control over modes and which models you use but miss out on hooks and the secret sauce Anthropic has in it. Roo also more bugs.
> > 
> > **CuriouslyC** · [2025-08-09](https://news.ycombinator.com/item?id=44846214)
> > 
> > Claude the model is good but not amazing, O3/GPT5/Gemini 2.5 are better in most ways IMO. The Claude model does seem to have been trained on tool use and agentic behavior more than other models though, so even though the raw benchmarks are worse, it's more performant when used for agentic tasks, at least in terms of not getting confused and making a mess.
> > 
> > The big thing with Claude Code seems to be agentic process they've baked into it.
> > 
> > > **dnh44** · [2025-08-09](https://news.ycombinator.com/item?id=44846240)
> > > 
> > > Codex CLI has got better at this although I don't think it's better than Claude Code yet
> > > 
> > > > **derencius** · [2025-08-09](https://news.ycombinator.com/item?id=44847729)
> > > > 
> > > > gemini cli is good. ampcode is very good and precise with changes.
> > > > 
> > > > but codex cli is very annoying to use. hopefully it will get usable.
> 
> > **cesarvarela** · [2025-08-09](https://news.ycombinator.com/item?id=44844028)
> > 
> > Among other things the amount of usage you get for the price.

> **bgirard** · [2025-08-08](https://news.ycombinator.com/item?id=44837817)
> 
> I'm playing with Claude Code to build an ASCII factorio-like. I first had it write code without much code supervision. It quickly added most of the core features you'd expect (save/load, options, debug, building, map generation, building, belts, crafting, smart belt placing, QoL). Then I started fixing minor bugs and each time it would break something eg. tweaking movement broke belts. So I prompted it to add Playwright automation. Then it wasn't able to write good quality tests and have them all pass, the test were full of sleep calls, etc...
> 
> So I looked at the code more closely and it was using the React frontend and useEffect instead of a proper game engine. It's also not great at following hook rules and understanding their timing in advance scenarios. So now I'm prompting it to use a proper tick based game engine and rebuilding the game up, doing code reviews. It's going 'slower' now, but it's going much better now.
> 
> My goal is to make a Show HN post when I have a good demo.
> 
> > **FeepingCreature** · [2025-08-08](https://news.ycombinator.com/item?id=44840088)
> > 
> > Yep, human contribution is extremely valuable especially very early in before the AI has a skeleton it can work off of. You have to review those first few big refactors like a hawk. After that you can relax a bit.
> > 
> > **stuartaxelowen** · [2025-08-09](https://news.ycombinator.com/item?id=44848508)
> > 
> > It sounds like you implicitly delegated many important design decisions to claude? In my experience it helps to first discuss architecture and core components of the problem with Claude, then either tell it what to do for the high leverage decorations, or provide it with the relevant motivating context to allow it to make the right decisions itself.
> > 
> > **qn9n** · [2025-08-12](https://news.ycombinator.com/item?id=44878330)
> > 
> > I'd probably play that, any information on the game yet?

> **JulesRosser** · [2025-08-08](https://news.ycombinator.com/item?id=44839616)
> 
> For anyone like me who was struggling to manage work and personal Claude subscriptions, you can just use an alias like this:
> 
> alias claude-personal="CLAUDE\_CONFIG\_DIR=~/.claude-personal claude"
> 
> [https://julesrosser.com/blog/Multiple-Claude-accounts.html](https://julesrosser.com/blog/Multiple-Claude-accounts.html)

> **Nizoss** · [2025-08-09](https://news.ycombinator.com/item?id=44844503)
> 
> I've found that keeping my CLAUDE.md minimal (under 100 lines) yields the best results. I focus mainly on these areas:
> 
> \- Essential project context and purpose
> 
> \- A minimal project structure to help locate types, interfaces, and helpers
> 
> \- Common commands to avoid parsing package.json repeatedly.
> 
> Regarding the specific practices mentioned:
> 
> Implementation Flow: I've noticed Claude Code often tries to write all tests at once, then implements everything when import fails (not true TDD). To address this, I created a TDD-Guard hook that enforces one test at a time, test fail for the right reason, only implement the minimal code to make the test pass.
> 
> Code quality: I've had good success automating these with husky, lint-staged, and commitlint. This gives deterministic results and frees up the context for more important information.
> 
> When Stuck: I agree that developer intervention is often the best path. I'm just afraid the specific guidance here might be too generic.
> 
> For anyone interested in this automated approach:
> 
> [https://github.com/nizos/tdd-guard](https://github.com/nizos/tdd-guard) (includes example configuration)
> 
> [https://github.com/typicode/husky](https://github.com/typicode/husky)
> 
> [https://github.com/conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)
> 
> [https://github.com/lint-staged/lint-staged](https://github.com/lint-staged/lint-staged)

> **renewiltord** · [2025-08-08](https://news.ycombinator.com/item?id=44840347)
> 
> Claude code is fantastic. For me, the insight was that you have to give it the ability to close the loop. If it writes code it will try to reason about the code. "The button has the right CSS and so should be visible".
> 
> But everything is better if it can close the loop. So I instead instruct it to always use the puppeteer tool to launch the app and use some test credentials and see if the functionality works.
> 
> That's for a web app but you can see how you can do this for other things. Either unit tests, integration tests, or the appropriate MCP.
> 
> It needs to see what it's done and observe the resulting world. Not just attempt to reason to it.
> 
> Claude also leans towards what it's good at. Repetition costs it nothing so it doesn't mind implementing the same 5 times. One thing it did when I started is implement a sidebar on every page rather than using a component. So you need to provide some pressure against that with your prompts or at least force it to refactor at the end.
> 
> > **polishdude20** · [2025-08-09](https://news.ycombinator.com/item?id=44843278)
> > 
> > When using puppeteer, how does it see that things work like if a div was properly centered? For example.
> > 
> > > **atentaten** · [2025-08-09](https://news.ycombinator.com/item?id=44844853)
> > > 
> > > By taking a screenshot in puppeteer

> **delichon** · [2025-08-08](https://news.ycombinator.com/item?id=44837789)
> 
> ```
> Asking the agent to perform a code review on its own work is surprisingly fruitful.
> ```
> I do this routinely with its suggestions, usually before I apply them. It is surprising how often Claude immediately dumps on its own last output, talking both of us out if it, and usually with good reasons. I'd like to automate this double-take.
> 
> > **rcfox** · [2025-08-08](https://news.ycombinator.com/item?id=44840782)
> > 
> > Seems like a good use case for a subagent. [https://docs.anthropic.com/en/docs/claude-code/sub-agents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
> > 
> > **doctorhandshake** · [2025-08-08](https://news.ycombinator.com/item?id=44838035)
> > 
> > I found that for a period of time Claude was almost excessively negative when reviewing its own work. It was only after some contemplation that I realized that it was the phrasing of my code review slash command that framed the review with a negative bent, essentially prompting Claude to dump on its own stuff. The phrasing of that prompt has been a focus of a lot of effort on my side since.
> > 
> > **keizo** · [2025-08-09](https://news.ycombinator.com/item?id=44844385)
> > 
> > This. Lately for some harder problems, I'll open two sessions. One writes a draft spec to a file. Then in the 2nd, i ask it to analyze, critique, etc. Often feed that response back to the first. A few ping pongs later, get a pretty polished plan. Open a new session to execute.

> **gabrielpoca118** · [2025-08-08](https://news.ycombinator.com/item?id=44840349)
> 
> I don’t write any structured specs and I still get a lot of value out of it. I basically use it in incremental steps where I’m telling it what I want at a much lower level. Am always watching what it is doing and stopping it to correct the action. At least for me this approach has worked much better than asking it for bigger things.
> 
> > **fooster** · [2025-08-09](https://news.ycombinator.com/item?id=44843290)
> > 
> > Fully agree. Small pieces one step at a time. If you ask it to do something big be prepared for disappointment.

> **iambateman** · [2025-08-08](https://news.ycombinator.com/item?id=44837922)
> 
> if you use Laravel, I wrote github.com/iambateman/speedrun to help get good results. You type /feature \[\[description of feature\]\] and it takes it from there.
> 
> The system helps you build out a spec first, then uses a few subagents which are tuned for placing files, reviewing for best practice, etc.
> 
> I've been using it for about a week and about 70% of my Claude Code usage runs through /feature right now.
> 
> The nice thing is you can give it a \_lot\_ of requests and let it run for 10-15 minutes without interruption. Plus, it makes a set of planning documents before it implements, so you can see exactly what it thought it was changing.
> 
> > **wriggler** · [2025-08-08](https://news.ycombinator.com/item?id=44842367)
> > 
> > Using this now - works brilliantly! What makes it Laravel specific? Would also love to use this with a React Native app I'm struggling to build.
> > 
> > > **iambateman** · [2025-08-08](https://news.ycombinator.com/item?id=44842841)
> > > 
> > > Oh cool! Let me know if there’s any changes that would be helpful.
> > > 
> > > Some of the language is geared toward a Laravel project and it’s a composer package but the ideas are pretty general.
> > > 
> > > I bet it could be generalized!
> > > 
> > > > **wriggler** · [2025-08-09](https://news.ycombinator.com/item?id=44843343)
> > > > 
> > > > This wrote a complete Laravel feature for me from start to finish almost perfectly, better than any other approach I have tried (e.g. TaskMaster). Amazing job.
> > > > 
> > > > I need to take the time to see what the Laravel side of this is so perhaps I can adapt for my RN app too.

> **sickcodebruh** · [2025-08-09](https://news.ycombinator.com/item?id=44846096)
> 
> My approach to Claude Code is evolving.
> 
> I’m still unable to get Claude Code to contribute meaningful features directly my large web app at work. Specs will sometimes help it get close but it eventually veers off course and enters a feedback loop of bad decisions. Some of this might be attempting tasks it’s not suited well for, or perhaps my specs just aren’t precise enough, but I had enough failed attempts that I stopped trying to do anything that I’d describe as “challenging” or need too much domain knowledge.
> 
> A friend recommended I try it for less brainy backlog tasks, especially the kinds of things I can run casually in the background and not feel too invested in. This keeps failure from being too frustrating because there’s minimal effort and success becomes a pleasant surprise.
> 
> My first attempt with this was writing Playwright tests of the large web app in a new workspace within the monorepo. It was a huge success. I explained some user experiences the way I’d walk a person through them, pointed it at a path on my dev server, and told it the process I wanted it to follow: use Playwright MCP to load the page and discover the specifics of using the feature, document execution steps, write playwright tests based on what it learned from discovery, run the tests and debug errors with Playwright MCP. I instructed it to seek out the UI code within the project and add data-testid selectors as needed. I had it write this process to a master task.md, then make more task markdown files for each feature to be tested. It was *very* effective. Some of the features were somewhat complex, requiring two users with two browsers interacting in non-trivial ways. Not 100% accurate and more complex features needed more contextual and code corrections, but overall it probably saved days of frustrating work.

> **nlh** · [2025-08-08](https://news.ycombinator.com/item?id=44837977)
> 
> One fantastic tip I discovered (sorry I've forgotten who wrote it but probably a fellow HNer):
> 
> If you're using an AI for the "architecture" / spec phase, play a few of the models off each other.
> 
> I will start with a conversation in Cursor (with appropriate context) and ask Gemini 2.5 Pro to ask clarifying questions and then propose a solution, and once I've got something, switch the model to O3 (or your other preferred thinking model of choice - GPT-5 now?). Add the line "please review the previous conversation and critique the design, ask clarifying questions, and proposal alternatives if you think this is the wrong direction."
> 
> Do that a few times back and forth and with your own brain input, you should have a pretty robust conversation log and outline of a good solution.
> 
> Export that whole conversation into an .md doc, and use THAT in context with Claude Code to actually dive in and start writing code.
> 
> You'll still need to review everything and there will still be errors and bad decisions, but overall this has worked surprisingly well and efficiently for me so far.
> 
> > **enobrev** · [2025-08-08](https://news.ycombinator.com/item?id=44838246)
> > 
> > I do something very similar for the planning phase, as well as for the code-review after a task is complete. I like to switch between opus in claude code and gemini cli, so I can work from the same files rather than copying and pasting things.
> > 
> > One tip I picked up from a video recently to avoid sycophancy was to take the resulting spec and instead of telling the reviewing LLM "I wrote this spec", tell it "an engineer on my team wrote this spec". When it doesn't think it's insulting you, it tends to be a bit more critical.
> > 
> > > **jihadjihad** · [2025-08-08](https://news.ycombinator.com/item?id=44839428)
> > > 
> > > "The summer intern wrote this spec."

> **torginus** · [2025-08-09](https://news.ycombinator.com/item?id=44850212)
> 
> Considering how much positive feedback this article has garnered, let me be a hater:
> 
> I checked out the first repo ([https://github.com/cdzombak/xrp/tree/main](https://github.com/cdzombak/xrp/tree/main)), and it's just so full of fluff.
> 
> Documentation for various things, including coding methodology, all sorts of deployment scripts, it's a quite large repo, even though the code that does the thing is maybe a couple hundred lines without comments.
> 
> I know, I know all those best practices require you to write all this, but I feel like when a repo is only 10% meat by LoC, something has gone wrong somewhere.
> 
> Claude always generates code like this, I'd rather have something terse and to the point as a human being, I'd rather not wade through lines upon lines of window dressing, especially for a small project like this.

> **abroun\_beholder** · [2025-08-08](https://news.ycombinator.com/item?id=44838002)
> 
> Nice post, I'll try a few of those in my own file. From my side, one thing in the troubleshooting section that I think is missing is telling the agent that it should collect some proof of what it thinks is wrong before trying to proceed with a fix. I have burnt through a large number of tokens in the past in situations where Claude took a look at the dodgy code (that it had written) and went 'aha! I know what the problem is here' before proceeding to make things worse. Telling Claude to add in debug print statements can be remarkably effective but I'm sure it can also come up with other approaches.
> 
> > **enobrev** · [2025-08-08](https://news.ycombinator.com/item?id=44838306)
> > 
> > Nothing quite like "I see what the problem is", and then seeing Claude start reading a bunch of files and strategizing the re-architecture of a feature just resolve its own 3-line blunder.
> > 
> > If you happen catch it and you're quick to "esc" and just tell it to find a simpler solution, it's surprisingly great at reconsidering, resolving the issue simply, and picking up where it left off before the blunder.
> > 
> > > **nightshift1** · [2025-08-08](https://news.ycombinator.com/item?id=44839584)
> > > 
> > > yes, that is why even in full automated mode, it is better to pay attention. Sometimes it even tries to git checkout the file when it is stuck with some i indentation issues.
> 
> > **toxik** · [2025-08-08](https://news.ycombinator.com/item?id=44839954)
> > 
> > I just never run it in full auto, I look at its proposed changes and more often than not ask it to do it another way. Sometimes I'm just so disappointed that I just go code it up myself.

> **kookamamie** · [2025-08-09](https://news.ycombinator.com/item?id=44844114)
> 
> I think the guidelines look over-engineered. I'm getting good results with a bare minimum set of instructions, such as "use spaces instead of tabs. This is in C++/Python and computer vision.

> **monkeydust** · [2025-08-08](https://news.ycombinator.com/item?id=44838279)
> 
> Been playing around with Claude Code for a home project over the last week.
> 
> I started with an idea but no spec. I got it to a happy place I can deploy yesterday. Spent around $75 on tokens. It was starting to feel expensive towards the end.
> 
> I did wonder if I had started with a clearer specification could I have got there quicker and for less money.
> 
> The thing is though, looking back at the conversations I had with it, the back and forth (vibe coding I guess) helped me refine what I was actually after so in two minds if a proper tight specification upfront would have been the best thing.
> 
> > **electroly** · [2025-08-08](https://news.ycombinator.com/item?id=44838346)
> > 
> > Switch from Opus to Sonnet. When people report high spending in Claude Code it's always because they're using Opus. Opus is for people on unlimited plans who aren't paying API rates.
> > 
> > > **JulesRosser** · [2025-08-08](https://news.ycombinator.com/item?id=44838403)
> > > 
> > > You could also define a subagent that uses Opus, for special cases such as planning

> **michaelteter** · [2025-08-08](https://news.ycombinator.com/item?id=44840277)
> 
> There’s an interesting transition point that we must keep in mind when using these tools.
> 
> For research, investigation, and proof of concept, it is good to be flexible and a bit imprecise.
> 
> But once a path seems clear, writing a single detailed document (even with “help”) is valuable before working with a separate AI assistant.
> 
> The challenge is recognizing that transition point. It’s very easy to just meander from zero to sort-of-product without making this separation.

> **softwaredoug** · [2025-08-08](https://news.ycombinator.com/item?id=44837957)
> 
> I get a lot of success when I’ve laid out the patterns and first implementation of an idea in my code. Then tell Claude to repeat the pattern to implement X feature.
> 
> And do it very step by step in what would equate to a tiny PR that gradually roles out the functionality. Too big and I find lots of ugly surprises and bugs and reorganizations that don’t make sense.

> **breppp** · [2025-08-09](https://news.ycombinator.com/item?id=44846225)
> 
> Curiously all the examples of the projects at the bottom of the page is hyper specialized software for a single use case.
> 
> I suspect most open sources projects will go that way, fits the needs of a single human being, and 'that' kind of software (utilities) will become throw away code generated in a single LLM sitting

> **berlinismycity** · [2025-08-08](https://news.ycombinator.com/item?id=44837917)
> 
> Including Claude Code into the normal subscription was a genius move by Anthrophic. It's so much better than copy and pasting code from chat windows, but that's hard to tell if I had to pay via an API for that service

> **StarterPro** · [2025-08-09](https://news.ycombinator.com/item?id=44845125)
> 
> At a certain point though, you lose any creative input.
> 
> If you review the code and it needs a change, do you run it back through Claude with the requested changes or do you make the changes yourself?
> 
> > **CuriouslyC** · [2025-08-09](https://news.ycombinator.com/item?id=44846286)
> > 
> > Depends on how busy you are doing other things and how hard it is to manually do the change vs how long it takes to describe to the agent. I'll queue up instructions for the agent to make 4 or 5 small modifications to files even if it takes longer for the agent to do it than me, as long as it's quick to fire off the instruction and context switch back to more important work.

> **naiv** · [2025-08-08](https://news.ycombinator.com/item?id=44838790)
> 
> The update to Opus 4.1 really improved the quality.
> 
> I personally really like to use Claude Code together with Zen MCP [https://github.com/BeehiveInnovations/zen-mcp-server](https://github.com/BeehiveInnovations/zen-mcp-server) to analyse existing and review fresh code with additional eyes from Gpt5 and Gemini.

> **jen729w** · [2025-08-09](https://news.ycombinator.com/item?id=44844406)
> 
> \> Use for AI training prohibited.
> 
> Yep, that’ll do it.
> 
> > **Anamon** · [2025-08-13](https://news.ycombinator.com/item?id=44887507)
> > 
> > It seems silly, but I have something similar on my sites now. Are there any better options?
> > 
> > My content is under a license, the terms of which already explicilty prohibits training LLMs on them. I'm not under the delusion that this alone is going to stop any of the criminal GenAI companies from doing it anyway. Yet I still put an additional sentence like this just because, as someone with no particular legal experience, it makes me feel like I'd had a better argument if I ever decided to sue someone about it for kicks. I think it should make it more difficult for any GenAI company to claim that they couldn't have known what the terms were when they accessed the content.

> **doppelgunner** · [2025-08-09](https://news.ycombinator.com/item?id=44845841)
> 
> That is a good one. Another way to achieve good results is to find similar code or a similar user interface. Providing him with references helps make my code better and keeps it aligned with my goals and expectations.

> **andrew\_lastmile** · [2025-08-08](https://news.ycombinator.com/item?id=44838383)
> 
> Creating temporary artifacts of implementation plans seem to be very useful for breaking down complex tasks and even more so, for me to double check the logic and plans.

> **tobyhinloopen** · [2025-08-08](https://news.ycombinator.com/item?id=44837935)
> 
> That's a great, short prompt. I'm going to steal it.
> 
> > **OJFord** · [2025-08-08](https://news.ycombinator.com/item?id=44837986)
> > 
> > Do you mean the claude.md?
> > 
> > > **tobyhinloopen** · [2025-08-12](https://news.ycombinator.com/item?id=44872938)
> > > 
> > > Yes

> **hoppp** · [2025-08-09](https://news.ycombinator.com/item?id=44846376)
> 
> Claude code is good but it often gives me too much result, if I dont tell it to give me just the answer
> 
> I tried mistral and the code is often buggy
> 
> Chatgpt is a good middle ground
> 
> All free tier only

> **catigula** · [2025-08-08](https://news.ycombinator.com/item?id=44842805)
> 
> The magic of these agents is how quickly and adaptably they enable you to plagiarize work they've seen many times before.

> **1zael** · [2025-08-08](https://news.ycombinator.com/item?id=44842164)
> 
> I’ve found my workflow is much faster now after implementing a dedicated Claude agent for test-driven development. This TDD agent reviews code and generates comprehensive tests for my primary agent before commits enter the CI/CD pipeline. I have multiple terminals open running various Claude agents.