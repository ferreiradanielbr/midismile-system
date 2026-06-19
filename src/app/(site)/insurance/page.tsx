import type { Metadata } from 'next';
import { Check, ShieldCheck } from 'lucide-react';
import { AnimatedGrid } from '@/components/ui/AnimatedGrid';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { InsuranceVerificationForm } from '@/components/site/InsuranceVerificationForm';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Insurance & Plans | MediSmile Group',
  description:
    'MediSmile Group accepts Humana, Aetna, Delta Dental, Ameritas, and UCD. Self-pay options also available. Verify your coverage in Orlando, FL.',
};

const WHATSAPP_URL = 'https://wa.me/16893103396';

const insurances = ['Humana', 'Aetna', 'Delta Dental', 'Ameritas', 'UCD'] as const;

const faqItems = [
  {
    question: "What if my insurance isn't on the list?",
    answer:
      "We still want to help. Share your plan details in the form below or give us a call — we'll check your out-of-network benefits or walk you through our self-pay options.",
  },
  {
    question: 'How do I know if my plan is in-network?',
    answer:
      'Fill out the verification form below with your name, phone, and plan, and our team will confirm your coverage and call you back within one business day.',
  },
  {
    question: 'Can I use my insurance for the $99 First Visit Package?',
    answer:
      'Yes. The $99 First Visit Package (exam, X-ray, and cleaning) can often be combined with your insurance benefits to lower your out-of-pocket cost even further.',
  },
  {
    question: "What if I don't have dental insurance?",
    answer:
      'No problem — many of our patients are self-pay. We also offer flexible monthly financing through CareCredit and Alphaeon Credit.',
  },
  {
    question: 'Will you file claims on my behalf?',
    answer:
      "Yes. Once your coverage is verified, our front-desk team handles claim filing for you so you don't have to deal with the paperwork.",
  },
] as const;

export default function InsurancePage() {
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
            We work with major dental insurance plans so you can focus on your
            smile, not the paperwork. No insurance? We have flexible options
            too.
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

          <AnimatedGrid className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insurances.map((name) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-lg border border-mist bg-white p-5 shadow-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="font-ui text-base font-semibold text-midnight">{name}</p>
              </div>
            ))}

            <div className="flex items-center gap-3 rounded-lg border border-gold-border bg-gold-subtle p-5 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gold">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-ui text-base font-semibold text-midnight">Self-pay</p>
                <p className="font-body text-sm text-dim">Financing available</p>
              </div>
            </div>
          </AnimatedGrid>

          {/* Verification form */}
          <InsuranceVerificationForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Insurance FAQ
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">
              Common coverage questions
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-midnight">
            Questions about your coverage?
          </h2>
          <p className="mt-3 font-body text-lg text-dim">
            Call or message us — our bilingual team can check your benefits
            while you&apos;re on the phone.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+16893103396"
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
            >
              Call Us
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'whatsapp', size: 'lg' }))}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
