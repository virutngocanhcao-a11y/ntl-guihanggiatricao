// Dùng Web Crypto API (globalThis.crypto) thay vì module "crypto" của Node
// để tương thích với Edge runtime của Next.js middleware.

export const ADMIN_COOKIE = "ntl_admin_session";

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD chưa được cấu hình.");
  }
  const issuedAt = Date.now().toString();
  const signature = await hmacSha256Hex(secret, issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expected = await hmacSha256Hex(secret, issuedAt);
  return timingSafeEqual(expected, signature);
}

export function verifyPassword(password: string): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return timingSafeEqual(password, secret);
}
