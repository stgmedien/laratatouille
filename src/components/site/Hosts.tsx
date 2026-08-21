import { Rule } from '@/components/ds';
import type { Dictionary } from '@/lib/i18n';

type HostsStrings = Dictionary['house']['hosts'];

function Host({ name, role, body }: { name: string; role: string; body: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      <Rule variant="short" />
      <span style={{
        font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase', color: 'var(--text-accent)',
      }}>{role}</span>
      <h3 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: 0 }}>{name}</h3>
      <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 0, maxWidth: '38ch' }}>{body}</p>
    </div>
  );
}

/** The two people behind the house, side by side — kitchen and dining room. */
export function Hosts({ strings }: { strings: HostsStrings }) {
  return (
    <div className="lr-split" style={{ alignItems: 'start' }}>
      <Host {...strings.chef} />
      <Host {...strings.host} />
    </div>
  );
}
