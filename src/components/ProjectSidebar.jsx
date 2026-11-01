'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ProjectSidebar({ projects }) {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get('tag') || 'All';
  const [activeTag, setActiveTag] = useState(initialTag);
  const rawPath = usePathname() || '';
  let pathname = rawPath;
  try { pathname = decodeURIComponent(rawPath); } catch {}

  useEffect(() => {
    const tag = searchParams.get('tag') || 'All';
    setActiveTag(tag);
  }, [searchParams]);

  // Merge tags that differ only by case ("Broadcast" / "broadcast").
  const allTags = useMemo(() => {
    const byKey = new Map();
    projects.flatMap(p => p.fields.tags || []).forEach(t => {
      const key = t.trim().toLowerCase();
      if (!byKey.has(key)) byKey.set(key, t.trim());
    });
    return ['All', ...Array.from(byKey.values()).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return projects;
    const key = activeTag.toLowerCase();
    return projects.filter(p => (p.fields.tags || []).some(t => t.trim().toLowerCase() === key));
  }, [projects, activeTag]);

  return (
    <div className="sticky top-24 space-y-8">
      {/* Tag filter */}
      <div>
        <p className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">Filter by Tag</p>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Link
              key={tag}
              href={tag === 'All' ? '/projects' : `/projects?tag=${encodeURIComponent(tag)}`}
              onClick={() => setActiveTag(tag)}
              className={classNames(
                'inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
                activeTag === tag
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'bg-[var(--accent-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent-dim)]'
              )}
            >
              {tag}
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
            onClick={() => setActiveTag('All')}
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
