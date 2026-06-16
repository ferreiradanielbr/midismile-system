'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/insurance', label: 'Insurance' },
  { href: '/first-visit', label: 'First Visit' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

const WHATSAPP_URL = 'https://wa.me/16893103396';

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed inset-x-0 top-0 z-[40] h-[72px] transition-shadow duration-base',
        'border-b bg-white/[0.92] backdrop-blur-[12px]',
        'border-primary/[0.08]',
        scrolled && 'shadow-md',
      )}
    >
      <div className="mx-auto flex h-full max-w-container items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="MediSmile home">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary"
            aria-hidden="true"
          >
            <span className="font-display text-lg font-bold text-white">M</span>
          </div>
          <span className="font-display text-xl font-bold text-midnight">MediSmile</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'font-ui text-[15px] transition-colors duration-fast',
                  pathname === href
                    ? 'font-semibold text-primary'
                    : 'text-body hover:text-primary',
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className={buttonVariants({ variant: 'primary', size: 'sm' })}
          >
            Schedule Free Consult
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'whatsapp', size: 'sm' })}
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-body transition-colors hover:bg-soft md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-[72px] border-b border-mist bg-white/[0.97] backdrop-blur-[12px] md:hidden">
          <div className="mx-auto max-w-container px-6 py-4">
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-2.5 font-ui text-[15px] transition-colors',
                      pathname === href
                        ? 'bg-soft font-semibold text-primary'
                        : 'text-body hover:bg-soft hover:text-primary',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3 border-t border-mist pt-4">
              <Link
                href="/contact"
                className={buttonVariants({ variant: 'primary', size: 'md' })}
              >
                Schedule Free Consult
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'whatsapp', size: 'md' })}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
