import type { ReactNode } from 'react';
import type { Locale, PageKey } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function PageShell({ locale, dict, page, overHero = false, children }: {
  locale: Locale;
  dict: Dictionary;
  page: PageKey;
  overHero?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <a className="lr-skip" href="#inhalt">{dict.nav.skip}</a>
      <SiteHeader
        locale={locale}
        strings={{ ...dict.nav, siteName: dict.meta.siteName }}
        overHero={overHero}
        activePage={page}
      />
      <main id="inhalt" className={overHero ? 'lr-main--over-hero' : undefined}>{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
