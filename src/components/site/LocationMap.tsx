import Image from 'next/image';
import { HOUSE } from '@/lib/house';

/**
 * A still map instead of an embedded one. It always renders, costs one small
 * image rather than a third-party frame with its own scripts and chrome, and
 * no visitor data leaves for another server. Getting there is what the link
 * is for. The picture is centred on HOUSE.geo, so the marker sits at the
 * middle of the frame by construction — rebuild it with scripts/build-map.mjs
 * if the address ever changes.
 */
export function LocationMap({ label, alt }: { label: string; alt: string }) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      <a
        href={HOUSE.mapsUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={label}
        style={{ border: 0, display: 'block' }}
      >
        <span
          className="lr-media"
          style={{
            display: 'block', aspectRatio: '4 / 3',
            border: '1px solid var(--border-hairline)', position: 'relative',
          }}
        >
          <Image
            src="/images/lage.jpg"
            alt={alt}
            fill
            sizes="(max-width: 900px) 100vw, 560px"
            style={{ objectFit: 'cover' }}
          />
          <span aria-hidden="true" className="lr-map-pin" />
        </span>
      </a>

      <figcaption style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 'var(--space-16)', flexWrap: 'wrap',
      }}>
        <a href={HOUSE.mapsUrl} target="_blank" rel="noreferrer noopener" style={{ font: 'var(--type-body-sm)' }}>
          {label}
        </a>
        <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>
          Kartendaten ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer noopener"
            style={{ color: 'inherit' }}
          >
            OpenStreetMap
          </a>
          {' '}Mitwirkende
        </span>
      </figcaption>
    </figure>
  );
}
