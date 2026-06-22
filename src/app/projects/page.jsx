export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Chip from '@/components/common/Chip';
import { Building2 } from 'lucide-react';

async function getAllProjects() {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !accessToken) return [];
  try {
    const { createClient } = await import('contentful');
    const client = createClient({ space: spaceId, accessToken });
    const response = await client.getEntries({ content_type: 'project' });
    return response.items || [];
  } catch {
    return [];
  }
}

export default async function AllProjectsPage({ searchParams }) {
  const tag = searchParams?.tag ?? 'All';
  const allProjects = await getAllProjects();
  const projectsToShow =
    tag === 'All'
      ? allProjects
      : allProjects.filter((p) => (p.fields.tags || []).includes(tag));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-bold mb-8 text-[#E6F1FF]">
        {tag === 'All' ? 'All Projects' : `Projects tagged "${tag}"`}
      </h1>
      {projectsToShow.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          {projectsToShow.map((p) => (
            <div key={p.sys.id} className="glass rounded-2xl overflow-hidden">
              {p.fields.heroImage && (
                <Link href={`/projects/${p.fields.slug}`}>
                  <img
                    src={`https:${p.fields.heroImage.fields.file.url}`}
                    alt={p.fields.title || 'Project image'}
                    className="w-full aspect-video object-cover cursor-pointer"
                  />
                </Link>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[#8892B0]">
                  <Building2 className="h-4 w-4 text-[#00BFFF]" />
                  {p.fields.client || 'N/A'}
                  <span>•</span>
                  {p.fields.year || 'N/A'}
                </div>
                <h3 className="mt-1 text-base font-semibold text-[#E6F1FF]">{p.fields.title}</h3>
                <p className="mt-2 text-sm text-[#8892B0]">{p.fields.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(p.fields.tags || []).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#8892B0]">No projects found.</p>
      )}
    </div>
  );
}
