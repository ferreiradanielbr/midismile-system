'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const credentials = [
  'University of Florida',
  'MARC Institute Miami',
  'Implant Specialist',
  'Orofacial Harmonization',
  'Bilingual EN/PT',
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export function DoctorSection() {
  return (
    <section className="section-dark">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
        {/* Left — staggered text reveal on scroll */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            variants={fadeUp}
            className="font-ui text-sm font-semibold uppercase tracking-wider text-accent"
          >
            Meet your doctor
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-bold text-white"
          >
            Dr. Nelson Marques
            <br />
            <em className="italic text-accent">30 years</em> of precision care
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-body text-lg leading-relaxed text-white-faded"
          >
            Board-certified with over three decades of experience in implant
            dentistry and orofacial harmonization. Trained at the University of
            Florida and MARC Institute Miami — bringing world-class expertise to
            Orlando.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {credentials.map((cred) => (
              <Badge key={cred} variant="white" size="sm">
                {cred}
              </Badge>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="pt-2">
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: 'accent', size: 'lg' }))}
            >
              Meet Dr. Marques
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — Dr. Nelson photo */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="relative h-[440px] w-full overflow-hidden rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
          }}
        >
          <Image
            src="/images/team/dr-nelson.png"
            alt="Dr. Nelson Marques — MediSmile Group"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
