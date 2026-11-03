import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { createElevatedSupabase } from './supabase/elevated';
import { isValidSupabaseUrl } from './supabase/config';

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || !isValidSupabaseUrl(url)) throw new Error('Supabase configuration missing');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function getPublicData() {
  const client = publicClient();
  const [services, portfolio, reviews] = await Promise.all([
    client.from('services').select('id,slug,title,description,sort_order').eq('is_published', true).order('sort_order'),
    client.from('portfolio_projects').select('id,slug,title,summary,image_path,service_id,sort_order').eq('is_published', true).order('sort_order'),
    client.from('reviews').select('id,author_name,author_title,quote,rating').eq('is_published', true).not('consent_confirmed_at', 'is', null).order('created_at', { ascending: false }),
  ]);
  if (services.error || portfolio.error || reviews.error) throw new Error('Public content unavailable');
  const images = (portfolio.data ?? []).some(row => row.image_path);
  const storage = images ? createElevatedSupabase().storage.from('portfolio-assets') : null;
  const publicPortfolio = await Promise.all((portfolio.data ?? []).map(async row => {
    if (!row.image_path || !storage) return { ...row, image_url: null };
    const signed = await storage.createSignedUrl(row.image_path, 600);
    return { ...row, image_url: signed.error ? null : signed.data.signedUrl };
  }));
  return {
    services: services.data ?? [],
    portfolio: publicPortfolio,
    reviews: reviews.data ?? [],
  };
}
export const loadPublicData = getPublicData;
