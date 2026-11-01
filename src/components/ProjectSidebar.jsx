'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { collectTags, projectsWithTag } from '@/lib/tags';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ProjectSidebar({ projects }) {
  const rawPath = usePathname() || '';
  let pathname = rawPath;
  try { pathname = decodeURIComponent(rawPath); } catch {}

  // The active tag comes from the URL: /projects/tag/<tag-slug>.
  const activeSlug = pathname.startsWith('/projects/tag/') ? pathname.split('/')[3] : 'all';
  const allTags = useMemo(() => [{ slug: 'all', name: 'All' }, ...collectTags(projects)], [projects]);

  const filteredProjects = useMemo(
    () => (activeSlug === 'all' ? projects : projectsWithTag(projects, activeSlug)),
    [projects, activeSlug]
  );

  return (
    <div className="sticky top-24 space-y-8">
      {/* Tag filter */}
      <div>
        <p className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">Filter by Tag</p>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Link
              key={tag.slug}
              href={tag.slug === 'all' ? '/projects' : `/projects/tag/${tag.slug}`}
              className={classNames(
                'inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
                activeSlug === tag.slug
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'bg-[var(--accent-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent-dim)]'
              )}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div>
        <p className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">Projects</p>
        <nav className="space-y-1">
          <Link
            href="/projects"
            className={classNames(
              'block w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm',
              pathname === '/projects'
                ? 'bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]'
            )}
          >
            All Projects
          </Link>
          {filteredProjects.map(project => (
            <Link
              key={project.sys.id}
              href={`/projects/${encodeURIComponent(project.fields.slug)}`}
              className={classNames(
                'block px-3 py-2.5 rounded-lg transition-all text-sm',
                pathname === `/projects/${project.fields.slug}`
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]'
              )}
            >
              {project.fields.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
