-- ============================================================
-- LeadOrbit CRM — Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- WORKSPACES
-- One workspace = one company/team
-- ============================================================
create table public.workspaces (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text not null unique,
  logo_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- PROFILES
-- One profile per auth.users row (created via trigger)
-- ============================================================
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  avatar_url    text,
  phone         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- WORKSPACE MEMBERS
-- Many-to-many: users ↔ workspaces, with roles
-- ============================================================
create type public.workspace_role as enum ('owner', 'admin', 'manager', 'agent');

create table public.workspace_members (
  id            uuid primary key default uuid_generate_v4(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  role          public.workspace_role not null default 'agent',
  invited_at    timestamptz not null default now(),
  joined_at     timestamptz,
  unique (workspace_id, user_id)
);

-- ============================================================
-- META PAGES
-- Facebook/Meta pages connected to a workspace
-- ============================================================
create table public.meta_pages (
  id              uuid primary key default uuid_generate_v4(),
  workspace_id    uuid not null references public.workspaces(id) on delete cascade,
  page_id         text not null,
  page_name       text not null,
  access_token    text,
  is_active       boolean not null default true,
  connected_at    timestamptz not null default now(),
  unique (workspace_id, page_id)
);

-- ============================================================
-- LEADS
-- Core lead record — one row per Meta lead (or manual entry)
-- ============================================================
create type public.lead_status as enum ('new', 'contacted', 'follow_up', 'won', 'lost');
create type public.lead_source as enum ('meta_ads', 'manual', 'import');

create table public.leads (
  id              uuid primary key default uuid_generate_v4(),
  workspace_id    uuid not null references public.workspaces(id) on delete cascade,
  meta_page_id    uuid references public.meta_pages(id) on delete set null,

  -- Lead info from Meta
  full_name       text not null,
  email           text,
  phone           text,
  meta_lead_id    text,                    -- Meta's lead gen ID (for dedup)
  ad_name         text,                    -- Which ad they came from
  form_name       text,                    -- Which lead form
  raw_meta_data   jsonb,                   -- Full Meta payload stored as-is

  -- CRM fields
  status          public.lead_status not null default 'new',
  source          public.lead_source not null default 'meta_ads',
  assigned_to     uuid references public.profiles(id) on delete set null,
  notes           text,
  next_follow_up  timestamptz,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  unique (workspace_id, meta_lead_id)      -- prevent duplicate Meta leads
);

-- ============================================================
-- ACTIVITIES
-- Every action on a lead is recorded here (timeline)
-- ============================================================
create type public.activity_type as enum (
  'lead_created',
  'status_changed',
  'assigned',
  'note_added',
  'follow_up_set',
  'whatsapp_sent',
  'email_sent',
  'called',
  'deal_won',
  'deal_lost'
);

create table public.activities (
  id            uuid primary key default uuid_generate_v4(),
  lead_id       uuid not null references public.leads(id) on delete cascade,
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  user_id       uuid references public.profiles(id) on delete set null,
  type          public.activity_type not null,
  body          text,                      -- human-readable description
  metadata      jsonb,                     -- extra data (old/new status, etc.)
  created_at    timestamptz not null default now()
);

-- ============================================================
-- NOTIFICATIONS
-- Notification log for WhatsApp / email dispatches
-- ============================================================
create type public.notification_channel as enum ('whatsapp', 'email', 'in_app');
create type public.notification_status  as enum ('pending', 'sent', 'failed', 'read');

create table public.notifications (
  id            uuid primary key default uuid_generate_v4(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  lead_id       uuid references public.leads(id) on delete set null,
  channel       public.notification_channel not null,
  title         text not null,
  body          text,
  status        public.notification_status not null default 'pending',
  sent_at       timestamptz,
  read_at       timestamptz,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- FOLLOW-UP REMINDERS
-- Scheduled follow-ups linked to a lead
-- ============================================================
create table public.reminders (
  id            uuid primary key default uuid_generate_v4(),
  lead_id       uuid not null references public.leads(id) on delete cascade,
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  assigned_to   uuid references public.profiles(id) on delete set null,
  due_at        timestamptz not null,
  note          text,
  is_done       boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at on leads and workspaces
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure public.set_updated_at();

create trigger workspaces_updated_at
  before update on public.workspaces
  for each row execute procedure public.set_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.workspaces        enable row level security;
alter table public.profiles          enable row level security;
alter table public.workspace_members enable row level security;
alter table public.meta_pages        enable row level security;
alter table public.leads             enable row level security;
alter table public.activities        enable row level security;
alter table public.notifications     enable row level security;
alter table public.reminders         enable row level security;

-- Helper: is the current user a member of a workspace?
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
  );
$$;

-- Helper: get role in workspace
create or replace function public.workspace_role(ws_id uuid)
returns public.workspace_role language sql security definer as $$
  select role from public.workspace_members
  where workspace_id = ws_id and user_id = auth.uid()
  limit 1;
$$;

-- Profiles: user can read/update their own
create policy "profiles_select" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_update" on public.profiles
  for update using (id = auth.uid());

-- Workspaces: members can read their workspace
create policy "workspaces_select" on public.workspaces
  for select using (public.is_workspace_member(id));

create policy "workspaces_update" on public.workspaces
  for update using (public.workspace_role(id) in ('owner', 'admin'));

-- Workspace members: members can see other members
create policy "members_select" on public.workspace_members
  for select using (public.is_workspace_member(workspace_id));

create policy "members_insert" on public.workspace_members
  for insert with check (public.workspace_role(workspace_id) in ('owner', 'admin'));

create policy "members_delete" on public.workspace_members
  for delete using (public.workspace_role(workspace_id) in ('owner', 'admin'));

-- Leads: any workspace member can read; agents limited to assigned leads handled in app layer
create policy "leads_select" on public.leads
  for select using (public.is_workspace_member(workspace_id));

create policy "leads_insert" on public.leads
  for insert with check (public.is_workspace_member(workspace_id));

create policy "leads_update" on public.leads
  for update using (public.is_workspace_member(workspace_id));

create policy "leads_delete" on public.leads
  for delete using (public.workspace_role(workspace_id) in ('owner', 'admin', 'manager'));

-- Activities
create policy "activities_select" on public.activities
  for select using (public.is_workspace_member(workspace_id));

create policy "activities_insert" on public.activities
  for insert with check (public.is_workspace_member(workspace_id));

-- Notifications: only the user they belong to
create policy "notifications_select" on public.notifications
  for select using (user_id = auth.uid());

create policy "notifications_update" on public.notifications
  for update using (user_id = auth.uid());

-- Reminders
create policy "reminders_select" on public.reminders
  for select using (public.is_workspace_member(workspace_id));

create policy "reminders_insert" on public.reminders
  for insert with check (public.is_workspace_member(workspace_id));

create policy "reminders_update" on public.reminders
  for update using (public.is_workspace_member(workspace_id));

-- Meta pages
create policy "meta_pages_select" on public.meta_pages
  for select using (public.is_workspace_member(workspace_id));

create policy "meta_pages_insert" on public.meta_pages
  for insert with check (public.workspace_role(workspace_id) in ('owner', 'admin'));

create policy "meta_pages_update" on public.meta_pages
  for update using (public.workspace_role(workspace_id) in ('owner', 'admin'));

-- ============================================================
-- INDEXES for performance
-- ============================================================
create index leads_workspace_id_idx     on public.leads(workspace_id);
create index leads_status_idx           on public.leads(status);
create index leads_assigned_to_idx      on public.leads(assigned_to);
create index leads_created_at_idx       on public.leads(created_at desc);
create index activities_lead_id_idx     on public.activities(lead_id);
create index activities_workspace_id_idx on public.activities(workspace_id);
create index notifications_user_id_idx  on public.notifications(user_id);
create index reminders_lead_id_idx      on public.reminders(lead_id);
create index reminders_due_at_idx       on public.reminders(due_at);
