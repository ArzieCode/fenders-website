# FANDERS — website publik dan dashboard operasional

> **Tahap penyimpanan source sebelum database:** folder `supabase/` dan `docs/schema-smoke.sql` sengaja belum ikut commit/push tahap ini. Langkah migrasi di bawah berlaku untuk workspace lokal dan baru dapat dijalankan dari clone setelah berkas database disertakan pada revisi berikutnya. Jangan deploy backend atau mencoba menyimpan data produksi dari commit ini.

Repositori ini berisi website FANDERS berbasis Next.js App Router, React, TypeScript, Tailwind CSS dan Supabase PostgreSQL/Auth/Storage. Desain mengambil identitas visual dan aset dari referensi V3, tetapi bagian demo dan navigasi yang tidak diperlukan dihilangkan. Komponen publik tetap terpisah dari akses database dalam `src/lib`; backend dapat dipindahkan ke API Laravel di masa depan. Hosting awal ditargetkan ke Netlify Free, bukan VPS. Tidak ada klien, portofolio komersial, atau ulasan fiktif yang di-seed.

**Tanpa Supabase**, homepage tetap dapat dilihat dengan keterangan konten database belum tersedia; form menampilkan kegagalan nyata, dan `/admin/login` menjelaskan konfigurasi yang dibutuhkan. Jangan menafsirkan build yang berhasil sebagai bukti login, upload, dan penyimpanan inquiry telah diuji pada layanan cloud.

## Bagian aplikasi

- `/`: hero, karya internal yang diberi label jelas, layanan, proses, tim, penyusun brief lokal, FAQ, dan formulir konsultasi. Karya/ulasan klien hanya berasal dari rekaman terbit; layanan admin yang terbit menggantikan teks awal. Logo dan font ada di `public/assets/`.
- `/admin/login`, `/admin/dashboard`, `/admin/clients`, `/admin/projects`, `/admin/services`, `/admin/portfolio`, `/admin/inquiries`, `/admin/settings`: login dan dashboard untuk akun Auth dengan role `admin` atau `staff` yang diverifikasi dari `profiles`. API ada di `src/app/api/` dan validasi/akses data di `src/lib/`. Route admin dan API privat tidak di-cache.
- `supabase/migrations/`: skema, RLS, trigger, bucket Storage dan RPC inquiry. `docs/schema-smoke.sql`: pemeriksaan migrasi lokal. Source Vite lama dipindahkan tanpa mengubah isinya ke `legacy/vite/` sebagai arsip pekerjaan sebelumnya; **server aktif menggunakan Next.js**, bukan Vite. Dependensi Vite lama tidak dipasang untuk aplikasi produksi.

## Mulai lokal

Prasyarat: Node.js/npm kompatibel dengan versi dependensi di `package.json`. Dari akar repositori:

```sh
npm install
npm run dev       # Next.js: http://localhost:3000 (default)
npm run lint      # pemeriksaan TypeScript
npm run test      # tes aplikasi (bila tersedia)
npm run build     # output Next.js; gunakan adapter hosting untuk SSR/API
npm run start     # jalankan hasil build lokal
```

Salin `.env.example` ke `.env.local` dan isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (aman untuk browser dengan RLS), `SUPABASE_SECRET_KEY`, dan `INQUIRY_HASH_SECRET` (dua yang terakhir hanya server). **Jangan menaruh secret di `NEXT_PUBLIC_*` atau bundel browser**. Periksa implementasi endpoint dan tesnya sebelum menggunakan kredensial produksi.[2] Jalankan ulang server setelah mengubah env. `npm run test` memakai Node test runner dan tidak memerlukan file referensi dalam Downloads.

## Skema dan kontrak akses

Migrasi `supabase/migrations/20261103000000_initial_schema.sql` membuat `profiles`, `clients`, `projects`, `services`, `portfolio_projects`, `project_inquiries`, `reviews`, `project_notes`, `inquiry_rate_limits` dan bucket privat `portfolio-assets` (gambar JPEG/PNG/WebP maksimal 5 MiB). RLS aktif pada sembilan tabel. Pengunjung hanya membaca layanan/portofolio yang `is_published`, serta review yang terbit **dan** disetujui. Klien, proyek internal, catatan, inquiry dan penghitung rate limit privat. Staf dapat mengelola konten/klien/proyek sesuai policy; penghapusan hanya admin. Profil dapat dibaca pemiliknya, tetapi **tidak dapat ditulis oleh user biasa, termasuk admin JWT**; penetapan/promosi role adalah tindakan operator SQL tepercaya. Key secret server melewati RLS dan harus diperlakukan sebagai akses superuser aplikasi.[2][4]

