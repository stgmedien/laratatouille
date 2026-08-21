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
  quote: string;
  author: string;
  source: string;
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

export interface MenuSettingsRow {
  eyebrow_de: string; eyebrow_es: string; eyebrow_en: string;
  title_de: string; title_es: string; title_en: string;
  intro_de: string; intro_es: string; intro_en: string;
  set_menu_title_de: string; set_menu_title_es: string; set_menu_title_en: string;
  set_menu_body_de: string; set_menu_body_es: string; set_menu_body_en: string;
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
  dishes: LocalisedDish[];
}

export interface LocalisedMenuSettings {
  eyebrow: string;
  title: string;
  intro: string;
  setMenuTitle: string;
  setMenuBody: string;
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
