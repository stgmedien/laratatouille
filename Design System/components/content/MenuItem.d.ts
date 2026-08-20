import * as React from 'react';

/**
 * One dish on the card: name, dotted leader, price in Marcellus, description,
 * optional tags and a producer note.
 */
export interface MenuItemProps {
  name: string;
  description?: string;
  /** Formatted with the currency, e.g. `18 €`. */
  price: string;
  /** Short attribute pills, e.g. `['Vegetarisch']`. */
  tags?: string[];
  /** Italic producer or provenance line, e.g. `Olivenöl aus Baena`. */
  origin?: string;
  style?: React.CSSProperties;
}

export declare function MenuItem(props: MenuItemProps): JSX.Element;
