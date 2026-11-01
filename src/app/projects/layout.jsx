export const dynamic = 'force-dynamic';

import { getAllProjects } from '@/lib/contentful';
import { ProjectSidebar } from '@/components/ProjectSidebar';

export default async function ProjectsLayout({ children }) {
  const projects = await getAllProjects();
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
