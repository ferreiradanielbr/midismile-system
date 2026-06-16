'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const WHATSAPP_URL = 'https://wa.me/16893103396';

// ── CountUp hook ─────────────────────────────────────────────
function useCountUp(end: number, delay = 700, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, delay, duration]);

  return count;
}

// ── Stat item ────────────────────────────────────────────────
function AnimatedStat({
  end,
  suffix,
  label,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const count = useCountUp(end, delay);
  return (
    <div>
      <p className="font-display text-3xl font-bold text-accent">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="font-ui text-sm text-white-faded">{label}</p>
    </div>
  );
}

// ── Stagger variants ─────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0, 0, 0.2, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const, delay: 0.2 } },
};

// ────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="section-dark relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden">

      {/* Background photo — subtle overlay behind the dark gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/hero/clinic-office.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-[0.12]"
          sizes="100vw"
        />
      </div>

      {/* Gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-primary-light/15 blur-3xl animate-orb-float" />
        <div className="absolute -bottom-20 right-0 h-[500px] w-[500px] rounded-full bg-accent/8 blur-3xl animate-orb-float [animation-delay:3s]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-container grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">

        {/* ── Left — staggered content ─────────────────────── */}
        <motion.div
          className="flex flex-col gap-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Trust badge */}
          <motion.div variants={fadeUp}>
            <Badge variant="white" size="md">
              Premier Dental Care · Orlando, FL
            </Badge>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold leading-tight text-white lg:text-6xl"
          >
            The smile you{' '}
            <em className="not-italic text-accent">deserve.</em>
            <br />
            The care you trust.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="max-w-lg font-body text-lg leading-relaxed text-white-faded"
          >
            Bilingual care with Dr. Nelson Marques — 30 years of precision
            dentistry across two Orlando locations.
          </motion.p>

          {/* Promo pill */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-border bg-gold-subtle px-4 py-2 font-ui text-sm font-semibold text-gold">
              <Tag className="h-4 w-4" aria-hidden="true" />
              First Visit Package — $99 · Exam + X-ray + Cleaning
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
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
          </motion.div>

          {/* Animated stats bar */}
          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-wrap gap-8 border-t border-white-border pt-6"
          >
            <AnimatedStat end={2500} suffix="+" label="Patients" delay={800} />
            <AnimatedStat end={30} suffix="+" label="Years" delay={950} />
            <div>
              <p className="font-display text-3xl font-bold text-accent">2</p>
              <p className="font-ui text-sm text-white-faded">Locations</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-accent">5★</p>
              <p className="font-ui text-sm text-white-faded">Rating</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right — hero image + floating social-proof cards ─ */}
        <motion.div
          className="relative flex items-center justify-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {/* Main hero image */}
          <div className="relative h-[480px] w-full max-w-[460px] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/hero/sorriso-bg.png"
              alt="Beautiful smile results at MediSmile Group"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 460px"
            />
            {/* Bottom gradient overlay for readability */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-32"
              style={{
                background:
                  'linear-gradient(to top, var(--color-primary-darker) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Floating card 1 — Google rating */}
          <motion.div
            className="absolute -bottom-4 -left-4 flex animate-float-review items-center gap-3 rounded-xl border border-white-border bg-white/10 px-4 py-3 backdrop-blur-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <Star className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
            <div>
              <p className="font-ui text-sm font-semibold text-white">5.0 · 300+ Reviews</p>
              <p className="font-ui text-[12px] text-white-faded">Google</p>
            </div>
          </motion.div>

          {/* Floating card 2 — Insurance */}
          <motion.div
            className="absolute -right-4 top-8 flex animate-float-review [animation-delay:1.5s] items-center gap-3 rounded-xl border border-white-border bg-white/10 px-4 py-3 backdrop-blur-sm"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <CheckCircle className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="font-ui text-sm font-semibold text-white">Most insurances accepted</p>
          </motion.div>

          {/* Floating card 3 — Bilingual */}
          <motion.div
            className="absolute -left-4 top-1/2 -translate-y-1/2 hidden animate-float-review [animation-delay:0.8s] items-center gap-2 rounded-xl border border-white-border bg-white/10 px-3 py-2.5 backdrop-blur-sm xl:flex"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.5, ease: [0, 0, 0.2, 1] }}
          >
            <span className="font-ui text-xs font-semibold text-white">EN / PT</span>
            <span className="h-3 w-px bg-white-border" aria-hidden="true" />
            <span className="font-ui text-xs text-white-faded">Bilingual</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
