import type { Metadata } from 'next';
import { HOUSE } from './house';
import { defaultLocale, locales, pathFor, type Locale, type PageKey } from './i18n/config';

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    ?? 'http://localhost:3000';
  return raw.replace(/\/$/, '');
}

export function absolute(path: string): string {
  return `${siteUrl()}${path}`;
}

/** Canonical plus a full hreflang set, so the three languages do not compete. */
export function alternatesFor(page: PageKey, locale: Locale): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absolute(pathFor(page, l));
  languages['x-default'] = absolute(pathFor(page, defaultLocale));

  return { canonical: absolute(pathFor(page, locale)), languages };
}

export function openGraphFor(locale: Locale, title: string, description: string, image = '/images/gastraum.jpg') {
  return {
    title,
    description,
    siteName: HOUSE.name,
    locale,
    type: 'website' as const,
    images: [{ url: absolute(image), width: 2200, height: 1650, alt: HOUSE.name }],
  };
}

/** schema.org Restaurant — helps Google show hours, address and phone. */
export function restaurantJsonLd(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: HOUSE.name,
    description,
    url: absolute(pathFor('home', locale)),
    telephone: HOUSE.phone,
    email: HOUSE.email,
    image: absolute('/images/gastraum.jpg'),
    servesCuisine: 'Mediterranean',
    priceRange: '€€',
    hasMenu: absolute(pathFor('menu', locale)),
    acceptsReservations: absolute(pathFor('reserve', locale)),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOUSE.geo.lat,
      longitude: HOUSE.geo.lon,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: HOUSE.street,
      postalCode: HOUSE.postalCode,
      addressLocality: HOUSE.city,
      addressRegion: HOUSE.region,
      addressCountry: HOUSE.country,
    },
    openingHoursSpecification: HOUSE.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}
