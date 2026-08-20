'use client';

import { Button } from '@/components/ds';

/** Guests print or save the menu — the print styles strip everything but it. */
export function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="ghost" size="sm" onClick={() => window.print()}>
      {label}
    </Button>
  );
}
