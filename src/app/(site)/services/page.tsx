import type { Metadata } from 'next';
import { Zap, Star, Layers, Gem, AlertCircle, Heart } from 'lucide-react';
import { ServiceCard } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Dental Services | MediSmile Group',
  description:
    'Explore our full range of dental services — from implants to orthodontics — at MediSmile Group in Orlando, FL.',
};

const services = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Dental Implants',
    description:
      'Permanent tooth replacement that looks, feels, and functions like your natural teeth. Dr. Marques has placed thousands of implants over 30 years.',
    href: '#dental-implants',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Teeth Whitening',
    description:
      'Professional in-office whitening for a dramatically brighter smile in under two hours. Safe, effective, and long-lasting results.',
    href: '#teeth-whitening',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Orthodontics',
    description:
      'Straighten your teeth discreetly with modern clear aligners. Effective for teens and adults — without the look of traditional braces.',
    href: '#orthodontics',
  },
  {
    icon: <Gem className="h-6 w-6" />,
    title: 'Porcelain Veneers',
    description:
      'Ultra-thin ceramic shells custom-crafted to cover imperfections and create a flawless, natural-looking smile transformation.',
    href: '#veneers',
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: 'Emergency Dental',
    description:
      'Same-day emergency appointments for sudden pain, broken teeth, or dental trauma. Call or WhatsApp us — we will get you seen quickly.',
    href: '#emergency',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Family Dentistry',
    description:
      'Preventive cleanings, pediatric care, and restorative dentistry for the whole family. Building healthy smiles from the very first tooth.',
    href: '#family',
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6 text-center">
          <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
            What we offer
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-white">
            Dental Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white-faded">
            From routine check-ups to complete smile transformations — all under
            one roof, in English and Portuguese.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <p className="mt-12 text-center font-body text-sm text-dim">
            Full content and procedure details built in Sprint 3.
          </p>
        </div>
      </section>
    </>
  );
}
