import React from 'react';
import { Icon } from './Icon.jsx';

export function IconButton({ name, label, size = 'md', variant = 'ghost', onClick, href, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const box = { sm: 36, md: 44, lg: 52 }[size];
  const glyph = { sm: 16, md: 18, lg: 22 }[size];
  const skins = {
    ghost: { background: 'transparent', color: 'var(--text-heading)', borderColor: 'transparent' },
    outline: { background: 'var(--surface-raised)', color: 'var(--text-heading)', borderColor: 'var(--border-hairline)' },
    filled: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)', borderColor: 'transparent' },
    inverse: { background: 'transparent', color: 'var(--text-on-inverse)', borderColor: 'transparent' }
  };
  const hoverSkins = {
    ghost: { color: 'var(--pine-700)' },
    outline: { borderColor: 'var(--pine-600)', color: 'var(--pine-700)' },
    filled: { background: 'var(--pine-800)' },
    inverse: { color: 'var(--sage-300)' }
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href} type={href ? undefined : 'button'} aria-label={label} title={label} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: box, height: box, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid', borderRadius: 'var(--radius-sm)', cursor: 'pointer', padding: 0,
        transition: 'var(--transition-control)', ...skins[variant], ...(hover ? hoverSkins[variant] : null), ...style
      }}
      {...rest}
    >
      <Icon name={name} size={glyph} />
    </Tag>
  );
}
