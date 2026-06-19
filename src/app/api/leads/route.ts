import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Lead, Unit } from '@/types';

export const runtime = 'nodejs';

/**
 * Lead CRUD for the admin panel. Reads are RLS-protected (authenticated only).
 * Full filtering/pagination is added in Sprint 5.
 */
export async function GET(): Promise<NextResponse> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ leads: (data ?? []) as Lead[] });
}

interface ContactFormBody {
  name: string;
  email?: string;
  phone?: string;
  unit?: Unit;
  message?: string;
  insurancePlan?: string;
  source?: string;
}

/** Create a lead from the public contact form, insurance form, or other lead-capture surfaces. */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: ContactFormBody;

  try {
    body = (await request.json()) as ContactFormBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 422 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: body.name.trim(),
      email: body.email?.trim() ?? null,
      phone: body.phone?.trim() ?? null,
      preferred_unit: body.unit ?? null,
      notes: body.message?.trim() ?? null,
      insurance_plan: body.insurancePlan?.trim() ?? null,
      language: 'en',
      urgency: 'normal',
      status: 'new',
      source: body.source?.trim() || 'contact_form',
      qualification_score: 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lead: data as Lead }, { status: 201 });
}
