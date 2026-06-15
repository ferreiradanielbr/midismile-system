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

/** Validate a single field on blur. Returns error string or undefined. */
function validateField(field: keyof FormErrors, value: string): string | undefined {
  if (field === 'name' && !value.trim()) return 'Name is required.';
  if (field === 'email' && !value.trim()) return 'Email is required.';
  return undefined;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    unit: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  // Refs for focus management — first invalid field on submit
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<keyof FormErrors, React.RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    email: emailRef,
  };

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    setErrors(next);

    const firstInvalidKey = (Object.keys(next) as (keyof FormErrors)[])[0];
    if (firstInvalidKey) {
      // Defer focus so the error state has rendered before we focus
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
      // Clear error on change so user gets immediate feedback after correcting
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  /** Blur handler — validate the field the user just left. */
  function handleBlur(field: keyof FormErrors) {
    return () => {
      const error = validateField(field, form[field] as string);
      // Only set error on blur, never clear (clearing happens on change above)
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    };
  }

  return (
    <>
      {/* Hero */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6 text-center">
          <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            Get in touch
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white">Contact</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white-faded">
            Schedule your free consultation or ask us anything — we respond in
            English and Portuguese.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="bg-pearl py-20">
        <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-xl border border-mist bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-midnight">
              Send us a message
            </h2>
            <p className="mt-1 font-body text-sm text-dim">
              We&apos;ll get back to you within one business day.
            </p>

            {submitState === 'success' ? (
              <Alert variant="success" className="mt-6">
                <strong>Thank you!</strong> We received your message and will be
                in touch soon. We look forward to meeting you!
              </Alert>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-5"
                noValidate
              >
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
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-display text-xl font-bold text-midnight">
                Winter Springs
              </h3>
              <address className="mt-3 flex flex-col gap-1 font-body text-base not-italic text-dim">
                <span>411 E State Rd 434 Suite D</span>
                <span>Winter Springs, FL 32708</span>
                <a
                  href="tel:+16892134161"
                  className="tabular-nums mt-1 font-semibold text-primary hover:text-primary-dark"
                >
                  (689) 213-4161
                </a>
              </address>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-midnight">
                Ocoee
              </h3>
              <address className="mt-3 flex flex-col gap-1 font-body text-base not-italic text-dim">
                <span>10131 W Colonial Drive Suite 3</span>
                <span>Ocoee, FL 34761</span>
                <a
                  href="tel:+16893103396"
                  className="tabular-nums mt-1 font-semibold text-primary hover:text-primary-dark"
                >
                  (689) 310-3396
                </a>
              </address>
            </div>

            <div className="rounded-lg border border-mist bg-soft p-5">
              <p className="font-ui text-sm font-semibold text-midnight">Hours</p>
              <p className="mt-1 font-body text-base text-dim">
                Monday – Friday · 10AM – 6PM
              </p>
              <p className="mt-3 font-ui text-sm font-semibold text-midnight">
                WhatsApp
              </p>
              <a
                href="https://wa.me/16893103396"
                target="_blank"
                rel="noopener noreferrer"
                className="tabular-nums mt-1 block font-body text-base font-semibold text-whatsapp hover:text-whatsapp-dark"
              >
                (689) 310-3396
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