Bucket `portfolio-assets` bersifat privat. Admin/staf dapat mengunggah gambar, tetapi hanya halaman server yang membaca baris portofolio **terbit** dapat membuat signed URL berumur 10 menit; draft tidak mendapatkan tautan publik. Unggah hanya aset yang hak penggunaannya telah dikonfirmasi, bukan dokumen atau identitas klien. Kebijakan Storage membatasi upload/update pada staf dan delete pada admin. Signed URL yang sudah terbit tetap dapat dibuka sampai kedaluwarsa meskipun portofolio langsung ditarik; jangan gunakan bucket ini untuk dokumen sangat rahasia.[4]

Layanan publik awal yang disediakan migrasi: `website-aplikasi-web`, `ui-ux-prototipe`, `dashboard-solusi-data`, dan `integrasi-sistem`. `general-collaboration` hanya dipakai formulir umum dan tidak diterbitkan sebagai layanan. Tidak ada seed untuk klien/proyek/review. Publikasi review memerlukan `consent_confirmed_at` dari persetujuan nyata; tinjau teks serta izin pemiliknya terlebih dahulu.

## Supabase: proyek dan migrasi

1. Buat proyek Supabase sendiri; simpan password database dan recovery akun di pengelola rahasia. Periksa wilayah, URL, dan project ref yang benar. Jangan menaruh kunci di GitHub atau deploy log. Pasang Supabase CLI menurut dokumentasi resmi. Untuk menguji lokal, CLI dan Docker diperlukan.
2. Pada proyek **baru/kosong**, dari akar repo jalankan `supabase init` jika belum ada `supabase/config.toml`; perintah ini membuat konfigurasi lokal (di luar lingkup perubahan ini). Lalu `supabase start`, `supabase db reset` untuk menerapkan migrasi lokal. **`db reset` menghancurkan data lokal**; jangan jalankan terhadap database produksi. Jalankan `psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f docs/schema-smoke.sql` pada database lokal disposable, dengan `DATABASE_URL` koneksi lokal berhak membuat perubahan; tes memakai transaksi dan rollback. Jangan arahkan ke produksi.
3. Jika proyek remote sudah pernah diubah lewat Dashboard, rekonsiliasi riwayat dengan `supabase db pull` dan uji reset lokal terlebih dahulu; **jangan** langsung push migrasi atas skema yang bertabrakan. Login CLI (`supabase login`), tautkan proyek secara eksplisit (`supabase link --project-ref <PROJECT_REF>`), periksa `supabase migration list`, lalu `supabase db push` hanya setelah backup dan review SQL. Setelah menggunakan migrasi, ubah skema via migrasi berikutnya, bukan Table Editor remote.[1]
4. Periksa di Dashboard: kesembilan tabel memiliki RLS; `anon` tidak dapat membaca `clients`, `projects`, `project_inquiries`, `inquiry_rate_limits` atau mengeksekusi RPC; hanya konten terbit terbaca anonim. Uji operasi CRUD menggunakan user staf/admin sungguhan di lingkungan staging. Smoke SQL menguji tabel, grant, input invalid, dan batas lima per jam, tetapi belum membuktikan integrasi HTTP atau kompetisi antar-request.

## Auth dan bootstrap role yang aman

Dalam Supabase Dashboard, matikan **Allow new users to sign up** serta anonymous sign-in (jika diaktifkan); aktifkan metode login yang disetujui dan proteksi akun/MFA sesuai kebutuhan. Buat/invite akun staf secara manual dari Auth > Users dan verifikasi email. Jangan membuat profil otomatis dari `raw_user_meta_data`, jangan membuka endpoint signup publik, jangan memberi akun staf hak mengubah role. Pengaturan signup dapat berubah nama di antarmuka; cek opsi Auth saat penerapan.[3]

Setelah akun Auth benar-benar dibuat, salin **UID yang persis** dari Dashboard. Operator tepercaya menjalankan SQL berikut pada SQL editor untuk UID spesifik (ganti placeholder; jangan commit UID/identitas):

