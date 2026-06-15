'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { ServiceCard, ReviewCard, PricingCard } from '@/components/ui/Card';
import { Zap, Star, Heart } from 'lucide-react';

const colorTokens = [
  { name: 'Primary', cls: 'bg-primary', hex: '#0B4F6C' },
  { name: 'Primary Light', cls: 'bg-primary-light', hex: '#1A7BA0' },
  { name: 'Primary Dark', cls: 'bg-primary-dark', hex: '#073A52' },
  { name: 'Accent', cls: 'bg-accent', hex: '#22C9A5' },
  { name: 'Accent Dim', cls: 'bg-accent-dim', hex: '#1AAC8D' },
  { name: 'Gold', cls: 'bg-gold', hex: '#C8A96E' },
  { name: 'Pearl', cls: 'bg-pearl border border-mist', hex: '#F8FAFB' },
  { name: 'Soft', cls: 'bg-soft', hex: '#EFF4F7' },
  { name: 'Mist', cls: 'bg-mist', hex: '#DDE8EE' },
  { name: 'Dim', cls: 'bg-dim', hex: '#5E7A8A' },
  { name: 'Body', cls: 'bg-body', hex: '#2C3E4A' },
  { name: 'Midnight', cls: 'bg-midnight', hex: '#0F1923' },
  { name: 'WhatsApp', cls: 'bg-whatsapp', hex: '#25D366' },
  { name: 'Success', cls: 'bg-success', hex: '#22C55E' },
  { name: 'Error', cls: 'bg-error', hex: '#EF4444' },
  { name: 'Warning', cls: 'bg-warning', hex: '#F59E0B' },
] as const;

const typeScale = [
  { name: 'display-xl / 6xl', cls: 'text-6xl font-display', sample: 'The Smile You Deserve' },
  { name: 'display-lg / 4xl', cls: 'text-4xl font-display', sample: 'Comprehensive Care' },
  { name: 'display-md / 2xl', cls: 'text-2xl font-display', sample: 'Dr. Nelson Marques' },
  { name: 'display-sm / xl', cls: 'text-xl font-display', sample: 'Dental Implants' },
  { name: 'body-lg / lg', cls: 'text-lg font-body', sample: 'Bilingual care with 30 years of precision.' },
  { name: 'body-base / base', cls: 'text-base font-body', sample: 'From preventive check-ups to complete smile transformations.' },
  { name: 'body-sm / sm', cls: 'text-sm font-body', sample: 'We accept most major insurance plans.' },
  { name: 'ui-base / base', cls: 'text-base font-ui font-semibold', sample: 'Schedule Free Consultation' },
  { name: 'ui-sm / sm', cls: 'text-sm font-ui font-semibold', sample: 'WHAT WE OFFER' },
] as const;

const shadows = [
  { name: 'shadow-sm', cls: 'shadow-sm' },
  { name: 'shadow-md', cls: 'shadow-md' },
  { name: 'shadow-lg', cls: 'shadow-lg' },
  { name: 'shadow-xl', cls: 'shadow-xl' },
  { name: 'shadow-chat', cls: 'shadow-chat' },
  { name: 'shadow-premium', cls: 'shadow-premium' },
] as const;

const radii = [
  { name: 'radius-sm / rounded-sm', cls: 'rounded-sm' },
  { name: 'radius-md / rounded-md', cls: 'rounded-md' },
  { name: 'radius-lg / rounded-lg', cls: 'rounded-lg' },
  { name: 'radius-xl / rounded-xl', cls: 'rounded-xl' },
  { name: 'radius-full / rounded-full', cls: 'rounded-full' },
] as const;

const selectOptions = [
  { value: 'winter_springs', label: 'Winter Springs' },
  { value: 'ocoee', label: 'Ocoee' },
];

