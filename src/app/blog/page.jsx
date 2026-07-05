export const dynamic = 'force-dynamic';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node, children) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    [BLOCKS.HEADING_2]: (_node, children) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    [BLOCKS.HEADING_3]: (_node, children) => <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>,
    [BLOCKS.PARAGRAPH]: (_node, children) => <p className="mb-4 text-[var(--text-secondary)]">{children}</p>,
    [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc list-inside mb-4 pl-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (_node, children) => <ol className="list-decimal list-inside mb-4 pl-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_node, children) => <li className="mb-2">{children}</li>,
    [BLOCKS.QUOTE]: (_node, children) => <blockquote className="border-l-4 border-[#00BFFF] pl-4 italic my-4 text-[var(--text-secondary)]">{children}</blockquote>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        src={`https:${node.data.target.fields.file.url}`}
        alt={node.data.target.fields.title}
        className="rounded-lg my-6"
      />
    ),
  },
};

async function getLatestPost() {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !accessToken) return null;
  try {
    const { createClient } = await import('contentful');
    const client = createClient({ space: spaceId, accessToken });
    const response = await client.getEntries({
      content_type: 'myBlog',
      order: '-fields.publishDate',
      limit: 1,
    });
    return response.items[0] || null;
  } catch {
    return null;
  }
}

export default async function BlogIndexPage() {
  const latestPost = await getLatestPost();

  if (!latestPost) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-4 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Blog</h2>
        <p>No articles available yet, or CMS is not configured.</p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-5xl font-extrabold mb-4 text-[var(--text-primary)]">{latestPost.fields.title}</h1>
      <p className="text-[var(--text-secondary)] mb-8">
        Published on{' '}
        {new Date(latestPost.fields.publishDate).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        })}
      </p>
      {latestPost.fields.heroImage && (
        <img
          src={`https:${latestPost.fields.heroImage.fields.file.url}`}
          alt={latestPost.fields.title}
          className="w-full aspect-video object-cover rounded-xl mb-8"
        />
      )}
      <div className="prose prose-invert max-w-none">
        {documentToReactComponents(latestPost.fields.contentText, richTextOptions)}
      </div>
    </article>
  );
}
