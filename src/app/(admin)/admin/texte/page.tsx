import { AdminShell } from '@/components/admin/AdminShell';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { Notice } from '@/components/ds';
import { requireSession } from '@/lib/admin-session';
import { getSettings } from '@/lib/db/admin';
import { hasDatabase } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export default async function SettingsPage({ searchParams }: {
  searchParams: Promise<{ gespeichert?: string }>;
}) {
  await requireSession();

  if (!hasDatabase) {
    return (
      <AdminShell active="texte">
        <Notice tone="danger" title="Keine Datenbank verbunden">
          Ohne <code>DATABASE_URL</code> lassen sich die Texte nicht bearbeiten.
        </Notice>
      </AdminShell>
    );
  }

  const [settings, { gespeichert }] = await Promise.all([getSettings(), searchParams]);

  return (
    <AdminShell active="texte">
      <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: '0 0 var(--space-8)' }}>
        Seitentexte
      </h1>
      <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: '0 0 var(--space-32)' }}>
        Die freien Texte der Kartenseite. Alles andere auf der Website steht fest im Code.
      </p>
      <SettingsForm settings={settings} saved={gespeichert === '1'} />
    </AdminShell>
  );
}
