'use client';

import {
  Cpu,
  Settings,
  AudioLines,
  Video,
  Network,
  Presentation,
  MicVocal,
  Videotape,
  Projector,
  View,
  MessageSquare,
  Webcam,
  CloudCog,
} from "lucide-react";
import Section from "./common/Section";
import Reveal from "./common/Reveal";
import Card from "./common/Card";

export default function About() {
  return (
    <Section id="about" title="About" eyebrow="My Journey">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main About Content Card (remains unchanged) */}
        <div className="md:col-span-2">
          <Reveal>
            <Card>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  I started my journey in audio-visual and broadcast systems integration <strong>more than 20 years ago</strong>, driven by a passion for building solutions that connect people, share knowledge, and create impact. Over the years, I’ve grown from designing small AV systems to leading some of Sri Lanka’s most innovative and large-scale technology projects.
                </p>
                <p>
                  My work spans across corporate boardrooms, government institutions, and universities, where I’ve had the privilege of designing and delivering <strong>300+ cutting-edge projects</strong> — from meeting rooms and AV over IP deployments to broadcast and multimedia solutions.
                </p>
                
                <h3>Some of my proudest milestones include:</h3>
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

        {/* UPDATED Skills Card */}
        <div>
          <Reveal>
            <Card>
              <div className="text-sm text-gray-700 dark:text-gray-200 space-y-3">
                <div className="flex items-start gap-2"><Cpu className="h-4 w-4 mt-0.5 flex-shrink-0" /> Q‑SYS programming & automation</div>
                <div className="flex items-start gap-2"><Network className="h-4 w-4 mt-0.5 flex-shrink-0" /> AV over IP design & deployment</div>
                <div className="flex items-start gap-2"><AudioLines className="h-4 w-4 mt-0.5 flex-shrink-0" /> Dante‑first audio routing</div>
                <div className="flex items-start gap-2"><Video className="h-4 w-4 mt-0.5 flex-shrink-0" /> SDI/NDI hybrid workflows</div>
                <div className="flex items-start gap-2"><Webcam className="h-4 w-4 mt-0.5 flex-shrink-0" /> AI-powered camera tracking</div>
                <div className="flex items-start gap-2"><MicVocal className="h-4 w-4 mt-0.5 flex-shrink-0" /> Voice lifting & reinforcement</div>
                <div className="flex items-start gap-2"><MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" /> Digital conferencing systems</div>
                <div className="flex items-start gap-2"><Videotape className="h-4 w-4 mt-0.5 flex-shrink-0" /> Court recording solutions</div>
                <div className="flex items-start gap-2"><Presentation className="h-4 w-4 mt-0.5 flex-shrink-0" /> Digital signage & CMS</div>
                <div className="flex items-start gap-2"><Projector className="h-4 w-4 mt-0.5 flex-shrink-0" /> Interactive projection mapping</div>
                <div className="flex items-start gap-2"><View className="h-4 w-4 mt-0.5 flex-shrink-0" /> Immersive AV spaces</div>
                <div className="flex items-start gap-2"><CloudCog className="h-4 w-4 mt-0.5 flex-shrink-0" /> Remote & cloud production</div>
                <div className="flex items-start gap-2"><Settings className="h-4 w-4 mt-0.5 flex-shrink-0" /> System lifecycle & EOL planning</div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}