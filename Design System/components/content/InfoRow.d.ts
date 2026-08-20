import * as React from 'react';

/** Icon + small-caps label + value. Opening hours, address, phone, booking notes. */
export interface InfoRowProps {
  /** Lucide icon name, tinted clay. */
  icon?: string;
  label?: string;
  children?: React.ReactNode;
  tone?: 'default' | 'inverse';
  style?: React.CSSProperties;
}

export declare function InfoRow(props: InfoRowProps): JSX.Element;
