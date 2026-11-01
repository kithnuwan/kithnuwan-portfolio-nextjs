export const dynamic = 'force-dynamic';

import { permanentRedirect } from 'next/navigation';
import ProjectGrid from '@/components/ProjectGrid';
import { getAllProjects } from '@/lib/contentful';
import { SITE_URL, JsonLd, breadcrumbJsonLd, slugPath } from '@/lib/seo';
import { tagPath } from '@/lib/tags';

const DESCRIPTION = 'AV, broadcast and unified communications projects delivered across Sri Lanka: Parliament broadcast systems, Teams Rooms, boardrooms, auditoriums, OB vans and smart classrooms.';

export const metadata = {
  title: 'Projects — AV & Broadcast Systems Portfolio',
  description: DESCRIPTION,
  alternates: { canonical: '/projects' },
  openGraph: {
    siteName: 'Kithnuwan Silva',
    type: 'website',
    url: `${SITE_URL}/projects`,
    title: 'Projects — AV & Broadcast Systems Portfolio | Kithnuwan Silva',
    description: DESCRIPTION,
    images: [{ url: '/assets/images/hero-portrait.png', width: 1200, height: 630, alt: 'Kithnuwan Silva' }],
  },
};

export default async function AllProjectsPage({ searchParams }) {
  // Old filter links (/projects?tag=Meeting+Rooms) now live at /projects/tag/meeting-rooms.
  if (searchParams?.tag) permanentRedirect(tagPath(searchParams.tag));

  const projects = await getAllProjects();
  const schema = {
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/projects#page`,
        name: 'Projects',
        url: `${SITE_URL}/projects`,
        description: DESCRIPTION,
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
      breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]),
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLd data={schema} />
      <h1 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">All Projects</h1>
      <p className="mb-8 max-w-3xl text-[var(--text-secondary)]">{DESCRIPTION}</p>
      <ProjectGrid projects={projects} />
    </div>
  );
}
