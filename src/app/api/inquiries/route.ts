import { createHmac } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { inquirySchema } from '@/lib/validation';
import { trustedClientIp } from '@/lib/client-ip';
import { createElevatedSupabase } from '@/lib/supabase/elevated';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
const reply = (data: unknown, status: number) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(request: NextRequest) {
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 16000) return reply({ error: 'Payload terlalu besar' }, 413);
    const input = inquirySchema.safeParse(await request.json());
    if (!input.success) return reply({ error: 'Data formulir tidak valid', details: input.error.flatten().fieldErrors }, 400);
    if (input.data.website) return reply({ error: 'Data formulir tidak valid' }, 400);
    const ip = trustedClientIp(request.headers, process.env.NODE_ENV, request.nextUrl.host, process.env.NETLIFY === 'true');
    const salt = process.env.INQUIRY_HASH_SECRET;
    if (!ip || !salt || salt.length < 32) return reply({ error: 'Layanan belum tersedia' }, 503);
    const hash = (value: string) => createHmac('sha256', salt).update(value).digest('hex');
    const db = createElevatedSupabase();
    const { data, error } = await db.rpc('submit_public_inquiry', {
      p_name: input.data.name, p_email: input.data.email, p_company: input.data.company || null,
      p_service_slug: input.data.service_slug, p_message: input.data.message,
      p_ip_hash: hash(ip), p_email_hash: hash(input.data.email),
    });
    if (error) {
      if (error.code === '23514' && /rate limit/i.test(error.message)) return reply({ error: 'Terlalu banyak permintaan. Coba lagi nanti.' }, 429);
      if (error.code === '23514') return reply({ error: 'Data formulir tidak valid' }, 400);
      console.error('Inquiry RPC failed', error.code);
      return reply({ error: 'Permintaan belum tersimpan. Coba lagi nanti.' }, 503);
    }
    if (typeof data !== 'string') return reply({ error: 'Permintaan belum tersimpan. Coba lagi nanti.' }, 503);
    return reply({ id: data, success: true }, 201);
  } catch (error) {
    console.error('Inquiry unavailable', error instanceof Error ? error.name : 'unknown');
    return reply({ error: 'Permintaan belum tersimpan. Coba lagi nanti.' }, 503);
  }
}
