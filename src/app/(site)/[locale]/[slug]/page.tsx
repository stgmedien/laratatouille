import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HousePage } from '@/components/pages/HousePage';
import { LegalPage, PrivacyPage } from '@/components/pages/LegalPage';
import { MenuPage } from '@/components/pages/MenuPage';
import { ReservePage } from '@/components/pages/ReservePage';
import { PageShell } from '@/components/site/PageShell';
import { getDictionary } from '@/lib/i18n';
import { isLocale, locales, pageFromSlug, PAGES, type PageKey } from '@/lib/i18n/config';
import { alternatesFor, openGraphFor } from '@/lib/seo';

export const revalidate = 900;

/** Every locale × every page except the home page, which lives one level up. */
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    (Object.keys(PAGES) as PageKey[])
      .filter((page) => page !== 'home')
      .map((page) => ({ locale, slug: PAGES[page][locale] })),
  );
}

const META_KEY: Record<Exclude<PageKey, 'home'>, 'menu' | 'house' | 'reserve' | 'legal' | 'privacy'> = {
  menu: 'menu', house: 'house', reserve: 'reserve', legal: 'legal', privacy: 'privacy',
};

const HERO_PAGES: PageKey[] = ['house'];

const OG_IMAGE: Partial<Record<PageKey, string>> = {
  menu: '/images/carpaccio.jpg',
  house: '/images/kueche.jpg',
  reserve: '/images/rinderfilet.jpg',
};

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = pageFromSlug(slug, locale);
  if (!page || page === 'home') return {};

  const dict = getDictionary(locale);
  const meta = dict.meta[META_KEY[page]];
  const isLegal = page === 'legal' || page === 'privacy';

  return {
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(page, locale),
    robots: isLegal ? { index: false, follow: true } : undefined,
    openGraph: openGraphFor(locale, meta.title, meta.description, OG_IMAGE[page]),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const page = pageFromSlug(slug, locale);
  if (!page || page === 'home') notFound();

  const dict = getDictionary(locale);

  return (
    <PageShell locale={locale} dict={dict} page={page} overHero={HERO_PAGES.includes(page)}>
      {page === 'menu' && <MenuPage locale={locale} dict={dict} />}
      {page === 'house' && <HousePage locale={locale} dict={dict} />}
      {page === 'reserve' && <ReservePage locale={locale} dict={dict} />}
      {page === 'legal' && <LegalPage locale={locale} dict={dict} />}
      {page === 'privacy' && <PrivacyPage locale={locale} dict={dict} />}
    </PageShell>
  );
}
