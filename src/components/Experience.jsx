'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LaserReveal } from '@/components/ui/LaserReveal';

const experience = [
  {
    role: 'Head of System Integrations / Special Project Manager',
    org: 'Anscom Limited',
    period: '2022 – Present',
    current: true,
    color: '#FFD700',
    bullets: [
      'Design & delivery of AV/Broadcast solutions for boardrooms, studios, auditoriums, and control rooms',
      'Formulate complex technology solutions across AVoIP, UC, and control systems',
      'Oversee installations, logistics, change orders, commissioning, and training',
      'Troubleshoot and resolve complex AV issues; lead teams and vendor coordination',
      'Presales support, tender documentation, and technical bid management',
    ],
  },
  {
    role: 'Senior Manager – IT & Broadcast',
    org: 'Swedish Trading Audio Visual (Pvt) Ltd',
    period: 'Jul 2009 – 2022',
    color: '#00BFFF',
    bullets: [
      'Architected AV & Broadcast systems meeting enterprise and government specifications',
      'Led deployments for video conferencing, control, routing, and digital signage',
      'Managed project execution, shipments, vendor relationships, and documentation',
      'Delivered broadcast infrastructure for major Sri Lankan media organizations',
    ],
  },
  {
    role: 'Technical Executive',
    org: 'Swedish Trading Audio Visual (Pvt) Ltd',
    period: 'Jun 2003 – Jul 2009',
    color: '#8892B0',
    bullets: [
      'Installation, programming, and maintenance for broadcast and enterprise AV systems',
      'Coordinated bid and design-build projects across broadcast, corporate, education, and government sectors',
      'Gained deep hands-on experience with AV signal routing, control systems, and broadcast infrastructure',
    ],
  },
];

function ExperienceCard({ exp, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <div className={`relative flex gap-6 ${index < total - 1 ? 'mb-6' : ''}`}>
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <motion.div
          ref={ref}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className="w-4 h-4 rounded-full ring-4 ring-[#0A192F] flex-shrink-0 mt-1"
          style={{ backgroundColor: exp.color }}
        />
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            className="w-px flex-1 mt-2 origin-top"
            style={{ backgroundColor: `${exp.color}30` }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1 }}
        className="glass rounded-2xl p-6 flex-1 group hover:border-[rgba(0,191,255,0.2)] transition-all duration-300"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[#E6F1FF] font-bold text-base">{exp.role}</h3>
              {exp.current && (
                <span className="text-[9px] font-bold bg-[rgba(255,215,0,0.15)] text-[#FFD700] px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
            <div className="text-sm font-semibold" style={{ color: exp.color }}>{exp.org}</div>
          </div>
          <span className="text-[11px] font-mono text-[#8892B0] bg-[rgba(255,255,255,0.04)] px-3 py-1 rounded-lg flex-shrink-0">
            {exp.period}
          </span>
        </div>

        <ul className="space-y-2">
          {exp.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#8892B0] text-sm">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: exp.color }} />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[rgba(0,191,255,0.1)] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow mb-3">Work History</div>
          <LaserReveal>
          <h2 className="text-4xl sm:text-5xl font-black text-[#E6F1FF]">
            Professional <span className="text-gradient-blue">Experience</span>
          </h2>
          </LaserReveal>
          <p className="mt-4 text-[#8892B0] max-w-xl">
            Two decades building, designing, and leading AV & Broadcast technology solutions across Sri Lanka.
          </p>
        </motion.div>

        <div>
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.role} exp={exp} index={i} total={experience.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
