import { de } from './dictionaries/de';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';
import type { Locale } from './config';

export type { Dictionary } from './dictionaries/de';

const DICTIONARIES = { de, es, en };

export function getDictionary(locale: Locale) {
  return DICTIONARIES[locale];
}

export * from './config';
