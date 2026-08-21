import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { AnnouncementForm } from '@/components/admin/AnnouncementForm';
import { Notice } from '@/components/ds';
import { requireSession } from '@/lib/admin-session';
import { getAnnouncement } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function AnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params;
  const isNew = id === 'neu';
  const announcement = isNew ? null : await getAnnouncement(Number(id));
  if (!isNew && !announcement) notFound();

  return (
    <AdminShell active="hinweise">
      <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '0 0 var(--space-32)' }}>
        {isNew ? 'Neuer Hinweis' : 'Hinweis bearbeiten'}
      </h1>
      <AnnouncementForm announcement={announcement} />
    </AdminShell>
  );
}
