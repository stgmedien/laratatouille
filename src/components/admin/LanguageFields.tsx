'use client';

import { useState, type ReactNode } from 'react';
import { localeNames, locales, type Locale } from '@/lib/i18n/config';

/**
 * DE / ES / EN tabs over one form. All three panels stay in the DOM — only
 * their visibility changes — so a save always posts every language, whichever
 * tab happens to be open.
 */
export function LanguageFields({ render }: { render: (locale: Locale) => ReactNode }) {
  const [active, setActive] = useState<Locale>('de');

  return (
    <div>
      <div className="lr-langtabs" role="tablist" aria-label="Sprache">
        {locales.map((l) => (
          <button
            key={l} type="button" role="tab" aria-selected={l === active}
            aria-controls={`felder-${l}`} onClick={() => setActive(l)}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>

      {locales.map((l) => (
        <div
          key={l} id={`felder-${l}`} role="tabpanel" hidden={l !== active}
          style={{ display: l === active ? 'flex' : 'none', flexDirection: 'column', gap: 'var(--space-20)' }}
        >
          {render(l)}
        </div>
      ))}
    </div>
  );
}
