import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'About Us | MediSmile Group',
  description:
    'Meet Dr. Nelson Marques and the MediSmile team. 30+ years of precision dentistry in Orlando, FL.',
};

const credentials = [
  'University of Florida',
  'MARC Institute Miami',
  'Implant Specialist',
  'Orofacial Harmonization',
  'Bilingual EN/PT',
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
                Meet your doctor
              </p>
              <h1 className="font-display text-5xl font-bold text-white">
                Dr. Nelson Marques
              </h1>
              <p className="font-body text-lg leading-relaxed text-white-faded">
                Board-certified with over three decades of experience in implant
                dentistry and orofacial harmonization. Trained at the University
                of Florida and MARC Institute Miami — bringing world-class
                expertise to Orlando&apos;s diverse community.
              </p>
              <div className="flex flex-wrap gap-2">
                {credentials.map((cred) => (
                  <Badge key={cred} variant="white" size="sm">
                    {cred}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image placeholder */}
            <div
              className="h-[400px] w-full rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              }}
              role="img"
              aria-label="Photo of Dr. Nelson Marques — Sprint 3"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-pearl py-20">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-ui text-sm font-semibold uppercase tracking-wider text-accent">
              Our mission
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-midnight">
              Excellence, compassion, and community
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-dim">
              MediSmile Group was founded on the belief that exceptional dental
              care should be accessible to every family. With bilingual staff
              fluent in English and Portuguese, we proudly serve Orlando&apos;s
              diverse community — making world-class dentistry feel comfortable,
              familiar, and personal.
            </p>
          </div>

          <p className="mt-16 text-center font-body text-sm text-dim">
            Full team profiles and clinic story built in Sprint 3.
          </p>
        </div>
      </section>
    </>
  );
}
