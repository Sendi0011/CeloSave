export const NOTIFICATION_SCHEMA_SQL = `
-- ============================================================================
-- NOTIFICATIONS CORE TABLES
-- ============================================================================

-- Main notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_address TEXT NOT NULL,
  notification_type TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'MEDIUM',
  status TEXT NOT NULL DEFAULT 'PENDING',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  action_label TEXT,
  action_data JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  channels TEXT[] DEFAULT ARRAY['IN_APP']::TEXT[],
  is_read BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  group_key TEXT,
  CONSTRAINT valid_type CHECK (notification_type IN (
    'PAYMENT_REMINDER', 'PAYMENT_DUE', 'PAYMENT_OVERDUE', 'PAYMENT_RECEIVED',
    'PAYOUT_READY', 'PAYOUT_RECEIVED', 'POOL_INVITE', 'MEMBER_JOINED',
    'MEMBER_LEFT', 'EMERGENCY_REQUEST', 'EMERGENCY_APPROVED', 'BADGE_EARNED',
    'REPUTATION_UP', 'REPUTATION_DOWN', 'MILESTONE_REACHED', 'POOL_COMPLETED',
    'ANNOUNCEMENT', 'SYSTEM_UPDATE', 'VERIFICATION_NEEDED', 'DISPUTE_RAISED',
    'POLL_CREATED', 'POLL_CLOSING'
  )),
  CONSTRAINT valid_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
  CONSTRAINT valid_status CHECK (status IN ('PENDING', 'SENT', 'DELIVERED', 'READ', 'CLICKED', 'FAILED', 'EXPIRED'))
);

-- Notification preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_address TEXT UNIQUE NOT NULL,
  email_enabled BOOLEAN DEFAULT TRUE,
  email_address TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_digest TEXT DEFAULT 'DAILY',
  email_digest_time TEXT DEFAULT '09:00',
  push_enabled BOOLEAN DEFAULT TRUE,
  push_subscription JSONB,
  inapp_enabled BOOLEAN DEFAULT TRUE,
  inapp_show_badge BOOLEAN DEFAULT TRUE,
  inapp_play_sound BOOLEAN DEFAULT TRUE,
  inapp_group_similar BOOLEAN DEFAULT TRUE,
  quiet_hours_enabled BOOLEAN DEFAULT FALSE,
  quiet_hours_start TEXT DEFAULT '22:00',
  quiet_hours_end TEXT DEFAULT '08:00',
  timezone TEXT DEFAULT 'UTC',
  paused_until TIMESTAMPTZ,
  type_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification templates
CREATE TABLE IF NOT EXISTS notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  notification_type TEXT NOT NULL,
  title_template TEXT NOT NULL,
  message_template TEXT NOT NULL,
  default_channels TEXT[] DEFAULT ARRAY['IN_APP']::TEXT[],
  default_priority TEXT DEFAULT 'MEDIUM',
  variables JSONB DEFAULT '[]',
  action_url TEXT,
  action_label TEXT,
  icon TEXT,
  color TEXT,
  expires_after INTEGER, -- hours
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification delivery tracking
CREATE TABLE IF NOT EXISTS notification_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  provider TEXT,
  external_id TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_channel CHECK (channel IN ('IN_APP', 'EMAIL', 'PUSH', 'SMS')),
  CONSTRAINT valid_status CHECK (status IN ('PENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED'))
);

-- Notification events (for analytics)
CREATE TABLE IF NOT EXISTS notification_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  user_address TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  CONSTRAINT valid_event_type CHECK (event_type IN (
    'CREATED', 'SENT', 'DELIVERED', 'READ', 'CLICKED', 'ARCHIVED', 
    'DELETED', 'FAILED', 'RETRIED', 'EXPIRED'
  ))
);

