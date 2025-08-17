'use client';
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { createClient } from 'contentful';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { X } from "lucide-react";

function classNames(...c) {
    return c.filter(Boolean).join(" ");
  }

const contentfulClient = createClient({
    space: '551rp64eiwpx',
    accessToken: 'uG_vTCp1jXbb8vU21dxEYxyi-sSchK4wN1S6oF_jsm0',
  });

export default function BlogModal({ onClose }) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [activeTag, setActiveTag] = useState("All");

    const renderRichText = useMemo(() => {
    const options = {
      renderNode: {
        [BLOCKS.HEADING_1]: (_node, children) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
        [BLOCKS.HEADING_2]: (_node, children) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
        [BLOCKS.HEADING_3]: (_node, children) => <h3 className="text-2xl font-bold mt-5 mb-2">{children}</h3>,
        [BLOCKS.HEADING_4]: (_node, children) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
        [BLOCKS.HEADING_5]: (_node, children) => <h5 className="text-lg font-bold mt-3 mb-1">{children}</h5>,
        [BLOCKS.HEADING_6]: (_node, children) => <h6 className="text-base font-bold mt-2 mb-1">{children}</h6>,
        [BLOCKS.PARAGRAPH]: (_node, children) => <p className="mb-4 text-gray-700 dark:text-gray-300">{children}</p>,
        [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc list-inside mb-4 pl-4">{children}</ul>,
        [BLOCKS.OL_LIST]: (_node, children) => <ol className="list-decimal list-inside mb-4 pl-4">{children}</ol>,
        [BLOCKS.LIST_ITEM]: (_node, children) => <li className="mb-2">{children}</li>,
        [BLOCKS.QUOTE]: (_node, children) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">{children}</blockquote>,
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const file = node?.data?.target?.fields?.file;
          if (!file?.url) return null;
          return <img src={`https:${file.url}`} alt={node?.data?.target?.fields?.title || ""} className="rounded-lg my-4" />;
        },
      },
    };
    return (value) => {
      if (value?.nodeType === 'document') {
        return documentToReactComponents(value, options);
      }
      return null;
    };
  }, []);

      useEffect(() => {
        contentfulClient.getEntries({ content_type: "myBlog", order: "-fields.publishDate" })
          .then((response) => setPosts(response.items || []))
          .catch(console.error);
      }, []);

      const allTags = useMemo(() => [...new Set(posts.flatMap((p) => p.fields.tags || []))].sort(), [posts]);
      const groupedPosts = useMemo(() => {
        const filtered = activeTag === "All" ? posts : posts.filter((p) => (p.fields.tags || []).includes(activeTag));
        return filtered.reduce((acc, post) => {
          if (!post.fields.publishDate) return acc;
          const d = new Date(post.fields.publishDate);
          const year = d.getFullYear();
          const month = d.toLocaleString("default", { month: "long" });
          if (!acc[year]) acc[year] = {};
          if (!acc[year][month]) acc[year][month] = [];
          acc[year][month].push(post);
          return acc;
        }, {});
      }, [posts, activeTag]);

      useEffect(() => {
        const years = Object.keys(groupedPosts);
        if (years.length) {
          const firstYear = years[0];
          const months = Object.keys(groupedPosts[firstYear]);
          if (months.length) {
            setSelectedPost(groupedPosts[firstYear][months[0]][0]);
            return;
          }
        }
        setSelectedPost(null);
      }, [groupedPosts]);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="relative bg-gray-50 dark:bg-neutral-900 w-full max-w-6xl h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between flex-shrink-0">
            <h2 className="text-xl font-bold">From the Blog</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 h-full overflow-hidden">
            <div className="md:col-span-1 lg:col-span-1 bg-white/50 dark:bg-black/10 border-r border-black/5 dark:border-white/5 overflow-y-auto">
              <div className="p-3 border-b border-black/5 dark:border-white/5">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setActiveTag("All")} className={classNames("px-2 py-1 rounded-md text-xs", activeTag === "All" ? "bg-indigo-600 text-white" : "bg-black/5 dark:bg-white/10")}>All</button>
                  {allTags.map((tag) => (
                    <button key={tag} onClick={() => setActiveTag(tag)} className={classNames("px-2 py-1 rounded-md text-xs", activeTag === tag ? "bg-indigo-600 text-white" : "bg-black/5 dark:bg-white/10")}>{tag}</button>
                  ))}
                </div>
              </div>
              <nav className="p-2">
                {Object.keys(groupedPosts).map((year) => (
                  <div key={year} className="mb-2">
                    <div className="px-3 py-1 text-xs font-bold uppercase text-gray-400">{year}</div>
                    {Object.keys(groupedPosts[year]).map((month) => (
                      <div key={month} className="mb-1">
                        <div className="px-3 py-1 text-xs font-semibold text-gray-500">{month}</div>
                        <ul>
                          {groupedPosts[year][month].map((post) => (
                            <li key={post.sys.id}>
                              <button onClick={() => setSelectedPost(post)} className={classNames("w-full text-left p-3 rounded-lg text-sm", selectedPost?.sys.id === post.sys.id ? "bg-indigo-100 dark:bg-cyan-900/50 font-semibold" : "hover:bg-black/5 dark:hover:bg-white/5")}>
                                {post.fields.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
            <div className="md:col-span-2 lg:col-span-3 p-6 md:p-8 overflow-y-auto">
              {selectedPost ? (
                <article className="prose prose-sm dark:prose-invert max-w-none">
                  <h1>{selectedPost.fields.title}</h1>
                  {selectedPost.fields.heroImage?.fields?.file?.url && (
                    <img src={`https:${selectedPost.fields.heroImage.fields.file.url}`} alt={selectedPost.fields.title} className="w-full aspect-video object-cover rounded-xl my-6" />
                  )}
                  <div>
                    {renderRichText(selectedPost.fields.contentText)}
                  </div>
                </article>
              ) : (
                <p className="text-sm text-gray-500">Select a post from the left to read.</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }