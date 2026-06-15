'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(Sprint 6): forward to Sentry.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-container flex-col items-center justify-center gap-6 px-4 text-center">
      <h2 className="text-2xl">Something went wrong</h2>
      <p className="text-dim">An unexpected error occurred. Please try again.</p>
      <Button variant="primary" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
