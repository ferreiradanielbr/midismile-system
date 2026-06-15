import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Your First Visit | MediSmile Group',
  description:
    'Everything you need to know before your first appointment at MediSmile Group in Orlando, FL.',
};

const steps = [
  {
    number: '01',
    title: 'Schedule',
    description:
      'Book your free consultation online, by phone, or WhatsApp. Choose between our Winter Springs or Ocoee location — whichever is most convenient.',
  },
  {
    number: '02',
    title: 'Complete Forms',
    description:
      'We will send you a short intake form ahead of your visit. Filling it out takes about 5 minutes and helps our team prepare for your appointment.',
  },
  {
    number: '03',
    title: 'Meet the Team',
    description:
      'Arrive and meet our bilingual front-desk team. We will make you feel at home, answer any questions, and walk you through the office before you see the doctor.',
  },
  {
    number: '04',
    title: 'Treatment Plan',
    description:
      'Dr. Marques will perform a thorough examination and create a personalized treatment plan. No pressure — you leave with a clear picture and all options explained.',
  },
] as const;

export default function FirstVisitPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6 text-center">
          <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            New patients
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white">
            Your First Visit
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white-faded">
            We know visiting a new dentist can feel uncertain. Here is exactly
            what to expect — step by step.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {steps.map(({ number, title, description }) => (
              <div
                key={number}
                className="flex gap-6 rounded-xl border border-mist bg-white p-8 shadow-sm"
              >
                <span className="font-display text-4xl font-bold text-accent leading-none shrink-0">
                  {number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-midnight">{title}</h3>
                  <p className="mt-2 font-body text-base leading-relaxed text-dim">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-primary px-9 font-ui text-base font-semibold text-white transition-all duration-fast hover:bg-primary-dark hover:-translate-y-px hover:shadow-md"
            >
              Schedule My First Visit
            </Link>
            <p className="mt-3 font-ui text-sm text-dim">
              No commitment · Free initial consultation
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
