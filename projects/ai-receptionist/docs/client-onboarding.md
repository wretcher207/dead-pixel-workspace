# Client Onboarding Guide

How to customize the AI Receptionist for a new business.

## What You Need From the Client

Before setup, collect:

1. **Business basics** — name, address, phone, email, website
2. **Hours of operation** — per day, including any seasonal changes
3. **Services offered** — name, rough pricing, duration
4. **Common questions** — the stuff their receptionist answers 20 times a day
5. **Appointment types** — what can be booked, how long each takes
6. **Policies** — cancellation, late arrival, new patient process
7. **Owner/manager contact** — who gets notifications, how (Telegram, email, SMS)
8. **Brand voice** — professional/casual/friendly? Any phrases they always use?
9. **Escalation rules** — what should always go to a human?

## Step-by-Step Setup

### 1. Create the Business Config

Copy `business-config/sample-business.json` and fill in the client's info:

```bash
cp business-config/sample-business.json business-config/clientname.json
```

Edit every field. Pay attention to:
- `ai_receptionist.name` — pick something that fits the business
- `ai_receptionist.personality` — match their brand
- `ai_receptionist.greeting` — first thing callers hear/see
- `ai_receptionist.escalation_triggers` — unique to each business
- `owner.notification_methods` — how they want to be alerted

### 2. Update the n8n Workflow

In the **Load Business Config** code node:
- Replace the embedded config with the client's JSON
- Or better: point it at a file/database so you can update without touching the workflow

In the **AI Receptionist Agent** system prompt:
- The prompt auto-populates from the config, but review it
- Add any business-specific instructions (e.g., "Always mention we have free parking")

### 3. Connect Their Calendar

Option A — **Their Google Calendar** (they share it with you):
1. Have the client share their booking calendar with a service account
2. Update the Google Calendar credential in n8n

Option B — **Dedicated calendar** (you manage it):
1. Create a Google Calendar specifically for this client's bookings
2. Share it with the client so they can see appointments

### 4. Set Up Notifications

**Telegram** (recommended — instant, free):
1. Have the client install Telegram
2. They message your notification bot
3. Save their chat ID in the config

**Email:**
1. Update the email address in the config
2. Make sure SMTP credentials are configured in n8n

### 5. Brand the Chat Widget

Edit `chat-widget/index.html`:
- Change the avatar letter and color to match their brand
- Update `agent-name` and `business-name` in the HTML
- Swap `--accent` color in CSS variables to their brand color
- Update the greeting in `widget.js`
- Change "Dead Pixel Design" in the footer (or keep it for attribution)

### 6. Deploy the Widget

**Option A — Embed in their existing site:**
```html
<iframe
  src="https://your-host.com/chat-widget/index.html"
  style="position: fixed; bottom: 20px; right: 20px; width: 380px; height: 600px; border: none; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); z-index: 9999;"
></iframe>
```

**Option B — Standalone page:**
Deploy the chat widget HTML to Netlify/Vercel as its own page.

**Option C — Pop-up widget:**
Add a chat button that expands into the iframe on click. Simple JS toggle.

### 7. Add Voice (Optional — Vapi)

Follow `docs/vapi-setup.md`, but:
1. Create a separate Vapi assistant for this client
2. Use their business config for the system prompt
3. Buy a local phone number in their area code if possible
4. Forward their existing business number to the Vapi number (or set Vapi as overflow)

### 8. Test Everything

Run through these scenarios:

- [ ] Ask about hours — correct for today?
- [ ] Ask about services — pricing right?
- [ ] Ask about insurance — accurate info?
- [ ] Try to book an appointment — calendar event created?
- [ ] Ask something the bot can't answer — does it take a message?
- [ ] Trigger escalation — does it notify the owner?
- [ ] Chat outside business hours — correct off-hours behavior?
- [ ] Send rapid messages — does session memory work?

### 9. Hand Off to Client

Give them:
- The chat widget URL or embed code
- Their Vapi phone number (if using voice)
- How to check messages/notifications
- How to update hours or info (if they'll self-manage)
- Your contact for changes they can't make themselves

## Pricing This as a Service

Suggested pricing model:

| Tier | What's Included | Monthly |
|------|----------------|---------|
| Chat Only | Web chat widget, business config, notifications | $99/mo |
| Chat + Voice | Above + Vapi voice, local phone number | $199/mo |
| Full Service | Above + calendar management, monthly config updates | $299/mo |

Setup fee: $250-500 depending on complexity.

Costs to you per client:
- n8n hosting: ~$5-10/mo (shared VPS)
- Vapi: ~$10-30/mo depending on call volume
- Phone number: ~$1/mo
- OpenAI API: ~$5-15/mo depending on usage

Margin is strong, especially at scale with multiple clients on the same n8n instance.
