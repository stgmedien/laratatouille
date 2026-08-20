import * as React from 'react';

/** Lucide icon (1.5px stroke, rounded caps) tinted with currentColor via CSS mask. */
export interface IconProps {
  /** Lucide name, kebab-case: `map-pin`, `clock`, `instagram`, `chevron-down`. */
  name: string;
  /** Square px size. Body text pairs with 16–18. */
  size?: number;
  /** Override the fill; defaults to `currentColor`. */
  strokeColor?: string;
  style?: React.CSSProperties;
}

export declare function Icon(props: IconProps): JSX.Element;
