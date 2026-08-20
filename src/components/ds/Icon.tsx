import type { CSSProperties } from 'react';
import {
  ArrowRight, Baby, Bell, Calendar, Check, ChevronDown, Clock, Dog, Facebook, Hourglass,
  Info, Instagram, Mail, MapPin, Menu as MenuGlyph, Phone, TriangleAlert, Users, Utensils,
  Wine, X, type LucideIcon,
} from 'lucide-react';

/**
 * The brand icon vocabulary (readme.md > Iconography). Lucide only, 1.5px stroke,
 * rounded caps. Icons are decorative — meaning always lives in adjacent text.
 */
const GLYPHS = {
  'arrow-right': ArrowRight,
  baby: Baby,
  bell: Bell,
  calendar: Calendar,
  check: Check,
  'chevron-down': ChevronDown,
  clock: Clock,
  dog: Dog,
  facebook: Facebook,
  hourglass: Hourglass,
  info: Info,
  instagram: Instagram,
  mail: Mail,
  'map-pin': MapPin,
  menu: MenuGlyph,
  phone: Phone,
  'triangle-alert': TriangleAlert,
  users: Users,
  utensils: Utensils,
  wine: Wine,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof GLYPHS;

export interface IconProps {
  name: IconName;
  /** 16–18px beside body text, 20–22px standing alone. Never above 24px. */
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

export function Icon({ name, size = 18, color = 'currentColor', style, className }: IconProps) {
  const Glyph = GLYPHS[name];
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      strokeWidth={1.5}
      color={color}
      className={className}
      style={{ flex: '0 0 auto', ...style }}
    />
  );
}
