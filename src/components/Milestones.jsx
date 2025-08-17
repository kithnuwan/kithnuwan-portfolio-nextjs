'use client';

import { motion } from "framer-motion";
import {
  CalendarClock,
  BadgeCheck,
  Layers,
} from "lucide-react";
import Section from "./common/Section";
import Card from "./common/Card";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const milestones = [
  { when: "Aug 2025", what: "Preparing technical proposals and upgrades for large boardrooms, auditoriums, and multi‑platform conferencing.", Icon: CalendarClock },
  { when: "Jan 2025", what: "Training scheduled for Panasonic AV‑HS6000 at SLRC; UNICEF office meeting room design finalization.", Icon: BadgeCheck },
  { when: "2019 → Present", what: "150+ Microsoft Teams Rooms and hybrid meeting spaces delivered with Yealink, Crestron, Q‑SYS, and Shure ecosystems.", Icon: Layers },
];

export default function Milestones() {
  return (
    <Section id="milestones" title="Selected Milestones" eyebrow="Track record">
      <div className="grid md:grid-cols-3 gap-6">
        {milestones.map((m) => (
          <motion.div key={m.when} {...fadeUp}>
            <Card>
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-xl bg-black/5 dark:bg-white/10">
                  <m.Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{m.when}</div>
                  <div className="mt-1 text-sm text-gray-800 dark:text-gray-200">{m.what}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}