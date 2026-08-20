'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, IconButton, Wordmark } from '@/components/ds';
import { HOUSE } from '@/lib/house';
import { localeNames, locales, pathFor, type Locale, type PageKey } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/** Only the strings the header renders — the whole dictionary would otherwise
 * be serialised into every page's payload. */
export type HeaderStrings = Dictionary['nav'] & { siteName: string };

interface Props {
  locale: Locale;
  strings: HeaderStrings;
  /** Pages that open with a full-bleed hero start with a transparent header. */
  overHero: boolean;
  activePage: PageKey;
}

const LINKS: { page: PageKey; key: 'menu' | 'house' | 'reserve' }[] = [
  { page: 'menu', key: 'menu' },
  { page: 'house', key: 'house' },
  { page: 'reserve', key: 'reserve' },
];

export function SiteHeader({ locale, strings, overHero, activePage }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overHero]);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const dark = overHero && !scrolled;

  return (
    <>
      <header
        className="lr-header"
        style={{
          background: dark ? 'transparent' : 'var(--veil-light)',
          backdropFilter: dark ? 'none' : 'var(--blur-veil)',
          WebkitBackdropFilter: dark ? 'none' : 'var(--blur-veil)',
          borderBottom: `1px solid ${dark ? 'var(--border-inverse)' : 'var(--border-hairline)'}`,
        }}
      >
        <div className="lr-container lr-header__inner">
          <Link href={pathFor('home', locale)} aria-label={strings.siteName} style={{ border: 'none', display: 'flex' }}>
            <Wordmark size={20} tone={dark ? 'inverse' : 'default'} showSubtitle={false} />
          </Link>

          <nav className="lr-nav lr-nav--desktop lr-no-print" aria-label={strings.siteName}>
            {LINKS.map(({ page, key }) => {
              const active = page === activePage;
              return (
                <Link
                  key={page}
                  href={pathFor(page, locale)}
                  className="lr-nav__link"
                  aria-current={active ? 'page' : undefined}
                  style={{
                    color: dark
                      ? (active ? 'var(--linen-050)' : 'var(--pine-200)')
                      : (active ? 'var(--text-heading)' : 'var(--text-muted)'),
                    borderBottomColor: active ? (dark ? 'var(--linen-050)' : 'var(--pine-600)') : 'transparent',
                  }}
                >
                  {strings[key]}
                </Link>
              );
            })}

            <LanguageSwitcher locale={locale} dark={dark} label={strings.language} activePage={activePage} />

            <Button size="sm" variant={dark ? 'inverse' : 'primary'} href={pathFor('reserve', locale)}>
              {strings.cta}
            </Button>
            <IconButton
              name="phone" label={strings.call} size="sm"
              variant={dark ? 'inverse' : 'ghost'} href={`tel:${HOUSE.phoneHref}`}
            />
          </nav>

          <div className="lr-nav lr-nav--mobile-toggle lr-no-print" style={{ gap: 'var(--space-4)' }}>
            <IconButton
              name="phone" label={strings.call} size="sm"
              variant={dark ? 'inverse' : 'ghost'} href={`tel:${HOUSE.phoneHref}`}
            />
            <IconButton
              name="menu" label={strings.open} size="md"
              variant={dark ? 'inverse' : 'ghost'}
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-controls="lr-drawer"
            />
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="lr-drawer" id="lr-drawer" role="dialog" aria-modal="true">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44 }}>
            <Wordmark size={20} showSubtitle={false} />
            <IconButton name="x" label={strings.close} onClick={() => setDrawerOpen(false)} />
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', marginTop: 'var(--space-32)' }}>
            <DrawerLink href={pathFor('home', locale)} label={strings.home} active={activePage === 'home'} />
            {LINKS.map(({ page, key }) => (
              <DrawerLink key={page} href={pathFor(page, locale)} label={strings[key]} active={page === activePage} />
            ))}
          </nav>

          <div style={{ marginTop: 'var(--space-32)', display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
            <Button href={pathFor('reserve', locale)} fullWidth size="lg">{strings.cta}</Button>
            <Button href={`tel:${HOUSE.phoneHref}`} variant="secondary" fullWidth size="lg">{HOUSE.phone}</Button>
          </div>

          <div style={{ marginTop: 'var(--space-40)' }}>
            <span style={{
              font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase', color: 'var(--text-faint)',
            }}>{strings.language}</span>
            <div style={{ display: 'flex', gap: 'var(--space-16)', marginTop: 'var(--space-12)' }}>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={pathFor(activePage, l)}
                  hrefLang={l}
                  className="lr-nav__link"
                  style={{
                    color: l === locale ? 'var(--text-heading)' : 'var(--text-muted)',
                    borderBottomColor: l === locale ? 'var(--pine-600)' : 'transparent',
                  }}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DrawerLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      style={{
        border: 'none', borderBottom: '1px solid var(--border-hairline)',
        padding: 'var(--space-16) 0', font: 'var(--type-subhead)',
        color: active ? 'var(--text-heading)' : 'var(--text-body)',
      }}
    >
      {label}
    </Link>
  );
}

function LanguageSwitcher({ locale, dark, label, activePage }: {
  locale: Locale; dark: boolean; label: string; activePage: PageKey;
}) {
  return (
    <div
      role="group" aria-label={label}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}
    >
      {locales.map((l, i) => (
        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
          {i > 0 && (
            <span aria-hidden="true" style={{
              width: 1, height: 11,
              background: dark ? 'var(--border-inverse)' : 'var(--border-hairline)',
            }} />
          )}
          <Link
            href={pathFor(activePage, l)}
            hrefLang={l}
            aria-current={l === locale ? 'true' : undefined}
            className="lr-nav__link"
            style={{
              color: dark
                ? (l === locale ? 'var(--linen-050)' : 'var(--pine-200)')
                : (l === locale ? 'var(--text-heading)' : 'var(--text-faint)'),
            }}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
