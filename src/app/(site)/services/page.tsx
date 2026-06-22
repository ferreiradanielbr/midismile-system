import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Smile,
  AlignCenter,
  Sparkles,
  ShieldCheck,
  Heart,
  Stethoscope,
  Wand2,
  ArrowRight,
  CheckCircle,
  Phone,
} from 'lucide-react';
import { AnimatedGrid } from '@/components/ui/AnimatedGrid';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { InsuranceMarquee } from '@/components/site/InsuranceMarquee';
import { ServicesSections } from '@/components/site/ServicesSections';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dental Services | MediSmile Group — Orlando, FL',
  description:
    'Comprehensive dental care in Orlando — implants, orthodontics, SureSmile, whitening, cleaning, crowns, endodontics, and orofacial harmonization. Bilingual EN/PT.',
};

const WHATSAPP_URL = 'https://wa.me/16893103396';

const services = [
  {
    id: 'dental-implants',
    icon: <Zap className="h-6 w-6" />,
    title: 'Dental Implants',
    tagline: 'Permanent. Natural. Life-changing.',
    description:
      'Replace missing teeth with precision titanium implants that look, feel, and function exactly like your natural teeth. Dr. Marques has placed thousands of implants over 30+ years — with lifetime durability and same-day consultations available.',
    benefits: [
      'Natural appearance and feel',
      'Lifetime durability with proper care',
      'Preserves jawbone and facial structure',
      'No slipping or adhesives needed',
    ],
    badge: 'Dr. Marques Specialty',
  },
  {
    id: 'orthodontics',
    icon: <AlignCenter className="h-6 w-6" />,
    title: 'Orthodontics / Braces',
    tagline: 'Straight smile, confident you.',
    description:
      'Modern braces for teens and adults that correct bite issues, improve jaw function, and create beautifully aligned smiles. We offer options designed for comfort and discretion — without compromising results.',
    benefits: [
      'Corrects overbite, underbite, and crossbite',
      'Options for teens and adults',
      'Improves chewing and speech',
      'Reduces long-term oral health risks',
    ],
    badge: null,
  },
  {
    id: 'suresmile',
    icon: <Smile className="h-6 w-6" />,
    title: 'SureSmile Clear Aligners',
    tagline: 'Invisible. Precise. Removable.',
    description:
      'Advanced 3D-planned clear aligners for precise, predictable tooth movement — all without metal wires. SureSmile technology maps your full treatment digitally so you see your result before you even start.',
    benefits: [
      'Nearly invisible during wear',
      'Removable for eating and brushing',
      '3D digital treatment planning',
      'Faster results than traditional aligners',
    ],
    badge: 'Technology Highlight',
  },
  {
    id: 'teeth-whitening',
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Teeth Whitening',
    tagline: 'Brilliantly brighter in one visit.',
    description:
      'Professional-grade in-office whitening delivers dramatically whiter teeth in under two hours. We also offer take-home kits calibrated to your sensitivity level — both proven, safe, and long-lasting.',
    benefits: [
      'Up to 8 shades brighter',
      'Safe for sensitive teeth',
      'In-office and take-home options',
      'Long-lasting results',
    ],
    badge: null,
  },
  {
    id: 'dental-cleaning',
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Dental Cleaning',
    tagline: 'Your foundation for lifelong oral health.',
    description:
      'Thorough professional cleanings remove plaque and tartar that brushing and flossing miss — preventing cavities, gingivitis, and periodontal disease before they start. Recommended every 6 months for all patients.',
    benefits: [
      'Removes hardened tartar buildup',
      'Prevents gum disease and cavities',
      'Freshens breath long-term',
      'Includes full oral health assessment',
    ],
    badge: 'Included in First Visit — $99',
  },
  {
    id: 'crowns-bridges',
    icon: <Heart className="h-6 w-6" />,
    title: 'Crowns & Bridges',
    tagline: 'Restore strength, restore your smile.',
    description:
      'Durable ceramic or porcelain crowns repair damaged, cracked, or decayed teeth — restoring full function and a natural appearance. Bridges permanently replace one or more missing teeth without implants.',
    benefits: [
      'Protects weakened natural teeth',
      'Matches your natural tooth color',
      'Restores full chewing function',
      'Long-lasting with proper care',
    ],
    badge: null,
  },
  {
    id: 'endodontics',
    icon: <Stethoscope className="h-6 w-6" />,
    title: 'Endodontics (Root Canal)',
    tagline: 'Save your tooth. End the pain.',
    description:
      'Minimally invasive root canal therapy eliminates infection, relieves severe pain, and saves your natural tooth. Modern techniques make the procedure far more comfortable than its reputation suggests.',
    benefits: [
      'Eliminates tooth infection',
      'Relieves acute dental pain',
      'Preserves your natural tooth',
      'Gentle, minimally invasive technique',
    ],
    badge: null,
  },
  {
    id: 'orofacial-harmonization',
    icon: <Wand2 className="h-6 w-6" />,
    title: 'Botox & Facial Fillers',
    tagline: 'Harmonize your smile with your face.',
    description:
      'Advanced orofacial harmonization procedures — including Botox and facial fillers — smooth wrinkles, relax facial muscles, and restore youthful volume. A specialty of Dr. Marques, trained at MARC Institute Miami.',
    benefits: [
      'Smooths lines and wrinkles',
      'Enhances smile aesthetics',
      'Minimally invasive, no downtime',
      'Performed by a trained specialist',
    ],
    badge: 'Dr. Marques Specialty',
  },
] as const;

