'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  icon: ReactNode;
  title: string;
  tagline: string;
  description: string;
  benefits: readonly string[];
  badge: string | null;
  photo?: string;
}

interface Props {
  services: readonly Service[];
  whatsappUrl: string;
}

// Maps each service to the best available real photo
const SERVICE_PHOTOS: Record<string, string> = {
  'dental-implants': '/images/services/implants.png',
  'orthodontics': '/images/services/dental-tools.jpg',
  'suresmile': '/images/hero/clinic-office.jpg',
  'teeth-whitening': '/images/hero/sorriso-bg.png',
  'dental-cleaning': '/images/services/xray.png',
  'crowns-bridges': '/images/services/tooth-anatomy.png',
  'endodontics': '/images/services/dental-tools.jpg',
  'orofacial-harmonization': '/images/hero/dentista-hero.jpg',
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export function ServicesSections({ services, whatsappUrl }: Props) {
  return (
    <>
      {services.map((service, index) => {
        const isDark = index % 2 !== 0;

        return (
          <section
            key={service.id}
            id={service.id}
            className={cn(
              'scroll-mt-[72px] py-20',
              isDark ? 'section-dark' : 'bg-pearl',
            )}
          >
            <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
              {/* Content — alternates left/right */}
              <motion.div
                className={cn('flex flex-col gap-6', isDark ? '' : '', index % 2 !== 0 ? 'lg:order-2' : '')}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                {/* Badge */}
                {service.badge && (
                  <motion.span
                    variants={fadeUp}
                    className={cn(
                      'inline-flex w-fit items-center rounded-full px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-wider',
                      isDark
                        ? 'border border-white-border bg-white-subtle text-white-faded'
                        : 'border border-gold-border bg-gold-subtle text-gold',
                    )}
                  >
                    {service.badge}
                  </motion.span>
                )}

                {/* Icon + label */}
                <motion.div variants={fadeUp} className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-[14px]',
                      isDark ? 'bg-white-subtle text-accent' : 'bg-accent-subtle text-accent',
                    )}
                  >
                    {service.icon}
                  </div>
                  <p
                    className={cn(
                      'font-ui text-sm font-semibold uppercase tracking-wider',
                      isDark ? 'text-accent' : 'text-accent',
                    )}
                  >
                    {service.tagline}
                  </p>
                </motion.div>

                {/* Title */}
                <motion.h2
                  variants={fadeUp}
                  className={cn(
                    'font-display text-4xl font-bold',
                    isDark ? 'text-white' : 'text-midnight',
                  )}
                >
                  {service.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={fadeUp}
                  className={cn(
                    'font-body text-lg leading-relaxed',
                    isDark ? 'text-white-faded' : 'text-dim',
                  )}
                >
                  {service.description}
                </motion.p>

                {/* Benefits */}
                <motion.ul variants={fadeUp} className="flex flex-col gap-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <CheckCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          'font-body text-base',
                          isDark ? 'text-white-faded' : 'text-body',
                        )}
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'accent', size: 'lg' }))}
                  >
                    Book a Consultation
                  </a>
                </motion.div>
              </motion.div>

              {/* Service photo */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 !== 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                className={cn(
                  'relative h-[400px] w-full overflow-hidden rounded-2xl',
                  index % 2 !== 0 ? 'lg:order-1' : '',
                )}
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, var(--color-primary-darker) 0%, var(--color-primary) 60%, var(--color-primary-light) 100%)'
                    : 'linear-gradient(135deg, var(--color-neutral-100) 0%, var(--color-neutral-200) 100%)',
                }}
              >
                {SERVICE_PHOTOS[service.id] != null && (
                  <Image
                    src={SERVICE_PHOTOS[service.id] as string}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
              </motion.div>
            </div>
          </section>
        );
      })}
    </>
  );
}
