'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ProjectSidebar({ projects }) {
  const [activeTag, setActiveTag] = useState('All');
  const pathname = usePathname();

  // Build list of unique tags (plus "All")
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Projects</h3>

      {/* "All Projects" entry. Click sets tag to 'All' and shows list page. */}
      <nav className="flex flex-col gap-1">
        <Link
          href="/projects"
          onClick={() => setActiveTag('All')}
          className={classNames(
            pathname === '/projects'
              ? 'font-bold text-indigo-600'
              : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600',
            'block px-2 py-1 rounded'
          )}
        >
          All Projects
        </Link>

        {filteredProjects.map(project => (
          <Link
            key={project.sys.id}
            href={`/projects/${project.fields.slug}`}
            className={classNames(
              pathname === `/projects/${project.fields.slug}`
                ? 'font-bold text-indigo-600'
                : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600',
              'block px-2 py-1 rounded'
            )}
          >
            {project.fields.title}
          </Link>
        ))}
      </nav>

      {/* Tag filter stays below. Selecting a tag will filter the list. */}
      <h4 className="mt-4 mb-2 text-sm font-semibold">Filter by Tag</h4>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={classNames(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              activeTag === tag
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-white/20'
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
