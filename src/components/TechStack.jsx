'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LaserReveal } from '@/components/ui/LaserReveal';

const technologies = [
  { name: 'Microsoft Teams', category: 'UC' },
  { name: 'Zoom', category: 'UC' },
  { name: 'Q-SYS', category: 'Control' },
  { name: 'Shure', category: 'Audio' },
  { name: 'Biamp', category: 'Audio' },
  { name: 'Kramer', category: 'AV' },
  { name: 'Yealink', category: 'UC' },
  { name: 'Poly', category: 'UC' },
  { name: 'Logitech', category: 'UC' },
  { name: 'Crestron', category: 'Control' },
  { name: 'Ross Video', category: 'Broadcast' },
  { name: 'Vizrt', category: 'Broadcast' },
  { name: 'Blackmagic Design', category: 'Broadcast' },
  { name: 'BirdDog', category: 'NDI' },
  { name: 'Sony', category: 'Camera' },
  { name: 'Dante', category: 'Audio' },
  { name: 'NDI', category: 'Video IP' },
  { name: 'Extron', category: 'AV' },
  { name: 'AMX', category: 'Control' },
  { name: 'Grass Valley', category: 'Broadcast' },
  { name: 'Panasonic', category: 'Camera' },
  { name: 'Sennheiser', category: 'Audio' },
];

const categoryColors = {
  UC: { bg: 'rgba(0,191,255,0.08)', border: 'rgba(0,191,255,0.25)', text: '#00BFFF' },
  Audio: { bg: 'rgba(76,175,80,0.08)', border: 'rgba(76,175,80,0.25)', text: '#4CAF50' },
  AV: { bg: 'rgba(0,229,255,0.08)', border: 'rgba(0,229,255,0.25)', text: '#00E5FF' },
  Control: { bg: 'rgba(255,152,0,0.08)', border: 'rgba(255,152,0,0.25)', text: '#FF9800' },
  Broadcast: { bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.25)', text: '#FF6B6B' },
  NDI: { bg: 'rgba(123,97,255,0.08)', border: 'rgba(123,97,255,0.25)', text: '#7B61FF' },
  Camera: { bg: 'rgba(255,215,0,0.08)', border: 'rgba(255,215,0,0.25)', text: '#FFD700' },
  'Video IP': { bg: 'rgba(0,191,255,0.08)', border: 'rgba(0,191,255,0.25)', text: '#00BFFF' },
};

function TechBadge({ tech }) {
  const colors = categoryColors[tech.category] || categoryColors.AV;
  return (
    <div
      className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full mx-2 transition-all hover:scale-105"
      style={{
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span className="font-bold text-sm text-[var(--text-primary)] whitespace-nowrap">{tech.name}</span>
      <span
        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
        style={{ color: colors.text, backgroundColor: colors.bg }}
      >
        {tech.category}
      </span>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const doubled = [...technologies, ...technologies];

  return (
    <section id="tech-stack" className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow mb-3">Technology Partners</div>
          <LaserReveal>
          <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)]">
            Technology <span className="text-gradient-blue">Ecosystem</span>
          </h2>
          </LaserReveal>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
            Working with the world&apos;s leading AV, Broadcast, and UC technology brands to deliver best-in-class solutions.
          </p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative overflow-hidden py-2">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {doubled.map((tech, i) => (
            <TechBadge key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reversed */}
      <div className="relative overflow-hidden py-2 mt-3">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
        <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
          {[...doubled].reverse().map((tech, i) => (
            <TechBadge key={`rev-${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
