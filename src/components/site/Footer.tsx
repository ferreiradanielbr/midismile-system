import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';

const WHATSAPP_URL = 'https://wa.me/16893103396';

// Must match the `id` of each service section in ServicesSections.tsx —
// these are real anchors, not aspirational ones.
const serviceLinks = [
  { href: '/services#dental-implants', label: 'Dental Implants' },
  { href: '/services#orthodontics', label: 'Orthodontics' },
  { href: '/services#suresmile', label: 'SureSmile Aligners' },
  { href: '/services#teeth-whitening', label: 'Teeth Whitening' },
  { href: '/services#dental-cleaning', label: 'Dental Cleaning' },
  { href: '/services#crowns-bridges', label: 'Crowns & Bridges' },
  { href: '/services#endodontics', label: 'Endodontics' },
  { href: '/services#orofacial-harmonization', label: 'Botox & Facial Fillers' },
];

const quickLinks = [
  { href: '/about', label: 'About' },
  { href: '/insurance', label: 'Insurance' },
  { href: '/first-visit', label: 'First Visit' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
];

/**
 * Site footer — Server Component.
 * 4-column layout: Brand · Services · Locations · Quick Links
 * Spec: design-system/medismile/MASTER.md
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-dark">
      <div className="mx-auto max-w-container px-6 py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="MediSmile home">
              <Image
                src="/images/brand/logo.png"
                alt="MediSmile Group"
                width={209}
                height={112}
                className="h-11 w-auto object-contain"
              />
            </Link>

            <p className="font-body text-base leading-relaxed text-white-faded">
              The smile you deserve. The care you trust.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/medismilegroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MediSmile on Instagram"
                className="text-white-faded transition-colors hover:text-accent"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com/medismilegroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MediSmile on Facebook"
                className="text-white-faded transition-colors hover:text-accent"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            {/* Portuguese badge */}
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white-border bg-white-subtle px-3 py-1 font-ui text-[12px] font-semibold text-white-faded">
              🇧🇷 Atendimento em Português
            </span>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5" role="list">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-[15px] text-white-faded transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Locations */}
          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-white">
              Locations
            </h3>

            <div className="mt-4 flex flex-col gap-6">
              <address className="not-italic">
                <p className="font-ui text-sm font-semibold text-white">Winter Springs</p>
                <p className="mt-1 font-body text-[14px] leading-relaxed text-white-faded">
                  411 E State Rd 434 Suite D<br />
                  Winter Springs, FL 32708
                </p>
                <a
                  href="tel:+16892134161"
                  className="mt-1 block font-body text-[14px] text-accent hover:text-accent-light"
                >
                  (689) 213-4161
                </a>
              </address>

              <address className="not-italic">
                <p className="font-ui text-sm font-semibold text-white">Ocoee</p>
                <p className="mt-1 font-body text-[14px] leading-relaxed text-white-faded">
                  10131 W Colonial Drive Suite 3<br />
                  Ocoee, FL 34761
                </p>
                <a
                  href="tel:+16893103396"
                  className="mt-1 block font-body text-[14px] text-accent hover:text-accent-light"
                >
                  (689) 310-3396
                </a>
              </address>

              <p className="font-ui text-[13px] text-white-muted">Mon–Fri 10AM–6PM</p>
            </div>
          </div>

          {/* Column 4 — Quick Links + WhatsApp CTA */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5" role="list">
                {quickLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-body text-[15px] text-white-faded transition-colors hover:text-accent"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'whatsapp', size: 'lg' })}
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white-border pt-8 sm:flex-row">
          <p className="font-body text-[13px] text-white-muted">
            &copy; {year} MediSmile Group. All rights reserved.
          </p>
          <p className="font-body text-[13px] text-white-muted">
            Designed with care in Orlando, FL
          </p>
        </div>
      </div>
    </footer>
  );
}
