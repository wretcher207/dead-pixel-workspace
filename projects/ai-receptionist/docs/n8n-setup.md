# n8n Setup Guide

Get the AI Receptionist running locally with Docker.

## Prerequisites

- Docker Desktop installed and running
- An OpenAI API key (or switch the LLM node to Ollama for fully free/local)
- Google account (for Calendar integration)

## 1. Run n8n with Docker Compose

Create a `docker-compose.yml` anywhere convenient:

```yaml
version: '3.8'
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
      - GENERIC_TIMEZONE=America/New_York
      - N8N_SECURE_COOKIE=false
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

Start it:

```bash
docker compose up -d
```

Open `http://localhost:5678` and log in with admin / changeme.

## 2. Import the Workflow

1. In n8n, click **Workflows** in the left sidebar
2. Click **Add workflow** > **Import from File**
3. Select `n8n-workflows/receptionist-chat.json`
4. The workflow loads with all nodes connected

## 3. Configure Credentials

### OpenAI API Key

1. Go to **Settings** > **Credentials** > **Add Credential**
2. Search for **OpenAI API**
3. Paste your API key
4. Save
5. Open the **OpenAI Chat Model** node in the workflow
6. Select your new credential

If you want fully free: swap the OpenAI node for an **Ollama** node and point it at a local Ollama instance running `llama3` or similar.

### Google Calendar (for appointment scheduling)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable the **Google Calendar API**
4. Create **OAuth 2.0 credentials** (Web Application type)
5. Set authorized redirect URI to: `http://localhost:5678/rest/oauth2-credential/callback`
6. In n8n, add a **Google Calendar OAuth2** credential with your Client ID and Secret
7. Click **Connect** — authorize with your Google account
8. Update the calendar nodes in the workflow to use this credential

### Telegram Bot (for owner notifications)

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow the prompts
3. Copy the bot token
4. In n8n, add a **Telegram** credential with the token
5. Get your chat ID by messaging [@userinfobot](https://t.me/userinfobot)
6. Update the `telegram_chat_id` in the Load Business Config node

## 4. Activate the Workflow

1. Toggle the workflow **Active** switch (top right)
2. Your webhook is now live at: `http://localhost:5678/webhook/receptionist-chat`

## 5. Test with the Chat Widget

1. Open `chat-widget/index.html` in your browser
2. The `WEBHOOK_URL` in `widget.js` defaults to `http://localhost:5678/webhook/receptionist-chat`
3. Type a message — you should see the AI respond

## 6. Test with curl

```bash
curl -X POST http://localhost:5678/webhook/receptionist-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your hours?", "session_id": "test-123"}'
```

Expected response:

```json
{
  "response": "We're open Monday through Wednesday 8 AM to 5 PM, Thursday 8 AM to 3 PM, and Friday 8 AM to noon. We're closed on weekends.",
  "session_id": "test-123"
}
```

## Troubleshooting

**Webhook returns 404**: Make sure the workflow is active (toggled on).

**CORS errors in browser**: The webhook node has `allowedOrigins: *` set. If you still get CORS errors, check that your n8n instance is accessible from where you're opening the HTML file.

**LLM not responding**: Check that your OpenAI credential is valid and has credit. Check n8n execution logs for error details.

**Calendar not connecting**: Make sure the redirect URI matches exactly. Google OAuth can be picky about trailing slashes.
