import * as React from 'react';

/** Native select with the chrome stripped and a Lucide chevron. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  /** Plain strings, or `{value,label}` pairs. */
  options?: Array<string | { value: string; label: string }>;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export declare function Select(props: SelectProps): JSX.Element;
