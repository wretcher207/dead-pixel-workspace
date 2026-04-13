## Introduction

0:00

Plug code has completely changed the way

0:01

that we're now able to build AI agents

0:03

and AI automations. And it has truly

0:05

changed the way that I'm running my

0:06

business. But the problem is that most

0:08

people use it like a regular chatbot,

0:09

throwing in vague prompts that make no

0:11

sense. Then they wonder why their bold

0:13

break, why their agents don't work, and

0:15

why they're spending hours fixing

0:16

things. Which is why in this video, I'm

0:18

going to show you the top five prompting

0:19

hacks that will make your claw code 10

0:20

times more powerful and way more

0:22

reliable. And so by the end of the

0:23

video, you'll have claw code to do what

0:25

you want the first time every time. And

0:28

in case you don't know who I am, my name

0:29

is Mikuel and I've scaled my own AI

0:31

agency to six figures, working with over

0:33

50 businesses to implement AI solutions

0:35

and teaching over 20,000 people in the

0:37

process. With that being said, let's

0:38

dive in. Okay, so the first hack is

## Hack 1: Splitting Prompts

0:40

called splitting prompts. Now, one of

0:41

the biggest mistakes that I see when

0:43

people use claw code is them adding huge

0:45

and humongous prompts with a ton of

0:47

information and a ton of tasks all in

0:49

the same prompt and then expecting claw

0:50

code to give them the output that they

0:52

want. An example of this could be them

0:53

saying build me a CRM with off database

0:55

API dashboard emails and deploy it which

0:57

are basically seven different tasks

0:59

right or four different tasks within the

1:01

same kind of major thing that they want

1:02

to build. And there's a few problems

1:03

with this. The first one being that

1:04

there's a lot of context or tokens

1:06

[music] used in that same session that

1:08

you're using cloud code. The second

1:09

thing is that the output is not going to

1:11

be the best just because you're feeding

1:12

it and you're telling it 20 different

1:14

things at once. The same way you tell an

1:15

employee, hey can you build me a full

1:17

software with this, this, this, and that

1:18

without giving the person any clear

1:19

structure. And the issue here, even when

1:21

I started, was that I thought claw code

1:23

would build anything, right? It could

1:24

build anything and anything if I give it

1:25

one prompt and that's it. But it's much

1:27

better to split prompts and take a more

1:29

structured approach. So instead of

1:30

putting this prompt right here with

1:31

seven different tasks, we split the

1:33

tasks up, right? And we talk the clock

1:35

code task by task. So we look at this

1:36

and we say, okay, the first task is

1:38

setting up the project. Then it will set

1:40

up the project and then we review

1:41

whether it did a good job or not. If it

1:42

did a good job, then we go to the next

1:44

thing. If it didn't do a good job, then

1:46

we go back and fix it. Then we go to

1:47

task two, which is knowledge base. And

1:48

then we review if it worked. If not,

1:50

then we look back. And we do this for

1:51

the other tasks as well. And the reason

1:53

this works a lot better is because when

1:54

we have to fix task four, we don't have

1:56

to fix the whole thing cuz we reviewed

1:58

each one and it worked very, very well.

1:59

And so we go task by task making sure

2:01

that everything works until the end.

2:02

Now, is it going to take more time to

2:03

prompt clock code at the start? Yes, but

2:05

actually you spend more time fixing this

2:07

after it didn't do a good job rather

2:09

than setting things up properly from

2:10

from the start. So to make this more

2:12

practical, I can give you like an actual

2:13

prompt uh that I built so you can see

2:15

the bad approach and then the good

2:15

approach that we take. So on the one

2:17

hand we have a prompt that says build me

2:18

a full customer support chatbot with

2:20

Nex.js front end and knowledge base that

2:22

uses embeddings escalation logic that

2:23

routes tickets to Slack and admin

2:24

dashboard with analytics user

2:26

authentication with OOTH and deploy the

2:28

whole thing onto Versell. Use Tillwwind

2:29

for styling and make it responsive. Now

2:31

I'm not going to run this for the sake

2:32

of not having to wait 3 hours but this

2:35

right here it will overwhelm claw code

2:37

with so much context and so many things

2:39

to do that the output don't get me wrong

2:41

it will be okay but it won't be as good

2:44

as if you split things up step by step.

2:46

Right? And so what we could do here is

2:48

we have the first prompt which would be

2:50

this. Let's say prompt one set up the

2:53

