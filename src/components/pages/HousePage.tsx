import Image from 'next/image';
import { Button, Card, InfoRow, Quote, Rule, SectionHeading } from '@/components/ds';
import { Hero } from '@/components/site/Hero';
import { MultilineText } from '@/components/site/MultilineText';
import { Section } from '@/components/site/Section';
import { getReviews } from '@/lib/db/menu';
import { ADDRESS_LINES, HOUSE } from '@/lib/house';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

export async function HousePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.house;
  const [featured] = await getReviews(1);

  return (
    <>
      <Hero
        src="/images/kueche.jpg" alt={t.hero.imageAlt}
        eyebrow={t.hero.eyebrow} title={t.hero.title} sub={t.hero.sub}
        height={520} priority
      />

      <Section>
        <div className="lr-split lr-split--top">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
            <SectionHeading eyebrow={t.story.eyebrow} title={t.story.title} />
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>{t.story.body1}</p>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>{t.story.body2}</p>
          </div>
          <div className="lr-media" style={{ aspectRatio: '4 / 3' }}>
            <Image
              src="/images/gastraum.jpg" alt={t.story.imageAlt} fill
              sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </Section>

      <Section tone="card">
        <div className="lr-grid-3">
          {(['kitchen', 'produce', 'evening'] as const).map((key) => (
            <Card key={key} variant="plain" eyebrow={t.principles[key].eyebrow} title={t.principles[key].title}>
              {t.principles[key].body}
            </Card>
          ))}
        </div>
      </Section>

      {featured && (
        <Section tone="inverse">
          <Quote tone="inverse" align="center" attribution={featured.author} source={featured.source}>
            <span lang="en">{`“${featured.quote}”`}</span>
          </Quote>
        </Section>
      )}

      <Section id="kontakt">
        <div className="lr-split lr-split--top">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
            <div>
              <InfoRow icon="map-pin" label={t.contact.address}>
                {ADDRESS_LINES[0]}<br />{ADDRESS_LINES[1]}
              </InfoRow>
              <Rule />
              <InfoRow icon="clock" label={t.contact.hours}>
                <MultilineText>{t.contact.hoursValue}</MultilineText>
              </InfoRow>
              <Rule />
              <InfoRow icon="phone" label={t.contact.phone}>
                <a href={`tel:${HOUSE.phoneHref}`}>{HOUSE.phone}</a>
              </InfoRow>
              <Rule />
              <InfoRow icon="mail" label={t.contact.email}>
                <a href={`mailto:${HOUSE.email}`}>{HOUSE.email}</a>
              </InfoRow>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
              <Button href={pathFor('reserve', locale)}>{t.contact.cta}</Button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
            <div
              className="lr-media"
              style={{ aspectRatio: '4 / 3', border: '1px solid var(--border-hairline)' }}
            >
              <iframe
                title={t.contact.directions}
                src="https://www.openstreetmap.org/export/embed.html?bbox=0.0035%2C38.8065%2C0.0235%2C38.8185&layer=mapnik&marker=38.8125%2C0.0135"
                style={{ width: '100%', height: '100%', border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={HOUSE.mapsUrl} target="_blank" rel="noreferrer noopener" style={{ font: 'var(--type-body-sm)' }}>
              {t.contact.directions}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
