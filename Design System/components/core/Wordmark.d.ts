import * as React from 'react';

/**
 * The typographic wordmark. No logo file was supplied with the brief, so the
 * name set in Marcellus between two gilt hairlines IS the mark.
 */
export interface WordmarkProps {
  /** Cap height of the name in px. 20 in navbars, 44+ in heroes. */
  size?: number;
  tone?: 'default' | 'inverse' | 'mono';
  /** Small caps line under the name. */
  subtitle?: string;
  showSubtitle?: boolean;
  style?: React.CSSProperties;
}

export declare function Wordmark(props: WordmarkProps): JSX.Element;
