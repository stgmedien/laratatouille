#!/usr/bin/env node
/**
 * Baut public/images/lage.jpg aus OpenStreetMap-Kacheln.
 *
 *   npm run build:map
 *
 * Läuft nur, wenn sich die Adresse ändert — das Ergebnis liegt als Datei im
 * Projekt, damit Besucher der Website keine Anfrage an Dritte auslösen.
 * Die Koordinaten kommen aus src/lib/house.ts (HOUSE.geo); dieselben Werte
 * stehen hier noch einmal, weil das Skript kein TypeScript lesen kann.
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const LAT = 38.8196763;
const LON = -0.0344736;
const ZOOM = 16;
const WIDTH = 1200;
const HEIGHT = 900;
const TILE = 256;
const USER_AGENT = 'la-ratatouille-website/1.0 (one-off static map build; info@laratatouille.es)';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'lage.jpg');

/** Web-Mercator: Position in Pixeln auf der Weltkarte dieser Zoomstufe. */
function project(lat, lon, zoom) {
  const n = 2 ** zoom;
  return {
    x: ((lon + 180) / 360) * n * TILE,
    y: ((1 - Math.asinh(Math.tan((lat * Math.PI) / 180)) / Math.PI) / 2) * n * TILE,
  };
}

const centre = project(LAT, LON, ZOOM);
const left = centre.x - WIDTH / 2;
const top = centre.y - HEIGHT / 2;
const x0 = Math.floor(left / TILE);
const y0 = Math.floor(top / TILE);
const x1 = Math.floor((left + WIDTH) / TILE);
const y1 = Math.floor((top + HEIGHT) / TILE);

const parts = [];
for (let tx = x0; tx <= x1; tx++) {
  for (let ty = y0; ty <= y1; ty++) {
    const response = await fetch(`https://tile.openstreetmap.org/${ZOOM}/${tx}/${ty}.png`, {
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!response.ok) throw new Error(`Kachel ${ZOOM}/${tx}/${ty}: HTTP ${response.status}`);
    parts.push({
      input: Buffer.from(await response.arrayBuffer()),
      left: (tx - x0) * TILE,
      top: (ty - y0) * TILE,
    });
    // Freundlich zum Kachelserver bleiben.
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}

await mkdir(dirname(out), { recursive: true });
await sharp({
  create: {
    width: (x1 - x0 + 1) * TILE,
    height: (y1 - y0 + 1) * TILE,
    channels: 3,
    background: '#f2efe9',
  },
})
  .composite(parts)
  .extract({
    left: Math.round(left - x0 * TILE),
    top: Math.round(top - y0 * TILE),
    width: WIDTH,
    height: HEIGHT,
  })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out);

console.log(`  ${parts.length} Kacheln, Zoom ${ZOOM} → public/images/lage.jpg (${WIDTH}×${HEIGHT})`);
console.log('  Der Marker sitzt auf der Website in der Bildmitte, weil das Bild darauf zentriert ist.');
