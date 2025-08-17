'use client';

import {
  Cpu,
  Settings,
  AudioLines,
  Video,
} from "lucide-react";
import Section from "./common/Section";
import Reveal from "./common/Reveal";
import Card from "./common/Card";
import Chip from "./common/Chip";

export default function About() {
  return (
    <Section id="about" title="About" eyebrow="Who I am">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Reveal>
            <Card>
              <p className="text-sm leading-7 text-gray-700 dark:text-gray-200">
                I’m a systems integrator specializing in <strong>enterprise AV</strong>, <strong>broadcast</strong>, and <strong>ELV</strong> solutions,
                with over <strong>20 years</strong> of experience delivering <em>reliable, maintainable, and operator-friendly</em> systems.
                From needs assessment and design to commissioning, documentation, and training, I work closely with clients and vendors
                to ensure technical requirements are met while safeguarding budgets and timelines.
                My portfolio includes <strong>300+ state-of-the-art meeting rooms</strong>,
                <strong>AV over IP</strong> deployments, and <strong>large-scale broadcast projects</strong> for corporate, government, and educational sectors.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip>Head of System Integrations — Anscom Limited</Chip>
                <Chip>Government & Enterprise Tenders</Chip>
                <Chip>Hands‑on Commissioning</Chip>
              </div>
            </Card>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <Card>
              <div className="text-sm text-gray-700 dark:text-gray-200 space-y-3">
                <div className="flex items-start gap-2"><Cpu className="h-4 w-4 mt-0.5 flex-shrink-0" /> Q‑SYS programming & automation</div>
                <div className="flex items-start gap-2"><Settings className="h-4 w-4 mt-0.5 flex-shrink-0" /> Lifecycle & EOL planning</div>
                <div className="flex items-start gap-2"><AudioLines className="h-4 w-4 mt-0.5 flex-shrink-0" /> Dante‑first audio routing</div>
                <div className="flex items-start gap-2"><Video className="h-4 w-4 mt-0.5 flex-shrink-0" /> SDI/NDI hybrid workflows</div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}