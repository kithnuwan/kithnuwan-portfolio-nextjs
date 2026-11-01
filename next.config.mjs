/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permanent redirects for blog posts whose CMS slug was changed, so old links keep working.
  async redirects() {
    return [
      {
        source: '/blog/Child%20Friendly%20Court%20System',
        destination: '/blog/unicef-child-friendly-court-system',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
