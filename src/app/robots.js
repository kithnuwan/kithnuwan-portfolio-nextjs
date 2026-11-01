// Allow regular search engines and the AI search / answer engines that cite
// sources (ChatGPT Search, Perplexity, Claude, Gemini, Copilot, Apple).
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: 'https://kithnuwan.com/sitemap.xml',
    host: 'https://kithnuwan.com',
  };
}
