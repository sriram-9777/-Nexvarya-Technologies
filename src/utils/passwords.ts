// Browser-local account verification. This is not server authentication.
const encode = (bytes: Uint8Array) => Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
async function derive(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  return encode(new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: salt as BufferSource, iterations: 210000, hash: 'SHA-256' }, key, 256)));
}
export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2:${encode(salt)}:${await derive(password, salt)}`;
}
export async function verifyPassword(password: string, saved?: string) {
  if (!saved || !password) return false;
  if (!saved.startsWith('pbkdf2:')) return saved === password; // Legacy local accounts migrate after login.
  const [, salt, hash] = saved.split(':');
  if (!/^[a-f0-9]{32}$/.test(salt) || !/^[a-f0-9]{64}$/.test(hash)) return false;
  return await derive(password, Uint8Array.from(salt.match(/../g)!, byte => parseInt(byte, 16))) === hash;
}
