'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

// Note: metadata export requires Server Component — moved to layout-level for this client page
// For Sprint 3, this page will be refactored with a Server Component shell + client form.

const insurances = [
  { name: 'Delta Dental', type: 'PPO & HMO' },
  { name: 'Cigna', type: 'PPO & DHMO' },
  { name: 'Aetna', type: 'PPO & DMO' },
  { name: 'Humana', type: 'PPO & HMO' },
  { name: 'UnitedHealthcare', type: 'PPO & DHMO' },
  { name: 'Blue Cross Blue Shield', type: 'PPO' },
] as const;

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function InsurancePage() {
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !plan.trim()) return;
    setFormState('loading');
    // Simulate verification — full integration in Sprint 3
    await new Promise((r) => setTimeout(r, 1000));
    setFormState('success');
  }

  return (
    <>
      {/* Hero */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6 text-center">
          <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            Coverage
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white">
            Insurance
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white-faded">
            We work with most major dental insurance plans so you can focus on
            your smile, not the paperwork.
          </p>
        </div>
      </section>

      {/* Accepted plans */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <h2 className="font-display text-3xl font-bold text-midnight">
            Accepted insurance plans
          </h2>
          <p className="mt-2 font-body text-base text-dim">
            We are in-network with the following providers:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insurances.map(({ name: insName, type }) => (
              <div
                key={insName}
                className="flex flex-col gap-1 rounded-lg border border-mist bg-white p-5 shadow-sm"
              >
                <p className="font-ui text-base font-semibold text-midnight">{insName}</p>
                <p className="font-body text-sm text-dim">{type}</p>
              </div>
            ))}
          </div>

          {/* Verification form */}
          <div className="mx-auto mt-16 max-w-lg rounded-xl border border-mist bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-midnight">
              Verify your coverage
            </h3>
            <p className="mt-2 font-body text-sm text-dim">
              Enter your name and insurance plan and we will confirm your
              coverage within one business day.
            </p>

            {formState === 'success' ? (
              <Alert variant="success" className="mt-6">
                Thanks! We&apos;ll verify your coverage and reach out within one
                business day.
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
                <Input
                  label="Your name"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Insurance plan"
                  placeholder="e.g. Delta Dental PPO"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                />

                {formState === 'error' && (
                  <Alert variant="error">
                    Something went wrong. Please try again.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={formState === 'loading'}
                  className="mt-2"
                >
                  Verify Coverage
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