```sql
INSERT INTO public.profiles (id, role, display_name)
VALUES ('<UID_AUTH_USER>'::uuid, 'admin', '<NAMA_PENGELOLA>');
-- Akun berikutnya: ganti UID dan role menjadi 'staff' bila sesuai.
SELECT id, role, display_name FROM public.profiles WHERE id = '<UID_AUTH_USER>'::uuid;
```

Jangan jalankan dari browser/API anon/authenticated. Kenaikan admin, perubahan role, dan pencabutan akses dilakukan manual oleh operator database berwenang dengan audit/approval internal; untuk pencabutan, hapus profil dan cabut sesi/nonaktifkan akun Auth. Jangan sebarkan secret key ke user staf. Jika role user baru diubah, refresh sesi sebelum menguji UI.

## Kontrak backend inquiry (penting)

Endpoint server yang dipercaya harus memvalidasi request, menerapkan proteksi bot/CAPTCHA dan pembatasan di tepi jaringan, memperoleh IP **dari header proxy tepercaya** (`x-nf-client-connection-ip` hanya ketika berjalan di Netlify; bukan `X-Forwarded-For` arbitrer yang diberikan client), menormalkan IP dan email (`lower(trim(email))`), lalu menghitung **HMAC-SHA256 hex lowercase** untuk masing-masing dengan pepper server yang panjang/acak dan disimpan hanya di secret manager. Jangan simpan/log IP mentah atau pepper; gunakan satu pepper stabil untuk semua instance selama jendela rate limit. Jika pepper diputar, penghitung lama tidak lagi mencocokkan hash baru. Tolak IP yang tidak dapat dipercaya/ditentukan (jangan gunakan satu hash bersama seluruh pengunjung). Fingerprint harus diturunkan dari nilai input, bukan dikirim browser. Tambahkan batas ukuran body, validasi email/pesan, dan respons aman tanpa menampilkan data pribadi di log.

Panggil `rpc('submit_public_inquiry', { p_name, p_email, p_company, p_service_slug, p_message, p_ip_hash, p_email_hash })` **hanya dari server** dengan Supabase secret key (`sb_secret_...`) / legacy `service_role` key, tanpa JWT user yang akan menurunkan role; jangan gunakan publishable key. Nilai slug harus salah satu layanan terbit atau `general-collaboration` untuk pesan umum. `p_company` boleh `null`; argumen lain wajib. RPC mengembalikan UUID inquiry jika sukses. SQL memvalidasi nama 1–120, email 3–254 dengan format dasar, perusahaan 1–160 bila ada, pesan 10–5000, slug layanan terbit, serta dua hash hex 64 karakter. Batas transaksional: maksimum **5 submission yang berhasil per hash IP dan per hash email per jam UTC** (fixed hourly window); transaksi dibatalkan penuh saat salah satu batas gagal. Penyerang yang mengganti IP/email dapat menghindari batas; rate limit ini bukan pengganti WAF/CAPTCHA. `23514` dipakai untuk validasi/rate limit; backend perlu memetakan secara aman (mis. 400/429) dan tidak membocorkan SQL error mentah. `inquiry_rate_limits` harus dibersihkan berkala oleh job server/DB terpercaya, misalnya `DELETE FROM public.inquiry_rate_limits WHERE window_start < now() - interval '2 days';` (bukan dari browser). Pembersihan tidak dijadwalkan oleh migrasi.

Route Handler `src/app/api/inquiries/route.ts` memakai nama RPC/argumen tersebut. Browser hanya mengirim setelah kotak persetujuan privasi dicentang; backend memvalidasi persetujuan dan RPC mencatat `privacy_consented_at`. **Belum ada notifikasi email otomatis**, jadi cek dashboard setelah integrasi. Pengujian credential-dependent masih perlu dilakukan. Publishable key boleh ada di browser untuk read-only konten terbit, tapi jangan menambahkan kebijakan insert inquiry untuk anon.[2]

## GitHub dan Netlify

