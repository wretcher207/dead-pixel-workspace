# AI Receptionist

An AI-powered receptionist that handles chat and voice calls for small businesses. Built with n8n (self-hosted, free), designed to plug into Vapi for voice.

This is Dead Pixel Design's practice build for offering agentic services to local businesses.

## Architecture

```
                         ┌──────────────────────────────────┐
                         │           n8n (self-hosted)       │
                         │                                   │
  Web Chat Widget ──────>│  Webhook -> AI Agent -> Tools     │
  (HTML/JS)        POST  │              |                    │
                         │              |-> Business Info     │
  Vapi (voice) ────────>│              |-> Calendar Check    │
  webhook          POST  │              |-> Book Appointment  │
                         │              |-> Take Message      │
                         │              └-> Escalate          │
                         │                                   │
                         │  --> Notify Owner (Telegram/Email) │
                         └──────────────────────────────────┘
                                        |
                                        v
                              Google Calendar API (free)
```

## What It Does

- Answers questions about the business (hours, services, pricing, FAQ)
- Checks calendar availability and books appointments
- Takes messages when the office is closed or the bot can't help
- Escalates to a human for sensitive topics (billing, complaints, legal)
- Notifies the business owner via Telegram or email
- Maintains conversation memory per session

## Project Structure

```
ai-receptionist/
├── business-config/
│   └── sample-business.json     # Template — customize per client
├── n8n-workflows/
│   ├── receptionist-chat.json   # Chat mode workflow (import into n8n)
│   └── receptionist-voice.json  # Voice mode workflow (Vapi integration)
├── chat-widget/
│   ├── index.html               # Standalone chat UI
│   └── widget.js                # Chat logic (vanilla JS)
└── docs/
    ├── n8n-setup.md             # Docker + credentials setup
    ├── vapi-setup.md            # Voice layer setup
    └── client-onboarding.md     # Per-client customization
```

## Quick Start

### 1. Start n8n

```bash
docker compose up -d
```

Open `http://localhost:5678`

### 2. Import the chat workflow

Workflows > Import from File > select `n8n-workflows/receptionist-chat.json`

### 3. Add credentials

- OpenAI API key (or swap for Ollama)
- Google Calendar OAuth2 (for scheduling)
- Telegram bot token (for notifications)

### 4. Activate and test

Toggle the workflow active, open `chat-widget/index.html`, start chatting.

See `docs/n8n-setup.md` for detailed instructions.

## Tech Stack

| Tool | Cost | Purpose |
|------|------|---------|
| n8n (self-hosted) | Free | Workflow orchestration + AI agent |
| Google Calendar API | Free | Appointment scheduling |
| Telegram Bot API | Free | Owner notifications |
| OpenAI API | Pay per use | LLM brain (or use Ollama for free) |
| Vapi | $10 free credit | Voice AI layer (Phase 2) |

## Phases

**Phase 1 (current): Chat** — Web chat widget + n8n AI agent. 100% free with Ollama, or pennies per conversation with OpenAI.

**Phase 2: Voice** — Vapi integration for phone calls. Same AI brain, different interface. $10 free credit gets you ~50-100 test calls.

## Customizing for a Client

See `docs/client-onboarding.md` for the full process. Short version:

1. Copy and edit `business-config/sample-business.json`
2. Update the business config in the n8n workflow
3. Brand the chat widget (colors, name, greeting)
4. Connect their calendar and notification preferences
5. Deploy and test
