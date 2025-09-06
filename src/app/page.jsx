// Removed 'createClient' import as it's no longer needed here
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
import { Analytics } from "@vercel/analytics/next";

// Removed the getFeaturedProjects function

export default function Home() {
  // Removed the call to fetch projects
  
  return (
    <main>
      <Hero />
      <About />
      <Services />
      {/* The Projects component no longer needs a prop */}
      <Projects />
      <Solutions />
      <LegacyProjects />
      <Expertise />
      <Experience />
      <Qualifications />
      <Milestones />
      <Contact />
    </main>
  );
}