next JS project with the typescript and

2:54

TWIN create the basic folder structure

2:56

with components and we give it the first

2:58

part. So when prompt one is finished it

2:59

did a good job. Then we go to prompt two

3:01

right here. Then once prompt two is

3:03

finished so this is added the knowledge

3:04

base. It goes to prompt three and then

3:07

we keep going until prompt four and

3:08

prompt five. Right? So prompt four will

3:10

be this. So all we did here is took this

3:12

prompt right here which has Nex.js JS

3:13

front end and knowledgebased escalation

3:15

logic it has admin dashboard it has OOTH

3:18

it has deploying right so NexJS front

3:20

end will go here then we had knowledge

3:21

base will go here then we had escalation

3:23

logic will go here then we had dashboard

3:26

which will go here and then finally we

3:27

would have another one which is

3:28

deploying the whole thing and so you can

3:30

see that it's kind of like a spiderweb

3:31

and the reason why we do this is because

3:33

you take a more structured approach

3:34

right and so I walked you through how

3:35

you review it and so on but essentially

3:37

you would run this right and don't worry

3:38

about all these terms because they don't

3:40

mean [music] much to me either but it's

3:41

more the structure that we have to

3:42

understand right and so you have

3:43

something simple with seven different

3:44

tasks. You split them up into different

3:46

prompts. Prompt one, prompt two until

3:47

prompt seven. You review them

3:48

individually to make sure that when you

3:50

get the output, it's going to be

3:51

correct. You don't have to reprompt

3:52

claude all over again and fix it and

3:54

debug it and spend 2, three hours asking

3:56

it why I did the wrong thing. The next

## Hack 2: Using Plan Mode for Complex Tasks

3:57

hack is using plan mode. Now, I know

3:59

plan mode is not something

4:00

revolutionary, but it's a big

4:01

misconception as to what it actually

4:03

does and when it's important. So,

4:04

whenever we have a new task in clock, we

4:06

ask ourel whether it's hard or not hard.

4:07

If it's hard, so if it requires

4:09

different steps, then we use plan mode.

4:10

Then we review the plan and then we

4:12

approve it and then we execute the

4:13

actual thing to give us the output that

4:14

we want. Right? An example of this could

4:15

be an API with five endpoints or when

4:17

you're building a full workflow and I'll

4:18

show you exactly what that looks like

4:20

because it has different steps to it and

4:21

you wanted to plan accordingly take the

4:23

time to show it to think through how

4:24

it's going to build it before it builds

4:25

it. On the other hand, if you have

4:26

something very easy like fixing a typo

4:28

or changing some sort of color in a

4:29

button that it made in a software, then

4:31

you can just execute directly without

4:33

needing the plan mode because there's

4:34

not much planning to it. It's just a

4:35

very very easy task. All right. So here

4:37

I'm on my main hub in cloud code which

4:38

is called the YouTube workspace. Um, I

4:40

automate pretty much 30% of everything

4:42

that I do on a day-to-day basis with

4:43

like YouTube. I would even go as far as

4:45

saying like 40%. Now, here under dot

4:47

claude, and by the way, if you're new to

4:48

claw code, if you have no idea what I'm

4:50

talking about, if this looks very

4:50

confusing to you, watch this video up

4:52

here. It will give you a much better

4:53

idea. But if you understand skills,

4:55

which I'll walk you through in the last

4:56

hack as well, excal draw diagram. So,

4:58

that skill right there allows me to be

4:59

able to make these diagrams

5:01

automatically to break down the topic

5:02

for you guys to understand. I typically

5:04

break it down in a visual way, but also

5:06

make it practical. So you see how I'm

5:07

showing you the diagram plus also how

5:09

you can use the actual concept here. And

5:11

so in this case, let's say I wanted to

5:13

make a video about anti-gravity versus

5:14

claw code. By the way, if you want the

5:16

video, let me know in the comments down

5:17

below if you're interested. If not, also

5:19

let me know. But if I wanted to do a

5:21

video on anti-gravity versus claw code,

5:23

well, I would want to basically first of

5:24

all explain what anti-gravity is and how

5:27

claw code is different from

5:27

anti-gravity. And so I would want to

5:29

make maybe three diagrams I'd say using

5:31

Excalibur draw which is this platform

5:32

right here which allows me to explain my

5:35

concept the differentiation between

5:36

anti-gravity and clock code. Okay. So I

5:38

