import * as React from 'react';

/** Dividers. `hairline` separates, `short` sits under headings, `ornament` closes a section. */
export interface RuleProps {
  variant?: 'hairline' | 'short' | 'ornament';
  tone?: 'default' | 'inverse';
  style?: React.CSSProperties;
}

export declare function Rule(props: RuleProps): JSX.Element;
