import Link from 'next/link';
import { Brand } from '@/components/site/Brand';
import { logout } from '@/app/(admin)/admin/actions';

export function AdminShell({ active, children }: {
  active: 'karte' | 'menues' | 'hinweise' | 'stimmen' | 'texte';
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="lr-admin-header">
        <div className="lr-container lr-admin-header__inner">
          <Link href="/admin" style={{ border: 'none', display: 'flex' }} aria-label="Verwaltung">
            <Brand tone="inverse" width={148} />
          </Link>

          <nav className="lr-admin-nav">
            <Link href="/admin" aria-current={active === 'karte' ? 'page' : undefined}>Karte</Link>
            <Link href="/admin/menues" aria-current={active === 'menues' ? 'page' : undefined}>Menüs</Link>
            <Link href="/admin/hinweise" aria-current={active === 'hinweise' ? 'page' : undefined}>Hinweise</Link>
            <Link href="/admin/stimmen" aria-current={active === 'stimmen' ? 'page' : undefined}>Gästestimmen</Link>
            <Link href="/admin/texte" aria-current={active === 'texte' ? 'page' : undefined}>Seitentexte</Link>
            <Link href="/de" target="_blank" rel="noreferrer">Website ansehen</Link>
            <form action={logout} className="lr-inline-form">
              <button
                type="submit"
                style={{
                  appearance: 'none', background: 'none', border: 0, cursor: 'pointer', padding: 0,
                  fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-medium)',
                  letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--sage-300)',
                }}
              >
                Abmelden
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="lr-container lr-admin-main">{children}</main>
    </>
  );
}