/** Living style guide — expanded with all Sprint 2 components. */
export default function DesignSystemPage() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="mx-auto max-w-container space-y-20 px-6 py-20">
      <header>
        <p className="font-ui text-sm font-semibold uppercase tracking-wide text-accent">
          MediSmile Design System
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-midnight">Visual Bible</h1>
        <p className="mt-2 font-body text-base text-dim">
          Source of truth: <code>src/app/globals.css</code> + <code>tailwind.config.ts</code>
        </p>
      </header>

      {/* ── Colors ── */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-midnight">Color tokens</h2>
        <div className="flex flex-wrap gap-4">
          {colorTokens.map(({ name, cls, hex }) => (
            <div key={name} className="text-center">
              <div className={`h-16 w-24 rounded-md ${cls}`} />
              <p className="mt-2 font-ui text-[12px] font-semibold text-midnight">{name}</p>
              <p className="font-ui text-[11px] text-dim">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ── */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-midnight">Type scale</h2>
        <div className="flex flex-col gap-4 divide-y divide-mist">
          {typeScale.map(({ name, cls, sample }) => (
            <div key={name} className="pt-4 first:pt-0">
              <p className="mb-1 font-ui text-[11px] font-semibold uppercase tracking-wider text-dim">
                {name}
              </p>
              <p className={cls}>{sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Buttons ── */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-midnight">Buttons</h2>
        <div className="space-y-4">
          {(['primary', 'accent', 'ghost', 'whatsapp'] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              <span className="w-28 font-ui text-sm text-dim">{variant}</span>
              <Button variant={variant} size="sm">Small</Button>
              <Button variant={variant} size="md">Medium</Button>
              <Button variant={variant} size="lg">Large</Button>
              <Button variant={variant} size="md" isLoading>Loading</Button>
              <Button variant={variant} size="md" disabled>Disabled</Button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Badges ── */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-midnight">Badges</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="teal" size="sm">Teal sm</Badge>
          <Badge variant="teal" size="md">Teal md</Badge>
          <Badge variant="gold" size="sm">Gold sm</Badge>
          <Badge variant="gold" size="md">Gold md</Badge>
        </div>
        <div className="section-dark flex flex-wrap items-center gap-3 rounded-lg p-6">
          <Badge variant="white" size="sm">White sm — dark bg</Badge>
          <Badge variant="white" size="md">White md — dark bg</Badge>
        </div>
      </section>

      {/* ── Inputs ── */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-midnight">Form inputs</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input label="Default" placeholder="Placeholder text" />
          <Input label="With hint" placeholder="Placeholder" hint="This is a hint message." />
          <Input label="Error state" placeholder="Placeholder" error="This field is required." defaultValue="bad input" />
          <Input label="Loading" placeholder="Verifying…" isLoading />
          <Input label="Disabled" placeholder="Placeholder" disabled />
          <Textarea label="Textarea" placeholder="Enter your message…" />
          <Textarea label="Textarea error" error="Message is too short." />
          <Select
            label="Select"
            options={selectOptions}
            placeholder="Choose a location"
          />
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="space-y-8">
        <h2 className="font-display text-2xl font-bold text-midnight">Cards</h2>

        <div>
          <p className="mb-4 font-ui text-sm font-semibold text-dim uppercase tracking-wider">Service cards</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <ServiceCard
              icon={<Zap className="h-6 w-6" />}
              title="Dental Implants"
              description="Permanent tooth replacement that looks and feels natural."
              href="#"
            />
            <ServiceCard
              icon={<Star className="h-6 w-6" />}
              title="Teeth Whitening"
              description="Professional whitening for a brighter, confident smile."
              href="#"
            />
            <ServiceCard
              icon={<Heart className="h-6 w-6" />}
              title="Family Dentistry"
              description="Comprehensive care for every member of your family."
            />
          </div>
        </div>

        <div>
          <p className="mb-4 font-ui text-sm font-semibold text-dim uppercase tracking-wider">Review cards</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ReviewCard
              author="Maria S."
              location="Orlando"
              rating={5}
              text="Dr. Marques changed my life. My implants look completely natural."
            />
            <ReviewCard
              author="James R."
              location="Winter Springs"
              rating={4}
              text="Finally a dentist who speaks my language — literally."
              date="May 2025"
            />
          </div>
        </div>

        <div>
          <p className="mb-4 font-ui text-sm font-semibold text-dim uppercase tracking-wider">Pricing cards</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <PricingCard
              name="Standard"
              price="$99"
              period="/month"
              features={['Cleanings & check-ups', 'Digital X-rays', 'Fluoride treatment']}
              cta="Get started"
            />
            <PricingCard
              name="Premium"
              price="$199"
              period="/month"
              features={['Everything in Standard', 'Whitening included', 'Priority appointments', 'Orthodontic discount']}
              cta="Get started"
              featured
            />
          </div>
        </div>
      </section>

      {/* ── Alerts ── */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-midnight">Alerts</h2>
        <Alert variant="info" title="Information">
          Your appointment has been confirmed for Monday, June 16 at 2PM.
        </Alert>
        <Alert variant="success" title="Success!">
          Your insurance has been verified. You are in-network with Delta Dental.
        </Alert>
        <Alert variant="warning" title="Reminder">
          Please arrive 10 minutes early to complete your intake forms.
        </Alert>
        <Alert variant="error" title="Error">
          We could not process your request. Please try again or call us.
        </Alert>
        {showAlert && (
          <Alert variant="info" title="Dismissable" onClose={() => setShowAlert(false)}>
            This alert can be dismissed with the X button.
          </Alert>
        )}
      </section>

      {/* ── Shadows ── */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-midnight">Shadows</h2>
        <div className="flex flex-wrap gap-6">
          {shadows.map(({ name, cls }) => (
            <div key={name} className={`flex h-20 w-32 items-center justify-center rounded-lg bg-white ${cls}`}>
              <p className="font-ui text-[11px] text-dim">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Border radius ── */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-midnight">Border radius</h2>
        <div className="flex flex-wrap items-end gap-6">
          {radii.map(({ name, cls }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className={`h-20 w-20 bg-accent ${cls}`} />
              <p className="font-ui text-[11px] text-dim text-center">{name.split(' / ')[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Motion ── */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-midnight">Motion</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-mist bg-white p-5">
            <p className="font-ui text-sm font-semibold text-midnight">animate-orb-float</p>
            <p className="mt-1 font-body text-sm text-dim">8s · ease-in-out · alternate · infinite. Background orbs in dark hero sections.</p>
          </div>
          <div className="rounded-lg border border-mist bg-white p-5">
            <p className="font-ui text-sm font-semibold text-midnight">animate-float-review</p>
            <p className="mt-1 font-body text-sm text-dim">6s · ease-in-out · infinite. Floating info cards in hero sections. −8px vertical.</p>
          </div>
          <div className="rounded-lg border border-mist bg-white p-5">
            <p className="font-ui text-sm font-semibold text-midnight">animate-typing</p>
            <p className="mt-1 font-body text-sm text-dim">1.2s · ease-in-out · infinite. Chat typing indicator dots with 0/0.2/0.4s delay stagger.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
