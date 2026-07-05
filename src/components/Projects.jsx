'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Building2, Play, X, ChevronLeft, ArrowRight, ExternalLink, ZoomIn } from 'lucide-react';
import { LaserReveal } from '@/components/ui/LaserReveal';
import { GeometricHover } from '@/components/ui/GeometricHover';

const EASE = [0.4, 0, 0.2, 1];

const featuredProjects = [
  {
    id: 1,
    title: 'MAS Intimate – Digital Product Center',
    client: 'MAS Holdings',
    year: '2025',
    summary:
      'State-of-the-art Digital Product Creation Center featuring a 4K AV over IP system, 3x3 video wall, and Microsoft Teams Room setup.',
    tags: ['AV over IP', 'Digital Signage', 'Teams Room', 'Video Wall'],
    imageUrl: '/assets/images/meetingRoom1.png',
    color: 'var(--accent)',
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
    title: 'Full HD Multilingual Broadcasting System',
    client: 'Parliament of Sri Lanka',
    year: '2017',
    summary:
      'LKR 237M Full HD production upgrade with 6× SONY HXC-100RF on Vinten robotics, Grass Valley Karrera switcher, 64×64 HD-SDI routing for multilingual broadcast.',
    tags: ['Broadcast', 'Robotics', 'Multilingual', 'Grass Valley'],
    imageUrl: 'https://i.ibb.co/sv9RrjhY/11.jpg',
    color: '#FFD700',
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
    ],
  },
  {
    id: 3,
    title: 'IWMI Auditorium – Voice Lift & Tracking',
    client: 'IWMI',
    year: '2025',
    summary:
      'Voice-lifting design with AI camera tracking across multiple seat layouts, optimized for lectures and hybrid conferences.',
    tags: ['Auditorium', 'AI Tracking', 'Voice Lift', 'Hybrid'],
    imageUrl: 'https://i.ibb.co/ks3CPJ6K/20250721-121411-min.jpg',
    color: '#00E5FF',
    gallerySlides: [
      { type: 'image', src: 'https://i.ibb.co/MFX5cHC/20250721-105618-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/ks3CPJ6K/20250721-121411-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/3mBZJR7Q/20250721-121420-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/BHnF4K8G/20250721-121454-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/vxk0hz2j/20250721-121516-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/1f3fxm1Q/20250721-121538-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/CKFw02Wc/20250721-121726-min.jpg' },
      { type: 'image', src: 'https://i.ibb.co/yFc4XxZD/20250721-121753-min.jpg' },
    ],
  },
];

