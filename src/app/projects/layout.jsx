import { createClient } from 'contentful';
import { ProjectSidebar } from '@/components/ProjectSidebar';

const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

async function getProjects() {
  try {
    const response = await contentfulClient.getEntries({ content_type: "project" });
    return response.items || [];
  } catch (error) {
    console.error("Failed to fetch projects for sidebar:", error);
    return [];
  }
}

export default async function ProjectsLayout({ children }) {
  const projects = await getProjects();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProjectSidebar projects={projects} />
        </aside>
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}