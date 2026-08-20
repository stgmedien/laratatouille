import * as React from 'react';

/** Eyebrow + serif title + gilt rule + optional intro. Opens every page section. */
export interface SectionHeadingProps {
  /** Uppercase kicker, 1–3 words. */
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
  /** Show the 56×2 gilt bar. Default true. */
  rule?: boolean;
  style?: React.CSSProperties;
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
