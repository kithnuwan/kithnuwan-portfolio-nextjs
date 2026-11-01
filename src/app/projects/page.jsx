export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Chip from '@/components/common/Chip';
import { Building2 } from 'lucide-react';
import { getAllProjects } from '@/lib/contentful';
import { SITE_URL, JsonLd, assetUrl, breadcrumbJsonLd, slugPath } from '@/lib/seo';

const DESCRIPTION = 'AV, broadcast and unified communications projects delivered across Sri Lanka: Parliament broadcast systems, Teams Rooms, boardrooms, auditoriums, OB vans and smart classrooms.';

// Tags are matched case-insensitively so "Broadcast" and "broadcast" are one filter.
const sameTag = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

export async function generateMetadata({ searchParams }) {
  const tag = searchParams?.tag;
  const path = tag ? `/projects?tag=${encodeURIComponent(tag)}` : '/projects';
  const title = tag ? `${tag} Projects` : 'Projects — AV & Broadcast Systems Portfolio';
  const description = tag
    ? `${tag} projects designed and delivered by Kithnuwan Silva in Sri Lanka.`
    : DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: 'Kithnuwan Silva',
      type: 'website',
      url: `${SITE_URL}${path}`,
      title: `${title} | Kithnuwan Silva`,
      description,
      images: [{ url: '/assets/images/hero-portrait.png', width: 1200, height: 630, alt: 'Kithnuwan Silva' }],
    },
  };
}

export default async function AllProjectsPage({ searchParams }) {
  const tag = searchParams?.tag ?? 'All';
  const allProjects = await getAllProjects();
  const projectsToShow =
    tag === 'All'
      ? allProjects
      : allProjects.filter((p) => (p.fields.tags || []).some((t) => sameTag(t, tag)));

  const schema = {
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/projects#page`,
        name: tag === 'All' ? 'Projects' : `${tag} projects`,
        url: `${SITE_URL}/projects`,
        description: DESCRIPTION,
        author: { '@id': `${SITE_URL}/#person` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projectsToShow.length,
          itemListElement: projectsToShow.map((p, i) => ({
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
      <h1 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">
        {tag === 'All' ? 'All Projects' : `${tag} Projects`}
      </h1>
      {tag === 'All' && <p className="mb-8 max-w-3xl text-[var(--text-secondary)]">{DESCRIPTION}</p>}
      {projectsToShow.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          {projectsToShow.map((p) => {
            const href = slugPath('/projects', p.fields.slug);
            return (
              <div key={p.sys.id} className="glass rounded-2xl overflow-hidden">
                {p.fields.heroImage && (
                  <Link href={href}>
                    <img
                      src={assetUrl(p.fields.heroImage)}
                      alt={p.fields.title || 'Project image'}
                      loading="lazy"
                      className="w-full aspect-video object-cover cursor-pointer"
                    />
                  </Link>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <Building2 className="h-4 w-4 text-[var(--accent)]" />
                    {p.fields.client || 'N/A'}
                    <span>•</span>
                    {p.fields.year || 'N/A'}
                  </div>
                  <h2 className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                    <Link href={href} className="hover:text-[var(--accent)]">{p.fields.title}</Link>
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{p.fields.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(p.fields.tags || []).map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-[var(--text-secondary)]">No projects found.</p>
      )}
    </div>
  );
}
