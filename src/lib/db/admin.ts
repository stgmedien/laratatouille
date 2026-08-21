import 'server-only';
import { db, hasDatabase } from './client';
import {
  DISH_TAGS,
  type AnnouncementRow, type CategoryRow, type DishRow, type DishTag,
  type MenuSettingsRow, type ReviewRow,
} from './types';

export class NoDatabaseError extends Error {
  constructor() {
    super('Für das Bearbeiten der Karte muss DATABASE_URL gesetzt sein.');
    this.name = 'NoDatabaseError';
  }
}

function sql() {
  if (!hasDatabase) throw new NoDatabaseError();
  return db();
}

/** Tags come from a fixed set, so the array literal below cannot carry input. */
function tagLiteral(tags: string[]): string {
  const clean = tags.filter((t): t is DishTag => (DISH_TAGS as readonly string[]).includes(t));
  return `{${clean.join(',')}}`;
}

/* --- Categories ---------------------------------------------------------- */

export async function listCategories(): Promise<CategoryRow[]> {
  return (await sql()`
    SELECT id, sort_order, is_published, name_de, name_es, name_en, intro_de, intro_es, intro_en
    FROM categories ORDER BY sort_order, id
  `) as CategoryRow[];
}

export async function getCategory(id: number): Promise<CategoryRow | null> {
  const rows = (await sql()`
    SELECT id, sort_order, is_published, name_de, name_es, name_en, intro_de, intro_es, intro_en
    FROM categories WHERE id = ${id}
  `) as CategoryRow[];
  return rows[0] ?? null;
}

export type CategoryInput = Omit<CategoryRow, 'id' | 'sort_order'>;

