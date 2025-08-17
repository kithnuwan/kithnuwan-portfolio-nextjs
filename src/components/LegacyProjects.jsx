'use client';

import { motion } from "framer-motion";
import Section from "./common/Section";
import Card from "./common/Card";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const legacyProjects = {
  broadcast: [
    { name: "Parliament of Sri Lanka – Full HD Multilingual Broadcast System", year: "2017", detail: "Sony HXC‑100RF, Vinten FHR‑35, Grass Valley Karrera, GV 64×64 SDI & AES routers (Project value ≈ LKR 237M)" },
    { name: "MBC Stein Studio – HD Upgrade", year: "—", detail: "12× Grass Valley Focus 70, Karrera switcher, T2 recorders (US$153,567 + US$141,710 stages)" },
    { name: "ITN – Full HD OB Bus", year: "2012", detail: "Grass Valley Karrera, EVS XT Nao Replay, Ross routing/glue, Harris multiviewers (> US$300k)" },
  ],
  uc: [
    { name: "Distance Education Modernization Project", year: "—", detail: "20 distance learning centers with Polycom RMX1000 bridge & ViewStation EX (≈ LKR 15M)" },
    { name: "People’s Bank – Unified Conference System", year: "—", detail: "Enterprise video collaboration (≈ LKR 30M)" },
  ],
  special: [
    { name: "Presidential Secretariat – Dual Executive Teleprompter", year: "—", detail: "Executive teleprompter system (≈ LKR 24M)" },
    { name: "Parliament – Wireless Master Clock", year: "—", detail: "2.4 GHz frequency‑hopping master clock" },
  ],
  meetings: [
    { name: "Lion Brewery – Boardroom", detail: "Wireless BYOD, ceiling mics, network audio DSP" },
    { name: "Carson Cumberbatch PLE – Boardroom", detail: "Audio DSP, ceiling mics, VC" },
  ],
};

export default function LegacyProjects() {
  return (
    <Section id="legacy-projects" title="Selected Projects " eyebrow="Additional portfolio">
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Broadcast</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.broadcast.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>{p.year !== "—" ? ` (${p.year})` : ""}: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Unified Communication</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.uc.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>{p.year !== "—" ? ` (${p.year})` : ""}: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Special Projects</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.special.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>{p.year !== "—" ? ` (${p.year})` : ""}: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Meeting Room Solutions</div>
              <ul className="space-y-2 list-disc ml-4 text-gray-700 dark:text-gray-200">
                {legacyProjects.meetings.map((p) => (
                  <li key={p.name}><span className="font-medium">{p.name}</span>: {p.detail}</li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}