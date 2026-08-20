import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';
import { Button } from '../core/Button.jsx';
import { IconButton } from '../core/IconButton.jsx';

export function NavBar({ links = [], activeHref, cta, tone = 'light', sticky = true, onNavigate, style }) {
  const dark = tone === 'dark';
  return (
    <header style={{
      position: sticky ? 'sticky' : 'relative', top: 0, zIndex: 40,
      background: dark ? 'var(--veil-dark)' : 'var(--veil-light)',
      backdropFilter: 'var(--blur-veil)', WebkitBackdropFilter: 'var(--blur-veil)',
      borderBottom: `1px solid ${dark ? 'var(--border-inverse)' : 'var(--border-hairline)'}`,
      ...style
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--gutter)', height: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-32)' }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('#top'); }} style={{ border: 'none', display: 'flex' }}>
          <Wordmark size={20} tone={dark ? 'inverse' : 'default'} showSubtitle={false} />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-32)' }}>
          {links.map((l) => {
            const active = l.href === activeHref;
            return (
              <a
                key={l.href} href={l.href}
                onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(l.href); } }}
                style={{
                  border: 'none', paddingBottom: 2,
                  fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-medium)',
                  letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
                  color: dark ? (active ? 'var(--linen-050)' : 'var(--pine-200)') : (active ? 'var(--text-heading)' : 'var(--text-muted)'),
                  borderBottom: `1px solid ${active ? 'var(--pine-600)' : 'transparent'}`
                }}
              >
                {l.label}
              </a>
            );
          })}
          {cta && <Button size="sm" variant={dark ? 'inverse' : 'primary'} href={cta.href} onClick={cta.onClick}>{cta.label}</Button>}
          <IconButton name="phone" label="Anrufen" size="sm" variant={dark ? 'inverse' : 'ghost'} />
        </nav>
      </div>
    </header>
  );
}
