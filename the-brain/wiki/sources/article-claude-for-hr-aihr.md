---
title: Claude for HR: Here's What We Learned From the AIHR Experiment
type: source
created: 2026-04-12
updated: 2026-04-12
sources: [self]
tags: [#claude, #claude-cowork, #hr, #business, #ai, #tools]
---

# Claude for HR: Here's What We Learned From the AIHR Experiment

## Summary
AIHR (Academy to Elevate HR) tested [[claude-cowork]]'s HR plugin across six core workflows: compensation analysis, offer drafting, onboarding, people reporting, performance reviews, and policy lookup. The tool dramatically reduces time on routine administrative work but revealed critical limitations—particularly a systematic 50-83% underestimation of senior compensation due to reliance on thin public salary data. Verdict: first-draft engine requiring human judgment, not standalone replacement for strategic HR work.

## Key Claims
- Claude for HR runs inside [[claude-cowork]] with [[connectors]] to ATS, HRIS, calendar, email, chat, knowledge base, compensation data
- Six slash commands (/comp-analysis, /draft-offer, /onboarding, /people-report, /performance-review, /policy-lookup) handle core HR workflows
- Compensation benchmarking shows 16% accuracy within ±5%, 61% critical mismatches over 15% off market
- Senior IC compensation systematically underestimated 50-80% (draws from Glassdoor, PayScale, LinkedIn—thin data for senior roles)
- Junior roles: Claude reasonably accurate for early orientation before verification
- Offer drafting works well with templated setup; requires human review for legal/compliance
- Onboarding generates role-specific first-week checklists and 30-60-90 day plans
- Performance review reduces drafting time 20 to 90 minutes (from scratch to refinement)
- Policy lookup most reliable use case since output grounded in company documents
- Compensation skill architecture (not configuration in vacuum) may improve accuracy with internal data layering

## Notable Details
- AIHR tested against Ravio (real-time payroll data across 46+ countries), Dutch tech sector
- Error margin widest at senior IC level—exactly where salary impact is highest
- Claude acknowledges limitations when asked directly; recommends third-party verification
- Default Claude systematically compresses salary ranges (smaller junior-to-senior gap than market reality)
- 43% of organizations now use AI for HR tasks, up 17% YoY
- 57% of HR professionals' time spent on administrative tasks, not strategic work
- Offer letter workflow: draft → review → DocuSign routing (if template-based setup done)
- People reports pull from Excel/Sheets/HRIS, narrative generated, optional PowerPoint output
- Manager must own performance review output; unedited Claude draft unacceptable
- /policy-lookup searches company docs, rewrites plainly, surfaces source section for verification

## Questions Raised
- How much does internal pay data layering improve compensation accuracy for senior roles?
- Can configured Claude instances with tuned compensation skills outperform the tested default?
- What governance safeguards prevent offers/reviews/analyses from being sent unreviewed?
- How does Claude for HR handle compensation data across different geographies and salary structures?

## Connections
- [[claude-cowork]] — platform for HR plugin
- [[connectors]] — integration mechanism to ATS, HRIS, etc.
- [[slash-commands]] — workflow invocation pattern
- [[first-draft-engine]] — philosophical positioning of the tool
- [[hr-automation]] — domain application
- [[compensation-benchmarking]] — high-stakes use case with documented limitations
- [[anthropic]] — creator
