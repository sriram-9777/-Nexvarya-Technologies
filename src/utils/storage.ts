export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = JSON.parse(raw);
    if (Array.isArray(fallback)) return Array.isArray(value) && value.every(item => item && typeof item === 'object') ? value as T : fallback;
    return value && typeof value === 'object' ? value : fallback;
  } catch { return fallback; }
}

export function saveStored(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {
    // Browsers can disable storage; keep the current session usable.
  }
}

export function readPreference(key: string, fallback: string) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}

export function savePreference(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Session-only preference. */ }
}
