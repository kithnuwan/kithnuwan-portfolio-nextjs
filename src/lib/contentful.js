import { cache } from 'react';

// Shared Contentful access. cache() dedupes calls made by generateMetadata,
// the page and the layout during a single request.
async function getClient() {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) return null;
  const { createClient } = await import('contentful');
  return createClient({ space, accessToken });
}

async function entries(query) {
  try {
    const client = await getClient();
    if (!client) return [];
    const res = await client.getEntries(query);
    return res.items || [];
  } catch {
    return [];
  }
}

export const getAllProjects = cache(() => entries({ content_type: 'project', limit: 1000 }));

export const getAllPosts = cache(() =>
  entries({ content_type: 'myBlog', order: '-fields.publishDate', limit: 1000 })
);

export const getProjectBySlug = cache(async (slug) => {
  const items = await entries({ content_type: 'project', 'fields.slug': slug, limit: 1 });
  return items[0] || null;
});

export const getPostBySlug = cache(async (slug) => {
  const items = await entries({ content_type: 'myBlog', 'fields.slug': slug, limit: 1 });
  return items[0] || null;
});
