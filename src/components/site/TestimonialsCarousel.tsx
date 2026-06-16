'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Testimonial {
  author: string;
  location: string;
  rating: number;
  text: string;
  photo: string;
  lang?: 'en' | 'pt';
}

interface Props {
  testimonials: Testimonial[];
  autoplayMs?: number;
}

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 28 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
  }),
};

export function TestimonialsCarousel({ testimonials, autoplayMs = 5000 }: Props) {
  const [[index, dir], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = useCallback(
    (newDir: number) => {
      setPage(([prev]) => {
        const next = (prev + newDir + testimonials.length) % testimonials.length;
        return [next, newDir];
      });
    },
    [testimonials.length],
  );

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => paginate(1), autoplayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, paginate, autoplayMs]);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paginate]);

  const current = testimonials[index];
  if (!current) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Patient testimonials"
    >
      {/* Main card */}
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            aria-live="polite"
            aria-atomic="true"
            className="relative flex flex-col gap-6 rounded-2xl border border-mist bg-white p-8 shadow-md md:flex-row md:items-start md:gap-10 md:p-10"
          >
            {/* Quote mark */}
            <Quote
              className="absolute right-8 top-8 h-10 w-10 text-accent-subtle"
              aria-hidden="true"
            />

            {/* Author photo */}
            <div className="flex shrink-0 flex-col items-center gap-3">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-accent-border shadow-md">
                <Image
                  src={current.photo}
                  alt={current.author}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="text-center">
                <p className="font-ui text-sm font-semibold text-midnight">{current.author}</p>
                <p className="font-ui text-[12px] text-dim">{current.location}</p>
              </div>
              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < current.rating ? 'fill-gold text-gold' : 'fill-mist text-mist',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
              {current.lang === 'pt' && (
                <span className="mb-3 inline-flex w-fit items-center rounded-full border border-gold-border bg-gold-subtle px-2.5 py-0.5 font-ui text-[11px] font-semibold text-gold">
                  Em Português
                </span>
              )}
              <p className="font-body text-lg leading-relaxed text-body">
                &ldquo;{current.text}&rdquo;
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div className="mt-6 flex items-center justify-between">
        {/* Prev / Next */}
        <div className="flex gap-2">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mist bg-white text-body transition-all duration-fast hover:border-accent hover:text-accent hover:shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mist bg-white text-body transition-all duration-fast hover:border-accent hover:text-accent hover:shadow-sm"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              className={cn(
                'h-2 rounded-full transition-all duration-base',
                i === index
                  ? 'w-6 bg-accent'
                  : 'w-2 bg-mist hover:bg-dim',
              )}
            />
          ))}
        </div>

        {/* Slide counter */}
        <p className="font-ui text-sm text-dim" aria-hidden="true">
          {index + 1} / {testimonials.length}
        </p>
      </div>
    </div>
  );
}
