'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import type { Unit } from '@/types';

interface FormData {
  name: string;
  email: string;
  phone: string;
  unit: Unit | '';
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const unitOptions = [
  { value: 'winter_springs', label: 'Winter Springs' },
  { value: 'ocoee', label: 'Ocoee' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: keyof FormErrors, value: string): string | undefined {
  const trimmed = value.trim();
  if (field === 'name' && !trimmed) return 'Name is required.';
  if (field === 'email') {
    if (!trimmed) return 'Email is required.';
    if (!EMAIL_RE.test(trimmed)) return 'Enter a valid email address.';
  }
  return undefined;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    unit: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<keyof FormErrors, React.RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    email: emailRef,
  };

  function validate(): boolean {
    const nameError = validateField('name', form.name);
    const emailError = validateField('email', form.email);
    const next: FormErrors = {
      ...(nameError && { name: nameError }),
      ...(emailError && { email: emailError }),
    };
    setErrors(next);

    const firstInvalidKey = (Object.keys(next) as (keyof FormErrors)[])[0];
    if (firstInvalidKey) {
      requestAnimationFrame(() => {
        fieldRefs[firstInvalidKey].current?.focus();
      });
    }

    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          phone: form.phone.trim() || undefined,
          unit: form.unit || undefined,
          message: form.message.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  }

  function update(field: keyof FormData) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  function handleBlur(field: keyof FormErrors) {
    return () => {
      const error = validateField(field, form[field] as string);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    };
  }

  if (submitState === 'success') {
    return (
      <Alert variant="success" className="mt-6">
        <strong>Thank you!</strong> We received your message and will be in touch soon.
        We look forward to meeting you!
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5" noValidate>
      <Input
        ref={nameRef}
        id="contact-name"
        label="Full name *"
        placeholder="Jane Smith"
        value={form.name}
        onChange={update('name')}
        onBlur={handleBlur('name')}
        error={errors.name}
        required
      />

      <Input
        ref={emailRef}
        id="contact-email"
        label="Email *"
        type="email"
        placeholder="jane@example.com"
        value={form.email}
        onChange={update('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        required
      />

      <Input
        id="contact-phone"
        label="Phone"
        type="tel"
        placeholder="(407) 555-0100"
        value={form.phone}
        onChange={update('phone')}
      />

      <Select
        label="Preferred location"
        options={unitOptions}
        placeholder="Select a location"
        value={form.unit}
        onChange={update('unit')}
      />

      <Textarea
        label="Message"
        placeholder="Tell us how we can help you…"
        value={form.message}
        onChange={update('message')}
        rows={4}
      />

      {submitState === 'error' && (
        <Alert variant="error">
          Something went wrong. Please try again or call us directly.
        </Alert>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={submitState === 'loading'}
        className="mt-2 w-full"
      >
        Send Message
      </Button>
    </form>
  );
}
