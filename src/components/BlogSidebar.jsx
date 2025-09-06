'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Utility to combine class names.
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Sidebar for the Projects page.
 * Displays a list of projects and tag filters.
 */
export function ProjectSidebar({ projects }) {
  const [activeTag, setActiveTag] = useState('All');
  const pathname = usePathname();

  // Build list of unique tags (plus “All”)
  const allTags = useMemo(() => {
    const tags = new Set(projects.flatMap(p => p.fields.tags || []));
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  // Filter projects based on activeTag
  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return projects;
    return projects.filter(p => (p.fields.tags || []).includes(activeTag));
  }, [projects, activeTag]);

  return (
    <div className="sticky top-24 space-y-8">
      {/* Top section: projects list */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Projects</h3>
        <nav className="space-y-2">
          {/* All Projects link resets tag filter and navigates to list page */}
          <Link
            href="/projects"
            onClick={() => setActiveTag('All')}
            className={classNames(
              'block p-3 rounded-lg transition-colors text-sm',
              pathname === '/projects'
                ? 'bg-indigo-100 dark:bg-cyan-900/50'
                : 'hover:bg-gray-100 dark:hover:bg-white/10'
            )}
          >
            All Projects
          </Link>

          {/* Individual project links filtered by tag */}
          {filteredProjects.map(project => (
            <Link
              key={project.sys.id}
              href={`/projects/${project.fields.slug}`}
              className={classNames(
                'block p-3 rounded-lg transition-colors text-sm',
                pathname === `/projects/${project.fields.slug}`
                  ? 'bg-indigo-100 dark:bg-cyan-900/50'
                  : 'hover:bg-gray-100 dark:hover:bg-white/10'
              )}
            >
              {project.fields.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Tag filter section */}
      <div>
        <h3 className="mt-4 mb-2 text-sm font-semibold">Filter by Tag</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={classNames(
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                activeTag === tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-white/10'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}