import type { CSSProperties } from 'react';
import { Tag } from './Tag';

export interface MenuItemProps {
  name: string;
  description?: string | null;
  price: string;
  tags?: { label: string; tone: 'sage' | 'gold' }[];
  origin?: string | null;
  style?: CSSProperties;
}

/** The dish row: name, dotted leader, price, tags, provenance. */
export function MenuItem({ name, description, price, tags = [], origin, style }: MenuItemProps) {
  return (
    <article style={{
      display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', padding: 'var(--space-20) 0',
      borderBottom: '1px solid var(--border-hairline)', ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-12)' }}>
        <h3 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: 0 }}>{name}</h3>
        <span aria-hidden="true" style={{
          flex: 1, minWidth: 12, borderBottom: '1px dotted var(--border-strong)',
          opacity: 0.5, transform: 'translateY(-4px)',
        }} />
        <span style={{
          font: 'var(--type-price)', color: 'var(--text-heading)',
          fontVariantNumeric: 'lining-nums tabular-nums', whiteSpace: 'nowrap',
        }}>{price}</span>
      </div>
      {description && (
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 0, maxWidth: '58ch' }}>{description}</p>
      )}
      {(tags.length > 0 || origin) && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-8)', flexWrap: 'wrap',
          marginTop: 'var(--space-4)',
        }}>
          {tags.map((t) => <Tag key={t.label} tone={t.tone}>{t.label}</Tag>)}
          {origin && (
            <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', fontStyle: 'italic' }}>{origin}</span>
          )}
        </div>
      )}
    </article>
  );
}
