import * as React from 'react';

/** Square 20px checkbox, clay when checked. Consent and opt-ins. */
export interface CheckboxProps {
  label?: React.ReactNode;
  /** Small caption under the label. */
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
