'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Button, Checkbox, Input, Notice, Textarea } from '@/components/ds';
import { saveReview, type FormState } from '@/app/(admin)/admin/actions';
import type { ReviewRow } from '@/lib/db/types';

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
        Zitate werden in der Sprache angezeigt, in der sie geschrieben wurden — auf allen drei
        Sprachfassungen der Website. Bitte kürzen Sie auf einen Satz und ändern Sie den Wortlaut nicht.
      </Notice>

      <div className="lr-admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
        <Textarea
          id="quote" name="quote" label="Zitat" rows={3}
          hint="ohne Anführungszeichen — die setzt die Website"
          defaultValue={review?.quote ?? ''}
        />
        <div className="lr-admin-form">
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
