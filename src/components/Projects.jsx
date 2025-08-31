'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Building2, Play, X, ChevronLeft, ChevronRight as ArrowRight } from 'lucide-react';
import Section from './common/Section';
import Chip from './common/Chip';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const featuredProjects = [
  {
    id: 1,
    title: 'MAS Intimate – Digital Product Center',
    client: 'MAS Holdings',
    year: '2025',
    summary:
      'State-of-the-art Digital Product Creation Center featuring a 4K AV over IP system, 3x3 video wall, and Microsoft Teams Room setup.',
    tags: ['AV over IP', 'Digital Signage', 'Retail/Experience'],
    imageUrl: '/assets/images/meetingRoom1.png',
    gallerySlides: [
      { type: 'youtube', id: 'be6J3gtlmtQ', title: 'MAS Intimate – Walkthrough' },
      { type: 'image', src: '/assets/images/meetingRoom1.png' },
      { type: 'image', src: 'https://i.ibb.co/V0J118NZ/20250120-072029-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/fz8n0Cw6/20250120-072046-1-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/fVDK69sP/20250120-072115-min.jpg' },
    ],
  },
  {
    id: 2,
    title: 'Full HD Multilingual Broadcasting System – Parliament of Sri Lanka',
    client: 'Parliament of Sri Lanka',
    year: '2017',
    summary:
      'LKR 237M (USD 1.6M) Full HD production upgrade with 6× SONY HXC-100RF on Vinten FHR-35 robotics, Grass Valley Karrera switcher, GV 64×64 HD-SDI & 64×64 AES routing and glue for multilingual broadcast.',
    tags: ['Broadcast', 'Robotics', 'Multilingual'],
    imageUrl: 'https://i.ibb.co/sv9RrjhY/11.jpg',
    gallerySlides: [
          { type: 'image', src: 'https://i.ibb.co/sv9RrjhY/11.jpg' },
          { type: 'image', src: 'https://i.ibb.co/JjTQyVMW/2.jpg' },
          { type: 'image', src: 'https://i.ibb.co/fzZFhPM0/1.jpg' },
          { type: 'image', src: 'https://i.ibb.co/Rp0GWtsY/3.jpg' },
          { type: 'image', src: 'https://i.ibb.co/BVSySVkW/4.jpg' },
          { type: 'image', src: 'https://i.ibb.co/fYz0k4PT/5.jpg' },
          { type: 'image', src: 'https://i.ibb.co/20QsdqPX/6.jpg' },
          { type: 'image', src: 'https://i.ibb.co/VWsCFpxb/7.jpg' },
          { type: 'image', src: 'https://i.ibb.co/pj9CWnKq/8.jpg' },
          { type: 'image', src: 'https://i.ibb.co/pr01c0wr/9.jpg' },
          { type: 'image', src: 'https://i.ibb.co/KjDwMdjP/10.jpg' },
          { type: 'image', src: 'https://i.ibb.co/p6JkZZYy/12.jpg' },
          { type: 'image', src: 'https://i.ibb.co/QvjvjD8Y/13.jpg' },
          { type: 'image', src: 'https://i.ibb.co/sv1SvwdV/14.jpg' },
          { type: 'image', src: 'https://i.ibb.co/fzmXKr61/15.jpg' },
          { type: 'image', src: 'https://i.ibb.co/kVm0Ycsw/16.jpg' }
    ],
  },
  {
    id: 3,
    title: 'IWMI Auditorium – Voice Lift & Tracking',
    client: 'IWMI',
    year: '2025',
    summary:
      'Voice-lifting design with camera tracking across multiple seat layouts, optimized for lectures and hybrid conferences.',
    tags: ['Auditorium', 'AI Tracking', 'Education'],
    imageUrl: 'https://i.ibb.co/ks3CPJ6K/20250721-121411-min.jpg',
    gallerySlides: [
      { type: 'image', src: 'https://i.ibb.co/MFX5cHC/20250721-105618-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/ks3CPJ6K/20250721-121411-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/3mBZJR7Q/20250721-121420-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/BHnF4K8G/20250721-121454-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/vxk0hz2j/20250721-121516-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/1f3fxm1Q/20250721-121538-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/CKFw02Wc/20250721-121726-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/yFc4XxZD/20250721-121753-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/B5PTf9Ws/Screenshot-2025-08-31-221030.png' },
    ],
  },
];

