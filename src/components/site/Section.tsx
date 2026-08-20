import type { CSSProperties, ReactNode } from 'react';

const backgrounds = {
  page: 'var(--surface-page)',
  card: 'var(--surface-raised)',
  sunken: 'var(--surface-sunken)',
  inverse: 'var(--surface-inverse)',
};

export interface SectionProps {
  children: ReactNode;
  tone?: keyof typeof backgrounds;
  id?: string;
  narrow?: boolean;
  tight?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Section({ children, tone = 'page', id, narrow, tight, className, style }: SectionProps) {
  return (
    <section
      id={id}
      className={`lr-section${tight ? ' lr-section--tight' : ''}${className ? ` ${className}` : ''}`}
      style={{ background: backgrounds[tone], ...style }}
    >
      <div className={narrow ? 'lr-container lr-container--narrow' : 'lr-container'}>{children}</div>
    </section>
  );
}
