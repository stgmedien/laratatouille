import type { Locale } from '@/lib/i18n/config';

export const DISH_TAGS = ['vegetarian', 'vegan', 'signature'] as const;
export type DishTag = (typeof DISH_TAGS)[number];

export function isDishTag(value: string): value is DishTag {
  return (DISH_TAGS as readonly string[]).includes(value);
}

/** A dish exactly as it is stored — all three languages side by side. */
export interface DishRow {
  id: number;
  category_id: number;
  sort_order: number;
  is_published: boolean;
  is_highlight: boolean;
  price: string;
  name_de: string; name_es: string; name_en: string;
  description_de: string; description_es: string; description_en: string;
  origin_de: string; origin_es: string; origin_en: string;
  tags: string[];
}

export interface CategoryRow {
  id: number;
  sort_order: number;
  is_published: boolean;
  /** Beginnt beim Ausdruck eine neue Karte. */
  starts_print_page: boolean;
  name_de: string; name_es: string; name_en: string;
  intro_de: string; intro_es: string; intro_en: string;
}

/**
 * A guest review, quoted from the restaurant's public profile. It is a
 * quotation, so it is stored once in the language the guest wrote it in and
 * shown unchanged in all three site languages — translating someone's words
 * and still putting their name under them would not be honest.
 */
export interface ReviewRow {
  id: number;
  sort_order: number;
  is_published: boolean;
  quote_de: string;
  quote_es: string;
  quote_en: string;
  /** The language the guest actually wrote in; the rest are translations. */
  original_lang: string;
  author: string;
  source: string;
}

/** A review rendered in one language, with a note when it was translated. */
export interface LocalisedReview {
  id: number;
  quote: string;
  author: string;
  source: string;
  /** True when the shown text is not what the guest wrote. */
  translated: boolean;
  /** Language of the text actually rendered — for the lang attribute. */
  lang: string;
}

/**
 * A short notice shown as a banner above the site. `starts_on` / `ends_on`
 * are optional; when set, the banner comes and goes on its own so a closure
 * can be prepared weeks in advance and never has to be switched off by hand.
 */
export interface AnnouncementRow {
  id: number;
  sort_order: number;
  is_published: boolean;
  /** ISO date (YYYY-MM-DD) or null. */
  starts_on: string | null;
  ends_on: string | null;
  text_de: string;
  text_es: string;
  text_en: string;
}

/**
 * Ein festes Menü unter der Karte. Die Gänge stehen als mehrzeiliger Text,
 * eine Zeile je Gang.
 */
export interface MenuRow {
  id: number;
  sort_order: number;
  is_published: boolean;
  price: string;
  title_de: string; title_es: string; title_en: string;
  intro_de: string; intro_es: string; intro_en: string;
  courses_de: string; courses_es: string; courses_en: string;
}

export interface LocalisedMenu {
  id: number;
  title: string;
  intro: string;
  price: string;
  courses: string[];
}

export interface MenuSettingsRow {
  eyebrow_de: string; eyebrow_es: string; eyebrow_en: string;
  title_de: string; title_es: string; title_en: string;
  intro_de: string; intro_es: string; intro_en: string;
}

/** One dish rendered in a single language. */
export interface LocalisedDish {
  id: number;
  name: string;
  description: string;
  origin: string;
  price: string;
  tags: DishTag[];
  isHighlight: boolean;
  categoryName: string;
}

export interface LocalisedCategory {
  id: number;
  name: string;
  intro: string;
  startsPrintPage: boolean;
  dishes: LocalisedDish[];
}

export interface LocalisedMenuSettings {
  eyebrow: string;
  title: string;
  intro: string;
}

/**
 * Reads a `<field>_<locale>` column, falling back to German when a translation
 * has not been filled in yet — an empty menu is worse than a German one.
 */
export function pick(row: object, field: string, locale: Locale): string {
  const source = row as Record<string, unknown>;
  const value = source[`${field}_${locale}`];
  if (typeof value === 'string' && value.trim()) return value.trim();
  const fallback = source[`${field}_de`];
  return typeof fallback === 'string' ? fallback.trim() : '';
}

export function localiseDish(row: DishRow, locale: Locale, categoryName = ''): LocalisedDish {
  return {
    id: row.id,
    name: pick(row, 'name', locale),
    description: pick(row, 'description', locale),
    origin: pick(row, 'origin', locale),
    price: row.price ?? '',
    tags: (row.tags ?? []).filter(isDishTag),
    isHighlight: row.is_highlight,
    categoryName,
  };
}
