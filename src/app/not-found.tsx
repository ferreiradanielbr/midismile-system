import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-container flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-ui text-sm font-semibold uppercase tracking-wide text-accent">404</p>
      <h1 className="text-4xl">Page not found</h1>
      <p className="text-dim">The page you are looking for doesn&apos;t exist or was moved.</p>
      <Link href="/">
        <Button variant="primary">Back to home</Button>
      </Link>
    </div>
  );
}
