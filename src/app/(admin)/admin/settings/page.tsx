import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings' };

export default function AdminSettingsPage() {
  return (
    <section>
      <h1 className="text-2xl">Settings</h1>
      <p className="mt-2 text-dim">Business hours, AI messages, users — Sprint 5 (P2).</p>
    </section>
  );
}
