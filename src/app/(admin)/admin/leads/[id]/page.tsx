import type { Metadata } from 'next';

interface LeadDetailParams {
  params: { id: string };
}

export const metadata: Metadata = { title: 'Lead Detail' };

export default function LeadDetailPage({ params }: LeadDetailParams) {
  return (
    <section>
      <h1 className="text-2xl">Lead {params.id}</h1>
      <p className="mt-2 text-dim">Conversation history, status, notes — Sprint 5 (P0).</p>
    </section>
  );
}
