import { redirect } from 'next/navigation';
import { verifiedPrincipal } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';
export const dynamic = 'force-dynamic';
export default async function LoginPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  if (configured && await verifiedPrincipal()) redirect('/admin/dashboard');
  if (!configured) return <main style={{ maxWidth: 520, margin: '15vh auto', background: '#182841', padding: 32, borderRadius: 12 }}><h1>FANDERS · Admin</h1><p>Login belum tersedia karena Supabase belum dikonfigurasi. Atur variabel di <code>.env.local</code>, jalankan migrasi, dan buat akun admin sesuai README. Tidak ada akun demo.</p><a href="/" style={{ color: '#b7de5d' }}>Kembali ke website</a></main>;
  return <main style={{ maxWidth: 420, margin: '15vh auto', background: '#182841', padding: 32, borderRadius: 12 }}><h1>Masuk Fanders Admin</h1><LoginForm /></main>;
}
