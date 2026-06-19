import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Skip link — first focusable element, appears on keyboard focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-ui focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Nav />
      <main id="main-content" className="pt-[72px]">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
