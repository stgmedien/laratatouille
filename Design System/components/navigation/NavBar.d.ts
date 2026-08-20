import * as React from 'react';

/** The site header: wordmark left, uppercase links right, one pine CTA. 84px tall, translucent veil. */
export interface NavBarProps {
  links?: Array<{ href: string; label: string }>;
  /** Href of the current page — gets the clay underline. */
  activeHref?: string;
  cta?: { label: string; href?: string; onClick?: () => void };
  /** `dark` for use over hero photography. */
  tone?: 'light' | 'dark';
  sticky?: boolean;
  /** Intercepts link clicks — used by the UI kit for client-side routing. */
  onNavigate?: (href: string) => void;
  style?: React.CSSProperties;
}

export declare function NavBar(props: NavBarProps): JSX.Element;
