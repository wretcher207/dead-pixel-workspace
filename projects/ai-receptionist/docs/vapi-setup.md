# Vapi Voice Setup

Add phone/voice capabilities to the AI Receptionist using Vapi. You get $10 free credit to test with.

## Prerequisites

- n8n running and the chat workflow working (see n8n-setup.md)
- n8n accessible from the internet (use ngrok for local dev)
- Vapi account at [vapi.ai](https://vapi.ai)

## 1. Expose n8n to the Internet

Vapi needs to reach your n8n webhook. For local development, use ngrok:

```bash
ngrok http 5678
```

Note the HTTPS URL (e.g., `https://abc123.ngrok-free.app`). Your voice webhook will be:

```
https://abc123.ngrok-free.app/webhook/receptionist-voice
```

For production, deploy n8n to a VPS with a real domain and SSL.

## 2. Import the Voice Workflow

1. In n8n, import `n8n-workflows/receptionist-voice.json`
2. Update the Telegram credential in the "Send Call Summary" node
3. Activate the workflow

## 3. Create a Vapi Assistant

1. Log into [Vapi Dashboard](https://dashboard.vapi.ai)
2. Go to **Assistants** > **Create Assistant**
3. Configure:

**Model:**
- Provider: OpenAI
- Model: gpt-4o-mini
- Temperature: 0.3

**System Prompt:**
```
You are Amy, the AI receptionist for Aroostook Family Dental in Presque Isle, Maine.

You answer phone calls for the dental office. Be friendly, professional, and concise. You have a warm New England manner.

Your capabilities:
- Answer questions about hours, services, pricing, and insurance
- Check appointment availability and book appointments
- Take messages for the staff
- Transfer to a human when needed

Rules:
- Keep responses short — this is a phone call, not an essay
- Confirm appointment details before booking
- If you can't help, take a message
- Escalate billing disputes, complaints, legal questions, and requests to speak directly with the dentist

The office is at 45 Main Street, Presque Isle, ME 04769. Phone: (207) 555-0142.
```

**First Message:**
```
Hi, thank you for calling Aroostook Family Dental! This is Amy. How can I help you today?
```

**Voice:**
- Provider: ElevenLabs or Deepgram
- Pick a natural female voice (try "Sarah" or "Emily" on ElevenLabs)

**Tools (Functions):**

Add these server-side functions:

### get_business_info
```json
{
  "name": "get_business_info",
  "description": "Get information about the business including hours, services, pricing, and FAQ answers",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "What the caller is asking about"
      }
    },
    "required": ["query"]
  }
}
```

### check_availability
```json
{
  "name": "check_availability",
  "description": "Check if a specific date and time is available for an appointment",
  "parameters": {
    "type": "object",
    "properties": {
      "date": { "type": "string", "description": "Date in YYYY-MM-DD format" },
      "time": { "type": "string", "description": "Time in HH:MM 24-hour format" },
      "appointment_type": { "type": "string", "description": "Type of appointment" }
    },
    "required": ["date", "time", "appointment_type"]
  }
}
```

### book_appointment
```json
{
  "name": "book_appointment",
  "description": "Book an appointment after confirming with the caller",
  "parameters": {
    "type": "object",
    "properties": {
      "patient_name": { "type": "string" },
      "patient_phone": { "type": "string" },
      "appointment_type": { "type": "string" },
      "date": { "type": "string" },
      "time": { "type": "string" },
      "notes": { "type": "string" }
    },
    "required": ["patient_name", "patient_phone", "appointment_type", "date", "time"]
  }
}
```

### take_message
```json
{
  "name": "take_message",
  "description": "Take a message from the caller for the office staff",
  "parameters": {
    "type": "object",
    "properties": {
      "caller_name": { "type": "string" },
      "caller_phone": { "type": "string" },
      "message": { "type": "string" },
      "urgency": { "type": "string", "enum": ["low", "medium", "high"] }
    },
    "required": ["caller_name", "caller_phone", "message", "urgency"]
  }
}
```

### transfer_to_human
```json
{
  "name": "transfer_to_human",
  "description": "Transfer the call to a human staff member",
  "parameters": {
    "type": "object",
    "properties": {
      "reason": { "type": "string" },
      "caller_name": { "type": "string" },
      "conversation_summary": { "type": "string" }
    },
    "required": ["reason", "conversation_summary"]
  }
}
```

## 4. Set the Server URL

In the Vapi assistant settings:

1. Go to **Advanced** > **Server URL**
2. Set it to your n8n voice webhook:
   ```
   https://your-domain.com/webhook/receptionist-voice
   ```
3. Enable **Server Messages**: `tool-calls`, `end-of-call-report`

## 5. Test the Voice Assistant

### Via Vapi Dashboard
1. Click the phone icon on your assistant page
2. Speak to it — ask about hours, services, or try booking an appointment
3. Check n8n execution logs to see the tool calls flowing through

### Via Phone Number
1. In Vapi, go to **Phone Numbers** > **Buy Number** (costs a few cents from your $10 credit)
2. Assign your assistant to the number
3. Call it from your phone

## 6. Monitor Calls

After each call ends, Vapi sends an `end-of-call-report` to the voice webhook. The workflow sends a summary to Telegram with:
- Call duration
- Summary of what was discussed
- Full transcript

Check the n8n execution log for detailed debugging.

## Cost Estimate

With $10 Vapi credit:
- ~50-100 test calls depending on length
- Each minute costs roughly $0.05-0.10 (STT + LLM + TTS)
- Phone number: ~$1/month

For production clients, a typical small business receptionist bot costs $30-50/month at normal call volumes.
