'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * HeroRotator
 *
 * This component displays a set of images in a loop with a fade-in/fade-out transition.
 * It respects the user's reduced-motion preference and preloads the next image for
 * smoother transitions. The component is designed to be used in a Next.js client
 * component (it must run on the client side).
 *
 * Props:
 *  - images: array of image paths (strings). At least one image must be provided.
 *  - alt: alt text for each image; the same alt will be applied to all frames.
 *  - intervalMs: delay between transitions in milliseconds. Default is 5000ms.
 *  - fadeMs: duration of the fade transition in milliseconds. Default is 800ms.
 */
export default function HeroRotator({
  images = [],
  alt = 'Hero image',
  intervalMs = 5000,
  fadeMs = 800,
}) {
  // Index of the currently visible image
  const [index, setIndex] = useState(0);

  // Compute the index of the next image
  const nextIndex = (index + 1) % images.length;

  // Check if the user prefers reduced motion (do not animate if so)
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  }, []);

  // Preload the next image to avoid flicker
  const preloaderRef = useRef(null);
  useEffect(() => {
    if (images.length > 1) {
      const img = new Image();
      img.src = images[nextIndex];
      preloaderRef.current = img;
    }
  }, [images, nextIndex]);

  // Rotate the images at the specified interval
  useEffect(() => {
    if (reduceMotion || images.length < 2) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, reduceMotion]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${fadeMs}ms`,
          }}
          aria-hidden={i === index ? 'false' : 'true'}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-center"
          />
          {/* Add a subtle gradient overlay to improve legibility of overlaying text (if any). */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
        </div>
      ))}
    </>
  );
}