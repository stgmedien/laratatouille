export const locales = ['de', 'es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  es: 'Español',
  en: 'English',
};

/** BCP 47 tags for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = {
  de: 'de-DE',
  es: 'es-ES',
  en: 'en-GB',
};

/**
 * Page keys mapped to their localised URL segment. The home page is the bare
 * locale root, every other page carries a slug in the reader's own language.
 */
export const PAGES = {
  home: { de: '', es: '', en: '' },
  menu: { de: 'karte', es: 'carta', en: 'menu' },
  house: { de: 'haus', es: 'la-casa', en: 'the-house' },
  reserve: { de: 'reservieren', es: 'reservar', en: 'book' },
  legal: { de: 'impressum', es: 'aviso-legal', en: 'legal-notice' },
  privacy: { de: 'datenschutz', es: 'privacidad', en: 'privacy' },
} as const;

export type PageKey = keyof typeof PAGES;

export const pageKeys = Object.keys(PAGES) as PageKey[];

/** `/de/karte`, `/es/carta`, `/en/menu` … */
export function pathFor(page: PageKey, locale: Locale): string {
  const slug = PAGES[page][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

/** Reverse lookup: which page does this slug address in this locale? */
export function pageFromSlug(slug: string, locale: Locale): PageKey | null {
  return pageKeys.find((key) => PAGES[key][locale] === slug) ?? null;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the best locale from an Accept-Language header. */
export function negotiateLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}
