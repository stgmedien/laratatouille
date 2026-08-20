import { cache } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { db, hasDatabase } from './client';
import { SEED_CATEGORIES, SEED_REVIEWS, SEED_SETTINGS } from './seed-data';
import {
  localiseDish, pick,
  type CategoryRow, type DishRow, type LocalisedCategory, type LocalisedDish,
  type LocalisedMenuSettings, type MenuSettingsRow, type ReviewRow,
} from './types';

/* -------------------------------------------------------------------------
   Raw reads. `cache()` de-duplicates them within a single render pass, so a
   page that shows both the menu and the excerpt still makes one round trip.
   ------------------------------------------------------------------------- */

const readCategories = cache(async (): Promise<CategoryRow[]> => {
  if (!hasDatabase) {
    return SEED_CATEGORIES.map((c, i) => ({ ...c, id: i + 1 }));
  }
  const sql = db();
  return (await sql`
    SELECT id, sort_order, is_published, name_de, name_es, name_en, intro_de, intro_es, intro_en
    FROM categories
    ORDER BY sort_order, id
  `) as CategoryRow[];
});

const readDishes = cache(async (): Promise<DishRow[]> => {
  if (!hasDatabase) {
    return SEED_CATEGORIES.flatMap((c, ci) =>
      c.dishes.map((d, di) => ({ ...d, id: ci * 100 + di + 1, category_id: ci + 1 })),
    );
  }
  const sql = db();
  return (await sql`
    SELECT id, category_id, sort_order, is_published, is_highlight, price,
           name_de, name_es, name_en,
           description_de, description_es, description_en,
           origin_de, origin_es, origin_en,
           tags
    FROM dishes
    ORDER BY sort_order, id
  `) as DishRow[];
});

const readSettings = cache(async (): Promise<MenuSettingsRow> => {
  if (!hasDatabase) return SEED_SETTINGS;
  const sql = db();
  const rows = (await sql`SELECT * FROM menu_settings WHERE id = 1`) as MenuSettingsRow[];
  return rows[0] ?? SEED_SETTINGS;
});

const readReviews = cache(async (): Promise<ReviewRow[]> => {
  if (!hasDatabase) return SEED_REVIEWS.map((r, i) => ({ ...r, id: i + 1 }));
  const sql = db();
  return (await sql`
    SELECT id, sort_order, is_published, quote, author, source
    FROM reviews
    ORDER BY sort_order, id
  `) as ReviewRow[];
});

/* -------------------------------------------------------------------------
   Localised reads used by the public pages.
   ------------------------------------------------------------------------- */

/** The full published menu, grouped by category, in one language. */
export async function getMenu(locale: Locale): Promise<LocalisedCategory[]> {
  const [categories, dishes] = await Promise.all([readCategories(), readDishes()]);

  return categories
    .filter((c) => c.is_published)
    .map((c) => ({
      id: c.id,
      name: pick(c, 'name', locale),
      intro: pick(c, 'intro', locale),
      dishes: dishes
        .filter((d) => d.category_id === c.id && d.is_published)
        .map((d) => localiseDish(d, locale, pick(c, 'name', locale))),
    }))
    .filter((c) => c.dishes.length > 0 || c.intro);
}

/** Dishes flagged as highlights, for the excerpt on the home page. */
export async function getHighlights(locale: Locale, limit = 4): Promise<LocalisedDish[]> {
  const [categories, dishes] = await Promise.all([readCategories(), readDishes()]);
  const published = new Set(categories.filter((c) => c.is_published).map((c) => c.id));
  const nameOf = new Map(categories.map((c) => [c.id, pick(c, 'name', locale)]));

  const flagged = dishes.filter((d) => d.is_published && d.is_highlight && published.has(d.category_id));
  const pool = flagged.length > 0
    ? flagged
    : dishes.filter((d) => d.is_published && published.has(d.category_id));

  return pool.slice(0, limit).map((d) => localiseDish(d, locale, nameOf.get(d.category_id) ?? ''));
}

export async function getMenuSettings(locale: Locale): Promise<LocalisedMenuSettings> {
  const row = await readSettings();
  return {
    eyebrow: pick(row, 'eyebrow', locale),
    title: pick(row, 'title', locale),
    intro: pick(row, 'intro', locale),
    setMenuTitle: pick(row, 'set_menu_title', locale),
    setMenuBody: pick(row, 'set_menu_body', locale),
  };
}

/**
 * Published guest reviews, newest ordering first. Quotes keep the language the
 * guest wrote them in, so there is nothing to localise here.
 */
export async function getReviews(limit?: number): Promise<ReviewRow[]> {
  const rows = (await readReviews()).filter((r) => r.is_published && r.quote.trim());
  return typeof limit === 'number' ? rows.slice(0, limit) : rows;
}
