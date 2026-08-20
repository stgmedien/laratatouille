'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, Input, Notice, Textarea } from '@/components/ds';
import { saveSettings, type FormState } from '@/app/(admin)/admin/actions';
import type { MenuSettingsRow } from '@/lib/db/types';
import { localeNames } from '@/lib/i18n/config';
import { LanguageFields } from './LanguageFields';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" size="lg" disabled={pending}>{pending ? 'Speichert …' : 'Speichern'}</Button>;
}

export function SettingsForm({ settings, saved }: { settings: MenuSettingsRow; saved: boolean }) {
  const [state, action] = useActionState<FormState, FormData>(saveSettings, {});
  const s = settings as unknown as Record<string, string>;

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
      {state.error && <Notice tone="danger">{state.error}</Notice>}
      {saved && !state.error && <Notice tone="success">Gespeichert.</Notice>}

      <div className="lr-admin-card">
        <h2 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: '0 0 var(--space-8)' }}>
          Kopf der Kartenseite
        </h2>
        <p style={{ font: 'var(--type-body-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-24)' }}>
          Die Zeilen über der Karte. Hier steht zum Beispiel, aus welchem Monat sie stammt.
        </p>
        <LanguageFields
          render={(locale) => (
            <>
              <Input
                id={`eyebrow_${locale}`} name={`eyebrow_${locale}`}
                label={`Kleine Zeile (${localeNames[locale]})`} placeholder="Die Karte · September"
                defaultValue={s[`eyebrow_${locale}`] ?? ''}
              />
              <Input
                id={`title_${locale}`} name={`title_${locale}`}
                label={`Überschrift (${localeNames[locale]})`} placeholder="Was heute auf den Tisch kommt"
                defaultValue={s[`title_${locale}`] ?? ''}
              />
              <Textarea
                id={`intro_${locale}`} name={`intro_${locale}`}
                label={`Einleitung (${localeNames[locale]})`} rows={3}
                defaultValue={s[`intro_${locale}`] ?? ''}
              />
            </>
          )}
        />
      </div>

      <div className="lr-admin-card">
        <h2 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: '0 0 var(--space-8)' }}>
          Menüblock unter der Karte
        </h2>
        <p style={{ font: 'var(--type-body-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-24)' }}>
          Für das feste Menü. Bleiben beide Felder leer, verschwindet der Block von der Seite.
        </p>
        <LanguageFields
          render={(locale) => (
            <>
              <Input
                id={`set_menu_title_${locale}`} name={`set_menu_title_${locale}`}
                label={`Titel (${localeNames[locale]})`} placeholder="Mittelmeer-Menü, 6 Gänge"
                defaultValue={s[`set_menu_title_${locale}`] ?? ''}
              />
              <Textarea
                id={`set_menu_body_${locale}`} name={`set_menu_body_${locale}`}
                label={`Text (${localeNames[locale]})`} rows={3}
                placeholder="Donnerstags um 19:30, für den ganzen Tisch. 68 € pro Person."
                defaultValue={s[`set_menu_body_${locale}`] ?? ''}
              />
            </>
          )}
        />
      </div>

      <div><SubmitButton /></div>
    </form>
  );
}
