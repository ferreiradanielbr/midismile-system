-- ============================================================
-- MediSmile Group — Initial schema
-- Tables: leads, conversations, messages
-- RLS: admin (authenticated) full access; anon insert for the chat widget.
-- ============================================================

-- ── LEADS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                TEXT NOT NULL,
  phone               TEXT,
  email               TEXT,
  language            TEXT NOT NULL DEFAULT 'en',          -- 'en' | 'pt' | 'es'
  service_interest    TEXT,
  insurance_plan      TEXT,
  preferred_unit      TEXT,                                -- 'winter_springs' | 'ocoee'
  urgency             TEXT NOT NULL DEFAULT 'normal',      -- 'low' | 'normal' | 'high'
  qualification_score INTEGER NOT NULL DEFAULT 0,          -- 0-100
  status              TEXT NOT NULL DEFAULT 'new',         -- new|contacted|qualified|scheduled|converted
  notes               TEXT,
  source              TEXT NOT NULL DEFAULT 'website_chat',
  whatsapp_sent_at    TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT leads_language_check  CHECK (language IN ('en', 'pt', 'es')),
  CONSTRAINT leads_unit_check      CHECK (preferred_unit IS NULL OR preferred_unit IN ('winter_springs', 'ocoee')),
  CONSTRAINT leads_urgency_check   CHECK (urgency IN ('low', 'normal', 'high')),
  CONSTRAINT leads_status_check    CHECK (status IN ('new', 'contacted', 'qualified', 'scheduled', 'converted')),
  CONSTRAINT leads_score_check     CHECK (qualification_score BETWEEN 0 AND 100)
);

-- ── CONVERSATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversations (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id     UUID REFERENCES leads(id) ON DELETE CASCADE,
  session_id  TEXT UNIQUE NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active',              -- 'active' | 'handed_off' | 'closed'
  language    TEXT NOT NULL DEFAULT 'en',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT conversations_status_check CHECK (status IN ('active', 'handed_off', 'closed'))
);

-- ── MESSAGES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id  UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role             TEXT NOT NULL,                          -- 'user' | 'assistant'
  content          TEXT NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT messages_role_check CHECK (role IN ('user', 'assistant'))
);

-- ── Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_leads_status            ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at        ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_lead_id   ON conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation   ON messages(conversation_id);

-- ── updated_at trigger ─────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Row Level Security ─────────────────────────────────────
ALTER TABLE leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages      ENABLE ROW LEVEL SECURITY;

-- Admin (authenticated) full access
CREATE POLICY "Admin full access — leads"         ON leads         FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access — conversations" ON conversations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access — messages"      ON messages      FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public insert (chat widget runs as anon)
CREATE POLICY "Public insert — leads"         ON leads         FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public insert — conversations" ON conversations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public insert — messages"      ON messages      FOR INSERT TO anon WITH CHECK (true);

-- NOTE: server-side writes use the service role key (bypasses RLS).
