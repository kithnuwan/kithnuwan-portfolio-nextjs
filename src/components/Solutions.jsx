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
    image: 'https://i.postimg.cc/DZvL9qk5/20241025-103528-min.jpg',
    gallerySlides: [
      { type: 'youtube', id: 'fbR-jzGc8LM', title: 'Boardroom Walkthrough' },
      { type: 'image', src: 'https://i.postimg.cc/pXpYVY96/20230808-150930-min.jpg' },
      { type: 'image', src: 'https://i.postimg.cc/Cx8GkhsC/20230808-151146-min.jpg' },
      { type: 'image', src: 'https://i.postimg.cc/Y2XzwySF/20230819-172532-min.jpg' },
      { type: 'image', src: 'https://i.postimg.cc/J4v3sDZ4/20230819-172917-min.jpg' },
      { type: 'image', src: 'https://i.postimg.cc/zf1nksxs/20241025-103142-min.jpg' },
      { type: 'image', src: 'https://i.postimg.cc/QMkcYfPH/20241025-103452-1-min.jpg' },
      { type: 'image', src: 'https://i.postimg.cc/DZvL9qk5/20241025-103528-min.jpg' },
           
    ],
  },
  {
    title: 'Infor Sri Lanka – Meeting Room Solution',
    summary: 'Implemented a state-of-the-art solution with 4 meeting rooms, each equipped with Neat Bar Pro video systems and Samsung QMC Series displays, delivering seamless hybrid collaboration and crystal-clear visuals.',
    image: 'https://i.postimg.cc/mrNRXC2V/20250409-104107.jpg',
    gallerySlides: [
    { type: 'image', src: 'https://i.postimg.cc/mrNRXC2V/20250409-104107.jpg' },
    { type: 'image', src: 'https://i.postimg.cc/G2XRrRDy/20250409-104245.jpg' },
    { type: 'image', src: 'https://i.postimg.cc/8CVNmtDj/20250409-104616.jpg' },
    { type: 'image', src: 'https://i.postimg.cc/j5xTG2DT/20250409-104638.jpg' },
    { type: 'image', src: 'https://i.postimg.cc/qqgTvFcZ/20250409-104654.jpg' }
    ],
  },
  {
    title: 'David Pieris Motor Company (Pvt) Ltd – Meeting Room Solution',
    summary: 'Delivered a state-of-the-art Microsoft Teams Room using the Yealink MVC860, complete with an AI speaker-tracking camera, intuitive touch-panel control, full AV distribution, and a motorised retractable display dedicated to the chairman, creating a sleek, high-impact hybrid meeting environment..',
    image: 'https://i.ibb.co/FbJrZjTB/Whats-App-Image-2025-07-08-at-11-40-55-d54a4c84.jpg',
    gallerySlides: [
    { type: 'image', src: 'https://i.ibb.co/Z12sxJCm/Whats-App-Image-2025-07-08-at-11-40-54-3043e55c.jpg' },
    { type: 'image', src: 'https://i.ibb.co/FbJrZjTB/Whats-App-Image-2025-07-08-at-11-40-55-d54a4c84.jpg' },
    { type: 'image', src: 'https://i.ibb.co/fVMGR0cP/Whats-App-Image-2025-07-08-at-11-40-55-f40b4164.jpg' },
    { type: 'image', src: 'https://i.ibb.co/r2M5CBgL/Whats-App-Image-2025-07-08-at-11-40-56-5b9070ee.jpg' },
    { type: 'image', src: 'https://i.ibb.co/p6RSNQ6q/Whats-App-Image-2025-07-08-at-11-40-56-281a8322.jpg' },
    { type: 'image', src: 'https://i.ibb.co/xq2pgFW4/Whats-App-Image-2025-07-08-at-11-40-56-a5219e9a.jpg' }

    ],
  },
  {
    title: 'MAS Intimates – CEO’s Meeting Room',
    summary: 'Implemented a modern Microsoft Teams Room solution using the Yealink MVC860, featuring the UVC86 AI speaker tracking camera, VCM36-W wireless microphones, Mtouch touch controller, and a BYOD wireless presentation system. This state-of-the-art setup delivers seamless collaboration, crystal-clear audio/video, and a simplified user experience for executive meetings.',
    image: 'https://i.ibb.co/qY60QFkT/20231003-230344.jpg',
    gallerySlides: [
      { type: 'youtube', id: 'BDRD1HWr6d8', title: 'Boardroom Walkthrough' },
      { type: 'image', src: 'https://i.ibb.co/qY60QFkT/20231003-230344.jpg' },
      { type: 'image', src: 'https://i.ibb.co/1tJJ6x0L/20231003-230351.jpg' },
      { type: 'image', src: 'https://i.ibb.co/TV1NXPq/20231003-230357.jpg' }

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
