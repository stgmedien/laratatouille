import { InfoRow, Rule, SectionHeading } from '@/components/ds';
import { MultilineText } from '@/components/site/MultilineText';
import { ReservationForm } from '@/components/site/ReservationForm';
import { Section } from '@/components/site/Section';
import { HOUSE } from '@/lib/house';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

export function ReservePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.reserve;

  return (
    <>
      <Section tone="card" tight>
        <SectionHeading as="h1" align="center" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      </Section>

      <Section>
        <div className="lr-split lr-split--wide-left lr-split--top">
          <ReservationForm
            locale={locale}
            strings={dict.reserve}
            privacyHref={pathFor('privacy', locale)}
            privacyLabel={dict.footer.privacy}
          />

          <aside style={{
            background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)',
            padding: 'var(--space-32)',
          }}>
            <h2 style={{
              font: 'var(--type-subhead)', color: 'var(--text-heading)',
              margin: '0 0 var(--space-16)',
            }}>{t.aside.title}</h2>
            <InfoRow icon="clock" label={t.aside.hours.label}>
              <MultilineText>{t.aside.hours.value}</MultilineText>
            </InfoRow>
            <Rule />
            <InfoRow icon="calendar" label={t.aside.closed.label}>{t.aside.closed.value}</InfoRow>
            <Rule />
            <InfoRow icon="hourglass" label={t.aside.booking.label}>{t.aside.booking.value}</InfoRow>
            <Rule />
            <InfoRow icon="users" label={t.aside.languages.label}>{t.aside.languages.value}</InfoRow>
            <Rule />
            <InfoRow icon="phone" label={t.aside.phoneLabel}>
              <a href={`tel:${HOUSE.phoneHref}`}>{HOUSE.phone}</a>
            </InfoRow>
          </aside>
        </div>
      </Section>
    </>
  );
}
