import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from './auth';

/**
 * Second lock on the door. The middleware already redirects unauthenticated
 * requests, but every page and every action checks again — middleware is a
 * routing concern, not an authorisation boundary.
 */
export async function requireSession(): Promise<void> {
  const store = await cookies();
  const valid = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!valid) redirect('/admin/login');
}
