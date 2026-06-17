// ============================================================
// LeadOrbit — Database types (mirrors schema.sql)
// ============================================================

export type WorkspaceRole = 'owner' | 'admin' | 'manager' | 'agent'
export type LeadStatus    = 'new' | 'contacted' | 'follow_up' | 'won' | 'lost'
export type LeadSource    = 'meta_ads' | 'manual' | 'import'
export type ActivityType  =
  | 'lead_created' | 'status_changed' | 'assigned' | 'note_added'
  | 'follow_up_set' | 'whatsapp_sent' | 'email_sent' | 'called'
  | 'deal_won' | 'deal_lost'
export type NotificationChannel = 'whatsapp' | 'email' | 'in_app'
export type NotificationStatus  = 'pending' | 'sent' | 'failed' | 'read'

// ── Tables ──────────────────────────────────────────────────

export interface Workspace {
  id:         string
  name:       string
  slug:       string
  logo_url:   string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id:         string
  full_name:  string | null
  avatar_url: string | null
  phone:      string | null
  created_at: string
  updated_at: string
}

export interface WorkspaceMember {
  id:           string
  workspace_id: string
  user_id:      string
  role:         WorkspaceRole
  invited_at:   string
  joined_at:    string | null
  // joins
  profile?:     Profile
  workspace?:   Workspace
}

export interface MetaPage {
  id:           string
  workspace_id: string
  page_id:      string
  page_name:    string
  access_token: string | null
  is_active:    boolean
  connected_at: string
}

export interface Lead {
  id:             string
  workspace_id:   string
  meta_page_id:   string | null
  full_name:      string
  email:          string | null
  phone:          string | null
  meta_lead_id:   string | null
  ad_name:        string | null
  form_name:      string | null
  raw_meta_data:  Record<string, unknown> | null
  status:         LeadStatus
  source:         LeadSource
  assigned_to:    string | null
  notes:          string | null
  next_follow_up: string | null
  created_at:     string
  updated_at:     string
  // joins
  assignee?:      Profile | null
  meta_page?:     MetaPage | null
  activities?:    Activity[]
  reminders?:     Reminder[]
}

export interface Activity {
  id:           string
  lead_id:      string
  workspace_id: string
  user_id:      string | null
  type:         ActivityType
  body:         string | null
  metadata:     Record<string, unknown> | null
  created_at:   string
  // joins
  user?:        Profile | null
}

export interface Notification {
  id:           string
  workspace_id: string
  user_id:      string
  lead_id:      string | null
  channel:      NotificationChannel
  title:        string
  body:         string | null
  status:       NotificationStatus
  sent_at:      string | null
  read_at:      string | null
  created_at:   string
  // joins
  lead?:        Lead | null
}

export interface Reminder {
  id:           string
  lead_id:      string
  workspace_id: string
  assigned_to:  string | null
  due_at:       string
  note:         string | null
  is_done:      boolean
  created_at:   string
  // joins
  assignee?:    Profile | null
}

// ── Supabase Database type map ───────────────────────────────

export type Database = {
  public: {
    Tables: {
      workspaces:        { Row: Workspace;        Insert: Omit<Workspace, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Workspace> }
      profiles:          { Row: Profile;          Insert: Omit<Profile,   'created_at' | 'updated_at'>;          Update: Partial<Profile> }
      workspace_members: { Row: WorkspaceMember;  Insert: Omit<WorkspaceMember, 'id' | 'invited_at'>;            Update: Partial<WorkspaceMember> }
      meta_pages:        { Row: MetaPage;         Insert: Omit<MetaPage, 'id' | 'connected_at'>;                 Update: Partial<MetaPage> }
      leads:             { Row: Lead;             Insert: Omit<Lead, 'id' | 'created_at' | 'updated_at'>;        Update: Partial<Lead> }
      activities:        { Row: Activity;         Insert: Omit<Activity, 'id' | 'created_at'>;                   Update: Partial<Activity> }
      notifications:     { Row: Notification;     Insert: Omit<Notification, 'id' | 'created_at'>;               Update: Partial<Notification> }
      reminders:         { Row: Reminder;         Insert: Omit<Reminder, 'id' | 'created_at'>;                   Update: Partial<Reminder> }
    }
    Enums: {
      workspace_role:         WorkspaceRole
      lead_status:            LeadStatus
      lead_source:            LeadSource
      activity_type:          ActivityType
      notification_channel:   NotificationChannel
      notification_status:    NotificationStatus
    }
  }
}
