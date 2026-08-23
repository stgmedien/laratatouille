import Image from 'next/image';
import { MenuItem, Notice, Rule, SectionHeading, Tag } from '@/components/ds';
import { MenuPrint } from '@/components/site/MenuPrint';
import { PrintButton } from '@/components/site/PrintButton';
import { Section } from '@/components/site/Section';
import { getMenu, getMenuSettings } from '@/lib/db/menu';
import { DISH_TAGS, type DishTag } from '@/lib/db/types';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { tagsFor } from './tags';

export async function MenuPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [categories, settings] = await Promise.all([getMenu(locale), getMenuSettings(locale)]);
  const t = dict.menu;

  // The legend only earns its place if the menu actually carries those marks.
  const usedTags = DISH_TAGS.filter((tag) =>
    categories.some((c) => c.dishes.some((d) => d.tags.includes(tag))),
  );

  return (
    <>
      <MenuPrint categories={categories} dict={dict} />

      <Section tone="card" tight>
        <SectionHeading
          as="h1" align="center"
          eyebrow={settings.eyebrow || t.eyebrow}
          title={settings.title || t.title}
          intro={settings.intro || t.intro}
        />
      </Section>

      <div style={{ background: 'var(--surface-raised)' }}>
        <div className="lr-container">
          <div className="lr-media lr-no-print" style={{ aspectRatio: '21 / 9', borderRadius: 'var(--radius-lg)' }}>
            <Image
              src="/images/lachs.jpg" alt={t.imageAlt} fill
              sizes="(max-width: 1200px) 100vw, 1200px" priority
              // Der Teller sitzt in der unteren Bildhälfte; mittig beschnitten
              // würde das schmale Band ihn anschneiden.
              style={{ objectFit: 'cover', objectPosition: 'center 58%' }}
            />
          </div>
        </div>
      </div>

      <Section>
        {categories.length === 0 ? (
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--text-muted)', textAlign: 'center' }}>{t.empty}</p>
        ) : (
          <>
            {/* Sprungmarken zu den Kategorien — funktioniert auch ohne JavaScript. */}
            <nav
              aria-label={settings.title || t.title}
              className="lr-tabs-scroll lr-no-print"
              style={{
                display: 'flex', gap: 'var(--space-32)', justifyContent: 'flex-start',
                borderBottom: '1px solid var(--border-hairline)', marginBottom: 'var(--space-40)',
                maxWidth: 820, marginInline: 'auto',
              }}
            >
              {categories.map((c) => (
                <a
                  key={c.id} href={`#kategorie-${c.id}`}
                  style={{
                    border: 0, paddingBottom: 'var(--space-12)', whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)',
                    fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--ls-caps)',
                    textTransform: 'uppercase', color: 'var(--text-faint)',
                  }}
                >
                  {c.name}
                </a>
              ))}
            </nav>

            <div className="lr-menu-column">
              {categories.map((c, i) => (
                <section
                  key={c.id} id={`kategorie-${c.id}`}
                  style={{ scrollMarginTop: 110, marginTop: i === 0 ? 0 : 'var(--space-56)' }}
                >
                  <h2 style={{
                    font: 'var(--type-section)', color: 'var(--text-heading)',
                    margin: '0 0 var(--space-16)',
                  }}>{c.name}</h2>
                  <Rule variant="short" style={{ marginBottom: c.intro ? 'var(--space-16)' : 'var(--space-24)' }} />
                  {c.intro && (
                    <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: '0 0 var(--space-16)' }}>
                      {c.intro}
                    </p>
                  )}
                  {c.dishes.length === 0 ? (
                    <p style={{ font: 'var(--type-body)', color: 'var(--text-faint)', margin: 0 }}>{t.emptyCategory}</p>
                  ) : (
                    c.dishes.map((d) => (
                      <MenuItem
                        key={d.id} name={d.name} price={d.price} description={d.description}
                        origin={d.origin} tags={tagsFor(d.tags, dict)}
                      />
                    ))
                  )}
                </section>
              ))}
            </div>

            <div className="lr-menu-column" style={{
              marginTop: 'var(--space-40)', display: 'flex',
              flexDirection: 'column', gap: 'var(--space-20)',
            }}>
              <Notice tone="info">{t.allergens}</Notice>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
                {usedTags.map((tag) => (
                  <Tag key={tag} tone={tag === 'signature' ? 'gold' : 'sage'}>{dict.tags[tag as DishTag]}</Tag>
                ))}
                {usedTags.length > 0 && (
                  <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{t.legend}</span>
                )}
                <span className="lr-no-print" style={{ marginLeft: 'auto' }}>
                  <PrintButton label={t.print} />
                </span>
              </div>
            </div>
          </>
        )}
      </Section>

    </>
  );
}
