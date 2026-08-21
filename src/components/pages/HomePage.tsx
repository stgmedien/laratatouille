import Image from 'next/image';
import { Button, InfoRow, MenuItem, Rule, SectionHeading } from '@/components/ds';
import { Hero } from '@/components/site/Hero';
import { MultilineText } from '@/components/site/MultilineText';
import { ReviewGrid } from '@/components/site/Reviews';
import { Section } from '@/components/site/Section';
import { getHighlights, getReviews } from '@/lib/db/menu';
import { HOUSE } from '@/lib/house';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { tagsFor } from './tags';

export async function HomePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [highlights, reviews] = await Promise.all([getHighlights(locale, 4), getReviews(locale, 3)]);
  const t = dict.home;

  return (
    <>
      <Hero
        src="/images/hero.jpg"
        alt={t.hero.imageAlt}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        sub={t.hero.sub}
        priority
        height={680}
        actions={
          <>
            <Button size="lg" variant="inverse" href={pathFor('reserve', locale)}>{t.hero.primary}</Button>
            <Button size="lg" variant="inverse-outline" href={pathFor('menu', locale)}>{t.hero.secondary}</Button>
          </>
        }
      />

      {/* Das Haus */}
      <Section>
        <div className="lr-split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            <SectionHeading eyebrow={t.house.eyebrow} title={t.house.title} intro={t.house.intro} />
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>{t.house.body}</p>
            <div><Button variant="secondary" href={pathFor('house', locale)}>{t.house.cta}</Button></div>
          </div>
          <div className="lr-media" style={{ aspectRatio: '4 / 3' }}>
            <Image
              src="/images/kueche.jpg" alt={t.house.imageAlt} fill
              sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </Section>

      {/* Auszug aus der Karte */}
      <Section tone="card">
        <SectionHeading
          align="center" eyebrow={t.menu.eyebrow} title={t.menu.title} intro={t.menu.intro}
          style={{ marginBottom: 'var(--space-40)' }}
        />
        {highlights.length > 0 ? (
          <>
            <div className="lr-grid-2">
              {highlights.map((d) => (
                <MenuItem
                  key={d.id} name={d.name} price={d.price}
                  description={d.description} origin={d.origin} tags={tagsFor(d.tags, dict)}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-40)' }}>
              <Button href={pathFor('menu', locale)}>{t.menu.cta}</Button>
            </div>
          </>
        ) : (
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: '0 auto', textAlign: 'center' }}>
            {t.menu.empty}
          </p>
        )}
      </Section>

      {/* Gästestimmen */}
      {reviews.length > 0 && (
        <Section tone="sunken">
          <SectionHeading
            align="center" eyebrow={t.reviews.eyebrow} title={t.reviews.title} intro={t.reviews.intro}
            style={{ marginBottom: 'var(--space-56)' }}
          />
          <ReviewGrid reviews={reviews} translatedLabel={t.reviews.translated} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-40)' }}>
            <a href={HOUSE.reviewsUrl} target="_blank" rel="noreferrer noopener" style={{ font: 'var(--type-body-sm)' }}>
              {t.reviews.cta}
            </a>
          </div>
        </Section>
      )}

      {/* Öffnungszeiten und Reservierung */}
      <Section tone="inverse">
        <div className="lr-split lr-split--top">
          <SectionHeading tone="inverse" eyebrow={t.info.eyebrow} title={t.info.title} />
          <div>
            <InfoRow icon="clock" label={t.info.rows.kitchen.label} tone="inverse">
              <MultilineText>{t.info.rows.kitchen.value}</MultilineText>
            </InfoRow>
            <Rule tone="inverse" />
            <InfoRow icon="calendar" label={t.info.rows.closed.label} tone="inverse">
              {t.info.rows.closed.value}
            </InfoRow>
            <Rule tone="inverse" />
            <InfoRow icon="utensils" label={t.info.rows.booking.label} tone="inverse">
              {t.info.rows.booking.value}
            </InfoRow>
            <Rule tone="inverse" />
            <InfoRow icon="users" label={t.info.rows.languages.label} tone="inverse">
              {t.info.rows.languages.value}
            </InfoRow>
          </div>
        </div>
      </Section>

      {/* Reservierung */}
      <Section>
        <div className="lr-split">
          <div className="lr-media lr-order-first" style={{ aspectRatio: '3 / 2' }}>
            <Image
              src="/images/rinderfilet.jpg" alt={t.reserve.imageAlt} fill
              sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            <SectionHeading eyebrow={t.reserve.eyebrow} title={t.reserve.title} />
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>{t.reserve.body}</p>
            <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
              <Button href={pathFor('reserve', locale)}>{t.reserve.cta}</Button>
              <Button variant="secondary" href={`tel:${HOUSE.phoneHref}`}>{HOUSE.phone}</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
