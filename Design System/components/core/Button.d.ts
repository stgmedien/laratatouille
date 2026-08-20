import * as React from 'react';

/**
 * The house button: uppercase, letterspaced, 2px radius, clay fill for the one
 * primary action per view.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual weight. One `primary` per view. `inverse*` on aubergine surfaces. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'inverse-outline';
  size?: 'sm' | 'md' | 'lg';
  /** Renders an `<a>` instead of a `<button>`. */
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;
