import Link from 'next/link';
import { Button, Notice } from '@/components/ds';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireSession } from '@/lib/admin-session';
import { getMenu } from '@/lib/db/menu';
import { getDictionary } from '@/lib/i18n';
import { isLocale, localeNames, locales, type Locale } from '@/lib/i18n/config';
import { cardsFor, printPdfPath, sheetsFor } from '@/lib/print/cards';
import { renderMenuPdf, type MenuPdf } from '@/lib/print/menu-pdf';

export const dynamic = 'force-dynamic';

const STEPS = [
  {
    title: 'Karte pflegen',
    text: 'Gerichte, Preise und Kategorien unter „Karte“ bearbeiten. Das PDF wird bei jedem Abruf neu aus der aktuellen Karte gebaut, es gibt nichts zu aktualisieren.',
  },
  {
    title: 'PDF herunterladen',
    text: 'Auf „PDF herunterladen“ klicken. Die Datei landet im Download-Ordner und heißt „Speisekarte La Ratatouille DE.pdf“ (bzw. ES / EN).',
  },
  {
    title: 'Drucken',
    text: 'Die Datei öffnen und drucken: Papier DIN A4 hochkant, Größe 100 % (nicht „an Seite anpassen“), einseitig, Qualität hoch. Am besten auf festerem Papier.',
  },
  {
    title: 'Halbieren',
    text: 'Das Blatt an den kleinen Schnittmarken oben und unten der Länge nach durchschneiden. Übrig bleiben zwei Karten von je 105 × 297 mm.',
  },
];

export default async function PrintPage({ searchParams }: { searchParams: Promise<{ sprache?: string }> }) {
  await requireSession();

  const { sprache } = await searchParams;
  const preview: Locale = sprache && isLocale(sprache) ? sprache : 'de';

  const categories = await getMenu('de');
  const sheets = sheetsFor(cardsFor(categories));
  // Einmal rendern, um zu wissen, ob alles passt — die Vorschau unten holt sich
  // ihr eigenes PDF, das hier ist nur der Blick auf Maßstab und Seitenzahl.
  const fit = sheets.length > 0
    ? await renderMenuPdf({ categories, dict: getDictionary('de'), locale: 'de' })
    : null;

  return (
    <AdminShell active="druck">
      <div style={{ marginBottom: 'var(--space-32)' }}>
        <h1 style={{ font: 'var(--type-title)', color: 'var(--text-heading)', margin: 0 }}>Karte drucken</h1>
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: 'var(--space-8) 0 0', maxWidth: '66ch' }}>
          Das PDF ist ein DIN-A4-Blatt hochkant mit zwei Karten nebeneinander: links Vorspeisen
          und Hauptgerichte, rechts die Desserts. Nach dem Druck wird das Blatt an den
          Schnittmarken der Länge nach halbiert — jede Karte misst dann 105 × 297 mm.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-16)', marginBottom: 'var(--space-40)',
      }}>
        {locales.map((locale) => (
          <div key={locale} className="lr-admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
            <div>
              <div style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)' }}>{localeNames[locale]}</div>
              <div style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', marginTop: 'var(--space-4)' }}>
                Speisekarte La Ratatouille {locale.toUpperCase()}.pdf
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button href={printPdfPath(locale)} size="sm">PDF herunterladen</Button>
              <Link href={`${printPdfPath(locale)}?ansicht`} target="_blank" rel="noreferrer" style={{ font: 'var(--type-body-sm)' }}>
                Im Browser öffnen
              </Link>
            </div>
          </div>
        ))}
      </div>

      <SheetPlan sheets={sheets} fit={fit} />

      <section style={{ marginBottom: 'var(--space-40)' }}>
        <h2 style={{ font: 'var(--type-section)', color: 'var(--text-heading)', margin: '0 0 var(--space-16)' }}>
          So geht es
        </h2>
        <ol style={{
          margin: 0, padding: 0, listStyle: 'none',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-16)',
        }}>
          {STEPS.map((step, i) => (
            <li key={step.title} className="lr-admin-card" style={{ display: 'flex', gap: 'var(--space-16)' }}>
              <span aria-hidden="true" style={{
                flex: '0 0 auto', width: 32, height: 32, borderRadius: '50%',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)',
                fontFamily: 'var(--font-display)', fontSize: 'var(--fs-body)',
              }}>
                {i + 1}
              </span>
              <div>
                <div style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)' }}>{step.title}</div>
                <p style={{ font: 'var(--type-body-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', margin: 'var(--space-4) 0 0' }}>
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 'var(--space-16)', flexWrap: 'wrap', marginBottom: 'var(--space-16)',
        }}>
          <h2 style={{ font: 'var(--type-section)', color: 'var(--text-heading)', margin: 0 }}>Vorschau</h2>
          <nav aria-label="Sprache der Vorschau" style={{ display: 'flex', gap: 'var(--space-16)' }}>
            {locales.map((locale) => (
              <Link
                key={locale}
                href={locale === 'de' ? '/admin/druck' : `/admin/druck?sprache=${locale}`}
                aria-current={locale === preview ? 'page' : undefined}
                style={{
                  font: 'var(--type-caption)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
                  color: locale === preview ? 'var(--text-heading)' : 'var(--text-faint)',
                  borderBottomColor: locale === preview ? 'currentcolor' : 'transparent',
                }}
              >
                {localeNames[locale]}
              </Link>
            ))}
          </nav>
        </div>
        <iframe
          title={`Vorschau der Speisekarte (${localeNames[preview]})`}
          src={`${printPdfPath(preview)}?ansicht`}
          style={{
            display: 'block', width: '100%', height: 'min(78vh, 900px)',
            border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', background: '#fff',
          }}
        />
        <p style={{ font: 'var(--type-caption)', color: 'var(--text-faint)', margin: 'var(--space-8) 0 0' }}>
          Die Vorschau ist das fertige PDF. Zeigt der Browser hier nichts an, öffnet „Im Browser öffnen“
          die Datei in einem eigenen Tab.
        </p>
      </section>
    </AdminShell>
  );
}

