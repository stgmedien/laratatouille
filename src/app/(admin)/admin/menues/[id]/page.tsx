import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { MenuForm } from '@/components/admin/MenuForm';
import { Notice } from '@/components/ds';
import { requireSession } from '@/lib/admin-session';
import { getMenu } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function MenuPage({ params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params;
  const isNew = id === 'neu';
  const menu = isNew ? null : await getMenu(Number(id));
  if (!isNew && !menu) notFound();

  return (
    <AdminShell active="menues">
      <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '0 0 var(--space-32)' }}>
        {isNew ? 'Neues Menü' : menu?.title_de}
      </h1>
      <MenuForm menu={menu} />
    </AdminShell>
  );
}
