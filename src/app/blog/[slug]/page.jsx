export const dynamic = 'force-dynamic';
export async function generateStaticParams() { return []; }

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { getAllProjects, getPostBySlug } from '@/lib/contentful';
import { RELATED_PROJECTS } from '@/lib/related';
import {
  SITE_URL, PERSON_ID, DEFAULT_OG_IMAGE, JsonLd, assetUrl, breadcrumbJsonLd,
  richTextToPlain, slugPath, toDescription,
} from '@/lib/seo';

const richTextOptions = {
  renderNode: {
    // The post title is the page's only H1; demote any H1 written in the CMS body.
    [BLOCKS.HEADING_1]: (_node, children) => <h2 className="text-4xl font-bold mt-8 mb-4">{children}</h2>,
    [BLOCKS.HEADING_2]: (_node, children) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    [BLOCKS.HEADING_3]: (_node, children) => <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>,
    [BLOCKS.PARAGRAPH]: (_node, children) => <p className="mb-4 text-[var(--text-secondary)]">{children}</p>,
    [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc list-inside mb-4 pl-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (_node, children) => <ol className="list-decimal list-inside mb-4 pl-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_node, children) => (
      <li className="mb-2 text-[var(--text-secondary)]">
        {Array.isArray(children)
          ? children.map((child, i) =>
              child?.type === 'p'
                ? <span key={i}>{child.props.children}</span>
                : child
            )
          : children}
      </li>
    ),
    [BLOCKS.QUOTE]: (_node, children) => <blockquote className="border-l-4 border-[#00BFFF] pl-4 italic my-4 text-[var(--text-secondary)]">{children}</blockquote>,
    [BLOCKS.TABLE]: (_node, children) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full text-sm text-left border-collapse">
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_node, children) => <tr className="border-b border-[var(--border)] last:border-0 align-top">{children}</tr>,
    [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
      <th className="p-3 font-semibold text-[var(--text-primary)] bg-[var(--accent-subtle)] [&_p]:mb-0">{children}</th>
    ),
    [BLOCKS.TABLE_CELL]: (_node, children) => <td className="p-3 [&_p]:mb-0">{children}</td>,
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data.uri;
      const internal = uri.startsWith('/') || uri.startsWith('https://kithnuwan.com');
      return (
        <a
          href={uri}
          className="text-[var(--accent)] underline underline-offset-2"
          {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        src={assetUrl(node.data.target)}
        alt={node.data.target.fields.description || node.data.target.fields.title}
        loading="lazy"
        className="rounded-lg my-6"
      />
    ),
  },
};

function decodeSlug(slug) {
  try { return decodeURIComponent(slug); } catch { return slug; }
}

function postDescription(post) {
  const { summary, excerpt, contentText, title } = post.fields;
  return toDescription(summary || excerpt || richTextToPlain(contentText, { bodyOnly: true }) || title);
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(decodeSlug(params.slug));
  if (!post) return { title: 'Article not found', robots: { index: false } };

  const { title, slug, heroImage, publishDate, tags } = post.fields;
  const path = slugPath('/blog', slug);
  const description = postDescription(post);
  const image = assetUrl(heroImage);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: 'Kithnuwan Silva',
      type: 'article',
      url: `${SITE_URL}${path}`,
      title,
      description,
      publishedTime: publishDate,
      modifiedTime: post.sys.updatedAt,
      authors: [SITE_URL],
      tags: tags || undefined,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(decodeSlug(params.slug));
  if (!post) notFound();

  const { title, slug, heroImage, publishDate, contentText, tags } = post.fields;
  const path = slugPath('/blog', slug);
  const image = assetUrl(heroImage);
  const plain = richTextToPlain(contentText);
  const relatedSlugs = RELATED_PROJECTS[slug] || [];
  const allProjects = relatedSlugs.length ? await getAllProjects() : [];
  const related = relatedSlugs
    .map((s) => allProjects.find((p) => p.fields.slug === s))
    .filter(Boolean);

  const schema = {
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}${path}#article`,
        headline: title,
        description: postDescription(post),
        url: `${SITE_URL}${path}`,
        mainEntityOfPage: `${SITE_URL}${path}`,
        image: image || `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        datePublished: publishDate,
        dateModified: post.sys.updatedAt,
        wordCount: plain ? plain.split(/\s+/).filter(Boolean).length : undefined,
        ...(tags?.length ? { keywords: tags.join(', ') } : {}),
        inLanguage: 'en',
        author: { '@id': PERSON_ID, '@type': 'Person', name: 'Kithnuwan Silva', url: SITE_URL },
        publisher: { '@id': PERSON_ID },
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: title, path },
      ]),
    ],
  };

  const updated = post.sys.updatedAt && publishDate
    && new Date(post.sys.updatedAt).toDateString() !== new Date(publishDate).toDateString();
  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="max-w-3xl mx-auto py-24 px-4">
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--text-secondary)]">
        <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/blog" className="hover:text-[var(--accent)]">Blog</Link>
      </nav>
      <h1 className="text-5xl font-extrabold mb-4 text-[var(--text-primary)]">{title}</h1>
      <p className="text-[var(--text-secondary)] mb-8">
        By <Link href="/#about" rel="author" className="text-[var(--text-primary)] hover:text-[var(--accent)]">Kithnuwan Silva</Link>
        {publishDate && <> · Published <time dateTime={publishDate}>{fmt(publishDate)}</time></>}
        {updated && <> · Updated <time dateTime={post.sys.updatedAt}>{fmt(post.sys.updatedAt)}</time></>}
      </p>
      {image && (
        <img
          src={image}
          alt={heroImage.fields.description || title}
          className="w-full aspect-video object-cover rounded-xl mb-8"
        />
      )}
      <div className="prose prose-invert max-w-none">
        {documentToReactComponents(contentText, richTextOptions)}
      </div>
      {related.length > 0 && (
        <section aria-label="Related projects" className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Related projects</h2>
          <ul className="grid sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <li key={p.sys.id}>
                <Link href={slugPath('/projects', p.fields.slug)} className="block rounded-xl border border-[var(--border)] overflow-hidden hover:border-[var(--accent)] transition-colors">
                  {p.fields.heroImage && (
                    <img
                      src={`${assetUrl(p.fields.heroImage)}?w=480&fm=webp`}
                      alt={p.fields.title}
                      loading="lazy"
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <span className="block p-3 text-sm font-semibold text-[var(--text-primary)]">{p.fields.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <aside aria-label="About the author" className="mt-12 flex gap-4 items-center rounded-2xl border border-[var(--border)] p-5">
        <img
          src="/assets/images/hero-portrait.png"
          alt="Kithnuwan Silva"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover object-top flex-shrink-0"
        />
        <div>
          <p className="font-semibold text-[var(--text-primary)]">Kithnuwan Silva</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Senior AV &amp; Broadcast Systems Consultant and Head of System Integrations at Anscom Limited.
            20+ years designing AV, broadcast and unified communications systems across Sri Lanka. CCNA, Dante Level 2.
          </p>
          <p className="mt-2 text-sm">
            <Link href="/projects" className="text-[var(--accent)] hover:underline">See projects</Link>
            <span className="mx-2 text-[var(--text-secondary)]">·</span>
            <Link href="/#contact" className="text-[var(--accent)] hover:underline">Get in touch</Link>
          </p>
        </div>
      </aside>
    </article>
  );
}
