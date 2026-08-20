import { Button, Icon, Notice, Tag } from '@/components/ds';
import { AdminShell } from '@/components/admin/AdminShell';
import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { IconSubmit } from '@/components/admin/IconSubmit';
import { requireSession } from '@/lib/admin-session';
import { listReviews } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';
import { HOUSE } from '@/lib/house';
import { removeReview, shiftReview } from '../actions';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  await requireSession();

  if (!hasDatabase) {
    return (
      <AdminShell active="stimmen">
        <Notice tone="danger" title="Keine Datenbank verbunden">
          Ohne <code>DATABASE_URL</code> lassen sich die Gästestimmen nicht bearbeiten.
        </Notice>
      </AdminShell>
    );
  }

  const reviews = await listReviews();

  return (
    <AdminShell active="stimmen">
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 'var(--space-24)', flexWrap: 'wrap', marginBottom: 'var(--space-32)',
      }}>
        <div>
          <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: 0 }}>Gästestimmen</h1>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 'var(--space-8) 0 0', maxWidth: '58ch' }}>
            Die Startseite zeigt die ersten drei, die Seite „Das Haus“ die erste.
            Zitate erscheinen in ihrer Originalsprache.
          </p>
        </div>
        <Button href="/admin/stimmen/neu">Stimme anlegen</Button>
      </div>

      <Notice tone="notice" style={{ marginBottom: 'var(--space-32)' }}>
        Diese Auszüge wurden aus öffentlichen Bewertungen übernommen. Bitte gleichen Sie sie einmal
        mit Ihrem Profil ab (<a href={HOUSE.reviewsUrl} target="_blank" rel="noreferrer noopener">Profil öffnen</a>)
        und löschen Sie, was Sie nicht veröffentlichen möchten.
      </Notice>

      {reviews.length === 0 ? (
        <Notice tone="info" title="Noch keine Gästestimmen">
          Legen Sie eine an — der Abschnitt auf der Startseite erscheint erst, wenn mindestens eine
          sichtbare Stimme hinterlegt ist.
        </Notice>
      ) : (
        reviews.map((review, i) => (
          <div key={review.id} className="lr-admin-row">
            <div className="lr-admin-row__body">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
                <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                  {review.author}{review.source ? ` · ${review.source}` : ''}
                </span>
                {!review.is_published && <Tag>Ausgeblendet</Tag>}
                {i < 3 && review.is_published && <Tag tone="gold">Startseite</Tag>}
              </div>
              <p style={{
                font: 'var(--fw-regular) var(--fs-h4)/1.45 var(--font-display)',
                color: 'var(--text-heading)', margin: 'var(--space-4) 0 0', maxWidth: '58ch',
              }}>
                {`“${review.quote}”`}
              </p>
            </div>

            <div className="lr-admin-row__actions">
              <form action={shiftReview} className="lr-inline-form">
                <input type="hidden" name="id" value={review.id} />
                <input type="hidden" name="direction" value="up" />
                <IconSubmit label="Nach oben" disabled={i === 0}>
                  <Icon name="chevron-down" size={16} style={{ transform: 'rotate(180deg)' }} />
                </IconSubmit>
              </form>
              <form action={shiftReview} className="lr-inline-form">
                <input type="hidden" name="id" value={review.id} />
                <input type="hidden" name="direction" value="down" />
                <IconSubmit label="Nach unten" disabled={i === reviews.length - 1}>
                  <Icon name="chevron-down" size={16} />
                </IconSubmit>
              </form>
              <Button size="sm" variant="secondary" href={`/admin/stimmen/${review.id}`}>Bearbeiten</Button>
              <form action={removeReview} className="lr-inline-form">
                <input type="hidden" name="id" value={review.id} />
                <ConfirmSubmit message={`Die Stimme von ${review.author || 'diesem Gast'} löschen?`}>
                  Löschen
                </ConfirmSubmit>
              </form>
            </div>
          </div>
        ))
      )}
    </AdminShell>
  );
}
