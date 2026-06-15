import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Star,
  Layers,
  AlertCircle,
  Heart,
  Gem,
  Phone,
  MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ServiceCard } from '@/components/ui/Card';
import { ReviewCard } from '@/components/ui/Card';
import { AnimatedGrid } from '@/components/ui/AnimatedGrid';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { ChatWidget } from '@/components/chat/ChatWidget';

export const metadata: Metadata = {
  title: 'MediSmile Group — Premier Dental Care in Orlando, FL',
  description:
    'Bilingual dental care with Dr. Nelson Marques across two Orlando locations. Implants, veneers, orthodontics and more. Free initial consultation.',
};

const WHATSAPP_URL = 'https://wa.me/16893103396';

const stats = [
  { number: '2,500+', label: 'Patients' },
  { number: '30+', label: 'Years' },
  { number: '2', label: 'Locations' },
  { number: '5★', label: 'Rating' },
] as const;

const insurances = [
  'Delta Dental',
  'Cigna',
  'Aetna',
  'Humana',
  'UnitedHealthcare',
  'Blue Cross',
] as const;

const services = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Dental Implants',
    description: 'Permanent tooth replacement that looks and feels natural.',
    href: '/services#dental-implants',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Teeth Whitening',
    description: 'Professional whitening for a brighter, confident smile.',
    href: '/services#teeth-whitening',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Orthodontics',
    description: 'Straighter teeth with modern invisible aligners.',
    href: '/services#orthodontics',
  },
  {
    icon: <Gem className="h-6 w-6" />,
    title: 'Porcelain Veneers',
    description: 'Transform your smile with custom-crafted veneers.',
    href: '/services#veneers',
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: 'Emergency Dental',
    description: 'Same-day care when you need it most.',
    href: '/services#emergency',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Family Dentistry',
    description: 'Comprehensive care for every member of your family.',
    href: '/services#family',
  },
] as const;

const reviews = [
  {
    author: 'Maria S.',
    location: 'Orlando',
    rating: 5,
    text: "Dr. Marques changed my life. My implants look completely natural and the team made me feel at ease throughout. Best dental experience I've ever had.",
  },
  {
    author: 'James R.',
    location: 'Winter Springs',
    rating: 5,
    text: "Finally a dentist who speaks my language — literally. The Portuguese-speaking staff made my mother feel completely comfortable during her treatment.",
  },
  {
    author: 'Ana P.',
    location: 'Ocoee',
    rating: 5,
    text: "From the moment I walked in I knew this was different. The office is beautiful, the team is professional, and the results exceeded my expectations.",
  },
] as const;

const faqItems = [
  {
    question: 'Do you accept my insurance?',
    answer:
      'We accept most major insurances including Delta Dental, Cigna, Aetna, Humana, UnitedHealthcare, and Blue Cross. Contact us to verify your specific plan.',
  },
  {
    question: 'How long does a dental implant procedure take?',
    answer:
      'The full implant process typically takes 3–6 months, including healing time. Your initial consultation will include a personalized timeline.',
  },
  {
    question: 'Do you offer same-day emergency appointments?',
    answer:
      "Yes. We reserve time daily for dental emergencies. Call us or WhatsApp and we'll get you in as soon as possible.",
  },
  {
    question: 'Do you have Portuguese-speaking staff?',
    answer:
      'Yes! Dr. Marques and several team members are fluent in Portuguese (Brazilian). We serve Orlando\'s Brazilian community with pride.',
  },
  {
    question: 'What financing options are available?',
    answer:
      'We offer flexible payment plans and work with CareCredit. Ask our team about options during your consultation.',
  },
  {
    question: 'What are your office hours?',
    answer:
      'We\'re open Monday through Friday, 10AM to 6PM, at both Winter Springs and Ocoee locations.',
  },
] as const;