told it to research anti-gravity. I told

5:40

it to research clock code. I wanted to

5:41

look for the differences. I wanted to

5:43

make three visuals and then give me back

5:44

the visuals. Okay. So a task like this

5:46

has a plan right? And so instead of

5:49

going bypass permissions which is

5:50

basically where we go yolo mode. We say

5:52

hey take care of it yourself. Don't ask

5:53

me for any help. Don't make any plan

5:55

just go after it. Right? We can go and

5:57

use plan mode to make a plan first

5:59

before it gives us the output. Okay, so

6:01

now I'm going to press run. And you know

6:03

it's on plan mode when it's blue right

6:04

here. Bypass permissions is going to be

6:07

red. Now it's saying that it's going to

6:08

research both products in parallel to

6:09

understand what we're working with. Then

6:11

plan the diagrams. Okay, so that's how

6:12

it plans through. That's how it thinks

6:13

through actually planning the the whole

6:14

concept here. Okay, there you go. So

6:16

after a few minutes, it made the plan

6:17

which is Google's antgravity versus claw

6:19

code three visual comparison diagrams.

6:21

It gives me the context. So Mike wants

6:23

to create XYZ research summary. So the

6:25

summary that I made three key

6:26

differentiators so interface agent

6:28

oration verification and feedback and

6:30

deliverables which is the three things

6:31

that we want right with color system the

6:33

layout diagram one diagram 2 diagram 3

6:34

diagram 4 and the implementation steps

6:36

and the files and verification. One more

6:38

reason why I do also like this in

6:40

specific is because when I use plan mode

6:41

I can also add comments. So I can say

6:43

interface paradigm paradigm is a very

6:45

strange word make it beginner friendly.

6:47

I know it's a very stupid comment but

6:48

let's say you add a comment. when we

6:50

press approve plan then we will approve

6:52

the plan but it will also take the

6:53

comments that we add in the plan as

6:55

context to change whatever it is that we

6:57

told it to change but also I get to see

6:58

exactly what it came up with because if

7:00

I didn't like interface paradigm or if I

7:02

didn't like agent orchestration I could

7:03

say hey can you find something else

7:05

right and we can go back and forth now

7:06

let's say I like the plan everything's

7:08

good now I can press send feedback and

7:10

keep planning so send feedback because

7:11

we we added one comment and if you add

7:13

more comments so if you say here let's

7:14

say orchestration you add turn this to

7:16

organization turn this word

7:19

So, we're just playing around with the

7:20

names. I can go here and I can send

7:22

feedback and keep planning. Or actually,

7:24

now that I thought of it, color system,

7:25

I know anti-gravity is not purple. So,

7:27

we can do use dark blue. Cloud code will

7:32

be not blue. It will be uh use orange.

7:37

That's it. Now, I can go back. It will

7:38

say we added four comments. It will take

7:40

this four comments and we can send

7:41

feedback and keep planning. Okay. So,

7:42

now it will take the feedback. It will

7:44

apply the feedback and then give us back

7:46

another plan with the updated feedback.

7:48

There's a lot of feedback there, but you

7:49

get the point here. It's basically

7:50

crafting the whole plan before it gives

7:52

it to us. All right. So, here we have

7:53

the new updated plan. If I go back here,

7:55

we can see that we have dark blue,

7:56

orange, we have interface style, and we

7:58

have agent organization. So, these

7:59

things changed. It updated the actual

8:01

plan. And now I can say yes and auto

8:02

accept. And now, instead of making it

8:04

edit automatically, I can now put bypass

8:06

permissions because I know that the plan

8:08

is good. I know that it's smart enough

8:09

to be able to do whatever I want it to

8:10

do. And now it's just about doing it.

8:12

All right. So, I just finished making

8:13

the three diagrams. Now, let's look at

8:14

the output. So, I can look at the first

8:16

one. I can go here. Here I can import

8:18

scenes. So anti-gravity I believe this

8:20

is an interface. Let's open it up. There

8:22

we go. Nuts. Crazy. Insane. So here we

8:26

have the actual diagram that I made.

8:27

Google antravity and cloud code. This is

8:29

the diagram itself to show the the

8:30

differentiation in the interface. The

8:32

next one is agent organization which is

8:34

this one right here which is on the left

8:36

hand side is anti-gravity. On the right

8:37

hand side is cloud code showing the

8:39

difference. And finally we have the

8:40

agent verification which is this one

8:42

