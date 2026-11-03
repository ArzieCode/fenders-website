'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
export function LoginForm() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }), cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) { setError(result.error || 'Login gagal'); return; }
      router.replace('/admin'); router.refresh();
    } catch { setError('Koneksi gagal'); }
    finally { setBusy(false); }
  }
  return <form onSubmit={login} style={{ display: 'grid', gap: 14 }}>
    <label>Email<input name="email" type="email" required autoComplete="username" style={inputStyle} /></label>
    <label>Kata sandi<input name="password" type="password" required autoComplete="current-password" style={inputStyle} /></label>
    {error && <p role="alert" style={{ color: '#ff9a9a' }}>{error}</p>}
    <button disabled={busy} style={buttonStyle}>{busy ? 'Memeriksa…' : 'Masuk'}</button>
  </form>;
}
export const inputStyle = { width: '100%', boxSizing: 'border-box' as const, display: 'block', marginTop: 6, padding: 10, borderRadius: 6, border: '1px solid #566b89', background: '#101d30', color: '#fff' };
export const buttonStyle = { background: '#24bba3', color: '#062627', border: 0, borderRadius: 6, padding: '10px 14px', cursor: 'pointer', fontWeight: 700 as const };
