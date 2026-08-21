import { Suspense } from 'react';
import { Brand } from '@/components/site/Brand';
import { LoginForm } from '@/components/admin/LoginForm';

export default function LoginPage() {
  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--gutter)', background: 'var(--surface-page)',
    }}>
      <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Brand width={220} priority />
        </div>
        <div className="lr-admin-card">
          <h1 style={{
            font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: '0 0 var(--space-20)',
          }}>Verwaltung</h1>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
