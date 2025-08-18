'use client';
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Building2,
  ExternalLink,
} from "lucide-react";
import Section from "./common/Section";
import Chip from "./common/Chip";

function classNames(...c) {
    return c.filter(Boolean).join(" ");
  }

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const projects = [
    {
      title: "MAS Intimate – Digital Product Center",
      client: "MAS Holdings",
      year: "2025",
      summary:
        "State-of-the-art Digital Product Creation Center for MAS Intimates, featuring a 4K 60P AV over IP system, 3x3 video wall, high-resolution signage, Microsoft Teams Room setup, interactive touch panels, and an intuitive control system—enabling seamless collaboration, innovation, and digital workflow transformation.",
      outcomes: ["Flexible AVoIP", "Central scheduling", "Visitor impact"],
      tags: ["AV over IP", "Digital Signage", "Retail/Experience"],
      image: "/assets/images/meetingRoom1.png",
      gallerySlides: [
        { type: 'youtube', id: 'be6J3gtlmtQ', title: 'MAS Intimate – Walkthrough' },
        { src: "/assets/images/meetingRoom1.png" },
        { src: 'https://i.ibb.co/3YY7v1B/meeting-room-slide-2.jpg' },
        { src: 'https://i.ibb.co/D81Ff6C/meeting-room-slide-3.jpg' },
      ],
    },
    {
      title: "UNICEF Sri Lanka – New HQ Meeting Rooms",
      client: "UNICEF Sri Lanka",
      year: "2025",
      summary:
        "Teams Rooms with ceiling tile microphones, presenter/participant tracking cameras, hearing loop system, and signage displays integrated with facility AV.",
      outcomes: ["Inclusive audio", "Auto‑tracking", "Standards‑aligned"],
      tags: ["Teams Rooms", "Accessibility", "Enterprise"],
      image: 'https://i.ibb.co/Wc63tDx/meeting-room-slide-1.jpg',
    },
  ];

  const tags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();


export default function Projects() {
    const [active, setActive] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const filtered = useMemo(
        () => (active === "All" ? projects : projects.filter((p) => (p.tags || []).includes(active))),
        [active]
      );

      const currentSlides = lightboxIndex > -1 ? (filtered[lightboxIndex].gallerySlides || []) : [];

  return (
    <>
      <Section
        id="projects"
        title="Featured Projects"
        eyebrow="Proof of work"
        actions={
            <div className="flex flex-wrap justify-start gap-2">
            <button
              onClick={() => setActive("All")}
              className={classNames(
                "px-3 py-1.5 rounded-xl text-sm font-medium ring-1 ring-black/10 dark:ring-white/20 whitespace-nowrap",
                active === "All"
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              All
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={classNames(
                  "px-3 py-1.5 rounded-xl text-sm font-medium ring-1 ring-black/10 dark:ring-white/20 whitespace-nowrap",
                  active === t
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((p, index) => (
            <motion.div key={p.title} {...fadeUp}>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className={`w-full aspect-video object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10 ${p.gallerySlides ? 'cursor-pointer' : ''}`}
                    onClick={() => p.gallerySlides && setLightboxIndex(index)}
                  />
                  {p.albumUrl && (
                    <a
                      href={p.albumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-sm hover:scale-110 transition-transform"
                      aria-label="View image album"
                    >
                      <ExternalLink className="h-5 w-5 text-gray-800 dark:text-gray-100" />
                    </a>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Building2 className="h-4 w-4" /> {p.client} <span>•</span> {p.year}
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <Lightbox
        open={lightboxIndex > -1}
        close={() => setLightboxIndex(-1)}
        slides={currentSlides}
        render={{
          slide: ({ slide }) => {
            if (slide.type === 'youtube' && slide.id) {
              return (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="w-full max-w-5xl aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${slide.id}?autoplay=1&rel=0`}
                      title={slide.title || 'YouTube video'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            }
            return undefined;
          },
        }}
      />
    </>
  );
}