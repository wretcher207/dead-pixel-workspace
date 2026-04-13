import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("email_verified", { withTimezone: true, mode: "date" }),
    image: text("image"),
    githubLogin: text("github_login"),
    displayName: text("display_name"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)],
);

export const authAccounts = pgTable(
  "auth_accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => [primaryKey({ columns: [table.provider, table.providerAccountId] })],
);

export const authSessions = pgTable("auth_sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true, mode: "date" }).notNull(),
});

export const authVerificationTokens = pgTable(
  "auth_verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })],
);

export const authAuthenticators = pgTable(
  "auth_authenticators",
  {
    credentialID: text("credential_id").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
  },
  (table) => [primaryKey({ columns: [table.userId, table.credentialID] })],
);

export const devices = pgTable("devices", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  nickname: text("nickname").notNull(),
  platform: text("platform").notNull(),
  ingestKeyHash: text("ingest_key_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true, mode: "date" }),
});

export const projects = pgTable(
  "projects",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    canonicalKey: text("canonical_key").notNull(),
    currentAlias: text("current_alias"),
    pinned: boolean("pinned").notNull().default(false),
    archived: boolean("archived").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("projects_user_canonical_idx").on(table.userId, table.canonicalKey)],
);

export const projectAliases = pgTable("project_aliases", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  alias: text("alias").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const prompts = pgTable("prompts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionId: text("session_id").references(() => sessions.id, {
    onDelete: "set null",
  }),
  submittedAt: timestamp("submitted_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  promptIndex: integer("prompt_index").notNull().default(0),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  deviceId: text("device_id").references(() => devices.id, { onDelete: "set null" }),
  projectId: text("project_id").references(() => projects.id, { onDelete: "set null" }),
  surface: text("surface").notNull(),
  remoteControlled: boolean("remote_controlled").notNull().default(false),
  modelSummary: text("model_summary"),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "date" }).notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true, mode: "date" }),
  durationSeconds: integer("duration_seconds"),
  activeSeconds: integer("active_seconds"),
  idleSeconds: integer("idle_seconds"),
  estimatedCostCents: integer("estimated_cost_cents").notNull().default(0),
  inputTokens: bigint("input_tokens", { mode: "number" }).notNull().default(0),
  outputTokens: bigint("output_tokens", { mode: "number" }).notNull().default(0),
  cacheTokens: bigint("cache_tokens", { mode: "number" }).notNull().default(0),
});

export const apiRequests = pgTable("api_requests", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  promptId: text("prompt_id").references(() => prompts.id, { onDelete: "set null" }),
  requestedAt: timestamp("requested_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true, mode: "date" }),
  model: text("model"),
  estimatedCostCents: integer("estimated_cost_cents").notNull().default(0),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  cacheTokens: integer("cache_tokens").notNull().default(0),
});

export const apiErrors = pgTable("api_errors", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  requestId: text("request_id").references(() => apiRequests.id, { onDelete: "set null" }),
  occurredAt: timestamp("occurred_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  code: text("code"),
  message: text("message"),
});

export const toolResults = pgTable("tool_results", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  promptId: text("prompt_id").references(() => prompts.id, { onDelete: "set null" }),
  toolName: text("tool_name").notNull(),
  category: text("category"),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  durationMs: integer("duration_ms"),
  success: boolean("success").notNull(),
});

export const toolDecisions = pgTable("tool_decisions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  toolResultId: text("tool_result_id").references(() => toolResults.id, {
    onDelete: "set null",
  }),
  decision: text("decision").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const sessionEvents = pgTable("session_events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  promptId: text("prompt_id").references(() => prompts.id, { onDelete: "set null" }),
  eventType: text("event_type").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  deviceId: text("device_id").references(() => devices.id, { onDelete: "set null" }),
  projectId: text("project_id").references(() => projects.id, { onDelete: "set null" }),
  toolName: text("tool_name"),
  success: boolean("success"),
  durationMs: integer("duration_ms"),
  estimatedCostCents: integer("estimated_cost_cents"),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  cacheTokens: integer("cache_tokens"),
});

export const dailyRollups = pgTable("daily_rollups", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rollupDate: timestamp("rollup_date", { withTimezone: true, mode: "date" }).notNull(),
  sessionCount: integer("session_count").notNull().default(0),
  estimatedCostCents: integer("estimated_cost_cents").notNull().default(0),
  inputTokens: bigint("input_tokens", { mode: "number" }).notNull().default(0),
  outputTokens: bigint("output_tokens", { mode: "number" }).notNull().default(0),
  cacheTokens: bigint("cache_tokens", { mode: "number" }).notNull().default(0),
});

export const shares = pgTable("shares", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  shareSlug: text("share_slug").notNull().unique(),
  visibility: text("visibility").notNull(),
  redactionConfig: jsonb("redaction_config").notNull().default({}),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
});

export const rankSnapshots = pgTable("rank_snapshots", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  dimension: text("dimension").notNull(),
  percentile: numeric("percentile", { precision: 5, scale: 2 }).notNull(),
  sampledAt: timestamp("sampled_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  devices: many(devices),
  projects: many(projects),
  productSessions: many(sessions),
}));
