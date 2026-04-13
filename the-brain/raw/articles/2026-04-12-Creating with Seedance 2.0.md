---
title: "Creating with Seedance 2.0"
source: "https://help.runwayml.com/hc/en-us/articles/50488490233363-Creating-with-Seedance-2-0"
author:
published:
created: 2026-04-12
description: "This feature is currently available to users on a Standard plan or higher.IntroductionSeedance 2.0 is a third-party model available in..."
tags:
  - "clippings"
---
This feature is currently available to users on a [**Standard**](https://runwayml.com/pricing/) plan or higher.

#### Introduction

Seedance 2.0 is a third-party model available in Runway that generates video from text prompts, reference images, audio, and video inputs. The model supports director-level control over camera movement, lighting, and character performance, and produces audio-visual output with synchronized sound — all within a unified multimodal architecture—meaning that you set the role of your inputs.

This article covers how to access the tool, input best practices, available settings, and what to expect from your generations.

---

## Spec information

<table><colgroup><col> <col> <col> <col></colgroup><tbody><tr><td>Unlimited generations in Explore Mode</td><td colspan="3"><p>Yes</p></td></tr><tr><td>Duration</td><td colspan="3"><p>5-15 seconds</p></td></tr><tr><td>Aspect ratio</td><td colspan="3"><p>21:9<br>16:9<br>4:3<br>1:1<br>3:4<br>9:16</p></td></tr><tr><td>Output resolutions</td><td colspan="3"><p>480p, 720p</p></td></tr><tr><td>Supported inputs</td><td colspan="3"><p>Text, Image, Video, Audio</p></td></tr><tr><td>Modalities</td><td colspan="3"><p>Text to Video<br>Image to Video<br>Video to Video<br>Audio to Video (<em>Coming soon</em>)</p></td></tr><tr><td>Input requirements</td><td>Reference image</td><td>Reference video</td><td>Reference audio</td></tr><tr><td>Maximum inputs</td><td>5</td><td>3<br><em>*total duration of videos must be under 15 seconds</em></td><td rowspan="5"><p><em>Coming soon</em></p></td></tr><tr><td>Maximum file size</td><td>< 30 MB each</td><td>< 50 MB each</td></tr><tr><td>Maximum duration</td><td>N/A</td><td>≤ 15 seconds</td></tr><tr><td>Supported file types</td><td>.jpg, jpeg,.png,.webm</td><td>.mp4,.mov</td></tr><tr><td>Dimension requirements</td><td>> 300 px<br>< 6000 px</td><td>≤ 720p</td></tr></tbody></table>

---

## Step 1 — Selecting the inputs

Begin by navigating to the [web app](https://app.runwayml.com/). There are two ways to navigate to the Seedance 2.0 model:

- Search for it beneath the **What do you want to create?** bar
- Select **Video**, then select **Seedance 2.0** from the model dropdown

## Choosing the creation mode

Seedance 2.0 offers three creation modes, **References**, **Start/End frames** and **Text to Video:**

- **References** —Best for blending elements from multiple images or videos into a single generation. Use when you want granular control over what gets pulled from each input.
- **Start / End frames** — Best for traditional image-to-video (start frame only) or keyframe control (start and end frames). Use when you need precise control over how a shot begins or ends.
- **Text to video** — Best for generating without any image or video inputs. Also a good option when working with realistic human subjects, as it tends to avoid the moderation constraints that can come with image-based inputs.

---

## Step 2 — Writing the prompt

Your prompt will vary depending on both your creation mode and what you're trying to accomplish. In any creation mode or model, we recommend using positive, unambiguous, and outcome-focused language.

## Using the reference inputs

When using Reference mode, write your prompt as if you're describing the scene or sequence you want to appear, or the changes you want made, as well as how to use each provided input.

References are flexible by design. Whether you're working with images or videos, you control what gets pulled from each input and how it's used.

- With **images**, you might use one reference for a subject and another for a background, or instruct the model to use a frame at a specific point in the video.
- With **videos**, you can preserve the motion while changing the style, or keep the structure while swapping out characters entirely.

Below are examples of different use cases that use a combination of image and video references, their prompt, and the results of the generation.

![panic.png](https://help.runwayml.com/hc/article_attachments/50576830520467)

Seedance 20 - the woman realizes that she forgot there was a test that day watercolor animation st.gif

## Step 3 — Generating the Video

Click the **Generate** button to start the generation. The total processing time will depend on your inputs and selected output duration, but typically takes been 2-10 minutes to complete once started.

## Troubleshooting

In the event of generation errors, review the details below to learn more about troubleshooting:

Unable to start a generation

If you're unable to start a generation because the button is greyed out, this is due to the references not meeting the model's input requirements.

Hover over the greyed **Generate** button to learn more about the required adjustments and review the Spec table for more details on input requirements.

**Note:** Video preview durations on Runway are rounded to the nearest **second**. Some models generate videos slightly longer than displayed — for example, a video that appears as `00:05` may have a true duration of `00:05:01`. These extra milliseconds can push your input over the limit even when the preview appears to be within the maximum 15 seconds.

Generation failed during processing

In most cases, a generation failing is the result of third-party content policies. Third-party restrictions can be indentified by the error referencing the specific model, such as `The request was blocked by **Seedance 2.0**. Please update your input and try again.`

This moderation is managed by the provider. To continue generating, you must update your inputs to comply with the restrictions.

Please note that repeated attempts to re-run the same moderated inputs may increase your likelihood of automated account suspension. Please update your inputs after encountering a moderation error before generating again.