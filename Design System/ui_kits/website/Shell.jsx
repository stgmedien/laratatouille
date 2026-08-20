// Kit-level pieces shared by the website screens. Loaded as text/babel; see index.html.
const { Wordmark, Logo, Button, IconButton, Rule, InfoRow, Icon, SectionHeading } = window.LaRatatouilleDesignSystem_9f9119;

function Placeholder({ slot, height = 420, label = 'Foto hier ablegen', rounded = false, ratio, style }) {
  return (
    <image-slot id={slot} shape={rounded ? 'rounded' : 'rect'} radius={rounded ? 8 : undefined}
      placeholder={label} style={{ display: 'block', width: '100%', height, aspectRatio: ratio, ...style }}></image-slot>
  );
}

function Section({ children, tone = 'page', id, style }) {
  const bg = { page: 'var(--surface-page)', card: 'var(--surface-raised)', sunken: 'var(--surface-sunken)', inverse: 'var(--surface-inverse)' }[tone];
  return (
    <section id={id} style={{ background: bg, padding: 'var(--section-y) 0', ...style }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--gutter)' }}>{children}</div>
    </section>
  );
}

function Hero({ slot = 'hero', label = 'Hero-Foto hier ablegen', eyebrow, title, sub, actions, height = 620 }) {
  return (
    <div style={{ position: 'relative', height, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--pine-200)' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <image-slot id={slot} shape="rect" placeholder={label}></image-slot>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--image-scrim)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--container-max)', width: '100%', margin: '0 auto', padding: '0 var(--gutter) clamp(40px,7vw,88px)', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)', maxWidth: 760 }}>
          {eyebrow && <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--sage-300)' }}>{eyebrow}</span>}
          <h1 style={{ font: 'var(--type-display)', letterSpacing: 'var(--ls-display)', color: 'var(--linen-050)', margin: 0, maxWidth: '18ch' }}>{title}</h1>
          {sub && <p style={{ font: 'var(--type-body-lg)', color: 'var(--linen-100)', margin: 0, maxWidth: '46ch' }}>{sub}</p>}
          {actions && <div style={{ display: 'flex', gap: 'var(--space-12)', marginTop: 'var(--space-8)', flexWrap: 'wrap', pointerEvents: 'auto' }}>{actions}</div>}
        </div>
      </div>
    </div>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer style={{ background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)', padding: 'var(--space-72) 0 var(--space-40)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--gutter)', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 'var(--space-40)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)', alignItems: 'flex-start' }}>
          <Logo size={56} tone="inverse" />
          <Wordmark size={22} tone="inverse" subtitle="Cocina mediterránea" />
          <p style={{ font: 'var(--type-body)', color: 'var(--text-on-inverse-muted)', margin: 0, maxWidth: '34ch' }}>
            Ein Restaurant von zwei Deutschen in Spanien. Wir kochen mittelmeerisch, ehrlich und ohne Umschweife.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <IconButton name="instagram" label="Instagram" variant="inverse" size="sm" />
            <IconButton name="facebook" label="Facebook" variant="inverse" size="sm" />
            <IconButton name="mail" label="E-Mail" variant="inverse" size="sm" />
          </div>
        </div>
        <div>
          <InfoRow icon="clock" label="Öffnungszeiten" tone="inverse">Mi – So, 19:00 – 23:30<br />Montag & Dienstag Ruhetag</InfoRow>
          <InfoRow icon="map-pin" label="Adresse" tone="inverse">Calle Mayor 14<br />03769 Sanet y Negrals, Alicante</InfoRow>
        </div>
        <div>
          <InfoRow icon="phone" label="Reservierungen" tone="inverse">+34 966 408 326</InfoRow>
          <InfoRow icon="mail" label="E-Mail" tone="inverse">info@laratatouille.es</InfoRow>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--container-max)', margin: 'var(--space-40) auto 0', padding: '0 var(--gutter)' }}>
        <Rule tone="inverse" />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-24)', paddingTop: 'var(--space-20)', font: 'var(--type-caption)', color: 'var(--text-on-inverse-muted)' }}>
          <span>© 2026 La Ratatouille, Sanet y Negrals</span>
          <span style={{ display: 'flex', gap: 'var(--space-24)' }}>
            <a href="#impressum" onClick={(e) => e.preventDefault()} style={{ color: 'var(--pine-200)', borderColor: 'transparent' }}>Impressum</a>
            <a href="#datenschutz" onClick={(e) => e.preventDefault()} style={{ color: 'var(--pine-200)', borderColor: 'transparent' }}>Datenschutz</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Placeholder, Section, Hero, Footer });
