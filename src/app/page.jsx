'use client'; // Add this at the top

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Solutions from '@/components/Solutions';
import LegacyProjects from '@/components/LegacyProjects';
import Expertise from '@/components/Expertise';
import Experience from '@/components/Experience';
import Qualifications from '@/components/Qualifications';
import Milestones from '@/components/Milestones';
import Contact from '@/components/Contact';
import BlogModal from '@/components/BlogModal';
import Nav from '@/components/Nav';

export default function Home() {
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  return (
    <main>
       
      <Hero />
      <About />
      <Services />
      <Projects />
      <Solutions />
      <LegacyProjects />
      <Expertise />
      <Experience />
      <Qualifications />
      <Milestones />
      <Contact />
      {isBlogOpen && <BlogModal onClose={() => setIsBlogOpen(false)} />}
    </main>
  );
}