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

/* ─────────────────────────────────────────────
   CIRCUIT BOARD CANVAS
───────────────────────────────────────────── */
function CircuitCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let wires = [];
    let pulses = [];
    let chips = [];

    const GRID = 64;

    const getAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38BDF8';

    // Parse hex/rgb to rgba string
    function accentAlpha(hex, alpha) {
      // hex like #38BDF8 → r,g,b
      const h = hex.replace('#', '');
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function buildCircuit() {
      wires = [];
      pulses = [];
      chips = [];

      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.ceil(W / GRID) + 2;
      const rows = Math.ceil(H / GRID) + 2;

      // Horizontal wire segments
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          if (Math.random() < 0.42) {
            wires.push({
              x1: c * GRID, y1: r * GRID,
              x2: (c + 1) * GRID, y2: r * GRID,
              active: Math.random() < 0.28,
              dir: 'h',
            });
          }
        }
      }

      // Vertical wire segments
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.42) {
            wires.push({
              x1: c * GRID, y1: r * GRID,
              x2: c * GRID, y2: (r + 1) * GRID,
              active: Math.random() < 0.28,
              dir: 'v',
            });
          }
        }
      }

      // Build chip rectangles at random intersections
      for (let i = 0; i < Math.floor((cols * rows) * 0.015); i++) {
        const c = 1 + Math.floor(Math.random() * (cols - 2));
        const r = 1 + Math.floor(Math.random() * (rows - 2));
        const w = (1 + Math.floor(Math.random() * 2)) * GRID;
        const h = (1 + Math.floor(Math.random() * 2)) * GRID;
        chips.push({ x: c * GRID - w / 2, y: r * GRID - h / 2, w, h });
      }

      // Pulses on active wires
      const activeWires = wires.filter(w => w.active);
      const count = Math.min(45, Math.floor(activeWires.length * 0.55));
      for (let i = 0; i < count; i++) {
        const wire = activeWires[Math.floor(Math.random() * activeWires.length)];
        const fwd = Math.random() < 0.5;
        pulses.push({
          wire,
          t: Math.random(),
          speed: (0.0025 + Math.random() * 0.005) * (fwd ? 1 : -1),
          size: 1.8 + Math.random() * 1.4,
          glow: 8 + Math.random() * 10,
          trail: [],
        });
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildCircuit();
    }

    function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

    function draw() {
      const accent = getAccent();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Background dim grid lines ──
      ctx.save();
      ctx.strokeStyle = accentAlpha(accent.startsWith('#') ? accent : '#38BDF8', 0.04);
      ctx.lineWidth = 0.5;
      wires.forEach(w => {
        if (!w.active) {
          ctx.beginPath();
          ctx.moveTo(w.x1, w.y1);
          ctx.lineTo(w.x2, w.y2);
          ctx.stroke();
        }
      });
      ctx.restore();

      // ── Active wire traces (brighter, glowing) ──
      wires.forEach(w => {
        if (!w.active) return;
        // Subtle glow layer
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(w.x1, w.y1);
        ctx.lineTo(w.x2, w.y2);
        ctx.strokeStyle = accent.startsWith('#') ? accentAlpha(accent, 0.18) : accent;
        ctx.lineWidth = 1;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.restore();
      });

      // ── Grid nodes at intersections ──
      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.ceil(W / GRID) + 2;
      const rows = Math.ceil(H / GRID) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GRID;
          const y = r * GRID;
          // Outer ring
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = accent.startsWith('#') ? accentAlpha(accent, 0.12) : accent;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
          // Core dot
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = accent.startsWith('#') ? accentAlpha(accent, 0.18) : accent;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── IC chip outlines ──
      ctx.save();
      chips.forEach(chip => {
        ctx.strokeStyle = accent.startsWith('#') ? accentAlpha(accent, 0.09) : accent;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(chip.x, chip.y, chip.w, chip.h);
        // Inner fill suggestion
        ctx.fillStyle = accent.startsWith('#') ? accentAlpha(accent, 0.025) : accent;
        ctx.fillRect(chip.x, chip.y, chip.w, chip.h);
        // Pin marks along edges
        const pinCount = 3;
        for (let i = 1; i <= pinCount; i++) {
          const tx = chip.x + (chip.w / (pinCount + 1)) * i;
          ctx.beginPath();
          ctx.moveTo(tx, chip.y);
          ctx.lineTo(tx, chip.y - 5);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(tx, chip.y + chip.h);
          ctx.lineTo(tx, chip.y + chip.h + 5);
          ctx.stroke();
        }
      });
      ctx.restore();

      // ── Data pulses with trails ──
      pulses.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        if (p.t < 0) p.t = 1;

        const x = lerp(p.wire.x1, p.wire.x2, p.t);
        const y = lerp(p.wire.y1, p.wire.y2, p.t);

        // Record trail
        p.trail.push({ x, y });
        if (p.trail.length > 16) p.trail.shift();

        // Draw trail
        p.trail.forEach((pt, i) => {
          const frac = i / p.trail.length;
          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * frac * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.globalAlpha = frac * 0.35;
          ctx.shadowColor = accent;
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.restore();
        });

        // Outer glow halo
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size + 4, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.12;
        ctx.shadowColor = accent;
        ctx.shadowBlur = p.glow * 2.5;
        ctx.fill();
        ctx.restore();

        // Mid glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.45;
        ctx.shadowColor = accent;
        ctx.shadowBlur = p.glow;
        ctx.fill();
        ctx.restore();

        // Bright white core
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.shadowColor = accent;
        ctx.shadowBlur = p.glow * 0.6;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
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
      style={{ opacity: 0.9 }}
    />
  );
}

/* ─────────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────────── */
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
    <div ref={ref} className="text-center cursor-default">
      <div className="stat-display">{count}{suffix}</div>
      <div className="text-[var(--text-secondary)] text-[11px] sm:text-xs mt-1.5 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
export default function Hero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      {/* Circuit board animation */}
      <CircuitCanvas />

      {/* Dark vignette overlay so text stays readable */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, var(--bg-primary) 90%)',
        }} />

      {/* Accent ambient orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.07] pointer-events-none"
        style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: 'color-mix(in srgb, var(--accent) 70%, #818CF8)' }} />

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

              {/* Typewriter */}
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
                  <a href="#contact" className="btn-outline">Contact Me</a>
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
              <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] xl:w-[420px]">
                {/* Animated rings */}
                <div
                  className="portrait-ring-1 absolute inset-[-16px] rounded-full pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 75%, var(--accent) 85%, transparent 95%)',
                    opacity: 0.3,
                  }}
                />
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
                    boxShadow: '0 0 0 1px var(--border), 0 32px 80px rgba(0,0,0,0.6)',
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
                  <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: 'radial-gradient(ellipse 70% 80% at 50% 30%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)',
                    }}
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

                {/* Glow beneath portrait */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl opacity-25 pointer-events-none"
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:divide-x divide-[var(--border)]">
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
