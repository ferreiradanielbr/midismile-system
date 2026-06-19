'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

const planOptions = [
  { value: 'Humana', label: 'Humana' },
  { value: 'Aetna', label: 'Aetna' },
  { value: 'Delta Dental', label: 'Delta Dental' },
  { value: 'Ameritas', label: 'Ameritas' },
  { value: 'UCD', label: 'UCD' },
  { value: 'Other', label: 'Other plan' },
  { value: 'Self-pay', label: "I don't have dental insurance" },
] as const;

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function InsuranceVerificationForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !plan) return;

    setFormState('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          insurancePlan: plan,
          source: 'insurance_verification',
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setFormState('success');
    } catch {
      setFormState('error');
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-lg rounded-xl border border-mist bg-white p-8 shadow-sm">
      <h3 className="font-display text-2xl font-bold text-midnight">
        Verify your coverage
      </h3>
      <p className="mt-2 font-body text-sm text-dim">
        Share your info and we will confirm your coverage and call you back
        within one business day.
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
            label="Phone"
            type="tel"
            placeholder="(407) 555-0100"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Select
            label="Insurance plan"
            options={[...planOptions]}
            placeholder="Select your plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            required
          />

          {formState === 'error' && (
            <Alert variant="error">
              Something went wrong. Please try again or call us directly.
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
  );
}