right here. So the verification and how

8:44

they both work. Now, the output was

8:45

significantly better because we took the

8:47

time to plan things ahead. On the other

8:49

side, you could have just used bypass

8:50

permissions and it would have given you

8:51

something and I've tried it before and

8:52

the output just wouldn't be as good as

8:54

you'd want it to be. So, if a task

8:55

requires more thinking, if it requires a

8:57

plan, just make sure to use plan mode

8:59

every single time.

## Hack 3: Stopping Context Pollution & Token Limits

9:02

So, the difference between a kitchen

9:03

sink versus a clean session is the

9:05

amount of tokens that it uses. So, if

9:06

you didn't know a clock session, right,

9:08

one session means one kind of

9:10

conversation here. I just press this, it

9:12

will compact it. I'll explain what that

9:13

means, but essentially each conversation

9:15

has x amount of tokens. So if I go here

9:17

and I put context,

9:19

we get the context usage, right? So we

9:21

get how many tokens have we used so far.

9:22

So we have a limit of 200,000 tokens and

9:25

we have used about 83,900 tokens in one

9:28

session. So the whole session that we

9:29

just did, it used about 83,900, which is

9:32

about 42% of each one. And it also gives

9:34

us the actual like percentage broken

9:36

down into like what actually takes the

9:37

most amount of tokens. So the system

9:39

message is 3.8, 8 the system tools is

9:41

9.3 the MCP is 5.7 the system tools is

9:44

10.8 eight and so on, right? And so you

9:45

have [music] all the tools broken down

9:47

and you can see everything here. My

9:48

point is that your prompts are better if

9:50

you separate them in different sessions,

9:51

right? So instead of fixing a bug,

9:53

making a new feature, refactoring

9:54

something or writing a doc all in the

9:56

same session, right? Even though they

9:57

have nothing to do with each other, you

9:58

would create a session for each one. And

10:00

when I say session, I mean a new session

10:01

here. So you press plus. This is a

10:03

session conversation. You can call it

10:04

conversation really, not a session. So

10:06

conversation one, conversation two.

10:07

Because the more tokens you use in a

10:08

session, the more stupid the clock code

10:10

becomes. The more it starts to think

10:12

less and the more it starts to get

10:13

overwhelmed with information and so

10:15

split them up in different conversations

10:16

and you can start over. Now I call this

10:18

prompt hack because sometimes you think

10:19

that the problem is your prompt but

10:21

really it's the session tokens that

10:23

you're using. So right here we basically

10:24

made three diagrams for a video that I'm

10:26

planning to make. Now we're using about

10:27

42% of the actual usage. If I keep going

10:30

with this conversation, we could do

10:31

that, right? But the level of

10:34

intelligence of cloud code will decrease

10:36

the more you increase the tokens in that

10:38

conversation. So if I wanted to deploy

10:39

another workflow, let's say common

10:40

analysis, it goes to my competitors, it

10:42

goes through all their comments, see

10:43

what people want and it gives me back a

10:44

report. Is it better for me to keep

10:46

going on the session or is it better for

10:47

me to go to a new session and start from

10:49

there? Well, obviously it's better to go

10:50

to new session and start from there

10:52

because you start from scratch. And if I

10:53

go here and I put context, then this

10:56

will now give me the context and we're

10:57

only using about 9% token usage. So now

10:59

it has a fresh mind and it can start

11:01

doing the task that you wanted to do

11:02

without being overwhelmed with all the

11:03

information from the previous

11:04

conversation that we had which did

11:05

something completely different. The next

## Hack 4: Automating Project Rules with CLAUDE.md

11:07

hack is using cloud.md. So let's say you

11:08

wanted to make an app some sort of

11:10

software app. Okay. And you wanted the

11:12

app to use typescript you wanted all the

11:13

words to follow camelc case you wanted

11:15

to use tailwind you wanted to use

11:17

superbase and you wanted to use an app

11:19

router not pages. Now don't worry if

11:21

you're not really understanding what all

11:22

these words mean but understand that

11:24

these are all rules right and so these

11:26

rules you can either tell cloud code

11:27

every single time to do all these things

11:29

or you can add them to something that we

11:31

call a cloudd document where you

11:32

basically build a one-time prompt and it

11:35

will autoload that prompt every single

11:36

time in claude so it has context and we

11:38

don't have to repeat everything over and

11:39

over again so cloud already knows you

11:41

just ask so if we had to make a PDF

