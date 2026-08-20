import type { CSSProperties, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Icon } from './Icon';

export function Label({ htmlFor, children, hint }: { htmlFor?: string; children: ReactNode; hint?: string }) {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
      <label htmlFor={htmlFor} style={{
        font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>{children}</label>
      {hint && <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{hint}</span>}
    </span>
  );
}

const heights = { sm: 'var(--control-h-sm)', md: 'var(--control-h-md)', lg: 'var(--control-h-lg)' };

function Shell({ label, hint, error, id, children, style }: {
  label?: string; hint?: string; error?: string; id?: string; children: ReactNode; style?: CSSProperties;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', ...style }}>
      {label && <Label htmlFor={id} hint={hint}>{label}</Label>}
      {children}
      {error && <span style={{ font: 'var(--type-caption)', color: 'var(--state-danger)' }}>{error}</span>}
    </div>
  );
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> & {
  label?: string; hint?: string; error?: string; size?: keyof typeof heights; style?: CSSProperties;
};

export function Input({ label, hint, error, id, size = 'md', style, ...rest }: InputProps) {
  return (
    <Shell label={label} hint={hint} error={error} id={id} style={style}>
      <input
        id={id} className="lr-field" aria-invalid={error ? true : undefined}
        style={{ height: heights[size] }} {...rest}
      />
    </Shell>
  );
}

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> & {
  label?: string; hint?: string; error?: string; style?: CSSProperties;
};

export function Textarea({ label, hint, error, id, rows = 4, style, ...rest }: TextareaProps) {
  return (
    <Shell label={label} hint={hint} error={error} id={id} style={style}>
      <textarea id={id} rows={rows} className="lr-field" aria-invalid={error ? true : undefined} {...rest} />
    </Shell>
  );
}

export type SelectOption = string | { value: string; label: string };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'style' | 'size'> & {
  label?: string; hint?: string; error?: string; options: SelectOption[];
  size?: keyof typeof heights; style?: CSSProperties;
};

export function Select({ label, hint, error, id, options, size = 'md', style, ...rest }: SelectProps) {
  return (
    <Shell label={label} hint={hint} error={error} id={id} style={style}>
      <span style={{ position: 'relative', display: 'block' }}>
        <select
          id={id} className="lr-field" aria-invalid={error ? true : undefined}
          style={{ height: heights[size] }} {...rest}
        >
          {options.map((o) => {
            const value = typeof o === 'string' ? o : o.value;
            const text = typeof o === 'string' ? o : o.label;
            return <option key={value} value={value}>{text}</option>;
          })}
        </select>
        <Icon
          name="chevron-down" size={16} color="var(--text-muted)"
          style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
      </span>
    </Shell>
  );
}

export function Checkbox({ label, description, id, name, defaultChecked, checked, onChange, value = 'on' }: {
  label: string; description?: string; id?: string; name?: string;
  defaultChecked?: boolean; checked?: boolean; value?: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="lr-checkbox">
      <input
        id={id} name={name} type="checkbox" value={value}
        defaultChecked={defaultChecked} checked={checked}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
      />
      <span className="lr-checkbox__box" aria-hidden="true">
        <Icon name="check" size={13} color="var(--text-on-accent)" />
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>{label}</span>
        {description && <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{description}</span>}
      </span>
    </label>
  );
}

export interface RadioGroupProps {
  label?: string;
  name: string;
  options: SelectOption[];
  defaultValue?: string;
  layout?: 'row' | 'column';
  style?: CSSProperties;
}

/** Native radios styled as pills — works inside a plain form post, no client state. */
export function RadioGroup({ label, name, options, defaultValue, layout = 'row', style }: RadioGroupProps) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', ...style }}>
      {label && (
        <legend style={{
          font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase',
          color: 'var(--text-muted)', padding: 0, marginBottom: 'var(--space-12)',
        }}>{label}</legend>
      )}
      <div className={layout === 'column' ? 'lr-choice lr-choice--column' : 'lr-choice'}>
        {options.map((o) => {
          const value = typeof o === 'string' ? o : o.value;
          const text = typeof o === 'string' ? o : o.label;
          return (
            <label key={value} className="lr-radio">
              <input type="radio" name={name} value={value} defaultChecked={defaultValue === value} />
              <span>{text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
