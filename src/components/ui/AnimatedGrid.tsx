'use client';

import { Children, type ReactNode } from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

interface AnimatedGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a grid of children with a stagger entrance animation.
 * Triggers once when the grid scrolls into the viewport.
 * Rule: stagger-sequence — 50ms per item, ease-out curve.
 */
export function AnimatedGrid({ children, className }: AnimatedGridProps) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
