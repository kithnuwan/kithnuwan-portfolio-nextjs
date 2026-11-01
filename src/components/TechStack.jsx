'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { LaserReveal } from '@/components/ui/LaserReveal';

const technologies = [
  { name: 'Microsoft Teams', logo: 'microsoft-teams', category: 'UC' },
  { name: 'Zoom', logo: 'zoom', category: 'UC' },
  { name: 'Q-SYS', logo: 'q-sys', category: 'Control' },
  { name: 'Shure', logo: 'shure', category: 'Audio' },
  { name: 'Biamp', logo: 'biamp', category: 'Audio' },
  { name: 'Kramer', logo: 'kramer', category: 'AV' },
  { name: 'Yealink', logo: 'yealink', category: 'UC' },
  { name: 'Poly', logo: 'poly', category: 'UC' },
  { name: 'Logitech', logo: 'logitech', category: 'UC' },
  { name: 'Crestron', logo: 'crestron', category: 'Control' },
  { name: 'Ross Video', logo: 'ross-video', category: 'Broadcast' },
  { name: 'Vizrt', logo: 'vizrt', category: 'Broadcast' },
  { name: 'Blackmagic Design', logo: 'blackmagic-design', category: 'Broadcast' },
  { name: 'BirdDog', logo: 'birddog', category: 'NDI' },
  { name: 'Sony', logo: 'sony', category: 'Camera' },
  { name: 'Dante', logo: 'dante', category: 'Audio' },
  { name: 'NDI', logo: 'ndi', category: 'Video IP' },
  { name: 'Extron', logo: 'extron', category: 'AV' },
  { name: 'AMX', logo: 'amx', category: 'Control' },
  { name: 'Grass Valley', logo: 'grass-valley', category: 'Broadcast' },
  { name: 'Panasonic', logo: 'panasonic', category: 'Camera' },
  { name: 'Sennheiser', logo: 'sennheiser', category: 'Audio' },
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

// Brand logos live in /public/assets/logos/<slug>.svg (or .png), transparent background.
// They are shown in one colour that follows the theme (--logo-filter in globals.css).
// Until a logo file exists, the badge falls back to the brand name as text.
function TechBadge({ tech }) {
  const colors = categoryColors[tech.category] || categoryColors.AV;
  const [src, setSrc] = useState(tech.logo ? `/assets/logos/${tech.logo}.svg` : null);
  const onError = () => {
    if (src && src.endsWith('.svg')) setSrc(`/assets/logos/${tech.logo}.png`);
    else setSrc(null);
  };

  if (src) {
    return (
      <div
        className="flex-shrink-0 flex items-center justify-center h-14 px-6 rounded-full mx-2 transition-all hover:scale-105"
        style={{ backgroundColor: 'var(--accent-subtle, rgba(255,255,255,0.04))', border: '1px solid var(--border)' }}
        title={tech.name}
      >
        <img
          src={src}
          alt={tech.name}
          onError={onError}
          loading="lazy"
          className="h-7 w-auto max-w-[140px] object-contain"
          style={{ filter: 'var(--logo-filter)', opacity: 0.85 }}
        />
      </div>
    );
  }

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
          <div className="flex items-center gap-3 mb-4"><span className="section-num">05 — Tech Stack</span><div className="hr-gradient flex-1" /></div>
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
