'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import HeroRotator from './HeroRotator';

const SPECIALTIES = [
  'Audio Visual Integration',
  'Broadcast Technology',
  'Unified Communications',
  'AV over IP Systems',
  'Video Conferencing',
  'Smart Building Solutions',
];

const STATS = [
  { value: 18, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '+', label: 'Enterprise Clients' },
  { value: 20, suffix: '+', label: 'Certifications' },
];

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

function TypewriterText({ texts }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[index];
    let timeout;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);

  return (
    <span className="text-gradient-blue">
      {displayed}
      <span className="inline-block w-0.5 h-8 bg-[#00BFFF] ml-1 animate-pulse" />
    </span>
  );
}

function StatCounter({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 50;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-black text-gradient-blue">
        {count}{suffix}
      </div>
      <div className="text-[#8892B0] text-xs sm:text-sm mt-1 font-medium">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden grid-bg">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-[#00BFFF] pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-15 bg-[#00E5FF] pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-5 bg-[#00BFFF] pointer-events-none" />

      {/* Main content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="eyebrow mb-4"
              >
                ✦ Senior AV & Broadcast Systems Consultant
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
              >
                <span className="text-[#E6F1FF]">Kithnuwan</span>
                <br />
                <span className="text-gradient-hero">Silva</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-4 text-xl sm:text-2xl font-semibold text-[#8892B0] h-10 flex items-center"
              >
                <TypewriterText texts={SPECIALTIES} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-[#8892B0] text-base sm:text-lg leading-relaxed max-w-xl"
              >
                18+ years designing and delivering mission-critical AV, Broadcast, and Unified
                Communications systems for government, enterprise, and broadcast environments across Sri Lanka.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="#projects" className="btn-primary">
                  View Projects <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1ZXhQ9qE1m10gHub37I8gmHPao0vCWY0V/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Download className="h-4 w-4" /> Download CV
                </a>
                <a href="#contact" className="btn-outline">
                  Contact Me
                </a>
              </motion.div>

              {/* Location + company */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 flex items-center gap-4 text-xs text-[#495670]"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] inline-block" />
                  Anscom Limited, Sri Lanka
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Available for consulting
                </span>
              </motion.div>
            </div>

            {/* RIGHT — portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm lg:max-w-full">
                {/* Glow ring behind image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(0,191,255,0.2)] to-[rgba(0,229,255,0.05)] blur-2xl scale-110" />
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-[rgba(0,191,255,0.2)] shadow-[0_0_60px_rgba(0,191,255,0.15)]">
                  <HeroRotator
                    images={[
                      '/assets/images/hero-image.png',
                      '/assets/images/hero-portrait.png',
                    ].filter(Boolean)}
                    alt="Kithnuwan Silva portrait"
                    intervalMs={5000}
                    fadeMs={800}
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-xl shadow-lg"
                >
                  <div className="text-xs text-[#8892B0]">Head of System Integrations</div>
                  <div className="text-sm font-bold text-[#00BFFF]">Anscom Limited</div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl shadow-lg"
                >
                  <div className="text-xs text-[#8892B0]">Experience</div>
                  <div className="text-sm font-bold text-[#FFD700]">18+ Years</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 glass rounded-2xl p-6 sm:p-8"
          >
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] text-[#495670] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-4 w-4 text-[#00BFFF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
