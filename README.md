# La Ratatouille — Website

Website und Mini-CMS für das Restaurant La Ratatouille, Calle Mayor 14, Sanet y Negrals
(Marina Alta, Alicante).

Dreisprachig (Deutsch, Spanisch, Englisch), Speisekarte über ein Backend pflegbar,
Reservierungsanfragen kommen per E-Mail. Gebaut mit Next.js auf Node.js, Daten in Neon Postgres,
gehostet auf Vercel. Gestaltung und Texte folgen dem mitgelieferten Design System
(`Design System/readme.md`).

---

## Schnellstart

```bash
npm install
npm run dev
```

Ohne Datenbank läuft die Seite mit der mitgelieferten Beispielkarte. Zum Bearbeiten der Karte
braucht es eine Datenbank — siehe unten.

| Adresse | Was |
| --- | --- |
| `/de`, `/es`, `/en` | Startseite |
| `/de/karte`, `/es/carta`, `/en/menu` | Speisekarte |
| `/de/haus`, `/es/la-casa`, `/en/the-house` | Das Haus |
| `/de/reservieren`, `/es/reservar`, `/en/book` | Reservierung |
| `/admin` | Verwaltung (Passwort) |

`/` leitet auf die Sprache der Browsereinstellung weiter, sonst auf Deutsch.

---

## Einrichtung

### 1. Datenbank bei Neon anlegen

