export const dynamic = 'force-dynamic';

import { getAllPosts } from '@/lib/contentful';
import { BlogSidebar } from '@/components/BlogSidebar';

export default async function BlogLayout({ children }) {
  const posts = await getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <BlogSidebar posts={posts} />
        </aside>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
