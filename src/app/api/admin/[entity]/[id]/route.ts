import { NextResponse, type NextRequest } from 'next/server';
import { verifiedPrincipal } from '@/lib/auth';
import { createServerSupabase } from '@/lib/supabase/server';
import { entities, canManage, canDelete, type Entity } from '@/lib/permissions';
import { parseEntity, type WritableEntity } from '@/lib/validation';
import { isSameOrigin } from '@/lib/origin';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
type Context = { params: Promise<{ entity: string; id: string }> };
const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
async function gate(context: Context) {
  const { entity, id } = await context.params;
  const principal = await verifiedPrincipal();
  return { entity: entities.find(e => e === entity) as Entity | undefined, id, principal };
}
export async function PATCH(request: NextRequest, context: Context) {
  if (!isSameOrigin(request.headers.get('origin'), request.nextUrl.origin)) return reply({ error: 'Forbidden' }, 403);
  try {
    const { entity, id, principal } = await gate(context);
    if (!entity || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/.test(id)) return reply({ error: 'Not found' }, 404);
    if (!principal) return reply({ error: 'Unauthorized' }, 401);
    if (!canManage(principal.role, entity)) return reply({ error: 'Forbidden' }, 403);
    if (Number(request.headers.get('content-length') ?? 0) > 30000) return reply({ error: 'Payload terlalu besar' }, 413);
    const parsed = parseEntity(entity as WritableEntity, await request.json(), true);
    if (!parsed.success || Object.keys(parsed.data).length === 0) return reply({ error: 'Input tidak valid' }, 400);
    const payload: Record<string, unknown> = { ...parsed.data };
    if (entity === 'portfolio_projects' && payload.is_published === true) payload.published_at = new Date().toISOString();
    if (entity === 'portfolio_projects' && payload.is_published === false) payload.published_at = null;
    const client = await createServerSupabase();
    const { data, error } = await client.from(entity).update(payload).eq('id', id).select().maybeSingle();
    if (error) return reply({ error: 'Pembaruan gagal', code: error.code }, 400);
    if (!data) return reply({ error: 'Not found' }, 404);
    return reply({ data });
  } catch { return reply({ error: 'Pembaruan tidak tersedia' }, 503); }
}
export async function DELETE(request: NextRequest, context: Context) {
  if (!isSameOrigin(request.headers.get('origin'), request.nextUrl.origin)) return reply({ error: 'Forbidden' }, 403);
  try {
    const { entity, id, principal } = await gate(context);
    if (!entity || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/.test(id)) return reply({ error: 'Not found' }, 404);
    if (!principal) return reply({ error: 'Unauthorized' }, 401);
    if (!canDelete(principal.role, entity)) return reply({ error: 'Forbidden' }, 403);
    const client = await createServerSupabase();
    const { data, error } = await client.from(entity).delete().eq('id', id).select('id').maybeSingle();
    if (error) return reply({ error: 'Penghapusan gagal', code: error.code }, 400);
    if (!data) return reply({ error: 'Not found' }, 404);
    return reply({ success: true });
  } catch { return reply({ error: 'Penghapusan tidak tersedia' }, 503); }
}
