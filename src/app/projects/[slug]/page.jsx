export const dynamic = 'force-dynamic';
export async function generateStaticParams() { return []; }

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { getProjectBySlug } from '@/lib/contentful';
import { tableAndLinkNodes } from '@/components/richTextNodes';
import {
  SITE_URL, PERSON_ID, JsonLd, assetUrl, breadcrumbJsonLd, describeAsset,
  richTextToPlain, slugPath, toDescription,
} from '@/lib/seo';
import { solutionForTags } from '@/lib/solutions';

const richTextOptions = {
  renderNode: {
    // The page title is the only H1; demote any H1 written in the CMS body.
    [BLOCKS.HEADING_1]: (_node, children) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    [BLOCKS.HEADING_2]: (_node, children) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    [BLOCKS.HEADING_3]: (_node, children) => <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>,
    [BLOCKS.PARAGRAPH]: (_node, children) => <p className="mb-4">{children}</p>,
    [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    [BLOCKS.OL_LIST]: (_node, children) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_node, children) => <li className="[&_p]:mb-0">{children}</li>,
    ...tableAndLinkNodes,
  },
};

function decodeSlug(slug) {
  try { return decodeURIComponent(slug); } catch { return slug; }
}

function projectDescription(project) {
  const { summary, detailedContent, client, title } = project.fields;
  const text = summary || richTextToPlain(detailedContent, { bodyOnly: true });
  return toDescription(text || `${title}${client ? ` for ${client}` : ''}: AV and broadcast systems design and delivery in Sri Lanka.`);
}

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(decodeSlug(params.slug));
  if (!project) return { title: 'Project not found', robots: { index: false } };

  const { title, slug, heroImage } = project.fields;
  const path = slugPath('/projects', slug);
  const description = projectDescription(project);
  const image = assetUrl(heroImage);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: 'Kithnuwan Silva',
      type: 'article',
      url: `${SITE_URL}${path}`,
      title: `${title} | Kithnuwan Silva`,
      description,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Kithnuwan Silva`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(decodeSlug(params.slug));
  if (!project) notFound();

  const { title, slug, heroImage, detailedContent, gallery, client, year, tags } = project.fields;
  const solution = solutionForTags(tags);
  const path = slugPath('/projects', slug);
  const image = assetUrl(heroImage);

  const schema = {
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${SITE_URL}${path}#project`,
        name: title,
        headline: title,
        url: `${SITE_URL}${path}`,
        description: projectDescription(project),
        ...(image ? { image } : {}),
        ...(year ? { dateCreated: String(year) } : {}),
        ...(client ? { sponsor: { '@type': 'Organization', name: client } } : {}),
        ...(tags?.length ? { keywords: tags.join(', ') } : {}),
        creator: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        dateModified: project.sys.updatedAt,
        locationCreated: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'LK' } },
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: title, path },
      ]),
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[#8892B0]">
        <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/projects" className="hover:text-[var(--accent)]">Projects</Link>
      </nav>
      <h1 className="text-5xl font-extrabold mb-4 text-[#E6F1FF]">{title}</h1>
      {(client || year) && (
        <p className="mb-8 text-sm text-[#8892B0]">
          {client && <span>Client: <span className="text-[#E6F1FF]">{client}</span></span>}
          {client && year && <span className="mx-2">·</span>}
          {year && <span>Year: <span className="text-[#E6F1FF]">{year}</span></span>}
        </p>
      )}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full aspect-video object-cover rounded-xl mb-8"
        />
      )}
      <div className="prose prose-invert max-w-none text-[#8892B0]">
        {documentToReactComponents(detailedContent, richTextOptions)}
      </div>
      {gallery && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-[#E6F1FF]">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((asset, i) =>
              asset.fields.file.contentType?.startsWith('video/') ? (
                <video
                  key={asset.sys.id}
                  src={assetUrl(asset)}
                  title={describeAsset(asset, title, i)}
                  controls
                  playsInline
                  preload="metadata"
                  className="col-span-2 w-full rounded-lg bg-black"
                />
              ) : (
                <img
                  key={asset.sys.id}
                  src={assetUrl(asset)}
                  alt={describeAsset(asset, title, i)}
                  loading="lazy"
                  className="rounded-lg"
                />
              )
            )}
          </div>
        </div>
      )}
      {solution && (
        <p className="mt-12 text-[#8892B0]">
          More on this kind of work:{' '}
          <Link href={`/solutions/${solution.slug}`} className="text-[var(--accent)] hover:underline">
            {solution.name} in Sri Lanka →
          </Link>
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/projects" className="btn-outline inline-flex">← All projects</Link>
        <Link href="/#contact" className="btn-primary inline-flex">Discuss a similar project</Link>
      </div>
    </article>
  );
}
