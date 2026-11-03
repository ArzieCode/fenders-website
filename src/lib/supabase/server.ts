import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { isValidSupabaseUrl } from './config';

export function publicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || !isValidSupabaseUrl(url)) throw new Error('Supabase configuration missing');
  return { url, key };
}

export async function createServerSupabase() {
  const { url, key } = publicConfig();
  const store = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (items) => {
        try { items.forEach(({ name, value, options }) => store.set(name, value, options)); }
        catch { /* Server Component cannot write cookies; proxy refreshes them. */ }
      },
    },
  });
}
