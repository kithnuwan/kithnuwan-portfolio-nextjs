'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Linkedin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';

const WEB3FORMS_KEY = '820ad35d-3e02-4bcd-9fba-8ee0920068c8';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'Kithnuwan@gmail.com',
    href: 'mailto:Kithnuwan@gmail.com',
    color: '#00BFFF',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'kithnuwan-silva-70310310',
    href: 'https://www.linkedin.com/in/kithnuwan-silva-70310310/',
    color: '#0A66C2',
    external: true,
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+94 777 046 928',
    href: 'https://wa.me/94777046928',
    color: '#25D366',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Colombo, Sri Lanka',
    href: null,
    color: '#FF6B6B',
  },
];

const inputClass =
  'w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,191,255,0.15)] rounded-xl px-4 py-3 text-sm text-[#E6F1FF] placeholder-[#495670] focus:outline-none focus:border-[rgba(0,191,255,0.5)] focus:bg-[rgba(0,191,255,0.05)] transition-all duration-200';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.target);
    formData.append('access_key', WEB3FORMS_KEY);

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setResult('success');
        e.target.reset();
      } else {
        setResult('error');
      }
    } catch {
      setResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0D1F3C] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[rgba(0,191,255,0.04)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-[rgba(0,229,255,0.03)] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow mb-3">Get In Touch</div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#E6F1FF]">
            Let&apos;s Build Something <span className="text-gradient-blue">Remarkable</span>
          </h2>
          <p className="mt-4 text-[#8892B0] max-w-xl">
            Have an AV, Broadcast, or UC project in mind? I&apos;d love to hear about it. Send a message and I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href, color, external }) => (
              <div key={label} className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-[rgba(0,191,255,0.25)] transition-all duration-300">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div>
                  <div className="text-[10px] text-[#495670] uppercase tracking-wider">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm font-medium text-[#E6F1FF] hover:text-[#00BFFF] transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-[#E6F1FF]">{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Available notice */}
            <div className="glass rounded-xl p-5 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold text-green-400">Available for Projects</span>
              </div>
              <p className="text-[#8892B0] text-xs leading-relaxed">
                Currently accepting AV design, presales consulting, and project management engagements across Sri Lanka and remotely.
              </p>
              <a
                href="https://drive.google.com/file/d/1ZXhQ9qE1m10gHub37I8gmHPao0vCWY0V/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 btn-outline text-xs py-2 px-4 w-full justify-center"
              >
                Download Solutions PDF
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div className="glass-strong rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#8892B0] uppercase tracking-wider mb-1.5">Name *</label>
                    <input name="name" required placeholder="Your full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8892B0] uppercase tracking-wider mb-1.5">Company</label>
                    <input name="company" placeholder="Your company" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#8892B0] uppercase tracking-wider mb-1.5">Email *</label>
                    <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8892B0] uppercase tracking-wider mb-1.5">Budget (USD)</label>
                    <input name="budget" placeholder="e.g. 25,000 – 80,000" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#8892B0] uppercase tracking-wider mb-1.5">Project Type</label>
                  <select name="type" className={inputClass}>
                    <option value="Microsoft Teams Room">Microsoft Teams Room</option>
                    <option value="Boardroom / Conference">Boardroom / Conference</option>
                    <option value="Broadcast">Broadcast System</option>
                    <option value="Podcast Studio">Podcast / Recording Studio</option>
                    <option value="Audio Conference / PA">Audio Conference / PA System</option>
                    <option value="Smart Classroom">Smart Classroom</option>
                    <option value="Auditorium">Auditorium / Large Venue</option>
                    <option value="AV over IP">AV over IP System</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-[#8892B0] uppercase tracking-wider mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project — use case, location, timeline, requirements..."
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#0A192F] border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Send Inquiry
                      </span>
                    )}
                  </button>

                  {result === 'success' && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="h-4 w-4" /> Message sent!
                    </div>
                  )}
                  {result === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="h-4 w-4" /> Try again.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-8 border-t border-[rgba(0,191,255,0.08)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#495670] text-xs">
          <span>© {new Date().getFullYear()} Kithnuwan Silva. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <span className="text-[#00BFFF]">Next.js</span> · Deployed on <span className="text-[#00BFFF]">Vercel</span>
          </span>
        </div>
      </div>
    </section>
  );
}
