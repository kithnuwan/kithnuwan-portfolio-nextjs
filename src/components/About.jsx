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

export default function About() {
  return (
    <Section id="about" title="About Me" eyebrow="My Journey">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main About Content Card */}
        <div className="md:col-span-2">
          <Reveal>
            <Card>
              {/* Added space-y-4 for paragraph spacing */}
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  I started my journey in audio-visual and broadcast systems integration <strong>more than 20 years ago</strong>, driven by a passion for building solutions that connect people, share knowledge, and create impact. Over the years, I’ve grown from designing small AV systems to leading some of Sri Lanka’s most innovative and large-scale technology projects.
                </p>
                <p>
                  My work spans across corporate boardrooms, government institutions, and universities, where I’ve had the privilege of designing and delivering <strong>300+ cutting-edge projects</strong> — from meeting rooms and AV over IP deployments to broadcast and multimedia solutions.
                </p>
                
                <h3>Some of my proudest milestones include:</h3>
                {/* Added classes for proper list styling */}
                <ul className="list-disc pl-5">
                  <li>Helping modernize the Sri Lanka Commercial High Courts through the Court Digitization Project</li>
                  <li>Powering transparency with COPE and COPA live broadcasting solutions</li>
                  <li>Designing the Parliament of Sri Lanka’s multilingual broadcast system</li>
                  <li>Delivering Sri Lanka’s largest LED wall (22m × 11m)</li>
                </ul>

                <p>
                  What drives me is staying ahead of the curve. I’ve been fortunate to introduce new technologies to Sri Lanka, including projector blending, interactive projection, and seamless control systems. In the last two years alone (2023–2025), I’ve designed <strong>150+ Teams/Zoom/BYOD rooms</strong>, helping position Anscom as the <strong>leading force in meeting room solutions</strong>.
                </p>
                <p>
                  For me, every project is not just about technology — it’s about creating future-ready environments where people can collaborate, innovate, and inspire.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Skills Card (remains unchanged) */}
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