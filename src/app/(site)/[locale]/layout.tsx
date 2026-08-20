import type { Metadata, Viewport } from 'next';
import { Marcellus, Public_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { HOUSE } from '@/lib/house';
import { getDictionary } from '@/lib/i18n';
import { htmlLang, isLocale, locales, type Locale } from '@/lib/i18n/config';

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-marcellus',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-public-sans',
});

export const viewport: Viewport = {
  themeColor: '#17251C',
  width: 'device-width',
  initialScale: 1,
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { default: dict.meta.home.title, template: `%s — ${HOUSE.name}` },
    description: dict.meta.home.description,
    applicationName: HOUSE.name,
  };
}

export default async function LocaleLayout({
  children, params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={htmlLang[locale as Locale]} data-scroll-behavior="smooth" className={`${marcellus.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
