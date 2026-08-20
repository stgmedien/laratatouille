import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { ReviewForm } from '@/components/admin/ReviewForm';
import { Notice } from '@/components/ds';
import { requireSession } from '@/lib/admin-session';
import { getReview } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params;
  const isNew = id === 'neu';
  const review = isNew ? null : await getReview(Number(id));
  if (!isNew && !review) notFound();

  return (
    <AdminShell active="stimmen">
      <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '0 0 var(--space-32)' }}>
        {isNew ? 'Neue Gästestimme' : review?.author || 'Gästestimme'}
      </h1>
      <ReviewForm review={review} />
    </AdminShell>
  );
}
