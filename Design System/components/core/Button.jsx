import React from 'react';

const base = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
  fontFamily: 'var(--font-body)', fontWeight: 'var(--fw-semibold)',
  letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
  border: '1px solid transparent', borderRadius: 'var(--radius-sm)',
  cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
  transition: 'var(--transition-control)'
};

const sizes = {
  sm: { height: 'var(--control-h-sm)', padding: '0 18px', fontSize: '11px' },
  md: { height: 'var(--control-h-md)', padding: '0 26px', fontSize: 'var(--fs-caption)' },
  lg: { height: 'var(--control-h-lg)', padding: '0 34px', fontSize: 'var(--fs-body-sm)' }
};

const variants = {
  primary: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)' },
  secondary: { background: 'transparent', color: 'var(--text-heading)', borderColor: 'var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-heading)' },
  inverse: { background: 'var(--linen-050)', color: 'var(--pine-800)' },
  'inverse-outline': { background: 'transparent', color: 'var(--text-on-inverse)', borderColor: 'var(--border-inverse)' }
};

const hovers = {
  primary: { background: 'var(--pine-800)' },
  secondary: { borderColor: 'var(--pine-600)', color: 'var(--pine-700)' },
  ghost: { color: 'var(--pine-700)' },
  inverse: { background: 'var(--linen-200)' },
  'inverse-outline': { borderColor: 'var(--linen-100)', background: 'color-mix(in oklab, var(--linen-100) 10%, transparent)' }
};

export function Button({
  children, variant = 'primary', size = 'md', href, disabled = false,
  fullWidth = false, iconLeft, iconRight, type = 'button', onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href && !disabled ? 'a' : 'button';
  const css = {
    ...base, ...sizes[size], ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    width: fullWidth ? '100%' : undefined,
    transform: press && !disabled ? 'var(--motion-press)' : 'none',
    opacity: disabled ? 0.42 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderBottomWidth: '1px',
    ...style
  };
  return (
    <Tag
      href={href} type={Tag === 'button' ? type : undefined}
      disabled={Tag === 'button' ? disabled : undefined}
      onClick={disabled ? undefined : onClick} style={css}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      {...rest}
    >
      {iconLeft}{children}{iconRight}
    </Tag>
  );
}
