export function isSameOrigin(origin: string | null, requestOrigin: string): boolean {
  if (!origin) return false;
  try { return new URL(origin).origin === requestOrigin; }
  catch { return false; }
}
