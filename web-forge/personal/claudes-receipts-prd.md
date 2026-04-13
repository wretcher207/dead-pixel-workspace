# Claude's Receipts
## Product Requirements Document

**Version:** v1.0  
**Status:** Draft  
**Product Type:** Premium browser-accessible analytics dashboard for Claude Code  
**Primary Audience:** Claude Code power users  
**Working Share Feature Name:** Receipt Mode

---

## 1. Executive Summary

**Claude's Receipts** is a premium, browser-accessible telemetry and analytics product for Claude Code users.

It turns live Claude Code usage into a polished intelligence dashboard showing:

- lifetime token usage
- hypothetical API-equivalent cost
- session timelines and autopsies
- project burn and efficiency
- tool usage and dependency
- device and surface breakdowns
- internal user ranking versus all users
- public and private shareable reports

The product is explicitly branded around Claude and designed to feel like an expensive internal system rather than a generic AI dashboard. The tone is dry, elegant, and faintly incriminating.

The first release focuses on **live telemetry for local Claude Code sessions and Remote Control sessions**, with a future path for browser/cloud attribution where technically appropriate.

---

## 2. Product Vision

Build the definitive usage intelligence layer for Claude Code.

This product should answer, at a glance and in depth:

- How much Claude did I actually use?
- Where did the tokens go?
- Which projects consumed the most time and cost?
- Which tools did the damage?
- What would this have cost if it were metered like API usage?
- Which machine, surface, or session type drove the most activity?
- How do I compare with everyone else?

This is not a productivity cheerleader. It is a receipts engine.

---

## 3. Product Pillars

### 3.1 Truth
Only report what can be measured reliably. Distinguish clearly between exact telemetry and best-effort attribution.

### 3.2 Taste
The interface should feel premium, dark, disciplined, and expensive.

### 3.3 Personality
The copy should be deadpan, precise, and memorable without becoming goofy.

### 3.4 Shareability
Users should be able to publish their stats publicly or privately with clean presentation and strong redaction controls.

### 3.5 Personalization
Users should be able to rename machines, alias projects, curate what appears publicly, and shape the product to reflect their ecosystem.

---

## 4. Goals

### Primary Goals

- Provide truly live Claude Code usage tracking for supported local sessions
- Support multiple machines under a single user account
- Offer deep drill-down analytics for sessions, tools, projects, devices, and date ranges
- Allow users to personalize machine names and project aliases
- Provide public and private sharing
- Include an internal ranking system across all users
- Deliver a premium, brand-distinct visual and tonal experience

### Secondary Goals

- Support broader browser/cloud attribution over time
- Prepare for adoption beyond a single founder account
- Establish a clean architecture for future surfaces and providers

---

## 5. Non-Goals for v1

- Perfect fidelity tracking of all Claude web/cloud activity
- Storage of prompt text, code contents, or tool content
- Team administration or enterprise org management
- Multi-provider support beyond Claude
- Browser extension as the primary telemetry pipeline
- Heavy customization systems or theme toggles

---

## 6. Target Users

### Primary User
A heavy Claude Code user who:

- works across desktop, terminal, IDE, and remote-controlled sessions
- cares about exact receipts and historical visibility
- wants cost equivalence, project burn, and session quality insight
- likes premium tools and strong design
- may want to share results publicly

### Secondary User
A curious, usage-heavy Claude user who wants:

- clean weekly or monthly reports
- rankings versus other users
- public share cards and polished summaries
- minimal setup friction

---

## 7. Product Scope

### v1 Scope

Support the following well:

- Claude Code in terminal
- Claude Code in desktop
- Claude Code in IDE where the same local telemetry path is available
- Remote Control sessions from browser or phone into local sessions
- multiple devices under one account
- manual project aliases
- editable machine nicknames
- public and private shares
- internal all-user rankings
- beautiful summary panels with deeper drill-down views

### v1.5 Scope

Add:

- browser extension utility features
- browser/cloud session attribution where feasible
- session claiming/linking from Claude pages
- more advanced public sharing workflows
- import or linkage options for broader history

---

## 8. Core Product Assumptions

### 8.1 Local Helper App Owns Truth
The local helper app is the canonical source for supported local Claude Code telemetry.

### 8.2 Remote-Control Sessions Count as Local Sessions
If a user steers a local session from browser or phone, the helper app still owns truth while the dashboard labels the interaction mode.

### 8.3 Cloud/Web Claude Code Is a Separate Source
Browser/cloud sessions should not be treated as equal-fidelity data unless a suitable ingestion path exists.

### 8.4 Metadata-Only Analytics Are Enough
The product should not store prompt text or code content. Metadata-only analytics are sufficient to create a compelling and useful experience.

---

## 9. Experience Principles

### 9.1 Luxury Dark SaaS with a Pulse
The product should feel premium and alive, not trendy or synthetic.

### 9.2 Beautiful Static Intelligence Panels First
The home view should present gorgeous, calm, high-confidence cards. Clicking any card reveals deeper analysis.

