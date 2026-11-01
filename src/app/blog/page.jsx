export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllPosts } from '@/lib/contentful';
import { SITE_URL, JsonLd, assetUrl, breadcrumbJsonLd, richTextToPlain, slugPath, toDescription } from '@/lib/seo';

const DESCRIPTION = 'Articles and case studies on AV system design, broadcast technology, courtroom technology and unified communications in Sri Lanka by Kithnuwan Silva.';

export const metadata = {
  title: 'Blog — AV, Broadcast & Unified Communications Articles',
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    siteName: 'Kithnuwan Silva',
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog — AV, Broadcast & Unified Communications Articles | Kithnuwan Silva',
    description: DESCRIPTION,
    images: [{ url: '/assets/images/hero-portrait.png', width: 1200, height: 630, alt: 'Kithnuwan Silva' }],
  },
};

const fmt = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const schema = {
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'Kithnuwan Silva — Blog',
        url: `${SITE_URL}/blog`,
        description: DESCRIPTION,
        author: { '@id': `${SITE_URL}/#person` },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.fields.title,
          url: `${SITE_URL}${slugPath('/blog', p.fields.slug)}`,
          datePublished: p.fields.publishDate,
        })),
      },
      breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
    ],
  };

  return (
    <div className="max-w-3xl mx-auto py-24 px-4">
      <JsonLd data={schema} />
      <h1 className="text-5xl font-extrabold mb-4 text-[var(--text-primary)]">Blog</h1>
      <p className="mb-12 text-[var(--text-secondary)]">{DESCRIPTION}</p>
      {posts.length === 0 ? (
        <p className="text-[var(--text-secondary)]">No articles available yet.</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => {
            const href = slugPath('/blog', post.fields.slug);
            const image = assetUrl(post.fields.heroImage);
            const excerpt = toDescription(
              post.fields.summary || post.fields.excerpt || richTextToPlain(post.fields.contentText, { bodyOnly: true }),
              220
            );
            return (
              <article key={post.sys.id} className="grid gap-4 sm:grid-cols-[200px_1fr] items-start">
                {image && (
                  <Link href={href}>
                    <img src={image} alt={post.fields.title} loading="lazy" className="w-full aspect-video object-cover rounded-xl" />
                  </Link>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                    <Link href={href} className="hover:text-[var(--accent)]">{post.fields.title}</Link>
                  </h2>
                  {post.fields.publishDate && (
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      <time dateTime={post.fields.publishDate}>{fmt(post.fields.publishDate)}</time>
                    </p>
                  )}
                  <p className="mt-3 text-[var(--text-secondary)]">{excerpt}</p>
                  <Link href={href} className="mt-3 inline-block text-sm font-semibold text-[var(--accent)] hover:underline">
                    Read article →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
