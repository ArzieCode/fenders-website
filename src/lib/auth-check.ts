import { resolveRole } from './permissions.ts';

type Client = {
  auth: { getUser: () => Promise<{ data: { user: { id: string; email?: string } | null }; error: unknown }> };
  from: (table: string) => any;
};
export async function authenticatePrincipal(client: Client) {
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user?.id) return null;
  const { data: profile, error: profileError } = await client.from('profiles').select('role').eq('id', user.id).single();
  if (profileError || !profile) return null;
  const role = resolveRole(profile.role);
  return role ? { id: user.id, email: user.email, role } : null;
}