export async function createCategory(data: CategoryInput): Promise<number> {
  const rows = (await sql()`
    INSERT INTO categories (sort_order, is_published, name_de, name_es, name_en, intro_de, intro_es, intro_en)
    VALUES (
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM categories),
      ${data.is_published},
      ${data.name_de}, ${data.name_es}, ${data.name_en},
      ${data.intro_de}, ${data.intro_es}, ${data.intro_en}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function updateCategory(id: number, data: CategoryInput): Promise<void> {
  await sql()`
    UPDATE categories SET
      is_published = ${data.is_published},
      name_de = ${data.name_de}, name_es = ${data.name_es}, name_en = ${data.name_en},
      intro_de = ${data.intro_de}, intro_es = ${data.intro_es}, intro_en = ${data.intro_en},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteCategory(id: number): Promise<void> {
  await sql()`DELETE FROM categories WHERE id = ${id}`;
}

/* --- Dishes -------------------------------------------------------------- */

export async function listDishes(): Promise<DishRow[]> {
  return (await sql()`
    SELECT id, category_id, sort_order, is_published, is_highlight, price,
           name_de, name_es, name_en,
           description_de, description_es, description_en,
           origin_de, origin_es, origin_en, tags
    FROM dishes ORDER BY sort_order, id
  `) as DishRow[];
}

export async function getDish(id: number): Promise<DishRow | null> {
  const rows = (await sql()`
    SELECT id, category_id, sort_order, is_published, is_highlight, price,
           name_de, name_es, name_en,
           description_de, description_es, description_en,
           origin_de, origin_es, origin_en, tags
    FROM dishes WHERE id = ${id}
  `) as DishRow[];
  return rows[0] ?? null;
}

export type DishInput = Omit<DishRow, 'id' | 'sort_order'>;

export async function createDish(data: DishInput): Promise<number> {
  const rows = (await sql()`
    INSERT INTO dishes (
      category_id, sort_order, is_published, is_highlight, price,
      name_de, name_es, name_en,
      description_de, description_es, description_en,
      origin_de, origin_es, origin_en, tags
    ) VALUES (
      ${data.category_id},
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM dishes WHERE category_id = ${data.category_id}),
      ${data.is_published}, ${data.is_highlight}, ${data.price},
      ${data.name_de}, ${data.name_es}, ${data.name_en},
      ${data.description_de}, ${data.description_es}, ${data.description_en},
      ${data.origin_de}, ${data.origin_es}, ${data.origin_en},
      ${tagLiteral(data.tags)}::text[]
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function updateDish(id: number, data: DishInput): Promise<void> {
  await sql()`
    UPDATE dishes SET
      category_id = ${data.category_id},
      is_published = ${data.is_published},
      is_highlight = ${data.is_highlight},
      price = ${data.price},
      name_de = ${data.name_de}, name_es = ${data.name_es}, name_en = ${data.name_en},
      description_de = ${data.description_de}, description_es = ${data.description_es}, description_en = ${data.description_en},
      origin_de = ${data.origin_de}, origin_es = ${data.origin_es}, origin_en = ${data.origin_en},
      tags = ${tagLiteral(data.tags)}::text[],
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteDish(id: number): Promise<void> {
  await sql()`DELETE FROM dishes WHERE id = ${id}`;
}

/* --- Ordering ------------------------------------------------------------
   Swap sort_order with the neighbour in the same scope. Written as two
   separate tagged templates because the driver only parameterises values,
   never the comparison operator or the sort direction. */

type Neighbour = { id: number; sort_order: number };

export async function moveCategory(id: number, direction: 'up' | 'down'): Promise<void> {
  const s = sql();

  const neighbours = (direction === 'up'
    ? await s`SELECT id, sort_order FROM categories
              WHERE sort_order < (SELECT sort_order FROM categories WHERE id = ${id})
              ORDER BY sort_order DESC LIMIT 1`
    : await s`SELECT id, sort_order FROM categories
              WHERE sort_order > (SELECT sort_order FROM categories WHERE id = ${id})
              ORDER BY sort_order ASC LIMIT 1`) as Neighbour[];

  const neighbour = neighbours[0];
  if (!neighbour) return;

  const currentRows = (await s`SELECT sort_order FROM categories WHERE id = ${id}`) as Neighbour[];
  const current = currentRows[0];
  if (!current) return;

  await s`UPDATE categories SET sort_order = ${neighbour.sort_order} WHERE id = ${id}`;
  await s`UPDATE categories SET sort_order = ${current.sort_order} WHERE id = ${neighbour.id}`;
}

export async function moveDish(id: number, direction: 'up' | 'down'): Promise<void> {
  const s = sql();

  const neighbours = (direction === 'up'
    ? await s`SELECT id, sort_order FROM dishes
              WHERE category_id = (SELECT category_id FROM dishes WHERE id = ${id})
                AND sort_order < (SELECT sort_order FROM dishes WHERE id = ${id})
              ORDER BY sort_order DESC LIMIT 1`
    : await s`SELECT id, sort_order FROM dishes
              WHERE category_id = (SELECT category_id FROM dishes WHERE id = ${id})
                AND sort_order > (SELECT sort_order FROM dishes WHERE id = ${id})
              ORDER BY sort_order ASC LIMIT 1`) as Neighbour[];

  const neighbour = neighbours[0];
  if (!neighbour) return;

  const currentRows = (await s`SELECT sort_order FROM dishes WHERE id = ${id}`) as Neighbour[];
  const current = currentRows[0];
  if (!current) return;

  await s`UPDATE dishes SET sort_order = ${neighbour.sort_order} WHERE id = ${id}`;
  await s`UPDATE dishes SET sort_order = ${current.sort_order} WHERE id = ${neighbour.id}`;
}

/* --- Guest reviews -------------------------------------------------------- */

export async function listReviews(): Promise<ReviewRow[]> {
  return (await sql()`
    SELECT id, sort_order, is_published, quote_de, quote_es, quote_en, original_lang, author, source
    FROM reviews ORDER BY sort_order, id
  `) as ReviewRow[];
}

export async function getReview(id: number): Promise<ReviewRow | null> {
  const rows = (await sql()`
    SELECT id, sort_order, is_published, quote_de, quote_es, quote_en, original_lang, author, source
    FROM reviews WHERE id = ${id}
  `) as ReviewRow[];
  return rows[0] ?? null;
}

export type ReviewInput = Omit<ReviewRow, 'id' | 'sort_order'>;

export async function createReview(data: ReviewInput): Promise<number> {
  const rows = (await sql()`
    INSERT INTO reviews (
      sort_order, is_published, quote_de, quote_es, quote_en, original_lang, author, source
    ) VALUES (
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM reviews),
      ${data.is_published}, ${data.quote_de}, ${data.quote_es}, ${data.quote_en},
      ${data.original_lang}, ${data.author}, ${data.source}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function updateReview(id: number, data: ReviewInput): Promise<void> {
  await sql()`
    UPDATE reviews SET
      is_published = ${data.is_published},
      quote_de = ${data.quote_de}, quote_es = ${data.quote_es}, quote_en = ${data.quote_en},
      original_lang = ${data.original_lang},
      author = ${data.author}, source = ${data.source},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteReview(id: number): Promise<void> {
  await sql()`DELETE FROM reviews WHERE id = ${id}`;
}

export async function moveReview(id: number, direction: 'up' | 'down'): Promise<void> {
  const s = sql();

  const neighbours = (direction === 'up'
    ? await s`SELECT id, sort_order FROM reviews
              WHERE sort_order < (SELECT sort_order FROM reviews WHERE id = ${id})
              ORDER BY sort_order DESC LIMIT 1`
    : await s`SELECT id, sort_order FROM reviews
              WHERE sort_order > (SELECT sort_order FROM reviews WHERE id = ${id})
              ORDER BY sort_order ASC LIMIT 1`) as Neighbour[];

  const neighbour = neighbours[0];
  if (!neighbour) return;

  const currentRows = (await s`SELECT sort_order FROM reviews WHERE id = ${id}`) as Neighbour[];
  const current = currentRows[0];
  if (!current) return;

  await s`UPDATE reviews SET sort_order = ${neighbour.sort_order} WHERE id = ${id}`;
  await s`UPDATE reviews SET sort_order = ${current.sort_order} WHERE id = ${neighbour.id}`;
}

/* --- Notices -------------------------------------------------------------- */

export async function listAnnouncements(): Promise<AnnouncementRow[]> {
  return (await sql()`
    SELECT id, sort_order, is_published,
           starts_on::text AS starts_on, ends_on::text AS ends_on,
           text_de, text_es, text_en
    FROM announcements ORDER BY sort_order, id
  `) as AnnouncementRow[];
}

export async function getAnnouncement(id: number): Promise<AnnouncementRow | null> {
  const rows = (await sql()`
    SELECT id, sort_order, is_published,
           starts_on::text AS starts_on, ends_on::text AS ends_on,
           text_de, text_es, text_en
    FROM announcements WHERE id = ${id}
  `) as AnnouncementRow[];
  return rows[0] ?? null;
}

export type AnnouncementInput = Omit<AnnouncementRow, 'id' | 'sort_order'>;

export async function createAnnouncement(data: AnnouncementInput): Promise<number> {
  const rows = (await sql()`
    INSERT INTO announcements (sort_order, is_published, starts_on, ends_on, text_de, text_es, text_en)
    VALUES (
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM announcements),
      ${data.is_published}, ${data.starts_on}, ${data.ends_on},
      ${data.text_de}, ${data.text_es}, ${data.text_en}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function updateAnnouncement(id: number, data: AnnouncementInput): Promise<void> {
  await sql()`
    UPDATE announcements SET
      is_published = ${data.is_published},
      starts_on = ${data.starts_on}, ends_on = ${data.ends_on},
      text_de = ${data.text_de}, text_es = ${data.text_es}, text_en = ${data.text_en},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteAnnouncement(id: number): Promise<void> {
  await sql()`DELETE FROM announcements WHERE id = ${id}`;
}

export async function moveAnnouncement(id: number, direction: 'up' | 'down'): Promise<void> {
  const s = sql();

  const neighbours = (direction === 'up'
    ? await s`SELECT id, sort_order FROM announcements
              WHERE sort_order < (SELECT sort_order FROM announcements WHERE id = ${id})
              ORDER BY sort_order DESC LIMIT 1`
    : await s`SELECT id, sort_order FROM announcements
              WHERE sort_order > (SELECT sort_order FROM announcements WHERE id = ${id})
              ORDER BY sort_order ASC LIMIT 1`) as Neighbour[];

  const neighbour = neighbours[0];
  if (!neighbour) return;

  const currentRows = (await s`SELECT sort_order FROM announcements WHERE id = ${id}`) as Neighbour[];
  const current = currentRows[0];
  if (!current) return;

  await s`UPDATE announcements SET sort_order = ${neighbour.sort_order} WHERE id = ${id}`;
  await s`UPDATE announcements SET sort_order = ${current.sort_order} WHERE id = ${neighbour.id}`;
}

/* --- Menu page settings --------------------------------------------------- */

export async function getSettings(): Promise<MenuSettingsRow> {
  const rows = (await sql()`SELECT * FROM menu_settings WHERE id = 1`) as MenuSettingsRow[];
  return rows[0];
}

export async function updateSettings(data: MenuSettingsRow): Promise<void> {
  await sql()`
    UPDATE menu_settings SET
      eyebrow_de = ${data.eyebrow_de}, eyebrow_es = ${data.eyebrow_es}, eyebrow_en = ${data.eyebrow_en},
      title_de = ${data.title_de}, title_es = ${data.title_es}, title_en = ${data.title_en},
      intro_de = ${data.intro_de}, intro_es = ${data.intro_es}, intro_en = ${data.intro_en},
      updated_at = NOW()
    WHERE id = 1
  `;
}
