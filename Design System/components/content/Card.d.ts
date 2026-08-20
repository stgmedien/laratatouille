import * as React from 'react';

/** A 4px-radius linen panel with a hairline border. Optional cover image on top. */
export interface CardProps {
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** Cover height in px. Default 220. */
  imageHeight?: number;
  eyebrow?: string;
  title?: string;
  footer?: React.ReactNode;
  /** Renders an `<a>` and enables the hover lift. */
  href?: string;
  variant?: 'outline' | 'raised' | 'plain';
  style?: React.CSSProperties;
}

export declare function Card(props: CardProps): JSX.Element;