export default function Projects() {
  const [lightbox, setLightbox] = useState(null);
  const [videoOpen, setVideoOpen] = useState(null);

  const openSlide = (projectId, index) => {
    const project = featuredProjects.find((p) => p.id === projectId);
    const slide = project?.gallerySlides?.[index];
    if (!slide) return;
    if (slide.type === 'youtube') {
      setVideoOpen({ videoId: slide.id, title: slide.title || project.title });
    } else {
      setLightbox({ projectId, index });
    }
  };

  const closeLightbox = () => setLightbox(null);

  const showPrev = () => {
    if (!lightbox) return;
    const project = featuredProjects.find((p) => p.id === lightbox.projectId);
    const slides = project.gallerySlides;
    let nextIndex = (lightbox.index - 1 + slides.length) % slides.length;
    while (slides[nextIndex]?.type === 'youtube') {
      nextIndex = (nextIndex - 1 + slides.length) % slides.length;
      if (nextIndex === lightbox.index) break;
    }
    setLightbox({ projectId: lightbox.projectId, index: nextIndex });
  };

  const showNext = () => {
    if (!lightbox) return;
    const project = featuredProjects.find((p) => p.id === lightbox.projectId);
    const slides = project.gallerySlides;
    let nextIndex = (lightbox.index + 1) % slides.length;
    while (slides[nextIndex]?.type === 'youtube') {
      nextIndex = (nextIndex + 1) % slides.length;
      if (nextIndex === lightbox.index) break;
    }
    setLightbox({ projectId: lightbox.projectId, index: nextIndex });
  };

  return (
    <Section id="projects" title="Featured Projects" eyebrow="Proof of work">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {featuredProjects.map((p) => (
          <motion.div key={p.id} {...fadeUp}>
            <div className="flex flex-col gap-4">
              {/* Main image / video trigger */}
              <button
                onClick={() => openSlide(p.id, 0)}
                className="relative w-full aspect-video overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 group"
                aria-label={`Open gallery for ${p.title}`}
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {p.gallerySlides?.[0]?.type === 'youtube' && (
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-black/60 text-white px-3 py-2 text-xs font-semibold opacity-90 group-hover:bg-black/70">
                      <Play className="h-4 w-4" /> Watch walkthrough
                    </span>
                  </span>
                )}
              </button>

              {/* Filmstrip-style gallery thumbnails directly under main image */}
              {Array.isArray(p.gallerySlides) && p.gallerySlides.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {p.gallerySlides.map((slide, idx) => (
                    idx > 0 && (
                      <button
                        key={idx}
                        onClick={() => openSlide(p.id, idx)}
                        className="group relative flex-shrink-0"
                        aria-label={`Open slide ${idx + 1} of ${p.title}`}
                      >
                        {slide.type === 'youtube' ? (
                          <div className="h-16 w-24 rounded-md ring-1 ring-black/5 dark:ring-white/10 bg-black/60 grid place-items-center">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <img
                            src={slide.src}
                            alt={`${p.title} – image ${idx + 1}`}
                            className="h-16 w-24 object-cover rounded-md ring-1 ring-black/5 dark:ring-white/10"
                          />
                        )}
                        <span className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent group-hover:ring-gray-900/60 dark:group-hover:ring-white/70"></span>
                      </button>
                    )
                  ))}
                </div>
              )}

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
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90"
        >
          View All Projects <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 text-white/80 hover:text-white"
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>
              {(() => {
                const project = featuredProjects.find((p) => p.id === lightbox.projectId);
                const slides = project.gallerySlides;
                const current = slides[lightbox.index];
                const src = current?.type === 'image' ? current.src : (slides.find((s) => s.type === 'image')?.src || '');
                return (
                  <div className="relative">
                    {src && (
                      <img src={src} alt="Expanded project image" className="w-full max-h-[80vh] object-contain rounded-xl" />
                    )}
                    <button
                      onClick={showPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={showNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                      aria-label="Next image"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </button>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(null)}
          >
            <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setVideoOpen(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </button>
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoOpen.videoId}?autoplay=1&rel=0`}
                title={videoOpen.title || 'Project walkthrough'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