/** Welche Kategorien auf welcher Karte landen — damit niemand raten muss. */
function SheetPlan({ sheets, fit }: { sheets: ReturnType<typeof sheetsFor>; fit: MenuPdf | null }) {
  if (sheets.length === 0 || !fit) {
    return (
      <Notice tone="info" title="Noch keine Karte" style={{ marginBottom: 'var(--space-40)' }}>
        Solange keine Kategorie mit Gerichten sichtbar ist, bleibt das PDF leer.
      </Notice>
    );
  }

  const label = (card: (typeof sheets)[number][number] | undefined) =>
    card ? card.map((c) => c.name).join(', ') : 'bleibt leer';
  const overflows = fit.pages > fit.sheets;

  return (
    <Notice
      tone={overflows ? 'danger' : fit.scale < 1 ? 'notice' : 'info'}
      title="Aufteilung"
      style={{ marginBottom: 'var(--space-40)' }}
    >
      {sheets.map((sheet, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : 'var(--space-8)' }}>
          {sheets.length > 1 && <strong>Blatt {i + 1}: </strong>}
          Karte links: {label(sheet[0])} · Karte rechts: {label(sheet[1])}
        </div>
      ))}
      {overflows ? (
        <div style={{ marginTop: 'var(--space-8)' }}>
          <strong>Eine Karte ist zu voll.</strong> Auch mit der kleinsten Schrift passt sie nicht auf
          ihre Seite — das PDF hat gerade {fit.pages} Seiten statt {fit.sheets}. Bitte bei einer
          Kategorie „Beim Ausdruck auf einer neuen Karte beginnen“ anhaken oder Beschreibungen kürzen.
        </div>
      ) : fit.scale < 1 ? (
        <div style={{ marginTop: 'var(--space-8)' }}>
          Damit alles auf die Karte passt, ist die Schrift im PDF auf {Math.round(fit.scale * 100)} %
          verkleinert. Für mehr Luft: Beschreibungen kürzen oder eine Kategorie auf eine neue Karte setzen.
        </div>
      ) : (
        <div style={{ marginTop: 'var(--space-8)' }}>
          Alles passt in Originalgröße.
        </div>
      )}
      <div style={{ marginTop: 'var(--space-8)' }}>
        Eine neue Karte beginnt dort, wo bei einer Kategorie „Beim Ausdruck auf einer neuen Karte
        beginnen“ angehakt ist; je zwei Karten ergeben ein Blatt. Feste Menüs stehen nicht auf der
        gedruckten Karte.
      </div>
    </Notice>
  );
}
