import Image from 'next/image';
import type { LocalisedCategory } from '@/lib/db/types';
import type { Dictionary } from '@/lib/i18n';
import { tagsFor } from '@/components/pages/tags';

/**
 * Die Karte zum Ausdrucken: DIN A4 der Länge nach halbiert, also 105 × 297 mm
 * hochkant. Auf dem Bildschirm ist dieser Baum ausgeblendet und existiert nur
 * für den Druck; wo eine Kategorie "auf neuer Karte beginnen" gesetzt hat,
 * fängt ein neues Blatt an.
 */
export function MenuPrint({ categories, dict }: {
  categories: LocalisedCategory[];
  dict: Dictionary;
}) {
  // Kategorien zu Karten bündeln.
  const cards: LocalisedCategory[][] = [];
  for (const category of categories) {
    if (cards.length === 0 || category.startsPrintPage) cards.push([category]);
    else cards[cards.length - 1].push(category);
  }

  return (
    <div className="lr-print" aria-hidden="true">
      {cards.map((card, i) => (
        <section key={card[0].id} className="lr-print-card">
          <header className="lr-print-head">
            <Image src="/images/logo.png" alt="" width={900} height={263} className="lr-print-logo" />
          </header>

          {card.map((category) => (
            <div key={category.id} className="lr-print-group">
              <h2 className="lr-print-cat">{category.name}</h2>
              {category.intro && <p className="lr-print-intro">{category.intro}</p>}

              {category.dishes.map((dish) => (
                <article key={dish.id} className="lr-print-dish">
                  <div className="lr-print-line">
                    <span className="lr-print-name">{dish.name}</span>
                    <span className="lr-print-leader" />
                    <span className="lr-print-price">{dish.price}</span>
                  </div>
                  {dish.description && <p className="lr-print-desc">{dish.description}</p>}
                  {(dish.tags.length > 0 || dish.origin) && (
                    <p className="lr-print-meta">
                      {tagsFor(dish.tags, dict).map((t) => t.label).join(' · ')}
                      {dish.tags.length > 0 && dish.origin ? ' · ' : ''}
                      {dish.origin}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ))}

          <footer className="lr-print-foot">{dict.menu.allergens}</footer>
          {i < cards.length - 1 && <div className="lr-print-break" />}
        </section>
      ))}
    </div>
  );
}
