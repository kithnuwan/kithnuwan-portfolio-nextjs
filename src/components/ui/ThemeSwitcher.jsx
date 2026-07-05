'use client';

import { useEffect, useRef, useState } from 'react';
import { Palette, Check } from 'lucide-react';

const THEMES = [
  {
    id: 'broadcast-dark',
    label: 'Broadcast Dark',
    swatch: ['#0B1220', '#F59E0B', '#F8FAFC'],
  },
  {
    id: 'signal-blue',
    label: 'Signal Blue',
    swatch: ['#0A1A2F', '#38BDF8', '#F1F5F9'],
  },
  {
    id: 'control-teal',
    label: 'Control Teal',
    swatch: ['#0D1B1A', '#2DD4BF', '#F0FDF9'],
  },
  {
    id: 'executive-light',
    label: 'Executive Light',
    swatch: ['#FAF7F2', '#B4762A', '#1C1917'],
  },
];

const THEME_COLORS = {
  'broadcast-dark': '#0B1220',
  'signal-blue':    '#0A1A2F',
  'control-teal':   '#0D1B1A',
  'executive-light':'#FAF7F2',
};

export default function ThemeSwitcher() {
  const [active, setActive] = useState('signal-blue');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') || 'signal-blue';
      setActive(stored);
    } catch {}
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const applyTheme = (id) => {
    setActive(id);
    setOpen(false);
    document.documentElement.setAttribute('data-theme', id);
    try { localStorage.setItem('theme', id); } catch {}

    // Update <meta name="theme-color">
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[id]);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch theme"
        aria-expanded={open}
        className="p-2 rounded-lg transition-all duration-200"
        style={{
          color: 'var(--text-secondary)',
          background: open ? 'var(--accent-subtle)' : 'transparent',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-subtle)'}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent'; }}
      >
        <Palette className="h-4 w-4" style={{ color: open ? 'var(--accent)' : undefined }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 rounded-2xl p-1.5 z-[200] shadow-2xl"
          style={{
            background: 'var(--bg-glass-strong)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => applyTheme(t.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
              style={{
                background: active === t.id ? 'var(--accent-subtle)' : 'transparent',
              }}
              onMouseEnter={e => { if (active !== t.id) e.currentTarget.style.background = 'var(--accent-subtle)'; }}
              onMouseLeave={e => { if (active !== t.id) e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Swatch */}
              <span className="flex-shrink-0 flex rounded-md overflow-hidden" style={{ width: 28, height: 18, border: '1px solid var(--border)' }}>
                {t.swatch.map((c, i) => (
                  <span key={i} style={{ flex: 1, background: c }} />
                ))}
              </span>

              {/* Label */}
              <span className="flex-1 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                {t.label}
              </span>

              {/* Active check */}
              {active === t.id && (
                <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
