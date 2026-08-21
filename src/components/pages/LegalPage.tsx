import { Rule, SectionHeading } from '@/components/ds';
import { Section } from '@/components/site/Section';
import { ADDRESS_LINES, HOUSE } from '@/lib/house';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

function Address({ withTaxId = false }: { withTaxId?: boolean }) {
  return (
    <address>
      {HOUSE.legalName}<br />
      {ADDRESS_LINES[0]}<br />
      {ADDRESS_LINES[1]}, {HOUSE.countryName}<br />
      {withTaxId && <>CIF: {HOUSE.taxId}<br /></>}
      <a href={`tel:${HOUSE.phoneHref}`}>{HOUSE.phone}</a><br />
      <a href={`mailto:${HOUSE.email}`}>{HOUSE.email}</a>
    </address>
  );
}

export function LegalPage({ dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.legal;
  return (
    <Section narrow>
      <SectionHeading as="h1" title={t.title} intro={t.intro} />
      <div className="lr-prose" style={{ marginTop: 'var(--space-40)' }}>
        <h2>{t.operatorHeading}</h2>
        <Address withTaxId />

        <h2>{t.responsibleHeading}</h2>
        <Address />

        <Rule style={{ margin: 'var(--space-40) 0' }} />

        <h2>{t.disputeHeading}</h2>
        <p>{t.disputeBody}</p>

        <h2>{t.liabilityHeading}</h2>
        <p>{t.liabilityBody}</p>

        <h2>{t.imagesHeading}</h2>
        <p>{t.imagesBody}</p>
      </div>
    </Section>
  );
}

export function PrivacyPage({ dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.privacy;
  return (
    <Section narrow>
      <SectionHeading as="h1" title={t.title} intro={t.intro} />
      <div className="lr-prose" style={{ marginTop: 'var(--space-40)' }}>
        <h2>{t.controllerHeading}</h2>
        <Address />

        <h2>{t.reservationHeading}</h2>
        <p>{t.reservationBody}</p>

        <h2>{t.hostingHeading}</h2>
        <p>{t.hostingBody}</p>

        <h2>{t.cookiesHeading}</h2>
        <p>{t.cookiesBody}</p>

        <h2>{t.fontsHeading}</h2>
        <p>{t.fontsBody}</p>

        <h2>{t.rightsHeading}</h2>
        <p>{t.rightsBody}</p>
      </div>
    </Section>
  );
}
