import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Heart, Quote, Sparkles, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { AnimatedGrid } from '@/components/ui/AnimatedGrid';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us | MediSmile Group',
  description:
    'Meet Dr. Nelson Marques and the MediSmile team. 30+ years of precision dentistry in Orlando, FL.',
};

const WHATSAPP_URL = 'https://wa.me/16893103396';

const credentials = [
  'University of Florida',
  'MARC Institute Miami',
  'Implant Specialist',
  'Orofacial Harmonization',
  'Bilingual EN/PT',
] as const;

const milestones = [
  {
    era: 'Foundations',
    title: 'A career built on listening first',
    description:
      'Dr. Marques began practicing general dentistry, shaping the patient-first philosophy that still guides every visit today.',
  },
  {
    era: 'Advanced training',
    title: 'Advanced Implantology — University of Florida',
    description:
      'Specialized training in dental implants, focused on precision placement and natural, lasting results.',
  },
  {
    era: 'Specialization',
    title: 'Orofacial Harmonization — MARC Institute, Miami',
    description:
      'Added facial aesthetics to his clinical toolkit, learning to harmonize smiles with the face as a whole.',
  },
  {
    era: 'Growth',
    title: 'Founding MediSmile Group',
    description:
      'Opened the doors to bilingual, premium dental care — first in Winter Springs, then Ocoee — for Orlando families.',
  },
  {
    era: 'Today',
    title: '30+ years, 2,500+ patients',
    description:
      'Still treating every patient like family, across two Orlando locations, in English and Portuguese.',
  },
] as const;

const values = [
  {
    icon: Sparkles,
    title: 'Excellence',
    description: 'Precision techniques and continuous training behind every procedure.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Unhurried visits where your goals — not just your teeth — come first.',
  },
  {
    icon: Users,
    title: 'Community',
    description: "Bilingual care that feels familiar to Orlando's diverse families.",
  },
] as const;

const careTeamRoles = [
  'Patient Care Coordinators',
  'Bilingual Front Desk',
  'Dental Hygienists',
  'Treatment Planning',
] as const;

const officePhotos = [
  { src: '/images/about/lounge.jpg', alt: 'MediSmile Group waiting lounge' },
  { src: '/images/about/reception.jpg', alt: 'MediSmile Group reception desk' },
  { src: '/images/about/treatment-room.jpg', alt: 'MediSmile Group treatment room' },
  { src: '/images/about/hallway.jpg', alt: 'MediSmile Group office hallway' },
  { src: '/images/about/consultation-room.jpg', alt: 'MediSmile Group consultation room' },
  { src: '/images/about/hallway-signage.jpg', alt: 'MediSmile Group hallway signage' },
  { src: '/images/about/sterilization-hallway.jpg', alt: 'MediSmile Group sterilization area' },
  { src: '/images/about/coffee-corner.jpg', alt: 'MediSmile Group coffee corner' },
  { src: '/images/about/entrance.jpg', alt: 'MediSmile Group office entrance' },
  { src: '/images/about/exterior.jpg', alt: 'MediSmile Group office exterior' },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark relative overflow-hidden py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-primary-light/10 blur-3xl animate-orb-float" />
          <div className="absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl animate-orb-float [animation-delay:2s]" />
        </div>

        <div className="relative mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
                Meet your doctor
              </p>
              <h1 className="font-display text-5xl font-bold text-white">
                Dr. Nelson Marques
              </h1>
              <p className="font-body text-lg leading-relaxed text-white-faded">
                Board-certified with over three decades of experience in implant
                dentistry and orofacial harmonization. Trained at the University
                of Florida and MARC Institute Miami — bringing world-class
                expertise to Orlando&apos;s diverse community.
              </p>
              <div className="flex flex-wrap gap-2">
                {credentials.map((cred) => (
                  <Badge key={cred} variant="white" size="sm">
                    {cred}
                  </Badge>
                ))}
              </div>
            </div>

            <div
              className="relative h-[440px] w-full overflow-hidden rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              }}
            >
              <Image
                src="/images/team/dr-nelson.png"
                alt="Dr. Nelson Marques — MediSmile Group"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / quote */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Quote className="mx-auto h-9 w-9 text-gold" aria-hidden="true" />
          <p className="mt-6 font-display text-2xl font-medium italic leading-relaxed text-midnight lg:text-3xl">
            &ldquo;Every patient deserves a smile that reflects who they truly
            are. That&apos;s why I take time to understand your goals, not just
            your teeth.&rdquo;
          </p>
          <p className="mt-6 font-ui text-sm font-semibold uppercase tracking-wider text-dim">
            — Dr. Nelson Marques
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              The journey
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">
              Three decades of precision care
            </h2>
          </div>

          <AnimatedGrid className="mx-auto mt-16 max-w-2xl">
            {milestones.map(({ era, title, description }, i) => (
              <div
                key={era}
                className={cn(
                  'relative border-l-2 border-white-border pb-10 pl-8 last:pb-0',
                  i === 0 && 'pt-0',
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-accent"
                />
                <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
                  {era}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-white">{title}</h3>
                <p className="mt-2 font-body text-base leading-relaxed text-white-faded">
                  {description}
                </p>
              </div>
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Mission + values */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Our mission
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Excellence, compassion, and community
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-dim">
              MediSmile Group was founded on the belief that exceptional dental
              care should be accessible to every family. With bilingual staff
              fluent in English and Portuguese, we proudly serve Orlando&apos;s
              diverse community — making world-class dentistry feel comfortable,
              familiar, and personal.
            </p>
          </div>

          <AnimatedGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-3 rounded-xl border border-mist bg-white p-8 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-subtle text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-midnight">{title}</h3>
                <p className="font-body text-sm leading-relaxed text-dim">{description}</p>
              </div>
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Care team */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
                Your care team
              </p>
              <h2 className="font-display text-4xl font-bold text-white">
                Supported by a dedicated, multilingual team
              </h2>
              <p className="font-body text-lg leading-relaxed text-white-faded">
                Behind every visit is a warm team trained to make you feel at
                home from the moment you walk in — in English, Portuguese, or
                Spanish — from your first call to your last checkup.
              </p>
              <div className="flex flex-wrap gap-2">
                {careTeamRoles.map((role) => (
                  <Badge key={role} variant="white" size="sm">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/about/lounge-wide.jpg"
                alt="MediSmile Group waiting area"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24"
                style={{
                  background:
                    'linear-gradient(to top, var(--color-primary-darker) 0%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white-border bg-white/10 px-3 py-2.5 backdrop-blur-sm">
                <GraduationCap className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="font-ui text-xs font-semibold text-white">
                  EN / PT / ES — care in your language
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our space */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Our space
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Step inside our Orlando office
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-dim">
              From a calming reception area to fully equipped treatment rooms,
              every detail of MediSmile Group is designed around your comfort.
            </p>
          </div>

          <AnimatedGrid className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {officePhotos.map(({ src, alt }) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-xl shadow-sm"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-slow hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-midnight">
            Ready to meet Dr. Marques?
          </h2>
          <p className="mt-3 font-body text-lg text-dim">
            Book a free consultation at Winter Springs or Ocoee — no pressure,
            just a clear plan for your smile.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
