import Image from 'next/image';
import { HOUSE } from '@/lib/house';

const RATIO = 263 / 900; // Seitenverhältnis der Logodatei

/**
 * The house logo. Two files: the original for light ground, and a version
 * recoloured to linen and sage for the pine header and footer, where the dark
 * brown wordmark would disappear.
 */
export function Brand({ tone = 'default', width = 168, priority = false, className = 'lr-brand' }: {
  tone?: 'default' | 'inverse';
  /** Größte Darstellung; die tatsächliche Breite steuert die Klasse. */
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      <Image
        src={tone === 'inverse' ? '/images/logo-hell.png' : '/images/logo.png'}
        alt={HOUSE.name}
        width={width}
        height={Math.round(width * RATIO)}
        priority={priority}
        sizes="(max-width: 640px) 40vw, 240px"
      />
    </span>
  );
}

/**
 * Both versions stacked, cross-fading. The header sits transparently over the
 * hero and gains a background on scroll; swapping the file at that moment
 * would flash, so both are in the page and only their opacity changes.
 */
export function BrandSwitch({ inverse }: { inverse: boolean }) {
  return (
    <span className="lr-brand" style={{ position: 'relative' }}>
      {/* Die helle Fassung liegt über der dunklen; sichtbar ist immer genau
          eine. Das vermeidet ein Aufblitzen beim Wechsel während des Scrollens. */}
      <Brand tone="default" priority className="" />
      <span
        aria-hidden={!inverse}
        style={{
          position: 'absolute', inset: 0,
          opacity: inverse ? 1 : 0,
          transition: 'opacity var(--dur-base) var(--ease-standard)',
        }}
      >
        <Brand tone="inverse" priority className="" />
      </span>
    </span>
  );
}
