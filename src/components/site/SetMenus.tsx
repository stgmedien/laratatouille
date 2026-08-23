import { Rule } from '@/components/ds';
import type { LocalisedMenu } from '@/lib/db/types';

/**
 * Feste Menüs unter der Karte. Die Gänge stehen untereinander, getrennt von
 * feinen Linien — wie auf einer gedruckten Menükarte, ohne Aufzählungspunkte.
 */
export function SetMenus({ menus }: { menus: LocalisedMenu[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-56)' }}>
      {menus.map((menu) => (
        <article key={menu.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-16)', flexWrap: 'wrap' }}>
            <h3 style={{ font: 'var(--type-section)', color: 'var(--text-heading)', margin: 0 }}>
              {menu.title}
            </h3>
            {menu.price && (
              <span style={{
                font: 'var(--type-price)', color: 'var(--text-muted)',
                fontVariantNumeric: 'lining-nums tabular-nums', whiteSpace: 'nowrap',
              }}>{menu.price}</span>
            )}
          </div>

          <Rule variant="short" />

          {menu.intro && (
            <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 0, maxWidth: '52ch' }}>
              {menu.intro}
            </p>
          )}

          {menu.courses.length > 0 && (
            <ol style={{
              listStyle: 'none', margin: 'var(--space-8) 0 0', padding: 0,
              display: 'flex', flexDirection: 'column',
            }}>
              {menu.courses.map((course, i) => (
                <li
                  key={i}
                  style={{
                    font: 'var(--type-subhead)', color: 'var(--text-heading)',
                    padding: 'var(--space-12) 0',
                    borderTop: i === 0 ? 'none' : '1px solid var(--border-hairline)',
                  }}
                >
                  {course}
                </li>
              ))}
            </ol>
          )}
        </article>
      ))}
    </div>
  );
}
