'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Wraps the app with LazyMotion using the lightweight `domAnimation` feature set
 * (~17kB) instead of the full bundle (~34kB). All `motion.*` components continue
 * to work as-is — no changes needed in individual components.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
