import { SITE_URL } from '@/lib/constants';

const dentist = {
  '@type': 'Person',
  name: 'Dr. Nelson Marques',
  jobTitle: 'Dentist',
} as const;

const locations = [
  {
    '@type': 'Dentist',
    name: 'MediSmile Group — Winter Springs',
    telephone: '+16892134161',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '411 E State Rd 434 Suite D',
      addressLocality: 'Winter Springs',
      addressRegion: 'FL',
      postalCode: '32708',
      addressCountry: 'US',
    },
  },
  {
    '@type': 'Dentist',
    name: 'MediSmile Group — Ocoee',
    telephone: '+16893103396',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10131 W Colonial Drive Suite 3',
      addressLocality: 'Ocoee',
      addressRegion: 'FL',
      postalCode: '34761',
      addressCountry: 'US',
    },
  },
] as const;

const structuredData = locations.map((location) => ({
  '@context': 'https://schema.org',
  ...location,
  url: SITE_URL,
  openingHours: 'Mo-Fr 10:00-18:00',
  employee: dentist,
  medicalSpecialty: ['Dentistry', 'Orofacial harmonization'],
}));

/** Schema.org Dentist/MedicalBusiness JSON-LD for both clinic locations. */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
