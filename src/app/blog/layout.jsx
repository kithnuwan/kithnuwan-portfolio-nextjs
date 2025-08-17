import { createClient } from 'contentful';
import { BlogSidebar } from '@/components/BlogSidebar';

// This client is used to fetch all posts for the sidebar
const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Fetch all posts to pass to the sidebar
async function getPosts() {
  try {
    const response = await contentfulClient.getEntries({ 
      content_type: "myBlog", 
      order: "-fields.publishDate" 
    });
    return response.items || [];
  } catch (error) {
    console.error("Failed to fetch posts for sidebar:", error);
    return [];
  }
}

export default async function BlogLayout({ children }) {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Column */}
        <aside className="md:col-span-1">
          <BlogSidebar posts={posts} />
        </aside>

        {/* Main Content Column */}
        <div className="md:col-span-3">
          {children}
        </div>

      </div>
    </div>
  );
}