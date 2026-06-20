'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Wraps the app with LazyMotion's `domAnimation` feature set. Note: every
 * animated component in this codebase imports `motion.*` directly (not the
 * lighter `m.*` API), so `motion` still pulls in the full bundle regardless
 * of this wrapper — there's no `strict` mode here because that throws a
 * render error on any `motion.*` usage. Realizing the ~17kB saving this is
 * meant for requires migrating every `motion.*` call site to `m.*` first.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
