import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

// Configure Contentful Client
const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Rich text rendering options, including all heading levels
const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node, children) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    [BLOCKS.HEADING_2]: (_node, children) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    [BLOCKS.HEADING_3]: (_node, children) => <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>,
    [BLOCKS.HEADING_4]: (_node, children) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
    [BLOCKS.HEADING_5]: (_node, children) => <h5 className="text-lg font-bold mt-3 mb-1">{children}</h5>,
    [BLOCKS.HEADING_6]: (_node, children) => <h6 className="text-base font-bold mt-2 mb-1">{children}</h6>,
    [BLOCKS.PARAGRAPH]: (_node, children) => <p className="mb-4 text-gray-700 dark:text-gray-300">{children}</p>,
    [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc list-inside mb-4 pl-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (_node, children) => <ol className="list-decimal list-inside mb-4 pl-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_node, children) => <li className="mb-2">{children}</li>,
    [BLOCKS.QUOTE]: (_node, children) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">{children}</blockquote>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        src={`https:${node.data.target.fields.file.url}`}
        alt={node.data.target.fields.title}
        className="rounded-lg my-6"
      />
    ),
  },
};

// Fetches all posts, sorted by date to find the latest one
async function getLatestPost() {
    try {
        const response = await contentfulClient.getEntries({
            content_type: 'myBlog',
            order: '-fields.publishDate', // Sort descending by publish date
            limit: 1, // We only need the most recent post
        });
        return response.items[0];
    } catch (error) {
        console.error("Failed to fetch the latest post:", error);
        return null;
    }
}

export default async function BlogIndexPage() {
  const latestPost = await getLatestPost();

  if (!latestPost) {
    return (
        <div className="prose dark:prose-invert max-w-none p-8 bg-white dark:bg-black/20 rounded-2xl">
            <h2>Welcome to the Blog</h2>
            <p>Could not load the latest article. Please select a post from the sidebar.</p>
        </div>
    );
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-5xl font-extrabold mb-4">{latestPost.fields.title}</h1>
      <p className="text-gray-500 mb-8">
        Published on {new Date(latestPost.fields.publishDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      {latestPost.fields.heroImage && (
        <img
          src={`https:${latestPost.fields.heroImage.fields.file.url}`}
          alt={latestPost.fields.title}
          className="w-full aspect-video object-cover rounded-xl mb-8"
        />
      )}
      <div>
        {documentToReactComponents(latestPost.fields.contentText, richTextOptions)}
      </div>
    </article>
  );
}