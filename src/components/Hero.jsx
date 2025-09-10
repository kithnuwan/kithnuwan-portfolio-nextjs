'use client';
import { ChevronRight, MapPin } from "lucide-react";
import Chip from "./common/Chip";
import Reveal from "./common/Reveal";
import HeroRotator from "./HeroRotator";

const profile = {
  name: "Kithnuwan Silva",
  title: "Head of System Integrations · Anscom Limited",
  location: "Colombo, Sri Lanka",
  highlights: [
    "20+ years in AV & Broadcast",
    "300+ meeting rooms delivered",
    "Government & enterprise tender experience",
    "Design → Integration → Training → Support",
    " AI enthusiast",
    " Passionate about emerging technologies"
  ],
  heroImage: "/assets/images/hero-image.png", // update path if needed
  // Additional image for rotation; update this path to point to the new portrait you uploaded
  secondHeroImage: "/assets/images/hero-portrait.png",
};

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* subtle background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-gray-200 dark:bg-gray-800" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-20 bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <Reveal>
          <div className="grid md:grid-cols-12 items-center gap-10">
            {/* LEFT SIDE */}
            <div className="md:col-span-7">
              {/* Name */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {profile.name}
              </h1>

              {/* Title (smaller for balance) */}
              <h2 className="mt-2 text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300">
                {profile.title}
              </h2>

              {/* Location (small & subtle) */}
              <div className="mt-1 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4" /> {profile.location}
              </div>

              {/* Tagline (larger now) */}
              <h3 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">
                AV & Broadcast Systems that{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  perform
                </span>
              </h3>

              {/* Description */}
              <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Broadcast, AV, and ELV integrator specializing in the design,
                integration, and support of high-performance systems for
                corporate, government, and broadcast environments — from
                boardrooms to broadcast studios.
              </p>

              {/* Highlights */}
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.highlights.map((h) => (
                  <Chip key={h}>{h}</Chip>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90"
                >
                  Request a proposal <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-black/10 dark:ring-white/20 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                >
                  View projects
                </a>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE (clean, no overlay) */}
            <div className="md:col-span-5">
              <div className="relative w-full h-[420px] sm:h-[520px] md:h-[560px] rounded-3xl overflow-hidden">
                {/* Use HeroRotator to cross‑fade between the existing hero image and the new portrait. */}
                <HeroRotator
                  images={[profile.heroImage, profile.secondHeroImage].filter(Boolean)}
                  alt={`${profile.name} portrait`}
                  intervalMs={5000}
                  fadeMs={800}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
