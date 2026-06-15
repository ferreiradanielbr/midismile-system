'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  isLoading?: boolean;
}

/**
 * MediSmile design system — Input component.
 * Spec: open-design/design-systems/medismile/DESIGN.md §5
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, hint, error, isLoading = false, disabled, id, ...props },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="font-ui text-sm font-medium text-body"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          disabled={disabled ?? isLoading}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(
            'h-11 w-full rounded-md border bg-white px-4 font-body text-base text-body',
            'transition-all duration-fast ease-smooth',
            'placeholder:text-dim',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15',
            error
              ? 'border-error focus:border-error focus:ring-error/15'
              : 'border-mist',
            (disabled ?? isLoading) && 'cursor-not-allowed opacity-50',
            (error || isLoading) && 'pr-10',
            className,
          )}
          {...props}
        />

        {isLoading && !error && (
          <Loader2
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-dim"
            aria-hidden="true"
          />
        )}

        {error && (
          <AlertCircle
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-error"
            aria-hidden="true"
          />
        )}
      </div>

      {hint && !error && (
        <p id={`${inputId}-hint`} className="font-body text-[13px] text-dim">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="flex items-center gap-1 font-body text-[13px] text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
