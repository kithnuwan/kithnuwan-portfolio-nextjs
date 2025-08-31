'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from './common/Section';
import Reveal from './common/Reveal';
import Card from './common/Card';

const solutions = [
  {
    title: 'Commercial Bank HQ Meeting Rooms (4rooms)',
    summary: 'Ceiling array mics, tracking camera, scheduler, and BYOD wireless sharing.',
    image: 'https://i.ibb.co/Wc63tDx/meeting-room-slide-1.jpg',
    gallerySlides: [
      { type: 'youtube', id: 'fbR-jzGc8LM', title: 'Boardroom Walkthrough' },
      { type: 'image', src: 'https://i.ibb.co/Wc63tDx/meeting-room-slide-1.jpg' },
      { type: 'image', src: 'https://i.ibb.co/3YY7v1B/meeting-room-slide-2.jpg' },
     
    ],
  },
  {
    title: 'BYOD Wireless Conferencing',
    summary: 'AirPlay/Miracast casting with USB device access to in-room camera and audio for Zoom/Meet/Teams.',
    image: 'https://i.ibb.co/3YY7v1B/meeting-room-slide-2.jpg',
    gallerySlides: [
      { type: 'image', src: 'https://i.ibb.co/3YY7v1B/meeting-room-slide-2.jpg' },
      { type: 'image', src: 'https://i.ibb.co/D81Ff6C/meeting-room-slide-3.jpg' },
      { type: 'image', src: 'https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg' },
    ],
  },
  {
    title: 'Hybrid Boardroom — Presenter/Participant Tracking',
    summary: 'Auto-framing cameras with DSP echo cancellation and table/ceiling mic mix for natural conversation.',
    image: 'https://i.ibb.co/D81Ff6C/meeting-room-slide-3.jpg',
    gallerySlides: [
      { type: 'youtube', id: 'be6J3gtlmtQ', title: 'Boardroom Walkthrough' },
      { type: 'image', src: 'https://i.ibb.co/D81Ff6C/meeting-room-slide-3.jpg' },
      { type: 'image', src: 'https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg' },
    ],
  },
  {
    title: 'Auditorium — Voice Lift & Recording',
    summary: 'Distributed speakers, assistive listening, and lecture capture with streaming.',
    image: 'https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg',
    gallerySlides: [
      { type: 'image', src: 'https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg' },
    ],
  },
];

export default function Solutions() {
  const [lightbox, setLightbox] = useState(null); // {solutionIdx, index}
  const [videoOpen, setVideoOpen] = useState(null); // {videoId, title}

  const openSlide = (solutionIdx, index) => {
    const slide = solutions[solutionIdx].gallerySlides[index];
    if (!slide) return;
    if (slide.type === 'youtube') {
      setVideoOpen({ videoId: slide.id, title: slide.title || solutions[solutionIdx].title });
    } else {
      setLightbox({ solutionIdx, index });
    }
  };

  const closeLightbox = () => setLightbox(null);

  const showPrev = () => {
    if (!lightbox) return;
    const slides = solutions[lightbox.solutionIdx].gallerySlides;
    let next = (lightbox.index - 1 + slides.length) % slides.length;
    // skip over youtube slides inside the image-only lightbox
    while (slides[next]?.type === 'youtube') {
      next = (next - 1 + slides.length) % slides.length;
      if (next === lightbox.index) break;
    }
    setLightbox({ solutionIdx: lightbox.solutionIdx, index: next });
  };

  const showNext = () => {
    if (!lightbox) return;
    const slides = solutions[lightbox.solutionIdx].gallerySlides;
    let next = (lightbox.index + 1) % slides.length;
    while (slides[next]?.type === 'youtube') {
      next = (next + 1) % slides.length;
      if (next === lightbox.index) break;
    }
    setLightbox({ solutionIdx: lightbox.solutionIdx, index: next });
  };

  return (
    <Section id="solutions" title="Meeting Room Solutions" eyebrow="From the deck">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {solutions.map((s, i) => (
          <Reveal key={s.title}>
            <Card>
              <div className="space-y-3">
                {/* Main image / video trigger */}
                <button
                  onClick={() => openSlide(i, 0)}
                  className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 group"
                  aria-label={`Open gallery for ${s.title}`}
                >
                  <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
                  {s.gallerySlides?.[0]?.type === 'youtube' && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-black/60 text-white px-3 py-2 text-xs font-semibold opacity-90 group-hover:bg-black/70">
                        <Play className="h-4 w-4" /> Watch walkthrough
                      </span>
                    </span>
                  )}
                </button>

                {/* Filmstrip thumbnails */}
                {s.gallerySlides?.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {s.gallerySlides.map((slide, idx) =>
                      idx > 0 ? (
                        <button
                          key={idx}
                          onClick={() => openSlide(i, idx)}
                          className="group relative flex-shrink-0"
                          aria-label={`Open slide ${idx + 1} of ${s.title}`}
                        >
                          {slide.type === 'youtube' ? (
                            <div className="h-16 w-24 rounded-md bg-black/60 ring-1 ring-black/5 dark:ring-white/10 grid place-items-center">
                              <Play className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <img
                              src={slide.src}
                              alt={`${s.title} – ${idx}`}
                              className="h-16 w-24 object-cover rounded-md ring-1 ring-black/5 dark:ring-white/10"
                            />
                          )}
                        </button>
                      ) : null
                    )}
                  </div>
                )}

                {/* Text */}
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.title}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{s.summary}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* View More Projects link */}
      <div className="mt-12 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90"
        >
          View More Projects
        </Link>
      </div>

      {/* Lightbox (images only) */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
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
                const slides = solutions[lightbox.solutionIdx].gallerySlides;
                const slide = slides[lightbox.index];
                const src = slide?.type === 'image' ? slide.src : (slides.find((s) => s.type === 'image')?.src || '');
                return (
                  <div className="relative">
                    {src && (
                      <img src={src} alt="Expanded solution image" className="w-full max-h-[80vh] object-contain rounded-xl" />
                    )}
                    <button
                      onClick={showPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={showNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
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
                className="h-full w-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoOpen.videoId}?autoplay=1&rel=0`}
                title={videoOpen.title || 'Solution walkthrough'}
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
