'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Radio, Monitor, Phone, Network, Code2 } from 'lucide-react';
import { LaserReveal } from '@/components/ui/LaserReveal';

const skillCategories = [
  {
    icon: Radio,
    title: 'Broadcast Systems',
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.15)',
    skills: [
      'Newsroom Systems', 'Virtual Studios', 'AR/VR Graphics',
      'NDI Workflows', 'Production Switching', 'Media Asset Management',
      'Multiviewer Systems', 'Broadcast Routing', 'Graphics Systems',
    ],
  },
  {
    icon: Monitor,
    title: 'AV Systems',
    color: '#00BFFF',
    glow: 'rgba(0,191,255,0.15)',
    skills: [
      'Meeting Rooms', 'Boardrooms', 'Auditoriums',
      'Digital Signage', 'Audio DSP', 'Control Systems',
      'Video Walls', 'Lecture Capture', 'PTZ Systems',
    ],
  },
  {
    icon: Phone,
    title: 'Unified Communications',
    color: '#7B61FF',
    glow: 'rgba(123,97,255,0.15)',
    skills: [
      'Microsoft Teams Rooms', 'Zoom Rooms', 'Google Meet',
      'BYOD Solutions', 'Hybrid Meetings', 'Video Conferencing',
    ],
  },
  {
    icon: Network,
    title: 'Networking',
    color: '#00BFFF',
    glow: 'rgba(0,191,255,0.15)',
    skills: [
      'AV over IP', 'Dante Audio', 'Multicast Networks',
      'Enterprise Switching', 'SDVoE', 'NDI over IP',
    ],
  },
  {
    icon: Code2,
    title: 'Programming & Control',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.15)',
    skills: [
      'Kramer Control', 'Q-SYS Designer', 'Biamp TesiraFORTE',
      'Crestron', 'AMX', 'Extron Control',
    ],
  },
];

function SkillCard({ category, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 cursor-default"
      style={{
        '--card-glow': category.glow,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{ backgroundColor: category.glow }}
      >
        <Icon className="h-5 w-5" style={{ color: category.color }} />
      </div>

      <h3 className="text-[#E6F1FF] font-bold text-base mb-4">{category.title}</h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="text-[10px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200"
            style={{
              color: category.color,
              backgroundColor: category.glow,
              border: `1px solid ${category.color}20`,
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
    <section id="skills" className="py-24 relative bg-[#0D1F3C]">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[rgba(0,191,255,0.03)] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow mb-3">Expertise</div>
          <LaserReveal>
          <h2 className="text-4xl sm:text-5xl font-black text-[#E6F1FF]">
            Technical <span className="text-gradient-blue">Skills</span>
          </h2>
          </LaserReveal>
          <p className="mt-4 text-[#8892B0] max-w-xl">
            Deep expertise across the full AV & Broadcast technology stack — from system design to hands-on integration.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
