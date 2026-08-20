'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, Checkbox, Input, Notice, Select, Textarea } from '@/components/ds';
import { submitReservation, type ReservationState } from '@/lib/actions/reservation';
import { RESERVATION_TIMES } from '@/lib/house';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

type ReserveStrings = Dictionary['reserve'];

const INITIAL: ReservationState = { status: 'idle' };

/** Today in the browser's own calendar, as the min= value for the date field. */
function today(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function SubmitButton({ t }: { t: ReserveStrings['form'] }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? t.sending : t.submit}
    </Button>
  );
}

export function ReservationForm({ locale, strings, privacyHref, privacyLabel }: {
  locale: Locale; strings: ReserveStrings; privacyHref: string; privacyLabel: string;
}) {
  const [state, action] = useActionState(submitReservation, INITIAL);
  const t = strings.form;
  const v = state.values ?? {};

  if (state.status === 'success') {
    return (
      <Notice tone="success" title={strings.success.title}>
        {strings.success.body}
      </Notice>
    );
  }

  const guestOptions = Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    return { value: String(n), label: `${n} ${n === 1 ? t.guestsOne : t.guestsMany}` };
  });

  return (
    <form action={action} className="lr-form-grid" noValidate>
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — hidden from people, tempting for bots. */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {state.message && (
        <div className="lr-span-2">
          <Notice tone="danger">{state.message}</Notice>
        </div>
      )}

      <Input
        id="r-name" name="name" label={t.name} placeholder={t.namePlaceholder}
        autoComplete="name" required defaultValue={v.name} error={state.fieldErrors?.name}
      />
      <Input
        id="r-mail" name="email" type="email" label={t.email} hint={t.emailHint}
        placeholder={t.emailPlaceholder} autoComplete="email" required
        defaultValue={v.email} error={state.fieldErrors?.email}
      />
      <Input
        id="r-date" name="date" type="date" label={t.date} min={today()}
        required defaultValue={v.date} error={state.fieldErrors?.date}
      />
      <Select
        id="r-time" name="time" label={t.time} hint={t.timeHint}
        options={[...RESERVATION_TIMES]} defaultValue={v.time ?? '20:00'}
        error={state.fieldErrors?.time}
      />
      <Select id="r-guests" name="guests" label={t.guests} options={guestOptions} defaultValue={v.guests ?? '2'} />
      <Input
        id="r-phone" name="phone" type="tel" label={t.phone} hint={t.phoneHint}
        placeholder="+34 …" autoComplete="tel" defaultValue={v.phone}
      />

      <Textarea
        id="r-notes" name="notes" label={t.notes} hint={t.notesHint} rows={4}
        placeholder={t.notesPlaceholder} defaultValue={v.notes}
        style={{ gridColumn: '1 / -1' }}
      />

      <div className="lr-span-2">
        <Checkbox id="r-privacy" name="privacy" label={t.privacy} />
        {state.fieldErrors?.privacy && (
          <span style={{ font: 'var(--type-caption)', color: 'var(--state-danger)' }}>
            {state.fieldErrors.privacy}
          </span>
        )}
        <p style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', margin: 'var(--space-8) 0 0' }}>
          <a href={privacyHref}>{privacyLabel}</a>
        </p>
      </div>

      <div className="lr-span-2" style={{
        display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap',
      }}>
        <SubmitButton t={t} />
        <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{t.groupsHint}</span>
      </div>
    </form>
  );
}
