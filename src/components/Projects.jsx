'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";
import Section from "./common/Section";
import Chip from "./common/Chip";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Hardcoded data for the three featured projects
const featuredProjects = [
  {
    id: 1,
    title: "MAS Intimate – Digital Product Center",
    slug: "mas-intimate-digital-product-center", // Use the slug from Contentful for the link
    client: "MAS Holdings",
    year: "2025",
    summary: "State-of-the-art Digital Product Creation Center featuring a 4K AV over IP system, 3x3 video wall, and Microsoft Teams Room setup.",
    tags: ["AV over IP", "Digital Signage", "Retail/Experience"],
    imageUrl: "/assets/images/meetingRoom1.png",
  },
  {
    id: 2,
    title: "UNICEF Sri Lanka – New HQ",
    slug: "unicef-sri-lanka-new-hq", // Use the slug from Contentful for the link
    client: "UNICEF Sri Lanka",
    year: "2025",
    summary: "Teams Rooms with ceiling tile microphones, presenter/participant tracking cameras, and a hearing loop system.",
    tags: ["Teams Rooms", "Accessibility", "Enterprise"],
    imageUrl: "https://i.ibb.co/Wc63tDx/meeting-room-slide-1.jpg",
  },
  {
    id: 3,
    title: "IWMI Auditorium – Voice Lift & Tracking",
    slug: "iwmi-auditorium-voice-lift-tracking", // Use the slug from Contentful for the link
    client: "IWMI",
    year: "2025",
    summary: "Voice-lifting design with camera tracking across multiple seat layouts, optimized for lectures and hybrid conferences.",
    tags: ["Auditorium", "AI Tracking", "Education"],
    imageUrl: "https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg",
  }
];

export default function Projects() {
  return (
    <Section id="projects" title="Featured Projects" eyebrow="Proof of work">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {featuredProjects.map((p) => (
          <motion.div key={p.id} {...fadeUp}>
            <div className="flex flex-col gap-4">
              {/* You can link to the Contentful page if the slug matches */}
              <Link href={`/projects/${p.slug}`}>
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full aspect-video object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10 cursor-pointer"
                />
              </Link>
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Building2 className="h-4 w-4" /> {p.client} <span>•</span> {p.year}
                </div>
                <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(p.tags || []).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/projects" className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90">
          View All Projects <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}