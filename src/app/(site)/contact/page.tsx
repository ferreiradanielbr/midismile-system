import type { Metadata } from 'next';
import { ContactForm } from '@/components/site/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Schedule your free consultation or send us a message. MediSmile Group serves Winter Springs and Ocoee, FL. We respond in English and Portuguese.',
  openGraph: {
    title: 'Contact MediSmile Group',
    description:
      'Reach our dental team in Winter Springs or Ocoee, FL. Call, WhatsApp, or send a message online.',
  },
};

export default function ContactPage() {
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
            Schedule your free consultation or ask us anything — we respond in English and
            Portuguese.
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
            <ContactForm />
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
              <h3 className="font-display text-xl font-bold text-midnight">Ocoee</h3>
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
              <p className="mt-3 font-ui text-sm font-semibold text-midnight">WhatsApp</p>
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
