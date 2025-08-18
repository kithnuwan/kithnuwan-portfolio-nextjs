'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Linkedin, Menu, X } from "lucide-react";

const profile = {
    name: "Kithnuwan Silva",
    title: "Head of System Integrations · Anscom Limited",
    socials: [
      { label: "Email", href: "mailto:Kithnuwan@gmail.com", Icon: Mail },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kithnuwan-silva-70310310/", Icon: Linkedin },
    ],
  };

export default function Nav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // === CORRECTED ARRAY ===
    // Changed the "/projects" link back to "#projects"
    const navLinks = [
      { href: "#about", label: "About" },
      { href: "#services", label: "Services" },
      { href: "#projects", label: "Projects" }, // This now points to the homepage section
      { href: "#solutions", label: "Solutions" },
      { href: "#expertise", label: "Expertise" },
      { href: "#milestones", label: "Milestones" },
      { href: "#contact", label: "Contact" },
      { href: "/blog", label: "Blog", isPageLink: true },
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
              {navLinks.map((link) => {
                if (link.isPageLink) {
                  return (
                    <Link key={link.label} href={link.href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400">
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a 
                    key={link.label} 
                    href={isHomePage ? link.href : `/${link.href}`} 
                    className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
            
            {/* Social links (visible on desktop) */}
            <div className="hidden md:flex items-center gap-2">
                {profile.socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10" aria-label={label}>
                    <Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </a>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
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
              {navLinks.map((link) => {
                if (link.isPageLink) {
                  return (
                    <Link key={link.label} href={link.href} onClick={closeMenu} className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400">
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a 
                    key={link.label} 
                    href={isHomePage ? link.href : `/${link.href}`}
                    onClick={closeMenu}
                    className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Social links for mobile */}
            <div className="flex items-center gap-4 mt-8">
                {profile.socials.map(({ label, href, Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2" aria-label={label}>
                        <Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                    </a>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }