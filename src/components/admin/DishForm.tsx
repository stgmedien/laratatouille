'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Button, Checkbox, Input, Notice, Select, Textarea } from '@/components/ds';
import { saveDish, type FormState } from '@/app/(admin)/admin/actions';
import type { CategoryRow, DishRow } from '@/lib/db/types';
import { localeNames } from '@/lib/i18n/config';
import { LanguageFields } from './LanguageFields';

const TAGS = [
  { key: 'vegetarian', label: 'Vegetarisch' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'signature', label: 'Signature' },
] as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" size="lg" disabled={pending}>{pending ? 'Speichert …' : 'Speichern'}</Button>;
}

export function DishForm({ dish, categories, defaultCategoryId }: {
  dish: DishRow | null; categories: CategoryRow[]; defaultCategoryId?: number;
}) {
  const [state, action] = useActionState<FormState, FormData>(saveDish, {});
  const d = dish as unknown as Record<string, string> | null;

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
      <input type="hidden" name="id" value={dish?.id ?? 'neu'} />

      {state.error && <Notice tone="danger">{state.error}</Notice>}

      <div className="lr-admin-card">
        <div className="lr-admin-form">
          <Select
            id="category_id" name="category_id" label="Kategorie"
            defaultValue={String(dish?.category_id ?? defaultCategoryId ?? categories[0]?.id ?? '')}
            options={categories.map((c) => ({ value: String(c.id), label: c.name_de }))}
          />
          <Input
            id="price" name="price" label="Preis" hint="z. B. 16 € oder 5,50 € / 28 €"
            defaultValue={dish?.price ?? ''} placeholder="16 €"
          />

          <div className="lr-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span style={{
              font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>Kennzeichnungen</span>
            <div style={{ display: 'flex', gap: 'var(--space-24)', flexWrap: 'wrap' }}>
              {TAGS.map((t) => (
                <Checkbox
                  key={t.key} id={`tag_${t.key}`} name={`tag_${t.key}`} label={t.label}
                  defaultChecked={dish?.tags?.includes(t.key)}
                />
              ))}
            </div>
          </div>

          <div className="lr-span-2" style={{ display: 'flex', gap: 'var(--space-32)', flexWrap: 'wrap' }}>
            <Checkbox
              id="is_published" name="is_published" label="Auf der Website sichtbar"
              defaultChecked={dish ? dish.is_published : true}
            />
            <Checkbox
              id="is_highlight" name="is_highlight" label="Auf der Startseite zeigen"
              description="Startseite zeigt bis zu vier markierte Gerichte."
              defaultChecked={dish?.is_highlight ?? false}
            />
          </div>
        </div>
      </div>

      <div className="lr-admin-card">
        <LanguageFields
          render={(locale) => (
            <>
              <Input
                id={`name_${locale}`} name={`name_${locale}`}
                label={`Name (${localeNames[locale]})`}
                hint={locale === 'de' ? 'Pflichtfeld' : 'leer = deutscher Text'}
                defaultValue={d?.[`name_${locale}`] ?? ''}
              />
              <Textarea
                id={`description_${locale}`} name={`description_${locale}`}
                label={`Beschreibung (${localeNames[locale]})`} rows={3}
                hint="Ein Satz: was auf dem Teller liegt, in der Reihenfolge, in der man es trifft."
                defaultValue={d?.[`description_${locale}`] ?? ''}
              />
              <Input
                id={`origin_${locale}`} name={`origin_${locale}`}
                label={`Herkunft (${localeNames[locale]})`} hint="optional"
                placeholder="Fisch aus der Lonja de Dénia"
                defaultValue={d?.[`origin_${locale}`] ?? ''}
              />
            </>
          )}
        />
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
        <SubmitButton />
        <Link href="/admin" style={{ font: 'var(--type-body-sm)' }}>Abbrechen</Link>
      </div>
    </form>
  );
}
