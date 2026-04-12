create table users (
  id text primary key,
  name text,
  email text,
  email_verified timestamptz,
  image text,
  github_login text,
  display_name text,
  created_at timestamptz not null default now()
);

create unique index users_email_idx on users(email);

create table auth_accounts (
  user_id text not null references users(id) on delete cascade,
  type text not null,
  provider text not null,
  provider_account_id text not null,
  refresh_token text,
  access_token text,
  expires_at integer,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  primary key (provider, provider_account_id)
);

create table auth_sessions (
  session_token text primary key,
  user_id text not null references users(id) on delete cascade,
  expires timestamptz not null
);

create table auth_verification_tokens (
  identifier text not null,
  token text not null,
  expires timestamptz not null,
  primary key (identifier, token)
);

create table auth_authenticators (
  credential_id text not null unique,
  user_id text not null references users(id) on delete cascade,
  provider_account_id text not null,
  credential_public_key text not null,
  counter integer not null,
  credential_device_type text not null,
  credential_backed_up boolean not null,
  transports text,
  primary key (user_id, credential_id)
);

create table devices (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  nickname text not null,
  platform text not null,
  ingest_key_hash text not null,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

create table projects (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  canonical_key text not null,
  current_alias text,
  pinned boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index projects_user_canonical_idx on projects(user_id, canonical_key);

create table project_aliases (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  alias text not null,
  created_at timestamptz not null default now()
);

create table sessions (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  device_id text references devices(id) on delete set null,
  project_id text references projects(id) on delete set null,
  surface text not null,
  remote_controlled boolean not null default false,
  model_summary text,
  started_at timestamptz not null,
  ended_at timestamptz,
  duration_seconds integer,
  active_seconds integer,
  idle_seconds integer,
  estimated_cost_cents integer not null default 0,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  cache_tokens bigint not null default 0
);

create table prompts (
  id text primary key,
  session_id text references sessions(id) on delete set null,
  submitted_at timestamptz not null default now(),
  prompt_index integer not null default 0
);

create table api_requests (
  id text primary key,
  session_id text not null references sessions(id) on delete cascade,
  prompt_id text references prompts(id) on delete set null,
  requested_at timestamptz not null default now(),
  completed_at timestamptz,
  model text,
  estimated_cost_cents integer not null default 0,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cache_tokens integer not null default 0
);

create table api_errors (
  id text primary key,
  session_id text not null references sessions(id) on delete cascade,
  request_id text references api_requests(id) on delete set null,
  occurred_at timestamptz not null default now(),
  code text,
  message text
);

create table tool_results (
  id text primary key,
  session_id text not null references sessions(id) on delete cascade,
  prompt_id text references prompts(id) on delete set null,
  tool_name text not null,
  category text,
  started_at timestamptz not null default now(),
  duration_ms integer,
  success boolean not null
);

create table tool_decisions (
  id text primary key,
  session_id text not null references sessions(id) on delete cascade,
  tool_result_id text references tool_results(id) on delete set null,
  decision text not null,
  occurred_at timestamptz not null default now()
);

create table session_events (
  id text primary key,
  session_id text not null references sessions(id) on delete cascade,
  prompt_id text references prompts(id) on delete set null,
  event_type text not null,
  occurred_at timestamptz not null default now(),
  device_id text references devices(id) on delete set null,
  project_id text references projects(id) on delete set null,
  tool_name text,
  success boolean,
  duration_ms integer,
  estimated_cost_cents integer,
  input_tokens integer,
  output_tokens integer,
  cache_tokens integer
);

create table daily_rollups (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  rollup_date timestamptz not null,
  session_count integer not null default 0,
  estimated_cost_cents integer not null default 0,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  cache_tokens bigint not null default 0
);

create table shares (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  share_slug text not null unique,
  visibility text not null check (visibility in ('private', 'public')),
  redaction_config jsonb not null default '{}'::jsonb,
  published_at timestamptz
);

create table rank_snapshots (
  id text primary key,
  user_id text not null references users(id) on delete cascade,
  dimension text not null,
  percentile numeric(5,2) not null,
  sampled_at timestamptz not null default now()
);
