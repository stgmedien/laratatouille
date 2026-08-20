import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { DishForm } from '@/components/admin/DishForm';
import { Notice } from '@/components/ds';
import { requireSession } from '@/lib/admin-session';
import { getDish, listCategories } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function DishPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ kategorie?: string }>;
}) {
  await requireSession();

  if (!hasDatabase) {
    return (
      <AdminShell active="karte">
        <Notice tone="danger" title="Keine Datenbank verbunden">
          Ohne <code>DATABASE_URL</code> lassen sich keine Gerichte bearbeiten.
        </Notice>
      </AdminShell>
    );
  }

  const { id } = await params;
  const { kategorie } = await searchParams;
  const isNew = id === 'neu';

  const [categories, dish] = await Promise.all([
    listCategories(),
    isNew ? Promise.resolve(null) : getDish(Number(id)),
  ]);

  if (!isNew && !dish) notFound();

  if (categories.length === 0) {
    return (
      <AdminShell active="karte">
        <Notice tone="info" title="Zuerst eine Kategorie">
          Ein Gericht braucht eine Kategorie. Legen Sie zuerst eine an.
        </Notice>
      </AdminShell>
    );
  }

  return (
    <AdminShell active="karte">
      <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '0 0 var(--space-32)' }}>
        {isNew ? 'Neues Gericht' : dish?.name_de}
      </h1>
      <DishForm
        dish={dish}
        categories={categories}
        defaultCategoryId={kategorie ? Number(kategorie) : undefined}
      />
    </AdminShell>
  );
}
