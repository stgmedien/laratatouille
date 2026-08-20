import * as React from 'react';

/** Multi-line field for allergy notes, occasions, messages. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  rows?: number;
  style?: React.CSSProperties;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
