import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { assetUrl, slugPath } from '@/lib/seo';
import { tagPath } from '@/lib/tags';

// Project cards for /projects and /projects/tag/[tag]. Tag chips link to their tag page.
export default function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return <p className="text-[var(--text-secondary)]">No projects found.</p>;
  }
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((p) => {
        const href = slugPath('/projects', p.fields.slug);
        return (
          <div key={p.sys.id} className="glass rounded-2xl overflow-hidden">
            {p.fields.heroImage && (
              <Link href={href}>
                <img
                  src={assetUrl(p.fields.heroImage)}
                  alt={p.fields.title || 'Project image'}
                  loading="lazy"
                  className="w-full aspect-video object-cover cursor-pointer"
                />
              </Link>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Building2 className="h-4 w-4 text-[var(--accent)]" />
                {p.fields.client || 'N/A'}
                <span>•</span>
                {p.fields.year || 'N/A'}
              </div>
              <h2 className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                <Link href={href} className="hover:text-[var(--accent)]">{p.fields.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{p.fields.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(p.fields.tags || []).map((t) => (
                  <Link
                    key={t}
                    href={tagPath(t)}
                    className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-[#00BFFF] border border-[rgba(0,191,255,0.25)] bg-[rgba(0,191,255,0.08)] hover:bg-[rgba(0,191,255,0.16)]"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
