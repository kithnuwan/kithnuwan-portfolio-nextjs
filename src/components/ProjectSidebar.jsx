'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ProjectSidebar({ projects }) {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get('tag') || 'All';
  const [activeTag, setActiveTag] = useState(initialTag);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const tag = searchParams.get('tag') || 'All';
    setActiveTag(tag);
  }, [searchParams]);

  const allTags = useMemo(() => {
    const tags = new Set(projects.flatMap(p => p.fields.tags || []));
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return projects;
    return projects.filter(p => (p.fields.tags || []).includes(activeTag));
  }, [projects, activeTag]);

  return (
    <div className="sticky top-24 space-y-8">
      {/* Tag filter */}
      <div>
        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">Filter by Tag</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                router.push(tag === 'All' ? '/projects' : `/projects?tag=${encodeURIComponent(tag)}`);
              }}
              className={classNames(
                'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
                activeTag === tag
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'bg-[var(--accent-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent-dim)]'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div>
        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">Projects</h3>
        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => { setActiveTag('All'); router.push('/projects'); }}
            className={classNames(
              'block w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm',
              pathname === '/projects'
                ? 'bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]'
            )}
          >
            All Projects
          </button>
          {filteredProjects.map(project => (
            <Link
              key={project.sys.id}
              href={`/projects/${project.fields.slug}`}
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
