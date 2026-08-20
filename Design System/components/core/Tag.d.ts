import * as React from 'react';

/** Small pill label for dish attributes: vegetarisch, Signature, Tagesgericht. */
export interface TagProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'gold' | 'sage' | 'pine' | 'inverse';
  style?: React.CSSProperties;
}

export declare function Tag(props: TagProps): JSX.Element;
