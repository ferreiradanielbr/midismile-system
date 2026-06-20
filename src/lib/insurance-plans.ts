export interface InsurancePlan {
  name: string;
  /** Path under /images/insurance/, or null when no logo asset exists yet. */
  logo: string | null;
}

export const insurancePlans: readonly InsurancePlan[] = [
  { name: 'Humana', logo: '/images/insurance/humana.avif' },
  { name: 'Aetna', logo: '/images/insurance/aetna.avif' },
  { name: 'Delta Dental', logo: null },
  { name: 'Ameritas', logo: '/images/insurance/ameritas.avif' },
  { name: 'United Concordia', logo: '/images/insurance/united-concordia.avif' },
  { name: 'GEHA', logo: '/images/insurance/geha.avif' },
  { name: 'MetLife', logo: '/images/insurance/metlife.avif' },
  { name: 'Blue Cross Blue Shield', logo: '/images/insurance/blue-cross-blue-shield.avif' },
] as const;
