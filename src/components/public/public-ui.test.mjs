import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

test('public assets retain original embedded JPEG and fonts', () => {
  const hashes = {
    'fanders-logo.jpg': '92e97886019b987fe5cf089d469136cbe02878e1951e2a2085a8aadddc587d5b',
    'manrope.ttf': '3ae11c49db0455a3cc33e37d380f20fdb8c7f8b41dc07625c177e3d87a9d6ae6',
    'editorial.ttf': '498efd461f6ddfcb7a111bf9a565709d2085d48201d501ead960d93e84ffbb88',
  };
  for (const [name, expected] of Object.entries(hashes)) {
    assert.equal(createHash('sha256').update(readFileSync(join(root, 'public/assets', name))).digest('hex'), expected);
  }
});

test('public page reads backend data instead of inventing records', () => {
  const page = read('src/app/page.tsx');
  assert.match(page, /src\/lib\/public-data|\.\.\/lib\/public-data/);
  assert.match(page, /services/);
  assert.match(page, /portfolio/);
  assert.match(page, /reviews/);
});

test('published portfolio renders a signed private-storage image', () => {
  const component = read('src/components/public/Sections.tsx');
  const service = read('src/lib/public-data.ts');
  const upload = read('src/app/api/admin/upload/route.ts');
  assert.match(component, /image_url/);
  assert.match(service, /createSignedUrl/);
  assert.match(upload, /portfolio-assets/);
});

test('missing backend content is disclosed rather than represented as published records', () => {
  const page = read('src/app/page.tsx');
  assert.match(page, /contentUnavailable|contentError/);
  assert.match(page, /belum tersedia|belum dikonfigurasi/i);
});

test('contact fields enforce backend length limits before submission', () => {
  const contact = read('src/components/public/Sections.tsx');
  assert.match(contact, /name="name" maxLength=\{120\}/);
  assert.match(contact, /name="business" maxLength=\{160\}/);
  assert.match(contact, /name="need" maxLength=\{5000\}/);
});

test('public page omits prototype review controls and navigation gimmicks', () => {
  const ui = read('src/components/public/Sections.tsx') + read('src/components/public/Interactions.tsx');
  assert.doesNotMatch(ui, /review-dialog|quick-nav|motion-toggle|command-dialog/);
  assert.match(ui, /<section className="hero"/);
});

test('contact submission is a real POST with an honest error state', () => {
  const ui = read('src/components/public/Interactions.tsx');
  assert.match(ui, /fetch\(['"]\/api\/inquiries['"],\s*\{[\s\S]*?method:\s*['"]POST['"]/);
  assert.match(ui, /response\.ok/);
  assert.match(ui, /privacy|consent/i);
  assert.match(ui, /catch\s*\(/);
});
