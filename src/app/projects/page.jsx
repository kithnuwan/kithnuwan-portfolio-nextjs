import { createClient } from 'contentful';
import Link from 'next/link';
import Chip from '@/components/common/Chip';
import { Building2 } from 'lucide-react';

const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

async function getAllProjects() {
  const response = await contentfulClient.getEntries({ content_type: 'project' });
  return response.items;
}

export default async function AllProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">All Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {allProjects.map((p) => (
          <div key={p.sys.id} className="flex flex-col gap-4">
            <Link href={`/projects/${p.fields.slug}`}>
              <img
                src={`https:${p.fields.heroImage.fields.file.url}`}
                alt={p.fields.title}
                className="w-full aspect-video object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10 cursor-pointer"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Building2 className="h-4 w-4" /> {p.fields.client} <span>•</span> {p.fields.year}
              </div>
              <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{p.fields.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.fields.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(p.fields.tags || []).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}