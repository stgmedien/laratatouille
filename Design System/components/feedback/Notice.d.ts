import * as React from 'react';

/**
 * Inline message block — booking confirmations, kitchen closures, holiday notes.
 */
export interface NoticeProps {
  children?: React.ReactNode;
  /** Optional serif headline above the message. */
  title?: string;
  tone?: 'info' | 'success' | 'notice' | 'danger';
  /** Override the Lucide glyph. */
  icon?: string;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

export declare function Notice(props: NoticeProps): JSX.Element;
