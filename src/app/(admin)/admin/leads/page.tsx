import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Leads Pipeline' };

export default function LeadsPipelinePage() {
  return (
    <section>
      <h1 className="text-2xl">Pipeline</h1>
      <p className="mt-2 text-dim">Kanban with 5 stages and drag &amp; drop — Sprint 5 (P0).</p>
    </section>
  );
}
