export const SITE_URL = 'https://kithnuwan.com';
export const SITE_NAME = 'Kithnuwan Silva';
export const PERSON_ID = `${SITE_URL}/#person`;
export const DEFAULT_OG_IMAGE = '/assets/images/hero-portrait.png';

// Flatten a Contentful rich-text document to plain text.
// With bodyOnly, headings are skipped so meta descriptions start with prose.
export function richTextToPlain(node, { bodyOnly = false } = {}) {
  if (!node) return '';
  if (node.nodeType === 'text') return node.value || '';
  if (bodyOnly && node.nodeType?.startsWith('heading')) return '';
  if (!Array.isArray(node.content)) return '';
  const sep = node.nodeType === 'document' ? ' ' : '';
  return node.content.map((n) => richTextToPlain(n, { bodyOnly })).join(sep);
}

// Trim to a meta-description length on a word boundary.
export function toDescription(text, max = 158) {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\-–—]$/, '') + '…';
}

// Contentful asset URLs come protocol-relative ("//images.ctfassets.net/...").
export function assetUrl(asset) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith('//') ? `https:${url}` : url;
}

// Path for a slug, percent-encoding spaces and other unsafe characters.
export function slugPath(base, slug) {
  return `${base}/${encodeURIComponent(slug)}`;
}

// Asset titles are often camera filenames ("20231003-230349") or bare numbers.
// Fall back to a description built from the page title in that case.
export function describeAsset(asset, pageTitle, index) {
  const title = (asset?.fields?.description || asset?.fields?.title || '').trim();
  const looksLikeFilename = !title || /^[\d\s_\-.]+$/.test(title) || /^(img|dsc|pxl|vid)[\s_\-]?\d+/i.test(title);
  return looksLikeFilename ? `${pageTitle} – photo ${index + 1}` : title;
}

export function breadcrumbJsonLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }) }}
    />
  );
}