11:42

document and we wanted the color to be

11:44

blue we wanted the the the letters to be

11:46

small we wanted the I guess the font to

11:48

be itallic font right We can either tell

11:51

it individually every single time or we

11:53

can add it to a prompt like this and

11:54

then it will use that every single time

11:55

without us having to repeat ourselves.

11:57

Now, lucky for you, I made a skill in

11:58

claw code called the claw.md generator.

12:01

And this includes a pull prompt on how

12:03

to make the best cloud MD document.

12:04

Plus, it gives you the example structure

12:06

of one of them, for example, here.

12:08

Right? So, all you have to do is

12:09

download the skill, which you can find

12:10

in the second link down below. And here

12:11

we can say, hey, I want to create a

12:13

claude.md prompt for my project uh for

12:16

[music] my app that I'm building. I just

12:17

want you to ask me any questions of what

12:18

you need from me to be able to make this

12:20

document. And we can press go. So now

12:21

what it's going to do is it's going to

12:22

look at the skill of all the

12:23

requirements that it needs to [music] be

12:24

able to make the cloud.md document. And

12:26

then we're going to start working on it.

12:27

So as you can see here, it says I have

12:28

found the cloud.mmd generator skill. Now

12:30

let's walk through the process. So now

12:31

it's going to ask me where it should

12:32

save the claw.md file. I can press uh

12:35

recommended. It's fine. And then tell me

12:36

about your project. So what is the

12:37

product name? What does it do and who is

12:38

it for? I can press other and I can

12:40

start talking to it. So let's say here I

12:41

say okay so I want to build a website.

12:43

So this is for a website and the website

12:45

needs to be for my company JM Solutions.

12:47

Uh we're an AI automation agency that

12:49

helps marketing agencies to be able to

12:51

build their backend delivery systems.

12:53

And uh yeah, that's what that's what the

12:54

actual thing is for. So you give a

12:56

context and then the text tag will use

12:58

is I'm not too sure. Whatever you think

13:00

is the best for build a website. Let's

13:02

just do that. You can submit the answer.

13:03

And now it will start thinking about

13:04

what to put in the cloud. MD document.

13:06

Okay. So it's not jam solutions, it's

13:07

JM. But now when it makes a cloudMD

13:09

document, it will be an overview of what

13:11

it is that we want to build for your JM

13:14

solutions website. What kind of pages

13:15

features [music] do you want? Landing

13:17

plus services. Keep it simple. Keep it

13:20

simple. Actually for conventions

13:22

actually let's keep it simple [music]

13:23

and rules is going to be any hard rules

13:25

cla must always or never do in this

13:27

project I have specific rules there you

13:29

go and now it's most likely going to ask

13:30

me for rules because all these rules I

13:32

don't want to repeat myself every single

13:33

time I use claw code I want cloud code

13:35

to use the cloud that document when it's

13:37

actually building the thing that I

13:38

wanted to build what are your hard rules

13:40

mobile first design no inline styles

13:42

there we go submit answers and also

13:45

other my company name is JM solutions

13:48

not J am. Okay. So, here we have a plan

13:51

to create the claude.md document. We

13:53

have the context project with James

13:54

solutions a automation agency website

13:56

helping marketing agencies to build

13:58

backend delivery [music] systems. The

13:59

text stack is going to be this pages,

14:01

conventions, file structure, rules,

14:04

actions, verification, and we're good to

14:06

go. Yes. And auto accept. All right. So,

14:07

here it made the cloud.md document. If I

14:09

open it up, I can see that we have a

14:11

full prompt, which is one that we had

14:13

before. So, these are information,

14:15

basically a summary of what it is that

14:17

we want to build. And this is great for

14:18

us because every single time that we

14:19

have to go out of claw code and come

14:21

back in. We don't have to reexlain to

14:22

claw code what we want. We can just say

14:24

it knows that every single time that we

14:26

start talking to it, it will always look

14:27

at the cloud document. It will get

14:29

context and then only it will respond to

14:31

us. Sort of like an employee having

14:33

context of what it is that it has to do

14:34

every day. I mean imagine you give the

14:35

AI the task to build a website. You give

14:37

it all the different features and what

14:38

it needs to do. Then you go and close

14:40

code. You come back to it later and then

14:42

you tell it, hey, keep going. And then

14:44

it's going to ask you keep going with

14:45

what what it is you want me to build.

14:46

and you have to reexlain everything

14:47

