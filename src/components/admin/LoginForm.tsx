'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { Button, Input, Notice } from '@/components/ds';
import { login, type LoginState } from '@/app/(admin)/admin/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" fullWidth size="lg" disabled={pending}>{pending ? 'Moment …' : 'Anmelden'}</Button>;
}

export function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(login, {});
  const next = useSearchParams().get('next') ?? '/admin';

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
      <input type="hidden" name="next" value={next} />
      {state.error && <Notice tone="danger">{state.error}</Notice>}
      <Input
        id="password" name="password" type="password" label="Passwort"
        autoComplete="current-password" required autoFocus
      />
      <SubmitButton />
    </form>
  );
}
