import Image from 'next/image';
import type { ReactNode } from 'react';

export interface HeroProps {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  sub?: string;
  actions?: ReactNode;
  height?: number;
  priority?: boolean;
}

export function Hero({ src, alt, eyebrow, title, sub, actions, height = 640, priority = false }: HeroProps) {
  return (
    <div className="lr-hero" style={{ ['--hero-h' as string]: `${height}px` }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" style={{ objectFit: 'cover' }} quality={82} />
      <div className="lr-hero__scrim" />
      <div className="lr-container lr-hero__body" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)', maxWidth: 760 }}>
          {eyebrow && (
            <span style={{
              font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)',
              textTransform: 'uppercase', color: 'var(--sage-300)',
            }}>{eyebrow}</span>
          )}
          <h1 style={{
            font: 'var(--type-display)', letterSpacing: 'var(--ls-display)',
            color: 'var(--linen-050)', margin: 0, maxWidth: '18ch',
          }}>{title}</h1>
          {sub && (
            <p style={{ font: 'var(--type-body-lg)', color: 'var(--linen-100)', margin: 0, maxWidth: '46ch' }}>
              {sub}
            </p>
          )}
          {actions && (
            <div style={{ display: 'flex', gap: 'var(--space-12)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
