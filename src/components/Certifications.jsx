'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, GraduationCap, Shield } from 'lucide-react';

const certifications = [
  {
    title: 'BSc (Hons) Computer Networks & Security',
    issuer: 'University',
    type: 'Degree',
    icon: GraduationCap,
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.15)',
    description: 'Bachelor of Science with Honours in Computer Networks and Information Security',
  },
  {
    title: 'CCNA',
    issuer: 'Cisco',
    type: 'Certification',
    icon: Shield,
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.12)',
    description: 'Cisco Certified Network Associate — Routing & Switching',
  },
  {
    title: 'Yealink Certified Expert',
    issuer: 'Yealink',
    type: 'Vendor Cert',
    icon: Award,
    color: '#00BFFF',
    glow: 'rgba(0,191,255,0.12)',
    description: 'Expert-level certification for Yealink UC endpoints and video conferencing systems',
  },
  {
    title: 'Dante Level 2',
    issuer: 'Audinate',
    type: 'Vendor Cert',
    icon: Award,
    color: '#FF6B6B',
    glow: 'rgba(255,107,107,0.12)',
    description: 'Dante networked audio certification — advanced configuration and troubleshooting',
  },
  {
    title: 'Biamp Certified',
    issuer: 'Biamp Systems',
    type: 'Vendor Cert',
    icon: Award,
    color: '#4CAF50',
    glow: 'rgba(76,175,80,0.12)',
    description: 'Certified in Biamp TesiraFORTE DSP programming and commissioning',
  },
  {
    title: 'Poly Certified',
    issuer: 'Poly (HP)',
    type: 'Vendor Cert',
    icon: Award,
    color: '#00BFFF',
    glow: 'rgba(0,191,255,0.12)',
    description: 'Poly collaboration endpoint and infrastructure deployment certification',
  },
  {
    title: 'Kramer Certified Programmer',
    issuer: 'Kramer Electronics',
    type: 'Vendor Cert',
    icon: Shield,
    color: '#FF9800',
    glow: 'rgba(255,152,0,0.12)',
    description: 'Certified programmer for Kramer Control AV automation and room control systems',
  },
];

function CertCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = cert.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="float-anim"
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      <div
        className="glass rounded-2xl p-6 h-full group hover:scale-[1.03] transition-all duration-300 relative overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 50% 0%, ${cert.glow}, transparent 70%)` }}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: cert.glow }}
          >
            <Icon className="h-6 w-6" style={{ color: cert.color }} />
          </div>

          {/* Type badge */}
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block"
            style={{ color: cert.color, backgroundColor: cert.glow }}
          >
            {cert.type}
          </span>

          <h3 className="text-[#E6F1FF] font-bold text-sm leading-tight mb-1">{cert.title}</h3>
          <div className="text-[10px] text-[#8892B0] mb-3">{cert.issuer}</div>
          <p className="text-[#495670] text-[11px] leading-relaxed">{cert.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[rgba(255,215,0,0.03)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(0,191,255,0.03)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow mb-3">Credentials</div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#E6F1FF]">
            Certifications &{' '}
            <span className="text-gradient-gold">Qualifications</span>
          </h2>
          <p className="mt-4 text-[#8892B0] max-w-xl">
            Industry-recognized credentials validating expertise across networking, audio, video, and unified communications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
