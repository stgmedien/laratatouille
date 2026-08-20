import React from 'react';
import { Tag } from '../core/Tag.jsx';

export function MenuItem({ name, description, price, tags = [], origin, style }) {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', padding: 'var(--space-20) 0', borderBottom: '1px solid var(--border-hairline)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-12)' }}>
        <h3 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: 0 }}>{name}</h3>
        <span style={{ flex: 1, borderBottom: '1px dotted var(--border-strong)', opacity: 0.5, transform: 'translateY(-4px)' }} />
        <span style={{ font: 'var(--type-price)', color: 'var(--text-heading)', fontVariantNumeric: 'lining-nums tabular-nums' }}>{price}</span>
      </div>
      {description && (
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 0, maxWidth: '58ch' }}>{description}</p>
      )}
      {(tags.length > 0 || origin) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
          {tags.map((t) => <Tag key={t} tone="sage">{t}</Tag>)}
          {origin && <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', fontStyle: 'italic' }}>{origin}</span>}
        </div>
      )}
    </article>
  );
}
