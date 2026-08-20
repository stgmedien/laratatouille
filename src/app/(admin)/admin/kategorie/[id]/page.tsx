import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { Notice } from '@/components/ds';
import { requireSession } from '@/lib/admin-session';
import { getCategory } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();

  if (!hasDatabase) {
    return (
      <AdminShell active="karte">
        <Notice tone="danger" title="Keine Datenbank verbunden">
          Ohne <code>DATABASE_URL</code> lassen sich keine Kategorien bearbeiten.
        </Notice>
      </AdminShell>
    );
  }

  const { id } = await params;
  const isNew = id === 'neu';
  const category = isNew ? null : await getCategory(Number(id));
  if (!isNew && !category) notFound();

  return (
    <AdminShell active="karte">
      <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '0 0 var(--space-32)' }}>
        {isNew ? 'Neue Kategorie' : category?.name_de}
      </h1>
      <CategoryForm category={category} />
    </AdminShell>
  );
}
