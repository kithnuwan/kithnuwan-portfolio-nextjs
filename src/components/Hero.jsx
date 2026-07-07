'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download, ArrowRight, MapPin, Zap } from 'lucide-react';
import HeroRotator from './HeroRotator';
import { GeometricHover } from '@/components/ui/GeometricHover';

const SPECIALTIES = [
  'Audio Visual Integration',
  'Broadcast Technology',
  'Unified Communications',
  'AV over IP Systems',
  'Video Conferencing',
  'Smart Building Solutions',
];

const STATS = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 300, suffix: '+', label: 'Projects Delivered' },
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

    const getAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38BDF8';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.4 + 0.05,
    }));

    const draw = () => {
      const accent = getAccent();
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
        ctx.fillStyle = accent;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accent;
            ctx.globalAlpha = 0.04 * (1 - dist / 100);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
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
      style={{ opacity: 0.5 }}
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
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);

  return (
    <span className="text-gradient-blue">
      {displayed}
      <span className="inline-block w-[2px] h-[0.85em] bg-[var(--accent)] ml-0.5 align-middle animate-pulse" />
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
          const duration = 1600;
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
    <div ref={ref} className="text-center group cursor-default">
      <div className="stat-display">
        {count}{suffix}
      </div>
      <div className="text-[var(--text-secondary)] text-[11px] sm:text-xs mt-1.5 font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden revamp-hero">
      <ParticleCanvas />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: 'var(--accent)' }} />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] opacity-8 pointer-events-none"
        style={{ background: 'color-mix(in srgb, var(--accent) 70%, #818CF8)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />

      {/* Main content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative flex-1 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-16 items-center">

            {/* ── LEFT ── */}
            <div className="order-2 lg:order-1">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="tag-chip">
                  <Zap className="h-2.5 w-2.5" />
                  Senior AV & Broadcast Consultant
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Available
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="font-black tracking-tight leading-[1.0]"
              >
                <span
                  className="block text-[clamp(3rem,8vw,5.5rem)] text-[var(--text-primary)]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Kithnuwan
                </span>
                <span
                  className="block text-[clamp(3.5rem,9vw,6.5rem)] text-gradient-hero"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Silva
                </span>
              </motion.h1>

              {/* Typewriter specialty */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="mt-5 text-lg sm:text-xl font-semibold text-[var(--text-secondary)] h-9 flex items-center"
              >
                <TypewriterText texts={SPECIALTIES} />
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 }}
                className="mt-5 text-[var(--text-secondary)] text-base leading-relaxed max-w-lg"
              >
                20+ years designing and delivering mission-critical AV, Broadcast, and Unified
                Communications systems for government, enterprise, and broadcast environments
                across Sri Lanka.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <GeometricHover gap={8}>
                  <a href="#projects" className="btn-primary">
                    View Projects <ArrowRight className="h-4 w-4" />
                  </a>
                </GeometricHover>
                <GeometricHover gap={8}>
                  <a
                    href="https://drive.google.com/file/d/177Z7aVVDH3tnKsN2hcSAffSgth3ITKWq/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <Download className="h-4 w-4" /> Download CV
                  </a>
                </GeometricHover>
                <GeometricHover gap={8}>
                  <a href="#contact" className="btn-outline">
                    Contact Me
                  </a>
                </GeometricHover>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-6 flex items-center gap-2 text-xs text-[var(--text-muted)]"
              >
                <MapPin className="h-3 w-3" />
                <span>Anscom Limited · Colombo, Sri Lanka</span>
              </motion.div>
            </div>

            {/* ── RIGHT — Portrait ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 relative flex justify-center"
            >
              {/* Outer rotating ring */}
              <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] xl:w-[420px]">
                {/* Animated ring 1 */}
                <div
                  className="portrait-ring-1 absolute inset-[-16px] rounded-full pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 75%, var(--accent) 85%, transparent 95%)',
                    opacity: 0.3,
                  }}
                />
                {/* Animated ring 2 */}
                <div
                  className="portrait-ring-2 absolute inset-[-28px] rounded-full pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 180deg, transparent 80%, color-mix(in srgb, var(--accent) 60%, #818CF8) 90%, transparent 98%)',
                    opacity: 0.2,
                  }}
                />

                {/* Portrait frame */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    height: 'clamp(320px, 50vw, 500px)',
                    boxShadow: '0 0 0 1px var(--border), 0 32px 80px rgba(0,0,0,0.5)',
                    WebkitMaskImage: [
                      'linear-gradient(to bottom, black 50%, transparent 95%)',
                      'linear-gradient(to right, transparent 0%, black 10%, black 95%, transparent 100%)',
                    ].join(', '),
                    maskImage: [
                      'linear-gradient(to bottom, black 50%, transparent 95%)',
                      'linear-gradient(to right, transparent 0%, black 10%, black 95%, transparent 100%)',
                    ].join(', '),
                    WebkitMaskComposite: 'source-in',
                    maskComposite: 'intersect',
                  }}
                >
                  {/* Ambient radial behind portrait */}
                  <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 30%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)' }}
                  />
                  <HeroRotator
                    images={['/assets/images/hero-portrait.png']}
                    alt="Kithnuwan Silva portrait"
                    intervalMs={5000}
                    fadeMs={800}
                  />
                </div>

                {/* Floating badge — bottom left */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="floating-chip absolute -bottom-4 -left-6 z-10"
                >
                  <div className="text-[10px] text-[var(--text-secondary)]">Head of System Integrations</div>
                  <div className="text-sm font-bold text-[var(--accent)]">Anscom Limited</div>
                </motion.div>

                {/* Floating badge — top right */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                  className="floating-chip absolute -top-4 -right-4 z-10"
                >
                  <div className="text-[10px] text-[var(--text-secondary)]">Experience</div>
                  <div className="text-sm font-bold text-[#FFD700]">20+ Years</div>
                </motion.div>

                {/* Glow underneath portrait */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl opacity-30 pointer-events-none"
                  style={{ background: 'var(--accent)' }}
                />
              </div>
            </motion.div>

          </div>

          {/* ── Stats Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-16 lg:mt-20 bento-card px-6 py-7 sm:px-10 sm:py-8"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x-0 sm:divide-x divide-[var(--border)]">
              {STATS.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'sm:pl-6' : ''}>
                  <StatCounter {...stat} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 pb-6 flex flex-col items-center gap-1"
      >
        <span className="section-num">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-4 w-4 text-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
