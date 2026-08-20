import * as React from 'react';

/** Centred modal over an aubergine veil. Reservation confirmation, dish detail, gift voucher. */
export interface DialogProps {
  open?: boolean;
  title?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  /** Right-aligned action row, usually two Buttons. */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** Max width in px. Default 520. */
  width?: number;
}

export declare function Dialog(props: DialogProps): JSX.Element | null;
