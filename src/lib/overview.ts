export function overviewItems(counts: Record<string, number>) {
  const items = [
    ['clients', 'Total klien', '/admin/clients'],
    ['projects', 'Total proyek', '/admin/projects'],
    ['active_projects', 'Proyek aktif', '/admin/projects'],
    ['completed_projects', 'Proyek selesai', '/admin/projects'],
    ['new_inquiries', 'Permintaan baru', '/admin/inquiries'],
    ['project_inquiries', 'Total permintaan', '/admin/inquiries'],
  ] as const;
  return items.map(([key, label, href]) => ({ key, label, href, value: counts[key] ?? 0 }));
}
