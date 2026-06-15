'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  rows?: number;
}

/**
 * MediSmile design system — Textarea component.
 * Same anatomy as Input. Spec: open-design/design-systems/medismile/DESIGN.md §5
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, label, hint, error, rows = 4, disabled, id, ...props },
  ref,
) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-ui text-sm font-medium text-body"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          className={cn(
            'w-full min-h-[112px] rounded-md border bg-white px-4 py-3 font-body text-base text-body',
            'resize-vertical transition-all duration-fast ease-smooth',
            'placeholder:text-dim',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15',
            error
              ? 'border-error focus:border-error focus:ring-error/15'
              : 'border-mist',
            disabled && 'cursor-not-allowed opacity-50',
            className,
          )}
          {...props}
        />

        {error && (
          <AlertCircle
            className="absolute right-3 top-3 h-4 w-4 text-error"
            aria-hidden="true"
          />
        )}
      </div>

      {hint && !error && (
        <p id={`${textareaId}-hint`} className="font-body text-[13px] text-dim">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${textareaId}-error`}
          role="alert"
          className="font-body text-[13px] text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
