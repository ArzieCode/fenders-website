import { NextResponse, type NextRequest } from 'next/server';
import { randomUUID } from 'node:crypto';
import { verifiedPrincipal } from '@/lib/auth';
import { createServerSupabase } from '@/lib/supabase/server';
import { uploadMetadataSchema } from '@/lib/validation';
import { isSameOrigin } from '@/lib/origin';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request.headers.get('origin'), request.nextUrl.origin)) return reply({ error: 'Forbidden' }, 403);
  try {
    const principal = await verifiedPrincipal();
    if (!principal) return reply({ error: 'Unauthorized' }, 401);
    if (Number(request.headers.get('content-length') ?? 0) > 5_100_000) return reply({ error: 'Berkas terlalu besar' }, 413);
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return reply({ error: 'Berkas diperlukan' }, 400);
    const parsed = uploadMetadataSchema.safeParse({ name: file.name, type: file.type, size: file.size });
    if (!parsed.success) return reply({ error: 'Format atau ukuran berkas tidak valid' }, 400);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const starts = (signature: number[]) => signature.every((v, i) => bytes[i] === v);
    const valid = file.type === 'image/png' ? starts([137,80,78,71,13,10,26,10]) :
      file.type === 'image/jpeg' ? starts([255,216,255]) :
      starts([82,73,70,70]) && String.fromCharCode(...bytes.slice(8,12)) === 'WEBP';
    if (!valid) return reply({ error: 'Isi berkas tidak sesuai format' }, 400);
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/jpeg' ? 'jpg' : 'webp';
    const path = `portfolio/${randomUUID()}.${ext}`;
    const client = await createServerSupabase();
    const { error } = await client.storage.from('portfolio-assets').upload(path, bytes, { contentType: file.type, cacheControl: '3600', upsert: false });
    if (error) return reply({ error: 'Unggah gagal' }, 503);
    return reply({ path }, 201);
  } catch { return reply({ error: 'Unggah tidak tersedia' }, 503); }
}
