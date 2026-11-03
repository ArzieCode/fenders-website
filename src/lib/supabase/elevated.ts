import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { isValidSupabaseUrl } from './config';

/** Only call after server-side authorization, or for the validated public inquiry RPC. */
export function createElevatedSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key || !isValidSupabaseUrl(url)) throw new Error('Supabase secret configuration missing');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
