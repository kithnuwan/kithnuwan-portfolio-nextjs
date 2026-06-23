'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Users, Wifi, ChevronLeft, ChevronRight, X, ArrowRight, Play } from 'lucide-react';
import { LaserReveal } from '@/components/ui/LaserReveal';

const rooms = [
  {
    id: 1,
    title: "People's Bank Tower – Meeting Room AV",
    client: "People's Bank",
    capacity: '19 Rooms incl. Boardroom',
    system: 'Yealink + Horizon + DSPPA',
    features: ['Paperless Conference', 'Motorized LCD Monitors', 'Video Conferencing', 'Centralized Room Control'],
    images: [
      'https://i.ibb.co/YB7dhbS3/Whats-App-Image-2026-02-24-at-3-57-09-PM-3.jpg',
      'https://i.ibb.co/HfXgQ10V/Whats-App-Image-2026-02-24-at-3-57-09-PM-2.jpg',
    ],
    video: 'https://youtube.com/shorts/gMEkoTwvSf4?si=9h7LG4hMPQmyjHyB',
    description: 'Integrated AV solution for 19 meeting rooms including the Main Boardroom. Features a modern paperless conference system with motorized LCD monitors, professional video conferencing, digital audio processing, and centralized room control.',
    color: '#00BFFF',
  },
  {
    id: 2,
    title: 'Unilever Sri Lanka – Enterprise Meeting Rooms',
    client: 'Unilever Sri Lanka',
    capacity: '23 Teams Rooms',
    system: 'Lenovo MTR + Q-SYS',
    features: ['Lenovo MTR', 'Hudly Cameras', 'Poly Room Scheduler', 'Q-SYS Audio', 'Samsung LFD Displays'],
    images: [
      'https://i.ibb.co/Vc4H5GBJ/20260620-122929.jpg',
      'https://i.ibb.co/5g9xMp0X/20260620-123518.jpg',
      'https://i.ibb.co/5gtfRfsN/20260620-123541.jpg',
      'https://i.ibb.co/9H2KBPvm/20260620-123644.jpg',
      'https://i.ibb.co/zh6GsVhw/20260620-123720.jpg',
    ],
    description: 'Enterprise-wide Microsoft Teams Room rollout across 23 meeting rooms. Built on Lenovo MTR hardware with Hudly cameras, Poly room schedulers, Q-SYS audio processing, and Samsung large-format displays.',
    color: '#00E5FF',
  },
  {
    id: 3,
    title: 'MAS Intimate HQ – Ratmalana',
    client: 'MAS Holdings',
    capacity: '10 Meeting Rooms',
    system: 'Yealink MVC860 + Kramer',
    features: ['Yealink MVC860', 'Kramer Control', 'Microsoft Teams', 'State-of-the-Art AV'],
    images: [
      'https://i.ibb.co/qY60QFkT/20231003-230344.jpg',
      'https://i.ibb.co/1tJJ6x0L/20231003-230351.jpg',
      'https://i.ibb.co/TV1NXPq/20231003-230357.jpg',
    ],
    description: '10 state-of-the-art Microsoft Teams meeting rooms at MAS Intimate HQ, Ratmalana, powered by Yealink MVC860 collaboration bars and Kramer Control room automation.',
    color: '#7B61FF',
  },
  {
    id: 4,
    title: 'DPMC Head Office – Main Boardroom',
    client: 'David Pieris Motor Company',
    capacity: 'Executive Boardroom',
    system: 'Yealink MTR',
    features: ['Yealink MTR Solution', 'Microsoft Teams', 'Executive AV', 'State-of-the-Art'],
    images: [
      'https://i.ibb.co/Z12sxJCm/Whats-App-Image-2025-07-08-at-11-40-54-3043e55c.jpg',
      'https://i.ibb.co/FbJrZjTB/Whats-App-Image-2025-07-08-at-11-40-55-d54a4c84.jpg',
      'https://i.ibb.co/fVMGR0cP/Whats-App-Image-2025-07-08-at-11-40-55-f40b4164.jpg',
      'https://i.ibb.co/r2M5CBgL/Whats-App-Image-2025-07-08-at-11-40-56-5b9070ee.jpg',
      'https://i.ibb.co/p6RSNQ6q/Whats-App-Image-2025-07-08-at-11-40-56-281a8322.jpg',
      'https://i.ibb.co/xq2pgFW4/Whats-App-Image-2025-07-08-at-11-40-56-a5219e9a.jpg',
    ],
    description: 'State-of-the-art main boardroom AV solution at DPMC Head Office, featuring a complete Yealink Microsoft Teams Room system for executive meetings and presentations.',
    color: '#FFD700',
  },
  {
    id: 5,
    title: 'UNICEF – Child-Friendly Court Solution',
    client: 'UNICEF / Sri Lanka Courts',
    capacity: '48 High Courts',
    system: 'Yealink + Restmoment',
    features: ['Remote Child Testimony', 'Child-Friendly Rooms', 'Forensic Team Integration', 'High Court Network'],
    images: [
      'https://i.ibb.co/nt7Tnby/20260612-143828.jpg',
      'https://i.ibb.co/C5VpQcSy/20260612-144431.jpg',
      'https://i.ibb.co/Z6ZmL85n/20260612-144522.jpg',
    ],
    description: 'Landmark child protection project enabling children to attend court sessions remotely from dedicated child-friendly rooms without entering the courtroom. Doctors and forensic teams can also testify remotely. Deployed across 48 high courts using Yealink and Restmoment solutions.',
    color: '#FF6B6B',
  },
  {
    id: 6,
    title: 'IWMI – Multipurpose Meeting Room',
    client: 'IWMI',
    capacity: 'Board & Training Room',
    system: 'Q-SYS Ecosystem',
    features: ['Q-SYS Core', 'Sennheiser TCC2', 'AV-over-IP', 'Multi-Camera Tracking', 'Voice Lift DSP'],
    images: [
      'https://i.ibb.co/MFX5cHC/20250721-105618-min.jpg',
      'https://i.ibb.co/ks3CPJ6K/20250721-121411-min.jpg',
      'https://i.ibb.co/3mBZJR7Q/20250721-121420-min.jpg',
      'https://i.ibb.co/BHnF4K8G/20250721-121454-min.jpg',
      'https://i.ibb.co/vxk0hz2j/20250721-121516-min.jpg',
      'https://i.ibb.co/1f3fxm1Q/20250721-121538-min.jpg',
      'https://i.ibb.co/CKFw02Wc/20250721-121726-min.jpg',
      'https://i.ibb.co/yFc4XxZD/20250721-121753-min.jpg',
      'https://i.ibb.co/B5PTf9Ws/Screenshot-2025-08-31-221030.png',
    ],
    description: 'State-of-the-art multipurpose meeting room built around the Q-SYS ecosystem supporting board meetings, training sessions, and hybrid collaboration. Features Q-SYS Core centralised AV management, Sennheiser TeamConnect Ceiling 2 microphones with voice-lift, AV-over-IP distribution, and intelligent multi-camera tracking with automatic speaker detection.',
    color: '#FF9800',
  },
];

function youtubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:shorts\/|v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function RoomCard({ room, index, onOpen, onVideo }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden group hover:border-[rgba(0,191,255,0.2)] hover:shadow-[0_0_40px_rgba(0,191,255,0.07)] transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <button
        onClick={() => room.video ? onVideo(room.video) : onOpen(room, imgIdx)}
        className="relative w-full aspect-video overflow-hidden flex-shrink-0"
        aria-label={`View ${room.title}`}
      >
        <img
          src={room.images[imgIdx]}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60" />

        {/* Thumbnail dots */}
        {room.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {room.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-[#00BFFF] w-3' : 'bg-white/40'}`}
              />
            ))}
          </div>
        )}

        {/* Capacity badge */}
        <div className="absolute top-3 right-3">
          <span className="glass text-[10px] font-bold text-[#E6F1FF] px-2 py-1 rounded-lg flex items-center gap-1">
            <Users className="h-3 w-3" style={{ color: room.color }} />
            {room.capacity}
          </span>
        </div>

        {/* Video play badge */}
        {room.video && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Play className="h-5 w-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
      </button>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ color: room.color, backgroundColor: `${room.color}15` }}
          >
            {room.system}
          </span>
        </div>
        <h3 className="text-[#E6F1FF] font-bold text-sm leading-tight mb-1">{room.title}</h3>
        <p className="text-[#8892B0] text-xs mb-2">{room.client}</p>

        {room.description && (
          <p className="text-[#495670] text-[11px] leading-relaxed mb-3">{room.description}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {room.features.map(f => (
            <span
              key={f}
              className="text-[10px] px-2 py-0.5 rounded-md"
              style={{ color: room.color, backgroundColor: `${room.color}10`, border: `1px solid ${room.color}25` }}
            >
              {f}
            </span>
          ))}
        </div>

        {room.video && (
          <button
            onClick={() => onVideo(room.video)}
            className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold"
            style={{ color: room.color }}
          >
            <Play className="h-3 w-3 fill-current" /> Watch Project Video
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function MeetingRooms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [lightbox, setLightbox] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const openLightbox = (room, startIdx) => setLightbox({ room, idx: startIdx });

  const navigate = (dir) => {
    if (!lightbox) return;
    const total = lightbox.room.images.length;
    setLightbox(prev => ({ ...prev, idx: (prev.idx + dir + total) % total }));
  };

  return (
    <section id="meeting-rooms" className="py-24 bg-[#0D1F3C] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[rgba(0,191,255,0.03)] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow mb-3">Spaces We Build</div>
          <LaserReveal>
          <h2 className="text-4xl sm:text-5xl font-black text-[#E6F1FF]">
            Meeting Room <span className="text-gradient-blue">Solutions</span>
          </h2>
          </LaserReveal>
          <p className="mt-4 text-[#8892B0] max-w-xl">
            From intimate huddle spaces to full-scale auditoriums — purpose-built rooms with seamless video conferencing, audio clarity, and one-touch simplicity.
          </p>

          {/* Feature icons */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { icon: Monitor, label: 'Teams & Zoom Certified' },
              { icon: Wifi, label: 'AV over IP Ready' },
              { icon: Users, label: 'Hybrid-First Design' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[#8892B0] text-sm">
                <Icon className="h-4 w-4 text-[#00BFFF]" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} onOpen={openLightbox} onVideo={setVideoUrl} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/projects?tag=Meeting+Rooms" className="btn-primary inline-flex">
            View All Meeting Room Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#contact" className="btn-outline inline-flex">
            Discuss Your Space
          </a>
        </motion.div>
      </div>

      {/* YouTube Video Modal */}
      <AnimatePresence>
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideoUrl(null)}
          >
            <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setVideoUrl(null)}
                className="absolute -top-12 right-0 text-[#8892B0] hover:text-white flex items-center gap-2 text-sm"
              >
                <X className="h-5 w-5" /> Close
              </button>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId(videoUrl)}?autoplay=1&rel=0`}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-[#8892B0] hover:text-white flex items-center gap-2 text-sm"
              >
                <X className="h-5 w-5" /> Close
              </button>
              <img
                src={lightbox.room.images[lightbox.idx]}
                alt={lightbox.room.title}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              {lightbox.room.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigate(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-[#E6F1FF] hover:text-[#00BFFF]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-[#E6F1FF] hover:text-[#00BFFF]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full text-xs text-[#8892B0]">
                    {lightbox.idx + 1} / {lightbox.room.images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
