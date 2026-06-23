'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Reveals children with a top-to-bottom laser scan effect.
 * Falls back to a simple opacity fade when prefers-reduced-motion is active.
 */
export function LaserReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Clipped text layer */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 -4px 0)' } : {}}
        transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
        style={{ willChange: 'clip-path' }}
        className="motion-reduce:!transition-none motion-reduce:![clip-path:none] motion-reduce:![animation:none]"
      >
        {children}
      </motion.div>

      {/* Laser scanner glow line */}
      <motion.div
        aria-hidden="true"
        initial={{ top: '0%', opacity: 0 }}
        animate={inView ? { top: ['0%', '0%', '105%'], opacity: [0, 1, 0] } : {}}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.05, 1],
        }}
        className="absolute left-0 right-0 pointer-events-none motion-reduce:hidden"
        style={{
          height: '2px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,191,255,0.4) 15%, #00E5FF 45%, #00BFFF 55%, rgba(0,191,255,0.4) 85%, transparent 100%)',
          boxShadow:
            '0 0 6px 2px rgba(0,191,255,0.55), 0 0 20px 6px rgba(0,191,255,0.2)',
          zIndex: 10,
        }}
      />
    </div>
  );
}