### 9.3 Deadpan by Default
The tone should be dry and exact. It may become slightly savage when the numbers earn it.

### 9.4 No Whiff of Vibe Coding
Avoid aesthetic clichés such as:

- glassmorphism fog
- crypto-terminal cosplay
- generic purple AI gradients
- neon cyberpunk dashboards
- mascot robots
- startup fluff copy

---

## 10. Information Architecture

### 10.1 Home
The primary intelligence wall.

**Primary panels:**

- Lifetime Damage
- This Week's Damage
- 30-Day Burn
- Subscription Delusion Delta
- Highest Burn Project
- Most Expensive Day
- Tool Dependency Report
- Device Mix
- Top Session This Week
- Internal Standing

**Behavior:**

- each panel is clickable
- each click opens a focused drill-down page
- date filters supported across major views

### 10.2 Sessions Index
A searchable, filterable forensic archive.

**Features:**

- group by day, week, month
- filter by device
- filter by project
- filter by tool
- filter by session surface
- sort by cost, tokens, duration, active time, tool count, retries

### 10.3 Session Detail
The autopsy page.

**Fields:**

- session start and end
- total duration
- active time vs idle time
- input/output/cache token totals where available
- estimated API-equivalent cost
- model usage
- device and session surface
- remote-control presence
- project alias
- repo/source identifier
- API errors
- retry count
- tool count
- accepted/rejected decision counts

**Timeline View:**

A metadata-only chain such as:

- prompt submitted
- API request
- tool call
- tool result
- decision accepted or rejected
- error
- session summary

Prompt text is never shown.

### 10.4 Projects
The project intelligence hub.

**Features:**

- weekly, monthly, and all-time views
- manual aliases
- pinning and archiving
- top sessions by project
- burn trend
- efficiency trend
- tool composition
- machine distribution

### 10.5 Tools
The tool behavior analysis page.

**Features:**

- most used tools
- slowest tools
- most error-prone tools
- highest-cost-associated tools
- acceptance/rejection rates
- tool usage over time
- dependency index

### 10.6 Devices / Surfaces
Machine and interaction mode analysis.

**Features:**

- rename devices
- compare devices
- per-device trends
- local vs remote-controlled breakdown
- desktop vs terminal vs IDE views
- future browser/cloud attributed views

### 10.7 Share
Publishing and bragging with restraint.

**Share Types:**

- **Private link**
  - secret URL
  - optional expiry later
- **Public page**
  - publishable URL
  - light custom branding
  - redaction controls
  - rank display
  - social-share-ready layout

---

## 11. Core Features

## 11.1 Authentication
**v1 requirement:** GitHub login

**Requirements:**

- Sign in with GitHub
- Create a user account
- Link multiple devices to one user
- Generate per-device ingest keys

## 11.2 Local Helper App
**Priority:** Windows first, Linux-capable if low-friction

**Purpose:**
Collect Claude Code telemetry locally, normalize it, and upload it securely.

**Requirements:**

- Lightweight helper app
- Runs in background
- Starts at login
- Registers device to account
- Accepts or reads Claude Code telemetry
- Normalizes and batches events
- Uploads securely to backend
- Stores local queue for offline recovery
- Retries with backoff
- No prompt text storage
- No raw code storage
- Supports machine nicknames
- Supports project alias mapping

**Recommended stack:**

- Tauri
- small polished settings UI
- local encrypted or protected queue if feasible

## 11.3 Browser Dashboard
**Requirements:**

- Browser-accessible
- Netlify-friendly
- desktop-first but responsive
- premium loading and empty states
- real-time or near-real-time updates
- calm motion and rich drill-down depth

## 11.4 Browser Extension
**v1:** scaffold / minimal utility  
**v1.5:** meaningful convenience layer

**Purpose:** convenience, not truth

**Initial Features:**

- detect supported Claude pages
- open current context in Claude's Receipts
- support future session-claim flow
- add lightweight browser attribution later

**Non-goal:**
Use DOM scraping as the primary analytics backbone

---

## 12. Rankings

Internal ranking is a major feature, not decorative garnish.

### 12.1 Internal Ranking
Private comparison against **all users**.

**Examples:**

- Top 7% for weekly token damage
- Top 3% for lifetime sessions
- Top 11% for tool dependency
- More restrained than 41% of users

### 12.2 Public Ranking
Can be shown on public pages if enabled by the user.

### 12.3 Ranking Dimensions

- weekly tokens
- monthly tokens
- lifetime tokens
- weekly estimated cost
- monthly estimated cost
- session count
- average session duration
- tool dependency index
- retry spiral score
- project burn intensity

---

## 13. Metrics

### 13.1 Raw Metrics

- session count
- active time
- idle time
- prompt count
- input tokens
- output tokens
- cache tokens where available
- estimated request cost
- tool result counts
- tool decision counts
- API error counts
- accepted/rejected decisions
- per-tool duration
- per-session duration

### 13.2 Derived Metrics

