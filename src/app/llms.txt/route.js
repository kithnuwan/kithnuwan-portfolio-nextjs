import { getAllProjects, getAllPosts } from '@/lib/contentful';
import { SITE_URL, slugPath } from '@/lib/seo';

const LINKEDIN_URL = 'https://www.linkedin.com/in/kithnuwan-silva-70310310/';
import { SOLUTIONS, solutionForTags } from '@/lib/solutions';

// Plain-text site summary for AI assistants and answer engines (llmstxt.org format).
export const revalidate = 3600;

export async function GET() {
  const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()]);

  const projectLine = (p) => {
    const f = p.fields;
    const meta = [f.client?.trim(), f.year].filter(Boolean).join(', ');
    return `- [${f.title}](${SITE_URL}${slugPath('/projects', f.slug)})${meta ? ` (${meta})` : ''}${f.summary ? `: ${f.summary}` : ''}`;
  };

  const sections = SOLUTIONS.map((s) => {
    const list = projects.filter((p) => solutionForTags(p.fields.tags)?.slug === s.slug).map(projectLine);
    return `## ${s.name}\n\n${s.description}\nDetails and FAQs: ${SITE_URL}/solutions/${s.slug}\n\n${list.join('\n')}`;
  });

  const body = `# Kithnuwan Silva – AV, Meeting Room & Broadcast Solutions in Sri Lanka

> Kithnuwan Silva is a Senior AV & Broadcast Systems Consultant based in Colombo, Sri Lanka, and Head of System Integrations at Anscom Limited. Over 20+ years he has delivered 300+ audio-visual, unified communications and broadcast projects across Sri Lanka for government, banks, multinationals, universities and broadcasters.

Specialities: Microsoft Teams Rooms and Zoom Rooms, boardroom and meeting room AV, video conferencing, video walls and digital signage, AV over IP, auditorium voice lift and camera tracking, smart classrooms, conference and delegate systems, court AV, broadcast studios, OB vans and parliamentary broadcasting.

Brands and platforms used in delivered projects: Yealink, Poly, Logitech, Neat, Lenovo MTR, Q-SYS, Sennheiser, Kramer, Barco ClickShare, Samsung, Horizon, Sony, Vinten, Grass Valley.

Contact: Kithnuwan@gmail.com · ${SITE_URL}/#contact · LinkedIn: ${LINKEDIN_URL}

## Key pages

- [Home](${SITE_URL}/): profile, featured projects, certifications and experience
- [Solutions](${SITE_URL}/solutions): overview of services in Sri Lanka
${SOLUTIONS.map((s) => `- [${s.name}](${SITE_URL}/solutions/${s.slug}): ${s.description}`).join('\n')}
- [All projects](${SITE_URL}/projects): ${projects.length} project case studies
- [Blog](${SITE_URL}/blog): articles on AV and broadcast technology

${sections.join('\n\n')}
${posts.length ? `\n## Blog posts\n\n${posts.map((p) => `- [${p.fields.title}](${SITE_URL}${slugPath('/blog', p.fields.slug)})`).join('\n')}\n` : ''}`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
