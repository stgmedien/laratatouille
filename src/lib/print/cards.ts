import type { LocalisedCategory } from '@/lib/db/types';
import type { Locale } from '@/lib/i18n/config';

/**
 * Die gedruckte Karte: Ein DIN-A4-Blatt hochkant trägt zwei Karten von je
 * 105 × 297 mm nebeneinander und wird nach dem Druck der Länge nach halbiert.
 * Welche Kategorien auf eine Karte gehören, sagt das Häkchen "auf einer neuen
 * Karte beginnen" in der Kategorie; je zwei Karten ergeben ein Blatt.
 */
export const SHEET_MM = { width: 210, height: 297, card: 105 } as const;

export function cardsFor(categories: LocalisedCategory[]): LocalisedCategory[][] {
  const cards: LocalisedCategory[][] = [];
  for (const category of categories) {
    if (cards.length === 0 || category.startsPrintPage) cards.push([category]);
    else cards[cards.length - 1].push(category);
  }
  return cards;
}

export function sheetsFor(cards: LocalisedCategory[][]): LocalisedCategory[][][] {
  const sheets: LocalisedCategory[][][] = [];
  for (let i = 0; i < cards.length; i += 2) sheets.push(cards.slice(i, i + 2));
  return sheets;
}

/** `/admin/druck/speisekarte-de.pdf` — der Dateiname ist Teil der Adresse. */
export function printPdfPath(locale: Locale): string {
  return `/admin/druck/speisekarte-${locale}.pdf`;
}
