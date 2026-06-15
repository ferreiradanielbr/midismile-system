/** Global domain types for the MediSmile platform. */

export type Language = 'en' | 'pt' | 'es';

export type Unit = 'winter_springs' | 'ocoee';

export type Urgency = 'low' | 'normal' | 'high';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'scheduled' | 'converted';

export type ConversationStatus = 'active' | 'handed_off' | 'closed';

export type MessageRole = 'user' | 'assistant';

export interface Lead {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  language: Language;
  service_interest?: string | null;
  insurance_plan?: string | null;
  preferred_unit?: Unit | null;
  urgency: Urgency;
  qualification_score: number;
  status: LeadStatus;
  notes?: string | null;
  source: string;
  whatsapp_sent_at?: string | null;
  created_at: string;
  updated_at: string;
  conversations?: Conversation[];
}

export interface Conversation {
  id: string;
  lead_id: string | null;
  session_id: string;
  status: ConversationStatus;
  language: Language;
  created_at: string;
  updated_at: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  created_at: string;
}

/** Payload emitted by the AI Agent inside <LEAD_QUALIFIED>...</LEAD_QUALIFIED>. */
export interface QualifiedLead {
  name: string;
  service: string;
  insurance: string;
  unit: Unit;
  schedule_preference: string;
  language: Language;
}

/** Minimal chat message shape exchanged with the AI Agent API route. */
export interface ChatMessage {
  role: MessageRole;
  content: string;
}
