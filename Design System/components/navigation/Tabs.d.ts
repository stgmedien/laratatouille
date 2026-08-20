import * as React from 'react';

/**
 * Uppercase tabs on a hairline, active item underlined in clay. Menu courses,
 * lunch vs dinner card.
 */
export interface TabsProps {
  items?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
  style?: React.CSSProperties;
}

export declare function Tabs(props: TabsProps): JSX.Element;
