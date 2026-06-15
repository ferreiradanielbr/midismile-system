import type { Config } from 'tailwindcss';

/**
 * MediSmile design system — Tailwind theme.
 * All values are wired to the CSS custom properties declared in
 * `src/app/globals.css` (the single source of truth from the prototype).
 * Never hardcode colors in components — use these token-backed utilities.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
          darker: 'var(--color-primary-darker)',
          deep: 'var(--color-primary-deep)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          dim: 'var(--color-accent-dim)',
          subtle: 'var(--color-accent-subtle)',
          border: 'var(--color-accent-border)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          subtle: 'var(--color-gold-subtle)',
          border: 'var(--color-gold-border)',
        },
        pearl: 'var(--color-neutral-50)',
        soft: 'var(--color-neutral-100)',
        mist: 'var(--color-neutral-200)',
        dim: 'var(--color-neutral-500)',
        body: 'var(--color-body)',
        midnight: 'var(--color-neutral-900)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        whatsapp: {
          DEFAULT: 'var(--color-whatsapp)',
          dark: 'var(--color-whatsapp-dark)',
        },
        'white-subtle': 'var(--color-white-subtle)',
        'white-faded': 'var(--color-white-faded)',
        'white-border': 'var(--color-white-border)',
        'white-muted': 'var(--color-white-muted)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        ui: 'var(--font-ui)',
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: '1.5' }],
        sm: ['var(--text-sm)', { lineHeight: '1.5' }],
        base: ['var(--text-base)', { lineHeight: '1.6' }],
        lg: ['var(--text-lg)', { lineHeight: '1.6' }],
        xl: ['var(--text-xl)', { lineHeight: '1.4' }],
        '2xl': ['var(--text-2xl)', { lineHeight: '1.3' }],
        '4xl': ['var(--text-4xl)', { lineHeight: '1.2' }],
        '6xl': ['var(--text-6xl)', { lineHeight: '1.1' }],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        28: 'var(--space-28)',
        32: 'var(--space-32)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        chat: 'var(--shadow-chat)',
        premium: 'var(--shadow-premium)',
      },
      transitionTimingFunction: {
        smooth: 'var(--ease-smooth)',
        spring: 'var(--ease-spring)',
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        xslow: 'var(--duration-xslow)',
      },
      animation: {
        'orb-float': 'orb-float 8s ease-in-out infinite alternate',
        'float-review': 'float-review 6s ease-in-out infinite',
        typing: 'typing 1.2s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
