import { cookies } from 'next/headers';

interface SessionPayload {
  userId: string;
  iat: number;
  exp: number;
}

const SESSION_COOKIE_NAME = 'entratix_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getAuthSecret(): string {
  const secret =
    process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET;
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'dev-auth-secret-change-me';
  }

  throw new Error(
    'Missing AUTH_SECRET (or NEXTAUTH_SECRET/JWT_SECRET). Set it in your environment.'
  );
}

function base64UrlEncode(bytes: Uint8Array): string {
  const base64 = Buffer.from(bytes).toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function sign(data: string): Promise<string> {
  const secret = getAuthSecret();
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(data)
  );
  return base64UrlEncode(new Uint8Array(signature));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function encode(payload: SessionPayload): Promise<string> {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = await sign(data);
  return `${data}.${signature}`;
}

function parsePayload(value: unknown): SessionPayload | null {
  if (typeof value !== 'object' || value === null) return null;
  if (!('userId' in value) || !('iat' in value) || !('exp' in value)) return null;

  const userId = (value as { userId: unknown }).userId;
  const iat = (value as { iat: unknown }).iat;
  const exp = (value as { exp: unknown }).exp;

  if (typeof userId !== 'string') return null;
  if (typeof iat !== 'number') return null;
  if (typeof exp !== 'number') return null;

  return { userId, iat, exp };
}

async function decode(token: string): Promise<SessionPayload | null> {
  const [data, signature] = token.split('.');
  if (!data || !signature) return null;

  const expected = await sign(data);
  if (!timingSafeEqual(signature, expected)) return null;

  try {
    const json = Buffer.from(data, 'base64url').toString('utf8');
    const parsed: unknown = JSON.parse(json);
    const payload = parsePayload(parsed);
    if (!payload) return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(userId: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const token = await encode({ userId, iat: now, exp: now + SESSION_TTL_SECONDS });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await decode(token);
  return payload?.userId ?? null;
}


