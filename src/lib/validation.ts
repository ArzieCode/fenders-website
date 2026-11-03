import { z } from 'zod';

const text = (max: number, min = 1) => z.string().trim().min(min).max(max);
const optionalText = (max: number) => z.string().trim().max(max).nullable().optional();
const optionalId = z.uuid().nullable().optional();
const date = z.iso.date().nullable().optional();
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120);
const email = z.preprocess(v => typeof v === 'string' ? v.trim().toLowerCase() : v, z.email().max(254));

export const inquirySchema = z.strictObject({
  name: text(120), email, company: optionalText(160), service_slug: slug.default('general-collaboration'),
  message: text(5000, 10), website: z.literal('').optional(), privacyConsent: z.literal(true),
});

export const schemas = {
  clients: z.strictObject({ name: text(200), contact_name: optionalText(120), email: email.nullable().optional(), phone: optionalText(50), notes: optionalText(5000) }),
  projects: z.strictObject({ title: text(200), description: optionalText(10000), status: z.enum(['lead', 'planning', 'active', 'on_hold', 'completed', 'cancelled']).optional(), client_id: optionalId, service_id: optionalId, started_at: date, completed_at: date }),
  services: z.strictObject({ title: text(160), slug, description: optionalText(5000), sort_order: z.number().int().min(0).max(100000).optional(), is_published: z.boolean().optional() }),
  portfolio_projects: z.strictObject({ title: text(200), slug, summary: text(2000), project_id: optionalId, service_id: optionalId, image_path: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9/_-]{0,450}\.(png|jpg|jpeg|webp)$/i).nullable().optional(), sort_order: z.number().int().min(0).max(100000).optional(), is_published: z.boolean().optional(), published_at: z.iso.datetime({ offset: true }).nullable().optional() }),
  project_inquiries: z.strictObject({ status: z.enum(['new', 'contacted', 'qualified', 'closed', 'spam']), client_id: optionalId, project_id: optionalId }),
  reviews: z.strictObject({ project_id: optionalId, client_id: optionalId, author_name: text(120), author_title: optionalText(160), quote: text(2000), rating: z.number().int().min(1).max(5).nullable().optional(), is_published: z.boolean().optional(), consent_confirmed_at: z.iso.datetime({ offset: true }).nullable().optional() }),
  project_notes: z.strictObject({ project_id: z.uuid(), body: text(10000) }),
};
export type WritableEntity = keyof typeof schemas;
export function parseEntity(entity: WritableEntity, input: unknown, partial = false) {
  const schema = schemas[entity];
  return (partial ? schema.partial() : schema).safeParse(input);
}
export const uploadMetadataSchema = z.strictObject({
  name: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}\.(png|jpg|jpeg|webp)$/i),
  type: z.enum(['image/png', 'image/jpeg', 'image/webp']),
  size: z.number().int().positive().max(5_000_000),
});
