'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Linkedin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,25,47,0.95)] backdrop-blur-xl border-b border-[rgba(0,191,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/assets/images/my-logo.png"
                alt="Logo"
                className="h-9 w-9 rounded-xl object-cover ring-1 ring-[rgba(0,191,255,0.3)] group-hover:ring-[rgba(0,191,255,0.7)] transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-[rgba(0,191,255,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-[#E6F1FF] group-hover:text-[#00BFFF] transition-colors duration-300">
                Kithnuwan Silva
              </div>
              <div className="text-[10px] text-[#8892B0] hidden sm:block">
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
                  className="px-3 py-1.5 text-sm text-[#8892B0] hover:text-[#00BFFF] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={isHome ? link.href : `/${link.href}`}
                  className="px-3 py-1.5 text-sm text-[#8892B0] hover:text-[#00BFFF] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              )
            )}
          </div>

          {/* Desktop right: socials + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="mailto:Kithnuwan@gmail.com"
              className="p-2 rounded-lg text-[#8892B0] hover:text-[#00BFFF] hover:bg-[rgba(0,191,255,0.08)] transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/kithnuwan-silva-70310310/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#8892B0] hover:text-[#00BFFF] hover:bg-[rgba(0,191,255,0.08)] transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="ml-2 btn-primary text-xs py-2 px-4"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-[#8892B0] hover:text-[#00BFFF] hover:bg-[rgba(0,191,255,0.08)] transition-all"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
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
              className="fixed right-0 top-0 bottom-0 z-[70] w-80 bg-[#0D1F3C] border-l border-[rgba(0,191,255,0.15)] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[#00BFFF] font-bold text-sm tracking-widest uppercase">Menu</span>
                <button onClick={closeMenu} className="p-2 rounded-lg text-[#8892B0] hover:text-[#E6F1FF]">
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
                      className="px-4 py-3 text-[#8892B0] hover:text-[#00BFFF] hover:bg-[rgba(0,191,255,0.05)] rounded-lg transition-all text-sm font-medium"
                    >
                      <span className="text-[#00BFFF] mr-3 font-mono text-xs">0{i + 1}.</span>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={isHome ? link.href : `/${link.href}`}
                      onClick={closeMenu}
                      className="px-4 py-3 text-[#8892B0] hover:text-[#00BFFF] hover:bg-[rgba(0,191,255,0.05)] rounded-lg transition-all text-sm font-medium"
                    >
                      <span className="text-[#00BFFF] mr-3 font-mono text-xs">0{i + 1}.</span>
                      {link.label}
                    </a>
                  )
                )}
              </nav>

              <div className="flex items-center gap-3 pt-6 border-t border-[rgba(0,191,255,0.1)]">
                <a href="mailto:Kithnuwan@gmail.com" className="p-2 rounded-lg text-[#8892B0] hover:text-[#00BFFF]">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/kithnuwan-silva-70310310/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#8892B0] hover:text-[#00BFFF]">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#contact" onClick={closeMenu} className="ml-auto btn-primary text-xs py-2 px-4">
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
