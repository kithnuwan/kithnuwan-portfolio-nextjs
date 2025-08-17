'use client'; // This must be a client component to use the pathname hook

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Linkedin } from "lucide-react";

const profile = {
    name: "Kithnuwan Silva",
    title: "Head of System Integrations · Anscom Limited",
    socials: [
      { label: "Email", href: "mailto:Kithnuwan@gmail.com", Icon: Mail },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kithnuwan-silva-70310310/", Icon: Linkedin },
    ],
  };

export default function Nav() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // A single array for all navigation links in the desired order
    const navLinks = [
      { href: "#about", label: "About" },
      { href: "#services", label: "Services" },
      { href: "#projects", label: "Projects" },
      { href: "#solutions", label: "Solutions" },
      { href: "#expertise", label: "Expertise" },
      { href: "#milestones", label: "Milestones" },
      { href: "#contact", label: "Contact" },
      { href: "/blog", label: "Blog", isPageLink: true }, // The blog link is now last
    ];

    return (
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/5 dark:border-white/10">
        <nav className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/images/my-logo.png" alt="Logo" className="h-9 w-9 rounded-xl object-cover" />
            <div className="leading-tight">
              <div className="text-base font-semibold text-gray-900 dark:text-white">{profile.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{profile.title}</div>
            </div>
          </Link>

          {/* Main navigation links are now rendered from the single navLinks array */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => {
              if (link.isPageLink) {
                // Render a Next.js <Link> for page navigation
                return (
                  <Link key={link.label} href={link.href} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400">
                    {link.label}
                  </Link>
                );
              }
              // Render a regular <a> tag for anchor/hash links
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

          {/* Social links */}
          <div className="flex items-center gap-2">
            {profile.socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10" aria-label={label}>
                <Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    );
  }