import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2 } from 'lucide-react';
import { getAllProjects } from '@/lib/contentful';
import { SITE_URL, PERSON_ID, assetUrl, slugPath } from '@/lib/seo';
import { SOLUTIONS, getSolution } from '@/lib/solutions';

// Content is static; the related-project list refreshes from Contentful hourly.
export const revalidate = 3600;

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getSolution(params.slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { title: s.title, description: s.description, url: `/solutions/${s.slug}`, type: 'website' },
  };
}

export default async function SolutionPage({ params }) {
  const s = getSolution(params.slug);
  if (!s) notFound();

  const projects = (await getAllProjects())
    .filter((p) => (p.fields.tags || []).some((t) => s.tags.includes(t.trim().toLowerCase())))
    .sort((a, b) => (b.fields.year || '').localeCompare(a.fields.year || ''));

  const url = `${SITE_URL}/solutions/${s.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.name,
        description: s.description,
        url,
        serviceType: s.name,
        provider: { '@id': PERSON_ID },
        areaServed: { '@type': 'Country', name: 'Sri Lanka' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'ItemList',
        name: `${s.name} – delivered projects`,
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}${slugPath('/projects', p.fields.slug)}`,
          name: p.fields.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE_URL}/solutions` },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
        ],
      },
    ],
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--text-secondary)] mb-6">
        <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link> /{' '}
        <Link href="/solutions" className="hover:text-[var(--text-primary)]">Solutions</Link> /{' '}
        <span className="text-[var(--text-primary)]">{s.name}</span>
      </nav>

      <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight mb-6">{s.h1}</h1>
      {s.intro.map((p) => (
        <p key={p} className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4 max-w-3xl">{p}</p>
      ))}
      <div className="flex flex-wrap gap-3 mt-8 mb-14">
        <Link href="/#contact" className="btn-primary">Discuss your project</Link>
        <a href="#projects" className="btn-outline">See delivered projects</a>
      </div>

      {s.sections.map((sec) => (
        <section key={sec.heading} className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">{sec.heading}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {sec.points.map((pt) => (
              <li key={pt} className="glass rounded-xl p-4 text-sm text-[var(--text-secondary)] leading-relaxed">{pt}</li>
            ))}
          </ul>
        </section>
      ))}

      <section id="projects" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6">Delivered projects in Sri Lanka</h2>
        {projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Link key={p.sys.id} href={slugPath('/projects', p.fields.slug)} className="glass rounded-2xl overflow-hidden group">
                {p.fields.heroImage && (
                  <img
                    src={`${assetUrl(p.fields.heroImage)}?w=640&fm=webp`}
                    alt={p.fields.title}
                    loading="lazy"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] mb-1">
                    <Building2 className="h-3 w-3 text-[var(--accent)]" />
                    {p.fields.client}{p.fields.year ? ` · ${p.fields.year}` : ''}
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{p.fields.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[var(--text-secondary)]">Projects are loading from the CMS.</p>
        )}
      </section>

      <section className="mb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6">Frequently asked questions</h2>
        <div className="space-y-4">
          {s.faqs.map((f) => (
            <details key={f.q} className="glass rounded-xl p-5 group" open>
              <summary className="font-semibold text-[var(--text-primary)] cursor-pointer">{f.q}</summary>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Other solutions</h2>
        <ul className="flex flex-wrap gap-3">
          {SOLUTIONS.filter((o) => o.slug !== s.slug).map((o) => (
            <li key={o.slug}>
              <Link href={`/solutions/${o.slug}`} className="text-[var(--accent)] hover:underline">{o.name} →</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
