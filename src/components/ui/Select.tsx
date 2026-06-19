'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * MediSmile design system — Select component.
 * Native select with custom styling. Spec: design-system/medismile/MASTER.md
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, label, hint, error, options, placeholder, disabled, id, ...props },
  ref,
) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={selectId}
          className="font-ui text-sm font-medium text-body"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
          }
          className={cn(
            'h-11 w-full appearance-none rounded-md border bg-white px-4 pr-10',
            'font-body text-base text-body',
            'transition-all duration-fast ease-smooth',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15',
            error
              ? 'border-error focus:border-error focus:ring-error/15'
              : 'border-mist',
            disabled && 'cursor-not-allowed opacity-50',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dim"
          aria-hidden="true"
        />
      </div>

      {hint && !error && (
        <p id={`${selectId}-hint`} className="font-body text-[13px] text-dim">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${selectId}-error`}
          role="alert"
          className="font-body text-[13px] text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