/* ── Project Card ─────────────────────────────────────────────────── */
function ProjectCard({ project, index, onExpand, onOpenSlide }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const handleImgHover = useCallback((playing) => {
    if (!imgRef.current) return;
    // Subtle brightness on hover as a micro-interaction
    imgRef.current.style.filter = playing ? 'brightness(1.08) saturate(1.1)' : '';
  }, []);

  const hasVideo = project.gallerySlides?.[0]?.type === 'youtube';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="project-card glass rounded-2xl overflow-hidden group hover:border-[var(--border)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,191,255,0.08)] flex flex-col"
    >
      {/* Image / hero */}
      <div
        className="relative w-full aspect-video overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={() => onExpand(project)}
        onMouseEnter={() => handleImgHover(true)}
        onMouseLeave={() => handleImgHover(false)}
        role="button"
        aria-label={`Expand ${project.title}`}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onExpand(project)}
      >
        {/* Shared-element image — layoutId used for expansion animation */}
        <motion.img
          layoutId={`proj-img-${project.id}`}
          ref={imgRef}
          src={project.imageUrl}
          alt={project.title}
          className="project-card-img w-full h-full object-cover"
          style={{ transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1), filter 300ms ease' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Hover expand cue */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {hasVideo ? (
            <div className="w-14 h-14 rounded-full bg-[rgba(0,191,255,0.9)] flex items-center justify-center shadow-[0_0_30px_rgba(0,191,255,0.5)]">
              <Play className="h-6 w-6 text-[var(--accent-contrast)] ml-1" />
            </div>
          ) : (
            <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-[var(--accent)]">
              <ZoomIn className="h-4 w-4" /> View Project
            </div>
          )}
        </div>

        {/* Year badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold bg-[rgba(10,25,47,0.8)] text-[var(--text-secondary)] px-2 py-1 rounded-lg">
            {project.year}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {project.gallerySlides?.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto px-4 pt-3 pb-0 scrollbar-none">
          {project.gallerySlides.slice(1, 5).map((slide, idx) => (
            <button
              key={idx}
              onClick={() => onOpenSlide(project.id, idx + 1)}
              className="flex-shrink-0 group/thumb"
              aria-label={`Thumbnail ${idx + 2}`}
            >
              {slide.type === 'youtube' ? (
                <div className="h-10 w-16 rounded-md bg-[rgba(0,191,255,0.1)] border border-[var(--border)] flex items-center justify-center">
                  <Play className="h-3 w-3 text-[var(--accent)]" />
                </div>
              ) : (
                <img
                  src={slide.src}
                  alt=""
                  className="h-10 w-16 object-cover rounded-md border border-[rgba(255,255,255,0.06)] group-hover/thumb:border-[rgba(0,191,255,0.4)] transition-colors"
                />
              )}
            </button>
          ))}
          {project.gallerySlides.length > 5 && (
            <button
              onClick={() => onOpenSlide(project.id, 5)}
              className="flex-shrink-0 h-10 w-16 rounded-md bg-[var(--accent-subtle)] border border-[var(--border)] flex items-center justify-center text-[10px] text-[var(--accent)] font-bold"
            >
              +{project.gallerySlides.length - 5}
            </button>
          )}
        </div>
      )}

      {/* Info */}
      <div className="p-5 pt-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] mb-2">
          <Building2 className="h-3 w-3" style={{ color: project.color }} />
          <span>{project.client}</span>
        </div>
        <h3 className="text-[var(--text-primary)] font-bold text-sm leading-tight mb-2 flex-1">{project.title}</h3>
        <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-3">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md"
              style={{ color: project.color, backgroundColor: `${project.color}12`, border: `1px solid ${project.color}20` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Expanded Project Overlay ─────────────────────────────────────── */
function ProjectOverlay({ project, onClose, onOpenGallery }) {
  const imageSlides = project.gallerySlides?.filter(s => s.type === 'image') ?? [];
  const videoSlide = project.gallerySlides?.find(s => s.type === 'youtube');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-[#060F1E]/95 backdrop-blur-lg overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="max-w-5xl mx-auto px-4 py-8 sm:py-16 min-h-screen flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors"
          >
            <X className="h-5 w-5" /> Close
          </button>
        </div>

        {/* Hero image — shared element from card */}
        <motion.div
          layoutId={`proj-img-${project.id}`}
          className="w-full aspect-video rounded-2xl overflow-hidden flex-shrink-0"
          transition={{ duration: 0.45, ease: EASE }}
          style={{ cursor: imageSlides.length > 0 ? 'zoom-in' : 'default' }}
          onClick={() => imageSlides.length > 0 && onOpenGallery(0)}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content fades in after image lands */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
          className="mt-8 flex-1"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
                <Building2 className="h-4 w-4" style={{ color: project.color }} />
                {project.client} · {project.year}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">{project.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ color: project.color, backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-10 max-w-3xl">{project.summary}</p>

          {/* Action row */}
          <div className="flex flex-wrap gap-3 mb-10">
            {videoSlide && (
              <button
                onClick={() => onOpenGallery('video')}
                className="btn-primary"
              >
                <Play className="h-4 w-4" /> Watch Walkthrough
              </button>
            )}
            {imageSlides.length > 0 && (
              <button onClick={() => onOpenGallery(0)} className="btn-outline">
                <ExternalLink className="h-4 w-4" /> View Gallery
              </button>
            )}
          </div>

          {/* Gallery strip */}
          {imageSlides.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {imageSlides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => onOpenGallery(i)}
                  className="aspect-video rounded-lg overflow-hidden group/g"
                  aria-label={`Gallery image ${i + 1}`}
                >
                  <img
                    src={slide.src}
                    alt=""
                    className="w-full h-full object-cover group-hover/g:scale-110 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function Projects() {
  const [expanded, setExpanded] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [videoOpen, setVideoOpen] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const openSlide = (projectId, index) => {
    const project = featuredProjects.find(p => p.id === projectId);
    const slide = project?.gallerySlides?.[index];
    if (!slide) return;
    if (slide.type === 'youtube') {
      setVideoOpen({ videoId: slide.id, title: slide.title || project.title });
    } else {
      setLightbox({ projectId, index });
    }
  };

  const openOverlayGallery = (indexOrMode) => {
    if (!expanded) return;
    if (indexOrMode === 'video') {
      const v = expanded.gallerySlides.find(s => s.type === 'youtube');
      if (v) setVideoOpen({ videoId: v.id, title: v.title || expanded.title });
      return;
    }
    const imageSlides = expanded.gallerySlides.filter(s => s.type === 'image');
    const realIdx = expanded.gallerySlides.indexOf(imageSlides[indexOrMode]);
    setLightbox({ projectId: expanded.id, index: realIdx >= 0 ? realIdx : 0 });
  };

  const navigate = (dir) => {
    if (!lightbox) return;
    const project = featuredProjects.find(p => p.id === lightbox.projectId);
    const slides = project.gallerySlides;
    let next = (lightbox.index + dir + slides.length) % slides.length;
    while (slides[next]?.type === 'youtube') {
      next = (next + dir + slides.length) % slides.length;
      if (next === lightbox.index) break;
    }
    setLightbox({ projectId: lightbox.projectId, index: next });
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[rgba(0,191,255,0.03)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow mb-3">Proof of Work</div>
          <LaserReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)]">
              Featured <span className="text-gradient-blue">Projects</span>
            </h2>
          </LaserReveal>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
            A selection of mission-critical AV and Broadcast projects delivered for government, enterprise, and media clients across Sri Lanka.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onExpand={setExpanded}
              onOpenSlide={openSlide}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <GeometricHover>
            <Link href="/projects" className="btn-outline inline-flex">
              View All Projects <ChevronRight className="h-4 w-4" />
            </Link>
          </GeometricHover>
        </motion.div>
      </div>

      {/* ── Expanded overlay (shared element) ─────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <ProjectOverlay
            key="expanded"
            project={expanded}
            onClose={() => setExpanded(null)}
            onOpenGallery={openOverlayGallery}
          />
        )}
      </AnimatePresence>

      {/* ── Image lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <div className="relative w-full max-w-6xl" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-[var(--text-secondary)] hover:text-white flex items-center gap-2 text-sm"
              >
                <X className="h-5 w-5" /> Close
              </button>
              {(() => {
                const project = featuredProjects.find(p => p.id === lightbox.projectId);
                const slide = project?.gallerySlides[lightbox.index];
                return slide?.type === 'image' ? (
                  <div className="relative">
                    <img src={slide.src} alt="Project image" className="w-full max-h-[80vh] object-contain rounded-xl" />
                    <button onClick={() => navigate(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)]">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={() => navigate(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)]">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-[var(--text-secondary)] glass px-3 py-1 rounded-full">
                      {lightbox.index + 1} / {project.gallerySlides.length}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── YouTube modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideoOpen(null)}
          >
            <div className="relative w-full max-w-5xl aspect-video" onClick={e => e.stopPropagation()}>
              <button onClick={() => setVideoOpen(null)} className="absolute -top-12 right-0 text-[var(--text-secondary)] hover:text-white flex items-center gap-2 text-sm">
                <X className="h-5 w-5" /> Close
              </button>
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoOpen.videoId}?autoplay=1&rel=0`}
                title={videoOpen.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
