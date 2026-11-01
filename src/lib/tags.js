// Project tags as crawlable pages: /projects/tag/<tag-slug>.
// Tags that differ only in case or punctuation ("Broadcast" / "broadcast") share one slug.

export const tagSlug = (tag) =>
  tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const tagPath = (tag) => `/projects/tag/${tagSlug(tag)}`;

// Unique tags across projects, keyed by slug, keeping the first spelling seen.
export function collectTags(projects) {
  const bySlug = new Map();
  projects.flatMap((p) => p.fields.tags || []).forEach((t) => {
    const slug = tagSlug(t);
    if (slug && !bySlug.has(slug)) bySlug.set(slug, t.trim());
  });
  return [...bySlug.entries()]
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const projectsWithTag = (projects, slug) =>
  projects.filter((p) => (p.fields.tags || []).some((t) => tagSlug(t) === slug));
