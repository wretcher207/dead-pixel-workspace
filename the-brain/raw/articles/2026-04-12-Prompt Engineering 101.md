---
title: "Prompt Engineering 101"
source: "https://www.reddit.com/r/PromptEngineering/comments/1byj8pd/prompt_engineering_101/"
author:
  - "[[[deleted]]]"
published: 2024-04-07
created: 2026-04-12
description: "I’m a data scientist with little to no knowledge about prompt engineering. What are the most recent advancements, where is it headed, and wh"
tags:
  - "clippings"
---
I’m a data scientist with little to no knowledge about prompt engineering. What are the most recent advancements, where is it headed, and what might one need to know?

---

## Comments

> **\[deleted\]** · [2025-09-16](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/negzcgz/) · 1 points
> 
> Hi there! Your post was automatically removed because your account is less than 3 days old. We require users to have an account that is at least 3 days old before they can post to our subreddit.
> 
> Please take some time to participate in the community by commenting and engaging with other users. Once your account is older than 3 days, you can try submitting your post again.
> 
> If you have any questions or concerns, please feel free to message the moderators for assistance.
> 
> *I am a bot, and this action was performed automatically. Please* [*contact the moderators of this subreddit*](https://www.reddit.com/message/compose/?to=/r/PromptEngineering) *if you have any questions or concerns.*
> 
> > **AutoModerator** · [2025-09-16](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/negzcih/) · 1 points
> > 
> > Hi there! Your post was automatically removed because your account is less than 3 days old. We require users to have an account that is at least 3 days old before they can post to our subreddit.
> > 
> > Please take some time to participate in the community by commenting and engaging with other users. Once your account is older than 3 days, you can try submitting your post again.
> > 
> > If you have any questions or concerns, please feel free to message the moderators for assistance.
> > 
> > *I am a bot, and this action was performed automatically. Please* [*contact the moderators of this subreddit*](https://www.reddit.com/message/compose/?to=/r/PromptEngineering) *if you have any questions or concerns.*

> **appy\_j** · [2025-04-05](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/mlm9cpk/) · 2 points
> 
> Help me to generate perfect prompts to learn data science from books …
> 
> Please, Give me prompt to learn from "practical statistics for data science" by peter bruce and andrew bruce book with help of chatgpt or any works…
> 
> I am software developer with 5 years of work experience, good at logical coding trying to learn and transit into Data Science field, want to crack down job after 6 months of good preparation by using ChatGPT or any other AI tools.
> 
> I would be grateful if any genius could help me with it 🙏🏻😇

> **neurobonkers** · [2024-04-12](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kz8dofe/) · 2 points
> 
> Check out Ethan Mollick's blog - he's a leading AI researcher and his blog is the best resource I've found for keeping on top of interesting developments [https://www.oneusefulthing.org/](https://www.oneusefulthing.org/)

> **PurpleWho** · [2024-04-12](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kz7j39f/) · 7 points
> 
> I first discovered GPT3 in Feb 22, a year later I co-founded a prompt chaining tool, and my day-to-day work involves helping users develop or improve their prompts for different kinds of tasks or workflows.
> 
> In my experience over that time, LLMs have gotten smarter, and the smarter they get the less important prompt engineering becomes. Don't get me wrong, being able to engineer a good prompt is an important skill. If I had to guess, I'd say it accounts for about 25% of getting great results from a large language model.
> 
> Another 25% comes from having good examples. In my opinion, adding 3 examples of what you're after to your prompt is probably the most underrated aspect of prompt engineering. Sometimes you're asking for novel ideas or doing stuff there are no examples for, so it's not always possible. But when you can, finding great examples of what you want is usually time better spent, than trying to craft the perfectly worded prompt.
> 
> I'd say another 25% of the game is having good frameworks for your thinking. I first encountered this when using AI to write blog posts. I would ask ChatGPT to evaluate and suggest improvements when I was done. then I realized [Google has a list of detailed questions](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) you can ask yourself when evaluating what they call 'people-first' content. So I started adding these question to my prompts and asked chatGPT to evaluate the content against these questions (more specifics on how to do this [here](https://www.joshpitzalis.com/peoplefirst/)). Google's self-assessment questions are an example of a clear framework for thinking about how to write good SEO content. Having your own frameworks and principles for whatever works you do, so that you can add them to prompts to evaluate output is a really important part of getting great results from LLMs. You can cycle back and forth between creating stuff and then evaluating it with an LLMs to get really good outputs.
> 
> The last bit of this is about thinking in terms of chains of prompts rather than individual prompts. The internet seems to be fixated with individual prompts as though they were some kind of magical incantation. When people use LLMs to produce something useful, they often use a series of 15-25 prompts that reflect their process for thinking through a project. If you're writing, you might have one prompt for generating ideas, another for creating an outline, and others for drafting, improving writing with metaphors, evaluating, and getting feedback from different perspectives. Combining these prompts into an overall workflow is another pillar of getting great results out of the machine.
> 
> These percentage are obviously arbitrary, It was just to give you a relative sense of how important "prompt engineering" is in relations to other aspects working with LLMs.
> 
> > **PurpleWho** · [2024-04-12](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kz7j6kv/) · 10 points
> > 
> > As [u/FortuitousAdroit](https://www.reddit.com/user/FortuitousAdroit/) mentioned in another comment, [OpenAI's](https://platform.openai.com/docs/guides/prompt-engineering) and [Anthropic's official guide to prompt engineering](https://docs.anthropic.com/claude/docs/intro-to-prompting) are probably the best places to start if you want to get into the 25% that 'Prompt Engineering'. There are a lot of tips to remember in these two guides, so I tried to 80/20 them all and I came up with 5 questions I usually run through when I'm putting a prompt together:
> > 
> > 1. Have you specified a **persona** for the model to emulate?
> > 2. Have you provided a clear and unambiguous **action** for the model to take?
> > 3. Have you listed out any **requirements** for the output?
> > 4. Have you clearly explained the **situation** you are in and what you are trying to achieve with this task?
> > 5. Where possible, have you provided three **examples** of what you are looking for?
> > 
> > The initials on each of the bolded words spells PARSE which is just an easy acronym to remember when you need them. There are loads of frameworks like this out there, this is by no means better than any of the others, it's just the one I actually end up using (some context on how PARSE was developed in this [post](https://daisychainai.com/blog/cheatsheet)).
> > 
> > Other than that, I recommend checking out a book called 'Co-intelligence'. [Ethan Mollick just came out with this book](https://www.moreusefulthings.com/) two weeks ago and, in my opinion, its the best introduction to working with LLMs that exists at the moment.
> > 
> > One last shout out for the [How Do You Use ChatGPT](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL) playlist on YouTube where Dan Shipper interviews interesting people about how they use LLMs. Once you've wrapped your head around all the theory, it's great to see how other people actually use the tool in real life.

> **ahemm20** · [2024-04-09](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kysaxev/) · 8 points
> 
> I'd suggest a course on Prompt Engineering on Coursera. I took a six week one within the free 7 day trial 😅. Also received a certificate at the end. I learned a ton and took lots of notes, basically copied the whole course for myself.

> **FortuitousAdroit** · [2024-04-09](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kyqgo90/) · 12 points
> 
> Anthropic has a solid guide that was recently published - [https://docs.anthropic.com/claude/docs/prompt-engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)

> **TexAg2K4** · [2024-04-08](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kyooyf7/) · 6 points
> 
> Coursera and LinkedIn have some classes if you prefer that structure. And of course, YouTube is an option.
> 
> > **ahemm20** · [2024-04-09](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kysb1go/) · 6 points
> > 
> > YouTube is an excellent option.
> > 
> > > **Vishwateja24** · [2025-05-13](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/ms2bbp8/) · 2 points
> > > 
> > > Could provide links to rely upon?

> **OkMidnight6578** · [2024-04-08](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kynes7a/) · 4 points
> 
> Make a prompt improver prompt with all the prompt engineering instructions you learn built on top of a prompt improver prompt a smart llm makes(Claude 3 opus)
> 
> > **\[deleted\]** · [2024-04-11](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kz1uhc9/) · 3 points
> > 
> > yes! reaally important advice

> **SikinAyylmao** · [2024-04-08](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kymc1dm/) · 4 points
> 
> I wouldn’t recommend learning prompting from the LLM. It seems naive and un proven.
> 
> I would say that prompt engineering has been largely trial and error. Most you can learn are techniques for quickly iterating on prompts.
> 
> > **smurfDevOpS** · [2024-04-12](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kz7ji8p/) · 3 points
> > 
> > or can use tools to iterate through the prompts and compare it on different llms

> **\[deleted\]** · [2024-04-07](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kyjnqdr/) · 14 points
> 
> I'd ask a LLM to draft an article/book outline about it, then use the model to flesh out each section. Basically, write your own textbook with an AI and you'll learn it in no time.
> 
> > **Titos-Airstream-2003** · [2024-04-08](https://reddit.com/r/PromptEngineering/comments/1byj8pd/comment/kyjreli/) · 8 points
> > 
> > Totally agree. ChatGPT is the best prompt creator I’ve ever met. Whether right after giving it the basis of what want to know or at the end of an iterative conversation where I’m happy with the results, I ask for what prompt would have gotten the final “correct” response in the first place and then have ChatGPT create the prompt.