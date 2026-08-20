import seed from './seed-data.json';
import type { CategoryRow, DishRow, MenuSettingsRow, ReviewRow } from './types';

/**
 * Starter content, shared with `scripts/db-setup.mjs` through seed-data.json.
 * It is written into Neon by `npm run db:seed` and is also what the site
 * renders when no DATABASE_URL is configured.
 *
 * Dish names and prices are PLACEHOLDERS from the design-system brief.
 * Replace them in the admin area before going live.
 */

type SeedCategory = Omit<CategoryRow, 'id'> & { dishes: Omit<DishRow, 'id' | 'category_id'>[] };

export const SEED_CATEGORIES = seed.categories as SeedCategory[];
export const SEED_SETTINGS = seed.settings as MenuSettingsRow;
export const SEED_REVIEWS = seed.reviews as Omit<ReviewRow, 'id'>[];
