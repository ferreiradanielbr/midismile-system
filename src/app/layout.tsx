import type { Metadata, Viewport } from 'next';
import { DM_Sans, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MediSmile Group — Premium Dental Care in Orlando, FL',
    template: '%s | MediSmile Group',
  },
  description:
    'Premium dental care in Orlando, Florida. Implants, orthodontics, whitening and more across two locations — Winter Springs and Ocoee.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MediSmile Group',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B4F6C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
