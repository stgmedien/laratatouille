# La Ratatouille — Design System

Restaurant La Ratatouille, Sanet y Negrals (Marina Alta, Alicante). Two Germans running a Mediterranean kitchen in
Spain: high-end, idiosyncratic cooking in a warm, unfussy room. The design system exists to make
everything the restaurant publishes — website, menu cards, reservation flows, printed inserts,
social — feel like the same house: **classical in structure, modern in restraint, honest in tone.**

## Sources

No design sources were supplied with the brief — no codebase, no Figma file, no
photography, no slide deck, no font binaries. The brief was a written description of the
restaurant and one paragraph of art direction ("hochklassig, eher traditionell, durch Klarheit
punktend, gleichzeitig modern und klassisch"). Everything below is authored from that brief and is
therefore a **proposal open to correction**, not a documentation of existing brand assets.

House facts (from the owner): Calle Mayor 14, 03769 Sanet y Negrals (Marina Alta, Alicante) ·
Tel. (0034) 966 408 326 · info@laratatouille.es. Opening hours, dish names, prices and the
founding story in the UI kit are **invented placeholders** — replace with real copy.

If house fonts or photography exist, hand them over and this system should be re-derived.

### Substitutions to review

| Slot | What we used | Why |
| --- | --- | --- |
| Display type | **Marcellus** (Google Fonts) | Roman inscriptional capitals; classical without being a fashion serif. Stand-in for a licensed house serif. |
| Body type | **Public Sans** (Google Fonts) | Neutral, legible, quiet next to Marcellus. |
| Icons | **Lucide** 0.441.0 via CDN | No icon set was provided. 1.5px stroke, rounded caps — matches the light hairline language. |
| Logo | `assets/logo.svg` — LR monogram in a double gilt ring, authored here at the owner’s request | The typographic `Wordmark` stays the primary lockup; the roundel is for tight spots. |
| Photography | Labelled gradient placeholders | No imagery supplied. |

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | The one file consumers link. `@import`s only. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`, `base.css` |
| `components/core/` | `Button`, `IconButton`, `Icon`, `Tag`, `Rule`, `Wordmark`, `Logo` |
| `components/content/` | `SectionHeading`, `MenuItem`, `Card`, `Quote`, `InfoRow` |
| `components/forms/` | `Input` (+ `Label`), `Textarea`, `Select`, `Checkbox`, `RadioGroup` |
| `components/navigation/` | `NavBar`, `Tabs` |
| `components/feedback/` | `Notice`, `Dialog` |
| `ui_kits/website/` | Four-screen click-through recreation of the site |
| `guidelines/` | Foundation specimen cards (colours, type, spacing, brand) |
| `templates/one-page-site/` | One-page site template (consuming projects can seed from it) |
| `assets/` | `logo.svg`, `image-slot.js` (drag-and-drop photo slots) |
| `SKILL.md` | Agent-skill entry point |

Every component ships `<Name>.jsx`, `<Name>.d.ts` (props contract) and `<Name>.prompt.md`
(one-line purpose + usage snippet).

### Intentional additions

Because no source defined a component inventory, the set above is authored from scratch and kept
deliberately small — a restaurant publishes menus, hours and a booking form, not a dashboard.
Two entries are brand-specific rather than generic:

- **`Wordmark`** — the primary typographic lockup; **`Logo`** is the compact LR roundel (SVG original in `assets/logo.svg`).
- **`MenuItem`** — the dish row (name, dotted leader, price, tags, provenance) is the single most
  repeated pattern the restaurant owns, so it is a primitive rather than kit-local markup.
- **`Icon`** — a thin wrapper over the Lucide CDN so glyphs inherit `currentColor`.

There is no Toast, Avatar, Breadcrumb, Accordion or Table. Add them when a real page needs one.

---

## Content fundamentals

**Language.** German first (the audience is German-speaking guests and German-language press),
Spanish and English as full translations. Spanish appears untranslated in three places only: the
tagline `Cocina mediterránea`, place names (`Calle Mayor`, `Marina Alta`, `Lonja de Dénia`), and
dish origins. Never mix languages inside a sentence.

**Person.** *Wir* for the house, *Sie* for the guest. Always formal — this is a restaurant where
someone takes your coat. First names are used for the owners in body copy ("Sonja kocht, Micha ist
im Gastraum"), never in headlines.

**Register.** Plain declaratives, concrete nouns, no adjective stacking. The rule of thumb: state
the fact, let the reader be impressed on their own.

> Wir kochen, was der Markt am Morgen hergibt.
> Die Karte wechselt alle zwei Wochen, weil sich der Markt alle zwei Wochen ändert.
> Kein Schaum, keine Pinzette. Dafür Fenchelbutter, die drei Tage gezogen hat.

**Not this.** No superlatives ("einzigartiges Geschmackserlebnis"), no hospitality boilerplate
("Wir freuen uns, Sie begrüßen zu dürfen"), no exclamation marks, no rhetorical questions, no
"entdecken Sie". Warmth comes from admitting things ("Reis mit Artischocken — zwei Personen,
40 Minuten Wartezeit"), not from adjectives.

**Casing.** Sentence case in headlines and buttons — German capitalisation rules only. Uppercase
is reserved for eyebrows, nav links, button labels and small-caps labels, always with
`letter-spacing: .18em` (eyebrow) or `.08em` (buttons/labels). Never set a headline in caps.

**Numbers.** Prices with a space before the currency sign and a comma decimal: `16 €`, `5,50 €`.
Times in 24h with a colon: `19:30`. Dates written out in body copy (`4. September`), numeric in
forms. Ranges use an en dash with spaces: `Mi – So`, `19:00 – 23:30`.

**Length.** Headlines ≤ 8 words. Section intros one sentence. Dish descriptions one sentence,
listing what is on the plate in the order you meet it. Body paragraphs ≤ 3 sentences.

**Emoji: never.** Not in UI, not in social copy, not in the newsletter. Attributes are expressed
with `Tag` (`Vegetarisch`, `Vegan`, `Signature`), not with symbols.

**Voice check.** If a sentence would sound wrong said out loud by a cook wiping their hands on an
apron, rewrite it.

---

## Visual foundations

**The idea.** A classical page skeleton — centred titles, generous margins, hairlines, a serif
that remembers Roman capitals — executed with modern discipline: one accent colour, almost no
shadow, no ornament beyond a rule and a diamond. Clarity is the luxury.

**Colour.** Pine (`#17251C`–`#1F3327`) is the house colour: dark bands, headings, primary
buttons, links, active underlines, veils. Sage (`#52663F`–`#AFC095`) is the light green:
eyebrows, tags, soft fills, success — never body text. Gilt (`#BCA05F`) is light gold and is
used **very, very sparingly**: the 56×2 heading rule, the ornament diamond, the wordmark
hairlines and the one `gold` tag fill — never a surface, never type, never an icon. Surfaces are
linen (`#F7F2EA` page, `#FCFAF6` cards) — **pure white never appears**, and text greys are warm
ink (`#2F2A28`), never neutral black. Maximum two background colours per page: linen and pine,
with `--surface-sunken` as a quiet third for asides.

**Type.** Marcellus for anything that names something (display, h1–h4, prices), weight 400 only —
it has one weight and we never fake bold. Public Sans for everything that explains something:
17px/1.62 body, 300 for lead paragraphs, 500–600 for labels. Prices use Marcellus with
`lining-nums tabular-nums` so columns align. Measure caps at 62ch; headlines at 18–22ch with
`text-wrap: balance`.

**Spacing.** A 4-based scale with 6px and 2px for optical corrections. Sections breathe:
`clamp(56px, 9vw, 128px)` vertical padding, 1200px container, `clamp(20px, 5vw, 64px)` gutters.
Inside a section header the gap is a constant 16px between eyebrow, title, rule and intro. Grids
use 32px gaps. Whitespace is the primary compositional tool — when a layout feels thin, remove
elements rather than filling the gap.

**Backgrounds.** Flat colour, full stop. No gradients as decoration, no patterns, no paper
textures, no illustration. The only gradient in the system is `--image-scrim`, a pine
bottom-up scrim that makes hero type legible over photography. Full-bleed applies to hero imagery
and pine bands only; content stays inside the container.

**Imagery.** Warm daylight photography, low contrast, shot close: hands, plates, the room at dusk,
market crates. Slight warm cast, no cool or clinical white balance, no black and white, no
artificial grain, no heavy vignette. Food is shot as served, never styled with tweezers. Every image position is a drag-and-drop `<image-slot>` (assets/image-slot.js) — drop a photo on
it in the preview and it persists; until then a labelled empty slot stands in.
Photography sits at radius 8px (`--radius-lg`) inside layouts, square when full-bleed.

**Borders and cards.** The hairline (`1px var(--border-hairline)`, `#E1D8C9`) is the workhorse
divider. Cards are linen with a hairline and 4px radius — **flat by default, no shadow**. Dotted
leaders (1px dotted, 50% opacity) join dish names to prices. `Rule variant="ornament"` — hairline,
gilt diamond, hairline — closes a section, at most once per section.

**Shadows.** Warm, pine-tinted, and barely visible: `--shadow-sm` for a resting lift,
`--shadow-md` on hover, `--shadow-lg` for modals only. No inner shadows anywhere; inputs use a
border, not a well.

**Radii.** 2px on controls (buttons, inputs, checkboxes), 4px on panels and cards, 8px on media.
`999px` pills exist for `Tag` and nothing else. Nothing in the system is fully round.

**Motion.** Short, linear-minded, no personality tricks: 90ms instant, 160ms controls, 240ms
panels, 420ms media. Easing is `cubic-bezier(.4,0,.2,1)` (standard) or `cubic-bezier(.16,1,.3,1)`
(entrances). Movement is fade plus a 2–8px shift — **never bounce, spring, scale-in, slide-across
or parallax**. Card covers scale 1.03 on hover over 420ms, and that is the largest gesture in the
system. `prefers-reduced-motion` zeroes every duration.

**Hover.** Fills darken one step (pine 700 → 800). Outlines take the pine border and pine text.
Ghost buttons change colour only. Link cards lift 2px and gain `--shadow-md`. Opacity is never
used to signal hover — only to signal disabled (0.42).

**Press.** `translateY(1px)`. No scale, no colour change beyond the hover state already applied.

**Focus.** `0 0 0 3px` pine at 45% opacity, plus a pine border on fields. Focus is never removed.

**Transparency and blur.** Two uses only: the sticky `NavBar` veil (linen or pine at ~70–82%
with `blur(14px) saturate(1.1)`) and the `Dialog` backdrop (pine 62%, `blur(3px)`). Nothing
else is translucent — no frosted cards, no glass panels.

**Layout rules.** One sticky element per page (the 84px header) and one primary action per view.
Over hero imagery the header goes transparent with a `tone="dark"` wordmark; on scroll past the
hero it takes the veil. Nothing else is fixed — no floating booking bars, no cookie islands, no
back-to-top buttons.

---

## Iconography

**Set:** [Lucide](https://lucide.dev) 0.441.0, loaded from
`https://unpkg.com/lucide-static@0.441.0/icons/<name>.svg`. There is no icon font, no sprite sheet
and no bundled SVG folder — nothing was provided, so nothing was invented. This is a
**substitution to confirm**: Lucide's 1.5px stroke and rounded caps match the hairline language,
but a licensed set or a hand-drawn house set would be better and would replace it directly.

**Mechanism:** `Icon` applies the CDN SVG as a CSS `mask-image`, so glyphs inherit
`currentColor` and can be tinted with tokens. Icons are decorative (`aria-hidden`); meaning always
lives in adjacent text.

**Sizes:** 16–18px beside body text, 20–22px standing alone, 13px inside a checkbox. Never above
24px — this brand does not use icons as illustration.

**Colour:** pine (`--pine-600`) when the icon is informative (`InfoRow`, `Notice`), inherited text
colour when it sits inside a control, `--sage-300` on pine.

**Vocabulary in use:** `clock`, `map-pin`, `phone`, `mail`, `calendar`, `users`, `utensils`,
`wine`, `hourglass`, `baby`, `dog`, `chevron-down`, `arrow-right`, `check`, `x`,
`menu`, `info`, `bell`, `triangle-alert`, `instagram`, `facebook`.

**Prohibited:** emoji, Unicode symbols as icons (no `→`, `★`, `✓` in place of a glyph),
hand-drawn one-off SVGs, filled icon styles, two-tone or coloured icons, decorative food
illustrations.

---

## Using the system

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

```jsx
const { Button, SectionHeading, MenuItem } = window.LaRatatouilleDesignSystem_9f9119;
```

Reach for semantic tokens (`--text-body`, `--surface-card`, `--border-hairline`) rather than the
raw ramps, so a future palette correction is a one-file change.
