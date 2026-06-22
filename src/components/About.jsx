'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, Award, Users } from 'lucide-react';

const highlights = [
  { icon: Briefcase, label: 'Current Role', value: 'Head of System Integrations', sub: 'Anscom Limited' },
  { icon: MapPin, label: 'Location', value: 'Colombo, Sri Lanka', sub: 'Available remotely' },
  { icon: Award, label: 'Education', value: 'BSc (Hons) Computer Networks', sub: '& Security' },
  { icon: Users, label: 'Clients', value: 'Government & Enterprise', sub: 'Broadcast & Corporate' },
];

const timeline = [
  {
    period: 'Jun 2003 – Jul 2009',
    role: 'Technical Executive',
    company: 'Swedish Trading Audio Visual',
    description: 'Started career in AV & Broadcast. Installation, programming, and maintenance across broadcast, corporate, education, and government sectors.',
    color: '#8892B0',
  },
  {
    period: 'Jul 2009 – 2022',
    role: 'Senior Manager – IT & Broadcast',
    company: 'Swedish Trading Audio Visual',
    description: 'Architected enterprise AV & Broadcast systems. Led video conferencing, control, routing, and digital signage deployments for major clients.',
    color: '#00BFFF',
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

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8"
    >
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-[rgba(0,191,255,0.3)] to-transparent" />
      <div
        className="absolute left-[-4px] top-2 w-2 h-2 rounded-full ring-2 ring-[#0A192F]"
        style={{ backgroundColor: item.color }}
      />
      <div className="glass p-5 rounded-xl hover:border-[rgba(0,191,255,0.25)] transition-all duration-300">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-[10px] font-mono text-[#8892B0]">{item.period}</span>
          {item.current && (
            <span className="text-[9px] font-bold bg-[rgba(255,215,0,0.15)] text-[#FFD700] px-2 py-0.5 rounded-full">
              Current
            </span>
          )}
        </div>
        <div className="text-[#E6F1FF] font-bold text-sm">{item.role}</div>
        <div className="text-xs mb-2" style={{ color: item.color }}>{item.company}</div>
        <p className="text-[#8892B0] text-xs leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(0,191,255,0.03)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow mb-3">About Me</div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#E6F1FF]">
            Turning Complex AV Challenges<br />
            into <span className="text-gradient-blue">Elegant Solutions</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-[#8892B0] text-base leading-relaxed mb-6">
                With over 20 years in the AV & Broadcast industry, I specialize in designing and
                delivering high-performance technology solutions for Sri Lanka&apos;s most demanding
                clients — from Parliament chambers to broadcast studios, courtrooms to enterprise
                boardrooms.
              </p>
              <p className="text-[#8892B0] text-base leading-relaxed mb-8">
                My expertise spans the full project lifecycle: from presales consultation and system
                design through to installation, commissioning, and post-delivery support. I bring
                deep technical knowledge across AV over IP, Unified Communications, Broadcast
                infrastructure, and ELV systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {highlights.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="glass p-4 rounded-xl hover:border-[rgba(0,191,255,0.25)] transition-all duration-300">
                  <Icon className="h-4 w-4 text-[#00BFFF] mb-2" />
                  <div className="text-[9px] text-[#495670] uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-[#E6F1FF] text-xs font-bold leading-tight">{value}</div>
                  <div className="text-[#8892B0] text-[10px]">{sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="eyebrow mb-2"
            >
              Career Journey
            </motion.div>
            {timeline.map((item, i) => (
              <TimelineItem key={item.role} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