1. Auf [neon.tech](https://neon.tech) ein Projekt anlegen (kostenloser Tarif genügt),
   Region **Frankfurt (eu-central-1)**.
2. Im Dashboard unter *Connection Details* den **Pooled connection**-String kopieren.
3. In `.env.local` als `DATABASE_URL` eintragen (Vorlage: `.env.example`).
4. Tabellen anlegen und die Beispielkarte einspielen:

```bash
npm run db:seed
```

`npm run db:setup` legt nur die Tabellen an, ohne Inhalte. Beides ist beliebig oft wiederholbar.
`npm run db:seed -- --force` ersetzt eine bestehende Karte durch die Beispieldaten.

### 2. Backend-Passwort setzen

In `.env.local`:

```
ADMIN_PASSWORD="ein langes Passwort"
AUTH_SECRET="…"
```

`AUTH_SECRET` signiert das Login-Cookie. Erzeugen mit:

```bash
openssl rand -base64 32
```

### 3. Reservierungs-Mails

Die Anfragen werden **nicht gespeichert**, sondern direkt per E-Mail verschickt. Zwei Wege,
einer genügt:

**Variante A — Resend** (einfachster Weg auf Vercel, kostenloser Tarif reicht):

```
RESEND_API_KEY="re_…"
RESERVATION_FROM="reservierung@laratatouille.es"
RESERVATION_TO="info@laratatouille.es"
```

Die Absenderdomain muss bei [resend.com](https://resend.com) verifiziert sein.

**Variante B — eigenes Postfach über SMTP** (Zugangsdaten vom Hoster):

```
SMTP_HOST="smtp.ihr-hoster.es"
SMTP_PORT="587"
SMTP_USER="info@laratatouille.es"
SMTP_PASSWORD="…"
RESERVATION_FROM="info@laratatouille.es"
RESERVATION_TO="info@laratatouille.es"
```

Ist `RESEND_API_KEY` gesetzt, wird Resend genutzt, sonst SMTP. Mehrere Empfänger in
`RESERVATION_TO` durch Komma trennen. Die Antwortadresse der Mail ist immer die des Gastes —
ein „Antworten“ im Postfach geht direkt an ihn.

---

## Aktueller Stand

| | |
| --- | --- |
| Repository | https://github.com/stgmedien/laratatouille (Branch `main`) |
| Vercel-Projekt | `stgmedien-6458s-projects/la-ratatouille` |
| Adresse | https://la-ratatouille.vercel.app |
| Datenbank | Neon, `neondb` in `eu-central-1`, Schema und Startinhalte eingespielt |

Ein Push auf `main` löst ein Produktions-Deployment aus; jeder andere Branch bekommt ein
Preview-Deployment.

**Die Adresse ist noch geschützt.** In den Projekteinstellungen steht *Deployment Protection →
Vercel Authentication* auf „all except custom domains“: Wer bei Vercel angemeldet ist, sieht die
Seite, alle anderen bekommen eine Weiterleitung zum Login. Sobald die echte Domain angebunden
ist, ist diese öffentlich erreichbar. Wer die `vercel.app`-Adresse vorher öffentlich zeigen will,
schaltet den Schutz unter *Settings → Deployment Protection* ab.

Solange `NEXT_PUBLIC_SITE_URL` auf eine `vercel.app`-Adresse zeigt, sperrt `robots.txt`
Suchmaschinen komplett aus — damit die Testadresse nicht neben der echten Seite in Google landet.
Mit dem Umstellen auf die eigene Domain öffnet sich das von selbst.

### Eigene Domain anbinden

1. In Vercel unter *Settings → Domains* die Domain hinzufügen und die angezeigten DNS-Einträge
   beim Domain-Anbieter setzen.
2. `NEXT_PUBLIC_SITE_URL` auf genau diese Adresse ändern (mit `https://`, ohne Schrägstrich am
   Ende) und einmal neu deployen. Davon hängen Sitemap, Canonical-Tags, die Sprachverweise und
   die Freigabe für Suchmaschinen ab.

---

## Auf Vercel veröffentlichen

Für ein neues Projekt von Grund auf:

1. Projekt auf [vercel.com](https://vercel.com) importieren (oder `npx vercel` im Projektordner).
2. Unter *Settings → Environment Variables* alle Variablen aus `.env.example` eintragen —
   für *Production*, *Preview* und *Development*.
3. `NEXT_PUBLIC_SITE_URL` auf die echte Adresse setzen.
4. Deployen. Danach einmal `npm run db:seed` lokal gegen dieselbe Datenbank laufen lassen,
   falls noch keine Karte drinsteht.

Die Ordner `Design System/` und `Bilder/` sind über `.vercelignore` vom Deployment ausgenommen;
sie bleiben als Quellmaterial im Projekt liegen.

---

## Die Karte pflegen

`/admin`, Anmeldung mit dem gemeinsamen Passwort. Die Sitzung hält zwölf Stunden.

**Karte** — Kategorien und Gerichte:

* *Kategorie anlegen* für einen neuen Abschnitt (Vorspeisen, Hauptgänge, Weine …).
* *Gericht anlegen* für ein Gericht darin. Der Preis ist ein freies Textfeld, damit auch
  `5,50 € / 28 €` geht.
* Die Pfeiltasten ▲▼ verschieben Gerichte innerhalb ihrer Kategorie und Kategorien untereinander.
* *Auf der Website sichtbar* nimmt einen Eintrag aus der Karte, ohne ihn zu löschen.
* *Auf der Startseite zeigen* markiert ein Gericht für den Auszug auf der Startseite —
  dort erscheinen bis zu vier.
* Eine Kategorie ohne sichtbare Gerichte wird auf der Website gar nicht erst angezeigt.

**Sprachen** — jedes Gericht hat Reiter für Deutsch, Español und English. Deutsch ist Pflicht;
bleibt eine Übersetzung leer, zeigt die Website dort den deutschen Text. In der Übersicht steht
bei unvollständigen Einträgen „Übersetzung fehlt“.

**Hinweise** — ein Banner über der Website, für eine Schließung oder geänderte Zeiten. Mit
„Anzeigen ab“ und „Anzeigen bis“ erscheint und verschwindet er von allein; den Sommerurlaub
könnt ihr also Wochen im Voraus eintragen und danach vergessen. Ohne Datum läuft der Hinweis,
bis ihr das Häkchen entfernt. Angezeigt wird immer nur der oberste Hinweis, der gerade läuft.
Die Daten werden in spanischer Zeit ausgewertet.

**Gästestimmen** — kurze Zitate aus öffentlichen Bewertungen, mit Namen und Quelle. Ein Zitat
ist ein Zitat: Es steht in der Sprache, in der es geschrieben wurde, und wird auf allen drei
Sprachfassungen unverändert gezeigt. Übersetzen und den Namen darunter stehen lassen wäre nicht
ehrlich. Die Startseite zeigt die ersten drei, die Seite „Das Haus“ die erste. Ohne sichtbare
Stimme verschwindet der Abschnitt.

**Seitentexte** — die freien Texte über der Karte und der Menüblock darunter. Bleiben Titel und
Text des Menüblocks leer, verschwindet der Block von der Seite.

Änderungen sind sofort auf der Website sichtbar.

---

## Vor dem Livegang

- [ ] Karte gegenprüfen: Sie enthält Entradas und Carne & Pescado nach der aktuellen Vorlage.
      Desserts und Weine sind noch nicht hinterlegt — bei Bedarf im Backend als Kategorie anlegen
- [ ] Gästestimmen mit dem eigenen Profil abgleichen und löschen, was nicht veröffentlicht
      werden soll
- [ ] Im Impressum die vollständige Firmierung und die Steuernummer (NIF/CIF) eintragen
      (`src/lib/i18n/dictionaries/*.ts`, Abschnitt `legal`)
- [ ] Einwilligung der auf `gastraum.jpg` abgebildeten Gäste zur Veröffentlichung sichern
- [ ] `NEXT_PUBLIC_SITE_URL` auf die echte Domain setzen
- [ ] Eine Testreservierung abschicken und prüfen, ob die Mail ankommt
- [ ] Öffnungszeiten, Telefonnummer und Adresse in `src/lib/house.ts` gegenprüfen

### Woher die Angaben stammen

Adresse, Telefon und E-Mail kommen aus dem Design-System-Briefing. Öffnungszeiten, die Namen
der Gastgeber und ihr Werdegang sind von der bestehenden Seite `laratatouille.es` übernommen,
die Gästestimmen aus öffentlichen Bewertungen. Alles davon steht in `src/lib/house.ts` und in
den Wörterbüchern und sollte einmal von euch bestätigt werden.

**Öffnungszeiten laut bestehender Seite:** Sonntag und Montag Ruhetag, Dienstag bis Donnerstag
19:00 – 21:30, Freitag und Samstag zusätzlich 13:00 – 14:30. Diese Zeiten steuern nicht nur die
Anzeige, sondern auch die strukturierten Daten für Google und die Prüfung im
Reservierungsformular — mittags lassen sich nur Freitag und Samstag anfragen.

---

## Aufbau

```
src/
  app/
    (site)/[locale]/       Öffentliche Seiten, Sprache im Pfad
    (admin)/admin/         Verwaltung, eigener Root-Layout-Baum
    globals.css            Design-Tokens + Layout-Klassen
    sitemap.ts robots.ts
  components/
    ds/                    Design System als React-Komponenten
    site/                  Kopf, Fuß, Hero, Formular
    admin/                 Formulare der Verwaltung
    pages/                 Die vier Seiteninhalte
  lib/
    db/                    Schema, Abfragen, Startinhalte (Karte + Gästestimmen)
    i18n/                  Sprachen, Pfade, Wörterbücher
    house.ts               Adresse, Zeiten, Kontakt — eine Quelle für alles
    auth.ts mail.ts seo.ts
  middleware.ts            Sprachweiche und Schutz von /admin
scripts/
  db-setup.mjs           Tabellen anlegen und Startinhalte einspielen
  build-map.mjs          Lageplan aus OpenStreetMap-Kacheln bauen
```

**Texte** stehen in `src/lib/i18n/dictionaries/` — eine Datei je Sprache, gleiche Struktur.
Wer dort ein Feld ergänzt, bekommt vom Typsystem gesagt, wo es in den anderen beiden fehlt.

**Hausdaten** (Adresse, Telefon, Öffnungszeiten, Ruhetage, Servicezeiten) stehen nur in
`src/lib/house.ts` und werden von Fußzeile, Kontaktblock, Reservierungsformular,
Reservierungsmail und den strukturierten Daten für Google gelesen. Wer dort die Zeiten ändert,
ändert sie überall.

**Lageplan**: `public/images/lage.jpg` ist ein festes Bild, kein eingebetteter Kartendienst.
Damit lädt die Seite schneller, der Plan ist immer da, und es geht keine Anfrage eines Besuchers
an einen Dritten — was die Datenschutzerklärung entsprechend kurz hält. Der Marker sitzt in der
Bildmitte, weil das Bild auf `HOUSE.geo` zentriert gebaut wird. Zieht das Restaurant um, ändert
man die Koordinaten in `src/lib/house.ts` **und** in `scripts/build-map.mjs` und lässt
`npm run build:map` laufen.

**Design System**: Farben, Typografie, Abstände und Bewegungen kommen unverändert aus
`Design System/tokens/` und liegen als Kopie in `src/styles/tokens/`. Die Komponenten in
`src/components/ds/` sind die TypeScript-Fassung der Design-System-Komponenten (alle, die
die Website nutzt; `Dialog` und `Tabs` wurden nicht gebraucht). Die
Schriften (Marcellus, Public Sans) liefert `next/font` vom eigenen Server aus — es geht keine
Anfrage an Google.

---

## Befehle

| Befehl | Was |
| --- | --- |
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktionsbuild |
| `npm start` | Produktionsbuild lokal starten |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript ohne Ausgabe |
| `npm run db:setup` | Tabellen anlegen |
| `npm run db:seed` | Tabellen anlegen und Startinhalte einspielen |
| `npm run build:map` | Lageplan neu bauen — nur nötig, wenn sich die Adresse ändert |

---

## Wenn etwas klemmt

**`Cannot read properties of undefined (reading 'call')`** im Browser, oder
**`Cannot find module './vendor-chunks/…'`** im Terminal:

```bash
rm -rf .next && npm run dev
```

`.next` ist das Build-Verzeichnis. Produktions- und Entwicklungsbuild legen dort unterschiedlich
benannte Chunks ab. Wer `npm run build` und `npm run dev` nacheinander im selben Ordner laufen
lässt, hinterlässt eine Mischung, in der Webpack Module sucht, die es unter diesem Namen nicht
mehr gibt. Löschen behebt es immer; es gehen keine Daten verloren, `.next` wird beim nächsten
Start neu erzeugt.

Aus demselben Grund: den Entwicklungsserver stoppen, bevor `npm run build` läuft.

---

## Technische Hinweise

**Ohne Datenbank** rendert die Seite die Beispielkarte aus `src/lib/db/seed-data.json` und das
Backend erklärt, dass nichts gespeichert werden kann. Eine fehlende `DATABASE_URL` legt also
nie die ganze Website lahm.

**Zwischenspeicher**: Die öffentlichen Seiten werden statisch erzeugt und alle 15 Minuten
erneuert. Jede Änderung im Backend stößt zusätzlich sofort eine Erneuerung an.

**Anmeldung**: ein gemeinsames Passwort, geprüft in konstanter Zeit, dazu ein mit `AUTH_SECRET`
signiertes Cookie (HttpOnly, SameSite=Lax, zwölf Stunden). Die Middleware schützt `/admin`,
zusätzlich prüft jede Seite und jede Schreibaktion die Sitzung noch einmal selbst.

**Spam**: Das Reservierungsformular hat ein für Menschen unsichtbares Honigtopf-Feld, verlangt
eine Einwilligung und begrenzt Anfragen pro IP.

**Lokale Entwicklung ohne Neon**: Ist `NEON_FETCH_ENDPOINT` gesetzt, spricht der Treiber mit
diesem Endpunkt statt mit Neon — gedacht für einen lokalen Proxy. In der Produktion bleibt die
Variable leer.
