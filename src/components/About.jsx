'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, Award, Users, GraduationCap, Clock } from 'lucide-react';
import { LaserReveal } from '@/components/ui/LaserReveal';

const timeline = [
  {
    period: 'Jun 2003 – Jul 2009',
    role: 'Technical Executive',
    company: 'Swedish Trading Audio Visual',
    description: 'Started career in AV & Broadcast. Installation, programming, and maintenance across broadcast, corporate, education, and government sectors.',
    color: 'var(--text-secondary)',
  },
  {
    period: 'Jul 2009 – 2022',
    role: 'Senior Manager – IT & Broadcast',
    company: 'Swedish Trading Audio Visual',
    description: 'Architected enterprise AV & Broadcast systems. Led video conferencing, control, routing, and digital signage deployments for major clients.',
    color: 'var(--accent)',
  },
  {
    period: '2022 – Present',
    role: 'Head of System Integrations',
    company: 'Anscom Limited',
    description: "Leading design, presales, project management, and delivery of complex AV/Broadcast/UC solutions across Sri Lanka's top enterprises and government bodies.",
    color: '#FFD700',
    current: true,
  },
];

const highlights = [
  { icon: Briefcase, label: 'Current Role', value: 'Head of System Integrations', sub: 'Anscom Limited', color: 'var(--accent)' },
  { icon: GraduationCap, label: 'Education', value: 'BSc (Hons) Computer Networks', sub: '& Security', color: '#818CF8' },
  { icon: MapPin, label: 'Location', value: 'Colombo, Sri Lanka', sub: 'Remote available', color: '#F472B6' },
  { icon: Users, label: 'Clients', value: 'Government & Enterprise', sub: 'Broadcast & Corporate', color: '#34D399' },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative pl-6 pb-5 last:pb-0"
    >
      {/* Vertical line */}
      {index < timeline.length - 1 && (
        <div
          className="absolute left-[7px] top-5 w-px"
          style={{ height: 'calc(100% + 4px)', background: `linear-gradient(to bottom, ${item.color}40, transparent)` }}
        />
      )}
      {/* Dot */}
      <div
        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ring-2 ring-[var(--bg-primary)] flex-shrink-0"
        style={{
          backgroundColor: item.color,
          boxShadow: item.current ? `0 0 8px 2px ${item.color}60` : 'none',
        }}
      />

      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[10px] font-mono text-[var(--text-muted)]">{item.period}</span>
        {item.current && (
          <span className="text-[9px] font-bold bg-[rgba(255,215,0,0.12)] text-[#FFD700] px-2 py-0.5 rounded-full border border-[rgba(255,215,0,0.2)]">
            Current
          </span>
        )}
      </div>
      <div className="text-[var(--text-primary)] font-semibold text-sm leading-snug">{item.role}</div>
      <div className="text-xs mb-1.5 font-medium" style={{ color: item.color }}>{item.company}</div>
      <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const cardVariants = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay },
  });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-5 pointer-events-none"
        style={{ background: 'var(--accent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="section-num">01 — About</span>
            <div className="hr-gradient flex-1" />
          </div>
          <LaserReveal>
            <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight">
              Turning Complex AV Challenges<br />
              into <span className="text-gradient-blue">Elegant Solutions</span>
            </h2>
          </LaserReveal>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Bio card — large */}
          <motion.div {...cardVariants(0.08)} className="lg:col-span-7 bento-card p-7 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="glow-dot" />
              <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">About Me</span>
            </div>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
              With over 20 years in the AV & Broadcast industry, I specialize in designing and
              delivering high-performance technology solutions for Sri Lanka&apos;s most demanding
              clients — from Parliament chambers to broadcast studios, courtrooms to enterprise
              boardrooms.
            </p>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
              My expertise spans the full project lifecycle: from presales consultation and system
              design through to installation, commissioning, and post-delivery support. I bring
              deep technical knowledge across AV over IP, Unified Communications, Broadcast
              infrastructure, and ELV systems.
            </p>
            {/* Highlight grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label, value, sub, color }) => (
                <div
                  key={label}
                  className="rounded-xl p-3.5 transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}>
                      <Icon className="h-3 w-3" style={{ color }} />
                    </div>
                    <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">{label}</span>
                  </div>
                  <div className="text-[var(--text-primary)] text-xs font-bold leading-snug">{value}</div>
                  <div className="text-[var(--text-secondary)] text-[10px] mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Stats mini grid */}
            <motion.div {...cardVariants(0.15)} className="bento-card p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '20+', label: 'Years' },
                  { n: '300+', label: 'Projects' },
                  { n: '100+', label: 'Clients' },
                  { n: '20+', label: 'Certifications' },
                ].map(({ n, label }) => (
                  <div key={label} className="text-center py-2">
                    <div className="text-2xl sm:text-3xl font-black text-gradient-blue leading-none">{n}</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1 font-semibold">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline card */}
            <motion.div {...cardVariants(0.22)} className="bento-card p-6 flex-1">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">Career Journey</span>
              </div>
              <div className="flex flex-col">
                {timeline.map((item, i) => (
                  <TimelineItem key={item.role} item={item} index={i} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
