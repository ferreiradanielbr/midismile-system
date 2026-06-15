import { NextResponse } from 'next/server';
import { createAnthropicClient, ANTHROPIC_MODEL } from '@/lib/anthropic/client';
import { MEDISMILE_SYSTEM_PROMPT } from '@/lib/anthropic/system-prompt';
import { createAdminClient } from '@/lib/supabase/admin';
import { notifyCommercialTeam } from '@/lib/whatsapp/client';
import type { ChatMessage, QualifiedLead } from '@/types';

export const runtime = 'nodejs';

interface ChatRequestBody {
  sessionId: string;
  messages: ChatMessage[];
}

const LEAD_QUALIFIED_RE = /<LEAD_QUALIFIED>([\s\S]*?)<\/LEAD_QUALIFIED>/;

/**
 * AI Agent endpoint. Sprint 1 baseline: validates input, calls the model,
 * persists the assistant message and triggers handoff on qualification.
 * The full streaming + rate limiting flow is completed in Sprint 4.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { sessionId, messages } = body;
  if (!sessionId || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'sessionId and messages are required.' }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'AI service is not configured.' }, { status: 503 });
  }

  try {
    const anthropic = createAnthropicClient();
    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 1024,
      system: MEDISMILE_SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const firstBlock = response.content[0];
    const text = firstBlock && firstBlock.type === 'text' ? firstBlock.text : '';

    // Best-effort persistence — never block the user reply on DB errors.
    void persistAndMaybeHandoff(sessionId, text).catch((err) =>
      console.error('chat persistence failed', err),
    );

    const cleaned = text.replace(LEAD_QUALIFIED_RE, '').trim();
    return NextResponse.json({ message: cleaned });
  } catch (err) {
    console.error('AI Agent error', err);
    return NextResponse.json({ error: 'AI Agent failed to respond.' }, { status: 502 });
  }
}

async function persistAndMaybeHandoff(sessionId: string, text: string): Promise<void> {
  const supabase = createAdminClient();

  const { data: conversation } = await supabase
    .from('conversations')
    .select('id')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (conversation?.id) {
    await supabase.from('messages').insert({
      conversation_id: conversation.id,
      role: 'assistant',
      content: text,
    });
  }

  const match = LEAD_QUALIFIED_RE.exec(text);
  if (!match?.[1]) return;

  const lead = JSON.parse(match[1]) as QualifiedLead;
  await notifyCommercialTeam(lead);
}
