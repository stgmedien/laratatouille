import * as React from 'react';

/** Pull quote in Marcellus with an uppercase attribution line. Guest voices and press. */
export interface QuoteProps {
  children?: React.ReactNode;
  /** Who said it. */
  attribution?: string;
  /** Where it appeared, e.g. `El Periódico`. */
  source?: string;
  tone?: 'default' | 'inverse';
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}

export declare function Quote(props: QuoteProps): JSX.Element;
