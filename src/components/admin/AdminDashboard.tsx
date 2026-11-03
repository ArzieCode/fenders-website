'use client';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { buttonStyle, inputStyle } from './LoginForm';
import { adminPathForEntity } from '@/lib/admin-paths';
import { overviewItems } from '@/lib/overview';

type Row = Record<string, unknown> & { id: string };
type Field = { name: string; label: string; type?: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'checkbox' | 'select' | 'file'; options?: string[]; required?: boolean };
const f = (name: string, label: string, type?: Field['type'], required?: boolean, options?: string[]): Field => ({ name, label, type, required, options });
const fields: Record<string, Field[]> = {
  clients: [f('name','Nama klien','text',true),f('contact_name','Nama kontak'),f('email','Email','email'),f('phone','Telepon'),f('notes','Catatan','textarea')],
  projects: [f('title','Judul','text',true),f('client_id','ID klien (UUID)'),f('service_id','ID layanan (UUID)'),f('description','Deskripsi','textarea'),f('status','Status','select',false,['lead','planning','active','on_hold','completed','cancelled']),f('started_at','Mulai','date'),f('completed_at','Selesai','date')],
  services: [f('title','Judul','text',true),f('slug','Slug','text',true),f('description','Deskripsi','textarea'),f('sort_order','Urutan','number'),f('is_published','Tampilkan','checkbox')],
  portfolio_projects: [f('title','Judul','text',true),f('slug','Slug','text',true),f('summary','Ringkasan','textarea',true),f('project_id','ID proyek (UUID)'),f('service_id','ID layanan (UUID)'),f('image_path','Path gambar (unggah di bawah)'),f('sort_order','Urutan','number'),f('is_published','Tampilkan','checkbox')],
  project_inquiries: [f('status','Status','select',true,['new','contacted','qualified','closed','spam']),f('client_id','ID klien (UUID)'),f('project_id','ID proyek (UUID)')],
  reviews: [f('author_name','Nama penulis','text',true),f('author_title','Jabatan'),f('quote','Kutipan','textarea',true),f('rating','Rating 1–5','number'),f('project_id','ID proyek (UUID)'),f('client_id','ID klien (UUID)'),f('consent_confirmed_at','Waktu persetujuan (ISO 8601)'),f('is_published','Tampilkan','checkbox')],
  project_notes: [f('project_id','ID proyek (UUID)','text',true),f('body','Catatan','textarea',true)],
};
const labels: Record<string, string> = { clients: 'Klien', projects: 'Proyek', services: 'Layanan', portfolio_projects: 'Portofolio', project_inquiries: 'Permintaan', reviews: 'Ulasan', project_notes: 'Catatan proyek' };
const navStyle = { color: '#bcece3', padding: '8px 12px', display: 'inline-block' };
function serialize(form: HTMLFormElement, config: Field[], editing: boolean) {
  const data = new FormData(form);
  const value: Record<string, unknown> = {};
  for (const field of config) {
    if (editing && field.name === 'project_id' && !data.get(field.name)) continue;
    if (field.type === 'checkbox') { value[field.name] = data.has(field.name); continue; }
    const raw = String(data.get(field.name) ?? '').trim();
    if (raw) value[field.name] = field.type === 'number' ? Number(raw) : raw;
    else if (editing) value[field.name] = null;
  }
  return value;
}
export function AdminDashboard({ user, entity }: { user: { id: string; email?: string; role: string }; entity?: string }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const [editing, setEditing] = useState<Row | null>(null); const [page, setPage] = useState(1); const [total, setTotal] = useState(0); const [busy, setBusy] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const load = useCallback(async () => {
    try {
      const url = entity && fields[entity] ? `/api/admin/${entity}?page=${page}` : '/api/admin/overview';
      const response = await fetch(url, { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Data gagal dimuat');
      if ('data' in result) { setRows(result.data ?? []); setTotal(result.count ?? 0); }
      else setCounts(result.counts ?? {});
      setError('');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Data gagal dimuat'); }
  }, [entity, page]);
  useEffect(() => { void load(); }, [load]);
  async function logout() {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (!response.ok) { setError('Logout gagal'); return; }
    router.replace('/admin/login'); router.refresh();
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!entity || busy) return;
    setBusy(true); setError(''); setMessage('');
    const payload = serialize(event.currentTarget, fields[entity], !!editing);
    if (entity === 'portfolio_projects' && imagePath) payload.image_path = imagePath;
    try {
      const response = await fetch(`/api/admin/${entity}${editing ? `/${editing.id}` : ''}`, { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Penyimpanan gagal');
      setMessage('Perubahan tersimpan'); setEditing(null); setImagePath(''); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Penyimpanan gagal'); }
    finally { setBusy(false); }
  }
  async function remove(id: string) {
    if (!entity || !confirm('Hapus data ini secara permanen?')) return;
    try {
      const response = await fetch(`/api/admin/${entity}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Penghapusan gagal');
      setMessage('Data dihapus'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Penghapusan gagal'); }
  }
  async function upload(file: File) {
    const body = new FormData(); body.set('file', file);
    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unggah gagal');
      setImagePath(result.path); setMessage(`Gambar tersimpan: ${result.path}. Simpan formulir untuk menautkannya.`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unggah gagal'); }
  }
  const config = entity ? fields[entity] : undefined;
  return <main style={{ maxWidth: 1200, margin: 'auto' }}>
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid #37516c' }}><h1>Fanders · Admin</h1><div>{user.email} · {user.role} <button onClick={logout} style={{ ...buttonStyle, marginLeft: 16 }}>Keluar</button></div></header>
    <nav aria-label="Navigasi admin" style={{ margin: '20px 0' }}><a href="/admin/dashboard" style={navStyle}>Ringkasan</a>{Object.entries(labels).map(([key,label]) => <a key={key} href={adminPathForEntity(key as Parameters<typeof adminPathForEntity>[0])} style={navStyle}>{label}</a>)}<a href="/admin/settings" style={navStyle}>Pengaturan</a></nav>
    {error && <p role="alert" style={{ color: '#ff9a9a' }}>{error}</p>}{message && <p role="status" style={{ color: '#9be7d9' }}>{message}</p>}
    {entity === 'settings' ? <section><h2>Pengaturan akun</h2><p>Email: {user.email}</p><p>Peran: {user.role}</p><p>Perubahan role dan akun dilakukan oleh operator database.</p><button onClick={logout} style={buttonStyle}>Keluar dari akun</button></section> :
    !config ? <section><h2>Ringkasan</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>{overviewItems(counts).map(item => <a href={item.href} key={item.key} style={{ background: '#182841', color: '#e8efff', padding: 20, borderRadius: 8, minWidth: 150 }}>{item.label}<strong style={{ display: 'block', fontSize: 28 }}>{item.value}</strong></a>)}</div></section> :
    <section><h2>{labels[entity!]}</h2><p>{total} catatan</p>
      <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr><th style={{ textAlign: 'left' }}>ID</th><th style={{ textAlign: 'left' }}>Data</th><th>Tindakan</th></tr></thead><tbody>{rows.map(row => <tr key={row.id} style={{ borderTop: '1px solid #37516c' }}><td style={{ padding: 10, fontSize: 12 }}>{row.id}</td><td style={{ padding: 10, maxWidth: 500, wordBreak: 'break-word' }}>{String(row.title || row.name || row.author_name || row.email || row.body || row.id)}{row.status ? ` · ${row.status}` : ''}{entity === 'project_inquiries' && <details style={{ marginTop: 8 }}><summary>Rincian permintaan</summary><p>Email: {String(row.email ?? '')}</p><p>Perusahaan: {String(row.company ?? '—')}</p><p>Pesan: {String(row.message ?? '')}</p><p>ID layanan: {String(row.service_id ?? '—')}</p><p>ID klien: {String(row.client_id ?? '—')}</p><p>ID proyek: {String(row.project_id ?? '—')}</p></details>}</td><td style={{ whiteSpace: 'nowrap' }}><button onClick={() => { setEditing(row); setImagePath(''); }} style={buttonStyle}>Ubah</button> {user.role === 'admin' && entity !== 'project_inquiries' && <button onClick={() => remove(row.id)} style={{ ...buttonStyle, background: '#eeb4a3' }}>Hapus</button>}</td></tr>)}</tbody></table></div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '14px 0' }}><button disabled={page <= 1} onClick={() => setPage(page - 1)}>Sebelumnya</button><span>Halaman {page}</span><button disabled={page * 25 >= total} onClick={() => setPage(page + 1)}>Berikutnya</button></div>
      {entity !== 'project_inquiries' && <button onClick={() => { setEditing(null); setImagePath(''); }} style={buttonStyle}>Tambah baru</button>}
      {(entity !== 'project_inquiries' || editing) && <form key={editing?.id ?? 'new'} onSubmit={save} style={{ display: 'grid', gap: 12, maxWidth: 650, marginTop: 20, padding: 20, background: '#182841', borderRadius: 8 }}><h3>{editing ? 'Ubah data' : 'Tambah data'}</h3>{config.map(field => <label key={field.name}>{field.label}{field.type === 'textarea' ? <textarea name={field.name} defaultValue={String(editing?.[field.name] ?? '')} required={field.required} rows={4} style={inputStyle} /> : field.type === 'select' ? <select name={field.name} defaultValue={String(editing?.[field.name] ?? field.options?.[0] ?? '')} style={inputStyle}>{field.options?.map(item => <option key={item} value={item}>{item}</option>)}</select> : <input name={field.name} type={field.type === 'checkbox' ? 'checkbox' : field.type || 'text'} defaultValue={field.type === 'checkbox' ? undefined : String(editing?.[field.name] ?? '')} defaultChecked={field.type === 'checkbox' ? Boolean(editing?.[field.name]) : undefined} required={field.required} style={field.type === 'checkbox' ? { marginLeft: 12 } : inputStyle} />}</label>)}
        {entity === 'portfolio_projects' && <label>Unggah gambar publik (PNG/JPEG/WebP, maks. 5 MB)<input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file); }} style={inputStyle} /></label>}
        <button disabled={busy} style={buttonStyle}>{busy ? 'Menyimpan…' : 'Simpan'}</button>
      </form>}
    </section>}
  </main>;
}
