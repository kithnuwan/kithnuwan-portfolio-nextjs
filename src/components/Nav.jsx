'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Linkedin, Menu, X, Sun, Moon } from 'lucide-react';

const profile = {
  name: 'Kithnuwan Silva',
  title: 'Head of System Integrations · Anscom Limited',
  socials: [
    { label: 'Email', href: 'mailto:Kithnuwan@gmail.com', Icon: Mail },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kithnuwan-silva-70310310/', Icon: Linkedin },
  ],
};

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Theme state (JS only)
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  // Apply theme to <html>
  const applyTheme = (t) => {
    document.documentElement.classList.toggle('dark', t === 'dark');
  };

  useEffect(() => {
    setMounted(true);
    try {
      const ls = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = ls ? ls : (prefersDark ? 'dark' : 'light');
      setTheme(initial);
      applyTheme(initial);

      // Optional: watch OS changes and follow them if user hasn't explicitly chosen
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const syncSystem = (e) => {
        const stored = localStorage.getItem('theme');
        if (!stored) { // only follow system if no manual choice saved
          const t = e.matches ? 'dark' : 'light';
          setTheme(t);
          applyTheme(t);
        }
      };
      mql.addEventListener?.('change', syncSystem);
      return () => mql.removeEventListener?.('change', syncSystem);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#milestones', label: 'Milestones' },
    { href: '#contact', label: 'Contact' },
    { href: '/blog', label: 'Blog', isPageLink: true },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/5 dark:border-white/10">
        <nav className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/images/my-logo.png" alt="Logo" className="h-9 w-9 rounded-xl object-cover" />
            <div className="leading-tight">
              <div className="text-base font-semibold text-gray-900 dark:text-white">{profile.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{profile.title}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) =>
              link.isPageLink ? (
                <Link key={link.label} href={link.href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400">
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={isHomePage ? link.href : `/${link.href}`}
                  className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Right-side controls (desktop): socials + theme toggle */}
          <div className="hidden md:flex items-center gap-2">
            {profile.socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10" aria-label={label}>
                <Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </a>
            ))}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="ml-1 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden lg:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button + mobile theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-950 p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
              <img src="/assets/images/my-logo.png" alt="Logo" className="h-9 w-9 rounded-xl object-cover" />
              <div className="leading-tight">
                <div className="text-base font-semibold text-gray-900 dark:text-white">{profile.name}</div>
              </div>
            </Link>
            <button onClick={closeMenu} className="p-2" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) =>
              link.isPageLink ? (
                <Link key={link.label} href={link.href} onClick={closeMenu} className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400">
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={isHomePage ? link.href : `/${link.href}`}
                  onClick={closeMenu}
                  className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-4 mt-8">
            {profile.socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2" aria-label={label}>
                <Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              </a>
            ))}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="ml-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
