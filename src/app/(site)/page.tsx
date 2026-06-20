import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, Star, Layers, AlertCircle, Heart, Gem, Phone, MapPin } from 'lucide-react';
import { ServiceCard } from '@/components/ui/Card';
import { AnimatedGrid } from '@/components/ui/AnimatedGrid';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { HeroSection } from '@/components/site/HeroSection';
import { DoctorSection } from '@/components/site/DoctorSection';
import { TestimonialsCarousel, type Testimonial } from '@/components/site/TestimonialsCarousel';
import { buttonVariants } from '@/components/ui/Button';
import { insurancePlans } from '@/lib/insurance-plans';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'MediSmile Group — Premier Dental Care in Orlando, FL',
  description:
    'Bilingual dental care with Dr. Nelson Marques across two Orlando locations. Implants, veneers, orthodontics and more. Free initial consultation.',
};

const WHATSAPP_URL = 'https://wa.me/16893103396';

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

const testimonials: Testimonial[] = [
  {
    author: 'Renata M.',
    location: 'Orlando, FL',
    rating: 5,
    photo: '/images/testimonials/renata.png',
    text: "Dr. Marques completely transformed my smile. My implants look and feel completely natural — I finally smile without hesitation. The whole team is incredible.",
  },
  {
    author: 'Vitória Braga',
    location: 'Ocoee, FL',
    rating: 5,
    photo: '/images/testimonials/vitoria.png',
    lang: 'pt',
    text: "Fui com muito medo e saí sorrindo. A equipe toda fala português, o consultório é moderno e acolhedor, e o Dr. Nelson é um especialista de verdade. Recomendo para toda a comunidade brasileira em Orlando.",
  },
  {
    author: 'Victor Hugo',
    location: 'Winter Springs, FL',
    rating: 5,
    photo: '/images/testimonials/victor.png',
    text: "Best dental experience I've ever had. They handled my SureSmile treatment with precision and the results came ahead of schedule. Modern office, professional team — couldn't be happier.",
  },
];

const faqItems = [
  {
    question: 'Do you accept my insurance?',
    answer:
      'We accept most major insurances including Humana, Aetna, Delta Dental, Ameritas, United Concordia, GEHA, MetLife, and Blue Cross Blue Shield. Self-pay options are also available. Contact us to verify your specific plan.',
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
      "Yes! Dr. Marques and several team members are fluent in Portuguese (Brazilian). We serve Orlando's Brazilian community with pride.",
  },
  {
    question: 'What financing options are available?',
    answer:
      'We offer flexible payment plans and work with CareCredit. Ask our team about options during your consultation.',
  },
  {
    question: 'What are your office hours?',
    answer:
      "We're open Monday through Friday, 10AM to 6PM, at both Winter Springs and Ocoee locations.",
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
      <HeroSection />

      {/* ── Section 2: Trust bar ─────────────────────────────── */}
      <section className="bg-soft py-12">
        <div className="mx-auto max-w-container px-6">
          <p className="text-center font-ui text-sm font-semibold uppercase tracking-wider text-dim">
            We accept most major insurances
          </p>
          <AnimatedGrid className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {insurancePlans.map((plan) => (
              <div
                key={plan.name}
                className="flex h-14 items-center justify-center rounded-lg border border-mist bg-pearl px-5 grayscale transition-all duration-base hover:grayscale-0"
              >
                {plan.logo ? (
                  <Image
                    src={plan.logo}
                    alt={plan.name}
                    width={160}
                    height={60}
                    className="h-6 w-auto object-contain"
                  />
                ) : (
                  <span className="font-ui text-sm font-semibold text-dim hover:text-primary">
                    {plan.name}
                  </span>
                )}
              </div>
            ))}
          </AnimatedGrid>
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
      <DoctorSection />

      {/* ── Section 5: Testimonials carousel ────────────────── */}
      <section className="bg-soft py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Patient stories
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Real smiles, real results
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-lg text-dim">
              Over 300 five-star reviews on Google — here are a few of their stories.
            </p>
          </div>

          <div className="mt-12">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>

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

          <AnimatedGrid className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {locations.map((loc) => (
              <div
                key={loc.name}
                className="flex flex-col gap-6 rounded-xl border border-mist bg-white p-8 shadow-sm"
              >
                <div>
                  <h3 className="font-display text-2xl font-bold text-midnight">{loc.name}</h3>
                  <address className="mt-2 flex flex-col gap-1 font-body text-base not-italic text-dim">
                    <span className="flex items-start gap-2">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
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

                {/* Map placeholder — Google Maps embed in Sprint 3 */}
                <div
                  className="h-40 w-full rounded-lg bg-soft"
                  role="img"
                  aria-label={`Map for ${loc.name} — Google Maps embed Sprint 3`}
                />

                <div className="flex gap-3">
                  <a
                    href={loc.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'primary', size: 'md' }),
                      'flex-1',
                    )}
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:${loc.tel}`}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'md' }),
                      'flex-1',
                    )}
                  >
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </AnimatedGrid>
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
              className={cn(buttonVariants({ variant: 'accent', size: 'lg' }))}
            >
              Schedule Free Consultation
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'whatsapp', size: 'lg' }))}
            >
              WhatsApp Us Now
            </a>
          </div>

          <p className="mt-6 font-ui text-sm text-white-muted">
            No commitment · Free initial consultation · Bilingual staff
          </p>
        </div>
      </section>
    </>
  );
}
