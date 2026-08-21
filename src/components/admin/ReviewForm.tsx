'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Button, Checkbox, Input, Notice, Select, Textarea } from '@/components/ds';
import { saveReview, type FormState } from '@/app/(admin)/admin/actions';
import type { ReviewRow } from '@/lib/db/types';
import { localeNames, locales } from '@/lib/i18n/config';
import { LanguageFields } from './LanguageFields';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" size="lg" disabled={pending}>{pending ? 'Speichert …' : 'Speichern'}</Button>;
}

export function ReviewForm({ review }: { review: ReviewRow | null }) {
  const [state, action] = useActionState<FormState, FormData>(saveReview, {});

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
      <input type="hidden" name="id" value={review?.id ?? 'neu'} />

      {state.error && <Notice tone="danger">{state.error}</Notice>}

      <Notice tone="info">
        Tragen Sie das Zitat in der Sprache ein, in der der Gast geschrieben hat, und wählen Sie
        diese Sprache unten aus. Die Übersetzungen zeigt die Website mit dem Zusatz „übersetzt“ an —
        so steht niemandem etwas im Mund, das er nicht gesagt hat. Bleibt eine Sprache leer, wird
        dort der deutsche Text gezeigt.
      </Notice>

      <div className="lr-admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
        <LanguageFields
          render={(locale) => (
            <Textarea
              id={`quote_${locale}`} name={`quote_${locale}`} rows={3}
              label={`Zitat (${localeNames[locale]})`}
              hint="ohne Anführungszeichen — die setzt die Website"
              defaultValue={(review as unknown as Record<string, string> | null)?.[`quote_${locale}`] ?? ''}
            />
          )}
        />
        <div className="lr-admin-form">
          <Select
            id="original_lang" name="original_lang" label="Originalsprache"
            hint="so hat der Gast geschrieben"
            defaultValue={review?.original_lang ?? 'de'}
            options={locales.map((l) => ({ value: l, label: localeNames[l] }))}
          />
          <Input
            id="author" name="author" label="Name" placeholder="Neal B."
            hint="wie im Profil angezeigt" defaultValue={review?.author ?? ''}
          />
          <Input
            id="source" name="source" label="Quelle" placeholder="Google"
            defaultValue={review?.source ?? 'Google'}
          />
        </div>
        <Checkbox
          id="is_published" name="is_published" label="Auf der Website sichtbar"
          defaultChecked={review ? review.is_published : true}
        />
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' }}>
        <SubmitButton />
        <Link href="/admin/stimmen" style={{ font: 'var(--type-body-sm)' }}>Abbrechen</Link>
      </div>
    </form>
  );
}
