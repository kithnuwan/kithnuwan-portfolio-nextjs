export default function sitemap() {
  const base = 'https://kithnuwan.com';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];
}
