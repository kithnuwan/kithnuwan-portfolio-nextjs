'use client';

import { motion } from "framer-motion";
import Section from "./common/Section";
import Card from "./common/Card";
import Chip from "./common/Chip";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const education = [
  { degree: "BSc (Hons) – Computer Networks & Security", school: "Glyndwr University, Wrexham" },
];

const certifications = [
  "Cisco CCNA (Routing & Switching)",
  "Audinate Dante Level 1 & 2",
  "Biamp Tesira Certification",
  "Barco ClickShare – Certified Technical Expert",
  "Kramer Control – Certified Programmer",
  "Yealink Microsoft Solution Pre‑Sales Expert",
];

export default function Qualifications() {
  return (
    <Section id="qualifications" title="Qualifications" eyebrow="Education & Certifications">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm text-gray-700 dark:text-gray-200">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Education</div>
              <ul className="space-y-1 list-disc ml-4">
                {education.map((ed) => (
                  <li key={ed.degree}>
                    <span className="font-medium">{ed.degree}</span> — {ed.school}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
        <motion.div {...fadeUp}>
          <Card>
            <div className="text-sm text-gray-700 dark:text-gray-200">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Professional Certifications</div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}