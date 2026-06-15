import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * MediSmile design system — Button component.
 *
 * Variants: primary | accent | ghost | whatsapp
 * Sizes:    sm (34px) | md (44px) | lg (52px)
 *
 * All colors are design tokens — never hardcode hex values here.
 * Spec: open-design/design-systems/medismile/DESIGN.md §5 Components › Button variants
 */
const buttonVariants = cva(
  // Base styles — apply to every variant
  [
    'inline-flex items-center justify-center gap-2',
    'font-ui font-semibold tracking-wide',
    'rounded-md',
    'transition-all duration-fast ease-smooth',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-accent focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ],
  {
    variants: {
      variant: {
        /**
         * Primary — Deep Ocean Blue fill.
         * Use for the main CTA on each section (max 1 per visual group).
         */
        primary: [
          'bg-primary text-white',
          'hover:bg-primary-dark hover:-translate-y-px hover:shadow-md',
          'active:translate-y-0 active:shadow-sm',
        ],

        /**
         * Accent — Aqua Vitae fill.
         * Use for secondary CTAs that need energy (e.g. "Book Free Consult").
         */
        accent: [
          'bg-accent text-white',
          'hover:bg-accent-dim hover:-translate-y-px hover:shadow-md',
          'active:translate-y-0 active:shadow-sm',
        ],

        /**
         * Ghost — transparent with primary border.
         * Hover fills to primary. Use alongside a primary button.
         */
        ghost: [
          'border-[1.5px] border-primary text-primary bg-transparent',
          'hover:bg-primary hover:text-white hover:-translate-y-px hover:shadow-md',
          'active:translate-y-0',
        ],

        /**
         * WhatsApp — sacred green #25D366. Never substitute this color.
         * Always pair with the WhatsApp SVG icon.
         */
        whatsapp: [
          'bg-whatsapp text-white',
          'hover:bg-whatsapp-dark hover:-translate-y-px hover:shadow-md',
          'active:translate-y-0 active:shadow-sm',
        ],
      },

      size: {
        /** sm — height 34px · padding 8px 18px · font 13px */
        sm: 'h-[34px] px-[18px] text-[13px]',
        /** md — height 44px · padding 13px 28px · font 15px */
        md: 'h-11 px-7 text-[15px]',
        /** lg — height 52px · padding 16px 36px · font 16px */
        lg: 'h-[52px] px-9 text-base',
      },
    },

    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows a spinner and disables the button while true. */
  isLoading?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, isLoading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2
          className="h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { buttonVariants };
