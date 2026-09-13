import Image from 'next/image';
import type { LocalisedCategory } from '@/lib/db/types';
import type { Dictionary } from '@/lib/i18n';
import { tagsFor } from '@/components/pages/tags';
import { cardsFor, sheetsFor } from '@/lib/print/cards';

/**
 * Die Karte zum Ausdrucken aus dem Browser: je zwei Karten von 105 × 297 mm
 * nebeneinander auf einem DIN-A4-Blatt, mit Schnittmarken in der Mitte. Auf
 * dem Bildschirm ist dieser Baum ausgeblendet und existiert nur für den Druck.
 * Dasselbe Blatt liefert die Verwaltung unter /admin/druck als fertiges PDF.
 */
export function MenuPrint({ categories, dict }: {
  categories: LocalisedCategory[];
  dict: Dictionary;
}) {
  const sheets = sheetsFor(cardsFor(categories));

  return (
    <div className="lr-print" aria-hidden="true">
      {sheets.map((sheet, i) => (
        <div key={i} className="lr-print-sheet">
          {sheet.map((card) => (
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
            </section>
          ))}
        </div>
      ))}
    </div>
  );
}
