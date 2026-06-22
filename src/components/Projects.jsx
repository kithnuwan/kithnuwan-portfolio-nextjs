'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Building2, Play, X, ChevronLeft, ArrowRight, ExternalLink } from 'lucide-react';

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
    color: '#00BFFF',
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

function ProjectCard({ project, index, onOpenSlide }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden group hover:border-[rgba(0,191,255,0.2)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,191,255,0.08)] flex flex-col"
    >
      {/* Image */}
      <button
        onClick={() => onOpenSlide(project.id, 0)}
        className="relative w-full aspect-video overflow-hidden flex-shrink-0"
        aria-label={`Open gallery for ${project.title}`}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[rgba(0,191,255,0.0)] group-hover:bg-[rgba(0,191,255,0.05)] transition-all duration-300" />

        {project.gallerySlides?.[0]?.type === 'youtube' ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[rgba(0,191,255,0.9)] flex items-center justify-center shadow-[0_0_30px_rgba(0,191,255,0.5)] group-hover:scale-110 transition-transform duration-300">
              <Play className="h-6 w-6 text-[#0A192F] ml-1" />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-[#00BFFF]">
              <ExternalLink className="h-3 w-3" /> View Gallery
            </div>
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold bg-[rgba(10,25,47,0.8)] text-[#8892B0] px-2 py-1 rounded-lg">
            {project.year}
          </span>
        </div>
      </button>

      {/* Thumbnails */}
      {project.gallerySlides?.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto px-4 pt-3 pb-0 scrollbar-none">
          {project.gallerySlides.slice(1, 5).map((slide, idx) => (
            <button
              key={idx}
              onClick={() => onOpenSlide(project.id, idx + 1)}
              className="flex-shrink-0 relative group/thumb"
              aria-label={`Thumbnail ${idx + 2}`}
            >
              {slide.type === 'youtube' ? (
                <div className="h-10 w-16 rounded-md bg-[rgba(0,191,255,0.1)] border border-[rgba(0,191,255,0.2)] flex items-center justify-center">
                  <Play className="h-3 w-3 text-[#00BFFF]" />
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
              className="flex-shrink-0 h-10 w-16 rounded-md bg-[rgba(0,191,255,0.08)] border border-[rgba(0,191,255,0.15)] flex items-center justify-center text-[10px] text-[#00BFFF] font-bold"
            >
              +{project.gallerySlides.length - 5}
            </button>
          )}
        </div>
      )}

      {/* Info */}
      <div className="p-5 pt-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] text-[#8892B0] mb-2">
          <Building2 className="h-3 w-3" style={{ color: project.color }} />
          <span>{project.client}</span>
        </div>
        <h3 className="text-[#E6F1FF] font-bold text-sm leading-tight mb-2 flex-1">{project.title}</h3>
        <p className="text-[#8892B0] text-xs leading-relaxed mb-3">{project.summary}</p>
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

export default function Projects() {
  const [lightbox, setLightbox] = useState(null);
  const [videoOpen, setVideoOpen] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

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

  const navigate = (dir) => {
    if (!lightbox) return;
    const project = featuredProjects.find((p) => p.id === lightbox.projectId);
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
          <h2 className="text-4xl sm:text-5xl font-black text-[#E6F1FF]">
            Featured <span className="text-gradient-blue">Projects</span>
          </h2>
          <p className="mt-4 text-[#8892B0] max-w-xl">
            A selection of mission-critical AV and Broadcast projects delivered for government, enterprise, and media clients across Sri Lanka.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpenSlide={openSlide} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/projects" className="btn-outline inline-flex">
            View All Projects <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-[#8892B0] hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <X className="h-5 w-5" /> Close
              </button>
              {(() => {
                const project = featuredProjects.find((p) => p.id === lightbox.projectId);
                const slide = project.gallerySlides[lightbox.index];
                const src = slide?.type === 'image' ? slide.src : '';
                return src ? (
                  <div className="relative">
                    <img src={src} alt="Project image" className="w-full max-h-[80vh] object-contain rounded-xl" />
                    <button
                      onClick={() => navigate(-1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-[#E6F1FF] hover:text-[#00BFFF] transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigate(1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-[#E6F1FF] hover:text-[#00BFFF] transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-[#8892B0] glass px-3 py-1 rounded-full">
                      {lightbox.index + 1} / {project.gallerySlides.length}
                    </div>
                  </div>
                ) : null;
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
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideoOpen(null)}
          >
            <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setVideoOpen(null)}
                className="absolute -top-12 right-0 text-[#8892B0] hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
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