const faqItems = [
  {
    question: 'What does the $99 First Visit include?',
    answer:
      'Our First Visit Package includes a comprehensive oral evaluation, digital X-rays, and a professional cleaning — all for $99. It\'s the best way to meet the team, get a full picture of your oral health, and build a personalized treatment plan.',
  },
  {
    question: 'Do you accept my insurance?',
    answer:
      'We accept most major dental plans including Humana, Aetna, Delta Dental, Ameritas, United Concordia, GEHA, MetLife, and Blue Cross Blue Shield. We verify your coverage and file claims on your behalf at no extra charge. Self-pay options are also available — contact us to confirm your specific plan.',
  },
  {
    question: 'Do you offer financing?',
    answer:
      'Yes. We work with CareCredit and Alphaeon Credit, allowing you to pay for treatment in flexible monthly installments. We also accept cash, checks, and debit/credit cards.',
  },
  {
    question: 'How long does a dental implant take?',
    answer:
      'The full implant process typically takes 3–6 months from placement to final crown, including the healing period for osseointegration. Your initial consultation includes a personalized timeline and 3D treatment plan.',
  },
  {
    question: 'Is SureSmile better than Invisalign?',
    answer:
      'SureSmile uses advanced 3D robotic wire-bending technology and AI-driven treatment planning, often delivering faster and more precise results. Our team will evaluate your case and recommend the best fit for your goals.',
  },
  {
    question: 'Do you treat dental emergencies?',
    answer:
      'Yes. Call or WhatsApp us at (689) 310-3396 and we will get you in as quickly as possible. We prioritize patients in acute pain.',
  },
  {
    question: 'Do you have Portuguese-speaking staff?',
    answer:
      'Yes. Dr. Marques and several team members are fluent in Portuguese (Brazilian). We proudly serve Orlando\'s Brazilian and Latin communities in their preferred language.',
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-primary-light/10 blur-3xl animate-orb-float" />
          <div className="absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl animate-orb-float [animation-delay:2s]" />
        </div>

        <div className="relative mx-auto max-w-container px-6 text-center">
          <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            What we offer
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white lg:text-6xl">
            14+ dental services,
            <br />
            <em className="not-italic text-accent">one trusted team.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-white-faded">
            From your first cleaning to a complete smile transformation — all under one
            roof, in English and Portuguese.
          </p>

          {/* First visit CTA */}
          <div className="mt-8 inline-flex flex-col items-center gap-2 sm:flex-row">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: 'accent', size: 'lg' }))}
            >
              First Visit — $99
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'whatsapp', size: 'lg' }))}
            >
              Book via WhatsApp
            </a>
          </div>

          <p className="mt-3 font-ui text-sm text-white-muted">
            Includes exam · X-ray · cleaning · Limited-time offer
          </p>
        </div>
      </section>

      {/* ── Services grid overview ────────────────────────────── */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold text-midnight">
              All services
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-lg text-dim">
              Click any service to see full details, benefits, and what to expect.
            </p>
          </div>

          <AnimatedGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="group flex flex-col gap-4 rounded-xl border border-mist bg-white p-6 shadow-sm transition-all duration-base hover:-translate-y-1 hover:border-accent-border hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent-subtle text-accent">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-midnight group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-1 font-ui text-sm text-dim">{service.tagline}</p>
                </div>
                <ArrowRight
                  className="h-4 w-4 text-dim transition-transform duration-base group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                />
              </a>
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* ── Service detail sections (client component for animations) ── */}
      <ServicesSections services={services} whatsappUrl={WHATSAPP_URL} />

      {/* ── Insurance strip ──────────────────────────────────── */}
      <section className="bg-soft py-16">
        <div className="mx-auto max-w-container px-6">
          <p className="text-center font-ui text-sm font-semibold uppercase tracking-wider text-dim">
            We accept most major insurance plans
          </p>
          <div className="mt-6">
            <InsuranceMarquee />
          </div>
          <p className="mt-6 text-center font-body text-sm text-dim">
            Don&apos;t see yours?{' '}
            <Link href="/contact" className="font-semibold text-primary hover:text-primary-dark">
              Contact us
            </Link>{' '}
            — we work with many more carriers and verify your coverage at no charge.
          </p>
        </div>
      </section>

      {/* ── First Visit CTA banner ───────────────────────────── */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="flex flex-col items-center gap-8 rounded-2xl border border-white-border bg-white-subtle p-10 text-center backdrop-blur-sm lg:flex-row lg:text-left">
            <div className="flex-1">
              <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
                Limited-time offer
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white lg:text-4xl">
                First Visit Package — <span className="text-accent">$99</span>
              </h2>
              <p className="mt-3 font-body text-lg text-white-faded">
                Comprehensive exam · Digital X-rays · Professional cleaning.
                Everything you need to start your journey to a healthier smile.
              </p>
              <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {[
                  'No hidden fees',
                  'Bilingual staff',
                  'PPO insurance accepted',
                  'CareCredit available',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-ui text-sm text-white-faded">
                    <CheckCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: 'accent', size: 'lg' }))}
              >
                Schedule Now
              </Link>
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
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Services FAQ
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-soft py-16">
        <div className="mx-auto max-w-container px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-midnight">
            Not sure which service is right for you?
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-lg text-dim">
            Our team evaluates your case and recommends the best path forward — no pressure, no upselling.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
            >
              Schedule Free Consultation
            </Link>
            <a
              href={`tel:+16893103396`}
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              (689) 310-3396
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
