import { Button, Icon, Notice, Tag } from '@/components/ds';
import { AdminShell } from '@/components/admin/AdminShell';
import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { IconSubmit } from '@/components/admin/IconSubmit';
import { requireSession } from '@/lib/admin-session';
import { listMenus } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';
import { locales } from '@/lib/i18n/config';
import type { MenuRow } from '@/lib/db/types';
import { removeMenu, shiftMenu } from '../actions';

export const dynamic = 'force-dynamic';

function missingLanguages(menu: MenuRow): string[] {
  const row = menu as unknown as Record<string, string>;
  return locales.filter((l) => l !== 'de' && !row[`title_${l}`]?.trim()).map((l) => l.toUpperCase());
}

export default async function MenusPage() {
  await requireSession();

  if (!hasDatabase) {
    return (
      <AdminShell active="menues">
        <Notice tone="danger" title="Keine Datenbank verbunden">
          Ohne <code>DATABASE_URL</code> lassen sich keine Menüs bearbeiten.
        </Notice>
      </AdminShell>
    );
  }

  const menus = await listMenus();

  return (
    <AdminShell active="menues">
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 'var(--space-24)', flexWrap: 'wrap', marginBottom: 'var(--space-32)',
      }}>
        <div>
          <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: 0 }}>Menüs</h1>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 'var(--space-8) 0 0', maxWidth: '62ch' }}>
            Feste Menüs stehen auf der Kartenseite unter den Gerichten. Die Gänge tragen Sie
            zeilenweise ein — eine Zeile, ein Gang.
          </p>
        </div>
        <Button href="/admin/menues/neu">Menü anlegen</Button>
      </div>

      {menus.length === 0 ? (
        <Notice tone="info" title="Kein Menü hinterlegt">
          Die Kartenseite zeigt gerade nur die einzelnen Gerichte. Legen Sie ein Menü an, wenn Sie
          eines anbieten — etwa ein Überraschungsmenü für den ganzen Tisch.
        </Notice>
      ) : (
        menus.map((menu, i) => {
          const missing = missingLanguages(menu);
          const courses = menu.courses_de.split('\n').map((c) => c.trim()).filter(Boolean);
          return (
            <div key={menu.id} className="lr-admin-row">
              <div className="lr-admin-row__body">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
                  <span style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)' }}>{menu.title_de}</span>
                  {menu.price && (
                    <span style={{
                      font: 'var(--type-price)', color: 'var(--text-muted)',
                      fontVariantNumeric: 'lining-nums tabular-nums',
                    }}>{menu.price}</span>
                  )}
                  {!menu.is_published && <Tag>Ausgeblendet</Tag>}
                  <Tag tone="sage">{courses.length} {courses.length === 1 ? 'Gang' : 'Gänge'}</Tag>
                </div>
                {menu.intro_de && (
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)',
                    color: 'var(--text-muted)', margin: 'var(--space-4) 0 0',
                  }}>{menu.intro_de}</p>
                )}
                {missing.length > 0 && (
                  <span style={{ font: 'var(--type-caption)', color: 'var(--state-notice)' }}>
                    Übersetzung fehlt: {missing.join(', ')}
                  </span>
                )}
              </div>

              <div className="lr-admin-row__actions">
                <form action={shiftMenu} className="lr-inline-form">
                  <input type="hidden" name="id" value={menu.id} />
                  <input type="hidden" name="direction" value="up" />
                  <IconSubmit label="Nach oben" disabled={i === 0}>
                    <Icon name="chevron-down" size={16} style={{ transform: 'rotate(180deg)' }} />
                  </IconSubmit>
                </form>
                <form action={shiftMenu} className="lr-inline-form">
                  <input type="hidden" name="id" value={menu.id} />
                  <input type="hidden" name="direction" value="down" />
                  <IconSubmit label="Nach unten" disabled={i === menus.length - 1}>
                    <Icon name="chevron-down" size={16} />
                  </IconSubmit>
                </form>
                <Button size="sm" variant="secondary" href={`/admin/menues/${menu.id}`}>Bearbeiten</Button>
                <form action={removeMenu} className="lr-inline-form">
                  <input type="hidden" name="id" value={menu.id} />
                  <ConfirmSubmit message={`„${menu.title_de}“ löschen?`}>Löschen</ConfirmSubmit>
                </form>
              </div>
            </div>
          );
        })
      )}
    </AdminShell>
  );
}
