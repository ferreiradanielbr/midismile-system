import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminDashboardPage() {
  return (
    <section>
      <h1 className="text-2xl">Dashboard</h1>
      <p className="mt-2 text-dim">KPI cards, charts and recent leads — Sprint 5 (P0).</p>
    </section>
  );
}
