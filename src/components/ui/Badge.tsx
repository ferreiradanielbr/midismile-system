import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * MediSmile design system — Badge component.
 *
 * Variants: teal | gold | white (for dark backgrounds)
 * Sizes:    sm (11px) | md (12px)
 *
 * Spec: design-system/medismile/MASTER.md
 */
const badgeVariants = cva(
  [
    'inline-flex items-center font-ui font-semibold tracking-wide rounded-full border',
    'transition-colors duration-fast',
  ],
  {
    variants: {
      variant: {
        /** Teal — for light backgrounds; accent service labels */
        teal: 'bg-accent-subtle border-accent-border text-accent',
        /** Gold — for credentials, premium labels */
        gold: 'bg-gold-subtle border-gold-border text-gold',
        /** White — for dark section backgrounds */
        white: 'bg-white-subtle border-white-border text-white-faded',
      },
      size: {
        sm: 'text-[11px] px-[10px] py-[4px]',
        md: 'text-[12px] px-[14px] py-[5px]',
      },
    },
    defaultVariants: { variant: 'teal', size: 'md' },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, size, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { badgeVariants };
