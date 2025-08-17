'use client';

import Section from "./common/Section";
import Reveal from "./common/Reveal";
import Card from "./common/Card";

const solutions = [
  {
    title: "20‑Seat Teams Room (Dual Display)",
    summary: "Ceiling array mics, tracking camera, scheduler, and BYOD wireless sharing.",
    image: "https://i.ibb.co/Wc63tDx/meeting-room-slide-1.jpg",
  },
  {
    title: "BYOD Wireless Conferencing",
    summary: "AirPlay/Miracast casting with USB device access to in‑room camera and audio for Zoom/Meet/Teams.",
    image: "https://i.ibb.co/3YY7v1B/meeting-room-slide-2.jpg",
  },
  {
    title: "Hybrid Boardroom — Presenter/Participant Tracking",
    summary: "Auto‑framing cameras with DSP echo cancellation and table/ceiling mic mix for natural conversation.",
    image: "https://i.ibb.co/D81Ff6C/meeting-room-slide-3.jpg",
  },
  {
    title: "Auditorium — Voice Lift & Recording",
    summary: "Distributed speakers, assistive listening, and lecture capture with streaming.",
    image: "https://i.ibb.co/xLw99rX/meeting-room-slide-4.jpg",
  },
];

export default function Solutions() {
  return (
    <Section id="solutions" title="Meeting Room Solutions" eyebrow="From the deck">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {solutions.map((s) => (
          <Reveal key={s.title}>
            <Card>
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 flex items-center justify-center">
                  {s.image ? (
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-xs text-gray-500 dark:text-gray-400 p-4 text-center">Image will appear here</div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.title}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{s.summary}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}