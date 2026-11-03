'use client';
import { useEffect } from 'react';

/** Only the interactive behavior required by the public page lives here. */
export function Interactions() {
  useEffect(() => {
    const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector);
    const $$ = <T extends Element = HTMLElement>(selector: string) => [...document.querySelectorAll<T>(selector)];
    const cleanup: Array<() => void> = [];
    function listen(target: Element | Document, event: string, handler: EventListener) { target.addEventListener(event, handler); cleanup.push(() => target.removeEventListener(event, handler)); }

    const menu = $<HTMLButtonElement>('.menu-toggle');
    const nav = $('#nav');
    function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); if (menu) menu.textContent = 'Menu +'; }
    if (menu && nav) {
      listen(menu, 'click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.textContent = open ? 'Tutup −' : 'Menu +'; });
      $$<HTMLAnchorElement>('#nav a').forEach(link => listen(link, 'click', closeMenu));
      listen(document, 'keydown', event => { if ((event as KeyboardEvent).key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
    }
    $$<HTMLButtonElement>('[data-open]').forEach(button => listen(button, 'click', () => $<HTMLDialogElement>(`#${button.dataset.open}`)?.showModal()));
    $$<HTMLButtonElement>('[data-close]').forEach(button => listen(button, 'click', () => button.closest('dialog')?.close()));
    const project = $<HTMLDialogElement>('#project-dialog');
    if (project) listen(project, 'click', event => { if (event.target === project) project.close(); });
    const discuss = $('#discuss-project'); if (discuss) listen(discuss, 'click', () => { project?.close(); location.hash = 'kontak'; $<HTMLInputElement>('#name')?.focus(); });

    let step = 0;
    const selected = () => $$<HTMLInputElement>('input[name="service"]:checked').map(input => input.value);
    const goal = () => $<HTMLTextAreaElement>('#brief-goal')?.value.trim() || '';
    function briefText() { return `FANDERS / BRIEF PROYEK\n\nKebutuhan: ${selected().join(', ') || 'Belum dipilih'}\n\nMasalah & tujuan:\n${goal() || 'Belum dituliskan'}\n\nTarget waktu: ${$<HTMLSelectElement>('#brief-time')?.value || 'Belum ditentukan'}\n\nStatus: bahan diskusi awal, bukan penawaran atau persetujuan proyek.`; }
    function renderBrief() {
      $$<HTMLElement>('.brief-step').forEach((el, i) => { el.hidden = i !== step; });
      $$('.brief-steps li').forEach((el, i) => { el.classList.toggle('active', i === step); if (i === step) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current'); });
      const back = $<HTMLButtonElement>('#brief-prev'); if (back) back.disabled = step === 0;
      const next = $<HTMLButtonElement>('#brief-next'); if (next) { next.hidden = step === 2; next.disabled = step === 0 ? !selected().length : goal().length < 10; }
      const count = $('#brief-step-count'); if (count) count.textContent = `${step + 1} / 3`;
      const preview = $('#brief-output'); if (preview) preview.textContent = briefText();
    }
    function focusStep() { const title = $<HTMLElement>('.brief-step:not([hidden]) h3'); title?.setAttribute('tabindex', '-1'); title?.focus({ preventScroll: true }); }
    function briefStatus(message: string) { const el = $('#brief-status'); if (el) el.textContent = message; }
    $$<HTMLInputElement>('input[name="service"]').forEach(input => listen(input, 'change', renderBrief));
    const briefGoal = $('#brief-goal'); if (briefGoal) listen(briefGoal, 'input', renderBrief);
    const briefTime = $('#brief-time'); if (briefTime) listen(briefTime, 'change', renderBrief);
    const next = $('#brief-next'); if (next) listen(next, 'click', () => { if (step < 2) { step++; renderBrief(); focusStep(); } });
    const previous = $('#brief-prev'); if (previous) listen(previous, 'click', () => { if (step > 0) { step--; renderBrief(); focusStep(); } });
    const reset = $('#reset-brief'); if (reset) listen(reset, 'click', () => { if ((selected().length || goal()) && !confirm('Hapus isian brief di tab ini?')) return; $$<HTMLInputElement>('input[name="service"]').forEach(input => { input.checked = false; }); const area = $<HTMLTextAreaElement>('#brief-goal'); if (area) area.value = ''; const time = $<HTMLSelectElement>('#brief-time'); if (time) time.selectedIndex = 0; step = 0; renderBrief(); briefStatus('Brief direset.'); });
    const copy = $('#copy-brief'); if (copy) listen(copy, 'click', async () => { try { await navigator.clipboard.writeText(briefText()); briefStatus('Brief berhasil disalin.'); } catch { const output = $('#brief-output'); if (output) { const selection = window.getSelection(), range = document.createRange(); range.selectNodeContents(output); selection?.removeAllRanges(); selection?.addRange(range); } briefStatus('Salin otomatis tidak tersedia. Teks dipilih; salin manual atau unduh .txt.'); } });
    const download = $('#download-brief'); if (download) listen(download, 'click', () => { const url = URL.createObjectURL(new Blob([briefText()], { type: 'text/plain;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'FANDERS_Brief_Proyek.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); briefStatus('Unduhan brief diminta. Tidak dikirim ke server.'); });
    const useBrief = $('#use-brief'); if (useBrief) listen(useBrief, 'click', () => { const need = $<HTMLTextAreaElement>('#need'); if (need) need.value = briefText(); location.hash = 'kontak'; need?.focus(); formStatus('Brief dimasukkan ke formulir. Belum ada pesan yang dikirim.'); });
    renderBrief();
    $$<HTMLDetailsElement>('.faq-list details').forEach(detail => listen(detail, 'toggle', () => { if (detail.open) $$<HTMLDetailsElement>('.faq-list details').filter(other => other !== detail).forEach(other => { other.open = false; }); }));
    const year = $('#copyright-year'); if (year) year.textContent = String(new Date().getFullYear());

    const form = $<HTMLFormElement>('#contact-form'); let sending = false;
    function formStatus(message: string, error = false) { const status = $('#form-status'); if (status) { status.textContent = message; status.classList.toggle('status-error', error); } }
    if (form) listen(form, 'submit', async event => {
      event.preventDefault(); if (sending || !form.reportValidity()) return;
      const privacy = form.querySelector<HTMLInputElement>('input[name="privacyConsent"]');
      if (!privacy?.checked) { formStatus('Setujui pemrosesan data sebelum mengirim.', true); privacy?.focus(); return; }
      sending = true; const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]'); if (submit) submit.disabled = true;
      formStatus('Mengirim pesan…'); const fields = new FormData(form);
      try {
        const response = await fetch('/api/inquiries', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: String(fields.get('name') || '').trim(), email: String(fields.get('email') || '').trim(), company: String(fields.get('business') || '').trim(), message: String(fields.get('need') || '').trim(), privacyConsent: true, website: '' }),
        });
        if (!response.ok) { formStatus('Pesan belum terkirim. Layanan pengiriman mungkin belum tersedia; silakan coba lagi nanti. Isian tetap ada di halaman ini.', true); return; }
        formStatus('Pesan berhasil dikirim. Terima kasih, kami akan meninjau kebutuhanmu.'); form.reset();
      } catch (error) { formStatus('Pesan tidak terkirim karena gangguan koneksi. Isian tetap ada di halaman ini; silakan coba lagi nanti.', true); }
      finally { sending = false; if (submit) submit.disabled = false; }
    });
    return () => cleanup.forEach(fn => fn());
  }, []);
  return null;
}
