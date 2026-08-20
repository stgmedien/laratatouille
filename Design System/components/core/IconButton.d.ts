import * as React from 'react';

/** A square 36/44/52px control holding a single Lucide glyph. Always pass `label`. */
export interface IconButtonProps {
  /** Lucide icon name, kebab-case, e.g. `phone`, `menu`, `arrow-right`. */
  name: string;
  /** Accessible label — also used as the tooltip. Required. */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'filled' | 'inverse';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
