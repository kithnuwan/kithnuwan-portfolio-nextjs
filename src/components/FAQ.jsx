import { ChevronDown } from 'lucide-react';
import { JsonLd } from '@/lib/seo';

// Answers use only facts already published elsewhere on this site.
// Edit freely: the FAQPage structured data is generated from this list.
export const FAQS = [
  {
    q: 'What does an AV and broadcast systems consultant do?',
    a: 'An AV and broadcast systems consultant designs the audio, video, control and conferencing systems for a space, then oversees how they are built. My work covers the full project lifecycle: presales consulting, system design, tender documentation, installation, commissioning, client training and post-delivery support.',
  },
  {
    q: 'What kinds of AV and broadcast projects do you deliver?',
    a: 'I deliver meeting rooms and boardrooms, auditoriums, smart classrooms, video walls, courtroom and remote-testimony systems, studios, outside broadcast (OB) vans, master control rooms and multilingual parliamentary broadcast systems. Clients include the Parliament of Sri Lanka, UNICEF, Unilever Sri Lanka, People\'s Bank, MAS Holdings and IWMI.',
  },
  {
    q: 'Which video conferencing platforms do you design meeting rooms for?',
    a: 'I design meeting rooms for Microsoft Teams Rooms, Zoom Rooms and Google Meet, as well as BYOD rooms where people present and join calls from their own laptops. Recent examples include 23 Teams Rooms for Unilever Sri Lanka and 19 rooms at People\'s Bank Tower.',
  },
  {
    q: 'Which AV and broadcast technologies do you work with?',
    a: 'I work with AV over IP, Dante audio networking, NDI, SDVoE and multicast networks, and with control and DSP platforms including Q-SYS, Biamp Tesira, Crestron, Extron, AMX and Kramer. Broadcast work includes Sony, Grass Valley, Ross Video, Vizrt, Blackmagic Design and BirdDog systems.',
  },
  {
    q: 'Do you work outside Colombo?',
    a: 'Yes. I am based in Colombo and deliver projects across Sri Lanka for government, enterprise and broadcast clients, with remote consulting available.',
  },
  {
    q: 'How quickly will I get a response to a project enquiry?',
    a: 'Enquiries sent through the contact form, by email or on WhatsApp (+94 777 046 928) receive a response within 24 hours.',
  },
];

export default function FAQ() {
  const schema = {
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section id="faq" className="py-24 relative">
      <JsonLd data={schema} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-num">07 — FAQ</span>
            <div className="hr-gradient flex-1" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)]">
            Frequently Asked <span className="text-gradient-blue">Questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group glass rounded-xl border border-[var(--border)] px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--text-primary)]">
                <h3 className="text-base">{q}</h3>
                <ChevronDown className="h-4 w-4 flex-shrink-0 text-[var(--accent)] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
