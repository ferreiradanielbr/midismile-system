import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Login' };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl">Admin Login</h1>
        <p className="mt-2 text-sm text-dim">
          Supabase Auth sign-in form — implemented in Sprint 5.
        </p>
      </div>
    </div>
  );
}