- **API Equivalent Cost**
- **Subscription Value Delta**
- **Session Quality Score**
- **Idle Ratio**
- **Retry Spiral Score**
- **Tool Dependency Index**
- **Project Burn Score**
- **Machine Intensity Score**

### 13.3 Interpretation Styles
Examples of how a score or status may be described:

- Surgical
- Acceptable
- Expensive Wandering
- Committed Beyond Reason
- You Stayed With This

---

## 14. Data Model

### Core Tables

- `users`
- `devices`
- `sessions`
- `session_surfaces`
- `projects`
- `project_aliases`
- `prompts`
- `api_requests`
- `api_errors`
- `tool_results`
- `tool_decisions`
- `daily_rollups`
- `shares`
- `rank_snapshots`

### Data Rules

- `sessions` belong to `users`
- `sessions` may be associated with `devices`
- `projects` may have multiple user-defined aliases over time if history is preserved
- `prompts` store metadata only, not text
- `tool_results` store tool name, timing, duration, success/failure, and category metadata only
- `shares` store visibility state and redaction config
- `rank_snapshots` store percentile results for fast retrieval and historical comparison

---

## 15. Event Model

Each session should be reconstructable using ordered, metadata-only events.

### Event Types

- session started
- prompt submitted
- API request started
- API request completed
- API error
- tool started
- tool completed
- tool decision accepted
- tool decision rejected
- session ended

### Event Fields

- event ID
- session ID
- prompt ID where applicable
- timestamp
- event type
- device ID
- project ID
- tool name where applicable
- success/failure
- duration
- token fields where applicable
- estimated cost where applicable

---

## 16. Technical Architecture

## 16.1 Frontend

- Next.js
- TypeScript
- Netlify deployment target
- server components where useful
- premium charting and careful motion restraint

## 16.2 Backend

- API routes / functions
- PostgreSQL
- rollup jobs for summaries and rankings
- secure ingest endpoints
- share page rendering and public routing

## 16.3 Helper App

- Tauri
- secure registration flow
- local queue and retry system
- ingestion adapter for Claude Code telemetry

## 16.4 Extension

- minimal scaffold first
- convenience actions
- future cloud/web linking support

---

## 17. Design Direction

### Visual Language

- dark, expensive, composed
- Claude-adjacent warm neutrals and restrained accents
- crisp hierarchy
- elegant spacing
- refined paneling
- subtle motion, never loud motion

### Anti-Goals

- no terminal cosplay
- no neon cyberpunk
- no generic AI iconography
- no mascot robots
- no trend-chasing gradients
- no fluffy startup copy
- no feeling of being stitched together from vibes

### Tone
No toggle. The product voice is fixed.

It should be:

- deadpan
- exact
- premium
- occasionally savage when the numbers call for it

---

## 18. Copy Samples

### Panel Names

- Lifetime Damage
- 30-Day Burn
- Subscription Delusion Delta
- Highest Burn Project
- Retry Spiral
- Tool Dependency Report
- Most Expensive Conversation With A Machine
- Internal Standing

### Status Labels

- Acceptable
- Surgical
- Expensive Wandering
- Committed Beyond Reason
- You Stayed With This

---

## 19. Security and Privacy

### Must-Haves

- no prompt text storage
- no code content storage
- no raw tool input/output storage
- signed ingest keys
- per-device registration
- revocable device access
- encrypted transport
- redaction options for sharing

### Nice Later

- encryption at rest for helper queue
- user-managed export/delete flows
- privacy explanation UI

---

## 20. Success Metrics

### Product Success

- successful helper app install rate
- active dashboard return rate
- weekly share creation rate
- average tracked sessions per active user
- percentage of users who rename a project or device
- percentage of users who open drill-down pages
- public share conversion rate

### Experience Success

- users understand their usage quickly
- users trust the data
- users enjoy sharing the report
- product feels premium and intentional

---

## 21. MVP Milestones

### Milestone 1: Foundation

- auth
- schema
- helper app registration
- ingest endpoint
- seed data
- dashboard shell

### Milestone 2: Core Analytics

- home panels
- sessions index
- session detail
- project pages
- device pages
- derived metrics

### Milestone 3: Personality + Sharing

- ranking engine
- share pages
- light branding
- public cards
- copy polish

### Milestone 4: Extension Scaffold

- page detection
- open-in-dashboard
- future linking support

---

## 22. Open Questions for Build Phase

- Exact Claude Code telemetry hookup method in the helper app
- Ranking calculation cadence and caching strategy
- Public share page SEO behavior
- How much browser/cloud attribution should land in v1.5
- Whether public rank snapshots should freeze at publish time or remain live

---

## 23. Recommendation

Use **Claude's Receipts** as the product name.

Use **Receipt Mode** as the sharing/export feature family.

Build in this order:

1. helper app, because it owns truth
2. dashboard, because it owns taste
3. extension, because it owns convenience

The product should feel like a quiet, expensive system that knows exactly how much happened and is not especially impressed by it.
