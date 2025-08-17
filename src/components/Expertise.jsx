'use client';

import Section from "./common/Section";
import Card from "./common/Card";
import Chip from "./common/Chip";

const platforms = [
  "Microsoft Teams Rooms",
  "Q‑SYS",
  "Crestron",
  "Dante",
  "NDI / SDI",
  "Yealink",
  "Shure / Sennheiser",
  "Blackmagic Design",
  "LED Processors",
  "Digital Signage CMS",
];

export default function Expertise() {
  return (
    <Section id="expertise" title="Platforms & Expertise" eyebrow="Tools I use">
      <Card>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <Chip key={p}>{p}</Chip>
          ))}
        </div>
      </Card>
    </Section>
  );
}