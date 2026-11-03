import { entities, type Entity } from './permissions';

const aliases: Record<string, Entity> = {
  portfolio: 'portfolio_projects',
  inquiries: 'project_inquiries',
};

export function adminEntityFromPath(path: string): Entity | undefined {
  if (path === 'dashboard') return undefined;
  return aliases[path] ?? entities.find(entity => entity === path);
}

export function adminPathForEntity(entity: Entity): string {
  const alias = Object.entries(aliases).find(([, value]) => value === entity)?.[0];
  return `/admin/${alias ?? entity}`;
}
