import { neon, neonConfig } from '@neondatabase/serverless';

/**
 * The site runs without a database too: with no DATABASE_URL set, the menu
 * falls back to the bundled starter content (see seed-data.ts). That keeps
 * `npm run dev` working before Neon is wired up, and it keeps a missing
 * env var on Vercel from taking the whole site down.
 */
export const hasDatabase = Boolean(process.env.DATABASE_URL);

/**
 * For local development against a Postgres that is not Neon, point
 * NEON_FETCH_ENDPOINT at a proxy speaking the Neon HTTP protocol. Unset in
 * production, where the driver talks to Neon directly.
 */
if (process.env.NEON_FETCH_ENDPOINT) {
  neonConfig.fetchEndpoint = process.env.NEON_FETCH_ENDPOINT;
}

let cached: ReturnType<typeof neon> | null = null;

export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set.');
  if (!cached) cached = neon(url);
  return cached;
}
