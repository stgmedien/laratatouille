import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage } from '@/components/pages/HomePage';
import { PageShell } from '@/components/site/PageShell';
import { getDictionary } from '@/lib/i18n';
import { isLocale, locales } from '@/lib/i18n/config';
import { alternatesFor, openGraphFor, restaurantJsonLd } from '@/lib/seo';

export const revalidate = 900;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.home.title },
    description: dict.meta.home.description,
    alternates: alternatesFor('home', locale),
    openGraph: openGraphFor(locale, dict.meta.home.title, dict.meta.home.description),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <PageShell locale={locale} dict={dict} page="home" overHero>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd(locale, dict.meta.home.description)) }}
      />
      <HomePage locale={locale} dict={dict} />
    </PageShell>
  );
}
