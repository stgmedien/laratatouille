import 'server-only';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Document, Font, Image, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import type { LocalisedCategory } from '@/lib/db/types';
import type { Dictionary, Locale } from '@/lib/i18n';
import { tagsFor } from '@/components/pages/tags';
import { SHEET_MM, cardsFor, sheetsFor } from './cards';

/**
 * Die Speisekarte als PDF: ein DIN-A4-Blatt hochkant, darauf zwei Karten von
 * 105 × 297 mm nebeneinander, Schnittmarken in der Mitte. Typografie und Maße
 * entsprechen der Druckansicht der Website (globals.css, Abschnitt "Karte zum
 * Ausdrucken"); wer dort etwas ändert, ändert es hier mit.
 *
 * Passt eine Karte nicht auf ihre Seite, wird die Schrift stufenweise
 * verkleinert, bis jedes Blatt wieder genau eine PDF-Seite ist.
 */

const PT_PER_MM = 72 / 25.4;
const mm = (value: number) => value * PT_PER_MM;

/* Der Blattrand, die Kartengröße und die Seite selbst. */
const PAGE = { width: mm(SHEET_MM.width), height: mm(SHEET_MM.height) };
const CARD = { width: mm(SHEET_MM.card), height: mm(SHEET_MM.height) - 0.5 };
const LOGO = { width: 900, height: 263 };

/* Schriftgrößen, die probiert werden, bis alles auf die Seite passt. */
const SCALES = [1, 0.95, 0.9, 0.85, 0.8, 0.75];

const ink = {
  text: '#2F2A28', body: '#4A443E', muted: '#6B645E', faint: '#8A8178',
  rule: '#BCA05F', leader: '#B4ABA0', mark: '#9A9087',
};

/* Schriften und Logo kommen aus dem Projekt selbst, nicht aus dem Netz. */
const asset = (...segments: string[]) => readFileSync(path.join(process.cwd(), ...segments));
const fontUri = (file: string) => `data:font/ttf;base64,${asset('src', 'lib', 'print', 'fonts', file).toString('base64')}`;

let fontsRegistered = false;
function registerFonts() {
  if (fontsRegistered) return;
  Font.register({ family: 'Marcellus', src: fontUri('Marcellus-Regular.ttf') });
  Font.register({
    family: 'Public Sans',
    fonts: [
      { src: fontUri('PublicSans-Regular.ttf') },
      { src: fontUri('PublicSans-Italic.ttf'), fontStyle: 'italic' },
    ],
  });
  // react-pdf trennt sonst nach englischen Regeln — auch "Rinderbäckchen".
  Font.registerHyphenationCallback((word) => [word]);
  fontsRegistered = true;
}

function styles(scale: number) {
  const s = scale;
  return StyleSheet.create({
    page: { backgroundColor: '#ffffff' },
    // minHeight statt height: Läuft eine Karte über, wächst sie über die Seite
    // hinaus und react-pdf legt eine zweite an — genau das Signal für die
    // Verkleinerung. Mit fester Höhe würde der Überlauf stumm abgeschnitten.
    sheet: { position: 'relative', flexDirection: 'row', width: PAGE.width, minHeight: CARD.height },
    card: {
      width: CARD.width, minHeight: CARD.height,
      paddingVertical: mm(13), paddingHorizontal: mm(11),
      flexDirection: 'column', color: ink.text,
    },
    // Nichts darf im Flex-Layout schrumpfen — sonst stapelt Yoga die Gerichte
    // übereinander, statt die Karte überlaufen zu lassen.
    body: { flexGrow: 1, flexShrink: 0 },
    head: { alignItems: 'center', marginBottom: mm(9 * s), flexShrink: 0 },
    logo: { width: mm(52), height: mm(52 * LOGO.height / LOGO.width) },
    groupGap: { marginTop: mm(7 * s) },
    cat: {
      fontFamily: 'Marcellus', fontSize: 13 * s, letterSpacing: 0.13 * s,
      marginBottom: mm(1.5), paddingBottom: mm(1.5),
      borderBottomWidth: 0.4, borderBottomColor: ink.rule, borderBottomStyle: 'solid',
    },
    intro: { fontFamily: 'Public Sans', fontStyle: 'italic', fontSize: 7.5 * s, color: ink.muted, marginBottom: mm(2) },
    dish: { marginTop: mm(3.4 * s), flexShrink: 0 },
    line: { flexDirection: 'row', alignItems: 'flex-start' },
    // Lange Namen brechen um, statt den Preis aus der Zeile zu schieben — der
    // Text ist hier nicht schrumpfbar wie im Browser, darum die feste Grenze.
    name: { fontFamily: 'Marcellus', fontSize: 10 * s, lineHeight: 1.2, maxWidth: '76%' },
    leader: {
      flexGrow: 1, flexShrink: 0, minWidth: mm(3), height: 0,
      marginHorizontal: mm(2), marginTop: 7.4 * s,
      borderBottomWidth: 0.4, borderBottomColor: ink.leader, borderBottomStyle: 'dotted',
    },
    price: { fontFamily: 'Marcellus', fontSize: 10 * s, lineHeight: 1.2, flexShrink: 0 },
    desc: { fontFamily: 'Public Sans', fontSize: 8 * s, lineHeight: 1.35, color: ink.body, marginTop: mm(0.6) },
    meta: {
      fontFamily: 'Public Sans', fontSize: 6.8 * s, letterSpacing: 6.8 * s * 0.08,
      textTransform: 'uppercase', color: ink.faint, marginTop: mm(0.8),
    },
    foot: { paddingTop: mm(6), fontFamily: 'Public Sans', fontSize: 6.5 * s, lineHeight: 1.4, color: ink.faint, flexShrink: 0 },
    mark: { position: 'absolute', left: CARD.width - 0.15, width: 0.3, height: mm(4), backgroundColor: ink.mark },
  });
}

