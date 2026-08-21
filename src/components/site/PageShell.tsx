import type { ReactNode } from 'react';
import type { Locale, PageKey } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { getActiveAnnouncement } from '@/lib/db/menu';
import { AnnouncementBanner } from './AnnouncementBanner';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export async function PageShell({ locale, dict, page, overHero = false, children }: {
  locale: Locale;
  dict: Dictionary;
  page: PageKey;
  overHero?: boolean;
  children: ReactNode;
}) {
  const announcement = await getActiveAnnouncement(locale);

  return (
    <>
      <a className="lr-skip" href="#inhalt">{dict.nav.skip}</a>
      {announcement && <AnnouncementBanner text={announcement} />}
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
