import type { DishTag } from '@/lib/db/types';
import type { Dictionary } from '@/lib/i18n';

const TONES: Record<DishTag, 'sage' | 'gold'> = {
  vegetarian: 'sage',
  vegan: 'sage',
  signature: 'gold',
};

/** Turns stored tag slugs into the labels and tones the Tag component wants. */
export function tagsFor(tags: DishTag[], dict: Dictionary): { label: string; tone: 'sage' | 'gold' }[] {
  return tags.map((tag) => ({ label: dict.tags[tag], tone: TONES[tag] }));
}
