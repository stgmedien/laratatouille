import React from 'react';

export function Card({ children, imageSrc, imageAlt = '', imageHeight = 220, eyebrow, title, footer, href, variant = 'outline', style }) {
  const [hover, setHover] = React.useState(false);
  const skins = {
    outline: { background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', boxShadow: 'none' },
    raised: { background: 'var(--surface-card)', border: '1px solid transparent', boxShadow: 'var(--shadow-md)' },
    plain: { background: 'transparent', border: '1px solid transparent', boxShadow: 'none' }
  }[variant];
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-md)', overflow: 'hidden',
        textDecoration: 'none', color: 'inherit', transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
        ...skins,
        ...(href && hover ? { boxShadow: 'var(--shadow-md)', transform: 'var(--motion-lift)', borderColor: 'var(--border-hairline)' } : null),
        ...style
      }}
    >
      {imageSrc && (
        <span style={{ display: 'block', height: imageHeight, overflow: 'hidden', background: 'var(--surface-sunken)' }}>
          <img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--dur-slow) var(--ease-out)', transform: href && hover ? 'scale(1.03)' : 'none' }} />
        </span>
      )}
      <span style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', padding: variant === 'plain' ? '0' : 'var(--space-24)', paddingTop: imageSrc ? 'var(--space-24)' : undefined }}>
        {eyebrow && <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>{eyebrow}</span>}
        {title && <h3 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: 0 }}>{title}</h3>}
        {children && <div style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>{children}</div>}
        {footer && <div style={{ marginTop: 'var(--space-8)' }}>{footer}</div>}
      </span>
    </Tag>
  );
}
