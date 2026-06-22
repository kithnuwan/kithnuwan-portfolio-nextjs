export const dynamic = 'force-dynamic';

import { ProjectSidebar } from '@/components/ProjectSidebar';

async function getProjects() {
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

export default async function ProjectsLayout({ children }) {
  const projects = await getProjects();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProjectSidebar projects={projects} />
        </aside>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
