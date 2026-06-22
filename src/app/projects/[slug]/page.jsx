export const dynamic = 'force-dynamic';
export async function generateStaticParams() { return []; }

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_node, children) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    [BLOCKS.PARAGRAPH]: (_node, children) => <p className="mb-4">{children}</p>,
  },
};

async function getProject(slug) {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !accessToken) return null;
  try {
    const { createClient } = await import('contentful');
    const client = createClient({ space: spaceId, accessToken });
    const response = await client.getEntries({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
    });
    return response.items[0] || null;
  } catch {
    return null;
  }
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-[#8892B0]">
        Project not found or CMS not configured.
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="text-5xl font-extrabold mb-4 text-[#E6F1FF]">{project.fields.title}</h1>
      {project.fields.heroImage && (
        <img
          src={`https:${project.fields.heroImage.fields.file.url}`}
          alt={project.fields.title}
          className="w-full aspect-video object-cover rounded-xl mb-8"
        />
      )}
      <div className="prose prose-invert max-w-none text-[#8892B0]">
        {documentToReactComponents(project.fields.detailedContent, richTextOptions)}
      </div>
      {project.fields.gallery && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-[#E6F1FF]">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {project.fields.gallery.map((image) => (
              <img
                key={image.sys.id}
                src={`https:${image.fields.file.url}`}
                alt={image.fields.title}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
