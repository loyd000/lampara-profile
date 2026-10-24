// One shared password (ADMIN_PASSWORD) guards /admin. Signing in sets an httpOnly cookie holding an
// HMAC keyed by that password, so changing the password signs everyone out.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'lampara_admin';
const token = (password: string) => createHmac('sha256', password).update('lampara-admin').digest();

function same(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const password = process.env.ADMIN_PASSWORD;
  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(password && value && same(Buffer.from(value, 'hex'), token(password)));
}

// ponytail: no attempt limit; add one (or a longer password) if the admin URL gets hammered.
export async function signIn(attempt: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !same(token(attempt), token(password))) return false;
  (await cookies()).set(COOKIE, token(password).toString('hex'), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
}
