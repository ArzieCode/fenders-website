export const entities = ['clients', 'projects', 'services', 'portfolio_projects', 'project_inquiries', 'reviews', 'project_notes'] as const;
export type Entity = typeof entities[number];
export type Role = 'admin' | 'staff';
export function resolveRole(value: unknown): Role | null {
  return value === 'admin' || value === 'staff' ? value : null;
}
export function canRead(role: Role | null, entity: Entity): boolean {
  return !!role && entities.includes(entity);
}
export function canManage(role: Role | null, entity: Entity): boolean {
  return !!role && entities.includes(entity);
}
export function canDelete(role: Role | null, entity: Entity): boolean {
  return role === 'admin' && entity !== 'project_inquiries';
}
