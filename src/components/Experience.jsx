'use client';

import { motion } from "framer-motion";
import Section from "./common/Section";
import Card from "./common/Card";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const experience = [
  {
    role: "Head of System Integrations / Special Project Manager",
    org: "Anscom Limited",
    period: "2022 – Present",
    bullets: [
      "Design & delivery of AV/Broadcast solutions for boardrooms, studios, auditoriums, and control rooms",
      "Formulate complex technology solutions across AVoIP, UC, and control systems",
      "Oversee installations, logistics, change orders, commissioning, and training",
      "Troubleshoot and resolve complex AV issues; lead teams and vendor coordination",
    ],
  },
  {
    role: "Senior Manager – IT & Broadcast",
    org: "Swedish Trading Audio Visual (Pvt) Ltd",
    period: "Jul 2019 – 2022",
    bullets: [
      "Architected AV & Broadcast systems meeting enterprise/government specs",
      "Led deployments for video conferencing, control, routing, and signage",
      "Managed project execution, shipments, and documentation",
    ],
  },
  {
    role: "Technical Executive",
    org: "Swedish Trading Audio Visual (Pvt) Ltd",
    period: "Jun 2003 – Jul 2009",
    bullets: [
      "Installation, programming, and maintenance for broadcast and enterprise AV",
      "Coordinated bid/design‑build projects across broadcast, corporate, education, and government",
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="What I've led">
      <div className="grid md:grid-cols-2 gap-6">
        {experience.map((e) => (
          <motion.div key={e.role + e.org} {...fadeUp}>
            <Card>
              <div className="text-sm text-gray-700 dark:text-gray-200">
                <div className="text-base font-semibold text-gray-900 dark:text-white">{e.role}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{e.org} • {e.period}</div>
                <ul className="mt-3 space-y-1 list-disc ml-4">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}