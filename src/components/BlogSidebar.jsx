
'use client'; // This needs to be a client component to handle state

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function BlogSidebar({ posts }) {
  const [activeTag, setActiveTag] = useState("All");
  const pathname = usePathname();

  // Get all unique tags from the posts
  const allTags = useMemo(() => {
    const tags = new Set(posts.flatMap(p => p.fields.tags || []));
    return ["All", ...Array.from(tags).sort()];
  }, [posts]);

  // Filter posts based on the active tag
  const filteredPosts = useMemo(() => {
    if (activeTag === "All") {
      return posts;
    }
    return posts.filter(p => (p.fields.tags || []).includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div className="sticky top-24 space-y-8">
      {/* Tag Filter Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Filter by Tag</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={classNames(
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                activeTag === tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-white/20'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post List Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">All Posts</h3>
        <nav className="space-y-2">
          {filteredPosts.map(post => (
            <Link
              key={post.sys.id}
              href={`/blog/${post.fields.slug}`}
              className={classNames(
                'block p-3 rounded-lg transition-colors text-sm',
                pathname === `/blog/${post.fields.slug}`
                  ? 'bg-indigo-100 dark:bg-cyan-900/50 font-semibold'
                  : 'hover:bg-gray-100 dark:hover:bg-white/10'
              )}
            >
              {post.fields.title}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(post.fields.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}