'use client';
import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import Card from "./common/Card";
import Chip from "./common/Chip";
import Reveal from "./common/Reveal";

const profile = {
    name: "Kithnuwan Silva",
    title: "Head of System Integrations · Anscom Limited",
    location: "Colombo, Sri Lanka",
    highlights: [
      "20+ years in AV & Broadcast",
      "300+ meeting rooms delivered",
      "Government & enterprise tender experience",
      "Design → Integration → Training → Support",
    ],
    heroImage: "/assets/images/hero-image.png",
  };


export default function Hero() {
    return (
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br from-indigo-500/40 to-cyan-400/40" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-sky-400/40 to-fuchsia-400/40" />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <Reveal>
            <div className="grid md:grid-cols-12 items-center gap-10">
              <div className="md:col-span-7">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  AV & Broadcast Systems that <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">perform</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Broadcast, AV, and ELV integrator specializing in the design, integration, and support of high-performance systems for corporate, government, and broadcast environments — from boardrooms to broadcast studios.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {profile.highlights.map((h) => (
                    <Chip key={h}>{h}</Chip>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90">
                    Request a proposal <ChevronRight className="h-4 w-4" />
                  </a>
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl ring-1 ring-black/10 dark:ring-white/20 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10">
                    View projects
                  </a>
                </div>
              </div>
              <div className="md:col-span-5">
                <Card>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mx-auto w-full max-w-[280px]">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 blur-2xl opacity-40 -z-10" />
                      <div className="rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 to-cyan-400">
                        <img
                          src={profile.heroImage}
                          alt={`${profile.name} portrait`}
                          className="rounded-full w-full h-full object-cover bg-white"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{profile.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{profile.title}</div>
                      <div className="mt-2 inline-flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4" /> {profile.location}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Reveal>
        </div>
      </header>
    );
  }