import * as React from 'react';

/**
 * Single-line field: small-caps label above a 2px-radius linen input.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Small-caps label above the field. */
  label?: string;
  /** Right-aligned helper next to the label, e.g. `optional`. */
  hint?: string;
  /** Error message; also turns the border red. */
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export declare function Input(props: InputProps): JSX.Element;

export interface LabelProps { htmlFor?: string; children?: React.ReactNode; hint?: string }
export declare function Label(props: LabelProps): JSX.Element;
