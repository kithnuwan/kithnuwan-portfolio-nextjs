import { getAllPosts, getAllProjects } from '@/lib/contentful';
import { SITE_URL, slugPath } from '@/lib/seo';
import { SOLUTIONS } from '@/lib/solutions';
import { collectTags, projectsWithTag } from '@/lib/tags';

// Regenerate at most once an hour so new CMS entries appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap() {
  const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()]);

  const latest = (items) =>
    items.reduce((max, i) => (i.sys.updatedAt > max ? i.sys.updatedAt : max), '1970-01-01T00:00:00Z');

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...SOLUTIONS.map((s) => ({ url: `${SITE_URL}/solutions/${s.slug}`, lastModified: new Date(latest(projects)), changeFrequency: 'monthly', priority: 0.9 })),
    { url: `${SITE_URL}/projects`, lastModified: new Date(latest(projects)), changeFrequency: 'monthly', priority: 0.8 },
    ...collectTags(projects).map((t) => ({
      url: `${SITE_URL}/projects/tag/${t.slug}`,
      lastModified: new Date(latest(projectsWithTag(projects, t.slug))),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    { url: `${SITE_URL}/blog`, lastModified: new Date(latest(posts)), changeFrequency: 'weekly', priority: 0.7 },
    ...projects
      .filter((p) => p.fields.slug)
      .map((p) => ({
        url: `${SITE_URL}${slugPath('/projects', p.fields.slug)}`,
        lastModified: new Date(p.sys.updatedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      })),
    ...posts
      .filter((p) => p.fields.slug)
      .map((p) => ({
        url: `${SITE_URL}${slugPath('/blog', p.fields.slug)}`,
        lastModified: new Date(p.sys.updatedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      })),
  ];
}
