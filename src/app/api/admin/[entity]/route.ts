import { NextResponse, type NextRequest } from 'next/server';
import { verifiedPrincipal } from '@/lib/auth';
import { createServerSupabase } from '@/lib/supabase/server';
import { entities, canRead, canManage, type Entity } from '@/lib/permissions';
import { parseEntity, type WritableEntity } from '@/lib/validation';
import { isSameOrigin } from '@/lib/origin';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
type Context = { params: Promise<{ entity: string }> };
const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
function entityOf(value: string): Entity | null { return entities.find(e => e === value) ?? null; }
export async function GET(request: NextRequest, context: Context) {
  try {
    const entity = entityOf((await context.params).entity);
    if (!entity) return reply({ error: 'Not found' }, 404);
    const principal = await verifiedPrincipal();
    if (!principal) return reply({ error: 'Unauthorized' }, 401);
    if (!canRead(principal.role, entity)) return reply({ error: 'Forbidden' }, 403);
    const page = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get('page')) || 1));
    const client = await createServerSupabase();
    const { data, count, error } = await client.from(entity).select('*', { count: 'exact' }).order('created_at', { ascending: false }).range((page - 1) * 25, page * 25 - 1);
    if (error) throw error;
    return reply({ data, count, page });
  } catch { return reply({ error: 'Data tidak tersedia' }, 503); }
}
export async function POST(request: NextRequest, context: Context) {
  if (!isSameOrigin(request.headers.get('origin'), request.nextUrl.origin)) return reply({ error: 'Forbidden' }, 403);
  try {
    const entity = entityOf((await context.params).entity);
    if (!entity) return reply({ error: 'Not found' }, 404);
    const principal = await verifiedPrincipal();
    if (!principal) return reply({ error: 'Unauthorized' }, 401);
    if (entity === 'project_inquiries' || !canManage(principal.role, entity)) return reply({ error: 'Forbidden' }, 403);
    if (Number(request.headers.get('content-length') ?? 0) > 30000) return reply({ error: 'Payload terlalu besar' }, 413);
    const parsed = parseEntity(entity as WritableEntity, await request.json());
    if (!parsed.success) return reply({ error: 'Input tidak valid', details: parsed.error.flatten().fieldErrors }, 400);
    const payload: Record<string, unknown> = { ...parsed.data };
    if (entity === 'project_notes') payload.author_id = principal.id;
    if (entity === 'portfolio_projects' && payload.is_published === true && !payload.published_at) payload.published_at = new Date().toISOString();
    const client = await createServerSupabase();
    const { data, error } = await client.from(entity).insert(payload).select().single();
    if (error) return reply({ error: 'Penyimpanan gagal', code: error.code }, 400);
    return reply({ data }, 201);
  } catch { return reply({ error: 'Penyimpanan tidak tersedia' }, 503); }
}
