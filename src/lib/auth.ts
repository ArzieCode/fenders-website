import 'server-only';
import { createServerSupabase } from './supabase/server';
import { authenticatePrincipal } from './auth-check';

export async function verifiedPrincipal() {
  return authenticatePrincipal(await createServerSupabase());
}
