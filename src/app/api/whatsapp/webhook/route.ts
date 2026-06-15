import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Evolution API webhook receiver. Sprint 4 implements inbound message handling
 * (lead replies, status updates, follow-up assignment). For now it acknowledges
 * the event so the webhook can be registered.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const event: unknown = await request.json();
    // TODO(Sprint 4): route inbound WhatsApp events to the pipeline.
    console.info('WhatsApp webhook received', event);
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
