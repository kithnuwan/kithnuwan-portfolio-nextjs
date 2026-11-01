import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import MeetingRooms from '@/components/MeetingRooms';
import Certifications from '@/components/Certifications';
import TechStack from '@/components/TechStack';
import Experience from '@/components/Experience';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Kithnuwan Silva',
    type: 'profile',
    url: SITE_URL,
    title: 'Kithnuwan Silva | Senior AV & Broadcast Systems Consultant',
    description: 'Senior AV & Broadcast Systems Consultant — 20+ Years | 300+ Projects | Sri Lanka',
    images: [{ url: '/assets/images/hero-portrait.png', width: 1200, height: 630, alt: 'Kithnuwan Silva — Senior AV & Broadcast Systems Consultant' }],
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <MeetingRooms />
      <Certifications />
      <TechStack />
      <Experience />
      <FAQ />
      <Contact />
    </main>
  );
}
