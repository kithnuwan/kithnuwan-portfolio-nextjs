import Link from 'next/link';
import { SOLUTIONS } from '@/lib/solutions';

export const metadata = {
  title: 'AV, Meeting Room & Broadcast Solutions in Sri Lanka',
  description:
    'Meeting room and boardroom AV, broadcast studios and OB, video walls, auditoriums, smart classrooms and conference systems – designed and delivered across Sri Lanka.',
  alternates: { canonical: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] mb-6">
        AV, Meeting Room & Broadcast Solutions in Sri Lanka
      </h1>
      <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-3xl">
        20+ years and 300+ projects delivering audio-visual, unified communications and broadcast systems for
        government, enterprise, education and media clients across Sri Lanka.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {SOLUTIONS.map((s) => (
          <Link key={s.slug} href={`/solutions/${s.slug}`} className="glass rounded-2xl p-6 hover:border-[var(--border)] transition-colors">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">{s.name}</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{s.description}</p>
            <span className="text-sm text-[var(--accent)]">Learn more →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
