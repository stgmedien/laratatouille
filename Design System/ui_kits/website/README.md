# UI Kit — Website

Four-page recreation of the La Ratatouille site, built entirely from this design system's
components. Open `index.html`; navigation is client-side.

| File | Screen | Notes |
| --- | --- | --- |
| `index.html` | App shell + routing | NavBar goes transparent/dark over the hero pages |
| `Shell.jsx` | `Hero`, `Section`, `Footer`, `Placeholder` | Kit-level layout pieces, not design-system components |
| `HomeScreen.jsx` | Startseite | Hero, house intro, menu excerpt, pine quote band, event cards |
| `MenuScreen.jsx` | Karte | Course tabs, menu rows, allergen notice, 6-course menu block |
| `HouseScreen.jsx` | Das Haus | Story, three principles, press quote, contact facts |
| `ReserveScreen.jsx` | Reservierung | Full reservation form → confirm dialog → success notice |

**Imagery is placeholder.** No photography was supplied with the brief, so `Placeholder`
renders a drag-and-drop `<image-slot>` — drop your photos straight onto the page and they
persist. Warm, daylight, low-contrast imagery; see readme.md > Visual foundations.
