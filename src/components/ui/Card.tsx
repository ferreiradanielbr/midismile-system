'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────── */
/* ServiceCard                                                  */
/* ─────────────────────────────────────────────────────────── */

export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

const cardBase = cn(
  'group relative flex flex-col gap-5 rounded-xl border border-mist bg-pearl p-8',
  'overflow-hidden transition-colors duration-base ease-smooth',
  'hover:border-accent-border hover:shadow-lg',
);

/**
 * Service card — pearl bg, top accent bar, hover lift + press scale.
 * Rule: scale-feedback (0.97 on tap), stagger-sequence via AnimatedGrid.
 */
export function ServiceCard({ icon, title, description, href, className }: ServiceCardProps) {
  const shared = {
    className: cn(cardBase, href && 'cursor-pointer', className),
    whileHover: { y: -6 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  };

  const content = (
    <>
      {/* Top accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent to-primary-light"
      />
      {/* Icon container */}
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-accent-subtle text-accent">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-xl font-bold text-midnight">{title}</h3>
        <p className="mt-2 font-body text-base text-dim">{description}</p>
      </div>
      <ArrowUpRight
        className="h-5 w-5 self-end text-dim transition-transform duration-base group-hover:rotate-45 group-hover:text-accent"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <motion.a href={href} {...shared}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div {...shared}>
      {content}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* DoctorCard                                                   */
/* ─────────────────────────────────────────────────────────── */

export interface DoctorCardProps {
  name: string;
  title: string;
  credentials: string[];
  imageSrc: string;
  imageAlt: string;
  bio: string;
  className?: string;
}

/**
 * Doctor card — dark midnight background with gradient, circular avatar.
 */
export function DoctorCard({
  name,
  title,
  credentials,
  imageSrc,
  imageAlt,
  bio,
  className,
}: DoctorCardProps) {
  return (
    <div
      className={cn(
        'section-dark flex flex-col gap-6 rounded-xl p-8',
        className,
      )}
    >
      {/* Avatar */}
      <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-accent-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <h3 className="font-display text-2xl font-bold text-white">{name}</h3>
        <p className="mt-1 font-ui text-sm text-white-faded">{title}</p>
      </div>

      <p className="font-body text-base text-white-faded">{bio}</p>

      <div className="flex flex-wrap gap-2">
        {credentials.map((cred) => (
          <span
            key={cred}
            className="rounded-full border border-white-border bg-white-subtle px-3 py-1 font-ui text-[11px] font-semibold text-white-faded"
          >
            {cred}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* ReviewCard                                                   */
/* ─────────────────────────────────────────────────────────── */

export interface ReviewCardProps {
  author: string;
  location: string;
  rating: number;
  text: string;
  date?: string;
  className?: string;
}

/**
 * Review / testimonial card — pearl bg, gold stars, subtle press scale.
 * Rule: scale-feedback (0.98 on tap).
 */
export function ReviewCard({ author, location, rating, text, date, className }: ReviewCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-mist bg-pearl p-7',
        'transition-shadow duration-base hover:shadow-md',
        className,
      )}
    >
      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < rating ? 'fill-gold text-gold' : 'fill-mist text-mist',
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="flex-1 font-body text-base leading-relaxed text-body">
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-end justify-between">
        <div>
          <p className="font-ui text-sm font-semibold text-midnight">{author}</p>
          <p className="font-ui text-[12px] text-dim">{location}</p>
        </div>
        {date && <p className="font-ui text-[12px] text-dim">{date}</p>}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* PricingCard                                                  */
/* ─────────────────────────────────────────────────────────── */

export interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  featured?: boolean;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * Pricing card — pearl bg, gold top border when featured.
 */
export function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  featured = false,
  onCtaClick,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-xl border bg-pearl p-8',
        'transition-shadow duration-base hover:shadow-lg',
        featured
          ? 'border-t-2 border-t-gold border-mist shadow-md'
          : 'border-mist',
        className,
      )}
    >
      <div>
        <p className="font-ui text-sm font-semibold uppercase tracking-wide text-dim">{name}</p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="tabular-nums font-display text-4xl font-bold text-midnight">{price}</span>
          {period && <span className="font-body text-base text-dim">{period}</span>}
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 font-body text-base text-body">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onCtaClick}
        className={cn(
          'mt-auto h-11 w-full rounded-md font-ui font-semibold transition-all duration-fast',
          featured
            ? 'bg-primary text-white hover:bg-primary-dark'
            : 'border border-primary text-primary hover:bg-primary hover:text-white',
        )}
      >
        {cta}
      </button>
    </div>
  );
}
