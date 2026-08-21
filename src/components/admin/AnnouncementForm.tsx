'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Button, Checkbox, Input, Notice, Textarea } from '@/components/ds';
import { saveAnnouncement, type FormState } from '@/app/(admin)/admin/actions';
import type { AnnouncementRow } from '@/lib/db/types';
import { localeNames } from '@/lib/i18n/config';
import { LanguageFields } from './LanguageFields';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" size="lg" disabled={pending}>{pending ? 'Speichert …' : 'Speichern'}</Button>;
}

export function AnnouncementForm({ announcement }: { announcement: AnnouncementRow | null }) {
  const [state, action] = useActionState<FormState, FormData>(saveAnnouncement, {});
  const a = announcement as unknown as Record<string, string> | null;

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
      <input type="hidden" name="id" value={announcement?.id ?? 'neu'} />

      {state.error && <Notice tone="danger">{state.error}</Notice>}

      <div className="lr-admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
        <div className="lr-admin-form">
          <Input
            id="starts_on" name="starts_on" type="date" label="Anzeigen ab"
            hint="leer = sofort" defaultValue={announcement?.starts_on ?? ''}
          />
          <Input
            id="ends_on" name="ends_on" type="date" label="Anzeigen bis"
            hint="leer = bis auf Weiteres" defaultValue={announcement?.ends_on ?? ''}
          />
        </div>
        <Checkbox
          id="is_published" name="is_published" label="Aktiv"
          description="Mit Datum verschwindet der Hinweis von allein — dieses Häkchen schaltet ihn sofort ab."
          defaultChecked={announcement ? announcement.is_published : true}
        />
      </div>

      <div className="lr-admin-card">
        <LanguageFields
          render={(locale) => (
            <Textarea
              id={`text_${locale}`} name={`text_${locale}`} rows={3}
              label={`Text (${localeNames[locale]})`}
              hint={locale === 'de' ? 'Pflichtfeld — ein Satz' : 'leer = deutscher Text'}
              placeholder="Vom 1. bis 14. September bleibt das Haus geschlossen."
              defaultValue={a?.[`text_${locale}`] ?? ''}
            />
          )}
        />
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
        <SubmitButton />
        <Link href="/admin/hinweise" style={{ font: 'var(--type-body-sm)' }}>Abbrechen</Link>
      </div>
    </form>
  );
}
