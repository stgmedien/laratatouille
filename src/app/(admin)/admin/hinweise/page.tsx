import { Button, Icon, Notice, Tag } from '@/components/ds';
import { AdminShell } from '@/components/admin/AdminShell';
import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { IconSubmit } from '@/components/admin/IconSubmit';
import { requireSession } from '@/lib/admin-session';
import { listAnnouncements } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';
import type { AnnouncementRow } from '@/lib/db/types';
import { removeAnnouncement, shiftAnnouncement } from '../actions';

export const dynamic = 'force-dynamic';

/** Today in Spain, as YYYY-MM-DD — the same yardstick the website uses. */
function todayInSpain(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .format(new Date(`${iso}T12:00:00`));
}

type Status = { label: string; tone: 'gold' | 'sage' | 'neutral' };

function statusOf(a: AnnouncementRow, today: string): Status {
  if (!a.is_published) return { label: 'Abgeschaltet', tone: 'neutral' };
  if (a.ends_on && a.ends_on < today) return { label: 'Abgelaufen', tone: 'neutral' };
  if (a.starts_on && a.starts_on > today) return { label: `Ab ${formatDate(a.starts_on)}`, tone: 'sage' };
  return { label: 'Läuft', tone: 'gold' };
}

function periodOf(a: AnnouncementRow): string {
  if (a.starts_on && a.ends_on) return `${formatDate(a.starts_on)} – ${formatDate(a.ends_on)}`;
  if (a.starts_on) return `ab ${formatDate(a.starts_on)}`;
  if (a.ends_on) return `bis ${formatDate(a.ends_on)}`;
  return 'ohne Zeitraum';
}

export default async function AnnouncementsPage() {
  await requireSession();

  if (!hasDatabase) {
    return (
      <AdminShell active="hinweise">
        <Notice tone="danger" title="Keine Datenbank verbunden">
          Ohne <code>DATABASE_URL</code> lassen sich keine Hinweise bearbeiten.
        </Notice>
      </AdminShell>
    );
  }

  const announcements = await listAnnouncements();
  const today = todayInSpain();
  const running = announcements.findIndex((a) => statusOf(a, today).label === 'Läuft');

  return (
    <AdminShell active="hinweise">
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 'var(--space-24)', flexWrap: 'wrap', marginBottom: 'var(--space-32)',
      }}>
        <div>
          <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: 0 }}>Hinweise</h1>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 'var(--space-8) 0 0', maxWidth: '62ch' }}>
            Ein Banner über der Website — für eine Schließung, geänderte Zeiten, einen besonderen
            Abend. Mit Datum erscheint und verschwindet er von allein.
          </p>
        </div>
        <Button href="/admin/hinweise/neu">Hinweis anlegen</Button>
      </div>

      {announcements.length === 0 ? (
        <Notice tone="info" title="Kein Hinweis hinterlegt">
          Die Website zeigt gerade kein Banner. Legen Sie einen Hinweis an, wenn Sie einen brauchen —
          zum Beispiel für den Sommerurlaub. Das Datum können Sie Wochen im Voraus eintragen.
        </Notice>
      ) : (
        <>
          <Notice tone="info" style={{ marginBottom: 'var(--space-32)' }}>
            Es wird immer nur der oberste Hinweis angezeigt, der gerade läuft. Alles darunter wartet.
          </Notice>

          {announcements.map((a, i) => {
            const status = statusOf(a, today);
            return (
              <div key={a.id} className="lr-admin-row">
                <div className="lr-admin-row__body">
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
                    <Tag tone={status.tone}>{status.label}</Tag>
                    <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{periodOf(a)}</span>
                    {i === running && <Tag tone="pine">Auf der Website</Tag>}
                  </div>
                  <p style={{
                    font: 'var(--fw-regular) var(--fs-h4)/1.45 var(--font-display)',
                    color: 'var(--text-heading)', margin: 'var(--space-4) 0 0', maxWidth: '62ch',
                  }}>
                    {a.text_de}
                  </p>
                  {(!a.text_es || !a.text_en) && (
                    <span style={{ font: 'var(--type-caption)', color: 'var(--state-notice)' }}>
                      Übersetzung fehlt: {[!a.text_es && 'ES', !a.text_en && 'EN'].filter(Boolean).join(', ')}
                    </span>
                  )}
                </div>

                <div className="lr-admin-row__actions">
                  <form action={shiftAnnouncement} className="lr-inline-form">
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="direction" value="up" />
                    <IconSubmit label="Nach oben" disabled={i === 0}>
                      <Icon name="chevron-down" size={16} style={{ transform: 'rotate(180deg)' }} />
                    </IconSubmit>
                  </form>
                  <form action={shiftAnnouncement} className="lr-inline-form">
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="direction" value="down" />
                    <IconSubmit label="Nach unten" disabled={i === announcements.length - 1}>
                      <Icon name="chevron-down" size={16} />
                    </IconSubmit>
                  </form>
                  <Button size="sm" variant="secondary" href={`/admin/hinweise/${a.id}`}>Bearbeiten</Button>
                  <form action={removeAnnouncement} className="lr-inline-form">
                    <input type="hidden" name="id" value={a.id} />
                    <ConfirmSubmit message="Diesen Hinweis löschen?">Löschen</ConfirmSubmit>
                  </form>
                </div>
              </div>
            );
          })}
        </>
      )}
    </AdminShell>
  );
}