again. That's what this prompt is for.

## Hack 5: Building Reusable "Skills"

14:48

The last prompt hack is using skills. So

14:51

we call it reusable prompts. So

14:52

initially we had the manual way which is

14:54

same effort every time. So we had

14:55

session one where we write a full

14:57

prompt. Session two we write another

14:59

full prompt and we keep going session

15:00

three, session four and session five and

15:01

each session will take about 5 minutes

15:03

and we take about 25 minutes that we

15:05

wasted writing every single prompt

15:06

manually. The second way is using

15:09

skills. So we write the skill once and

15:10

we use it forever. So if you remember

15:12

before I showed you how I made a excalid

15:15

draw diagram using what we call skills.

15:17

So skills are preset instructions that

15:19

we give clock code to perform a specific

15:21

thing. And so all we have to do is

15:22

create the skill one time which will

15:23

take about 5 to 10 minutes. And we also

15:25

have a skill to create the skill which

15:26

is which is awesome. And so whenever you

15:28

want to do a specific thing you can

15:30

always create a skill and then call the

15:31

skill whenever you want to do that

15:33

specific thing whenever you want. And so

15:34

let's say we had the excelad diagram

15:36

thing. So inside here we have a prompt.

15:38

This is a prompt that explains how to

15:40

make the excelad diagrams. So this is

15:42

the full prompt. Now I could either copy

15:44

and paste this prompt every single time

15:45

into cloud code into a new session or I

15:47

could always just save it here under the

15:49

skills and it could always read this

15:52

when it needs to make the actual thing.

15:54

Now this is great for us because it

15:55

saves me so much time whenever I want to

15:57

make any of these be honest. So for

15:58

example if I go back here and I go to

16:00

the command I can see here that I can

16:03

call the cloud and the generator. I can

16:04

call the comment analysis. can call the

16:06

comment analysis report, compare

16:07

analysis, which are all skills which

16:09

perform different things. Now, I've

16:10

covered skills step by step in my claw

16:12

code tutorial. So, if this is the first

16:13

time that you hear about this, just

16:15

check out this video up here. It'll give

16:16

you much more context. But if you

16:17

already know what skills are, then let's

16:19

actually build one step by step and show

16:20

you how it works. Let's say I wanted to

16:22

go on YouTube every day and check the

16:23

amount of views that I have for the

16:25

videos. Now, I could either prompt

16:26

Clocko to do this every day or whenever

16:28

I want to. And by the way, before we

16:29

build the skills, you can find all of

16:31

them at amppl.com.

16:34

These are preset skills where we have

16:35

the skill creator which is a skill that

16:37

makes skills. We have the senior front

16:38

end. We have the UI design. We have all

16:40

these different skills that do different

16:41

things. But sometimes I want to make my

16:43

own skill which is my own come task. And

16:44

so here I can say hey I want to be able

16:47

to make a skill and the skill needs to

16:49

be a skill that goes on the internet

16:52

every time and it finds the top news or

16:54

top features that came out about clock.

16:56

Then it goes on YouTube and it checks

16:59

the highest view video on clock code in

17:01

the moment and then it gives me content

17:03

ideas that I could be using for my

17:04

channel for clock code. Make a plan for

17:06

it first and then we can uh go ahead and

17:09

make a skill. So this is the initial

17:10

thing that we give it. I can just press

17:11

go and now it will start making the plan

17:13

for the skill that it needs to do. All

17:14

right. So as you can see here it made

17:15

the plan for the skill that it's going

17:16

to make and it's going to be called claw

17:18

code content ideas. What it does is that

17:20

it searched the internet for latest

17:21

cloud code news features. It searches

17:23

YouTube for the highest viewed recent

17:24

cloud code videos. is then generates 10

17:26

to 15 ranked content ideas across

17:28

reference against Miklla's content

17:29

pillars and then it outputs a markdown

17:31

report plus style PDF to outputs. So now

17:33

it's going to be making all the skills

17:35

for that specific thing and then we can

17:37

see phase one, phase 2, phase 3, phase

17:39

4, phase 5, phase six and that's it. So

17:42

from a single prompt it made this full

17:44

plan of execution that we can now simply

17:46

press yes not to accept and I'm going to

17:48

press bypass permissions. So it does

17:50

everything on its own. So, as you can

17:51

see here, it's going through the to-dos

17:52

task that it needs to make. And then

17:54

it's adding the folder called cloud code

