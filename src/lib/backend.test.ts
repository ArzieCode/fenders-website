import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inquirySchema, parseEntity, uploadMetadataSchema } from './validation.ts';
import { canManage, canRead, canDelete, resolveRole } from './permissions.ts';
import { authenticatePrincipal } from './auth-check.ts';
import { isSameOrigin } from './origin.ts';
import { isValidSupabaseUrl } from './supabase/config.ts';
import { trustedClientIp } from './client-ip.ts';
import { adminEntityFromPath, adminPathForEntity } from './admin-paths.ts';
import { overviewItems } from './overview.ts';

test('overview reports actual operational groups with valid destinations', () => {
  const items = overviewItems({ clients: 2, projects: 3, active_projects: 1, completed_projects: 1, new_inquiries: 4, project_inquiries: 5 });
  assert.ok(items.some(item => item.label === 'Proyek aktif' && item.value === 1 && item.href === '/admin/projects'));
  assert.ok(items.some(item => item.label === 'Permintaan baru' && item.value === 4 && item.href === '/admin/inquiries'));
});

test('admin uses human-readable routes without changing database entity names', () => {
  assert.equal(adminEntityFromPath('dashboard'), undefined);
  assert.equal(adminEntityFromPath('portfolio'), 'portfolio_projects');
  assert.equal(adminEntityFromPath('inquiries'), 'project_inquiries');
  assert.equal(adminPathForEntity('services'), '/admin/services');
  assert.equal(adminPathForEntity('portfolio_projects'), '/admin/portfolio');
});

test('rate-limit IP ignores spoofed forward headers and fails closed outside Netlify', () => {
  const headers = new Headers({ 'x-forwarded-for': '198.51.100.20', 'x-real-ip': '198.51.100.21' });
  assert.equal(trustedClientIp(headers, 'production', 'fanders.netlify.app'), null);
  headers.set('x-nf-client-connection-ip', '203.0.113.5');
  assert.equal(trustedClientIp(headers, 'production', 'fanders.netlify.app', true), '203.0.113.5');
  assert.equal(trustedClientIp(new Headers(), 'development', 'localhost:3000'), '127.0.0.1');
});

test('inquiry requires explicit privacy consent', () => {
  const fields = { name: 'Alice', email: 'alice@example.com', message: 'Saya ingin membahas situs baru untuk usaha.' };
  assert.equal(inquirySchema.safeParse(fields).success, false);
  assert.equal(inquirySchema.safeParse({ ...fields, privacyConsent: false }).success, false);
  assert.equal(inquirySchema.safeParse({ ...fields, privacyConsent: true }).success, true);
});

test('public inquiry rejects malformed and excessive fields, including unknown keys', () => {
  assert.equal(inquirySchema.safeParse({ name: 'A', email: 'bad', service_slug: 'data-engineering', message: 'x' }).success, false);
  assert.equal(inquirySchema.safeParse({ name: 'Valid Name', email: 'a@b.com', message: 'Hi', status: 'approved' }).success, false);
  assert.equal(inquirySchema.safeParse({ name: 'Valid Name', email: 'a@b.com', message: 'x'.repeat(5001) }).success, false);
});
test('public inquiry normalizes allowed input only', () => {
  const result = inquirySchema.parse({ name: '  Alice  ', email: '  ALICE@example.com  ', service_slug: 'data-engineering', message: ' Hello world ', website: '', privacyConsent: true });
  assert.equal(result.name, 'Alice');
  assert.equal(result.email, 'alice@example.com');
  assert.equal(result.message, 'Hello world');
  assert.equal(inquirySchema.parse({ name: 'Alice', email: 'alice@example.com', message: 'Hello world', privacyConsent: true }).service_slug, 'general-collaboration');
});
test('entity writes reject admin-controlled or unknown fields', () => {
  assert.equal(parseEntity('clients', { name: 'A', id: 'injected' }).success, false);
  assert.equal(parseEntity('projects', { title: 'A', status: 'invalid' }).success, false);
});
test('roles fail closed; staff may edit but not delete, and inquiries are never deleted', () => {
  assert.equal(resolveRole(null), null);
  assert.equal(resolveRole('owner'), null);
  assert.equal(canRead('staff', 'clients'), true);
  assert.equal(canManage('staff', 'clients'), true);
  assert.equal(canManage('staff', 'services'), true);
  assert.equal(canManage('admin', 'services'), true);
  assert.equal(canDelete('staff', 'services'), false);
  assert.equal(canDelete('admin', 'project_inquiries'), false);
  assert.equal(canManage(null, 'clients'), false);
});
test('auth verifies user and matching database role; refuses forged or missing profile', async () => {
  const create = (user: { id: string; email?: string } | null, profile: { role: string } | null, error: unknown = null) => ({
    auth: { getUser: async () => ({ data: { user }, error: null }) },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: profile, error }) }) }) }),
  });
  assert.deepEqual(await authenticatePrincipal(create({ id: 'real', email: 'user@example.com' }, { role: 'staff' })), { id: 'real', email: 'user@example.com', role: 'staff' });
  assert.equal(await authenticatePrincipal(create({ id: 'real' }, { role: 'owner' })), null);
  assert.equal(await authenticatePrincipal(create(null, { role: 'admin' })), null);
  assert.equal(await authenticatePrincipal(create({ id: 'real' }, null)), null);
});
test('state-changing requests reject foreign origins', () => {
  assert.equal(isSameOrigin('https://example.com/admin', 'https://example.com'), true);
  assert.equal(isSameOrigin('https://evil.com/admin', 'https://example.com'), false);
  assert.equal(isSameOrigin(null, 'https://example.com'), false);
});
test('Supabase URL requires TLS except localhost development', () => {
  assert.equal(isValidSupabaseUrl('https://example.supabase.co'), true);
  assert.equal(isValidSupabaseUrl('http://127.0.0.1:54321'), true);
  assert.equal(isValidSupabaseUrl('http://example.com'), false);
  assert.equal(isValidSupabaseUrl('https://user:pass@example.com'), false);
});
test('uploads reject unsupported MIME, oversized payload and path traversal', () => {
  assert.equal(uploadMetadataSchema.safeParse({ name: '../evil.svg', type: 'image/svg+xml', size: 10 }).success, false);
  assert.equal(uploadMetadataSchema.safeParse({ name: 'ok.png', type: 'image/png', size: 6_000_000 }).success, false);
  assert.equal(uploadMetadataSchema.safeParse({ name: 'ok.png', type: 'image/png', size: 10 }).success, true);
});
