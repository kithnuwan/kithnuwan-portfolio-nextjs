'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ProjectSidebar({ projects }) {
  const [activeTag, setActiveTag] = useState('All');
  const pathname = usePathname();
  const router = useRouter();

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
        <h3 className="text-sm font-bold text-[#E6F1FF] uppercase tracking-widest mb-3">Filter by Tag</h3>
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
                  ? 'bg-[#00BFFF] text-[#0A192F]'
                  : 'bg-[rgba(0,191,255,0.08)] text-[#8892B0] border border-[rgba(0,191,255,0.2)] hover:text-[#00BFFF] hover:border-[rgba(0,191,255,0.5)]'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div>
        <h3 className="text-sm font-bold text-[#E6F1FF] uppercase tracking-widest mb-3">Projects</h3>
        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => { setActiveTag('All'); router.push('/projects'); }}
            className={classNames(
              'block w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm',
              pathname === '/projects'
                ? 'bg-[rgba(0,191,255,0.12)] text-[#00BFFF] font-semibold'
                : 'text-[#8892B0] hover:text-[#E6F1FF] hover:bg-[rgba(255,255,255,0.04)]'
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
                  ? 'bg-[rgba(0,191,255,0.12)] text-[#00BFFF] font-semibold'
                  : 'text-[#8892B0] hover:text-[#E6F1FF] hover:bg-[rgba(255,255,255,0.04)]'
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