17:56

content ideas, which is a folder where

17:58

it's going to store our scale that we

18:00

can always call when we want to to use

18:01

it. Right? So, as you can see here, it

18:02

finished making the scale. If I go to

18:04

cloud code content ideas, I have the

18:06

references. So, this will be the report

18:07

in PDF that it needs to give us uh which

18:09

is the output. Then the scripts, which

18:11

is the actual Python scripts, it's kind

18:13

of the the automation that it needs to

18:15

execute. Generate PDF and search YouTube

18:17

videos. And then it has a skill.md which

18:19

is a main document that explains to it

18:21

exactly what we want to do. So with that

18:24

said I can go here and I can say /claude

18:29

content ideas. So it also made a command

18:31

and the command allows us to be able to

18:33

to just find it easily. So I can press

18:34

cloud code content ideas. I can put this

18:36

in plan mode and now it will start

18:38

looking at all the different skills here

18:40

and it will go through each skill.md

18:42

right here and it will know that it

18:44

needs to use the cloud code content

18:45

ideas because it's associated with that

18:47

command in specific and so what it will

18:49

do here is it will start calling the

18:50

cloud code content ideas and it will

18:52

start executing everything that it needs

18:53

to do. It says I have all the context

18:54

needed let me write the plan and exit

18:56

plan mode so we can execute. All right,

18:57

it made the plan of what it needs to do

18:59

all the steps the key files

19:00

verification. We can go and press yes

19:03

and auto accept and we can put this on

19:05

bypass permissions. So the idea behind

19:07

this is that whenever now we have to go

19:09

back to cloud code instead of prompting

19:10

it again saying hey can you go on the

19:12

web can you search this can you search

19:13

that we can simply just press slash and

19:15

call the cloud code content ideas and it

19:17

will execute that thing that we made

19:19

previously which again will take us 10

19:21

minutes at the start but it will take us

19:22

3 seconds to be able to set this up or

19:24

to call the tool uh whenever we have to

19:26

run it. All right so now it gave us the

19:28

top five content ideas. It finished

19:30

running the actual thing. Agent teams

19:31

for agency operations cloud code HTTP

19:34

hooks. Why don't delete my cloud.mmd

19:36

[music] skills build a business command

19:38

center and cloud code for non-coders.

19:39

And if I go to outputs, I can see that

19:41

it also made uh let's go to here. It

19:44

also made a report in PDF format. And

19:45

the PDF looks like this. So we have news

19:47

and updates, the loop command which came

19:49

out in cloud code, the cloud API skill,

19:51

the effort levels and ultraink

19:53

automemory security agent teams

19:55

enterprise AI agent AOI and we have the

19:58

top YouTube videos latest by 30 days. So

20:00

next drive's crushing it clockwork there

20:02

we go Dan Martell a legend uh Brian

20:05

Cassell and we have the other ones as

20:06

well and it keeps on going and going and

20:08

going and we have the patterns observed

20:09

content ideas and so on. So it took us

20:11

like 10 minutes to be able to make this

20:12

whole scale, but now it's going to save

20:14

us a lot more time when we have to rerun

20:15

it again because now when I go to a new

20:17

cloud session, I can simply go and press

20:19

the claude code content ideas. And when

20:21

I press this, it runs it over and over

20:23

again. So instead of running the prompt

20:24

over and over again, we have one time

20:26

and we save oursel an eternity every

20:28

time we have to run the whole thing. So

## Conclusion

20:29

that's it right there. You have the five

20:30

prompt hacks that I use every single day

20:32

when I want to build my cloud code agent

20:34

workflows, which make the whole process

20:36

10 times faster and way more reliable.

20:37

Now, if you want to work with me

20:38

onetoone to be able to start and scale

20:40

your own AI automation agency, then I

20:41

left the first thing down below, which

20:42

is a one-toone mentorship program. Check

20:44

out the video. If it sounds like a good

20:45

fit, then feel free to apply. Now, I'm

20:47

going to leave all the resources and

20:48

templates in my free school community.

20:49

You can go to the classroom section and

20:51

then you can go to the templates vault.

20:52

Bear in mind that not everybody gets in,

20:54

so please put some thoughts into your

20:55

answers and check out this video on the

20:56

screen where I show you the only six

20:58

skills that you need to master to be

20:59

able to build your own AI agency in

21:01

2026. With that being said, I hope you

21:03

found value from this video and I'll see

21:05

you in the next