1. Buat repo GitHub privat bila memuat pekerjaan internal; periksa `git status`, `.gitignore`, dan diff. Jangan commit `.env`, password DB, kunci secret, pepper, dump, atau file klien. Berikan akses kolaborator minimum dan review perubahan migrasi sebelum merge. Push hanya jika operator menyetujuinya.
2. Pada Netlify pilih **Add new project > Import an existing project**, hubungkan GitHub dan branch yang benar. Base directory akar repo; deteksi Next.js/OpenNext otomatis, tanpa plugin atau `netlify.toml` buatan tangan. Periksa build command `npm run build` dan konfigurasi yang Netlify deteksi, **jangan set publish directory `dist` (itu khusus Vite)**. Uji Deploy Preview, SSR/API, dan URL situs; kaitkan custom domain dan HTTPS setelah DNS diverifikasi.[7][10]
3. Variabel di Netlify UI disetel menurut scope yang tepat: `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` untuk build, `SUPABASE_SECRET_KEY` dan `INQUIRY_HASH_SECRET` untuk runtime fungsi/server sesuai kebutuhan adapter. Jangan menganggap `.env.local` dibaca build Netlify. **Jangan set secret key sebagai `NEXT_PUBLIC_*`**; prefiks itu akan dibundel ke browser. Verifikasi log fungsi dan uji kirim inquiry end-to-end, termasuk penolakan limit dan RLS, sebelum menyatakan fitur aktif.[8][10]
4. Penerapan perubahan skema Supabase terpisah dari deploy Netlify, jadi koordinasikan urutan migrasi dan aplikasi.

## Cadangan, pemulihan, biaya

Supabase Free dapat dipause setelah periode aktivitas rendah dan tidak menyediakan unduhan backup otomatis seperti paket berbayar; kebijakan, kuota dan harga dapat berubah, periksa Dashboard/dokumentasi saat memilih paket. Buat ekspor berkala dengan `supabase db dump` sesuai dokumentasi dan simpan terenkripsi di lokasi terpisah, termasuk pemeriksaan data Auth/Storage yang diperlukan; dump DB saja **tidak menjamin** berkas Storage tercadangkan. Uji restore ke proyek terisolasi secara berkala, catat recovery point, sebelum operasi destruktif. Jangan commit dump. Jadwalkan pembersihan penghitung seperti di atas dan pantau kuota/storage/email Auth.[5][6]

## Jika backend Laravel dipilih kemudian

Repositori **bukan proyek Laravel** saat ini; `php artisan` tidak dapat dijalankan di sini. Untuk layanan Laravel terpisah, tempatkan `.env` dan `APP_KEY` secara aman di host, jangan expose `APP_DEBUG=true` di produksi, siapkan PHP/Composer, server web, TLS, queue worker/scheduler bila diperlukan, dan pantau log. Integrasi ke Supabase dapat melalui API/RPC server-side dengan secret key atau koneksi Postgres terbatas; jangan menggunakan akun database superuser dalam handler publik. Migration SQL di sini tetap sumber kebenaran skema Supabase: jangan menggandakan tabel dengan `php artisan migrate`. Jika kelak Laravel memiliki skema tersendiri, migrasi Laravel diuji/deploy terpisah dengan backup dan konfirmasi operator. Adapter Next.js Netlify tidak menjalankan runtime PHP/Laravel.[9][10]

## Status verifikasi

SQL migrasi dan smoke test tersedia; sintaks dan alur transaksi dasar telah diuji pada PostgreSQL embedded (PGlite) dengan stub skema Auth/Storage, **bukan** instance Supabase sungguhan. Tanpa kredensial proyek dan pengujian end-to-end di Supabase staging, belum ada bukti migrasi remote, login, upload, atau kirim inquiry live. Jangan menyebutnya sudah terpasang sebelum diuji.

## Sources

[1] https://supabase.com/docs/guides/deployment/database-migrations
[2] https://supabase.com/docs/guides/getting-started/api-keys
[3] https://supabase.com/docs/guides/auth/general-configuration
[4] https://supabase.com/docs/guides/storage/security/access-control
[5] https://supabase.com/docs/guides/platform/backups
[6] https://supabase.com/docs/guides/platform/free-project-pausing
[7] https://docs.netlify.com/start/quickstarts/deploy-from-repository
[8] https://docs.netlify.com/build/configure-builds/environment-variables
[9] https://laravel.com/docs/12.x/deployment
[10] https://docs.netlify.com/frameworks/next-js/overview
