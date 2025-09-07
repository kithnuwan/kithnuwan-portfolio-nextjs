// src/components/BlogSidebar.jsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Sidebar for blog pages. Lists posts and lets you filter by tag.
export function BlogSidebar({ posts }) {
  const [activeTag, setActiveTag] = useState('All');
  const pathname = usePathname();

  // Collect unique tags from blog posts
  const allTags = useMemo(() => {
    const tags = new Set(posts.flatMap(p => p.fields.tags || []));
    return ['All', ...Array.from(tags).sort()];
  }, [posts]);

  // Filter posts by the selected tag
  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') return posts;
    return posts.filter(p => (p.fields.tags || []).includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Blog Posts</h3>
        <nav className="flex flex-col gap-2">
          {filteredPosts.map(post => (
            <Link
              key={post.sys.id}
              href={`/blog/${post.fields.slug}`}
              className={classNames(
                'p-2 rounded transition-colors text-sm',
                pathname === `/blog/${post.fields.slug}`
                  ? 'bg-indigo-100 dark:bg-cyan-900/50 font-semibold'
                  : 'hover:bg-gray-100 dark:hover:bg-white/10'
              )}
            >
              {post.fields.title}
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Filter by Tag</h4>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={classNames(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
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