const locations = [
  {
    name: 'Winter Springs',
    address: '411 E State Rd 434 Suite D',
    city: 'Winter Springs, FL 32708',
    phone: '(689) 213-4161',
    tel: '+16892134161',
    mapsHref:
      'https://maps.google.com/maps?q=411+E+State+Rd+434+Suite+D+Winter+Springs+FL+32708',
  },
  {
    name: 'Ocoee',
    address: '10131 W Colonial Drive Suite 3',
    city: 'Ocoee, FL 34761',
    phone: '(689) 310-3396',
    tel: '+16893103396',
    mapsHref:
      'https://maps.google.com/maps?q=10131+W+Colonial+Drive+Suite+3+Ocoee+FL+34761',
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden">
        {/* Decorative orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl animate-orb-float" />
          <div className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl animate-orb-float [animation-delay:3s]" />
        </div>

        <div className="relative mx-auto grid max-w-container grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          {/* Left — content */}
          <div className="flex flex-col gap-6">
            <Badge variant="white" size="md">
              Premier Dental Care · Orlando, FL
            </Badge>

            <h1 className="font-display text-5xl font-bold leading-tight text-white lg:text-6xl">
              The smile you{' '}
              <em className="italic text-accent not-italic">deserve.</em>
              <br />
              The care you trust.
            </h1>

            <p className="max-w-lg font-body text-lg leading-relaxed text-white-faded">
              Bilingual care with Dr. Nelson Marques — 30 years of precision
              dentistry across two Orlando locations.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-primary px-9 font-ui text-base font-semibold text-white transition-all duration-fast hover:bg-primary-dark hover:-translate-y-px hover:shadow-md"
              >
                Schedule Free Consultation
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-whatsapp px-9 font-ui text-base font-semibold text-white transition-all duration-fast hover:bg-whatsapp-dark hover:-translate-y-px hover:shadow-md"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Stats bar */}
            <div className="mt-4 flex flex-wrap gap-8 border-t border-white-border pt-6">
              {stats.map(({ number, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl font-bold text-accent">{number}</p>
                  <p className="font-ui text-sm text-white-faded">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual placeholder + floating cards */}
          <div className="relative flex items-center justify-center">
            {/* Image placeholder */}
            <div
              className="relative h-[420px] w-full max-w-[440px] overflow-hidden rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary-darker) 0%, var(--color-primary) 50%, var(--color-primary-light) 100%)',
              }}
            >
              <p className="absolute inset-0 flex items-center justify-center font-ui text-sm text-white-muted">
                Photo — Dr. Nelson Marques
                <br />
                (Sprint 3)
              </p>
            </div>

            {/* Floating card 1 */}
            <div className="absolute -bottom-4 -left-4 flex animate-float-review items-center gap-3 rounded-xl border border-white-border bg-white/10 px-4 py-3 backdrop-blur-sm">
              <span className="text-xl" aria-hidden="true">⭐</span>
              <div>
                <p className="font-ui text-sm font-semibold text-white">5.0 · 300+ Reviews</p>
                <p className="font-ui text-[12px] text-white-faded">Google</p>
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute -right-4 top-8 flex animate-float-review [animation-delay:1.5s] items-center gap-3 rounded-xl border border-white-border bg-white/10 px-4 py-3 backdrop-blur-sm">
              <span className="text-xl text-accent" aria-hidden="true">✓</span>
              <p className="font-ui text-sm font-semibold text-white">Most insurances accepted</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Trust bar ─────────────────────────────── */}
      <section className="bg-soft py-12">
        <div className="mx-auto max-w-container px-6">
          <p className="text-center font-ui text-sm font-semibold uppercase tracking-wider text-dim">
            We accept most major insurances
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {insurances.map((name) => (
              <span
                key={name}
                className="rounded-lg border border-mist bg-pearl px-5 py-2.5 font-ui text-sm font-semibold text-dim grayscale transition-all duration-base hover:grayscale-0 hover:text-primary hover:border-accent-border"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Services ──────────────────────────────── */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              What we offer
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Comprehensive care
              <br />
              for your whole smile
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-dim">
              From preventive check-ups to complete smile transformations.
            </p>
          </div>

          <AnimatedGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </AnimatedGrid>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 font-ui text-[15px] font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 4: Doctor ────────────────────────────────── */}
      <section className="section-dark">
        <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Meet your doctor
            </p>
            <h2 className="font-display text-4xl font-bold text-white">
              Dr. Nelson Marques
              <br />
              <em className="italic text-accent">30 years</em> of precision care
            </h2>
            <p className="font-body text-lg leading-relaxed text-white-faded">
              Board-certified with over three decades of experience in implant
              dentistry and orofacial harmonization. Trained at the University of
              Florida and MARC Institute Miami — bringing world-class expertise to
              Orlando.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2">
              {[
                'University of Florida',
                'MARC Institute Miami',
                'Implant Specialist',
                'Orofacial Harmonization',
                'Bilingual EN/PT',
              ].map((cred) => (
                <Badge key={cred} variant="white" size="sm">
                  {cred}
                </Badge>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-accent px-9 font-ui text-base font-semibold text-white transition-all duration-fast hover:bg-accent-dim hover:-translate-y-px hover:shadow-md"
              >
                Meet Dr. Marques
              </Link>
            </div>
          </div>

          {/* Right — image placeholder */}
          <div
            className="h-[440px] w-full rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
            }}
            aria-label="Photo of Dr. Nelson Marques — Sprint 3"
            role="img"
          />
        </div>
      </section>

      {/* ── Section 5: Reviews ───────────────────────────────── */}
      <section className="bg-soft py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Patient stories
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Real smiles, real results
            </h2>
          </div>

          <AnimatedGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.author} {...review} />
            ))}
          </AnimatedGrid>

          <div className="mt-8 text-center">
            <a
              href="https://g.page/r/medismile-reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui text-[15px] font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              See all reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 6: Locations ─────────────────────────────── */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Find us
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Two convenient
              <br />
              Orlando locations
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {locations.map((loc) => (
              <div
                key={loc.name}
                className="flex flex-col gap-6 rounded-xl border border-mist bg-white p-8 shadow-sm"
              >
                <div>
                  <h3 className="font-display text-2xl font-bold text-midnight">{loc.name}</h3>
                  <address className="mt-2 flex flex-col gap-1 font-body text-base not-italic text-dim">
                    <span className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {loc.address}, {loc.city}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <a href={`tel:${loc.tel}`} className="hover:text-primary">
                        {loc.phone}
                      </a>
                    </span>
                  </address>
                  <p className="mt-2 font-ui text-sm text-dim">Mon–Fri 10AM–6PM</p>
                </div>

                {/* Map placeholder */}
                <div
                  className="h-40 w-full rounded-lg bg-soft"
                  aria-label={`Map for ${loc.name} — Google Maps embed Sprint 3`}
                  role="img"
                />

                <div className="flex gap-3">
                  <a
                    href={loc.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-primary px-4 font-ui text-sm font-semibold text-white transition-all hover:bg-primary-dark"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:${loc.tel}`}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-md border border-primary px-4 font-ui text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: FAQ ───────────────────────────────────── */}
      <section className="bg-soft py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Everything you need to know
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── Section 8: Final CTA ─────────────────────────────── */}
      <section className="section-dark py-24">
        <div className="mx-auto max-w-container px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white lg:text-5xl">
            Your best smile is
            <br />
            one call away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-white-faded">
            Schedule your free consultation today — in English or Portuguese.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-primary px-9 font-ui text-base font-semibold text-white transition-all duration-fast hover:bg-primary-dark hover:-translate-y-px hover:shadow-md"
            >
              Schedule Free Consultation
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-whatsapp px-9 font-ui text-base font-semibold text-white transition-all duration-fast hover:bg-whatsapp-dark hover:-translate-y-px hover:shadow-md"
            >
              WhatsApp Us Now
            </a>
          </div>

          <p className="mt-6 font-ui text-sm text-white-muted">
            No commitment · Free initial consultation · Bilingual staff
          </p>
        </div>
      </section>

      {/* Chat widget */}
      <ChatWidget />
    </>
  );
}
