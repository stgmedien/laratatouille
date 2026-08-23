'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Button, Checkbox, Input, Notice, Textarea } from '@/components/ds';
import { saveMenu, type FormState } from '@/app/(admin)/admin/actions';
import type { MenuRow } from '@/lib/db/types';
import { localeNames } from '@/lib/i18n/config';
import { LanguageFields } from './LanguageFields';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" size="lg" disabled={pending}>{pending ? 'Speichert …' : 'Speichern'}</Button>;
}

export function MenuForm({ menu }: { menu: MenuRow | null }) {
  const [state, action] = useActionState<FormState, FormData>(saveMenu, {});
  const m = menu as unknown as Record<string, string> | null;

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
      <input type="hidden" name="id" value={menu?.id ?? 'neu'} />

      {state.error && <Notice tone="danger">{state.error}</Notice>}

      <div className="lr-admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
        <div className="lr-admin-form">
          <Input
            id="price" name="price" label="Preis" hint="z. B. 68 € pro Person"
            placeholder="68 € pro Person" defaultValue={menu?.price ?? ''}
          />
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Checkbox
              id="is_published" name="is_published" label="Auf der Website sichtbar"
              defaultChecked={menu ? menu.is_published : true}
            />
          </div>
        </div>
      </div>

      <div className="lr-admin-card">
        <LanguageFields
          render={(locale) => (
            <>
              <Input
                id={`title_${locale}`} name={`title_${locale}`}
                label={`Titel (${localeNames[locale]})`}
                hint={locale === 'de' ? 'Pflichtfeld' : 'leer = deutscher Text'}
                placeholder="Mittelmeer-Menü, 5 Gänge"
                defaultValue={m?.[`title_${locale}`] ?? ''}
              />
              <Textarea
                id={`intro_${locale}`} name={`intro_${locale}`} rows={2}
                label={`Einleitung (${localeNames[locale]})`} hint="optional, ein Satz"
                placeholder="Donnerstags ab 19:30, für den ganzen Tisch."
                defaultValue={m?.[`intro_${locale}`] ?? ''}
              />
              <Textarea
                id={`courses_${locale}`} name={`courses_${locale}`} rows={7}
                label={`Gänge (${localeNames[locale]})`}
                hint="ein Gang je Zeile"
                placeholder={'Bouillabaisse nach Art des Hauses\nCarpaccio de ternera\nPerlhuhnbrust\nCrema catalana'}
                defaultValue={m?.[`courses_${locale}`] ?? ''}
              />
            </>
          )}
        />
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
        <SubmitButton />
        <Link href="/admin/menues" style={{ font: 'var(--type-body-sm)' }}>Abbrechen</Link>
      </div>
    </form>
  );
}
