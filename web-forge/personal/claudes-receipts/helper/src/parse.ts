export type RawRecord = Record<string, unknown>;

export type IngestEvent = {
  eventId: string;
  eventType: string;
  sessionId: string;
  timestamp: string;
  toolName?: string;
  success?: boolean;
  durationMs?: number;
  inputTokens?: number;
  outputTokens?: number;
  cacheTokens?: number;
  model?: string;
};

export type ParsedOutcome = {
  events: IngestEvent[];
  projectKey: string | null;
  surface: string;
};

type AssistantUsage = {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
};

type AssistantContentBlock = {
  type?: string;
  name?: string;
  id?: string;
};

type AssistantMessage = {
  model?: string;
  usage?: AssistantUsage;
  content?: AssistantContentBlock[];
  id?: string;
};

type UserContentBlock = {
  type?: string;
  tool_use_id?: string;
  is_error?: boolean;
};

type UserMessage = {
  content?: UserContentBlock[] | string;
};

export function parseRecord(
  raw: RawRecord,
  sessionId: string,
): IngestEvent[] {
  const events: IngestEvent[] = [];
  const timestamp =
    (raw.timestamp as string | undefined) ?? new Date().toISOString();
  const baseId = (raw.uuid as string | undefined) ?? cryptoRandom();

  if (raw.type === "queue-operation" && raw.operation === "enqueue") {
    events.push({
      eventId: `${baseId}-prompt`,
      eventType: "prompt_submitted",
      sessionId,
      timestamp,
    });
    return events;
  }

  if (raw.type === "assistant" && raw.message) {
    const message = raw.message as AssistantMessage;
    const usage = message.usage ?? {};
    events.push({
      eventId: `${baseId}-req`,
      eventType: "api_request_completed",
      sessionId,
      timestamp,
      inputTokens: usage.input_tokens ?? 0,
      outputTokens: usage.output_tokens ?? 0,
      cacheTokens:
        (usage.cache_creation_input_tokens ?? 0) +
        (usage.cache_read_input_tokens ?? 0),
      model: message.model ?? undefined,
    });

    if (Array.isArray(message.content)) {
      for (const block of message.content) {
        if (block.type === "tool_use" && block.name) {
          events.push({
            eventId: `${block.id ?? baseId}-tool`,
            eventType: "tool_completed",
            sessionId,
            timestamp,
            toolName: block.name,
            success: true,
          });
        }
      }
    }

    return events;
  }

  if (raw.type === "user" && raw.message) {
    const message = raw.message as UserMessage;
    if (Array.isArray(message.content)) {
      for (const block of message.content) {
        if (block.type === "tool_result" && block.is_error) {
          events.push({
            eventId: `${block.tool_use_id ?? baseId}-error`,
            eventType: "api_error",
            sessionId,
            timestamp,
          });
        }
      }
    }
    return events;
  }

  return events;
}

export function extractUsage(raw: RawRecord): {
  inputTokens: number;
  outputTokens: number;
  cacheTokens: number;
  model: string | null;
} | null {
  if (raw.type !== "assistant" || !raw.message) return null;
  const message = raw.message as AssistantMessage;
  const usage = message.usage;
  if (!usage) return null;
  return {
    inputTokens: usage.input_tokens ?? 0,
    outputTokens: usage.output_tokens ?? 0,
    cacheTokens:
      (usage.cache_creation_input_tokens ?? 0) +
      (usage.cache_read_input_tokens ?? 0),
    model: message.model ?? null,
  };
}

export function projectKeyFromPath(filePath: string): string {
  const parts = filePath.split(/[/\\]/);
  const idx = parts.findIndex((p) => p === "projects");
  if (idx === -1 || idx + 1 >= parts.length) return "unknown";
  const slug = parts[idx + 1];
  return slug.replace(/-/g, "/");
}

function cryptoRandom(): string {
  return (
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10)
  );
}
