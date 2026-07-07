'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Radio, Monitor, Phone, Network, Code2, Signal } from 'lucide-react';
import { LaserReveal } from '@/components/ui/LaserReveal';

const skillCategories = [
  {
    icon: Radio,
    title: 'Broadcast Systems',
    num: '01',
    accent: '#00E5FF',
    skills: [
      'Newsroom Systems', 'Virtual Studios', 'AR/VR Graphics',
      'NDI Workflows', 'Production Switching', 'Media Asset Management',
      'Multiviewer Systems', 'Broadcast Routing', 'Graphics Systems',
    ],
  },
  {
    icon: Monitor,
    title: 'AV Systems',
    num: '02',
    accent: '#38BDF8',
    skills: [
      'Meeting Rooms', 'Boardrooms', 'Auditoriums',
      'Digital Signage', 'Audio DSP', 'Control Systems',
      'Video Walls', 'Lecture Capture', 'PTZ Systems',
    ],
  },
  {
    icon: Phone,
    title: 'Unified Communications',
    num: '03',
    accent: '#818CF8',
    skills: [
      'Microsoft Teams Rooms', 'Zoom Rooms', 'Google Meet',
      'BYOD Solutions', 'Hybrid Meetings', 'Video Conferencing',
    ],
  },
  {
    icon: Network,
    title: 'Networking & IP',
    num: '04',
    accent: '#34D399',
    skills: [
      'AV over IP', 'Dante Audio', 'Multicast Networks',
      'Enterprise Switching', 'SDVoE', 'NDI over IP',
    ],
  },
  {
    icon: Code2,
    title: 'Programming & Control',
    num: '05',
    accent: '#F0B429',
    skills: [
      'Kramer Control', 'Q-SYS Designer', 'Biamp TesiraFORTE',
      'Crestron', 'AMX', 'Extron Control',
    ],
  },
  {
    icon: Signal,
    title: 'Project Leadership',
    num: '06',
    accent: '#F472B6',
    skills: [
      'Presales Consulting', 'System Design', 'Project Management',
      'Tender Documentation', 'Team Leadership', 'Client Training',
    ],
  },
];

function SkillCard({ category, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="bento-card p-6 group cursor-default"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${category.accent}18`, boxShadow: `0 0 20px ${category.accent}10` }}
        >
          <category.icon className="h-5 w-5" style={{ color: category.accent }} />
        </div>
        <span
          className="font-mono text-3xl font-black opacity-10 group-hover:opacity-20 transition-opacity"
          style={{ color: category.accent }}
        >
          {category.num}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[var(--text-primary)] font-bold text-base mb-4 leading-tight">{category.title}</h3>

      {/* Divider */}
      <div
        className="h-px mb-4 opacity-30"
        style={{ background: `linear-gradient(90deg, ${category.accent}, transparent)` }}
      />

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="skill-pill text-[11px]"
            style={{
              color: category.accent,
              backgroundColor: `${category.accent}10`,
              borderColor: `${category.accent}25`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section id="skills" className="py-24 relative bg-[var(--bg-secondary)]">
      <div className="absolute inset-0 grid-bg opacity-[0.035] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.04] pointer-events-none"
        style={{ background: 'var(--accent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="section-num">02 — Expertise</span>
            <div className="hr-gradient flex-1" />
          </div>
          <LaserReveal>
            <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)]">
              Technical <span className="text-gradient-blue">Skills</span>
            </h2>
          </LaserReveal>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl text-base leading-relaxed">
            Deep expertise across the full AV & Broadcast technology stack — from system design to hands-on integration.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
