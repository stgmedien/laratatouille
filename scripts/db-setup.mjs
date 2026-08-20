#!/usr/bin/env node
/**
 * Creates the menu schema in Neon and, with --seed, writes the starter menu.
 *
 *   npm run db:setup     schema only (safe to run repeatedly)
 *   npm run db:seed      schema + starter content (skips if dishes exist)
 *   npm run db:seed -- --force   replaces the menu with the starter content
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { neon, neonConfig } from '@neondatabase/serverless';

const here = dirname(fileURLToPath(import.meta.url));
const dbDir = join(here, '..', 'src', 'lib', 'db');

const args = process.argv.slice(2);
const wantsSeed = args.includes('--seed');
const force = args.includes('--force');

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('\n  DATABASE_URL ist nicht gesetzt.');
  console.error('  Lege .env.local an (siehe .env.example) oder exportiere die Variable.\n');
  process.exit(1);
}

// Same local-development escape hatch as src/lib/db/client.ts.
if (process.env.NEON_FETCH_ENDPOINT) neonConfig.fetchEndpoint = process.env.NEON_FETCH_ENDPOINT;

const sql = neon(url);

async function main() {
  const schema = await readFile(join(dbDir, 'schema.sql'), 'utf8');

  // The HTTP driver runs one statement per request, so split the file.
  const statements = schema
    .split(';')
    .map((s) => s.replace(/^\s*--.*$/gm, '').trim())
    .filter(Boolean);

  for (const statement of statements) {
    // The driver reserves the call form for tagged templates; raw DDL goes
    // through sql.query().
    await sql.query(statement);
  }
  console.log(`  Schema angelegt (${statements.length} Anweisungen).`);

  if (!wantsSeed) return;

  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM dishes`;
  if (count > 0 && !force) {
    console.log(`  Es stehen bereits ${count} Gerichte in der Datenbank — Seed übersprungen.`);
    console.log('  Mit "npm run db:seed -- --force" wird die Karte ersetzt.');
    return;
  }

  const { categories, settings, reviews } = JSON.parse(await readFile(join(dbDir, 'seed-data.json'), 'utf8'));

  if (force) {
    await sql`DELETE FROM dishes`;
    await sql`DELETE FROM categories`;
    await sql`DELETE FROM reviews`;
  }

  for (const c of categories) {
    const [{ id }] = await sql`
      INSERT INTO categories (sort_order, is_published, name_de, name_es, name_en, intro_de, intro_es, intro_en)
      VALUES (${c.sort_order}, ${c.is_published}, ${c.name_de}, ${c.name_es}, ${c.name_en},
              ${c.intro_de}, ${c.intro_es}, ${c.intro_en})
      RETURNING id
    `;
    for (const d of c.dishes) {
      await sql`
        INSERT INTO dishes (
          category_id, sort_order, is_published, is_highlight, price,
          name_de, name_es, name_en,
          description_de, description_es, description_en,
          origin_de, origin_es, origin_en, tags
        ) VALUES (
          ${id}, ${d.sort_order}, ${d.is_published}, ${d.is_highlight}, ${d.price},
          ${d.name_de}, ${d.name_es}, ${d.name_en},
          ${d.description_de}, ${d.description_es}, ${d.description_en},
          ${d.origin_de}, ${d.origin_es}, ${d.origin_en},
          ${`{${d.tags.join(',')}}`}::text[]
        )
      `;
    }
    console.log(`  Kategorie "${c.name_de}" mit ${c.dishes.length} Gerichten angelegt.`);
  }

  await sql`
    UPDATE menu_settings SET
      eyebrow_de = ${settings.eyebrow_de}, eyebrow_es = ${settings.eyebrow_es}, eyebrow_en = ${settings.eyebrow_en},
      title_de = ${settings.title_de}, title_es = ${settings.title_es}, title_en = ${settings.title_en},
      intro_de = ${settings.intro_de}, intro_es = ${settings.intro_es}, intro_en = ${settings.intro_en},
      set_menu_title_de = ${settings.set_menu_title_de}, set_menu_title_es = ${settings.set_menu_title_es}, set_menu_title_en = ${settings.set_menu_title_en},
      set_menu_body_de = ${settings.set_menu_body_de}, set_menu_body_es = ${settings.set_menu_body_es}, set_menu_body_en = ${settings.set_menu_body_en},
      updated_at = NOW()
    WHERE id = 1
  `;
  console.log('  Karten-Texte gesetzt.');

  const [{ count: reviewCount }] = await sql`SELECT COUNT(*)::int AS count FROM reviews`;
  if (reviewCount === 0) {
    for (const r of reviews) {
      await sql`
        INSERT INTO reviews (sort_order, is_published, quote, author, source)
        VALUES (${r.sort_order}, ${r.is_published}, ${r.quote}, ${r.author}, ${r.source})
      `;
    }
    console.log(`  ${reviews.length} Gästestimmen angelegt.`);
  }

  console.log('\n  Fertig. Bitte Karte und Gästestimmen im Backend gegenprüfen.\n');
}

main().catch((error) => {
  console.error('\n  Fehler:', error.message, '\n');
  process.exit(1);
});
