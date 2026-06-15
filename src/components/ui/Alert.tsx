'use client';

import { type ReactNode } from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'info' | 'success' | 'error' | 'warning';

const variantConfig: Record<
  AlertVariant,
  { icon: ReactNode; classes: string }
> = {
  info: {
    icon: <Info className="h-5 w-5 shrink-0" aria-hidden="true" />,
    classes: 'bg-primary/5 border-primary/20 text-primary',
  },
  success: {
    icon: <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />,
    classes: 'bg-success/10 border-success/25 text-success',
  },
  error: {
    icon: <XCircle className="h-5 w-5 shrink-0" aria-hidden="true" />,
    classes: 'bg-error/10 border-error/25 text-error',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />,
    classes: 'bg-warning/10 border-warning/25 text-warning',
  },
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

/**
 * MediSmile design system — Alert component.
 * Variants: info | success | error | warning
 * Use `onClose` to render a dismiss button (requires 'use client' context).
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
}: AlertProps) {
  const { icon, classes } = variantConfig[variant];

  const ariaLive = variant === 'error' || variant === 'warning' ? 'assertive' : 'polite';

  return (
    <div
      role="alert"
      aria-live={ariaLive}
      className={cn(
        'flex gap-3 rounded-md border p-4 font-body text-sm',
        classes,
        className,
      )}
    >
      {icon}

      <div className="flex-1 space-y-1">
        {title && <p className="font-ui font-semibold">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss alert"
          className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

Alert.displayName = 'Alert';
