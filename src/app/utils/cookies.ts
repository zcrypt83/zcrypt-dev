export function setJsonCookie(name: string, value: unknown, days = 45): void {
  if (typeof document === "undefined") return;

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);
  const encodedValue = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${name}=${encodedValue}; expires=${expiresAt.toUTCString()}; path=/; SameSite=Lax`;
}

export function getJsonCookie<T>(name: string): T | null {
  if (typeof document === "undefined") return null;

  const target = `${name}=`;
  const cookies = document.cookie.split(";");

  for (const rawCookie of cookies) {
    const cookie = rawCookie.trim();
    if (!cookie.startsWith(target)) continue;

    const value = cookie.slice(target.length);
    try {
      return JSON.parse(decodeURIComponent(value)) as T;
    } catch {
      return null;
    }
  }

  return null;
}
