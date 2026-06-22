import Image from 'next/image';
import { insurancePlans } from '@/lib/insurance-plans';

/**
 * Continuous right-to-left logo ticker. Pure CSS (no client JS): the
 * track is duplicated once and animated -50%, so the loop is seamless.
 * Edges fade via mask-image; pauses on hover; respects
 * prefers-reduced-motion globally (see globals.css).
 */
export function InsuranceMarquee() {
  const track = [...insurancePlans, ...insurancePlans];

  return (
    <div
      className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="list"
      aria-label="Accepted insurance plans"
    >
      <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
        {track.map((plan, i) => (
          <div
            key={`${plan.name}-${i}`}
            role="listitem"
            aria-hidden={i >= insurancePlans.length}
            className="flex h-14 shrink-0 items-center justify-center rounded-lg border border-mist bg-pearl px-5 grayscale transition-all duration-base hover:grayscale-0"
          >
            {plan.logo ? (
              <Image
                src={plan.logo}
                alt={plan.name}
                width={160}
                height={60}
                className="h-6 w-auto object-contain"
              />
            ) : (
              <span className="font-ui text-sm font-semibold text-dim hover:text-primary">
                {plan.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
