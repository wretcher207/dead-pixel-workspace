export type AgentState =
  | { status: "unconfigured" }
  | { status: "watching"; last_flush_unix_ms: number; sessions_tracked: number }
  | { status: "paused" }
  | { status: "auth_error"; since_unix_ms: number };

export type AgentStatusResponse = {
  state: AgentState;
  hasConfig: boolean;
};

export type HelperConfig = {
  endpoint: string;
  deviceId: string;
  ingestKey: string;
  surface: string;
};
