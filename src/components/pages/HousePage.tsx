import Image from 'next/image';
import { Button, Card, InfoRow, Quote, Rule, SectionHeading } from '@/components/ds';
import { Hero } from '@/components/site/Hero';
import { MultilineText } from '@/components/site/MultilineText';
import { Hosts } from '@/components/site/Hosts';
import { LocationMap } from '@/components/site/LocationMap';
import { Section } from '@/components/site/Section';
import { getReviews } from '@/lib/db/menu';
import { ADDRESS_LINES, HOUSE } from '@/lib/house';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

export async function HousePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.house;
  const [featured] = await getReviews(locale, 1);

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
        <SectionHeading
          align="center" eyebrow={t.hosts.eyebrow} title={t.hosts.title} intro={t.hosts.intro}
          style={{ marginBottom: 'var(--space-56)' }}
        />
        <Hosts strings={t.hosts} />
      </Section>

      <Section>
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
          <Quote
            tone="inverse" align="center"
            attribution={featured.author}
            source={featured.translated ? `${featured.source} · ${dict.home.reviews.translated}` : featured.source}
          >
            <span lang={featured.lang}>{`“${featured.quote}”`}</span>
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

          <LocationMap label={t.contact.directions} alt={t.contact.mapAlt} />
        </div>
      </Section>
    </>
  );
}
