/**
 * Backend login: one shared password, checked against ADMIN_PASSWORD, and a
 * cookie signed with AUTH_SECRET. Web Crypto is used throughout so the same
 * code runs in the Edge middleware and in Node server actions.
 */

export const SESSION_COOKIE = 'lr_admin';
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function secret(): string | null {
  const value = process.env.AUTH_SECRET;
  return value && value.length >= 16 ? value : null;
}

async function key(rawSecret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw', encoder.encode(rawSecret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'],
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

/** `<expiry-ms>.<signature>` — stateless, so no session store is needed. */
export async function createSessionToken(): Promise<string | null> {
  const rawSecret = secret();
  if (!rawSecret) return null;

  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  const signature = await crypto.subtle.sign('HMAC', await key(rawSecret), encoder.encode(expires));
  return `${expires}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const rawSecret = secret();
  if (!rawSecret || !token) return false;

  const [expires, signature] = token.split('.');
  if (!expires || !signature) return false;

  const expiresAt = Number(expires);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  try {
    return await crypto.subtle.verify(
      'HMAC', await key(rawSecret),
      fromBase64Url(signature) as unknown as ArrayBuffer,
      encoder.encode(expires),
    );
  } catch {
    return false;
  }
}

/** Constant-time comparison, so a wrong password reveals nothing by timing. */
export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const a = encoder.encode(candidate);
  const b = encoder.encode(expected);
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

/** True when both secrets are present — the admin area is unusable otherwise. */
export function authConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && secret() !== null;
}
