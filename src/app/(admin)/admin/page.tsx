import Link from 'next/link';
import { Button, Icon, Notice, Rule, Tag } from '@/components/ds';
import { AdminShell } from '@/components/admin/AdminShell';
import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { IconSubmit } from '@/components/admin/IconSubmit';
import { requireSession } from '@/lib/admin-session';
import { listCategories, listDishes } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';
import type { CategoryRow, DishRow, DishTag } from '@/lib/db/types';
import { removeCategory, removeDish, shiftCategory, shiftDish } from './actions';

export const dynamic = 'force-dynamic';

const TAG_LABEL: Record<DishTag, string> = {
  vegetarian: 'Vegetarisch', vegan: 'Vegan', signature: 'Signature',
};

function MissingTranslations({ row, fields }: { row: object; fields: string[] }) {
  const source = row as Record<string, unknown>;
  const missing = (['es', 'en'] as const).filter((l) =>
    fields.some((f) => !String(source[`${f}_${l}`] ?? '').trim() && String(source[`${f}_de`] ?? '').trim()),
  );
  if (missing.length === 0) return null;
  return (
    <span style={{ font: 'var(--type-caption)', color: 'var(--state-notice)' }}>
      Übersetzung fehlt: {missing.map((l) => l.toUpperCase()).join(', ')}
    </span>
  );
}

export default async function AdminHome() {
  await requireSession();

  if (!hasDatabase) {
    return (
      <AdminShell active="karte">
        <Notice tone="danger" title="Keine Datenbank verbunden">
          Es ist keine <code>DATABASE_URL</code> gesetzt. Die Website zeigt gerade die mitgelieferte
          Beispielkarte an; Änderungen lassen sich erst speichern, wenn eine Neon-Datenbank
          eingerichtet und die Variable hinterlegt ist. Die Schritte stehen in der README.
        </Notice>
      </AdminShell>
    );
  }

  const [categories, dishes] = await Promise.all([listCategories(), listDishes()]);

  return (
    <AdminShell active="karte">
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 'var(--space-24)', flexWrap: 'wrap', marginBottom: 'var(--space-32)',
      }}>
        <div>
          <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: 0 }}>Speisekarte</h1>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 'var(--space-8) 0 0' }}>
            Änderungen sind sofort auf der Website sichtbar.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
          <Button variant="secondary" href="/admin/kategorie/neu">Kategorie anlegen</Button>
          <Button href="/admin/gericht/neu">Gericht anlegen</Button>
        </div>
      </div>

      {categories.length === 0 ? (
        <Notice tone="info" title="Noch keine Kategorien">
          Legen Sie zuerst eine Kategorie an — zum Beispiel „Vorspeisen“ — und danach die Gerichte darin.
        </Notice>
      ) : (
        categories.map((category, index) => (
          <CategoryBlock
            key={category.id}
            category={category}
            dishes={dishes.filter((d) => d.category_id === category.id)}
            isFirst={index === 0}
            isLast={index === categories.length - 1}
          />
        ))
      )}
    </AdminShell>
  );
}

function CategoryBlock({ category, dishes, isFirst, isLast }: {
  category: CategoryRow; dishes: DishRow[]; isFirst: boolean; isLast: boolean;
}) {
  return (
    <section style={{ marginBottom: 'var(--space-56)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 'var(--space-16)', flexWrap: 'wrap', marginBottom: 'var(--space-8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
          <h2 style={{ font: 'var(--type-section)', color: 'var(--text-heading)', margin: 0 }}>
            {category.name_de}
          </h2>
          {!category.is_published && <Tag>Ausgeblendet</Tag>}
          <MissingTranslations row={category} fields={['name', 'intro']} />
        </div>

        <div className="lr-admin-row__actions">
          <form action={shiftCategory} className="lr-inline-form">
            <input type="hidden" name="id" value={category.id} />
            <input type="hidden" name="direction" value="up" />
            <IconSubmit label="Kategorie nach oben" disabled={isFirst}>
              <Icon name="chevron-down" size={16} style={{ transform: 'rotate(180deg)' }} />
            </IconSubmit>
          </form>
          <form action={shiftCategory} className="lr-inline-form">
            <input type="hidden" name="id" value={category.id} />
            <input type="hidden" name="direction" value="down" />
            <IconSubmit label="Kategorie nach unten" disabled={isLast}>
              <Icon name="chevron-down" size={16} />
            </IconSubmit>
          </form>
          <Button size="sm" variant="secondary" href={`/admin/kategorie/${category.id}`}>Bearbeiten</Button>
          <form action={removeCategory} className="lr-inline-form">
            <input type="hidden" name="id" value={category.id} />
            <ConfirmSubmit message={`„${category.name_de}“ und alle ${dishes.length} Gerichte darin löschen?`}>
              Löschen
            </ConfirmSubmit>
          </form>
        </div>
      </div>

      <Rule variant="short" />

      <div style={{ marginTop: 'var(--space-16)' }}>
        {dishes.length === 0 ? (
          <p style={{ font: 'var(--type-body)', color: 'var(--text-faint)', margin: 0 }}>
            Noch keine Gerichte in dieser Kategorie.
          </p>
        ) : (
          dishes.map((dish, i) => (
            <div key={dish.id} className="lr-admin-row">
              <div className="lr-admin-row__body">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
                  <span style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)' }}>{dish.name_de}</span>
                  <span style={{
                    font: 'var(--type-price)', color: 'var(--text-muted)',
                    fontVariantNumeric: 'lining-nums tabular-nums',
                  }}>{dish.price}</span>
                  {!dish.is_published && <Tag>Ausgeblendet</Tag>}
                  {dish.is_highlight && <Tag tone="gold">Startseite</Tag>}
                  {dish.tags.map((t) => <Tag key={t} tone="sage">{TAG_LABEL[t as DishTag] ?? t}</Tag>)}
                </div>
                {dish.description_de && (
                  <p style={{
                    font: 'var(--type-body-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)',
                    color: 'var(--text-muted)', margin: 'var(--space-4) 0 0',
                  }}>{dish.description_de}</p>
                )}
                <MissingTranslations row={dish} fields={['name', 'description', 'origin']} />
              </div>

              <div className="lr-admin-row__actions">
                <form action={shiftDish} className="lr-inline-form">
                  <input type="hidden" name="id" value={dish.id} />
                  <input type="hidden" name="direction" value="up" />
                  <IconSubmit label="Gericht nach oben" disabled={i === 0}>
                    <Icon name="chevron-down" size={16} style={{ transform: 'rotate(180deg)' }} />
                  </IconSubmit>
                </form>
                <form action={shiftDish} className="lr-inline-form">
                  <input type="hidden" name="id" value={dish.id} />
                  <input type="hidden" name="direction" value="down" />
                  <IconSubmit label="Gericht nach unten" disabled={i === dishes.length - 1}>
                    <Icon name="chevron-down" size={16} />
                  </IconSubmit>
                </form>
                <Button size="sm" variant="secondary" href={`/admin/gericht/${dish.id}`}>Bearbeiten</Button>
                <form action={removeDish} className="lr-inline-form">
                  <input type="hidden" name="id" value={dish.id} />
                  <ConfirmSubmit message={`„${dish.name_de}“ löschen?`}>Löschen</ConfirmSubmit>
                </form>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 'var(--space-20)' }}>
        <Link href={`/admin/gericht/neu?kategorie=${category.id}`} style={{ font: 'var(--type-body-sm)' }}>
          Gericht zu „{category.name_de}“ hinzufügen
        </Link>
      </div>
    </section>
  );
}
