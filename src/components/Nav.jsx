'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Linkedin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#meeting-rooms', label: 'Meeting Rooms' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#tech-stack', label: 'Tech Stack' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
  { href: '/blog', label: 'Blog', isPageLink: true },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {
          background: 'var(--bg-nav)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
        } : {}}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/assets/images/my-logo.png"
                alt="Logo"
                className="h-9 w-9 rounded-xl object-cover transition-all duration-300"
                style={{ boxShadow: '0 0 0 1px var(--accent-dim)' }}
              />
            </div>
            <div className="leading-tight">
              <div
                className="text-sm font-bold transition-colors duration-300 group-hover:opacity-80"
                style={{ color: 'var(--text-primary)' }}
              >
                Kithnuwan Silva
              </div>
              <div className="text-[10px] hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
                Senior AV & Broadcast Consultant
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isPageLink ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-sm transition-colors duration-200 relative group"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: 'var(--accent)' }}
                  />
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={isHome ? link.href : `/${link.href}`}
                  className="px-3 py-1.5 text-sm transition-colors duration-200 relative group"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: 'var(--accent)' }}
                  />
                </a>
              )
            )}
          </div>

          {/* Desktop right: theme switcher + socials + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeSwitcher />
            <a
              href="mailto:Kithnuwan@gmail.com"
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-subtle)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/kithnuwan/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-subtle)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#contact" className="ml-2 btn-primary text-xs py-2 px-4">
              Let's Talk
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-lg transition-all"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-80 p-6 flex flex-col"
              style={{
                background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>Menu</span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) =>
                  link.isPageLink ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={closeMenu}
                      className="px-4 py-3 rounded-lg transition-all text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="mr-3 font-mono text-xs" style={{ color: 'var(--accent)' }}>0{i + 1}.</span>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={isHome ? link.href : `/${link.href}`}
                      onClick={closeMenu}
                      className="px-4 py-3 rounded-lg transition-all text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="mr-3 font-mono text-xs" style={{ color: 'var(--accent)' }}>0{i + 1}.</span>
                      {link.label}
                    </a>
                  )
                )}
              </nav>

              <div className="flex items-center gap-3 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <a href="mailto:Kithnuwan@gmail.com" className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                  <Mail className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/kithnuwan/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#contact" onClick={closeMenu} className="ml-auto btn-primary text-xs py-2 px-4">
                  Let's Talk
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
