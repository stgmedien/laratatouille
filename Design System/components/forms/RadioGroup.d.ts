import * as React from 'react';

/** Segmented single-choice control: 2–5 short options rendered as selectable chips. */
export interface RadioGroupProps {
  label?: string;
  name?: string;
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  layout?: 'row' | 'column';
  style?: React.CSSProperties;
}

export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