type Styles = ReturnType<typeof styles>;

function Card({ categories, dict, logo, st }: {
  categories: LocalisedCategory[]; dict: Dictionary; logo: Buffer; st: Styles;
}) {
  return (
    <View style={st.card}>
      <View style={st.body}>
        <View style={st.head}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image kennt kein alt */}
          <Image style={st.logo} src={{ data: logo, format: 'png' }} />
        </View>

        {categories.map((category, i) => (
          <View key={category.id} style={i === 0 ? undefined : st.groupGap}>
            <Text style={st.cat}>{category.name}</Text>
            {category.intro ? <Text style={st.intro}>{category.intro}</Text> : null}

            {category.dishes.map((dish) => {
              const labels = tagsFor(dish.tags, dict).map((t) => t.label);
              const meta = [labels.join(' · '), dish.origin].filter(Boolean).join(' · ');
              return (
                <View key={dish.id} style={st.dish} wrap={false}>
                  <View style={st.line}>
                    <Text style={st.name}>{dish.name}</Text>
                    <View style={st.leader} />
                    <Text style={st.price}>{dish.price}</Text>
                  </View>
                  {dish.description ? <Text style={st.desc}>{dish.description}</Text> : null}
                  {meta ? <Text style={st.meta}>{meta}</Text> : null}
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <Text style={st.foot}>{dict.menu.allergens}</Text>
    </View>
  );
}

function MenuDocument({ sheets, dict, locale, logo, scale }: {
  sheets: LocalisedCategory[][][]; dict: Dictionary; locale: Locale; logo: Buffer; scale: number;
}) {
  const st = styles(scale);
  return (
    <Document
      title={`${dict.menu.eyebrow} — La Ratatouille`}
      author="La Ratatouille"
      language={locale}
      creator="laratatouille.es"
      producer="laratatouille.es"
    >
      {sheets.map((sheet, i) => (
        <Page key={i} size="A4" style={st.page}>
          <View style={st.sheet}>
            {sheet.map((card, j) => (
              <Card key={j} categories={card} dict={dict} logo={logo} st={st} />
            ))}
            <View style={[st.mark, { top: mm(6) }]} />
            <View style={[st.mark, { bottom: mm(6) }]} />
          </View>
        </Page>
      ))}
    </Document>
  );
}

/** Zählt die Seiten im fertigen PDF — jedes Seitenobjekt trägt `/Type /Page`. */
function countPages(pdf: Buffer): number {
  return (pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) ?? []).length;
}

export interface MenuPdf {
  pdf: Buffer;
  /** 1 = Originalgröße; kleiner, wenn eine Karte sonst nicht gepasst hätte. */
  scale: number;
  /** Blätter, die die Karte braucht — und Seiten, die das PDF tatsächlich hat. */
  sheets: number;
  /** Mehr Seiten als Blätter heißt: Eine Karte passt auch verkleinert nicht. */
  pages: number;
}

export async function renderMenuPdf({ categories, dict, locale }: {
  categories: LocalisedCategory[]; dict: Dictionary; locale: Locale;
}): Promise<MenuPdf> {
  registerFonts();
  const logo = asset('public', 'images', 'logo.png');

  // Ohne Kategorien gibt es trotzdem ein Blatt — mit Logo und Hinweis, sonst nichts.
  const cards = cardsFor(categories);
  const sheets = cards.length > 0 ? sheetsFor(cards) : [[[]]];

  let result: MenuPdf | null = null;
  for (const scale of SCALES) {
    const pdf = await renderToBuffer(
      <MenuDocument sheets={sheets} dict={dict} locale={locale} logo={logo} scale={scale} />,
    );
    const pages = countPages(pdf);
    result = { pdf, scale, sheets: sheets.length, pages };
    if (pages <= sheets.length) break;
  }
  return result!;
}
