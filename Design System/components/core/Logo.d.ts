import * as React from 'react';

/** The compact brand mark: LR monogram in a double gilt ring. `Wordmark` stays the primary lockup. */
export interface LogoProps {
  /** Diameter in px. Default 64; keep ≥ 40 so the inner ring stays visible. */
  size?: number;
  tone?: 'default' | 'inverse';
  style?: React.CSSProperties;
}

export declare function Logo(props: LogoProps): JSX.Element;
