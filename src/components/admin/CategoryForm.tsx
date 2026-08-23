'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Button, Checkbox, Input, Notice, Textarea } from '@/components/ds';
import { saveCategory, type FormState } from '@/app/(admin)/admin/actions';
import type { CategoryRow } from '@/lib/db/types';
import { localeNames } from '@/lib/i18n/config';
import { LanguageFields } from './LanguageFields';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" size="lg" disabled={pending}>{pending ? 'Speichert …' : 'Speichern'}</Button>;
}

export function CategoryForm({ category }: { category: CategoryRow | null }) {
  const [state, action] = useActionState<FormState, FormData>(saveCategory, {});
  const c = category as unknown as Record<string, string> | null;

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
      <input type="hidden" name="id" value={category?.id ?? 'neu'} />

      {state.error && <Notice tone="danger">{state.error}</Notice>}

      <div className="lr-admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <Checkbox
          id="is_published" name="is_published" label="Auf der Website sichtbar"
          defaultChecked={category ? category.is_published : true}
        />
        <Checkbox
          id="starts_print_page" name="starts_print_page" label="Beim Ausdruck auf einer neuen Karte beginnen"
          description="Der Ausdruck teilt die Karte in schmale Blätter. Ohne Häkchen läuft diese Kategorie auf der vorherigen Karte weiter."
          defaultChecked={category?.starts_print_page ?? false}
        />
      </div>

      <div className="lr-admin-card">
        <LanguageFields
          render={(locale) => (
            <>
              <Input
                id={`name_${locale}`} name={`name_${locale}`}
                label={`Name (${localeNames[locale]})`}
                hint={locale === 'de' ? 'Pflichtfeld' : 'leer = deutscher Text'}
                placeholder="Vorspeisen"
                defaultValue={c?.[`name_${locale}`] ?? ''}
              />
              <Textarea
                id={`intro_${locale}`} name={`intro_${locale}`}
                label={`Einleitung (${localeNames[locale]})`} rows={2} hint="optional"
                placeholder="Glas / Flasche. Die ganze Karte liegt am Tisch."
                defaultValue={c?.[`intro_${locale}`] ?? ''}
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
