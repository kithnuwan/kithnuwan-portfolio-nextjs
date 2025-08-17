'use client';
import {
    Presentation,
    PanelTop,
    Camera,
    MonitorCog,
    Workflow,
    BookOpen,
  } from "lucide-react";

import Card from "./common/Card";
import Chip from "./common/Chip";
import Reveal from "./common/Reveal";
import Section from "./common/Section";

const services = [
    {
      title: "Expert Microsoft Teams Room deployments across Sri Lanka.",
      desc: "Design, deploy, and support Microsoft Teams Rooms and multi‑platform setups with BYOD, auto‑framing cameras, ceiling mics, and room scheduling.",
      Icon: Presentation,
      tags: ["Teams Rooms", "BYOD", "AI Cameras", "Ceiling Mics"],
    },
    {
      title: "Video Walls & Digital Signage",
      desc: "LED/LCD video walls, processors, and content workflows. CMS, scheduling, and remote monitoring for enterprise signage.",
      Icon: PanelTop,
      tags: ["LED", "LCD", "Processors", "CMS"],
    },
    {
      title: "Broadcast & Studio Systems",
      desc: "End‑to‑end studio builds: cameras, vision mixing, intercom, tally, NDI/SDI routing, lighting, and training.",
      Icon: Camera,
      tags: ["NDI", "SDI", "ATEM", "Intercom"],
    },
    {
      title: "Command & Control",
      desc: "Operator‑friendly control rooms with multi‑source visualization, redundancy, and low‑latency KVM/AV‑over‑IP.",
      Icon: MonitorCog,
      tags: ["KVM", "AVoIP", "Failover", "24/7"],
    },
    {
      title: "Smart Building & ELV",
      desc: "Integrated ELV solutions: networks, nurse call, surveillance, access control—engineered with AV for a seamless experience.",
      Icon: Workflow,
      tags: ["ELV", "Surveillance", "Nurse Call", "Networking"],
    },
    {
      title: "Training & Documentation",
      desc: "Commissioning, playbooks, and hands‑on training for operators and facility teams to own the system day‑to‑day.",
      Icon: BookOpen,
      tags: ["Handover", "SOPs", "Workflows", "Upskilling"],
    },
  ];

export default function Services() {
    return (
      <Section id="services" title="Services" eyebrow="What I do">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Reveal key={s.title}>
              <Card>
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-2xl bg-black/5 dark:bg-white/10">
                    <s.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{s.title}</div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    );
  }