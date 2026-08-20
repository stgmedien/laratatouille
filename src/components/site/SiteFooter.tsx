import Link from 'next/link';
import { InfoRow, Logo, Rule, Wordmark } from '@/components/ds';
import { ADDRESS_LINES, HOUSE } from '@/lib/house';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { MultilineText } from './MultilineText';

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="lr-no-print"
      style={{
        background: 'var(--surface-inverse)',
        color: 'var(--text-on-inverse)',
        padding: 'var(--space-72) 0 var(--space-40)',
      }}
    >
      <div className="lr-container lr-footer-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)', alignItems: 'flex-start' }}>
          <Logo size={56} tone="inverse" />
          <Wordmark size={22} tone="inverse" subtitle={HOUSE.tagline} />
          <p style={{ font: 'var(--type-body)', color: 'var(--text-on-inverse-muted)', margin: 0, maxWidth: '34ch' }}>
            {dict.footer.blurb}
          </p>
        </div>

        <div>
          <InfoRow icon="clock" label={dict.footer.hours} tone="inverse">
            <MultilineText>{dict.footer.hoursValue}</MultilineText>
          </InfoRow>
          <InfoRow icon="map-pin" label={dict.footer.address} tone="inverse">
            <a
              href={HOUSE.mapsUrl} target="_blank" rel="noreferrer noopener"
              style={{ color: 'inherit', borderColor: 'color-mix(in oklab, var(--linen-100) 35%, transparent)' }}
            >
              {ADDRESS_LINES[0]}<br />{ADDRESS_LINES[1]}
            </a>
          </InfoRow>
        </div>

        <div>
          <InfoRow icon="phone" label={dict.footer.reservations} tone="inverse">
            <a href={`tel:${HOUSE.phoneHref}`} style={{ color: 'inherit', borderColor: 'color-mix(in oklab, var(--linen-100) 35%, transparent)' }}>
              {HOUSE.phone}
            </a>
          </InfoRow>
          <InfoRow icon="mail" label={dict.footer.email} tone="inverse">
            <a href={`mailto:${HOUSE.email}`} style={{ color: 'inherit', borderColor: 'color-mix(in oklab, var(--linen-100) 35%, transparent)' }}>
              {HOUSE.email}
            </a>
          </InfoRow>
        </div>
      </div>

      <div className="lr-container" style={{ marginTop: 'var(--space-40)' }}>
        <Rule tone="inverse" />
        <div className="lr-footer-bottom" style={{ color: 'var(--text-on-inverse-muted)' }}>
          <span>© {year} {HOUSE.name}, {HOUSE.city}. {dict.footer.rights}</span>
          <span style={{ display: 'flex', gap: 'var(--space-24)' }}>
            <Link href={pathFor('legal', locale)} style={{ color: 'var(--pine-200)', borderColor: 'transparent' }}>
              {dict.footer.legal}
            </Link>
            <Link href={pathFor('privacy', locale)} style={{ color: 'var(--pine-200)', borderColor: 'transparent' }}>
              {dict.footer.privacy}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
