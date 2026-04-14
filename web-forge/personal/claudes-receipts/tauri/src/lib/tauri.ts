import { invoke } from "@tauri-apps/api/core";
import type { AgentStatusResponse, HelperConfig } from "./types";

export const getAgentStatus = () =>
  invoke<AgentStatusResponse>("get_agent_status");

export const getConfig = () =>
  invoke<HelperConfig | null>("get_config");

export const saveConfig = (cfg: HelperConfig) =>
  invoke<void>("save_config", {
    endpoint: cfg.endpoint,
    deviceId: cfg.deviceId,
    ingestKey: cfg.ingestKey,
    surface: cfg.surface,
  });

export const setPaused = (paused: boolean) =>
  invoke<void>("set_paused", { paused });
