export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectGrid from '@/components/ProjectGrid';
import { getAllProjects } from '@/lib/contentful';
import { SITE_URL, JsonLd, breadcrumbJsonLd, slugPath } from '@/lib/seo';
import { collectTags, projectsWithTag } from '@/lib/tags';
import { solutionForTags } from '@/lib/solutions';

async function loadTag(slug) {
  const projects = await getAllProjects();
  const tag = collectTags(projects).find((t) => t.slug === slug);
  return tag ? { tag, projects: projectsWithTag(projects, slug) } : null;
}

const describe = (name, count) =>
  `${count} ${name} project${count === 1 ? '' : 's'} designed and delivered across Sri Lanka by AV & broadcast consultant Kithnuwan Silva.`;

export async function generateMetadata({ params }) {
  const data = await loadTag(params.tag);
  if (!data) return { title: 'Tag not found', robots: { index: false } };
  const { tag, projects } = data;
  const path = `/projects/tag/${tag.slug}`;
  return {
    title: `${tag.name} Projects in Sri Lanka`,
    description: describe(tag.name, projects.length),
    alternates: { canonical: path },
    openGraph: {
      siteName: 'Kithnuwan Silva',
      type: 'website',
      url: `${SITE_URL}${path}`,
      title: `${tag.name} Projects in Sri Lanka | Kithnuwan Silva`,
      description: describe(tag.name, projects.length),
      images: [{ url: '/assets/images/hero-portrait.png', width: 1200, height: 630, alt: 'Kithnuwan Silva' }],
    },
  };
}

export default async function TagPage({ params }) {
  const data = await loadTag(params.tag);
  if (!data) notFound();
  const { tag, projects } = data;
  const path = `/projects/tag/${tag.slug}`;
  const solution = solutionForTags([tag.name]);

  const schema = {
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${path}#page`,
        name: `${tag.name} projects`,
        url: `${SITE_URL}${path}`,
        description: describe(tag.name, projects.length),
        author: { '@id': `${SITE_URL}/#person` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projects.length,
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.fields.title,
            url: `${SITE_URL}${slugPath('/projects', p.fields.slug)}`,
          })),
        },
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: tag.name, path },
      ]),
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLd data={schema} />
      <h1 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">{tag.name} Projects</h1>
      <p className="mb-8 max-w-3xl text-[var(--text-secondary)]">
        {describe(tag.name, projects.length)}
        {solution && (
          <>
            {' '}See also{' '}
            <Link href={`/solutions/${solution.slug}`} className="text-[var(--accent)] hover:underline">
              {solution.name}
            </Link>
            .
          </>
        )}
      </p>
      <ProjectGrid projects={projects} />
    </div>
  );
}
