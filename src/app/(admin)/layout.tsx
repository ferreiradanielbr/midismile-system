/**
 * Admin layout. Sprint 5 builds the dark sidebar + light content area and
 * wires Supabase Auth. Route protection lives in src/middleware.ts.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-soft">
      {/* TODO(Sprint 5): <AdminSidebar /> */}
      <div className="p-8">{children}</div>
    </div>
  );
}
